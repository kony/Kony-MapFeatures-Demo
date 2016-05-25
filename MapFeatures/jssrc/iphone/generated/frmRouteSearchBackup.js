function addWidgetsfrmRouteSearchBackup() {
    frmRouteSearchBackup.setDefaultUnit(kony.flex.DP);
    var mapRouteSearch = new kony.ui.Map({
        "calloutWidth": 80,
        "defaultPinImage": "pinb.png",
        "height": "190%",
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
        "onClick": AS_Map_f550870478e84b5da2210d73b674ce80,
        "provider": constants.MAP_PROVIDER_GOOGLE,
        "screenLevelWidget": false,
        "top": "0%",
        "width": "100%"
    }, {
        "containerWeight": 100,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false
    }, {
        "mode": constants.MAP_VIEW_MODE_NORMAL,
        "showCurrentLocation": constants.MAP_VIEW_SHOW_CURRENT_LOCATION_NONE,
        "zoomLevel": 10
    });
    var flxscrlContainer = new kony.ui.FlexScrollContainer({
        "allowHorizontalBounce": true,
        "allowVerticalBounce": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "bounces": false,
        "clipBounds": true,
        "enableScrolling": true,
        "horizontalScrollIndicator": true,
        "id": "flxscrlContainer",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "onTouchStart": AS_FlexScrollContainer_47dc3c9a3bb94fec8a9ffae76d3e1e8b,
        "pagingEnabled": false,
        "scrollDirection": kony.flex.SCROLL_VERTICAL,
        "skin": "CopyslFSbox0d2dc004796d840",
        "top": "90%",
        "verticalScrollIndicator": true,
        "width": "100%",
        "zIndex": 200
    }, {}, {
        "bouncesZoom": false
    });
    flxscrlContainer.setDefaultUnit(kony.flex.DP);
    var segDirections = new kony.ui.SegmentedUI2({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "data": [{
            "lblDirection": "Directions",
            "lblDistance": "Distance in Meters"
        }],
        "groupCells": false,
        "id": "segDirections",
        "isVisible": true,
        "left": "2%",
        "needPageIndicator": true,
        "onRowClick": AS_Segment_fa135b20a12042be95e70cf9b5c48972,
        "pageOffDotImage": "pageOffDot.png",
        "pageOnDotImage": "pageOnDot.png",
        "retainSelection": false,
        "right": "2%",
        "rowFocusSkin": "seg2Focus",
        "rowSkin": "seg2Normal",
        "rowTemplate": CopyFBox08b1e4e94830740,
        "screenLevelWidget": false,
        "scrollingEvents": {},
        "sectionHeaderSkin": "sliPhoneSegmentHeader",
        "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
        "separatorColor": "64646400",
        "separatorRequired": true,
        "separatorThickness": 1,
        "showScrollbars": false,
        "top": "1%",
        "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
        "widgetDataMap": {
            "lblDirection": "lblDirection",
            "lblDistance": "lblDistance"
        },
        "width": "96%"
    }, {
        "containerWeight": 100,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false,
        "padding": [0, 0, 0, 0],
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
    flxscrlContainer.add(
    segDirections);
    frmRouteSearchBackup.add(
    mapRouteSearch, flxscrlContainer);
};

function frmRouteSearchBackupGlobals() {
    frmRouteSearchBackup = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmRouteSearchBackup,
        "bounces": false,
        "enableScrolling": false,
        "enabledForIdleTimeout": false,
        "footers": [flexFtr],
        "id": "frmRouteSearchBackup",
        "layoutType": kony.flex.FREE_FORM,
        "needAppMenu": false,
        "onHide": AS_Form_d634aa9e196349ad9a9e27e88c0b1af9,
        "postShow": AS_Form_8f81f7d97afa4e4facd0a098a9328157,
        "preShow": AS_Form_cca481983e9f48b49713695249c2048e,
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