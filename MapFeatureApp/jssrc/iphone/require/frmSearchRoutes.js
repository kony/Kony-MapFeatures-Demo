define("frmSearchRoutes", function() {
    return function(controller) {
        function addWidgetsfrmSearchRoutes() {
            this.setDefaultUnit(kony.flex.DP);
            var btnSearch = new kony.ui.Button({
                "centerX": "50%",
                "focusSkin": "defBtnFocus",
                "height": "50dp",
                "id": "btnSearch",
                "isVisible": true,
                "left": "40dp",
                "onClick": controller.AS_Button_e8f014287b8145319cad341e795cbaf2,
                "skin": "defBtnNormal",
                "text": "Display Route",
                "top": "273dp",
                "width": "260dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "showProgressIndicator": true
            });
            var lblSrc = new kony.ui.Label({
                "id": "lblSrc",
                "isVisible": true,
                "left": "20dp",
                "skin": "lblskin",
                "text": "Source:",
                "textStyle": {},
                "top": "60dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            var lblDestnatn = new kony.ui.Label({
                "id": "lblDestnatn",
                "isVisible": true,
                "left": "20dp",
                "skin": "lblskin",
                "text": "Destination:",
                "textStyle": {},
                "top": "135dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            var rbgDestnation = new kony.ui.RadioButtonGroup({
                "centerX": "50%",
                "height": "90dp",
                "id": "rbgDestnation",
                "isVisible": true,
                "left": "52dp",
                "masterData": [
                    ["rbg1", "Kony_Austin"],
                    ["rbg2", "Kony_Orlando"],
                    ["rbg3", "Kony_Foster City"]
                ],
                "selectedKey": "rbg2",
                "selectedKeyValue": ["rbg2", "Kony_Orlando"],
                "skin": "slRadioButtonGroup",
                "top": "155dp",
                "width": "260dp",
                "zIndex": 1
            }, {
                "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "groupCells": false,
                "viewConfig": {
                    "toggleViewConfig": {
                        "viewStyle": constants.RADIOGROUP_TOGGLE_VIEW_STYLE_PLAIN
                    }
                },
                "viewType": constants.RADIOGROUP_VIEW_TYPE_LISTVIEW
            });
            var rbgSource = new kony.ui.RadioButtonGroup({
                "centerX": "50%",
                "height": "40dp",
                "id": "rbgSource",
                "isVisible": true,
                "left": "51dp",
                "masterData": [
                    ["rbg1", "Orlando - Airport"]
                ],
                "selectedKey": "rbg1",
                "selectedKeyValue": ["rbg1", "Orlando - Airport"],
                "skin": "slRadioButtonGroup",
                "top": "85dp",
                "width": "260dp",
                "zIndex": 1
            }, {
                "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "groupCells": false,
                "viewConfig": {
                    "toggleViewConfig": {
                        "viewStyle": constants.RADIOGROUP_TOGGLE_VIEW_STYLE_PLAIN
                    }
                },
                "viewType": constants.RADIOGROUP_VIEW_TYPE_LISTVIEW
            });
            var headerContainer08 = new kony.ui.FlexContainer({
                "clipBounds": true,
                "height": "44dp",
                "id": "headerContainer08",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "skin": "headerContainerSknMaster",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {}, {});
            headerContainer08.setDefaultUnit(kony.flex.DP);
            var headerTitleLabel = new kony.ui.Label({
                "centerX": "50%",
                "height": "100%",
                "id": "headerTitleLabel",
                "isVisible": true,
                "left": "72dp",
                "right": "72dp",
                "skin": "headerTitleSkinMaster",
                "text": "searchRoutes API",
                "textStyle": {},
                "top": "0dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            var headerIconLeft = new kony.ui.Label({
                "height": "100%",
                "id": "headerIconLeft",
                "isVisible": true,
                "left": "4dp",
                "skin": "headerBackIconSkin",
                "text": "",
                "textStyle": {},
                "top": "0dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            var headerButtonLeft = new kony.ui.Button({
                "focusSkin": "headerIconCartSkin",
                "height": "100%",
                "id": "headerButtonLeft",
                "isVisible": true,
                "left": "0dp",
                "onClick": controller.AS_Button_ab98a8babb274834938370cd69f4bc4f,
                "skin": "headerButtonBackSkin",
                "text": "Back",
                "top": "0dp",
                "width": "74dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "displayText": true,
                "padding": [27, 0, 0, 0],
                "paddingInPixel": true
            }, {
                "showProgressIndicator": true
            });
            headerContainer08.add(headerTitleLabel, headerIconLeft, headerButtonLeft);
            this.add(btnSearch, lblSrc, lblDestnatn, rbgDestnation, rbgSource, headerContainer08);
        };
        return [{
            "addWidgets": addWidgetsfrmSearchRoutes,
            "enabledForIdleTimeout": false,
            "id": "frmSearchRoutes",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "slForm"
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
            "titleBar": false,
            "titleBarSkin": "slTitleBar"
        }]
    }
});