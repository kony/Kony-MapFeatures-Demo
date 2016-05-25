function addWidgetsfrmFeatures() {
    var flxFunctionList = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "530dp",
        "id": "flxFunctionList",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "8dp",
        "skin": "slFbox",
        "top": "5dp",
        "width": "94.67%"
    }, {}, {});
    flxFunctionList.setDefaultUnit(kony.flex.DP);
    var btnCustomPin = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "50dp",
        "id": "btnCustomPin",
        "isVisible": true,
        "left": "30dp",
        "onClick": AS_Button_77c8104a6dbe48f09c8c32eb71f59629,
        "skin": "slButtonGlossBlue",
        "text": "Pin Customization",
        "top": "130dp",
        "width": "295dp"
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
    }, {});
    var btnAddPolygon = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "50dp",
        "id": "btnAddPolygon",
        "isVisible": true,
        "left": "30dp",
        "skin": "slButtonGlossBlue",
        "text": "Draw Polygon",
        "top": "215dp",
        "width": "295dp"
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
    }, {});
    var btnAddCircle = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "50dp",
        "id": "btnAddCircle",
        "isVisible": true,
        "left": "30dp",
        "skin": "slButtonGlossBlue",
        "text": "Draw Circle",
        "top": "295dp",
        "width": "295dp"
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
    }, {});
    var btnRouteSearch = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "50dp",
        "id": "btnRouteSearch",
        "isVisible": true,
        "left": "30dp",
        "skin": "slButtonGlossBlue",
        "text": "Route Searching",
        "top": "369dp",
        "width": "295dp"
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
    }, {});
    var btnMapUtilities = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "50dp",
        "id": "btnMapUtilities",
        "isVisible": true,
        "left": "30dp",
        "skin": "slButtonGlossBlue",
        "text": "Map Utilities",
        "top": "437dp",
        "width": "295dp"
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
    }, {});
    var btnDistance = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "50dp",
        "id": "btnDistance",
        "isVisible": true,
        "left": "30dp",
        "onClick": AS_Button_ae9aa026d3da4f8881169a512a3a5612,
        "skin": "slButtonGlossBlue",
        "text": "Find Distance",
        "top": "54dp",
        "width": "295dp"
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
    }, {});
    flxFunctionList.add(
    btnCustomPin, btnAddPolygon, btnAddCircle, btnRouteSearch, btnMapUtilities, btnDistance);
    frmFeatures.add(
    flxFunctionList);
};

function frmFeaturesGlobals() {
    frmFeatures = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmFeatures,
        "enabledForIdleTimeout": false,
        "id": "frmFeatures",
        "layoutType": kony.flex.FREE_FORM,
        "needAppMenu": true,
        "skin": "slForm"
    }, {
        "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
        "layoutType": kony.flex.FREE_FORM,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "retainScrollPosition": false
    });
    frmFeatures.setDefaultUnit(kony.flex.DP);
};