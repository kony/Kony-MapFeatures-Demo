function initializetempDirection() {
    flxTempDirection = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "60dp",
        "id": "flxTempDirection",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "CopyslFbox0cfc9a49f594541"
    }, {}, {});
    flxTempDirection.setDefaultUnit(kony.flex.DP);
    var lblDirection = new kony.ui.RichText({
        "height": "37dp",
        "id": "lblDirection",
        "isVisible": true,
        "left": "5dp",
        "skin": "CopyslRichText0952828a5a5fe4c",
        "text": "RichText",
        "top": "0dp",
        "width": "100%"
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
    }, {
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
    });
    var lblDistance = new kony.ui.Label({
        "height": "23dp",
        "id": "lblDistance",
        "isVisible": true,
        "left": "5dp",
        "skin": "CopyslLabel07acfaf08402a40",
        "text": "Label",
        "top": "37dp",
        "width": "100%",
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
        "textCopyable": false,
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
    });
    flxTempDirection.add(
    lblDirection, lblDistance);
}