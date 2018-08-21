define(function() {
    return function(controller) {
        var knowledgeframework = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "isMaster": true,
            "height": "100%",
            "id": "knowledgeframework",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0%",
            "skin": "konympkonympslFbox5",
            "top": "0%",
            "width": "100%",
            "zIndex": 50
        }, {}, {});
        knowledgeframework.setDefaultUnit(kony.flex.DP);
        var flxDeveloperCode = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "100%",
            "id": "flxDeveloperCode",
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "skin": "konympsknFullFlex",
            "top": "0%",
            "width": "100%",
            "zIndex": 50
        }, {}, {});
        flxDeveloperCode.setDefaultUnit(kony.flex.DP);
        var flxHeadingBar = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "10%",
            "id": "flxHeadingBar",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0%",
            "skin": "konympsknFlx1",
            "top": "0dp",
            "width": "100%",
            "zIndex": 5
        }, {}, {});
        flxHeadingBar.setDefaultUnit(kony.flex.DP);
        var flxHeading = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "100%",
            "id": "flxHeading",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0%",
            "skin": "konympkonympslFbox5",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flxHeading.setDefaultUnit(kony.flex.DP);
        var lblHeading = new kony.ui.Label({
            "centerX": "50%",
            "centerY": "50%",
            "id": "lblHeading",
            "isVisible": true,
            "skin": "konympsknLabelHeading",
            "text": "Integration & Orchestration services",
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
        flxHeading.add(lblHeading);
        var flexCloseClick = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerY": "50%",
            "clipBounds": true,
            "focusSkin": "konympslFbox0a4f3bdb41ccf4a",
            "height": "48dp",
            "id": "flexCloseClick",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "onClick": controller.AS_FlexContainer_c0bfa2ba808b461983e9e4bd5598f3dd,
            "right": "0%",
            "skin": "konympslFbox0if2536252a204f",
            "top": "12dp",
            "width": "40dp",
            "zIndex": 1
        }, {}, {});
        flexCloseClick.setDefaultUnit(kony.flex.DP);
        var btnClose = new kony.ui.Image2({
            "centerX": "50%",
            "centerY": "50%",
            "height": "13dp",
            "id": "btnClose",
            "isVisible": true,
            "skin": "konympslImage0d81a3bc6f2ff42",
            "src": "closewhite.png",
            "top": "21dp",
            "width": "13dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flexCloseClick.add(btnClose);
        var flexClickBack = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerY": "50%",
            "clipBounds": true,
            "focusSkin": "konympslFbox0a4f3bdb41ccf4a",
            "height": "40dp",
            "id": "flexClickBack",
            "isVisible": false,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0%",
            "onClick": controller.AS_FlexContainer_g63b364630f446a392346a5234cd8249,
            "skin": "konympslFbox0if2536252a204f",
            "top": "0%",
            "width": "40dp",
            "zIndex": 1
        }, {}, {});
        flexClickBack.setDefaultUnit(kony.flex.DP);
        var btnBack = new kony.ui.Image2({
            "centerX": "50.00%",
            "centerY": "50.28%",
            "height": "20dp",
            "id": "btnBack",
            "isVisible": true,
            "skin": "konympslImage0d81a3bc6f2ff42",
            "src": "back.png",
            "top": "21dp",
            "width": "20dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flexClickBack.add(btnBack);
        flxHeadingBar.add(flxHeading, flexCloseClick, flexClickBack);
        var flxSegData = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "90%",
            "id": "flxSegData",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "skin": "konympsknFlx1",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flxSegData.setDefaultUnit(kony.flex.DP);
        var sgmtAPI = new kony.ui.SegmentedUI2({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "data": [{
                "imgLeftAPI": "chevron.png",
                "lblDummy": "",
                "lblNameOfAPI": "Label"
            }, {
                "imgLeftAPI": "chevron.png",
                "lblDummy": "",
                "lblNameOfAPI": "Label"
            }, {
                "imgLeftAPI": "chevron.png",
                "lblDummy": "",
                "lblNameOfAPI": "Label"
            }],
            "groupCells": false,
            "height": "100%",
            "id": "sgmtAPI",
            "isVisible": true,
            "left": "0%",
            "needPageIndicator": true,
            "onRowClick": controller.AS_Segment_f20429be90354b99b01d2b893ddbc205,
            "pageOffDotImage": "pageoffdot_10.png",
            "pageOnDotImage": "pageondot_10.png",
            "retainSelection": false,
            "rowFocusSkin": "konympseg4",
            "rowSkin": "konympseg",
            "rowTemplate": "flexAPIs",
            "scrollingEvents": {},
            "sectionHeaderSkin": "konympsliPhoneSegmentHeader2",
            "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
            "separatorColor": "ffffff00",
            "separatorRequired": false,
            "separatorThickness": 1,
            "showScrollbars": false,
            "top": "0%",
            "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
            "widgetDataMap": {
                "flexAPIs": "flexAPIs",
                "flexFreeAPI": "flexFreeAPI",
                "imgLeftAPI": "imgLeftAPI",
                "lblDummy": "lblDummy",
                "lblNameOfAPI": "lblNameOfAPI"
            },
            "width": "100%",
            "zIndex": 1
        }, {
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var flxFullScreen = new kony.ui.FlexScrollContainer({
            "allowHorizontalBounce": false,
            "allowVerticalBounce": true,
            "bounces": false,
            "clipBounds": true,
            "enableScrolling": true,
            "height": "100.18%",
            "horizontalScrollIndicator": true,
            "id": "flxFullScreen",
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "100%",
            "pagingEnabled": false,
            "scrollDirection": kony.flex.SCROLL_VERTICAL,
            "skin": "konympsknFullKnowledge",
            "top": "0dp",
            "verticalScrollIndicator": false,
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flxFullScreen.setDefaultUnit(kony.flex.DP);
        var flexAcc1 = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "10%",
            "id": "flexAcc1",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0%",
            "onClick": controller.AS_FlexContainer_f9a4ec7ddd994719b54948ff532e6ce0,
            "skin": "konympsknFlexDevCode",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flexAcc1.setDefaultUnit(kony.flex.DP);
        var lblTitleAcc1 = new kony.ui.Label({
            "centerY": "50.20%",
            "height": "100%",
            "id": "lblTitleAcc1",
            "isVisible": true,
            "left": "0.00%",
            "skin": "konympsknlblAccNormal",
            "text": "What's it ?",
            "textStyle": {},
            "top": "3%",
            "width": "80%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [4, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var btnAccordian1 = new kony.ui.Image2({
            "centerY": "50%",
            "height": "18dp",
            "id": "btnAccordian1",
            "isVisible": true,
            "left": "90%",
            "skin": "konympslImage0d81a3bc6f2ff42",
            "src": "chevron.png",
            "top": "21dp",
            "width": "18dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flexAcc1.add(lblTitleAcc1, btnAccordian1);
        var flexScrollDesc1 = new kony.ui.FlexScrollContainer({
            "allowHorizontalBounce": false,
            "allowVerticalBounce": true,
            "bounces": true,
            "clipBounds": true,
            "enableScrolling": true,
            "height": "70%",
            "horizontalScrollIndicator": true,
            "id": "flexScrollDesc1",
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0%",
            "pagingEnabled": false,
            "scrollDirection": kony.flex.SCROLL_VERTICAL,
            "skin": "konympslFSbox",
            "top": "0%",
            "verticalScrollIndicator": true,
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flexScrollDesc1.setDefaultUnit(kony.flex.DP);
        var rchDesc1 = new kony.ui.RichText({
            "id": "rchDesc1",
            "isVisible": true,
            "left": "0%",
            "skin": "konympslRichText",
            "text": "<b>INTEGRATION & ORCHESTRATION</b><br>Learn how to integrate and configure a backend integration to a rest service and then orchestrate the data response to optimize it for the mobile device using Kony MobileFabric.\n\n",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [4, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var flexImageVideo = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "clipBounds": true,
            "height": "50%",
            "id": "flexImageVideo",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "28dp",
            "skin": "konympkonympslFbox5",
            "top": "5%",
            "width": "95%",
            "zIndex": 1
        }, {}, {});
        flexImageVideo.setDefaultUnit(kony.flex.DP);
        var imgVideoView1 = new kony.ui.Image2({
            "centerX": "50%",
            "height": "100%",
            "id": "imgVideoView1",
            "isVisible": true,
            "skin": "konympslImage0d81a3bc6f2ff42",
            "src": "vizmf.png",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var btnPlay1 = new kony.ui.Button({
            "centerX": "50%",
            "centerY": "50%",
            "height": "36.36%",
            "id": "btnPlay1",
            "isVisible": true,
            "left": "120dp",
            "onClick": controller.AS_Button_gb4c5f57deab4a8293c47082b0f827dd,
            "skin": "konympslButtonGlossBlue",
            "top": "69dp",
            "width": "20%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flexImageVideo.add(imgVideoView1, btnPlay1);
        var lblTitlee = new kony.ui.Label({
            "height": "12%",
            "id": "lblTitlee",
            "isVisible": true,
            "left": "0%",
            "textStyle": {},
            "top": "0%",
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
        flexScrollDesc1.add(rchDesc1, flexImageVideo, lblTitlee);
        var flexAcc2 = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "10%",
            "id": "flexAcc2",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0%",
            "onClick": controller.AS_FlexContainer_dec78694abad48e29c17cf7ebe9f3253,
            "skin": "konympsknFlexDevCode",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flexAcc2.setDefaultUnit(kony.flex.DP);
        var lblTitleAcc2 = new kony.ui.Label({
            "centerY": "50%",
            "height": "100%",
            "id": "lblTitleAcc2",
            "isVisible": true,
            "left": "0%",
            "skin": "konympsknlblAccNormal",
            "text": "How to use ?",
            "textStyle": {},
            "top": "3%",
            "width": "80%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [4, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var btnAccordian2 = new kony.ui.Image2({
            "centerY": "50%",
            "height": "18dp",
            "id": "btnAccordian2",
            "isVisible": true,
            "left": "90%",
            "skin": "konympslImage0d81a3bc6f2ff42",
            "src": "chevron.png",
            "top": "21dp",
            "width": "18dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblStrip1 = new kony.ui.Label({
            "height": "1dp",
            "id": "lblStrip1",
            "isVisible": true,
            "left": "0%",
            "skin": "konympsknLabelKnowledge",
            "top": "0%",
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
        flexAcc2.add(lblTitleAcc2, btnAccordian2, lblStrip1);
        var flexScrollDesc2 = new kony.ui.FlexScrollContainer({
            "allowHorizontalBounce": false,
            "allowVerticalBounce": true,
            "bounces": true,
            "clipBounds": true,
            "enableScrolling": true,
            "height": "70%",
            "horizontalScrollIndicator": true,
            "id": "flexScrollDesc2",
            "isVisible": false,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0%",
            "pagingEnabled": false,
            "scrollDirection": kony.flex.SCROLL_VERTICAL,
            "skin": "konympslFSbox",
            "top": "0%",
            "verticalScrollIndicator": true,
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flexScrollDesc2.setDefaultUnit(kony.flex.DP);
        var rchDesc2 = new kony.ui.RichText({
            "id": "rchDesc2",
            "isVisible": true,
            "left": "0%",
            "skin": "konympslRichText",
            "text": "<b>INTEGRATION & ORCHESTRATION</b><br>Learn how to integrate and configure a backend integration to a rest service and then orchestrate the data response to optimize it for the mobile device using Kony MobileFabric.\n\n",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [4, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var flexImageVideo2 = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "clipBounds": true,
            "height": "50%",
            "id": "flexImageVideo2",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "28dp",
            "skin": "konympkonympslFbox5",
            "top": "5%",
            "width": "95%",
            "zIndex": 1
        }, {}, {});
        flexImageVideo2.setDefaultUnit(kony.flex.DP);
        var imageVideo2 = new kony.ui.Image2({
            "centerX": "50%",
            "height": "100%",
            "id": "imageVideo2",
            "isVisible": true,
            "skin": "konympslImage0d81a3bc6f2ff42",
            "src": "vizmf.png",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var btnPlay2 = new kony.ui.Button({
            "centerX": "50%",
            "centerY": "50%",
            "focusSkin": "konympslButtonGlossRed4",
            "height": "36.36%",
            "id": "btnPlay2",
            "isVisible": true,
            "left": "120dp",
            "onClick": controller.AS_Button_d4ff031c82d54a94a6f71561a03380bd,
            "skin": "konympslButtonGlossBlue",
            "top": "69dp",
            "width": "20%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flexImageVideo2.add(imageVideo2, btnPlay2);
        var Label0ffb83cb7a75b48 = new kony.ui.Label({
            "height": "12%",
            "id": "Label0ffb83cb7a75b48",
            "isVisible": true,
            "left": "0%",
            "top": "0%",
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
        flexScrollDesc2.add(rchDesc2, flexImageVideo2, Label0ffb83cb7a75b48);
        var flexAcc3 = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "10%",
            "id": "flexAcc3",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0%",
            "onClick": controller.AS_FlexContainer_heba193a3290445598c390021f597db9,
            "skin": "konympsknFlexDevCode",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flexAcc3.setDefaultUnit(kony.flex.DP);
        var lblTitleAcc3 = new kony.ui.Label({
            "centerY": "50%",
            "height": "100%",
            "id": "lblTitleAcc3",
            "isVisible": true,
            "left": "0%",
            "skin": "konympsknlblAccNormal",
            "text": "Documentation Link",
            "textStyle": {},
            "top": "3%",
            "width": "80%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [4, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblStrip3 = new kony.ui.Label({
            "height": "1dp",
            "id": "lblStrip3",
            "isVisible": true,
            "left": "0%",
            "skin": "konympsknLabelKnowledge",
            "top": "98%",
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
        var btnAccordian3 = new kony.ui.Image2({
            "centerY": "50%",
            "height": "18dp",
            "id": "btnAccordian3",
            "isVisible": true,
            "left": "90%",
            "skin": "konympslImage0d81a3bc6f2ff42",
            "src": "chevron.png",
            "top": "21dp",
            "width": "18dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblStrip4 = new kony.ui.Label({
            "bottom": "0%",
            "height": "1dp",
            "id": "lblStrip4",
            "isVisible": true,
            "left": "0%",
            "skin": "konympsknLabelKnowledge",
            "top": "0%",
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
        flexAcc3.add(lblTitleAcc3, lblStrip3, btnAccordian3, lblStrip4);
        var flexScrollDesc3 = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "id": "flexScrollDesc3",
            "isVisible": false,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0%",
            "skin": "konympkonympslFbox5",
            "top": "0%",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flexScrollDesc3.setDefaultUnit(kony.flex.DP);
        var rchDesc3 = new kony.ui.RichText({
            "id": "rchDesc3",
            "isVisible": true,
            "left": "0%",
            "linkSkin": "konympslRichText0d02285182d7f42",
            "skin": "konympslRichText",
            "text": "RichText",
            "top": "10dp",
            "width": "100%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [4, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flexScrollDesc3.add(rchDesc3);
        flxFullScreen.add(flexAcc1, flexScrollDesc1, flexAcc2, flexScrollDesc2, flexAcc3, flexScrollDesc3);
        flxSegData.add(sgmtAPI, flxFullScreen);
        flxDeveloperCode.add(flxHeadingBar, flxSegData);
        knowledgeframework.add(flxDeveloperCode);
        return knowledgeframework;
    }
})