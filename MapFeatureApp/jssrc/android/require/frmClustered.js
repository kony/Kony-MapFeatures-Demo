define("frmClustered", function() {
    return function(controller) {
        function addWidgetsfrmClustered() {
            this.setDefaultUnit(kony.flex.DP);
            var zMap = new kony.ui.Map({
                "calloutWidth": 80,
                "defaultPinImage": "map_pin_red.png",
                "height": "100%",
                "id": "zMap",
                "isVisible": true,
                "left": "0dp",
                "onBoundsChanged": controller.AS_Map_f53548ec300c4e5aa660cd83714c3f73,
                "provider": constants.MAP_PROVIDER_GOOGLE,
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {}, {
                "mode": constants.MAP_VIEW_MODE_NORMAL,
                "showZoomControl": true,
                "zoomLevel": 4
            });
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
                "text": "Clustered pins",
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
                "onClick": controller.AS_Button_aabecf47499b45df9523d0a474118be7,
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
            this.add(zMap, headerContainer08);
        };
        return [{
            "addWidgets": addWidgetsfrmClustered,
            "enabledForIdleTimeout": false,
            "id": "frmClustered",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "postShow": controller.AS_Form_ba0b80951fb74cb79f380698464dfbc6,
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