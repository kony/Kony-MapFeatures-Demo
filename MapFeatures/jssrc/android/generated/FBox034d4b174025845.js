function initializeFBox034d4b174025845() {
    FBox034d4b174025845 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "10%",
        "id": "FBox034d4b174025845",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "width": "100%"
    }, {}, {});
    FBox034d4b174025845.setDefaultUnit(kony.flex.DP);
    var lblDirection = new kony.ui.RichText({
        "id": "lblDirection",
        "isVisible": true,
        "left": "0%",
        "skin": "CopyslRichText0520bc7e4b56940",
        "text": "RichText",
        "top": "0dp",
        "width": "100%",
        "zIndex": 105
    }, {
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "hExpand": true,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false,
        "vExpand": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {});
    var lblDistance = new kony.ui.Label({
        "id": "lblDistance",
        "isVisible": true,
        "left": "0%",
        "right": "0%",
        "skin": "CopyslLabel0fbeb0abaa6e244",
        "text": "Label",
        "top": "76%",
        "zIndex": 1
    }, {
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "hExpand": true,
        "margin": [1, 1, 1, 1],
        "marginInPixel": false,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false,
        "vExpand": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "textCopyable": false
    });
    FBox034d4b174025845.add(
    lblDirection, lblDistance);
}