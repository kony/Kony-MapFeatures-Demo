define("flxParent", function() {
    return function(controller) {
        var flxParent = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "15%",
            "id": "flxParent",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "skin": "konympamapsknFlxBackgroundWhiteRoundedCorner",
            "width": "300dp"
        }, {}, {});
        flxParent.setDefaultUnit(kony.flex.DP);
        var lblDescription = new kony.ui.Label({
            "bottom": "17.80%",
            "id": "lblDescription",
            "isVisible": true,
            "left": "6%",
            "skin": "konympmap04sknLblBlack",
            "text": "428 Cristopher Stravenue Apt.795",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "width": "90%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblReviews = new kony.ui.Label({
            "id": "lblReviews",
            "isVisible": true,
            "right": "39.50%",
            "skin": "konympmapsknLblGrey",
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
        var lblHeading = new kony.ui.Label({
            "id": "lblHeading",
            "isVisible": true,
            "left": "6%",
            "skin": "konympmap04BlackBold",
            "text": "Bikermann Davis",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "17.50%",
            "width": "70%",
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
            "skin": "konympmap04sknLblBlack",
            "text": "1.2 miles",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "17.50%",
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
            "left": "6%",
            "skin": "slImage",
            "src": "kony_mp_map02_star_small.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var imgStar2 = new kony.ui.Image2({
            "height": "15dp",
            "id": "imgStar2",
            "isVisible": true,
            "left": "11%",
            "skin": "slImage",
            "src": "kony_mp_map02_star_small.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var imgStar3 = new kony.ui.Image2({
            "height": "15dp",
            "id": "imgStar3",
            "isVisible": true,
            "left": "16%",
            "skin": "slImage",
            "src": "kony_mp_map02_star_small.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var imgStar4 = new kony.ui.Image2({
            "height": "15dp",
            "id": "imgStar4",
            "isVisible": true,
            "left": "21%",
            "skin": "slImage",
            "src": "kony_mp_map02_star_small.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var imgStar5 = new kony.ui.Image2({
            "height": "15dp",
            "id": "imgStar5",
            "isVisible": true,
            "left": "26%",
            "skin": "slImage",
            "src": "kony_mp_map02_star_small.png",
            "top": "39.50%",
            "width": "15dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flxParent.add(lblDescription, lblReviews, lblHeading, lblDistance, imgStar1, imgStar2, imgStar3, imgStar4, imgStar5);
        return flxParent;
    }
})