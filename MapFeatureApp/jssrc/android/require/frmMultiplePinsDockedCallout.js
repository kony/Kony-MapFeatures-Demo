define("frmMultiplePinsDockedCallout", function() {
    return function(controller) {
        function addWidgetsfrmMultiplePinsDockedCallout() {
            this.setDefaultUnit(kony.flex.DP);
            var mapUpdatePins = new com.konymp.map4({
                "clipBounds": true,
                "height": "100%",
                "id": "mapUpdatePins",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "skin": "konympslFbox0f3b2f0def73b4c",
                "top": "0dp",
                "width": "100%"
            }, {}, {});
            mapUpdatePins.lblHeading.text = "Bickermann Davis";
            mapUpdatePins.lblReviews.left = "53%";
            mapUpdatePins.bottom = null;
            mapUpdatePins.centerX = null;
            mapUpdatePins.centerY = null;
            mapUpdatePins.left = "0dp";
            mapUpdatePins.right = null;
            mapUpdatePins.top = "0dp";
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
                "skin": "konympheaderTitleSkinMaster",
                "text": "updatePins Method",
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
                "onClick": controller.AS_Button_aade1231841f4e66bc701cd25cf2c627,
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
            this.add(mapUpdatePins, headerContainer08);
        };
        return [{
            "addWidgets": addWidgetsfrmMultiplePinsDockedCallout,
            "enabledForIdleTimeout": false,
            "id": "frmMultiplePinsDockedCallout",
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