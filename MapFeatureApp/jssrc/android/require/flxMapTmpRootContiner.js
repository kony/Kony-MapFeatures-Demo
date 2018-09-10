define("flxMapTmpRootContiner", function() {
    return function(controller) {
        var flxMapTmpRootContiner = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "id": "flxMapTmpRootContiner",
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "skin": "konympslFbox0h2b67e9e148e4d",
            "width": "80%"
        }, {}, {});
        flxMapTmpRootContiner.setDefaultUnit(kony.flex.DP);
        var flxNameContainer = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": true,
            "id": "flxNameContainer",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "skin": "konympslFbox0f3b2f0def73b4c",
            "top": "0dp",
            "width": "90%",
            "zIndex": 10
        }, {}, {});
        flxNameContainer.setDefaultUnit(kony.flex.DP);
        var lblName = new kony.ui.Label({
            "id": "lblName",
            "isVisible": true,
            "left": "0dp",
            "skin": "konympsknLblBlue0c5a3f23db85448",
            "text": "Name",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "5dp",
            "width": "100%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxNameContainer.add(lblName);
        var lblLine = new kony.ui.Label({
            "centerX": "50%",
            "height": "2dp",
            "id": "lblLine",
            "isVisible": true,
            "left": "15dp",
            "skin": "konympsknLblLine0hf6b3a5a75dd4c",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": "90%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblDesc = new kony.ui.Label({
            "id": "lblDesc",
            "isVisible": true,
            "left": "15dp",
            "skin": "konympsknLblCuisines0ec3aed52949e48",
            "text": "Cuisines",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": "90%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblLine2 = new kony.ui.Label({
            "height": "1dp",
            "id": "lblLine2",
            "isVisible": true,
            "left": "5dp",
            "skin": "konympsknLblLine0hf6b3a5a75dd4c",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "20dp",
            "width": "95%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxMapTmpRootContiner.add(flxNameContainer, lblLine, lblDesc, lblLine2);
        return flxMapTmpRootContiner;
    }
})