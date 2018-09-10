define("frmProperties", function() {
    return function(controller) {
        function addWidgetsfrmProperties() {
            this.setDefaultUnit(kony.flex.DP);
            var lblTitle = new kony.ui.Label({
                "height": "10%",
                "id": "lblTitle",
                "isVisible": true,
                "left": "0%",
                "skin": "lbltextTitle",
                "text": "Widget Properties",
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
                    "lblFeature": "Add Circle"
                }, {
                    "lblFeature": "Add Polygon"
                }, {
                    "lblFeature": "Add Pin"
                }, {
                    "lblFeature": "Update Pins"
                }, {
                    "lblFeature": "Clustered"
                }],
                "groupCells": false,
                "height": "80%",
                "id": "segFeatureOptions",
                "isVisible": true,
                "left": "0%",
                "needPageIndicator": true,
                "onRowClick": controller.AS_Segment_ebd4729e9b6c416580b2199c9cdbef09,
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
                "top": "2%",
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
            var headerIconLeft = new kony.ui.Label({
                "height": "10%",
                "id": "headerIconLeft",
                "isVisible": true,
                "left": "4dp",
                "onTouchEnd": controller.AS_Label_d356ed7362ec4159a97102c426ccd8db,
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
                "renderAsAnchor": false,
                "textCopyable": false
            });
            var FlexContainer0i66bc889522e43 = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "163dp",
                "id": "FlexContainer0i66bc889522e43",
                "isVisible": true,
                "layoutType": kony.flex.FLOW_VERTICAL,
                "left": "20dp",
                "right": "20dp",
                "skin": "slFbox",
                "top": "70%",
                "zIndex": 10
            }, {}, {});
            FlexContainer0i66bc889522e43.setDefaultUnit(kony.flex.DP);
            var Label0ed2b71944d6e4b = new kony.ui.Label({
                "id": "Label0ed2b71944d6e4b",
                "isVisible": true,
                "left": "0dp",
                "right": "20dp",
                "skin": "lblskin",
                "text": "The Map Widget on Kony AppPlatform offers various functionalities like adding a circle & polygon, dropping a pin & dropping multiple pins, and having callouts for dropped pins on the map. Tap on the individual items on the page to explore the feature.",
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
            this.add(lblTitle, lblTitleBottomLine, flxBody, headerIconLeft, FlexContainer0i66bc889522e43);
        };
        return [{
            "addWidgets": addWidgetsfrmProperties,
            "enabledForIdleTimeout": false,
            "id": "frmProperties",
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