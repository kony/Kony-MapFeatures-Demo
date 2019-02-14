define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preshow defined for map2 **/
    AS_FlexContainer_ccb30b09969846ed98bf185b0eb32cc8: function AS_FlexContainer_ccb30b09969846ed98bf185b0eb32cc8(eventobject) {
        var self = this;
        this.addDataToMap();
    },
    /** postshow defined for map2 **/
    AS_FlexContainer_ba90b9ffa2fd4f67bf0d05b62731badf: function AS_FlexContainer_ba90b9ffa2fd4f67bf0d05b62731badf(eventobject) {
        var self = this;
        this.view.mapView.setCalloutVisibility(true, [{
            id: "pin1"
        }]);
    }
});