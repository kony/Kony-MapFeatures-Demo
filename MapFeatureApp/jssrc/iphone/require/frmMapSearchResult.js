define("frmMapSearchResult", function() {
    return function(controller) {
        function addWidgetsfrmMapSearchResult() {
            this.setDefaultUnit(kony.flex.DP);
            var map1 = new kony.ui.Map({
                "calloutWidth": 80,
                "defaultPinImage": "pinb.png",
                "height": "100%",
                "id": "map1",
                "isVisible": true,
                "left": "0dp",
                "provider": constants.MAP_PROVIDER_GOOGLE,
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {}, {
                "mode": constants.MAP_VIEW_MODE_NORMAL,
                "showCurrentLocation": constants.MAP_VIEW_SHOW_CURRENT_LOCATION_NONE,
                "zoomLevel": 4
            });
            var flxRoutes = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                "blur": {
                    "enabled": false,
                    "value": 0
                },
                "bottom": "0dp",
                "centerX": "50%",
                "clipBounds": true,
                "id": "flxRoutes",
                "isVisible": true,
                "layoutType": kony.flex.FLOW_VERTICAL,
                "reverseLayoutDirection": false,
                "left": "0dp",
                "skin": "flxskin",
                "top": "84.50%",
                "width": "95%",
                "zIndex": 5
            }, {}, {});
            flxRoutes.setDefaultUnit(kony.flex.DP);
            var FlexContainer0f0e1e43c7ef844 = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "95dp",
                "id": "FlexContainer0f0e1e43c7ef844",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "onClick": controller.AS_FlexContainer_f32760f5148649eba3744acb8c4679e0,
                "skin": "slFbox",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {}, {});
            FlexContainer0f0e1e43c7ef844.setDefaultUnit(kony.flex.DP);
            var Image0b44e29e7dbde41 = new kony.ui.Image2({
                "height": "65dp",
                "id": "Image0b44e29e7dbde41",
                "isVisible": true,
                "left": "5.30%",
                "skin": "slImage",
                "src": "kony_mp_map04_image.png",
                "top": "1.95%",
                "width": "70dp",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var FlexContainer0b914e0d7bc0940 = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "bottom": 0,
                "clipBounds": true,
                "height": "65dp",
                "id": "FlexContainer0b914e0d7bc0940",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "30.00%",
                "skin": "slFbox",
                "top": "1.79%",
                "width": "69.99%",
                "zIndex": 1
            }, {}, {});
            FlexContainer0b914e0d7bc0940.setDefaultUnit(kony.flex.DP);
            var lblDest = new kony.ui.Label({
                "id": "lblDest",
                "isVisible": true,
                "left": "0dp",
                "skin": "lblskin",
                "textStyle": {},
                "top": "11dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            var lblDist = new kony.ui.Label({
                "id": "lblDist",
                "isVisible": true,
                "right": "10dp",
                "skin": "lblskin",
                "textStyle": {},
                "top": "11dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            var lblTime = new kony.ui.Label({
                "bottom": "0dp",
                "id": "lblTime",
                "isVisible": true,
                "left": "0dp",
                "skin": "lblskin",
                "textStyle": {},
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            FlexContainer0b914e0d7bc0940.add(lblDest, lblDist, lblTime);
            var Label0j097931a40ff41 = new kony.ui.Label({
                "centerX": "50%",
                "id": "Label0j097931a40ff41",
                "isVisible": true,
                "skin": "lblskin",
                "text": "Other route options ...",
                "textStyle": {},
                "top": "70dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            var lblTitleBottomLine = new kony.ui.Label({
                "height": "1dp",
                "id": "lblTitleBottomLine",
                "isVisible": true,
                "left": "0%",
                "skin": "LBLLINE",
                "textStyle": {},
                "top": "67dp",
                "width": "100%",
                "zIndex": 10
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            FlexContainer0f0e1e43c7ef844.add(Image0b44e29e7dbde41, FlexContainer0b914e0d7bc0940, Label0j097931a40ff41, lblTitleBottomLine);
            var segRoutes = new kony.ui.SegmentedUI2({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "data": [{
                    "Label0e4341295167a4e": "Label"
                }, {
                    "Label0e4341295167a4e": "Label"
                }, {
                    "Label0e4341295167a4e": "Label"
                }],
                "groupCells": false,
                "height": "120dp",
                "id": "segRoutes",
                "isVisible": true,
                "left": "0dp",
                "needPageIndicator": true,
                "onRowClick": controller.AS_Segment_e3bc8fe5889141988b7e652fef85e96c,
                "pageOffDotImage": "pageoffdot.png",
                "pageOnDotImage": "pageondot.png",
                "retainSelection": false,
                "rowFocusSkin": "seg2Focus",
                "rowSkin": "Copyseg0c674ae08e9654b",
                "rowTemplate": "Flex0hc97bc34468649",
                "scrollingEvents": {},
                "sectionHeaderSkin": "sliPhoneSegmentHeader",
                "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
                "separatorColor": "ffffff00",
                "separatorRequired": true,
                "separatorThickness": 5,
                "showScrollbars": false,
                "top": "10dp",
                "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
                "widgetDataMap": {
                    "Flex0hc97bc34468649": "Flex0hc97bc34468649",
                    "Label0e4341295167a4e": "Label0e4341295167a4e"
                },
                "width": "90%",
                "zIndex": 1
            }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "bounces": true,
                "editStyle": constants.SEGUI_EDITING_STYLE_NONE,
                "enableDictionary": false,
                "indicator": constants.SEGUI_NONE,
                "progressIndicatorColor": constants.PROGRESS_INDICATOR_COLOR_WHITE,
                "showProgressIndicator": true
            });
            flxRoutes.add(FlexContainer0f0e1e43c7ef844, segRoutes);
            var flxOverlay = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "100%",
                "id": "flxOverlay",
                "isVisible": false,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "onTouchStart": controller.AS_FlexContainer_j89b3247a6364783bcf8e4980fe339b0,
                "skin": "konympmap05BackgroundOverlay",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {}, {});
            flxOverlay.setDefaultUnit(kony.flex.DP);
            flxOverlay.add();
            var headerContainer08 = new kony.ui.FlexContainer({
                "clipBounds": true,
                "height": "55dp",
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
            var hdrDest = new kony.ui.Label({
                "centerX": "50%",
                "height": "50%",
                "id": "hdrDest",
                "isVisible": true,
                "left": "72dp",
                "right": "72dp",
                "skin": "lbltitleskn",
                "textStyle": {},
                "top": "50%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            var headerIconLeft = new kony.ui.Label({
                "height": "100%",
                "id": "headerIconLeft",
                "isVisible": true,
                "left": "4dp",
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
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            var headerButtonLeft = new kony.ui.Button({
                "focusSkin": "headerIconCartSkin",
                "height": "100%",
                "id": "headerButtonLeft",
                "isVisible": true,
                "left": "0dp",
                "onClick": controller.AS_Button_b5b3c45a994a434c82859afb4e001f11,
                "skin": "headerButtonBackSkin",
                "text": "Back",
                "top": "0dp",
                "width": "74dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "displayText": true,
                "padding": [27, 0, 0, 0],
                "paddingInPixel": true
            }, {
                "showProgressIndicator": true
            });
            var hdrsrc = new kony.ui.Label({
                "centerX": "50%",
                "height": "50%",
                "id": "hdrsrc",
                "isVisible": true,
                "left": "72dp",
                "right": "72dp",
                "skin": "lbltitleskn",
                "text": "Src: Orlando Airport",
                "textStyle": {},
                "top": "0%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false,
                "wrapping": constants.WIDGET_TEXT_WORD_WRAP
            });
            headerContainer08.add(hdrDest, headerIconLeft, headerButtonLeft, hdrsrc);
            this.add(map1, flxRoutes, flxOverlay, headerContainer08);
        };
        return [{
            "addWidgets": addWidgetsfrmMapSearchResult,
            "enabledForIdleTimeout": false,
            "id": "frmMapSearchResult",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "onHide": controller.AS_Form_b10f9d240bbd45daac9e7841ee1547dd,
            "skin": "slForm"
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": kony.flex.FREE_FORM,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "configureExtendBottom": false,
            "configureExtendTop": false,
            "configureStatusBarStyle": false,
            "footerOverlap": false,
            "formTransparencyDuringPostShow": "100",
            "headerOverlap": false,
            "inputAccessoryViewType": constants.FORM_INPUTACCESSORYVIEW_CANCEL,
            "needsIndicatorDuringPostShow": false,
            "retainScrollPosition": false,
            "titleBar": false,
            "titleBarSkin": "slTitleBar"
        }]
    }
});