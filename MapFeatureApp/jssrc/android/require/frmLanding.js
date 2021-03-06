define("frmLanding", function() {
    return function(controller) {
        function addWidgetsfrmLanding() {
            this.setDefaultUnit(kony.flex.DP);
            var lblTitle = new kony.ui.Label({
                "height": "10%",
                "id": "lblTitle",
                "isVisible": true,
                "left": "0%",
                "skin": "konymplbltextTitle",
                "text": "Map Feature",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "0%",
                "width": "100%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var lblTitleBottomLine = new kony.ui.Label({
                "height": "1dp",
                "id": "lblTitleBottomLine",
                "isVisible": true,
                "left": "0%",
                "skin": "konympLBLLINE",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "10%",
                "width": "100%",
                "zIndex": 10
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var flxBody = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "90%",
                "id": "flxBody",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0%",
                "skin": "konympFLXFAFAFA",
                "top": "10%",
                "width": "100%",
                "zIndex": 1
            }, {}, {});
            flxBody.setDefaultUnit(kony.flex.DP);
            var segFeatureOptions = new kony.ui.SegmentedUI2({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "data": [{
                    "lblFeature": "Widget Properties"
                }, {
                    "lblFeature": "API's"
                }],
                "groupCells": false,
                "height": "80%",
                "id": "segFeatureOptions",
                "isVisible": true,
                "left": "0.00%",
                "needPageIndicator": true,
                "onRowClick": controller.AS_Segment_df34f2ee6d1344f3a84af71d0c4b0579,
                "pageOffDotImage": "pageoffdot_3.png",
                "pageOnDotImage": "pageondot_3.png",
                "retainSelection": false,
                "rowSkin": "konympSEGFEATURES",
                "rowTemplate": "flxFeatureList",
                "scrollingEvents": {},
                "sectionHeaderSkin": "sliPhoneSegmentHeader",
                "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
                "separatorRequired": false,
                "separatorThickness": 0,
                "showScrollbars": false,
                "top": "2.00%",
                "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
                "widgetDataMap": {
                    "flxFeatureContainer": "flxFeatureContainer",
                    "flxFeatureList": "flxFeatureList",
                    "lblFeature": "lblFeature"
                },
                "width": "100%",
                "zIndex": 1
            }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            flxBody.add(segFeatureOptions);
            var flxDescrptn = new kony.ui.FlexContainer({
                "clipBounds": true,
                "height": "220dp",
                "id": "flxDescrptn",
                "isVisible": true,
                "layoutType": kony.flex.FLOW_VERTICAL,
                "left": "20dp",
                "right": "20dp",
                "skin": "slFbox",
                "top": "40%",
                "zIndex": 10
            }, {}, {});
            flxDescrptn.setDefaultUnit(kony.flex.DP);
            var lblDescptn = new kony.ui.Label({
                "id": "lblDescptn",
                "isVisible": true,
                "left": "0dp",
                "right": "20dp",
                "skin": "konymplblskin",
                "text": "Use the Map Feature App to explore the capabilities offered for Map Features on the Kony AppPlatform. This app takes you through various functionalities and usage details for Map Widget and Map API. Tap on the buttons on the page to explore widgets and APIs as per your requirement.",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "6dp",
                "width": "100%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            flxDescrptn.add(lblDescptn);
            this.add(lblTitle, lblTitleBottomLine, flxBody, flxDescrptn);
        };
        return [{
            "addWidgets": addWidgetsfrmLanding,
            "enabledForIdleTimeout": false,
            "id": "frmLanding",
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