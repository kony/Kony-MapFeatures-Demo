define(function () {
	var konyLoggerModule = require('com/konymp/knowledgeframework/konyLogger');
    var konymp = {};
  	konymp.logger = new konyLoggerModule("Knowledge Framework Component");
	return {
         /**
         * @function constructor
         * @private
         * @param {Object} baseConfig
         * @param {Object} layoutConfig
         * @param {Object} pspConfig
         */
		constructor: function (baseConfig, layoutConfig, pspConfig) {
          	konymp.logger.trace("----------Entering constructor---------", konymp.logger.FUNCTION_ENTRY);
          	this.previosAcc= null;
			this.isClosed= false;
          	konymp.logger.trace("----------Exiting constructor ---------", konymp.logger.FUNCTION_EXIT);
        },
         /**
         * @function initGettersSetters
         * @private
         */
		initGettersSetters: function () {},
		
      	 /**
         * @function setData
         * @description method to set the data for knowledge framework
         * @private
         * @param {Object} data
         */
		setData: function (data) {
          try {
            konymp.logger.trace("----------Entering setData Function---------", konymp.logger.FUNCTION_ENTRY);
            this.view.lblHeading.text = "Key Features";
			this.view.sgmtAPI.removeAll();
			this.view.sgmtAPI.isVisible = true;
			this.view.sgmtAPI.widgetDataMap = {
				lblNameOfAPI: "title"
			};
			this.view.sgmtAPI.setData(data);
              }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting setData Function---------", konymp.logger.FUNCTION_EXIT);
		},
      	/**
         * @function onRowClick
         * @description animates and displays the description screen on click of segment row
         * @private  
         */
		onRowClick: function () {
          try {
            konymp.logger.trace("----------Entering onRowClick Function---------", konymp.logger.FUNCTION_ENTRY);
          	this.showAccord("flexAcc1");
			var data = this.view.sgmtAPI.selectedRowItems[0];
			this.animateDescriptionScreen(0, data.title, this.setUIAfterAnimation);
			this.populateData(data);
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting onRowClick Function---------", konymp.logger.FUNCTION_EXIT);
		},
      	/**
         * @function setUIAfterAnimation
         * @description callback function for animateDescriptionScreen
         * @private
         * @param {int} left
          @param {string} headerText
         */
		setUIAfterAnimation: function (left, headerText) {
          try {
            konymp.logger.trace("----------Entering setUIAfterAnimation Function---------", konymp.logger.FUNCTION_ENTRY);
			if (left === 100) {
				this.view.flexClickBack.setVisibility(false);
				this.view.lblHeading.text = "Key Features";
			} else {
				this.view.flexClickBack.setVisibility(true);
				this.view.lblHeading.text = headerText;
			}
			if (this.isClosed) {
				this.navigateToPreviousScreen();
				this.isClosed = false;
			}
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting setUIAfterAnimation Function---------", konymp.logger.FUNCTION_EXIT);
		},
      	/**
         * @function animateDescriptionScreen
         * @description Animates the description screen
         * @private
         * @param {int} left
         * @param {string} headerText
         * @param {function} callbackFunction
         */
		animateDescriptionScreen: function (left, headerText, callbackFunction) {
          try {
            konymp.logger.trace("----------Entering animateDescriptionScreen Function---------", konymp.logger.FUNCTION_ENTRY);
			var controllerScope = this;
			controllerScope.view.flxFullScreen.animate(
				kony.ui.createAnimation({
					100: {
						left: left + "%",
						"stepConfig": {}
					}
				}), {
				delay: 0,
				fillMode: kony.anim.FILL_MODE_FORWARDS,
				duration: 0.1
			}, {
				animationEnd: function () {
					  if (left === 0) {
                            controllerScope.view.flexClickBack.setVisibility(true);
                            controllerScope.view.lblHeading.text = headerText;
                        } else {
                            controllerScope.view.flexClickBack.setVisibility(false);
                            controllerScope.view.lblHeading.text = "Key Features";

						}
                }
			});
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting animateDescriptionScreen Function---------", konymp.logger.FUNCTION_EXIT);
		},
		/**
         * @function populateData
         * @description method to populate data to richtext and image widgets in description screen
         * @private
         * @param {Object} data
         */
		populateData: function (data) {
          try {
            konymp.logger.trace("----------Entering populateData Function---------", konymp.logger.FUNCTION_ENTRY);
			this.view.rchDesc1.text = data.desc1;
			this.view.rchDesc2.text = data.desc2;
			if (data.video1 !== undefined && data.video1 !== null) {
				this.view.imgVideoView1.src = data.image1;
			} else {
				kony.print("Video1 Not Available");
				this.view.flexImageVideo.isVisible = false;
			}
			if (data.video2 !== undefined && data.video2 !== null) {
				this.view.imageVideo2.src = data.image2;
			} else {
				kony.print("Video2 Not Available");
				this.view.flexImageVideo2.isVisible = false;
			}
			this.view.rchDesc3.text = data.link;
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting populateData Function---------", konymp.logger.FUNCTION_EXIT);
		},
		/**
         * @function showAccord
         * @description logic for accordion view in description screen
         * @private
         * @param {string} id
         */
		showAccord: function (id) {
          try {
            konymp.logger.trace("----------Entering showAccord Function---------", konymp.logger.FUNCTION_ENTRY);
			id = id.split("flexAcc")[1];
			if (this.previosAcc !== null && this.previosAcc !== id) {
				this.view["btnAccordian" + this.previosAcc].src = "chevron.png";
				this.view["btnAccordian" + id].src = "chevrondown.png";
				this.view["flexScrollDesc" + this.previosAcc].isVisible = false;
				this.view["flexScrollDesc" + id].isVisible = true;
                this.view["lblTitleAcc"+id].skin = "konympKFsknLblBold";
                this.view["lblTitleAcc"+this.previosAcc].skin = "konympsknlblAccNormal";
				this.previosAcc = id;
			} else if (this.previosAcc == id) {
				if (this.view["btnAccordian" + id].src == "chevrondown.png") {
					this.view["btnAccordian" + this.previosAcc].src = "chevrondown.png";
					this.view["btnAccordian" + id].src = "chevron.png";
					this.view["flexScrollDesc" + this.previosAcc].isVisible = true;
					this.view["flexScrollDesc" + id].isVisible = false;
                    this.view["lblTitleAcc"+id].skin = "konympKFsknLblNormal";
					this.previosAcc = id;
				} else {
					this.view["btnAccordian" + this.previosAcc].src = "chevron.png";
					this.view["btnAccordian" + id].src = "chevrondown.png";
					this.view["flexScrollDesc" + this.previosAcc].isVisible = false;
					this.view["flexScrollDesc" + id].isVisible = true;
                    this.view["lblTitleAcc"+id].skin = "konympKFsknLblBold";
					this.previosAcc = id;
				}
			} else {
				this.view["btnAccordian" + id].src = "chevrondown.png";
                this.view["lblTitleAcc"+id].skin = "konympKFsknLblBold";
				this.view["flexScrollDesc" + id].isVisible = true;
				this.previosAcc = id;
			}
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting showAccord Function---------", konymp.logger.FUNCTION_EXIT);
		},
      	/**
         * @function closeWhenDone
         * @description exits the knowledge framework with animation
         * @private         
         */
		closeWhenDone: function () {
          try {
            konymp.logger.trace("----------Entering closeWhenDone Function---------", konymp.logger.FUNCTION_ENTRY);
			this.isClosed = true;
			this.animateDescriptionScreen(100, "Key Features", this.setUIAfterAnimation);
            this.setUIAfterAnimation(100, "Key Features");
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting closeWhenDone Function---------", konymp.logger.FUNCTION_EXIT);
		},
      	/**
         * @function navigateToPreviousScreen
         * @description naivigates to previous screen after animation if clicked on close button
         * @private         
         */
		navigateToPreviousScreen: function () {
          try {
            konymp.logger.trace("----------Entering navigateToPreviousScreen Function---------", konymp.logger.FUNCTION_ENTRY);
			var prevForm = kony.application.getPreviousForm();
			var navObj = new kony.mvc.Navigation(prevForm.id);
			navObj.navigate();
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting navigateToPreviousScreen Function---------", konymp.logger.FUNCTION_EXIT);
		},
		/**
         * @function onClickBack
         * @description navigates to title screen from description screen
         * @private         
         */
		onClickBack: function () {
          try {
            konymp.logger.trace("----------Entering onClickBack Function---------", konymp.logger.FUNCTION_ENTRY);
			this.resetDescScreen();
			this.animateDescriptionScreen(100, "Key Features", this.setUIAfterAnimation);
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting onClickBack Function---------", konymp.logger.FUNCTION_EXIT);
		},
      	/**
         * @function resetDescScreen
         * @description resets the data in decription screen
         * @private         
         */
		resetDescScreen: function () {
          try {
            konymp.logger.trace("----------Entering resetDescScreen Function---------", konymp.logger.FUNCTION_ENTRY);
			for (i = 1; i <= 3; i++) {
                this.view["lblTitleAcc"+i].skin = "konympKFsknLblNormal";
				this.view["btnAccordian" + i].src = "chevron.png";
				this.view["flexScrollDesc" + i].isVisible = false;
			}
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting resetDescScreen Function---------", konymp.logger.FUNCTION_EXIT);
		},
      	/**
         * @function onClickPlayButton
         * @description plays the youtube video provided
         * @private
         * @param {string} id
         */
		onClickPlayButton: function (id) {
          try {
            konymp.logger.trace("----------Entering onClickPlayButton Function---------", konymp.logger.FUNCTION_ENTRY);
			id = id.split("btnPlay")[1];
			var url = this.view.sgmtAPI.selectedItems[0]["video" + id];
			kony.application.openURL(url);
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting onClickPlayButton Function---------", konymp.logger.FUNCTION_EXIT);
		},
      	/**
         * @function onLinkClick
         * @description opens the documentation link provided in the device browser 
         * @private        
         */
       onLinkClick : function(){
         try {
            konymp.logger.trace("----------Entering onLinkClick Function---------", konymp.logger.FUNCTION_ENTRY);
         	kony.application.openURL(this.view.sgmtAPI.selectedItems[0].link);
           }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting onLinkClick Function---------", konymp.logger.FUNCTION_EXIT);
       }
      
	};
});
