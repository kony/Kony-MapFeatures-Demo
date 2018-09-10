define("frmAddPin", function() {
    return function(controller) {
        function addWidgetsfrmAddPin() {
            this.setDefaultUnit(kony.flex.DP);
            var mapAddpin = new com.konymp.map2({
                "clipBounds": true,
                "height": "100%",
                "id": "mapAddpin",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "skin": "konympslFbox0f3b2f0def73b4c",
                "top": "0dp",
                "width": "100%"
            }, {}, {});
            mapAddpin.bottom = null;
            mapAddpin.centerX = null;
            mapAddpin.centerY = null;
            mapAddpin.left = "0dp";
            mapAddpin.right = null;
            mapAddpin.top = "0dp";
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
                "text": "addPin Methods",
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
                "onClick": controller.AS_Button_a240aaa04ba447688597579b4055ea57,
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
            this.add(mapAddpin, headerContainer08);
        };
        return [{
            "addWidgets": addWidgetsfrmAddPin,
            "enabledForIdleTimeout": false,
            "id": "frmAddPin",
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
            "titleBar": false,
            "titleBarSkin": "slTitleBar",
            "windowSoftInputMode": constants.FORM_ADJUST_PAN
        }]
    }
});