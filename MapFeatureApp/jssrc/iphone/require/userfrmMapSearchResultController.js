define({
    index: null,
    routeId: [],
    routeColors: [],
    polylinePoints: [],
    distance: [],
    duration: [],
    min: [],
    hrs: [],
    kms: [],
    onNavigate: function(rbgSelectedValue) {
        this.index = rbgSelectedValue;
        this.callSearchRoutefunc();
        var deviceHeight = kony.os.deviceInfo().screenHeight;
        var topValue = deviceHeight - 95;
        this.view.flxRoutes.top = topValue + "dp";
        this.view.hdrDest.text = "Dest: " + this.index;
    },
    callSearchRoutefunc: function() {
        var searchCriteriaObj = {
            alternatives: true,
            directionServiceUrl: "https://maps.googleapis.com/maps/api/directions/json",
            destination: {
                lat: 28.449373,
                lon: -81.48162769999999
            }, //Kony - Orlando
            origin: {
                lat: 28.4310206,
                lon: -81.3080398
            }, //Orlando - Airport    ,
            // waypoints : [  {lon : -81.431853, lat : 28.4502945 } ] , 
            transportMode: "driving",
            apiKey: "AIzaSyBiLhaDbWkOVlAcGx8gQ0csyRbfZbpOmpQ"
        };
        if (this.index === null || this.index === undefined) {
            alert('Please select any one destination');
        }
        switch (this.index) {
            case "Kony_Foster City":
                searchCriteriaObj.destination = {
                    lat: 37.5608292,
                    lon: -122.2710158
                };
                break;
            case "Kony_Austin":
                searchCriteriaObj.destination = {
                    lat: 30.3158671,
                    lon: -97.868505
                };
                break;
            default:
                kony.print("@@@@ destination is Orlando ");
                break;
        }
        kony.map.searchRoutes(searchCriteriaObj, this.searchRouteSuccesCallback, this.errorRouteSuccesCallback);
    },
    searchRouteSuccesCallback: function(routes) {
        kony.print("######Succeess callback is called### " + routes);
        this.displySearchRoutes(routes);
    },
    errorRouteSuccesCallback: function() {
        alert("Search result failed");
    },
    displySearchRoutes: function(Searchroutes) {
        kony.application.showLoadingScreen("formskin", "LoadingScreen...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
            enableMenuKey: true,
            enableBackKey: true,
            progressIndicatorColor: "ffffff77"
        });
        //this.routeColors = ["0000FFFF","FF00FFFF","FF00FFFF","FF0000FF","FFFF00FF","0x000000FF"];
        this.routeColors = ["4B88F1FF", "A9A9A9FF", "A9A9A9FF", "FF0000FF", "FFFF00FF", "0x000000FF"];
        for (var i = Searchroutes.length - 1; i >= 0; i--) {
            this.routeId[i] = "Route" + (i + 1);
            this.polylinePoints[i] = Searchroutes[i].polylinePoints;
            this.distance[i] = Searchroutes[i].distance;
            this.duration[i] = Searchroutes[i].duration;
            this.drawRoute(this.routeId[i], this.polylinePoints[i], this.routeColors[i]);
        }
        this.segData(0);
        kony.application.dismissLoadingScreen();
    },
    SegRouteClick: function() {
        var rowdata = this.view.segRoutes.selectedRowItems;
        var getRouteId = parseInt(rowdata[0].Label0e4341295167a4e.slice(5, 6));
        var rowIndex = getRouteId - 1;
        //alert(rowdata);
        //var data={};    
        for (var i = 0; i < this.routeId.length; i++) {
            if (rowIndex === i) {} else {
                this.drawRoute(this.routeId[i], this.polylinePoints[i], this.routeColors[1]);
            }
        }
        this.drawRoute(this.routeId[rowIndex], this.polylinePoints[rowIndex], this.routeColors[0]);
        this.segData(rowIndex);
        this.view.lblDist.text = this.kms[rowIndex] + "kms";
        if (Math.floor(this.hrs[rowIndex]) <= 0) {
            this.view.lblTime.text = Math.round(this.min[rowIndex]) + " mins";
        } else {
            this.view.lblTime.text = Math.round(this.hrs[rowIndex]) + " hrs";
        }
        this.animateFlexToSmall();
    },
    segData: function(rowindex) {
        var data = [];
        var tmp = {};
        this.view.lblDest.text = this.index;
        for (var i = this.routeId.length - 1; i >= 0; i--) {
            this.min[i] = this.duration[i] / 60;
            this.hrs[i] = this.duration[i] / 3600;
            this.kms[i] = Math.round(this.distance[i] / 1000);
            this.view.lblDist.text = this.kms[i] + "kms";
            if (Math.floor(this.hrs[i]) <= 0) {
                this.view.lblTime.text = Math.round(this.min[i]) + " mins";
                tmp = {
                    "Label0e4341295167a4e": this.routeId[i] + " takes " + Math.round(this.min[i]) + " mins to travel " + this.kms[i] + " kms"
                };
            } else {
                this.view.lblTime.text = Math.round(this.hrs[i]) + " hrs";
                tmp = {
                    "Label0e4341295167a4e": this.routeId[i] + " takes " + Math.round(this.hrs[i]) + " hrs to travel " + this.kms[i] + " kms"
                };
            }
            if (rowindex !== i) data.push(tmp);
        }
        this.view.segRoutes.setData(data);
    },
    drawRoute: function(routeid, polyPoints, color) {
        var steps = polyPoints;
        kony.print("################The polyline points " + steps);
        //kony.print(steps);
        ei = steps.length - 1;
        var startLoc = {
            lat: steps[0].lat,
            lon: steps[0].lon,
            image: {
                source: "a.png",
                anchor: kony.map.PIN_IMG_ANCHOR_CENTER
            }
        };
        var endLoc = {
            lat: steps[ei].lat,
            lon: steps[ei].lon,
            image: {
                source: "b.png",
                anchor: kony.map.PIN_IMG_ANCHOR_CENTER
            }
        };
        var polylineData = {
            id: routeid,
            locations: steps,
            startLocation: startLoc,
            endLocation: endLoc,
            polylineConfig: {
                lineWidth: 5,
                lineColor: color
            }
        };
        this.view.map1.addPolyline(polylineData);
    },
    animateFlexToFull: function() {
        this.view.flxRoutes.animate(kony.ui.createAnimation({
            "100": {
                "top": "60%",
                "stepConfig": {
                    "timingFunction": kony.anim.LINEAR
                },
                "rectified": true
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.4
        }, {});
        this.view.flxOverlay.isVisible = true;
    },
    animateFlexToSmall: function() {
        var deviceHeight = kony.os.deviceInfo().screenHeight;
        var topValue = deviceHeight - 95;
        this.view.flxRoutes.animate(kony.ui.createAnimation({
            "100": {
                //"top": "86.5%",
                "top": topValue + "dp",
                "stepConfig": {
                    "timingFunction": kony.anim.LINEAR
                },
                "rectified": true
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.4
        }, {});
        this.view.flxOverlay.isVisible = false;
    }
});