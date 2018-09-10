define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for headerButtonLeft **/
    AS_Button_dd79bde8f08846709864af71f674fa8f: function AS_Button_dd79bde8f08846709864af71f674fa8f(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmProperties");
        ntf.navigate();
    },
    /** onSelection defined for rbgDisplayPlace **/
    AS_RadioButtonGroup_ee75d18a44a340958d993c0d9de579b9: function AS_RadioButtonGroup_ee75d18a44a340958d993c0d9de579b9(eventobject) {
        var self = this;
        this.selectPlace();
    },
    /** onChangeEnd defined for singleslider **/
    AS_UWI_e49cc8cf65fc4b3da117b488d42c03ca: function AS_UWI_e49cc8cf65fc4b3da117b488d42c03ca(value) {
        var self = this;
        this.selectPlace();
    },
    /** postShow defined for frmCircle **/
    AS_Form_debafff8692a4e33acc0647329bbd239: function AS_Form_debafff8692a4e33acc0647329bbd239(eventobject) {
        var self = this;
        this.addCircletoMapLoc("40.7127753", "-74.0059728", 5);
    }
});