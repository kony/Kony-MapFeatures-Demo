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