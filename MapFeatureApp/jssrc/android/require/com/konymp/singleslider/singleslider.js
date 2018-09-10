define(function() {
    return function(controller) {
        var singleslider = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "isMaster": true,
            "height": "15%",
            "id": "singleslider",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "skin": "konympslForm0jfc41c38d75b46",
            "top": "0dp",
            "width": "100%"
        }, {}, {});
        singleslider.setDefaultUnit(kony.flex.DP);
        var flxBlocker = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerY": "22%",
            "clipBounds": true,
            "height": "46%",
            "id": "flxBlocker",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "onTouchMove": controller.AS_FlexContainer_b8d5cabdd4b7473aa6c6b6632aaa160a,
            "onTouchStart": controller.AS_FlexContainer_a75bd4f7efdb4a9ab8ec32675edd44bc,
            "skin": "konympsknFlxBlocker",
            "top": "0%",
            "width": "100%",
            "zIndex": 5
        }, {}, {});
        flxBlocker.setDefaultUnit(kony.flex.DP);
        flxBlocker.add();
        var flxContainer = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "clipBounds": true,
            "id": "flxContainer",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "onTouchEnd": controller.AS_FlexContainer_g6a1894e0d3f4ff7b8d84027b79c3243,
            "onTouchMove": controller.AS_FlexContainer_ad825400731b4bbe81a3b018e387463a,
            "skin": "konympflxContainer",
            "top": "0dp",
            "width": "375dp",
            "zIndex": 2
        }, {}, {});
        flxContainer.setDefaultUnit(kony.flex.DP);
        var lblLine = new kony.ui.Label({
            "centerX": "50%",
            "centerY": "65%",
            "height": "1dp",
            "id": "lblLine",
            "isVisible": true,
            "skin": "konymplineSkin",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "width": "78%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var imgBullet1 = new kony.ui.Image2({
            "centerX": "9.50%",
            "centerY": "65%",
            "height": "8dp",
            "id": "imgBullet1",
            "isVisible": true,
            "skin": "slImage",
            "src": "point_blue.png",
            "width": "8dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var imgBullet2 = new kony.ui.Image2({
            "centerX": "88.50%",
            "centerY": "65%",
            "height": "8dp",
            "id": "imgBullet2",
            "isVisible": true,
            "skin": "slImage",
            "src": "point_grey_1.png",
            "width": "8dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblBegin = new kony.ui.Label({
            "centerX": "9.10%",
            "centerY": "87%",
            "id": "lblBegin",
            "isVisible": true,
            "skin": "konympnumberBlue",
            "text": "5",
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
        var lblEnd = new kony.ui.Label({
            "centerX": "87%",
            "centerY": "87%",
            "id": "lblEnd",
            "isVisible": true,
            "skin": "konympnumberLineSkn",
            "text": "15",
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
        var lblRange = new kony.ui.Label({
            "centerY": "65%",
            "height": "1dp",
            "id": "lblRange",
            "isVisible": true,
            "left": "11%",
            "skin": "konymplblSkinRange",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "width": "38%",
            "zIndex": 2
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var flxRight = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerX": "88.50%",
            "clipBounds": true,
            "height": "100%",
            "id": "flxRight",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "45%",
            "onTouchEnd": controller.AS_FlexContainer_a210306c5bfd4b8f8856f4072beaa644,
            "onTouchStart": controller.AS_FlexContainer_ie04a0d4a7c046be9ddebce5909d416d,
            "skin": "konympflxContainer",
            "top": "0%",
            "width": "55dp",
            "zIndex": 5
        }, {}, {});
        flxRight.setDefaultUnit(kony.flex.DP);
        var lblIndicatorRight = new kony.ui.Label({
            "centerX": "50%",
            "centerY": "21%",
            "id": "lblIndicatorRight",
            "isVisible": false,
            "skin": "konympsliderNumber",
            "text": "-999",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "width": kony.flex.USE_PREFFERED_SIZE,
            "zIndex": 5
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var imgPinIndicatorRight = new kony.ui.Image2({
            "centerX": "50%",
            "centerY": "25%",
            "height": "35dp",
            "id": "imgPinIndicatorRight",
            "isVisible": false,
            "src": "singleslider_currentpin.png",
            "top": "77dp",
            "width": "35dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var sliderPin = new kony.ui.Image2({
            "centerX": "50%",
            "centerY": "65%",
            "height": "25dp",
            "id": "sliderPin",
            "isVisible": true,
            "skin": "slImage",
            "src": "singleslider_point.png",
            "width": "25dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flxRight.add(lblIndicatorRight, imgPinIndicatorRight, sliderPin);
        var flxLeft = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerX": "7.50%",
            "clipBounds": true,
            "height": "100%",
            "id": "flxLeft",
            "isVisible": false,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0%",
            "onTouchEnd": controller.AS_FlexContainer_fdd2a26062284d91a20fec12d6e5f9ee,
            "onTouchStart": controller.AS_FlexContainer_a9e9b031414a4c71863194a370f24f2e,
            "skin": "konympflxContainer",
            "top": "0%",
            "width": "55dp",
            "zIndex": 5
        }, {}, {});
        flxLeft.setDefaultUnit(kony.flex.DP);
        var lblIndicatorLeft = new kony.ui.Label({
            "centerX": "50%",
            "centerY": "22%",
            "id": "lblIndicatorLeft",
            "isVisible": false,
            "skin": "konympsliderNumber",
            "text": "-999",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "width": kony.flex.USE_PREFFERED_SIZE,
            "zIndex": 5
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var imgPinIndicator = new kony.ui.Image2({
            "centerX": "50%",
            "centerY": "25%",
            "height": "35dp",
            "id": "imgPinIndicator",
            "isVisible": false,
            "src": "currentpin.png",
            "top": "77dp",
            "width": "35dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var flxSlider = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "65%",
            "clipBounds": true,
            "height": "25dp",
            "id": "flxSlider",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "width": "25dp",
            "zIndex": 1
        }, {}, {});
        flxSlider.setDefaultUnit(kony.flex.DP);
        flxSlider.add();
        flxLeft.add(lblIndicatorLeft, imgPinIndicator, flxSlider);
        var lblBlueSkinPersistent = new kony.ui.Label({
            "id": "lblBlueSkinPersistent",
            "isVisible": false,
            "left": "130dp",
            "skin": "konympnumberBlue",
            "text": "Label",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "59dp",
            "width": kony.flex.USE_PREFFERED_SIZE,
            "zIndex": 5
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxContainer.add(lblLine, imgBullet1, imgBullet2, lblBegin, lblEnd, lblRange, flxRight, flxLeft, lblBlueSkinPersistent);
        var flxback = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerY": "72%",
            "clipBounds": true,
            "height": "60%",
            "id": "flxback",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "onTouchEnd": controller.AS_FlexContainer_bfcad5b9b1094c09b0e87647b14559b1,
            "onTouchMove": controller.AS_FlexContainer_jf0c97fb1b304107aa8ba71ee1c2021d,
            "skin": "konympflxback",
            "top": "27dp",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flxback.setDefaultUnit(kony.flex.DP);
        flxback.add();
        singleslider.add(flxBlocker, flxContainer, flxback);
        return singleslider;
    }
})