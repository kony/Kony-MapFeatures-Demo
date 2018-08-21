define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flexCloseClick **/
    AS_FlexContainer_c0bfa2ba808b461983e9e4bd5598f3dd: function AS_FlexContainer_c0bfa2ba808b461983e9e4bd5598f3dd(eventobject) {
        var self = this;
        this.closeWhenDone();
    },
    /** onClick defined for flexClickBack **/
    AS_FlexContainer_g63b364630f446a392346a5234cd8249: function AS_FlexContainer_g63b364630f446a392346a5234cd8249(eventobject) {
        var self = this;
        this.onClickBack();
    },
    /** onRowClick defined for sgmtAPI **/
    AS_Segment_f20429be90354b99b01d2b893ddbc205: function AS_Segment_f20429be90354b99b01d2b893ddbc205(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    },
    /** onClick defined for flexAcc1 **/
    AS_FlexContainer_f9a4ec7ddd994719b54948ff532e6ce0: function AS_FlexContainer_f9a4ec7ddd994719b54948ff532e6ce0(eventobject) {
        var self = this;
        // if(this.view.rchTextDesc.isVisible === true)
        //   this.onClickDisappear(eventobject);
        // else
        //   this.onClickDisplay(eventobject);
        this.showAccord(eventobject.id);
    },
    /** onClick defined for btnPlay1 **/
    AS_Button_gb4c5f57deab4a8293c47082b0f827dd: function AS_Button_gb4c5f57deab4a8293c47082b0f827dd(eventobject) {
        var self = this;
        this.onClickPlayButton(eventobject.id);
    },
    /** onClick defined for flexAcc2 **/
    AS_FlexContainer_dec78694abad48e29c17cf7ebe9f3253: function AS_FlexContainer_dec78694abad48e29c17cf7ebe9f3253(eventobject) {
        var self = this;
        // if(this.view.lblCodeSnippet.isVisible === true)
        //   this.onClickDisappear(eventobject);
        // else
        //   this.onClickDisplay(eventobject);
        this.showAccord(eventobject.id);
    },
    /** onClick defined for btnPlay2 **/
    AS_Button_d4ff031c82d54a94a6f71561a03380bd: function AS_Button_d4ff031c82d54a94a6f71561a03380bd(eventobject) {
        var self = this;
        this.onClickPlayButton(eventobject.id);
    },
    /** onClick defined for flexAcc3 **/
    AS_FlexContainer_heba193a3290445598c390021f597db9: function AS_FlexContainer_heba193a3290445598c390021f597db9(eventobject) {
        var self = this;
        // if(this.view.rchtextDoc.isVisible === true)
        //   this.onClickDisappear(eventobject);
        // else
        //   this.onClickDisplay(eventobject);
        this.showAccord(eventobject.id);
    }
});