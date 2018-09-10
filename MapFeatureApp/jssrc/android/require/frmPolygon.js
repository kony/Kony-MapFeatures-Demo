define("frmPolygon", function() {
    return function(controller) {
        function addWidgetsfrmPolygon() {
            this.setDefaultUnit(kony.flex.DP);
            var mapaddPolygon = new kony.ui.Map({
                "calloutWidth": 80,
                "defaultPinImage": "pinb.png",
                "height": "100%",
                "id": "mapaddPolygon",
                "isVisible": true,
                "left": "0dp",
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
                "text": "addPolygon Method",
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
                "onClick": controller.AS_Button_b352d962feb54c5899ab29ab87b36b0e,
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
            var flxbottom = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "bottom": "13dp",
                "clipBounds": true,
                "height": "55dp",
                "id": "flxbottom",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "13dp",
                "right": "13dp",
                "skin": "konympflxskin",
                "zIndex": 1
            }, {}, {});
            flxbottom.setDefaultUnit(kony.flex.DP);
            var rbtn = new kony.ui.RadioButtonGroup({
                "centerX": "50%",
                "centerY": "50%",
                "height": "45%",
                "id": "rbtn",
                "isVisible": true,
                "left": "60dp",
                "masterData": [
                    ["pen", "Pennsylvania"],
                    ["ind", "Indiana"]
                ],
                "onSelection": controller.AS_RadioButtonGroup_a8ae610b8db74311b25e56c7e1d3ffdf,
                "selectedKey": "pen",
                "selectedKeyValue": ["pen", "Pennsylvania"],
                "skin": "slRadioButtonGroup",
                "top": "20dp",
                "width": "95%",
                "zIndex": 1
            }, {
                "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_HORIZONTAL,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "tickedImage": "radioblue.png",
                "untickedImage": "radiogrey.png"
            });
            flxbottom.add(rbtn);
            this.add(mapaddPolygon, headerContainer08, flxbottom);
        };
        return [{
            "addWidgets": addWidgetsfrmPolygon,
            "enabledForIdleTimeout": false,
            "id": "frmPolygon",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "postShow": controller.AS_Form_gbb2bf525d614a07b230114ed560ae04,
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