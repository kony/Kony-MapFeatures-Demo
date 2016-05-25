function addWidgetsfrmFeatures() {
    frmFeatures.setDefaultUnit(kony.flex.DP);
    var flxFunctionList = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100%",
        "id": "flxFunctionList",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "skin": "slFbox",
        "top": "0dp",
        "width": "100%"
    }, {}, {});
    flxFunctionList.setDefaultUnit(kony.flex.DP);
    var btnCustomPin = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "8%",
        "id": "btnCustomPin",
        "isVisible": true,
        "left": "20%",
        "onClick": AS_Button_77c8104a6dbe48f09c8c32eb71f59629,
        "right": "20%",
        "skin": "slButtonGlossBlue",
        "text": "Pin Customization",
        "top": "18%",
        "width": "60%"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var btnAddPolygon = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "8%",
        "id": "btnAddPolygon",
        "isVisible": true,
        "left": "20%",
        "onClick": AS_Button_7b0a2c7f82ae4613a6c290d5873d2523,
        "right": "20%",
        "skin": "slButtonGlossBlue",
        "text": "Draw Polygon",
        "top": "32%",
        "width": "60%"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var btnAddCircle = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "8%",
        "id": "btnAddCircle",
        "isVisible": true,
        "left": "20%",
        "onClick": AS_Button_a60795e1278f4604bf5c881dcc66783d,
        "right": "20%",
        "skin": "slButtonGlossBlue",
        "text": "My Route Search",
        "top": "46%",
        "width": "60%"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var btnRouteSearch = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "8%",
        "id": "btnRouteSearch",
        "isVisible": true,
        "left": "20%",
        "onClick": AS_Button_2fca26c1ee9e4848aee40d97347a862c,
        "right": "20%",
        "skin": "slButtonGlossBlue",
        "text": "Find Distance",
        "top": "60%",
        "width": "60%"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var btnMapUtilities = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "8%",
        "id": "btnMapUtilities",
        "isVisible": true,
        "left": "20%",
        "onClick": AS_Button_7e954cd8551d4b5398b2c306e31c77b9,
        "right": "20%",
        "skin": "slButtonGlossBlue",
        "text": "Map Utilities",
        "top": "75%",
        "width": "60%"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var btnDistance = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "8%",
        "id": "btnDistance",
        "isVisible": true,
        "left": "20%",
        "onClick": AS_Button_ae9aa026d3da4f8881169a512a3a5612,
        "right": "20%",
        "skin": "slButtonGlossBlue",
        "text": "Route Searching",
        "top": "5%",
        "width": "60%"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
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
        "skin": "CopyslForm0abd73a7b85ad42"
    }, {
        "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
        "layoutType": kony.flex.FREE_FORM,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "footerOverlap": false,
        "headerOverlap": false,
        "menuPosition": constants.FORM_MENU_POSITION_AFTER_APPMENU,
        "retainScrollPosition": false,
        "titleBar": true,
        "titleBarSkin": "slTitleBar",
        "windowSoftInputMode": constants.FORM_ADJUST_RESIZE
    });
    frmFeatures.info = {
        "kuid": "bc7d45b507114363af5a0781087621d1"
    };
};