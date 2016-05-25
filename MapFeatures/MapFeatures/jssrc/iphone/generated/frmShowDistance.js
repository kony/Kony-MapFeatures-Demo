function addWidgetsfrmShowDistance() {
    frmShowDistance.setDefaultUnit(kony.flex.DP);
    var flxSDSource = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "85dp",
        "id": "flxSDSource",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "10dp",
        "skin": "slFbox",
        "top": "25dp",
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
    var rbtngrpSource = new kony.ui.RadioButtonGroup({
        "id": "rbtngrpSource",
        "isVisible": true,
        "left": "5%",
        "masterData": [
            ["rbg1", "Hyd - Airport"]
        ],
        "right": "5%",
        "selectedKey": "rbg1",
        "selectedKeyValue": ["rbg1", "Hyd - Airport"],
        "skin": "CopyslRadioButtonGroup0ed3da6a1f73145",
        "top": "35%",
        "width": "90%",
        "zIndex": 1
    }, {
        "containerWeight": 100,
        "hExpand": true,
        "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [11, 2, 18, 3],
        "paddingInPixel": false,
        "vExpand": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "groupCells": false,
        "viewConfig": {
            "toggleViewConfig": {
                "viewStyle": constants.RADIOGROUP_TOGGLE_VIEW_STYLE_PLAIN
            }
        },
        "viewType": constants.RADIOGROUP_VIEW_TYPE_LISTVIEW
    });
    flxSDSource.add(
    lblSDSource, rbtngrpSource);
    var flxSDDestination = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "200dp",
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
    var rbtngrpDestination = new kony.ui.RadioButtonGroup({
        "height": "30.53%",
        "id": "rbtngrpDestination",
        "isVisible": true,
        "left": "5%",
        "masterData": [
            ["rbg1", "Kony - E Park"],
            ["rbg2", "Kony - Pheonix"],
            ["rbg3", "Kony - Divyasree"]
        ],
        "right": "5%",
        "selectedKey": "rbg2",
        "selectedKeyValue": ["rbg2", "Kony - Pheonix"],
        "skin": "CopyslRadioButtonGroup0eaa1b93da14d4c",
        "top": "14.49%",
        "width": "90%",
        "zIndex": 1
    }, {
        "containerWeight": 100,
        "hExpand": true,
        "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [8, 5, 0, 5],
        "paddingInPixel": false,
        "vExpand": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "groupCells": false,
        "viewConfig": {
            "toggleViewConfig": {
                "viewStyle": constants.RADIOGROUP_TOGGLE_VIEW_STYLE_PLAIN
            }
        },
        "viewType": constants.RADIOGROUP_VIEW_TYPE_LISTVIEW
    });
    flxSDDestination.add(
    lblSDDestination, rbtngrpDestination);
    var btnFindDistance = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "10%",
        "id": "btnFindDistance",
        "isVisible": true,
        "left": "20.27%",
        "onClick": AS_Button_5b6d44bc51e5489cb3e799fa7cc2635f,
        "right": "20%",
        "skin": "slButtonGlossBlue",
        "text": "Display Route",
        "top": "73.42%",
        "width": "60%",
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
    }, {
        "showProgressIndicator": true
    });
    var CopyrbtngrpSource0a7a54ddbb1fc42 = new kony.ui.RadioButtonGroup({
        "id": "CopyrbtngrpSource0a7a54ddbb1fc42",
        "isVisible": true,
        "left": "5.15%",
        "masterData": [
            ["rbg1", "Hyd - Airport"]
        ],
        "right": "5%",
        "selectedKey": "rbg1",
        "selectedKeyValue": ["rbg1", "Hyd - Airport"],
        "skin": "CopyslRadioButtonGroup0ed3da6a1f73145",
        "top": "290.00%",
        "width": "90%",
        "zIndex": 1
    }, {
        "containerWeight": 100,
        "hExpand": true,
        "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [11, 2, 18, 3],
        "paddingInPixel": false,
        "vExpand": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "groupCells": false,
        "viewConfig": {
            "toggleViewConfig": {
                "viewStyle": constants.RADIOGROUP_TOGGLE_VIEW_STYLE_PLAIN
            }
        },
        "viewType": constants.RADIOGROUP_VIEW_TYPE_LISTVIEW
    });
    var Segment02e99b5439c624b = new kony.ui.SegmentedUI2({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "data": [{
            "Button0545f303a01814f": "Button"
        }, {
            "Button0545f303a01814f": "Button"
        }, {
            "Button0545f303a01814f": "Button"
        }],
        "groupCells": false,
        "id": "Segment02e99b5439c624b",
        "isVisible": true,
        "left": "18dp",
        "needPageIndicator": true,
        "pageOffDotImage": "pageOffDot.png",
        "pageOnDotImage": "pageOnDot.png",
        "retainSelection": false,
        "rowFocusSkin": "seg2Focus",
        "rowSkin": "seg2Normal",
        "rowTemplate": FBox016456248d66443,
        "screenLevelWidget": false,
        "scrollingEvents": {},
        "sectionHeaderSkin": "sliPhoneSegmentHeader",
        "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
        "separatorColor": "64646400",
        "separatorRequired": true,
        "separatorThickness": 1,
        "showScrollbars": false,
        "top": "278dp",
        "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
        "widgetDataMap": {
            "Button0545f303a01814f": "Button0545f303a01814f"
        },
        "width": "100%",
        "zIndex": 1
    }, {
        "containerWeight": 100,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "bounces": true,
        "editStyle": constants.SEGUI_EDITING_STYLE_NONE,
        "enableDictionary": false,
        "indicator": constants.SEGUI_ROW_SELECT,
        "progressIndicatorColor": constants.PROGRESS_INDICATOR_COLOR_WHITE,
        "showProgressIndicator": true
    });
    frmShowDistance.add(
    flxSDSource, flxSDDestination, btnFindDistance, CopyrbtngrpSource0a7a54ddbb1fc42, Segment02e99b5439c624b);
};

function frmShowDistanceGlobals() {
    frmShowDistance = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmShowDistance,
        "enabledForIdleTimeout": false,
        "id": "frmShowDistance",
        "layoutType": kony.flex.FREE_FORM,
        "needAppMenu": false,
        "skin": "CopyslForm05ba1f539e0ef4e"
    }, {
        "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
        "layoutType": kony.flex.FREE_FORM,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "configureExtendBottom": false,
        "configureExtendTop": false,
        "configureStatusBarStyle": false,
        "footerOverlap": false,
        "formTransparencyDuringPostShow": "100",
        "headerOverlap": false,
        "inputAccessoryViewType": constants.FORM_INPUTACCESSORYVIEW_CANCEL,
        "needsIndicatorDuringPostShow": false,
        "retainScrollPosition": false,
        "titleBar": true,
        "titleBarConfig": {
            "renderTitleText": true,
            "prevFormTitle": false,
            "titleBarLeftSideView": "button",
            "labelLeftSideView": "Back",
            "titleBarRightSideView": "button",
            "labelRightSideView": "Edit"
        },
        "titleBarSkin": "slTitleBar"
    });
};