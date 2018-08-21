define("frmSearchRoutes", function() {
    return function(controller) {
        function addWidgetsfrmSearchRoutes() {
            this.setDefaultUnit(kony.flex.DP);
            var btnSearch = new kony.ui.Button({
                "focusSkin": "CopydefBtnNormal0d189f64c51e44a",
                "height": "57dp",
                "id": "btnSearch",
                "isVisible": true,
                "left": "20dp",
                "onClick": controller.AS_Button_e8f014287b8145319cad341e795cbaf2,
                "skin": "CopydefBtnNormal0d189f64c51e44a",
                "text": "Show Route",
                "top": "490dp",
                "width": "189dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var lblSrc = new kony.ui.Label({
                "id": "lblSrc",
                "isVisible": true,
                "left": "20dp",
                "skin": "lblBold",
                "text": "Source: (From Place)",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "217dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var lblDestnatn = new kony.ui.Label({
                "id": "lblDestnatn",
                "isVisible": true,
                "left": "20dp",
                "skin": "lblBold",
                "text": "Destination: (To)",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "323dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var rbgDestnation = new kony.ui.RadioButtonGroup({
                "centerX": "52.40%",
                "height": "90dp",
                "id": "rbgDestnation",
                "isVisible": true,
                "left": "55dp",
                "masterData": [
                    ["rbg1", "Kony Austin"],
                    ["rbg2", "Kony Orlando"],
                    ["rbg3", "Kony Foster City"]
                ],
                "selectedKey": "rbg2",
                "selectedKeyValue": ["rbg2", "Kony Orlando"],
                "skin": "slRadioButtonGroup",
                "top": "363dp",
                "width": "260dp",
                "zIndex": 1
            }, {
                "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
                "padding": [3, 0, 0, 3],
                "paddingInPixel": false
            }, {
                "tickedImage": "radioblue.png",
                "untickedImage": "radiogrey.png"
            });
            var rbgSource = new kony.ui.RadioButtonGroup({
                "centerX": "52.40%",
                "height": "40dp",
                "id": "rbgSource",
                "isVisible": true,
                "left": "55dp",
                "masterData": [
                    ["rbg1", "Orlando - Airport"]
                ],
                "selectedKey": "rbg1",
                "selectedKeyValue": ["rbg1", "Orlando - Airport"],
                "skin": "slRadioButtonGroup",
                "top": "267dp",
                "width": "260dp",
                "zIndex": 1
            }, {
                "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
                "padding": [2, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "tickedImage": "radioblue.png",
                "untickedImage": "radiogrey.png"
            });
            var headerContainer08 = new kony.ui.FlexContainer({
                "clipBounds": true,
                "height": "56dp",
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
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "0dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var headerIconLeft = new kony.ui.Label({
                "height": "100%",
                "id": "headerIconLeft",
                "isVisible": true,
                "left": "4dp",
                "skin": "headerBackIconSkin",
                "text": "",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "0dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
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
                "displayText": false,
                "padding": [27, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            headerContainer08.add(headerTitleLabel, headerIconLeft, headerButtonLeft);
            var Label0ge499030a4f548 = new kony.ui.Label({
                "id": "Label0ge499030a4f548",
                "isVisible": true,
                "left": "20dp",
                "right": "20dp",
                "skin": "lblskindark",
                "text": "The Map API on Kony AppPlatform offers route searching service on the Map. We have provided a few preselected source and destinations. Please select the source and destination to find out all the routing options with travel time and distance for each.",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "60dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var lblLIne = new kony.ui.Label({
                "height": "1dp",
                "id": "lblLIne",
                "isVisible": true,
                "left": "20dp",
                "right": "20dp",
                "skin": "line2",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "210dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var CopylblLIne0h557f71265a049 = new kony.ui.Label({
                "height": "1dp",
                "id": "CopylblLIne0h557f71265a049",
                "isVisible": true,
                "left": "20dp",
                "right": "20dp",
                "skin": "line2",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "320dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var CopylblLIne0f8483685429249 = new kony.ui.Label({
                "height": "1dp",
                "id": "CopylblLIne0f8483685429249",
                "isVisible": true,
                "left": "20dp",
                "right": "20dp",
                "skin": "line2",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "490dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            this.add(btnSearch, lblSrc, lblDestnatn, rbgDestnation, rbgSource, headerContainer08, Label0ge499030a4f548, lblLIne, CopylblLIne0h557f71265a049, CopylblLIne0f8483685429249);
        };
        return [{
            "addWidgets": addWidgetsfrmSearchRoutes,
            "enabledForIdleTimeout": false,
            "id": "frmSearchRoutes",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "CopyslForm0e288c5e0c1944a"
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
            "windowSoftInputMode": constants.FORM_ADJUST_PAN
        }]
    }
});