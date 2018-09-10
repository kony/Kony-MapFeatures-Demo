define("frmLanding", function() {
    return function(controller) {
        function addWidgetsfrmLanding() {
            this.setDefaultUnit(kony.flex.DP);
            var lblTitle = new kony.ui.Label({
                "height": "10%",
                "id": "lblTitle",
                "isVisible": true,
                "left": "0%",
                "skin": "lbltextTitle",
                "text": "Map Feature",
                "textStyle": {},
                "top": "0%",
                "width": "100%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "renderAsAnchor": false,
                "textCopyable": false
            });
            var lblTitleBottomLine = new kony.ui.Label({
                "height": "1dp",
                "id": "lblTitleBottomLine",
                "isVisible": true,
                "left": "0%",
                "skin": "LBLLINE",
                "textStyle": {},
                "top": "10%",
                "width": "100%",
                "zIndex": 10
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "renderAsAnchor": false,
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
                "skin": "FLXFAFAFA",
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
                "rowSkin": "SEGFEATURES",
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
            var Button0c4ad1989651943 = new kony.ui.Button({
                "bottom": "4%",
                "focusSkin": "btnimg",
                "height": "70dp",
                "id": "Button0c4ad1989651943",
                "isVisible": false,
                "onClick": controller.AS_Button_ca7c717eb8c44fc8ae09b76240bedc22,
                "right": "4%",
                "skin": "btnimg",
                "width": "70dp",
                "zIndex": 10
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var FlexContainer0i66bc889522e43 = new kony.ui.FlexContainer({
                "clipBounds": true,
                "height": "220dp",
                "id": "FlexContainer0i66bc889522e43",
                "isVisible": true,
                "layoutType": kony.flex.FLOW_VERTICAL,
                "left": "20dp",
                "right": "20dp",
                "skin": "slFbox",
                "top": "40%",
                "zIndex": 10
            }, {}, {});
            FlexContainer0i66bc889522e43.setDefaultUnit(kony.flex.DP);
            var Label0ed2b71944d6e4b = new kony.ui.Label({
                "id": "Label0ed2b71944d6e4b",
                "isVisible": true,
                "left": "0dp",
                "right": "20dp",
                "skin": "lblskin",
                "text": "Use the Map Feature App to explore the capabilities offered for Map Features on the Kony AppPlatform. This app takes you through various functionalities and usage details for Map Widget and Map API. Tap on the buttons on the page to explore widgets and APIs as per your requirement.",
                "textStyle": {},
                "top": "6dp",
                "width": "100%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "renderAsAnchor": false,
                "textCopyable": false
            });
            FlexContainer0i66bc889522e43.add(Label0ed2b71944d6e4b);
            this.add(lblTitle, lblTitleBottomLine, flxBody, Button0c4ad1989651943, FlexContainer0i66bc889522e43);
        };
        return [{
            "addWidgets": addWidgetsfrmLanding,
            "enabledForIdleTimeout": false,
            "id": "frmLanding",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "frmskin"
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": kony.flex.FREE_FORM,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "retainScrollPosition": false
        }]
    }
});