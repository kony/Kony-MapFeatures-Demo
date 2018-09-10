define("frmSearchRoutes", function() {
    return function(controller) {
        function addWidgetsfrmSearchRoutes() {
            this.setDefaultUnit(kony.flex.DP);
            var headerContainer08 = new kony.ui.FlexContainer({
                "clipBounds": true,
                "height": "56dp",
                "id": "headerContainer08",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "skin": "konympheaderContainerSknMaster",
                "top": "0dp",
                "width": "100%",
                "zIndex": 3
            }, {}, {});
            headerContainer08.setDefaultUnit(kony.flex.DP);
            var headerTitleLabel = new kony.ui.Label({
                "centerX": "50%",
                "height": "100%",
                "id": "headerTitleLabel",
                "isVisible": true,
                "left": "72dp",
                "right": "72dp",
                "skin": "konympheaderTitleSkinMaster",
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
                "skin": "konympheaderBackIconSkin",
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
                "focusSkin": "konympheaderIconCartSkin",
                "height": "100%",
                "id": "headerButtonLeft",
                "isVisible": true,
                "left": "0dp",
                "onClick": controller.AS_Button_ab98a8babb274834938370cd69f4bc4f,
                "skin": "konympheaderButtonBackSkin",
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
            var flxMain = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "100%",
                "id": "flxMain",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "skin": "konympslFbox0c459edb622c945",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {}, {});
            flxMain.setDefaultUnit(kony.flex.DP);
            var lblDescrptn = new kony.ui.Label({
                "id": "lblDescrptn",
                "isVisible": true,
                "left": "20dp",
                "right": "20dp",
                "skin": "konymplblskindark",
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
            var lblSrc = new kony.ui.Label({
                "id": "lblSrc",
                "isVisible": true,
                "left": "20dp",
                "skin": "konymplblBold",
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
            var lblDestnatn = new kony.ui.Label({
                "id": "lblDestnatn",
                "isVisible": true,
                "left": "20dp",
                "skin": "konymplblBold",
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
            var btnSearch = new kony.ui.Button({
                "focusSkin": "konympdefBtnNormal0d189f64c51e44a",
                "height": "57dp",
                "id": "btnSearch",
                "isVisible": true,
                "left": "20dp",
                "onClick": controller.AS_Button_c9fc9f47540142aa89ca9af0171b917d,
                "skin": "konympdefBtnNormal0d189f64c51e44a",
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
            flxMain.add(lblDescrptn, lblSrc, rbgSource, lblDestnatn, rbgDestnation, btnSearch);
            this.add(headerContainer08, flxMain);
        };
        return [{
            "addWidgets": addWidgetsfrmSearchRoutes,
            "enabledForIdleTimeout": false,
            "id": "frmSearchRoutes",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "konympfrmskin"
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