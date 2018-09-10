define(function() {
    return function(controller) {
        var map2 = new kony.ui.FlexContainer({
            "clipBounds": true,
            "isMaster": true,
            "height": "100%",
            "id": "map2",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "postShow": controller.AS_FlexContainer_ba90b9ffa2fd4f67bf0d05b62731badf,
            "preShow": controller.AS_FlexContainer_ccb30b09969846ed98bf185b0eb32cc8,
            "skin": "konympslFbox0f3b2f0def73b4c",
            "top": "0dp",
            "width": "100%"
        }, {}, {});
        map2.setDefaultUnit(kony.flex.DP);
        var mapView = new kony.ui.Map({
            "calloutTemplate": "flxParent",
            "calloutWidth": 80,
            "defaultPinImage": "map_pin_red_2.png",
            "height": "100%",
            "id": "mapView",
            "isVisible": true,
            "left": "0dp",
            "provider": constants.MAP_PROVIDER_GOOGLE,
            "top": "0dp",
            "widgetDataMapForCallout": {
                "flxParent": "flxParent",
                "imgStar1": "imgStar1",
                "imgStar2": "imgStar2",
                "imgStar3": "imgStar3",
                "imgStar4": "imgStar4",
                "imgStar5": "imgStar5",
                "lblDescription": "lblDescription",
                "lblDistance": "lblDistance",
                "lblHeading": "lblHeading",
                "lblReviews": "lblReviews"
            },
            "width": "100%",
            "zIndex": 1
        }, {}, {
            "mode": constants.MAP_VIEW_MODE_NORMAL,
            "showZoomControl": true,
            "zoomLevel": 6
        });
        map2.add(mapView);
        return map2;
    }
})