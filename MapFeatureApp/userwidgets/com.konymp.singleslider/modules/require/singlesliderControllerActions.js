define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** ontouchstart defined for flxBlocker **/
    AS_FlexContainer_a75bd4f7efdb4a9ab8ec32675edd44bc: function AS_FlexContainer_a75bd4f7efdb4a9ab8ec32675edd44bc(eventobject, x, y) {
        var self = this;
        //Block Actions
    },
    /** ontouchmove defined for flxBlocker **/
    AS_FlexContainer_b8d5cabdd4b7473aa6c6b6632aaa160a: function AS_FlexContainer_b8d5cabdd4b7473aa6c6b6632aaa160a(eventobject, x, y) {
        var self = this;
        //Block Actions
    },
    /** ontouchstart defined for flxRight **/
    AS_FlexContainer_ie04a0d4a7c046be9ddebce5909d416d: function AS_FlexContainer_ie04a0d4a7c046be9ddebce5909d416d(eventobject, x, y) {
        var self = this;
        this.selectedCursor = "right";
        this.obj.PinIndicatorIsEnabled(true, this.view.imgPinIndicatorRight, this.view.lblIndicatorRight);
        this.view.forceLayout();
    },
    /** ontouchend defined for flxRight **/
    AS_FlexContainer_a210306c5bfd4b8f8856f4072beaa644: function AS_FlexContainer_a210306c5bfd4b8f8856f4072beaa644(eventobject, x, y) {
        var self = this;
        this.selectedCursor = "";
        this.obj.PinIndicatorIsEnabled(false, this.view.imgPinIndicatorRight, this.view.lblIndicatorRight);
        this.view.forceLayout();
    },
    /** ontouchstart defined for flxLeft **/
    AS_FlexContainer_a9e9b031414a4c71863194a370f24f2e: function AS_FlexContainer_a9e9b031414a4c71863194a370f24f2e(eventobject, x, y) {
        var self = this;
        this.selectedCursor = "left";
        this.obj.PinIndicatorIsEnabled(true, this.view.imgPinIndicator, this.view.lblIndicatorLeft);
        this.view.forceLayout();
    },
    /** ontouchend defined for flxLeft **/
    AS_FlexContainer_fdd2a26062284d91a20fec12d6e5f9ee: function AS_FlexContainer_fdd2a26062284d91a20fec12d6e5f9ee(eventobject, x, y) {
        var self = this;
        this.selectedCursor = "";
        this.obj.PinIndicatorIsEnabled(false, this.view.imgPinIndicator, this.view.lblIndicatorLeft);
        this.view.forceLayout();
    },
    /** ontouchmove defined for flxContainer **/
    AS_FlexContainer_ad825400731b4bbe81a3b018e387463a: function AS_FlexContainer_ad825400731b4bbe81a3b018e387463a(eventobject, x, y) {
        var self = this;
        this.obj.onTouchValidate(this, x);
        this.view.forceLayout();
    },
    /** ontouchend defined for flxContainer **/
    AS_FlexContainer_g6a1894e0d3f4ff7b8d84027b79c3243: function AS_FlexContainer_g6a1894e0d3f4ff7b8d84027b79c3243(eventobject, x, y) {
        var self = this;
        this.obj.onSnapValidate(this, x);
        this.view.forceLayout();
    },
    /** ontouchmove defined for flxback **/
    AS_FlexContainer_jf0c97fb1b304107aa8ba71ee1c2021d: function AS_FlexContainer_jf0c97fb1b304107aa8ba71ee1c2021d(eventobject, x, y) {
        var self = this;
        this.obj.onTouchValidate(this, x);
    },
    /** ontouchend defined for flxback **/
    AS_FlexContainer_bfcad5b9b1094c09b0e87647b14559b1: function AS_FlexContainer_bfcad5b9b1094c09b0e87647b14559b1(eventobject, x, y) {
        var self = this;
        this.obj.onSnapValidate(this, x);
    }
});