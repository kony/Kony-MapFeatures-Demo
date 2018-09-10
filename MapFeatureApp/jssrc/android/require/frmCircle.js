define("frmCircle", function() {
    return function(controller) {
        function addWidgetsfrmCircle() {
            this.setDefaultUnit(kony.flex.DP);
            var mapAddCircle = new kony.ui.Map({
                "calloutWidth": 80,
                "defaultPinImage": "kony_mp_map04_red_pin.png",
                "height": "100%",
                "id": "mapAddCircle",
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
                "text": "addCircle Method",
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
                "onClick": controller.AS_Button_dd79bde8f08846709864af71f674fa8f,
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
                "bottom": "1.20%",
                "centerX": "50%",
                "clipBounds": true,
                "height": "95dp",
                "id": "flxbottom",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "skin": "konympflxskin",
                "width": "97%",
                "zIndex": 1
            }, {}, {});
            flxbottom.setDefaultUnit(kony.flex.DP);
            var rbgDisplayPlace = new kony.ui.RadioButtonGroup({
                "centerX": "50%",
                "height": "31.58%",
                "id": "rbgDisplayPlace",
                "isVisible": true,
                "left": "18dp",
                "masterData": [
                    ["ny", "New York"],
                    ["wdc", "Washington, D.C."]
                ],
                "onSelection": controller.AS_RadioButtonGroup_ee75d18a44a340958d993c0d9de579b9,
                "selectedKey": "ny",
                "selectedKeyValue": ["ny", "New York"],
                "skin": "slRadioButtonGroup",
                "top": "13dp",
                "width": "90%",
                "zIndex": 1
            }, {
                "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_HORIZONTAL,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "tickedImage": "radioblue.png",
                "untickedImage": "radiogrey.png"
            });
            var singleslider = new com.konymp.singleslider({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "50%",
                "id": "singleslider",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "skin": "konympslForm3",
                "top": "45%",
                "width": "100%"
            }, {}, {});
            singleslider.maxValue = "10";
            singleslider.minValue = "0";
            singleslider.intervalDisplay = true;
            singleslider.graduations = 10;
            singleslider.divisions = 1;
            singleslider.endIndex = 5;
            singleslider.onChangeEnd = controller.AS_UWI_e49cc8cf65fc4b3da117b488d42c03ca;
            flxbottom.add(rbgDisplayPlace, singleslider);
            this.add(mapAddCircle, headerContainer08, flxbottom);
        };
        return [{
            "addWidgets": addWidgetsfrmCircle,
            "enabledForIdleTimeout": false,
            "id": "frmCircle",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "postShow": controller.AS_Form_debafff8692a4e33acc0647329bbd239,
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