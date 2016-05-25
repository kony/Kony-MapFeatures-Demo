function initializemyFtrTemplate() {
    flexFtr = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "10%",
        "id": "flexFtr",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "CopyslFbox048aa90dff23844"
    }, {}, {});
    flexFtr.setDefaultUnit(kony.flex.DP);
    var btnHdr = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "100%",
        "id": "btnHdr",
        "isVisible": true,
        "left": "0dp",
        "onClick": AS_Button_5bf0eb6005eb4180accdb87c89ee6322,
        "skin": "CopyslButtonGlossBlue0eaa72660ab4e43",
        "text": "Show Directions",
        "top": "0dp",
        "width": "100%"
    }, {
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "hExpand": true,
        "margin": [6, 6, 6, 6],
        "marginInPixel": false,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false,
        "vExpand": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "showProgressIndicator": true
    });
    flexFtr.add(
    btnHdr);
}