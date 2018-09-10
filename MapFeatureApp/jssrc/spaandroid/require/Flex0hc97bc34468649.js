define("Flex0hc97bc34468649", function() {
    return function(controller) {
        var Flex0hc97bc34468649 = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "40dp",
            "id": "Flex0hc97bc34468649",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "skin": "flxSegSkin",
            "top": "0dp",
            "width": "100%"
        }, {}, {});
        Flex0hc97bc34468649.setDefaultUnit(kony.flex.DP);
        var lbldistnTime = new kony.ui.Label({
            "height": "100%",
            "id": "lbldistnTime",
            "isVisible": true,
            "right": "0dp",
            "skin": "lblgreyFont",
            "text": "Label",
            "textStyle": {},
            "top": "0dp",
            "width": "48.89%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblRoute = new kony.ui.Label({
            "height": "100%",
            "id": "lblRoute",
            "isVisible": true,
            "left": "10dp",
            "skin": "lblgreyFont",
            "text": "Label",
            "textStyle": {},
            "top": "1dp",
            "width": "40%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        Flex0hc97bc34468649.add(lbldistnTime, lblRoute);
        return Flex0hc97bc34468649;
    }
})