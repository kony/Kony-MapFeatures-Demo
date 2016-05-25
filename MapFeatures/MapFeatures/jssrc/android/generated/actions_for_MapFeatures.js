//actions.js file 
function Action0993e9acd8c2343() {
    return AS_NamedActions_ed2589cc1f794679b9103292dff3231f();
}

function AS_NamedActions_ed2589cc1f794679b9103292dff3231f() {}
function AS_AppEvents_c386f1f9c6ea41458ac6410eabee7284() {
    setPinFromFilePathAirPort();
    if (kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPhone Simulator" || kony.os.deviceInfo().name == "iPad" || kony.os.deviceInfo().name == "iPad Simulator") {
        kony.print("@# the device is iphone");
        //frmShowDistanceIphone.show();
        //kony.application.showLoadingScreen("loadingscreen","Searching...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true,{shouldShowLabelInBottom :true,separatorHeight:30});
    }
}
function AS_Button_0189e6ed80384ed39e53edb8bcf331f0() {
    undefined.show();
}
function AS_Button_19fa63a7e10544b693b82ea329b98211() {
    frmMyRouteSearch.show();
}
function AS_Button_2fca26c1ee9e4848aee40d97347a862c() {
    undefined.show();
}
function AS_Button_4299269387574abba02ef36310837fc3() {
    frmFeatures.show();
}
function AS_Button_5a8e250b997d4fac88e25d501a8bfade() {
    frmMyRouteSearch.show();
}
function AS_Button_5b6d44bc51e5489cb3e799fa7cc2635f() {
    frmMyRouteSearch.show();
}
function AS_Button_5bf0eb6005eb4180accdb87c89ee6322() {
    animateDirection();
}
function AS_Button_5ed92daab19145e987c5720c3a0858da() {
    animateDirection();
}
function AS_Button_66261dd02b714d05a966f56632a705a9() {
    animateDirection();
}
function AS_Button_77c8104a6dbe48f09c8c32eb71f59629() {
    undefined.show();
}
function AS_Button_7b0a2c7f82ae4613a6c290d5873d2523() {
    undefined.show();
}
function AS_Button_7e954cd8551d4b5398b2c306e31c77b9() {
    undefined.show();
}
function AS_Button_a60795e1278f4604bf5c881dcc66783d() {
    undefined.show();
}
function AS_Button_ae9aa026d3da4f8881169a512a3a5612() {
    undefined.show();
}
function AS_Button_d785e654eba445e98b38bb517aa2d07c() {
    frmMyRouteSearch.show();
}
function AS_Button_e2a4ceae8da94d5988b6f1a7b0669783() {
    kony.print("@@@@ in btnMyRS onClick");
    if (frmMyRouteSearch.flxScrlSeg.zIndex == 100) {
        frmMyRouteSearch.flxScrlSeg.zIndex = 1;
        frmMyRouteSearch.mapRouteSearch.zIndex = 100;
        frmMyRouteSearch.btnMyRS.text = "Show Turn By Turn Directions";
    } else {
        displySearchRoutes(selectedRouteNo);
        frmMyRouteSearch.flxScrlSeg.zIndex = 100;
        frmMyRouteSearch.mapRouteSearch.zIndex = 1;
        frmMyRouteSearch.btnMyRS.text = "Show Route Searched Map";
    }
}
function AS_Button_f7875b3df6ee47efaf49782d89746778() {
    animateDirection();
}
function AS_FlexScrollContainer_47dc3c9a3bb94fec8a9ffae76d3e1e8b() {
    //animateDirection();
    function animationBtoT() {
        var animDefinition = {
            100: {
                "top": "0%"
            }
        };
        btot = kony.ui.createAnimation(animDefinition);
        return btot;
    }

    function animationTtoB() {
        var animDefinition = {
            100: {
                "top": "90%"
            }
        };
        ttob = kony.ui.createAnimation(animDefinition);
        return ttob;
    }

    function animateDirection() {
        var topPosition = frmRouteSearch.flxscrlContainer.top;
        kony.print("@@@@ topPosition is : " + topPosition);
        if (topPosition == "90%") {
            frmRouteSearch.flxscrlContainer.animate(animationBtoT(), animConfigBtoT(), {});
        } else {
            frmRouteSearch.flxscrlContainer.animate(animationTtoB(), animConfigTtoB(), {});
        }
    }

    function animConfigBtoT() {
        var config = {
            "duration": 2,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        return config;
    }

    function animConfigTtoB() {
        var config = {
            "duration": 2,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        return config;
    }
}
function AS_FlexScrollContainer_982b85f427594359bba95a4e53121cb0() {
    //animateDirection();
    function animationBtoT() {
        var animDefinition = {
            100: {
                "top": "0%"
            }
        };
        btot = kony.ui.createAnimation(animDefinition);
        return btot;
    }

    function animationTtoB() {
        var animDefinition = {
            100: {
                "top": "90%"
            }
        };
        ttob = kony.ui.createAnimation(animDefinition);
        return ttob;
    }

    function animateDirection() {
        var topPosition = frmRouteSearch.flxscrlContainer.top;
        kony.print("@@@@ topPosition is : " + topPosition);
        if (topPosition == "90%") {
            frmRouteSearch.flxscrlContainer.animate(animationBtoT(), animConfigBtoT(), {});
        } else {
            frmRouteSearch.flxscrlContainer.animate(animationTtoB(), animConfigTtoB(), {});
        }
    }

    function animConfigBtoT() {
        var config = {
            "duration": 2,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        return config;
    }

    function animConfigTtoB() {
        var config = {
            "duration": 2,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        return config;
    }
}
function AS_FlexScrollContainer_a0f2801ea4e44ecb92ba850386bfdb52() {
    frmRouteSearch.flxScrlOverlay.height = "60%";
}
function AS_FlexScrollContainer_cca2916186c14748b31dfe6aaff4fe69() {
    frmRouteSearch.flxScrlOverlay.height = "60%";
}
function AS_FlexScrollContainer_d71af3f670b34777b660bd220a61414c() {
    kony.print("@@@@ in onScrollStart");
    routeColors = ["0000FFFF", "FF00FFFF", "FF0000FF", "FFFF00FF", "0x000000FF"];
    lblName = 0;
    lblPropName = 0;
    hbxId = 0;

    function createRouteHbox(propertyName, propertyVal) {
        var propName = new kony.ui.Label({
            "id": "lblId" + lblName,
            "isVisible": true,
            "text": propertyName,
            "skin": "lblSkn2"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 40
        }, {});
        var propVal = new kony.ui.Label({
            "id": "lblIdVal" + lblPropName,
            "isVisible": true,
            "text": propertyVal,
            "skin": "lblSkn8"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 60
        }, {});
        var hboxProp = new kony.ui.Box({
            "id": "hboxId" + hbxId,
            "isVisible": true,
            "position": constants.BOX_POSITION_AS_NORMAL,
            "orientation": constants.BOX_LAYOUT_HORIZONTAL
        }, {
            "containerWeight": 11,
            "percent": true,
            "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
            "margin": [5, 0, 0, 0],
            "padding": [0, 0, 0, 0],
            "vExpand": false,
            "marginInPixel": false,
            "paddingInPixel": false,
            "layoutType": constants.CONTAINER_LAYOUT_BOX
        }, {});
        hboxProp.add(propName, propVal);
        frmRouteSearch.flxScrlOverlay.vboxInfo.add(hboxProp);
        lblName++;
        lblPropName++;
        hbxId++;
    }

    function createLegHbox(propertyName, propertyVal) {
        var propName = new kony.ui.Label({
            "id": "lblId" + lblName,
            "isVisible": true,
            "text": propertyName,
            "skin": "lblSkn2"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 40
        }, {});
        var propVal = new kony.ui.Label({
            "id": "lblIdVal" + lblPropName,
            "isVisible": true,
            "text": propertyVal,
            "skin": "lblSkn9"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 60
        }, {});
        var hboxProp = new kony.ui.Box({
            "id": "hboxId" + hbxId,
            "isVisible": true,
            "position": constants.BOX_POSITION_AS_NORMAL,
            "orientation": constants.BOX_LAYOUT_HORIZONTAL
        }, {
            "containerWeight": 11,
            "percent": true,
            "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
            "margin": [10, 0, 0, 0],
            "padding": [0, 0, 0, 0],
            "vExpand": false,
            "marginInPixel": false,
            "paddingInPixel": false,
            "layoutType": constants.CONTAINER_LAYOUT_BOX
        }, {});
        hboxProp.add(propName, propVal);
        frmRouteSearch.flxScrlOverlay.vboxInfo.add(hboxProp);
        lblName++;
        lblPropName++;
        hbxId++;
    }

    function createStepHbox(propertyName, propertyVal) {
        var propName = new kony.ui.Label({
            "id": "lblId" + lblName,
            "isVisible": true,
            "text": propertyName,
            "skin": "lblSkn2"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 40
        }, {});
        var propVal = new kony.ui.Label({
            "id": "lblIdVal" + lblPropName,
            "isVisible": true,
            "text": propertyVal,
            "skin": "lblSkn10"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 60
        }, {});
        var hboxProp = new kony.ui.Box({
            "id": "hboxId" + hbxId,
            "isVisible": true,
            "position": constants.BOX_POSITION_AS_NORMAL,
            "orientation": constants.BOX_LAYOUT_HORIZONTAL
        }, {
            "containerWeight": 11,
            "percent": true,
            "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
            "margin": [15, 0, 0, 0],
            "padding": [0, 0, 0, 0],
            "vExpand": false,
            "marginInPixel": false,
            "paddingInPixel": false,
            "layoutType": constants.CONTAINER_LAYOUT_BOX
        }, {});
        hboxProp.add(propName, propVal);
        frmRouteSearch.flxScrlOverlay.vboxInfo.add(hboxProp);
        lblName++;
        lblPropName++;
        hbxId++;
    }

    function displySearchRoutes(Searchroutes) {
        //frmSearchRoutesResults.destroy();
        // alert("routes :" +Searchroutes.length);
        kony.application.showLoadingScreen("formskin", "LoadingScreen", constants.
        LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
            enableMenuKey: true,
            enableBackKey: true,
            progressIndicatorColor: "ffffff77"
        })
        var routeCount = new kony.ui.Label({
            "id": "routeNo",
            "isVisible": true,
            "text": Searchroutes.length,
            "skin": "lblSkn5"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 40
        }, {});
        frmRouteSearch.flxScrlOverlay.vboxInfo.add(routeCount);
        for (var i = 0; i < Searchroutes.length; i++) //routes Info
        {
            var routeId = new kony.ui.Label({
                "id": "route" + i,
                "isVisible": true,
                "text": "Route" + (i + 1),
                "skin": "lblSkn3"
            }, {
                "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                "vExpand": false,
                "hExpand": true,
                "margin": [0, 0, 0, 0],
                "padding": [1, 1, 1, 1],
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "marginInPixel": false,
                "paddingInPixel": false,
                "containerWeight": 40
            }, {});
            frmRouteSearch.flxScrlOverlay.vboxInfo.add(routeId);
            createRouteHbox("startLocation", Searchroutes[i].startLocation);
            createRouteHbox("endLocation", Searchroutes[i].endLocation);
            createRouteHbox("distance", Searchroutes[i].distance);
            createRouteHbox("duration", Searchroutes[i].duration);
            if (kony.os.deviceInfo().name == "android") {
                createRouteHbox("copyrights", Searchroutes[i].copyrights);
                createRouteHbox("warnings", Searchroutes[i].warnings);
            }
            if (kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPad") {
                createRouteHbox("name", Searchroutes[i].name);
                createRouteHbox("advisoryNotices", Searchroutes[i].advisoryNotices);
            }
            if (kony.os.deviceInfo().name == "WindowsPhone") {
                createRouteHbox("HasBlockedRoads", Searchroutes[i].HasBlockedRoads);
                createRouteHbox("IsTrafficBased", Searchroutes[i].IsTrafficBased);
            }
            var legsLegth = Searchroutes[i].legs.length;
            //   alert(Searchroutes[i].legs);
            for (var j = 0; j < legsLegth; j++) //Legs Info
            {
                var LegId = new kony.ui.Label({
                    "id": "route" + i + j,
                    "isVisible": true,
                    "text": "Leg" + (j + 1),
                    "skin": "lblSKn7"
                }, {
                    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                    "vExpand": false,
                    "hExpand": true,
                    "margin": [5, 0, 0, 0],
                    "padding": [1, 1, 1, 1],
                    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                    "marginInPixel": false,
                    "paddingInPixel": false,
                    "containerWeight": 40
                }, {});
                frmRouteSearch.flxScrlOverlay.vboxInfo.add(LegId);
                createLegHbox("startLocation", Searchroutes[i].legs[j].startLocation);
                createLegHbox("endLocation", Searchroutes[i].legs[j].endLocation);
                createLegHbox("distance", Searchroutes[i].legs[j].distance);
                createLegHbox("duration", Searchroutes[i].legs[j].duration);
                if (kony.os.deviceInfo().name == "android") {
                    createLegHbox("durationInTraffic", Searchroutes[i].legs[j].durationInTraffic);
                    createLegHbox("arrivalTime", Searchroutes[i].legs[j].arrivalTime);
                    createLegHbox("departureTime", Searchroutes[i].legs[j].departureTime);
                    createLegHbox("startAddress", Searchroutes[i].legs[j].startAddress);
                    createLegHbox("endAddress", Searchroutes[i].legs[j].endAddress);
                }
                var stepssLegth = Searchroutes[i].legs[j].steps.length;
                for (var k = 0; k < stepssLegth; k++) {
                    var stepsNo = new kony.ui.Label({
                        "id": "steps" + i + j + k,
                        "isVisible": true,
                        "text": "Step" + (k + 1),
                        "skin": "lblSkn4"
                    }, {
                        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                        "vExpand": false,
                        "hExpand": true,
                        "margin": [10, 0, 0, 0],
                        "padding": [1, 1, 1, 1],
                        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                        "marginInPixel": false,
                        "paddingInPixel": false,
                        "containerWeight": 40
                    }, {});
                    frmRouteSearch.flxScrlOverlay.vboxInfo.add(stepsNo);
                    createStepHbox("startLocation", Searchroutes[i].legs[j].steps[k].startLocation);
                    createStepHbox("endLocation", Searchroutes[i].legs[j].steps[k].endLocation);
                    createStepHbox("distance", Searchroutes[i].legs[j].steps[k].distance);
                    createStepHbox("transportMode", Searchroutes[i].legs[j].steps[k].transportMode);
                    createStepHbox("instruction", Searchroutes[i].legs[j].steps[k].instruction);
                    if (kony.os.deviceInfo().name == "android") {
                        createStepHbox("duration", Searchroutes[i].legs[j].steps[k].duration);
                        //createStepHbox("encodedPolylinePoints" , Searchroutes[i].legs[j].steps[k].encodedPolylinePoints); 
                    }
                    if (kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPad") {
                        createStepHbox("notice", Searchroutes[i].legs[j].steps[k].notice);
                    }
                    if (kony.os.deviceInfo().name == "WindowsPhone") {
                        createStepHbox("duration", Searchroutes[i].legs[j].steps[k].duration);
                        createStepHbox("startHeading", Searchroutes[i].legs[j].steps[k].startHeading);
                        createStepHbox("endHeading", Searchroutes[i].legs[j].steps[k].endHeading);
                        createStepHbox("streetName", Searchroutes[i].legs[j].steps[k].streetName);
                    }
                }
            }
            drawRoute("route" + i, Searchroutes[i].polylinePoints, routeColors[i]);
        }
        kony.application.dismissLoadingScreen();
        frmSearchRoutesResults.show();
    }
}
function AS_FlexScrollContainer_daea3b7394b844948b8c3c22cba81c49() {
    //animateDirection();
    function animationBtoT() {
        var animDefinition = {
            100: {
                "top": "0%"
            }
        };
        btot = kony.ui.createAnimation(animDefinition);
        return btot;
    }

    function animationTtoB() {
        var animDefinition = {
            100: {
                "top": "90%"
            }
        };
        ttob = kony.ui.createAnimation(animDefinition);
        return ttob;
    }

    function animateDirection() {
        var topPosition = frmRouteSearch.flxscrlContainer.top;
        kony.print("@@@@ topPosition is : " + topPosition);
        if (topPosition == "90%") {
            frmRouteSearch.flxscrlContainer.animate(animationBtoT(), animConfigBtoT(), {});
        } else {
            frmRouteSearch.flxscrlContainer.animate(animationTtoB(), animConfigTtoB(), {});
        }
    }

    function animConfigBtoT() {
        var config = {
            "duration": 2,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        return config;
    }

    function animConfigTtoB() {
        var config = {
            "duration": 2,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        return config;
    }
}
function AS_Form_0c4b8e2ad48549108ab632c7baf0253c() {
    setPinFromFilePathAirPort();
    frmMyRouteSearch.mapRouteSearch.screenLevelWidget = false;
    searchRoutes_Mine();
}
function AS_Form_0e1e48db065d4217ab3ea3adfa98b370() {
    frmRouteSearch.destroy();
}
function AS_Form_0e60498d36b84201b76265f4e949880a() {
    frmRouteSearch.mapRouteSearch.onClick = onRouteMapClick;
    frmRouteSearch.flxscrlContainer.top = "90%";
    frmRouteSearch.flxscrlContainer.forceLayout();
    frmRouteSearch.forceLayout();
}
function AS_Form_11e4bcff040d4b199f1c8e2c16d6d997() {
    var deviceInfo;
    skipDrawing = false;
    var cnt = 0;
    searchRoutesMine();
    frmRouteSearch.mapRouteSearch.onClick = onRouteMapClick;

    function searchRoutesMine() {
        var searchCriteria = {
            origin: {
                "address": "Kukatpally"
            },
            destination: {
                "address": "Gachibowli"
            },
            directionServiceUrl: "https://maps.googleapis.com/maps/api/directions/json"
        };
        //if(pop1.cbalt.selectedKeys != null && pop1.cbalt.selectedKeys.length > 0)
        searchCriteria.alternatives = true;
        //if(pop1.cbapikey.selectedKeys != null && pop1.cbapikey.selectedKeys.length > 0)
        searchCriteria.apiKey = "AIzaSyDzDds91h97mL-WvxKc6h6F-wx2P1tlTRo";
        //if(pop1.tbmode.text != "")
        //searchCriteria.transportMode = pop1.tbmode.text; 
        searchCriteria.transportMode = "driving";
        /*	
	if(pop1.tbwaypoints.text!= null && pop1.tbwaypoints.text != ""){
		searchCriteria.waypoints = [];
		waypoints = pop1.tbwaypoints.text.split(",");
		for(var i=0;i<waypoints.length;++i)
			searchCriteria.waypoints.push({"address":waypoints[i]});
		//searchCriteria.waypoints = [{"address":"chandanagar"},{"address":"hafeezpet"}];
	} 
		
	if(pop1.tbavoid.text != null && pop1.tbavoid.text != ""){
		searchCriteria.avoid = [];
		toAvoid = pop1.tbavoid.text.split(",");
		for(var i=0;i<toAvoid.length;++i)
			searchCriteria.avoid.push(toAvoid[i]);	
	}
		
	if(pop1.tblang.text != "")
		searchCriteria.language = pop1.tblang.text; 
		
	if(pop1.tbdptime.text != "")
		searchCriteria.departureTime = pop1.tbdptime.text; 
		
	if(pop1.tbarrtime.text != "")
		searchCriteria.arrivalTime = pop1.tbarrtime.text; 
		
	if(pop1.tbtsitmode.text != null && pop1.tbtsitmode.text != ""){
		searchCriteria.transitMode = [];
		var transitModes = pop1.tbtsitmode.text.split(",");
		for(var i=0;i<transitModes.length;++i)
			searchCriteria.transitMode.push(transitModes[i]);	
	}
	
	if(pop1.tbtsitpref.text != null && pop1.tbtsitpref.text != ""){
		searchCriteria.transitRoutingPreference = [];
		var transitPrefs = pop1.tbtsitpref.text.split(",");
		for(var i=0;transitPrefs.length;++i)
			searchCriteria.transitRoutingPreference.push(transitPrefs[i]);	
	}
	*/
        kony.map.searchRoutes(searchCriteria, mapRouteSearchSuccessCallback, mapRouteSearchErrorCallback);
        return searchCriteria;
        //kony.application.showLoadingScreen(null,"Fetching routes...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,{enableMenuKey:true,enableBackKey:false});
    }

    function searchRoutesRepeat() {
        var cnt = parseInt(pop1.tbrcnt.text);
        for (var i = 0; i < cnt; i++) {
            searchRoutes();
        }
    }

    function routeSuccessCallback(routes) {
        kony.print("********** Search Routes Success : " + (++cnt));
    }

    function routeErrorCallback(code, emsg) {
        kony.print("Search Route Error for - " + (++cnt) + " error - " + emsg);
    }

    function timerCallback() {
        kony.map.searchRoutes(mySearchCriteria, routeSuccessCallback, routeErrorCallback);
    }

    function searchRoutesInTimer() {
        mySearchCriteria = searchRoutes();
        kony.timer.schedule("timer1", timerCallback, 1, true);
    }
    var mainRoute = -1;
    var resultRoutes;
    var routeColors = ["0000FF77", "FF00FF77", "FF000077", "FFFF0077", "0x00000077"];
    var mainRouteColor = "0000FFFF";

    function mapRouteSearchSuccessCallback(routes) {
        kony.print("@@@@ the routes from mapRouteSearchSuccessCallback are " + routes);
        resultRoutes = routes;
        kony.application.dismissLoadingScreen();
        /*
	if(pop1.cbskdr.selectedKeys != null && pop1.cbskdr.selectedKeys.length > 0)
	{
		kony.print("******* Route Search Success-"+(++i));
		return;
	}
	*/
        kony.print(routes);
        frmRouteSearch.mapRouteSearch.clear();
        if (routes == null || routes.length == 0) {
            alert("No Routes Found");
            return;
        }
        var routeWidth = [10, 5, 5, 5];
        for (var i = 0; i < routes.length; ++i) {
            if (i == 0) drawRoute("route" + i, routes[i], mainRouteColor, routeWidth[i]);
            else drawRoute("route" + i, routes[i], routeColors[i], routeWidth[i]);
        }
    }

    function drawRoute(routeid, route, color, width) {
        //var steps = getPathPoints(route);
        //kony.print("@@@@ the steps from getPathPoints are " + steps);
        var steps = getPathPointsFromRoute(route);
        kony.print("@@@@ the steps from getPathPointsFromRoute are " + steps);
        ei = steps.length - 1;
        var startLo = {
            lat: steps[0].lat,
            lon: steps[0].lon,
            image: {
                source: "skony.png",
                anchor: kony.map.PIN_IMG_ANCHOR_CENTER
            }
        };
        var endLoc = {
            lat: steps[ei].lat,
            lon: steps[ei].lon,
            image: {
                source: "skony.png",
                anchor: kony.map.PIN_IMG_ANCHOR_CENTER
            }
        };
        //alert("No of Steps:"+steps.length);
        var polylineData = {
            id: routeid,
            locations: steps,
            startLocation: startLo,
            endLocation: endLoc,
            polylineConfig: {
                lineWidth: width,
                lineColor: color
            }
        }
        frmRouteSearch.mapRouteSearch.addPolyline(polylineData);
    }

    function onRouteMapClick(map, loc) {
        kony.print("@@@@ the onRouteMapClick function called");
        var selRoute = -1;
        for (var i = 0; i < resultRoutes.length; i++) {
            var shapeData = {
                "locations": resultRoutes[i].polylinePoints,
                tolerance: 500
            };
            var result = kony.map.containsLocation(kony.map.SHAPE_TYPE_POLYLINE, loc, shapeData);
            if (result == true) {
                selRoute = i;
                break;
            }
        }
        kony.print("******** Selected Route No = " + selRoute);
        if (selRoute != -1 && mainRoute != selRoute) {
            mainRoute = selRoute;
            for (var j = 0; j < resultRoutes.length; ++j) {
                if (j == selRoute) drawRoute("route" + j, resultRoutes[j], mainRouteColor, 10);
                else drawRoute("route" + j, resultRoutes[j], routeColors[j], 5);
            }
        }
    }

    function mapRouteSearchErrorCallback(code, emsg) {
        kony.application.dismissLoadingScreen();
        alert("Error=" + emsg);
    }

    function getPathPointsFromRoute(route) {
        kony.print("@@@@ the route from getPathPointsFromRoute are " + route);
        return route.polylinePoints;
    }

    function getPathPoints(route) {
        kony.print("@@@@ the route from getPathPoints are " + route);
        var pathPoints = new Array();
        for (var i = 0; i < route.legs[0].steps.length; i++) {
            var step = route.legs[0].steps[i];
            for (var j = 0; j < step.points.length; j++)
            pathPoints.push(step.points[j]);
        }
        return pathPoints;
    }

    function showPlacesForm() {
        frmMapCircle.show();
    }

    function showPlaces() {
        var center = {
            lat: "28.449311",
            lon: "-81.481511",
            image: "skony.ong",
            name: "Kony Solutions",
            desc: "7380 West Sand Lake Road #390Orlando, FL 32819 USA 1-407-730-KONY (5669)"
        }
        var circleData = {
            id: "circle1",
            radius: 1000,
            centerLocation: center,
            navigateAndZoom: true,
            circleConfig: {
                lineWidth: 5,
                lineColor: "FF0000FF",
                fillColor: "FF000050"
            }
        }
        frmMapCircle.map1.addCircle(circleData);
        locations = [{
            lat: "28.449424",
            lon: "-81.480181",
            image: "mcd.png",
            name: "McDonalds",
            desc: "McDonald's, 7344 W Sand Lake Rd"
        }, {
            lat: "28.450452",
            lon: "-81.480820",
            image: "rest.png",
            name: "Ocean Prime Orlando",
            desc: "Upscale spot for streak and seafood"
        }, {
            lat: "28.450558",
            lon: "-81.478845",
            image: "rest.png",
            name: "Chick-Fill-A",
            desc: "Fast food chain for chicken sandwiches"
        }, {
            lat: "28.449369",
            lon: "-81.476775",
            image: "shop.png",
            name: "Whole Foods Market",
            desc: "Mainstay for natural & organic food"
        }, {
            lat: "28.451142",
            lon: "-81.479518",
            image: "beer.png",
            name: "Bar Louie",
            desc: "American pub grub, Microbrews & martinis"
        }, {
            lat: "28.452733",
            lon: "-81.477995",
            image: "beer.png",
            name: "Sports Bar",
            desc: "Sports Bar"
        }, {
            lat: "28.450566",
            lon: "-81.484462",
            image: "rest.png",
            name: "MoonFish",
            desc: "Seafood, steak & Sushi spot"
        }, {
            lat: "28.448956",
            lon: "-81.484735",
            image: "rest.png",
            name: "First Watch",
            desc: "Casual chain cafe for breakfast and lunch"
        }, {
            lat: "28.449395",
            lon: "-81.487419",
            image: "shop.png",
            name: "Walgreens",
            desc: "Presciprtions plus health & beauty items"
        }, {
            lat: "28.444930",
            lon: "-81.475758",
            image: "shop.png",
            name: "Dollar Tree",
            desc: "Wide range of products at bargain prices"
        }];
        frmMapCircle.map1.locationData = locations;
    }
}
function AS_Form_120abfc2f4e040e783f96791f8857181() {
    frmMyRouteSearch.mapRouteSearch.onClick = onRouteMapClick;
}
function AS_Form_2bf324b3329a4529a1dc9d7b99d537c0() {
    frmCustomPin.destroy();
}
function AS_Form_2c2d23f945ed46bda00e4d19e695ab3d() {
    kony.print("@@@@ in frmShowDirections preshow");
    var deviceInfo;
    skipDrawing = false;
    var cnt = 0;
    searchRoutesMine();
    frmRouteSearch.mapRouteSearch.onClick = onRouteMapClick;

    function searchRoutesMine() {
        var searchCriteria = {
            origin: {
                "address": "Kukatpally"
            },
            destination: {
                "address": "Gachibowli"
            },
            directionServiceUrl: "https://maps.googleapis.com/maps/api/directions/json"
        };
        //if(pop1.cbalt.selectedKeys != null && pop1.cbalt.selectedKeys.length > 0)
        searchCriteria.alternatives = true;
        //if(pop1.cbapikey.selectedKeys != null && pop1.cbapikey.selectedKeys.length > 0)
        searchCriteria.apiKey = "AIzaSyDzDds91h97mL-WvxKc6h6F-wx2P1tlTRo";
        //if(pop1.tbmode.text != "")
        //searchCriteria.transportMode = pop1.tbmode.text; 
        searchCriteria.transportMode = "driving";
        /*	
	if(pop1.tbwaypoints.text!= null && pop1.tbwaypoints.text != ""){
		searchCriteria.waypoints = [];
		waypoints = pop1.tbwaypoints.text.split(",");
		for(var i=0;i<waypoints.length;++i)
			searchCriteria.waypoints.push({"address":waypoints[i]});
		//searchCriteria.waypoints = [{"address":"chandanagar"},{"address":"hafeezpet"}];
	} 
		
	if(pop1.tbavoid.text != null && pop1.tbavoid.text != ""){
		searchCriteria.avoid = [];
		toAvoid = pop1.tbavoid.text.split(",");
		for(var i=0;i<toAvoid.length;++i)
			searchCriteria.avoid.push(toAvoid[i]);	
	}
		
	if(pop1.tblang.text != "")
		searchCriteria.language = pop1.tblang.text; 
		
	if(pop1.tbdptime.text != "")
		searchCriteria.departureTime = pop1.tbdptime.text; 
		
	if(pop1.tbarrtime.text != "")
		searchCriteria.arrivalTime = pop1.tbarrtime.text; 
		
	if(pop1.tbtsitmode.text != null && pop1.tbtsitmode.text != ""){
		searchCriteria.transitMode = [];
		var transitModes = pop1.tbtsitmode.text.split(",");
		for(var i=0;i<transitModes.length;++i)
			searchCriteria.transitMode.push(transitModes[i]);	
	}
	
	if(pop1.tbtsitpref.text != null && pop1.tbtsitpref.text != ""){
		searchCriteria.transitRoutingPreference = [];
		var transitPrefs = pop1.tbtsitpref.text.split(",");
		for(var i=0;transitPrefs.length;++i)
			searchCriteria.transitRoutingPreference.push(transitPrefs[i]);	
	}
	*/
        kony.map.searchRoutes(searchCriteria, mapRouteSearchSuccessCallback, mapRouteSearchErrorCallback);
        return searchCriteria;
        //kony.application.showLoadingScreen(null,"Fetching routes...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,{enableMenuKey:true,enableBackKey:false});
    }

    function searchRoutesRepeat() {
        var cnt = parseInt(pop1.tbrcnt.text);
        for (var i = 0; i < cnt; i++) {
            searchRoutes();
        }
    }

    function routeSuccessCallback(routes) {
        kony.print("********** Search Routes Success : " + (++cnt));
    }

    function routeErrorCallback(code, emsg) {
        kony.print("Search Route Error for - " + (++cnt) + " error - " + emsg);
    }

    function timerCallback() {
        kony.map.searchRoutes(mySearchCriteria, routeSuccessCallback, routeErrorCallback);
    }

    function searchRoutesInTimer() {
        mySearchCriteria = searchRoutes();
        kony.timer.schedule("timer1", timerCallback, 1, true);
    }
    var mainRoute = -1;
    var resultRoutes;
    var routeColors = ["0000FF77", "FF00FF77", "FF000077", "FFFF0077", "0x00000077"];
    var mainRouteColor = "0000FFFF";

    function mapRouteSearchSuccessCallback(routes) {
        kony.print("@@@@ the routes from mapRouteSearchSuccessCallback are " + routes);
        //displySearchRoutes(routes);
        resultRoutes = routes;
        kony.application.dismissLoadingScreen();
        /*
	if(pop1.cbskdr.selectedKeys != null && pop1.cbskdr.selectedKeys.length > 0)
	{
		kony.print("******* Route Search Success-"+(++i));
		return;
	}
	*/
        kony.print(routes);
        frmRouteSearch.mapRouteSearch.clear();
        if (routes == null || routes.length == 0) {
            alert("No Routes Found");
            return;
        }
        var routeWidth = [10, 5, 5, 5];
        for (var i = 0; i < routes.length; ++i) {
            if (i == 0) drawRoute("route" + i, routes[i], mainRouteColor, routeWidth[i]);
            else drawRoute("route" + i, routes[i], routeColors[i], routeWidth[i]);
        }
    }

    function drawRoute(routeid, route, color, width) {
        //var steps = getPathPoints(route);
        //kony.print("@@@@ the steps from getPathPoints are " + steps);
        var steps = getPathPointsFromRoute(route);
        kony.print("@@@@ the steps from getPathPointsFromRoute are " + steps);
        ei = steps.length - 1;
        var startLo = {
            lat: steps[0].lat,
            lon: steps[0].lon,
            image: {
                source: "skony.png",
                anchor: kony.map.PIN_IMG_ANCHOR_CENTER
            }
        };
        var endLoc = {
            lat: steps[ei].lat,
            lon: steps[ei].lon,
            image: {
                source: "skony.png",
                anchor: kony.map.PIN_IMG_ANCHOR_CENTER
            }
        };
        //alert("No of Steps:"+steps.length);
        var polylineData = {
            id: routeid,
            locations: steps,
            startLocation: startLo,
            endLocation: endLoc,
            polylineConfig: {
                lineWidth: width,
                lineColor: color
            }
        }
        frmRouteSearch.mapRouteSearch.addPolyline(polylineData);
    }

    function onRouteMapClick(map, loc) {
        kony.print("@@@@ the onRouteMapClick function called");
        var selRoute = -1;
        for (var i = 0; i < resultRoutes.length; i++) {
            var shapeData = {
                "locations": resultRoutes[i].polylinePoints,
                tolerance: 500
            };
            var result = kony.map.containsLocation(kony.map.SHAPE_TYPE_POLYLINE, loc, shapeData);
            if (result == true) {
                selRoute = i;
                break;
            }
        }
        kony.print("******** Selected Route No = " + selRoute);
        if (selRoute != -1 && mainRoute != selRoute) {
            mainRoute = selRoute;
            for (var j = 0; j < resultRoutes.length; ++j) {
                if (j == selRoute) drawRoute("route" + j, resultRoutes[j], mainRouteColor, 10);
                else drawRoute("route" + j, resultRoutes[j], routeColors[j], 5);
            }
        }
    }

    function mapRouteSearchErrorCallback(code, emsg) {
        kony.application.dismissLoadingScreen();
        alert("Error=" + emsg);
    }

    function getPathPointsFromRoute(route) {
        kony.print("@@@@ the route from getPathPointsFromRoute are " + route);
        return route.polylinePoints;
    }

    function getPathPoints(route) {
        kony.print("@@@@ the route from getPathPoints are " + route);
        var pathPoints = new Array();
        for (var i = 0; i < route.legs[0].steps.length; i++) {
            var step = route.legs[0].steps[i];
            for (var j = 0; j < step.points.length; j++)
            pathPoints.push(step.points[j]);
        }
        return pathPoints;
    }
}
function AS_Form_2cabea56aa0f435f9466603bb196ec8d() {}
function AS_Form_2efcf7ce931a49db89f4d06ba2cc69c5() {
    setPinFromFilePathAirPort();
    frmRouteSearch.flxscrlContainer.opacity = 0;
    frmRouteSearch.mapRouteSearch.screenLevelWidget = false;
    searchRoutes_Mine();
}
function AS_Form_6ec24ce2cfbb4128be53205c272581cf() {
    frmDrawPolygon.destroy();
}
function AS_Form_70e50808698b4017a28dfb090f349b0d() {
    frmMyRouteSearch.destroy();
}
function AS_Form_769d3de8c24b402287d8b3fc5d5e52bc() {}
function AS_Form_7cd5a52749f44cb39435e1075f492e5d() {
    return searchRoutesOnSelection.call(this);
}
function AS_Form_8e3d2bea29ce453693e3e49cb23d3365() {
    frmDrawCircle.mapDrawCircle.calloutTemplate = Flextemp;
    frmDrawCircle.mapDrawCircle.widgetDataMapForCallout = {
        "lbl1": "lbl1"
    };
    frmDrawCircle.mapDrawCircle.defaultPinImage = {
        source: "pin6.png",
        sourceType: kony.map.PIN_IMG_SRC_TYPE_RESOURCES,
        anchor: kony.map.PIN_IMG_ANCHOR_TOP_LEFT
    }
    frmDrawCircle.mapDrawCircle.locationData = [{
        lat: "17.447326",
        lon: "78.371358",
        name: "KonyLabs(new)",
        showCallout: true,
        calloutData: {
            lbl1: {
                text: "konylabs.com(new)"
            }
        }
    }, {
        lat: "17.441839",
        lon: "78.380928",
        name: "KonyLabs(old)",
        showCallout: true,
        calloutData: {
            btn1: {
                lbl1: "konylabs.com(old)"
            }
        }
    }];
}
function AS_Form_8f81f7d97afa4e4facd0a098a9328157() {
    frmRouteSearch.mapRouteSearch.onClick = onRouteMapClick;
    frmRouteSearch.flxscrlContainer.top = "90%";
    frmRouteSearch.flxscrlContainer.forceLayout();
    frmRouteSearch.forceLayout();
}
function AS_Form_90d26fd342254d01a15a3f81336f23ae() {
    setPinFromFilePathAirPort();
    //setPinFromFilePathDS();
}
function AS_Form_b130fc34702644118829aaa6ff197a6f() {
    kony.print("in frmRouteSearch preshow - ");
}
function AS_Form_b3a7b9db8b1847f6b1db4cde76afeb38() {
    addPolygon();

    function addPolygon() {
        // pop1.dismiss();
        var locations = [{
            lat: 17.494332,
            lon: 78.391793
        }, {
            lat: 17.451759,
            lon: 78.380806
        }, {
            lat: 17.427789,
            lon: 78.451751
        }, {
            lat: 17.473305,
            lon: 78.425191
        }];
        var holes = [
            [{
                lat: 17.469702,
                lon: 78.391202
            }, {
                lat: 17.469866,
                lon: 78.409742
            }, {
                lat: 17.475924,
                lon: 78.412832
            }, {
                lat: 17.483456,
                lon: 78.403733
            }, {
                lat: 17.482965,
                lon: 78.393949
            }, {
                lat: 17.476907,
                lon: 78.394464
            }],
            [{
                lat: 17.455320,
                lon: 78.408714
            }, {
                lat: 17.448114,
                lon: 78.406311
            }, {
                lat: 17.441400,
                lon: 78.416096
            }, {
                lat: 17.450243,
                lon: 78.426567
            }]
        ];
        var locationData = {
            id: "polygon1",
            locations: locations,
            navigateAndZoom: true,
            polygonConfig: {
                innerPolygons: holes,
                lineColor: "0xFF0000FF",
                lineWidth: 9,
                fillColor: "0xFF0000FF"
            }
        };
        frmDrawPolygon.mapDrawPolygon.addPolygon(locationData);
    }
}
function AS_Form_c2f38d8a496a4fadb08d1575afbce103() {
    var testdata1 = {
        id: "circleId",
        centerLocation: {
            lat: "17.441839",
            lon: "78.380928"
        },
        radius: 1
    }
    var testdata2 = {
        id: "circleId2",
        centerLocation: {
            lat: "17.447326",
            lon: "78.371358"
        },
        radius: 1
    }
    frmDrawCircle.mapDrawCircle.addCircle(testdata1);
    frmDrawCircle.mapDrawCircle.addCircle(testdata2);
}
function AS_Form_cca481983e9f48b49713695249c2048e() {
    setPinFromFilePathAirPort();
    frmRouteSearch.flxscrlContainer.opacity = 0;
    frmRouteSearch.mapRouteSearch.screenLevelWidget = false;
    searchRoutes_Mine();
}
function AS_Form_d403b71f6e404430a4ab0ccdc03cb2db() {}
function AS_Form_d634aa9e196349ad9a9e27e88c0b1af9() {
    frmRouteSearch.destroy();
}
function AS_Form_d687c5a19057424eb1b378e1d99325d8() {
    kony.print("@@@@ in postShow");
    routeColors = ["0000FFFF", "FF00FFFF", "FF0000FF", "FFFF00FF", "0x000000FF"];
    lblName = 0;
    lblPropName = 0;
    hbxId = 0;
    //displySearchRoutes();
    function createRouteHbox(propertyName, propertyVal) {
        var propName = new kony.ui.Label({
            "id": "lblId" + lblName,
            "isVisible": true,
            "text": propertyName,
            "skin": "lblSkn2"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 40
        }, {});
        var propVal = new kony.ui.Label({
            "id": "lblIdVal" + lblPropName,
            "isVisible": true,
            "text": propertyVal,
            "skin": "lblSkn8"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 60
        }, {});
        var hboxProp = new kony.ui.Box({
            "id": "hboxId" + hbxId,
            "isVisible": true,
            "position": constants.BOX_POSITION_AS_NORMAL,
            "orientation": constants.BOX_LAYOUT_HORIZONTAL
        }, {
            "containerWeight": 11,
            "percent": true,
            "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
            "margin": [5, 0, 0, 0],
            "padding": [0, 0, 0, 0],
            "vExpand": false,
            "marginInPixel": false,
            "paddingInPixel": false,
            "layoutType": constants.CONTAINER_LAYOUT_BOX
        }, {});
        hboxProp.add(propName, propVal);
        frmShowDirections.vboxInfo.add(hboxProp);
        lblName++;
        lblPropName++;
        hbxId++;
    }

    function createLegHbox(propertyName, propertyVal) {
        var propName = new kony.ui.Label({
            "id": "lblId" + lblName,
            "isVisible": true,
            "text": propertyName,
            "skin": "lblSkn2"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 40
        }, {});
        var propVal = new kony.ui.Label({
            "id": "lblIdVal" + lblPropName,
            "isVisible": true,
            "text": propertyVal,
            "skin": "lblSkn9"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 60
        }, {});
        var hboxProp = new kony.ui.Box({
            "id": "hboxId" + hbxId,
            "isVisible": true,
            "position": constants.BOX_POSITION_AS_NORMAL,
            "orientation": constants.BOX_LAYOUT_HORIZONTAL
        }, {
            "containerWeight": 11,
            "percent": true,
            "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
            "margin": [10, 0, 0, 0],
            "padding": [0, 0, 0, 0],
            "vExpand": false,
            "marginInPixel": false,
            "paddingInPixel": false,
            "layoutType": constants.CONTAINER_LAYOUT_BOX
        }, {});
        hboxProp.add(propName, propVal);
        frmShowDirections.vboxInfo.add(hboxProp);
        lblName++;
        lblPropName++;
        hbxId++;
    }

    function createStepHbox(propertyName, propertyVal) {
        var propName = new kony.ui.Label({
            "id": "lblId" + lblName,
            "isVisible": true,
            "text": propertyName,
            "skin": "lblSkn2"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 40
        }, {});
        var propVal = new kony.ui.Label({
            "id": "lblIdVal" + lblPropName,
            "isVisible": true,
            "text": propertyVal,
            "skin": "lblSkn10"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 60
        }, {});
        var hboxProp = new kony.ui.Box({
            "id": "hboxId" + hbxId,
            "isVisible": true,
            "position": constants.BOX_POSITION_AS_NORMAL,
            "orientation": constants.BOX_LAYOUT_HORIZONTAL
        }, {
            "containerWeight": 11,
            "percent": true,
            "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
            "margin": [15, 0, 0, 0],
            "padding": [0, 0, 0, 0],
            "vExpand": false,
            "marginInPixel": false,
            "paddingInPixel": false,
            "layoutType": constants.CONTAINER_LAYOUT_BOX
        }, {});
        hboxProp.add(propName, propVal);
        frmShowDirections.vboxInfo.add(hboxProp);
        lblName++;
        lblPropName++;
        hbxId++;
    }

    function displySearchRoutes(Searchroutes) {
        //Searchroutes = "{ startLocation :  { lat : 17.4948496, lon : 78.3996846,  } , legs :  [  { startLocation :  { lat : 17.4948496, lon : 78.3996846,  } , startAddress : Kukatpally, Hyderabad, Telangana 500072, India, endLocation :  { lat : 17.4400702, lon : 78.3489417,  } , steps :  [  { startLocation :  { lat : 17.4948496, lon : 78.3996846,  } , endLocation :  { lat : 17.4918202, lon : 78.4061115,  } , distance : 760.0, duration : 107.0, instruction : Head <b>southeast</b> on <b>NH 9</b> toward <b>Allwyn Colony Rd</b>/<b>HMT Rd</b><div style="font-size:0.9em">Pass by World Of Titan (on the left in 350&nbsp;m)</div>, transportMode : DRIVING, encodedPolylinePoints : y}wiB_mo}M~@gCj@uAPc@~@gC~@kCL_@nBwFHUFODMTi@Pk@LWHS@A|@aCFQt@qBJY,  }";
        //frmSearchRoutesResults.destroy();
        // alert("routes :" +Searchroutes.length);
        kony.application.showLoadingScreen("formskin", "LoadingScreen", constants.
        LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
            enableMenuKey: true,
            enableBackKey: true,
            progressIndicatorColor: "ffffff77"
        })
        var routeCount = new kony.ui.Label({
            "id": "routeNo",
            "isVisible": true,
            "text": Searchroutes.length,
            "skin": "lblSkn5"
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 0, 0, 0],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 40
        }, {});
        frmShowDirections.vboxInfo.add(routeCount);
        for (var i = 0; i < Searchroutes.length; i++) //routes Info
        {
            var routeId = new kony.ui.Label({
                "id": "route" + i,
                "isVisible": true,
                "text": "Route" + (i + 1),
                "skin": "lblSkn3"
            }, {
                "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                "vExpand": false,
                "hExpand": true,
                "margin": [0, 0, 0, 0],
                "padding": [1, 1, 1, 1],
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "marginInPixel": false,
                "paddingInPixel": false,
                "containerWeight": 40
            }, {});
            frmShowDirections.vboxInfo.add(routeId);
            createRouteHbox("startLocation", Searchroutes[i].startLocation);
            createRouteHbox("endLocation", Searchroutes[i].endLocation);
            createRouteHbox("distance", Searchroutes[i].distance);
            createRouteHbox("duration", Searchroutes[i].duration);
            if (kony.os.deviceInfo().name == "android") {
                createRouteHbox("copyrights", Searchroutes[i].copyrights);
                createRouteHbox("warnings", Searchroutes[i].warnings);
            }
            if (kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPad") {
                createRouteHbox("name", Searchroutes[i].name);
                createRouteHbox("advisoryNotices", Searchroutes[i].advisoryNotices);
            }
            if (kony.os.deviceInfo().name == "WindowsPhone") {
                createRouteHbox("HasBlockedRoads", Searchroutes[i].HasBlockedRoads);
                createRouteHbox("IsTrafficBased", Searchroutes[i].IsTrafficBased);
            }
            var legsLegth = Searchroutes[i].legs.length;
            //   alert(Searchroutes[i].legs);
            for (var j = 0; j < legsLegth; j++) //Legs Info
            {
                var LegId = new kony.ui.Label({
                    "id": "route" + i + j,
                    "isVisible": true,
                    "text": "Leg" + (j + 1),
                    "skin": "lblSKn7"
                }, {
                    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                    "vExpand": false,
                    "hExpand": true,
                    "margin": [5, 0, 0, 0],
                    "padding": [1, 1, 1, 1],
                    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                    "marginInPixel": false,
                    "paddingInPixel": false,
                    "containerWeight": 40
                }, {});
                frmShowDirections.vboxInfo.add(LegId);
                createLegHbox("startLocation", Searchroutes[i].legs[j].startLocation);
                createLegHbox("endLocation", Searchroutes[i].legs[j].endLocation);
                createLegHbox("distance", Searchroutes[i].legs[j].distance);
                createLegHbox("duration", Searchroutes[i].legs[j].duration);
                if (kony.os.deviceInfo().name == "android") {
                    createLegHbox("durationInTraffic", Searchroutes[i].legs[j].durationInTraffic);
                    createLegHbox("arrivalTime", Searchroutes[i].legs[j].arrivalTime);
                    createLegHbox("departureTime", Searchroutes[i].legs[j].departureTime);
                    createLegHbox("startAddress", Searchroutes[i].legs[j].startAddress);
                    createLegHbox("endAddress", Searchroutes[i].legs[j].endAddress);
                }
                var stepssLegth = Searchroutes[i].legs[j].steps.length;
                for (var k = 0; k < stepssLegth; k++) {
                    var stepsNo = new kony.ui.Label({
                        "id": "steps" + i + j + k,
                        "isVisible": true,
                        "text": "Step" + (k + 1),
                        "skin": "lblSkn4"
                    }, {
                        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                        "vExpand": false,
                        "hExpand": true,
                        "margin": [10, 0, 0, 0],
                        "padding": [1, 1, 1, 1],
                        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                        "marginInPixel": false,
                        "paddingInPixel": false,
                        "containerWeight": 40
                    }, {});
                    frmShowDirections.vboxInfo.add(stepsNo);
                    createStepHbox("startLocation", Searchroutes[i].legs[j].steps[k].startLocation);
                    createStepHbox("endLocation", Searchroutes[i].legs[j].steps[k].endLocation);
                    createStepHbox("distance", Searchroutes[i].legs[j].steps[k].distance);
                    createStepHbox("transportMode", Searchroutes[i].legs[j].steps[k].transportMode);
                    createStepHbox("instruction", Searchroutes[i].legs[j].steps[k].instruction);
                    if (kony.os.deviceInfo().name == "android") {
                        createStepHbox("duration", Searchroutes[i].legs[j].steps[k].duration);
                        //createStepHbox("encodedPolylinePoints" , Searchroutes[i].legs[j].steps[k].encodedPolylinePoints); 
                    }
                    if (kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPad") {
                        createStepHbox("notice", Searchroutes[i].legs[j].steps[k].notice);
                    }
                    if (kony.os.deviceInfo().name == "WindowsPhone") {
                        createStepHbox("duration", Searchroutes[i].legs[j].steps[k].duration);
                        createStepHbox("startHeading", Searchroutes[i].legs[j].steps[k].startHeading);
                        createStepHbox("endHeading", Searchroutes[i].legs[j].steps[k].endHeading);
                        createStepHbox("streetName", Searchroutes[i].legs[j].steps[k].streetName);
                    }
                }
            }
            //drawRoute("route" + i, Searchroutes[i].polylinePoints, routeColors[i]);
        }
        kony.application.dismissLoadingScreen();
        //frmSearchRoutesResults.show();
    }
}
function AS_Form_df08cf06cd0342d88827b345311ff4e3() {}
function AS_Form_e994f1eaf5fa4b42a3ea952743425e45() {}
function AS_HBox_a2d2c7ccb84f4eeeb4de41cfbcfe5d63() {
    kony.print("@@@@ in hboxInfo onClick");
}
function AS_Map_59985b4d837847629656201618509be2() {
    frmMapRoute.map1.onClick = onRouteMapClick;
}
function AS_Map_92970580a88e4179931bf9bb46348ea1() {
    kony.print("@@@@ in onClick of map ");
    frmRouteSearch.mapRouteSearch.onClick = onRouteMapClick;
}
function AS_Map_c078a8529ad94e8b9458aaeddb60e698() {
    kony.print("@@@@ in onClick of map ");
}
function AS_Map_e1e31c56325e4f1aa3340a6a70ab4101() {
    kony.print("@@@@ in onClick of map ");
    frmRouteSearch.mapRouteSearch.onClick = onRouteMapClick;
}
function AS_Map_f550870478e84b5da2210d73b674ce80() {
    kony.print("@@@@ in onClick of map ");
    frmRouteSearch.mapRouteSearch.onClick = onRouteMapClick;
}
function AS_RadioButtonGroup_2b8fe91fdb1c4b58bf4b46e4f51c203c(eventobject) {}
function AS_RadioButtonGroup_878be6b90d4c482a8998438eed13a97f(eventobject) {}
function AS_ScrollBox_c49e3d6a1ada4b60b749d3a479850951() {
    kony.print("@@@@ onPull");
}
function AS_ScrollBox_d27ca6500b8b416b97460cfb01c11929() {
    kony.print("@@@@ onPush");
}
function AS_Segment_2b3038807b9f4a54a39081fa1ca50631() {}
function AS_Segment_9c6a611ae8f64b7fb4eda849b35b7b1e() {}
function AS_Segment_fa135b20a12042be95e70cf9b5c48972() {}
function AS_VBox_0064306bc35f45ccabfa8f954a1ce8da() {
    kony.print("@@@@ in vboxInfo onClick");
}