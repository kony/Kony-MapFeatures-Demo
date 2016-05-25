function addWidgetsfrmMyRouteSearch() {
    frmMyRouteSearch.setDefaultUnit(kony.flex.DP);
    var mapRouteSearch = new kony.ui.Map({
        "calloutWidth": 80,
        "defaultPinImage": "pinb.png",
        "height": "100%",
        "id": "mapRouteSearch",
        "isVisible": true,
        "left": "0%",
        "locationData": [{
            "desc": "Phoenix infocity, Gachibowli",
            "lat": "17.447326",
            "lon": "78.371358",
            "name": "KonyLabs(New)"
        }, {
            "desc": "Mindspace, Hitech City",
            "lat": "17.441839",
            "lon": "78.380928",
            "name": "KonyLabs(Old)"
        }, {
            "desc": "Orlando, US",
            "lat": "28.449340",
            "lon": "-81.481519",
            "name": "KonyLabs"
        }],
        "onClick": AS_Map_e1e31c56325e4f1aa3340a6a70ab4101,
        "provider": constants.MAP_PROVIDER_GOOGLE,
        "screenLevelWidget": false,
        "top": "0%",
        "width": "100%",
        "zIndex": 100
    }, {
        "containerWeight": 100,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false
    }, {
        "mode": constants.MAP_VIEW_MODE_NORMAL,
        "showCurrentLocation": constants.MAP_VIEW_SHOW_CURRENT_LOCATION_NONE,
        "zoomLevel": 15
    });
    var btnMyRS = new kony.ui.Button({
        "focusSkin": "slButtonGlossRed",
        "height": "6.50%",
        "id": "btnMyRS",
        "isVisible": true,
        "left": "0%",
        "onClick": AS_Button_e2a4ceae8da94d5988b6f1a7b0669783,
        "skin": "CopyslButtonGlossBlue08ef21f7ed15f44",
        "text": "Show Turn By Turn Directions",
        "top": "93.22%",
        "width": "100%",
        "zIndex": 105
    }, {
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "hExpand": true,
        "margin": [6, 6, 6, 6],
        "marginInPixel": false,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false,
        "vExpand": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "showProgressIndicator": true
    });
    var flxScrlSeg = new kony.ui.FlexScrollContainer({
        "allowHorizontalBounce": true,
        "allowVerticalBounce": true,
        "bottom": "0%",
        "bounces": true,
        "clipBounds": true,
        "enableScrolling": true,
        "height": "100%",
        "horizontalScrollIndicator": true,
        "id": "flxScrlSeg",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "pagingEnabled": false,
        "right": "0%",
        "scrollDirection": kony.flex.SCROLL_HORIZONTAL,
        "skin": "slFSbox",
        "top": "0%",
        "verticalScrollIndicator": true,
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    flxScrlSeg.setDefaultUnit(kony.flex.DP);
    var segDirections = new kony.ui.SegmentedUI2({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "bottom": "0%",
        "data": [{
            "lblDirection": "Direction",
            "lblDistance": "Distnace"
        }],
        "groupCells": false,
        "height": "100%",
        "id": "segDirections",
        "isVisible": true,
        "left": "0%",
        "needPageIndicator": true,
        "pageOffDotImage": "pageOffDot.png",
        "pageOnDotImage": "pageOnDot.png",
        "retainSelection": false,
        "right": "0%",
        "rowFocusSkin": "seg2Focus",
        "rowSkin": "seg2Normal",
        "rowTemplate": flxTempDirection,
        "screenLevelWidget": false,
        "scrollingEvents": {},
        "sectionHeaderSkin": "sliPhoneSegmentHeader",
        "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
        "separatorColor": "64646400",
        "separatorRequired": true,
        "separatorThickness": 1,
        "showScrollbars": false,
        "top": "0%",
        "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
        "widgetDataMap": {
            "flxTempDirection": "flxTempDirection",
            "lblDirection": "lblDirection",
            "lblDistance": "lblDistance"
        },
        "width": "100%"
    }, {
        "containerWeight": 100,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [2, 2, 2, 2],
        "paddingInPixel": false,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    }, {
        "bounces": true,
        "editStyle": constants.SEGUI_EDITING_STYLE_NONE,
        "enableDictionary": false,
        "indicator": constants.SEGUI_ROW_SELECT,
        "progressIndicatorColor": constants.PROGRESS_INDICATOR_COLOR_WHITE,
        "showProgressIndicator": true
    });
    flxScrlSeg.add(
    segDirections);
    frmMyRouteSearch.add(
    mapRouteSearch, btnMyRS, flxScrlSeg);
};

function frmMyRouteSearchGlobals() {
    frmMyRouteSearch = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmMyRouteSearch,
        "bounces": false,
        "enableScrolling": false,
        "enabledForIdleTimeout": false,
        "id": "frmMyRouteSearch",
        "layoutType": kony.flex.FREE_FORM,
        "needAppMenu": false,
        "onHide": AS_Form_70e50808698b4017a28dfb090f349b0d,
        "postShow": AS_Form_120abfc2f4e040e783f96791f8857181,
        "preShow": AS_Form_0c4b8e2ad48549108ab632c7baf0253c,
        "skin": "slForm"
    }, {
        "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
        "layoutType": kony.flex.FREE_FORM,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "bounces": false,
        "configureExtendBottom": false,
        "configureExtendTop": false,
        "configureStatusBarStyle": false,
        "footerOverlap": false,
        "formTransparencyDuringPostShow": "100",
        "headerOverlap": false,
        "inputAccessoryViewType": constants.FORM_INPUTACCESSORYVIEW_CANCEL,
        "needsIndicatorDuringPostShow": false,
        "retainScrollPosition": false,
        "titleBar": true,
        "titleBarConfig": {
            "renderTitleText": true,
            "prevFormTitle": false,
            "titleBarLeftSideView": "button",
            "labelLeftSideView": "Back",
            "titleBarRightSideView": "button",
            "labelRightSideView": "Edit"
        },
        "titleBarSkin": "slTitleBar"
    });
};