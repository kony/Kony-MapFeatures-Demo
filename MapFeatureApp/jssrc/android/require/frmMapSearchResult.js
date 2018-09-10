define("frmMapSearchResult", function() {
    return function(controller) {
        function addWidgetsfrmMapSearchResult() {
            this.setDefaultUnit(kony.flex.DP);
            var mapSearchRoutes = new kony.ui.Map({
                "calloutWidth": 80,
                "defaultPinImage": "pinb.png",
                "height": "100%",
                "id": "mapSearchRoutes",
                "isVisible": true,
                "left": "0dp",
                "provider": constants.MAP_PROVIDER_GOOGLE,
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {}, {
                "mode": constants.MAP_VIEW_MODE_NORMAL,
                "showZoomControl": false,
                "zoomLevel": 4
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
                "skin": "konympflxskin",
                "width": "95%",
                "zIndex": 5
            }, {}, {});
            flxRoutes.setDefaultUnit(kony.flex.DP);
            var flxDestDetails = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "122dp",
                "id": "flxDestDetails",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "skin": "slFbox",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {}, {});
            flxDestDetails.setDefaultUnit(kony.flex.DP);
            var flxdeatils = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "bottom": "0dp",
                "clipBounds": true,
                "height": "60dp",
                "id": "flxdeatils",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "88dp",
                "skin": "slFbox",
                "top": "18dp",
                "width": "69.99%",
                "zIndex": 1
            }, {}, {});
            flxdeatils.setDefaultUnit(kony.flex.DP);
            var lblDest = new kony.ui.Label({
                "id": "lblDest",
                "isVisible": true,
                "left": "0dp",
                "skin": "konymplblskindark",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "8dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var lblDist = new kony.ui.Label({
                "id": "lblDist",
                "isVisible": true,
                "right": "3dp",
                "skin": "konymplblskindark",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "8dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var lblTime = new kony.ui.Label({
                "bottom": "10dp",
                "id": "lblTime",
                "isVisible": true,
                "right": "3dp",
                "skin": "konymplblgreyFont",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            flxdeatils.add(lblDest, lblDist, lblTime);
            var lblOtherTxt = new kony.ui.Label({
                "id": "lblOtherTxt",
                "isVisible": true,
                "left": "15dp",
                "skin": "konymplblskin",
                "text": "Tap to view other route option",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "92dp",
                "width": kony.flex.USE_PREFFERED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var lblTitleBottomLine = new kony.ui.Label({
                "height": "1dp",
                "id": "lblTitleBottomLine",
                "isVisible": true,
                "left": "12dp",
                "right": "19dp",
                "skin": "konympLBLLINE",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "79dp",
                "zIndex": 10
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var flxArrow = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "29dp",
                "id": "flxArrow",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "onClick": controller.AS_FlexContainer_dc6924c5415c42d5810fb11e670ad039,
                "right": "19dp",
                "skin": "konympflxgreyTrans",
                "top": "88dp",
                "width": "29dp",
                "zIndex": 10
            }, {}, {});
            flxArrow.setDefaultUnit(kony.flex.DP);
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
            flxArrow.add(imgArrow);
            var imgDestnation = new kony.ui.Image2({
                "height": "51dp",
                "id": "imgDestnation",
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
            flxDestDetails.add(flxdeatils, lblOtherTxt, lblTitleBottomLine, flxArrow, imgDestnation);
            var lblLine = new kony.ui.Label({
                "centerX": "50%",
                "height": "1dp",
                "id": "lblLine",
                "isVisible": true,
                "skin": "konympLBLLINE",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "10dp",
                "width": "90%",
                "zIndex": 10
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
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
                "rowSkin": "konympseg0c674ae08e9654b",
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
            flxRoutes.add(flxDestDetails, lblLine, segRoutes);
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
            var flxTitle = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "98dp",
                "id": "flxTitle",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "1dp",
                "skin": "konympheaderContainerSknMaster",
                "top": "0dp",
                "width": "100%",
                "zIndex": 5
            }, {}, {});
            flxTitle.setDefaultUnit(kony.flex.DP);
            var hdrDest = new kony.ui.Label({
                "centerX": "50%",
                "height": "20dp",
                "id": "hdrDest",
                "isVisible": true,
                "left": "91dp",
                "right": "72dp",
                "skin": "konymplbltitleskn",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "59dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var line1 = new kony.ui.Label({
                "height": "1dp",
                "id": "line1",
                "isVisible": true,
                "left": "91dp",
                "right": "19dp",
                "skin": "konymplblWhiteLine",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "44dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var line2 = new kony.ui.Label({
                "bottom": "8dp",
                "height": "1dp",
                "id": "line2",
                "isVisible": true,
                "left": "91dp",
                "right": "19dp",
                "skin": "konymplblWhiteLine",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var hdrSrc = new kony.ui.Label({
                "centerX": "50%",
                "height": "20dp",
                "id": "hdrSrc",
                "isVisible": true,
                "left": "91dp",
                "right": "72dp",
                "skin": "konymplbltitleskn",
                "text": "Orlando Airport",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "19dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var imgBack = new kony.ui.Image2({
                "height": "16dp",
                "id": "imgBack",
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
            var imgDest = new kony.ui.Image2({
                "height": "14dp",
                "id": "imgDest",
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
            var imgDot1 = new kony.ui.Image2({
                "height": "4dp",
                "id": "imgDot1",
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
            var imgDot2 = new kony.ui.Image2({
                "height": "4dp",
                "id": "imgDot2",
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
            var imgDot3 = new kony.ui.Image2({
                "height": "4dp",
                "id": "imgDot3",
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
            var IimgSrc = new kony.ui.Image2({
                "height": "10dp",
                "id": "IimgSrc",
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
            flxTitle.add(hdrDest, line1, line2, hdrSrc, imgBack, imgDest, imgDot1, imgDot2, imgDot3, IimgSrc);
            this.add(mapSearchRoutes, flxRoutes, flxOverlay, flxTitle);
        };
        return [{
            "addWidgets": addWidgetsfrmMapSearchResult,
            "enabledForIdleTimeout": false,
            "id": "frmMapSearchResult",
            "layoutType": kony.flex.FREE_FORM,
            "needAppMenu": false,
            "onHide": controller.AS_Form_b10f9d240bbd45daac9e7841ee1547dd,
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