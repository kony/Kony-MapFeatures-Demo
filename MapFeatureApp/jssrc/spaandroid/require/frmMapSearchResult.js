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
                "mapSource": constants.MAP_SOURCE_NON_NATIVE,
                "mode": constants.MAP_VIEW_MODE_NORMAL
            });
            var flxRoutes = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                "blur": {
                    "enabled": false,
                    "value": 0
                },
                "bottom": "10dp",
                "centerX": "50%",
                "clipBounds": true,
                "id": "flxRoutes",
                "isVisible": true,
                "layoutType": kony.flex.FLOW_VERTICAL,
                "reverseLayoutDirection": false,
                "left": "0dp",
                "skin": "flxskin",
                "width": "95%",
                "zIndex": 5
            }, {}, {});
            flxRoutes.setDefaultUnit(kony.flex.DP);
            var FlexContainer0f0e1e43c7ef844 = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "122dp",
                "id": "FlexContainer0f0e1e43c7ef844",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "skin": "slFbox",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {}, {});
            FlexContainer0f0e1e43c7ef844.setDefaultUnit(kony.flex.DP);
            var FlexContainer0b914e0d7bc0940 = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "bottom": "0dp",
                "clipBounds": true,
                "height": "60dp",
                "id": "FlexContainer0b914e0d7bc0940",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "88dp",
                "skin": "slFbox",
                "top": "18dp",
                "width": "69.99%",
                "zIndex": 1
            }, {}, {});
            FlexContainer0b914e0d7bc0940.setDefaultUnit(kony.flex.DP);
            var lblDest = new kony.ui.Label({
                "id": "lblDest",
                "isVisible": true,
                "left": "0dp",
                "skin": "lblskindark",
                "textStyle": {},
                "top": "8dp",
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
            var lblDist = new kony.ui.Label({
                "id": "lblDist",
                "isVisible": true,
                "right": "3dp",
                "skin": "lblskindark",
                "textStyle": {},
                "top": "8dp",
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
            var lblTime = new kony.ui.Label({
                "bottom": "10dp",
                "id": "lblTime",
                "isVisible": true,
                "right": "3dp",
                "skin": "lblgreyFont",
                "textStyle": {},
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
            FlexContainer0b914e0d7bc0940.add(lblDest, lblDist, lblTime);
            var Label0j097931a40ff41 = new kony.ui.Label({
                "id": "Label0j097931a40ff41",
                "isVisible": true,
                "left": "15dp",
                "skin": "lblskin",
                "text": "Tap to view other route option",
                "textStyle": {},
                "top": "92dp",
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
            var lblTitleBottomLine = new kony.ui.Label({
                "height": "1dp",
                "id": "lblTitleBottomLine",
                "isVisible": true,
                "left": "12dp",
                "right": "19dp",
                "skin": "LBLLINE",
                "textStyle": {},
                "top": "79dp",
                "zIndex": 10
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "renderAsAnchor": false,
                "textCopyable": false
            });
            var FlexContainer0feb66212d20a47 = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "29dp",
                "id": "FlexContainer0feb66212d20a47",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "onClick": controller.AS_FlexContainer_dc6924c5415c42d5810fb11e670ad039,
                "right": "19dp",
                "skin": "flxgreyTrans",
                "top": "88dp",
                "width": "29dp",
                "zIndex": 10
            }, {}, {});
            FlexContainer0feb66212d20a47.setDefaultUnit(kony.flex.DP);
            var imgArrow = new kony.ui.Image2({
                "centerY": "50%",
                "height": "14dp",
                "id": "imgArrow",
                "isVisible": true,
                "left": "5dp",
                "skin": "slImage",
                "src": "arrow_right.png",
                "top": "5dp",
                "width": "14dp",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            FlexContainer0feb66212d20a47.add(imgArrow);
            var Image0jd19bec68b7043 = new kony.ui.Image2({
                "height": "51dp",
                "id": "Image0jd19bec68b7043",
                "isVisible": true,
                "left": "12dp",
                "skin": "slImage",
                "src": "kony_mp_map04_image.png",
                "top": "18dp",
                "width": "53dp",
                "zIndex": 10
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            FlexContainer0f0e1e43c7ef844.add(FlexContainer0b914e0d7bc0940, Label0j097931a40ff41, lblTitleBottomLine, FlexContainer0feb66212d20a47, Image0jd19bec68b7043);
            var CopylblTitleBottomLine0dd95bd96e69943 = new kony.ui.Label({
                "centerX": "50%",
                "height": "1dp",
                "id": "CopylblTitleBottomLine0dd95bd96e69943",
                "isVisible": true,
                "skin": "LBLLINE",
                "textStyle": {},
                "top": "10dp",
                "width": "90%",
                "zIndex": 10
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "renderAsAnchor": false,
                "textCopyable": false
            });
            var segRoutes = new kony.ui.SegmentedUI2({
                "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                "centerX": "50%",
                "data": [{
                    "lblRoute": "",
                    "lbldistnTime": ""
                }],
                "groupCells": false,
                "id": "segRoutes",
                "isVisible": false,
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
                "separatorColor": "a9a9a932",
                "separatorRequired": true,
                "separatorThickness": 1,
                "showScrollbars": false,
                "top": "0dp",
                "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
                "widgetDataMap": {
                    "Flex0hc97bc34468649": "Flex0hc97bc34468649",
                    "lblRoute": "lblRoute",
                    "lbldistnTime": "lbldistnTime"
                },
                "width": "90%",
                "zIndex": 1
            }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            flxRoutes.add(FlexContainer0f0e1e43c7ef844, CopylblTitleBottomLine0dd95bd96e69943, segRoutes);
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
            var FlexContainer0b27f9f10d83043 = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "98dp",
                "id": "FlexContainer0b27f9f10d83043",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "1dp",
                "skin": "headerContainerSknMaster",
                "top": "0dp",
                "width": "100%",
                "zIndex": 5
            }, {}, {});
            FlexContainer0b27f9f10d83043.setDefaultUnit(kony.flex.DP);
            var hdrDest = new kony.ui.Label({
                "centerX": "50%",
                "height": "20dp",
                "id": "hdrDest",
                "isVisible": true,
                "left": "91dp",
                "right": "72dp",
                "skin": "lbltitleskn",
                "textStyle": {},
                "top": "59dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "renderAsAnchor": false,
                "textCopyable": false
            });
            var CopylblLine0c85f3d84987541 = new kony.ui.Label({
                "height": "1dp",
                "id": "CopylblLine0c85f3d84987541",
                "isVisible": true,
                "left": "91dp",
                "right": "19dp",
                "skin": "lblWhiteLine",
                "textStyle": {},
                "top": "44dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "renderAsAnchor": false,
                "textCopyable": false
            });
            var CopylblLine0b3341a396e3743 = new kony.ui.Label({
                "bottom": "8dp",
                "height": "1dp",
                "id": "CopylblLine0b3341a396e3743",
                "isVisible": true,
                "left": "91dp",
                "right": "19dp",
                "skin": "lblWhiteLine",
                "textStyle": {},
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "renderAsAnchor": false,
                "textCopyable": false
            });
            var hdrSrc = new kony.ui.Label({
                "centerX": "50%",
                "height": "20dp",
                "id": "hdrSrc",
                "isVisible": true,
                "left": "91dp",
                "right": "72dp",
                "skin": "lbltitleskn",
                "text": "Orlando Airport",
                "textStyle": {},
                "top": "19dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "renderAsAnchor": false,
                "textCopyable": false
            });
            var Image0d158b2198d4e4b = new kony.ui.Image2({
                "height": "16dp",
                "id": "Image0d158b2198d4e4b",
                "isVisible": true,
                "left": "20dp",
                "onTouchEnd": controller.AS_Image_baf468b0aa204a519542e1bbebb85c22,
                "skin": "slImage",
                "src": "backward_arrow.png",
                "top": "20dp",
                "width": "16dp",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var Image0f01deddefdee4a = new kony.ui.Image2({
                "height": "14dp",
                "id": "Image0f01deddefdee4a",
                "isVisible": true,
                "left": "59dp",
                "skin": "slImage",
                "src": "map_white.png",
                "top": "64dp",
                "width": "10dp",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var Image0h0fa3c2799d441 = new kony.ui.Image2({
                "height": "4dp",
                "id": "Image0h0fa3c2799d441",
                "isVisible": true,
                "left": "62dp",
                "skin": "slImage",
                "src": "map_dot.png",
                "top": "39dp",
                "width": "4dp",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var CopyImage0jf1794ddc8584e = new kony.ui.Image2({
                "height": "4dp",
                "id": "CopyImage0jf1794ddc8584e",
                "isVisible": true,
                "left": "62dp",
                "skin": "slImage",
                "src": "map_dot.png",
                "top": "47dp",
                "width": "4dp",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var CopyImage0c3b89e14d31449 = new kony.ui.Image2({
                "height": "4dp",
                "id": "CopyImage0c3b89e14d31449",
                "isVisible": true,
                "left": "62dp",
                "skin": "slImage",
                "src": "map_dot.png",
                "top": "55dp",
                "width": "4dp",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            FlexContainer0b27f9f10d83043.add(hdrDest, CopylblLine0c85f3d84987541, CopylblLine0b3341a396e3743, hdrSrc, Image0d158b2198d4e4b, Image0f01deddefdee4a, Image0h0fa3c2799d441, CopyImage0jf1794ddc8584e, CopyImage0c3b89e14d31449);
            var Image0d35ee58c2d2e42 = new kony.ui.Image2({
                "height": "10dp",
                "id": "Image0d35ee58c2d2e42",
                "isVisible": true,
                "left": "59dp",
                "skin": "slImage",
                "src": "map_round.png",
                "top": "23dp",
                "width": "10dp",
                "zIndex": 5
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            this.add(map1, flxRoutes, flxOverlay, FlexContainer0b27f9f10d83043, Image0d35ee58c2d2e42);
        };
        return [{
            "addWidgets": addWidgetsfrmMapSearchResult,
            "enabledForIdleTimeout": false,
            "id": "frmMapSearchResult",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "onHide": controller.AS_Form_b10f9d240bbd45daac9e7841ee1547dd,
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