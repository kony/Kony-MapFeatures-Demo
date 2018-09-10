define("flxFeatureList", function() {
    return function(controller) {
        var flxFeatureList = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "15%",
            "id": "flxFeatureList",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "skin": "slFbox"
        }, {}, {});
        flxFeatureList.setDefaultUnit(kony.flex.DP);
        var flxFeatureContainer = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "clipBounds": true,
            "focusSkin": "konympFLXFEATUREFOCUS",
            "height": "80%",
            "id": "flxFeatureContainer",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "skin": "konympFLXFEATUREBOX",
            "width": "92%",
            "zIndex": 15
        }, {}, {});
        flxFeatureContainer.setDefaultUnit(kony.flex.DP);
        var lblFeature = new kony.ui.Label({
            "centerX": "50%",
            "centerY": "50%",
            "id": "lblFeature",
            "isVisible": true,
            "skin": "konympLBLFEATURE",
            "text": "Feature Name",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "width": kony.flex.USE_PREFFERED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxFeatureContainer.add(lblFeature);
        flxFeatureList.add(flxFeatureContainer);
        return flxFeatureList;
    }
})