define(function() {
    return function(controller) {
        var map4 = new kony.ui.FlexContainer({
            "clipBounds": true,
            "isMaster": true,
            "height": "100%",
            "id": "map4",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "preShow": controller.AS_FlexContainer_gf4b6ba21862497c8626d264001caa4f,
            "skin": "CopyslFbox2",
            "top": "0dp",
            "width": "100%"
        }, {}, {});
        map4.setDefaultUnit(kony.flex.DP);
        var mapView = new kony.ui.Map({
            "calloutWidth": 80,
            "defaultPinImage": "kony_mp_map04_red_pin.png",
            "height": "100%",
            "id": "mapView",
            "isVisible": true,
            "left": "0dp",
            "onPinClick": controller.AS_Map_ffe2ed68e3494b2394fbc13332596ca2,
            "provider": constants.MAP_PROVIDER_GOOGLE,
            "top": "0dp",
            "width": "100%",
            "zIndex": 1
        }, {}, {
            "mode": constants.MAP_VIEW_MODE_NORMAL,
            "showZoomControl": true,
            "zoomLevel": 6
        });
        var flxMain = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "bottom": "1.20%",
            "centerX": "50%",
            "clipBounds": true,
            "height": "100dp",
            "id": "flxMain",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "skin": "konympmap04sknFlxWhite",
            "width": "97%",
            "zIndex": 1
        }, {}, {});
        flxMain.setDefaultUnit(kony.flex.DP);
        var imgMain = new kony.ui.Image2({
            "centerY": "50%",
            "height": "70dp",
            "id": "imgMain",
            "isVisible": true,
            "left": "5.50%",
            "skin": "CopyslImage2",
            "src": "kony_mp_map04_image.png",
            "top": "15%",
            "width": "80dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblHeading = new kony.ui.Label({
            "id": "lblHeading",
            "isVisible": true,
            "left": "30%",
            "skin": "konympmap04BlackBold",
            "text": "5. Bickermann",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "15%",
            "width": "47%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblDistance = new kony.ui.Label({
            "id": "lblDistance",
            "isVisible": true,
            "right": "5.20%",
            "skin": "konympmap04sknLblBlack92",
            "text": "1.2 miles",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "15%",
            "width": kony.flex.USE_PREFFERED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var imgStar1 = new kony.ui.Image2({
            "height": "15dp",
            "id": "imgStar1",
            "isVisible": true,
            "left": "30%",
            "skin": "CopyslImage2",
            "src": "kony_mp_map04_star_small.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var imgStar2 = new kony.ui.Image2({
            "height": "15dp",
            "id": "imgStar2",
            "isVisible": true,
            "left": "34%",
            "skin": "CopyslImage2",
            "src": "kony_mp_map04_star_small.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var imgStar3 = new kony.ui.Image2({
            "height": "15dp",
            "id": "imgStar3",
            "isVisible": true,
            "left": "38%",
            "skin": "CopyslImage2",
            "src": "kony_mp_map04_star_small.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var imgStar4 = new kony.ui.Image2({
            "height": "15dp",
            "id": "imgStar4",
            "isVisible": true,
            "left": "42%",
            "skin": "CopyslImage2",
            "src": "kony_mp_map04_star_small.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var imgStar5 = new kony.ui.Image2({
            "height": "15dp",
            "id": "imgStar5",
            "isVisible": true,
            "left": "46%",
            "skin": "CopyslImage2",
            "src": "kony_mp_map04_star_inactive.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblReviews = new kony.ui.Label({
            "id": "lblReviews",
            "isVisible": true,
            "right": "5.20%",
            "skin": "konympmap04sknLblGrey",
            "text": "12 Reviews",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "39.50%",
            "width": kony.flex.USE_PREFFERED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblDescription = new kony.ui.Label({
            "bottom": "17.50%",
            "id": "lblDescription",
            "isVisible": true,
            "left": "30%",
            "skin": "konympmap04sknLblBlack",
            "text": "428 Cristopher Stravenue Apt.795",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "width": "65%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxMain.add(imgMain, lblHeading, lblDistance, imgStar1, imgStar2, imgStar3, imgStar4, imgStar5, lblReviews, lblDescription);
        var imgBluepin = new kony.ui.Image2({
            "height": "2dp",
            "id": "imgBluepin",
            "isVisible": true,
            "left": "-120%",
            "skin": "CopyslImage2",
            "src": "kony_mp_map04_blue_pin.png",
            "top": "200%",
            "width": "2dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        map4.add(mapView, flxMain, imgBluepin);
        return map4;
    }
})