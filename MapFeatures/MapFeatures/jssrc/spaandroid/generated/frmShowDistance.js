function addWidgetsfrmShowDistance() {
    var lblDistance = new kony.ui.Label({
        "id": "lblDistance",
        "isVisible": true,
        "left": "33dp",
        "skin": "CopyslLabel062211baa3cc94c",
        "text": "The Distance is : ",
        "top": "453dp",
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
        "renderAsAnchor": false,
        "textCopyable": false
    });
    var flxSDSource = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "143dp",
        "id": "flxSDSource",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "10dp",
        "skin": "slFbox",
        "top": "7dp",
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
        "top": "12dp",
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
        "renderAsAnchor": false,
        "textCopyable": false
    });
    var RadioButtonGroup084b170f1961348 = new kony.ui.RadioButtonGroup({
        "height": "103dp",
        "id": "RadioButtonGroup084b170f1961348",
        "isVisible": true,
        "left": "22dp",
        "masterData": [
            ["rbg1", "Hyd - Airport"],
            ["rbg2", "Kony - Pheonix"],
            ["rbg3", "Kony - Divyasree"]
        ],
        "selectedKey": "rbg1",
        "selectedKeyValue": ["rbg1", "Hyd - Airport"],
        "skin": "slRadioButtonGroup",
        "top": "40dp",
        "width": "260dp",
        "zIndex": 1
    }, {
        "containerWeight": 100,
        "hExpand": true,
        "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false,
        "vExpand": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {});
    flxSDSource.add(
    lblSDSource, RadioButtonGroup084b170f1961348);
    var flxSDDestination = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "143dp",
        "id": "flxSDDestination",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "8dp",
        "skin": "slFbox",
        "top": "170dp",
        "width": "94.44%",
        "zIndex": 1
    }, {}, {});
    flxSDDestination.setDefaultUnit(kony.flex.DP);
    var CopylblSDSource00d33c7a2ad2f45 = new kony.ui.Label({
        "id": "CopylblSDSource00d33c7a2ad2f45",
        "isVisible": true,
        "left": "24dp",
        "skin": "CopyslLabel007c62a735b5041",
        "text": "Destination: ",
        "top": "12dp",
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
        "renderAsAnchor": false,
        "textCopyable": false
    });
    var CopyRadioButtonGroup0a0b15c9e7dd84c = new kony.ui.RadioButtonGroup({
        "height": "103dp",
        "id": "CopyRadioButtonGroup0a0b15c9e7dd84c",
        "isVisible": true,
        "left": "22dp",
        "masterData": [
            ["rbg1", "Hyd - Airport"],
            ["rbg2", "Kony - Pheonix"],
            ["rbg3", "Kony - Divyasree"]
        ],
        "selectedKey": "rbg2",
        "selectedKeyValue": ["rbg2", "Kony - Pheonix"],
        "skin": "slRadioButtonGroup",
        "top": "40dp",
        "width": "260dp",
        "zIndex": 1
    }, {
        "containerWeight": 100,
        "hExpand": true,
        "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false,
        "vExpand": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {});
    flxSDDestination.add(
    CopylblSDSource00d33c7a2ad2f45, CopyRadioButtonGroup0a0b15c9e7dd84c);
    var btnFindDistance = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "50dp",
        "id": "btnFindDistance",
        "isVisible": true,
        "left": "33dp",
        "onClick": AS_Button_5b6d44bc51e5489cb3e799fa7cc2635f,
        "skin": "slButtonGlossBlue",
        "text": "Find Distance",
        "top": "353dp",
        "width": "260dp",
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
    frmShowDistance.add(
    lblDistance, flxSDSource, flxSDDestination, btnFindDistance);
};

function frmShowDistanceGlobals() {
    frmShowDistance = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmShowDistance,
        "enabledForIdleTimeout": false,
        "id": "frmShowDistance",
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
    frmShowDistance.setDefaultUnit(kony.flex.DP);
};