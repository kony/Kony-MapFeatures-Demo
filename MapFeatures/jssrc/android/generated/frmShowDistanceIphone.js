function addWidgetsfrmShowDistanceIphone() {
    frmShowDistanceIphone.setDefaultUnit(kony.flex.DP);
    var flxSDSource = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100dp",
        "id": "flxSDSource",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "10dp",
        "skin": "slFbox",
        "top": "10dp",
        "width": "94.44%",
        "zIndex": 1
    }, {}, {});
    flxSDSource.setDefaultUnit(kony.flex.DP);
    var lblSDSource = new kony.ui.Label({
        "id": "lblSDSource",
        "isVisible": true,
        "left": "24dp",
        "skin": "CopyslLabel007c62a735b5041",
        "text": "Source: ",
        "top": "2dp",
        "width": kony.flex.USE_PREFFERED_SIZE
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var rbtngrpSource = new kony.ui.RadioButtonGroup({
        "height": "40%",
        "id": "rbtngrpSource",
        "isVisible": true,
        "left": "5%",
        "masterData": [
            ["rbg1", "Orlando - Airport"]
        ],
        "onSelection": AS_RadioButtonGroup_878be6b90d4c482a8998438eed13a97f,
        "right": "5%",
        "selectedKey": "rbg1",
        "selectedKeyValue": ["rbg1", "Orlando - Airport"],
        "skin": "CopyslRadioButtonGroup0ed3da6a1f73145",
        "top": "35%",
        "width": "90%",
        "zIndex": 1
    }, {
        "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
        "padding": [11, 2, 18, 3],
        "paddingInPixel": false
    }, {});
    flxSDSource.add(
    lblSDSource, rbtngrpSource);
    var flxSDDestination = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "345dp",
        "id": "flxSDDestination",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "10dp",
        "skin": "slFbox",
        "top": "125dp",
        "width": "94.44%",
        "zIndex": 1
    }, {}, {});
    flxSDDestination.setDefaultUnit(kony.flex.DP);
    var lblSDDestination = new kony.ui.Label({
        "id": "lblSDDestination",
        "isVisible": true,
        "left": "24dp",
        "skin": "CopyslLabel007c62a735b5041",
        "text": "Destination: ",
        "top": "-1dp",
        "width": kony.flex.USE_PREFFERED_SIZE
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var rbtngrpDestination = new kony.ui.RadioButtonGroup({
        "id": "rbtngrpDestination",
        "isVisible": true,
        "left": "5%",
        "masterData": [
            ["rbg1", "Kony - Austin"],
            ["rbg2", "Kony - Orlando"],
            ["rbg3", "Kony - Foster City"]
        ],
        "right": "5%",
        "selectedKey": "rbg2",
        "selectedKeyValue": ["rbg2", "Kony - Orlando"],
        "skin": "CopyslRadioButtonGroup0eaa1b93da14d4c",
        "top": "15.94%",
        "width": "90%",
        "zIndex": 1
    }, {
        "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
        "padding": [8, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    flxSDDestination.add(
    lblSDDestination, rbtngrpDestination);
    var btnFindDistance = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "10%",
        "id": "btnFindDistance",
        "isVisible": true,
        "left": "20.27%",
        "onClick": AS_Button_19fa63a7e10544b693b82ea329b98211,
        "right": "20%",
        "skin": "slButtonGlossBlue",
        "text": "Display Route",
        "top": "73.42%",
        "width": "60%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    frmShowDistanceIphone.add(
    flxSDSource, flxSDDestination, btnFindDistance);
};

function frmShowDistanceIphoneGlobals() {
    frmShowDistanceIphone = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmShowDistanceIphone,
        "enabledForIdleTimeout": false,
        "id": "frmShowDistanceIphone",
        "layoutType": kony.flex.FREE_FORM,
        "needAppMenu": false,
        "skin": "CopyslForm05ba1f539e0ef4e"
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
    frmShowDistanceIphone.info = {
        "kuid": "cbeab831677d453db89928d9db4b3b1f"
    };
};