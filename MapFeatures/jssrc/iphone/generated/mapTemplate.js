function initializemapTemplate() {
    Flextemp = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100dp",
        "id": "Flextemp",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "CopyslFbox0d578971fc88a4f",
        "width": "50%"
    }, {}, {});
    Flextemp.setDefaultUnit(kony.flex.DP);
    var lbl1 = new kony.ui.Label({
        "id": "lbl1",
        "isVisible": true,
        "left": "43dp",
        "skin": "slLabel",
        "text": "Label",
        "top": "24dp",
        "width": kony.flex.USE_PREFFERED_SIZE
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
    Flextemp.add(
    lbl1);
}