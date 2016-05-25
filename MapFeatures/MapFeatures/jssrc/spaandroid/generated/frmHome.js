function addWidgetsfrmHome() {
    var flxHome = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "607dp",
        "id": "flxHome",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "1dp",
        "skin": "slFbox",
        "top": "2dp",
        "width": "100%"
    }, {}, {});
    flxHome.setDefaultUnit(kony.flex.DP);
    var flxHomeName = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "73dp",
        "id": "flxHomeName",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "9dp",
        "skin": "slFbox",
        "top": "5dp",
        "width": "94.44%"
    }, {}, {});
    flxHomeName.setDefaultUnit(kony.flex.DP);
    var txtbHome = new kony.ui.TextBox2({
        "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
        "height": "40dp",
        "id": "txtbHome",
        "isVisible": true,
        "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
        "left": "97dp",
        "secureTextEntry": false,
        "skin": "slTextBox",
        "text": "Home",
        "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
        "top": "20dp",
        "width": "150dp"
    }, {
        "containerHeight": null,
        "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "hExpand": true,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "autoComplete": false,
        "autoCorrect": false
    });
    flxHomeName.add(
    txtbHome);
    var flxHomeFunctionList = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "323dp",
        "id": "flxHomeFunctionList",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "12dp",
        "skin": "slFbox",
        "top": "126dp",
        "width": "92.78%",
        "zIndex": 1
    }, {}, {});
    flxHomeFunctionList.setDefaultUnit(kony.flex.DP);
    var txtaFunctions = new kony.ui.TextArea2({
        "autoCapitalize": constants.TEXTAREA_AUTO_CAPITALIZE_NONE,
        "height": "267dp",
        "id": "txtaFunctions",
        "isVisible": true,
        "keyBoardStyle": constants.TEXTAREA_KEY_BOARD_STYLE_DEFAULT,
        "left": "9dp",
        "numberOfVisibleLines": 3,
        "skin": "slTextArea",
        "text": "Application to showcase the following features of Map  :\n\nDraw Polygon\n\nDraw Circle\n\nSearch Routes\n\nFind Location\n",
        "textInputMode": constants.TEXTAREA_INPUT_MODE_ANY,
        "top": "5dp",
        "width": "317dp"
    }, {
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
        "hExpand": true,
        "margin": [2, 2, 2, 2],
        "marginInPixel": false,
        "padding": [2, 2, 2, 2],
        "paddingInPixel": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "autoCorrect": false
    });
    flxHomeFunctionList.add(
    txtaFunctions);
    var btnContinue = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "50dp",
        "id": "btnContinue",
        "isVisible": true,
        "left": "34dp",
        "onClick": AS_Button_4299269387574abba02ef36310837fc3,
        "skin": "slButtonGlossBlue",
        "text": "Continue",
        "top": "487dp",
        "width": "291dp",
        "zIndex": 1
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
    flxHome.add(
    flxHomeName, flxHomeFunctionList, btnContinue);
    frmHome.add(
    flxHome);
};

function frmHomeGlobals() {
    frmHome = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmHome,
        "enabledForIdleTimeout": false,
        "id": "frmHome",
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
    frmHome.setDefaultUnit(kony.flex.DP);
};