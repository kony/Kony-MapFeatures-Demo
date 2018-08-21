define({
    appInit: function(params) {
        skinsInit();
        kony.mvc.registry.add("com.konymp.map2", "map2", "map2Controller");
        kony.application.registerMaster({
            "namespace": "com.konymp",
            "classname": "map2",
            "name": "com.konymp.map2"
        });
        kony.mvc.registry.add("com.konymp.map4", "map4", "map4Controller");
        kony.application.registerMaster({
            "namespace": "com.konymp",
            "classname": "map4",
            "name": "com.konymp.map4"
        });
        kony.mvc.registry.add("com.konymp.singleslider", "singleslider", "singlesliderController");
        kony.application.registerMaster({
            "namespace": "com.konymp",
            "classname": "singleslider",
            "name": "com.konymp.singleslider"
        });
        kony.mvc.registry.add("Flex0hc97bc34468649", "Flex0hc97bc34468649", "Flex0hc97bc34468649Controller");
        kony.mvc.registry.add("flxFeatureList", "flxFeatureList", "flxFeatureListController");
        kony.mvc.registry.add("flxMapTmpRootContiner", "flxMapTmpRootContiner", "flxMapTmpRootContinerController");
        kony.mvc.registry.add("flxParent", "flxParent", "flxParentController");
        kony.mvc.registry.add("frmAddPin", "frmAddPin", "frmAddPinController");
        kony.mvc.registry.add("frmCircle", "frmCircle", "frmCircleController");
        kony.mvc.registry.add("frmClustered", "frmClustered", "frmClusteredController");
        kony.mvc.registry.add("frmLanding", "frmLanding", "frmLandingController");
        kony.mvc.registry.add("frmMapSearchResult", "frmMapSearchResult", "frmMapSearchResultController");
        kony.mvc.registry.add("frmPolygon", "frmPolygon", "frmPolygonController");
        kony.mvc.registry.add("frmProperties", "frmProperties", "frmPropertiesController");
        kony.mvc.registry.add("frmSearchRoutes", "frmSearchRoutes", "frmSearchRoutesController");
        kony.mvc.registry.add("multiplePinsDockedCallout", "multiplePinsDockedCallout", "multiplePinsDockedCalloutController");
        kony.application.setCheckBoxSelectionImageAlignment(constants.CHECKBOX_SELECTION_IMAGE_ALIGNMENT_RIGHT);
        kony.application.setDefaultTextboxPadding(false);
        kony.application.setRespectImageSizeForImageWidgetAlignment(true);
        setAppBehaviors();
    },
    postAppInitCallBack: function(eventObj) {},
    appmenuseq: function() {
        new kony.mvc.Navigation("frmLanding").navigate();
    }
});