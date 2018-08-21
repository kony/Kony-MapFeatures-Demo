define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for headerButtonLeft **/
    AS_Button_b352d962feb54c5899ab29ab87b36b0e: function AS_Button_b352d962feb54c5899ab29ab87b36b0e(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmProperties");
        ntf.navigate();
    },
    /** onSelection defined for rbtn **/
    AS_RadioButtonGroup_a8ae610b8db74311b25e56c7e1d3ffdf: function AS_RadioButtonGroup_a8ae610b8db74311b25e56c7e1d3ffdf(eventobject) {
        var self = this;
        this.addPolygonTomap();
    },
    /** postShow defined for frmPolygon **/
    AS_Form_gbb2bf525d614a07b230114ed560ae04: function AS_Form_gbb2bf525d614a07b230114ed560ae04(eventobject) {
        var self = this;
        this.addPolygonTomap();
    }
});