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
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    Flextemp.add(
    lbl1);
}