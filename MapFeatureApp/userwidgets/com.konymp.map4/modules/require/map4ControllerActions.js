define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onpinclick defined for mapView **/
    AS_Map_ffe2ed68e3494b2394fbc13332596ca2: function AS_Map_ffe2ed68e3494b2394fbc13332596ca2(eventobject, location) {
        var self = this;
        this.pinClicked(location);
    },
    /** onslide defined for swtchAutoCenter **/
    AS_Switch_bb7a95a2770c478ca64c779efb5dd967: function AS_Switch_bb7a95a2770c478ca64c779efb5dd967(eventobject) {
        var self = this;
        return self.autoCenterOnOff.call(this);
    },
    /** preshow defined for map4 **/
    AS_FlexContainer_gf4b6ba21862497c8626d264001caa4f: function AS_FlexContainer_gf4b6ba21862497c8626d264001caa4f(eventobject) {
        var self = this;
        this.addDataToMap();
    }
});