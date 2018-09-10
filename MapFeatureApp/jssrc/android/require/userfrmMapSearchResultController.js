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
    /**
     * @function onNavigate
     * @description invokes callSearchRoutefunc on naviagting to the form 
     * @private
     * @param rbgSelectedValue-> selected destination 
     */
    onNavigate: function(rbgSelectedValue) {
        this.index = rbgSelectedValue;
        this.callSearchRoutefunc();
        this.view.hdrDest.text = this.index;
    },
    /**
     * @function callSearchRoutefunc
     * @description invokes searchRoutes API 
     */
    callSearchRoutefunc: function() {
        try {
            var searchCriteriaObj = {
                alternatives: true,
                directionServiceUrl: "https://maps.googleapis.com/maps/api/directions/json",
                destination: {
                    lat: MAPCONSTANTS.dest3Lat,
                    lon: MAPCONSTANTS.dest3Lon
                },
                origin: {
                    lat: MAPCONSTANTS.originLat,
                    lon: MAPCONSTANTS.originLon
                },
                transportMode: "driving",
                apiKey: "AIzaSyBiLhaDbWkOVlAcGx8gQ0csyRbfZbpOmpQ"
            };
            if (this.index === null || this.index === undefined) {
                alert('Please select any one destination');
            }
            switch (this.index) {
                case "Kony Foster City":
                    searchCriteriaObj.destination = {
                        lat: MAPCONSTANTS.dest1Lat,
                        lon: MAPCONSTANTS.dest1Lon
                    };
                    break;
                case "Kony Austin":
                    searchCriteriaObj.destination = {
                        lat: MAPCONSTANTS.dest2Lat,
                        lon: MAPCONSTANTS.dest2Lon
                    };
                    break;
                default:
                    kony.print("@@@@ destination is Orlando ");
                    break;
            }
            kony.map.searchRoutes(searchCriteriaObj, this.searchRouteSuccesCallback, this.errorRouteSuccesCallback);
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    },
    /**
     * @function searchRouteSuccesCallback
     * @description success callback for searchRoutes API
     * @private
     * @param routes-> routes available in the given source and destination
     */
    searchRouteSuccesCallback: function(routes) {
        try {
            this.displySearchRoutes(routes);
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    },
    /**
     * @function errorRouteSuccesCallback
     * @description error callback for searchRoutes API
     */
    errorRouteSuccesCallback: function() {
        try {
            alert("Search result failed");
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    },
    /**
     * @function displySearchRoutes
     * @description displays the available routes between soure and destination
     * @private
     * @param Searchroutes-> routes available in the given source and destination
     */
    displySearchRoutes: function(Searchroutes) {
        try {
            kony.application.showLoadingScreen("formskin", "LoadingScreen...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
                enableMenuKey: true,
                enableBackKey: true,
                progressIndicatorColor: "ffffff77"
            });
            this.routeColors = ["00A0DDFF", "A9A9A9FF", "A9A9A9FF", "A9A9A9FF", "A9A9A9FF", "A9A9A9FF"];
            for (var i = Searchroutes.length - 1; i >= 0; i--) {
                this.routeId[i] = "Route" + (i + 1);
                this.polylinePoints[i] = Searchroutes[i].polylinePoints;
                this.distance[i] = Searchroutes[i].distance;
                this.duration[i] = Searchroutes[i].duration;
                this.drawRoute(this.routeId[i], this.polylinePoints[i], this.routeColors[i]);
            }
            this.setDataToSeg(0);
            kony.application.dismissLoadingScreen();
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    },
    /**
     * @function SegRouteClick
     * @description display route for selected route
     */
    SegRouteClick: function() {
        try {
            var rowdata = this.view.segRoutes.selectedRowItems;
            var getRouteId = parseInt(rowdata[0].key.slice(5, 6));
            var rowIndex = getRouteId - 1;
            for (var i = 0; i < this.routeId.length; i++) {
                if (rowIndex !== i) {
                    this.drawRoute(this.routeId[i], this.polylinePoints[i], this.routeColors[1]);
                }
            }
            this.drawRoute(this.routeId[rowIndex], this.polylinePoints[rowIndex], this.routeColors[0]);
            this.setDataToSeg(rowIndex);
            this.view.lblDist.text = this.kms[rowIndex] + " Miles";
            if (Math.floor(this.hrs[rowIndex]) <= 0) {
                this.view.lblTime.text = Math.round(this.min[rowIndex]) + " min";
            } else {
                this.view.lblTime.text = Math.round(this.hrs[rowIndex]) + " hr";
            }
            this.animateFlexToSmall();
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    },
    /**
     * @function setDataToSeg
     * @description set data to segement based on the index provided
     * @private
     * @param rowindex 
     */
    setDataToSeg: function(rowindex) {
        try {
            var reverseData = [],
                orderedData = [];
            var reverseTmp = {},
                popedData = {},
                orderedTmp = {};
            this.view.lblDest.text = this.index;
            for (var i = this.routeId.length - 1; i >= 0; i--) {
                this.min[i] = this.duration[i] / 60;
                this.hrs[i] = this.duration[i] / 3600;
                this.kms[i] = Math.round(this.distance[i] * 0.000621371192);
                this.view.lblDist.text = this.kms[i] + " Miles";
                if (Math.floor(this.hrs[i]) <= 0) {
                    this.view.lblTime.text = Math.round(this.min[i]) + " min";
                    reverseTmp = {
                        "key": this.routeId[i],
                        "lblRoute": "Route" + (i + 1),
                        "lbldistnTime": this.kms[i] + " Miles, " + Math.round(this.min[i]) + " min"
                    };
                } else {
                    this.view.lblTime.text = Math.round(this.hrs[i]) + " hr";
                    reverseTmp = {
                        "key": this.routeId[i],
                        "lblRoute": "Route" + (i + 1),
                        "lbldistnTime": this.kms[i] + " Miles, " + Math.round(this.hrs[i]) + " hr"
                    };
                }
                if (rowindex !== i) {
                    reverseData.push(reverseTmp);
                }
            }
            for (var j = 0; j <= reverseData.length; j++) {
                popedData = reverseData.pop();
                orderedTmp = {
                    "key": popedData.key,
                    "lblRoute": "Route" + (j + 2),
                    "lbldistnTime": popedData.lbldistnTime
                };
                orderedData.push(orderedTmp);
            }
            this.view.segRoutes.setData(orderedData);
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    },
    /**
     * @function drawRoute
     * @description invokes addPolyline method for the given route
     * @private
     * @param routeid
     * @param polyPoints
     * @param color
     */
    drawRoute: function(routeid, polyPoints, color) {
        try {
            var steps = polyPoints;
            var ei = steps.length - 1;
            var startLoc = {
                lat: steps[0].lat,
                lon: steps[0].lon,
                image: {
                    source: "location_icon_blue.png",
                    anchor: kony.map.PIN_IMG_ANCHOR_CENTER
                }
            };
            var endLoc = {
                lat: steps[ei].lat,
                lon: steps[ei].lon,
                image: {
                    source: "location_icon_red.png",
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
            this.view.mapSearchRoutes.addPolyline(polylineData);
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    },
    /**
     * @function animateFlexToFull
     * @description animates the bottom flex to top 60%
     */
    animateFlexToFull: function() {
        try {
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
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    },
    /**
     * @function animateFlexToSmall
     * @description animates the bottom flex to initial position
     */
    animateFlexToSmall: function() {
        try {
            var deviceHeight = kony.os.deviceInfo().screenHeight;
            var topValue = deviceHeight - 148;
            this.view.flxRoutes.animate(kony.ui.createAnimation({
                "100": {
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
            this.view.imgArrow.src = "arrow_right.png";
            this.view.segRoutes.isVisible = false;
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    },
    /**
     * @function showRoutes
     * @description based on the image(imgArrow) animates the flex to small or top 60%
     */
    showRoutes: function() {
        try {
            if (this.view.imgArrow.src == "arrow_right.png") {
                this.view.imgArrow.src = "arrow_down.png";
                this.view.imgArrow.left = "7dp"
                this.view.segRoutes.isVisible = true;
                this.animateFlexToFull();
            } else {
                this.animateFlexToSmall();
            }
        } catch (error) {
            kony.print("frmMapSearchResult Controller" + JSON.stringify(error));
        }
    }
});