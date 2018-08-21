define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onBoundsChanged defined for zMap **/
    AS_Map_f53548ec300c4e5aa660cd83714c3f73: function AS_Map_f53548ec300c4e5aa660cd83714c3f73(eventobject, boundaryLocations) {
        var self = this;
        this.onBoundsChangedForMap(eventobject, boundaryLocations);
    },
    /** onClick defined for headerButtonLeft **/
    AS_Button_aabecf47499b45df9523d0a474118be7: function AS_Button_aabecf47499b45df9523d0a474118be7(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmProperties");
        ntf.navigate();
    },
    /** postShow defined for frmClustered **/
    AS_Form_ba0b80951fb74cb79f380698464dfbc6: function AS_Form_ba0b80951fb74cb79f380698464dfbc6(eventobject) {
        var self = this;
        this.setPins();
    }
});