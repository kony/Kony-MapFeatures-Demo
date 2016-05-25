function initializeCopyFBox08b1e4e94830740() {
    CopyFBox08b1e4e94830740 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "50%",
        "id": "CopyFBox08b1e4e94830740",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "width": "100%"
    }, {}, {});
    CopyFBox08b1e4e94830740.setDefaultUnit(kony.flex.DP);
    var lblDistance = new kony.ui.Label({
        "height": "20%",
        "id": "lblDistance",
        "isVisible": true,
        "left": "0%",
        "skin": "CopyslLabel0f2e999dfb56747",
        "text": "Label",
        "top": "80%",
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
    var lblDirection = new kony.ui.RichText({
        "height": "80%",
        "id": "lblDirection",
        "isVisible": true,
        "left": "0%",
        "skin": "CopyslRichText0e9d295bb599b45",
        "text": "RichText",
        "top": "0%",
        "width": "100%",
        "zIndex": 1
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
    CopyFBox08b1e4e94830740.add(
    lblDistance, lblDirection);
}