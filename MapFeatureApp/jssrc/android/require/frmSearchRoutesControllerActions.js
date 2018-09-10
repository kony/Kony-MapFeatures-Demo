define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for headerButtonLeft **/
    AS_Button_ab98a8babb274834938370cd69f4bc4f: function AS_Button_ab98a8babb274834938370cd69f4bc4f(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmLanding");
        ntf.navigate();
    },
    /** onClick defined for btnSearch **/
    AS_Button_c9fc9f47540142aa89ca9af0171b917d: function AS_Button_c9fc9f47540142aa89ca9af0171b917d(eventobject) {
        var self = this;
        var selectValue = this.view.rbgDestnation.selectedKeyValue[1];
        //var params={"rbgSelectedValue":selectValue};
        var ntf = new kony.mvc.Navigation("frmMapSearchResult");
        ntf.navigate(selectValue);
    }
});