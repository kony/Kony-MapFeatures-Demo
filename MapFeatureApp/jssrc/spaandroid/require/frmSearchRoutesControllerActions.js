define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnSearch **/
    AS_Button_e8f014287b8145319cad341e795cbaf2: function AS_Button_e8f014287b8145319cad341e795cbaf2(eventobject) {
        var self = this;
        var selectValue = this.view.rbgDestnation.selectedKeyValue[1];
        //var params={"rbgSelectedValue":selectValue};
        var ntf = new kony.mvc.Navigation("frmMapSearchResult");
        ntf.navigate(selectValue);
    },
    /** onClick defined for headerButtonLeft **/
    AS_Button_ab98a8babb274834938370cd69f4bc4f: function AS_Button_ab98a8babb274834938370cd69f4bc4f(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmLanding");
        ntf.navigate();
    }
});