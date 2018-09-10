/**
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(function () {
	/**
	 * @function initGlobals
	 * @description initializes required global private variables
	 * @private
	 */

	var konyLoggerModule = require('com/konymp/singleslider/konyLogger');
	var konymp = konymp || {};
	konymp.logger = new konyLoggerModule("SliderComponent");
	baseSlider = function () {
		return {
			startIndexValidateAndSet: function (cont, val) {
				konymp.logger.trace("----------Entering startIndexValidateAndSet function---------", konymp.logger.FUNCTION_ENTRY);
				try {
					if (val === null || val === undefined) {
						throw {
							"Error": "SliderComponent",
							"message": "Default Minimum Value Property is null or undefined"
						};
					}
					if (isNaN(parseInt(val))) {
						throw {
							"Error": "SliderComponent",
							"message": "Invalid data type of Default Minimum Value property"
						};
					}
					if (parseInt(val) < cont.minValue) {
						throw {
							"Error": "SliderComponent",
							"message": "Default Minimum Value is less than Minimum Label Value"
						};
					}
                  	 if (parseInt(val) > parseInt(cont.maxValue)) {
                            throw {
                                "Error": "SliderComponent",
                                "message": "Default Minimum Value is greater than Maximum Label Value"
                            };
                         }
                  if ((cont.maxValue -val) % cont._graduationInterval !== 0) { 
						throw {
							"Error": "SliderComponent",
							"message": "Not a Step in the Range"
						};
					}
					cont._startIndex = val;
					var leftIndex = ((val - parseInt(cont.minValue)) / cont._graduationInterval) * cont._graduationIntervalInPercentage * parseInt(cont.view.flxContainer.width) / 100 + (cont._sliderOffset * parseInt(cont.view.flxContainer.width) / 100);
					cont.selectedCursor = "left";
					return leftIndex;
				} catch (exception) {
					konymp.logger.error("#####Exception in startIndexValidateAndSet : " + exception.message, konymp.logger.EXCEPTION);
					if (exception["Error"] === "SliderComponent") {
						throw exception;
					}
				}
				konymp.logger.trace("---------------Exiting startIndexValidateAndSet function---------------", konymp.logger.FUNCTION_EXIT);
			},
			endIndexValidateAndSet: function (cont, val) {
				try {
					if (val === null || val === undefined) {
						throw {
							"Error": "SliderComponent",
							"message": "Default Maximum Value Property is null or undefined"
						};
					}
					if (isNaN(parseInt(val))) {
						throw {
							"Error": "SliderComponent",
							"message": "Invalid data type of Default Maximum Value property"
						};
					}
					if (!(val <= parseInt(cont.maxValue))) {
						throw {
							"Error": "SliderComponent",
							"message": "Default SelectedIndex  Value  is greater than Maximum Label Value"
						};
					}
					 if (!(parseInt(cont.minValue) <= val)) {
                          throw {
                              "Error": "SliderComponent",
                              "message": "Default SelectedIndex Value  is less than Minimum Label Value"
                          };
                       }
                       if (parseInt(val) % cont._graduationInterval !== 0) {
                          throw {
                              "Error": "SliderComponent",
                              "message": "Not a Step in the Range"
                          };
                       }
					cont._endIndex = val;
					var rightIndex = ((val - parseInt(cont.minValue)) / cont._graduationInterval) * cont._graduationIntervalInPercentage * cont._containerWidth / 100 + (cont._sliderOffset * cont._containerWidth / 100);
					cont.selectedCursor = "right";
					return rightIndex;
				} catch (exception) {
					konymp.logger.error("#####Exception in endIndexValidateAndSet : " + exception.message, konymp.logger.EXCEPTION);
					if (exception["Error"] === "SliderComponent") {
						throw exception;
					}
				}
				konymp.logger.trace("---------------Exiting endIndexValidateAndSet function---------------", konymp.logger.FUNCTION_EXIT);
			},
			initGlobals: function (cont) {
				konymp.logger.trace("----------Entering initGlobals function---------", konymp.logger.FUNCTION_ENTRY);
				try {
					cont._beginRange = parseInt(cont.view.lblBegin.text);
					cont._endRange = parseInt(cont.view.lblEnd.text);
					cont.view.lblBegin.isVisible = !cont.intervalDisplay;
					cont.view.lblEnd.isVisible = !cont.intervalDisplay;
					var widthStr = cont.view.flxContainer.width;
					cont._containerWidth = parseInt(widthStr);
					cont._sliderOffset = parseInt(cont.view.imgBullet1.centerX);
					cont._sliderWidthInPercentage = parseFloat(cont.view.lblLine.width);
                  	 if(cont.graduations === null || cont.graduations === undefined){
                     cont.graduations=cont.divisions;
                  	 } 
					cont._graduationInterval = (cont._endRange - cont._beginRange) / cont._graduations;
					cont._graduationIntervalInPercentage = cont._sliderWidthInPercentage / cont._graduations;
					cont._labelArray = [];
				} catch (exception) {
					konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                  	throw exception;
				}
				konymp.logger.trace("---------------Exiting initGlobals function---------------", konymp.logger.FUNCTION_EXIT);
			},
			/**
			 * @function generateDivs
			 * @description generates divisional labels
			 * @private
			 * @param nil
			 */
			generateDivs: function (cont) {
				konymp.logger.trace("----------Entering generateDivs function---------", konymp.logger.FUNCTION_ENTRY);
				try {
                    cont.labelIds=[];
					if (this.validateRange(cont)) {
						cont._interval = (cont._endRange - cont._beginRange) / cont._divisions;
						for (var i = 0; i < (cont._divisions + 1); i++) {
							var indicatorText = Math.round((cont._beginRange + ((i) * cont._interval)) * 100) / 100;
                          	var createdLabel=this.createLabels(cont, i, cont._interval, cont._divisions, indicatorText);
							cont.view.flxContainer.add(createdLabel);
                          	cont.labelIds.push(createdLabel.id);
							cont.view.forceLayout();
						}
					} else {
						throw {"Error":"Invalid Range",
                              "message":"MinValue is not less than MaxValue"};
					}
				} catch (exception) {
					konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                  	throw exception;
				}
				konymp.logger.trace("---------------Exiting generateDivs function---------------", konymp.logger.FUNCTION_EXIT);
			},

			/**
			 * @function validateRange
			 * @description Checks is the range is valid or not
			 * @private
			 * @param nil
			 */
			validateRange: function (cont) {
				konymp.logger.trace("----------Entering validateRange function---------", konymp.logger.FUNCTION_ENTRY);
				try {
					if (!isNaN(cont._beginRange) && !isNaN(cont._endRange) && cont._endRange > cont._beginRange) {
						return true;
					} else {

						throw {
							"Error": "SliderComponent",
							"message": "Minimum Value must be less than Maximum values. "
						};
					}
					return false;
				} catch (exception) {
					konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                  	throw exception;
				}
				konymp.logger.trace("---------------Exiting validateRange function---------------", konymp.logger.FUNCTION_EXIT);
			},

			/**
			 * @function createLabels
			 * @description Creates labels and returns to generateDivs
			 * @private
			 * @param i->which label is getting created
			 * @param interval->interval between 2 labels
			 * @param div->number of divisions
			 * @param textDiv->text assigned to division label
			 */
			createLabels: function (cont, i, interval, div, textDiv) {
				konymp.logger.trace("----------Entering createLabels function---------", konymp.logger.FUNCTION_ENTRY);
				try {
					var visibility;
					var valInPer = (i / div) * cont._sliderWidthInPercentage;
					var lblBasic = {
						id: "label" + i,
						skin: cont.sknInactiveIndex,
						text: textDiv + "",
						isVisible: cont.intervalDisplay,
						centerX: (cont._sliderOffset + valInPer) + "%",
						centerY: "87%"
					};
					cont._divArray.push(cont._sliderOffset + valInPer);
					cont._labelCount = cont._divArray.length;
					var lblLayout = {};
					var lblPSP = {};
					var labelDiv = new kony.ui.Label(lblBasic, lblLayout, lblPSP);
					cont._labelArray.push({
						"label": labelDiv,
						"centerX": (cont._sliderOffset + valInPer)
					});
					return (labelDiv);
				} catch (exception) {
					konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
				}
				konymp.logger.trace("---------------Exiting createLabels function---------------", konymp.logger.FUNCTION_EXIT);
			},
			/**
			 * @function changeSknNumbers
			 * @description changes skins of the labels between left and right cursors
			 * @private
			 */
			changeSknNumbers: function (cont) {
				konymp.logger.trace("----------Entering chnageSknNumbers function---------", konymp.logger.FUNCTION_ENTRY);
				try {
					for (var i = 0; i <= cont._divisions; i++) {
						var obj = cont._labelArray[i].label;
						obj.skin = "konympnumberLineSkn";
						obj.skin = cont.sknInactiveIndex;
						if (parseFloat(cont.view.flxLeft.centerX) <= parseFloat(obj.centerX) && parseFloat(obj.centerX) <= parseFloat(cont.view.flxRight.centerX)) {
							obj.skin = cont.sknActiveIndex;
						}
					}
				} catch (exception) {
					konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
				}
				konymp.logger.trace("---------------Exiting changeSknNumbers function---------------", konymp.logger.FUNCTION_EXIT);
			},

			setColorToNumber: function (cont) {
				konymp.logger.trace("----------Entering setColorToNumber function---------", konymp.logger.FUNCTION_ENTRY);
				try {
					var xInPercentages = parseInt(cont.view.flxRight.centerX);
					var lblBegininPercentage = parseInt(cont.view.lblBegin.centerX);
					var lblEndInPercentage = parseInt(cont.view.lblEnd.centerX);
					if (lblBegininPercentage <= xInPercentages) {
						cont.view.lblBegin.skin = cont.sknActiveIndex;
						cont.view.forceLayout();
					} else {
						cont.view.lblBegin.skin = cont.sknInactiveIndex;
						cont.view.forceLayout();
					}
					if (lblEndInPercentage <= xInPercentages) {
						cont.view.lblEnd.skin = cont.sknActiveIndex;
						cont.view.forceLayout();
					} else {
						cont.view.lblEnd.skin = cont.sknInactiveIndex;
						cont.view.forceLayout();
					}
				} catch (exception) {
					konymp.logger.error("#####Exception in setColorToNumber setter : " + JSON.stringify(exception), konymp.logger.EXCEPTION);
				}
				konymp.logger.trace("---------------Exiting setColorNumber function---------------", konymp.logger.FUNCTION_EXIT);
			},
			/**
			 * @function setLblRange
			 * @description changes the lblRange width
			 * @private
			 */
			setLblRange: function (cont) {
				konymp.logger.trace("----------Entering setLblRange function---------", konymp.logger.FUNCTION_ENTRY);
				try {
					cont.view.lblRange.width = ((parseFloat(cont.view.flxRight.centerX)) - parseFloat(cont.view.lblRange.left)).toString() + "%";
				} catch (exception) {
					konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
				}
				konymp.logger.trace("---------------Exiting setLblRange function---------------", konymp.logger.FUNCTION_EXIT);
			},
			/**
			 * @function PinIndicatorIsEnabled
			 * @description handles animations for the cursors
			 * @private
			 * @param val, obj1, obj2
			 */
			PinIndicatorIsEnabled: function (val, obj1, obj2) {
				try {
					obj1.isVisible = true;
					obj2.isVisible = true;
					konymp.logger.trace("---------------Entering PinIndicatorIsEnabled function---------------", konymp.logger.FUNCTION_ENTRY);
					var transformObject1 = kony.ui.makeAffineTransform();
					transformObject1.scale(0, 0);
					var transformObject2 = kony.ui.makeAffineTransform();
					transformObject2.scale(1.2, 1.2);
					var transformObject3 = kony.ui.makeAffineTransform();
					transformObject3.scale(1, 1);
					if (val === null || val === undefined) {
						throw {
							"Error": "Slider",
							"message": "Invalid data type argument for PinIndicatorIsEnabled function"
						};
					}
					if (!val) {
						var temp = transformObject1;
						transformObject1 = transformObject3;
						transformObject3 = temp;
					}
					var imgAnim = kony.ui.createAnimation({
							"0": {
								"stepConfig": {
									"timingFunction": kony.anim.EASE
								},
								"transform": transformObject1
							},
							"80": {
								"stepConfig": {
									"timingFunction": kony.anim.EASE
								},
								"transform": transformObject2
							},
							"100": {
								"stepConfig": {
									"timingFunction": kony.anim.EASE
								},
								"transform": transformObject3
							}
						});
					var animConfig1 = {
						"delay": 0.1,
						"iterationCount": 1,
						"fillMode": kony.anim.FILL_MODE_FORWARDS,
						"duration": 0.25
					};
					obj1.animate(imgAnim, animConfig1);
					obj2.animate(imgAnim, animConfig1);
				} catch (exception) {
					konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
				}
				konymp.logger.trace("---------------Exiting PinIndicatorIsEnabled function---------------", konymp.logger.FUNCTION_EXIT);
			},

		};
	};
	return baseSlider;
});