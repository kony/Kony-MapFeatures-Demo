define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for segRoutes **/
    AS_Segment_e3bc8fe5889141988b7e652fef85e96c: function AS_Segment_e3bc8fe5889141988b7e652fef85e96c(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.SegRouteClick();
    },
    /** onTouchStart defined for flxOverlay **/
    AS_FlexContainer_j89b3247a6364783bcf8e4980fe339b0: function AS_FlexContainer_j89b3247a6364783bcf8e4980fe339b0(eventobject, x, y) {
        var self = this;
        this.animateFlexToSmall();
    },
    /** onClick defined for headerButtonLeft **/
    AS_Button_b5b3c45a994a434c82859afb4e001f11: function AS_Button_b5b3c45a994a434c82859afb4e001f11(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmSearchRoutes");
        ntf.navigate();
    },
    /** onHide defined for frmMapSearchResult **/
    AS_Form_b10f9d240bbd45daac9e7841ee1547dd: function AS_Form_b10f9d240bbd45daac9e7841ee1547dd(eventobject) {
        var self = this;
        kony.application.destroyForm("frmMapSearchResult");
    },
    /** onClick defined for FlexContainer0feb66212d20a47 **/
    AS_FlexContainer_dc6924c5415c42d5810fb11e670ad039: function AS_FlexContainer_dc6924c5415c42d5810fb11e670ad039(eventobject) {
        var self = this;
        this.showRoutes();
    }
});