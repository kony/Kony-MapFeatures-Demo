define("frmKnowledgeFramework", function() {
    return function(controller) {
        function addWidgetsfrmKnowledgeFramework() {
            this.setDefaultUnit(kony.flex.DP);
            var knowledgeframework = new com.konymp.knowledgeframework({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "100%",
                "id": "knowledgeframework",
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0%",
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "skin": "konympkonympslFbox5",
                "top": "0%",
                "width": "100%",
                "zIndex": 50
            }, {}, {});
            this.add(knowledgeframework);
        };
        return [{
            "addWidgets": addWidgetsfrmKnowledgeFramework,
            "enabledForIdleTimeout": false,
            "id": "frmKnowledgeFramework",
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