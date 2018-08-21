/**
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(['com/konymp/singleslider/baseSlider'], function(baseSlider) {
    var konyLoggerModule = require('com/konymp/singleslider/konyLogger');
    var konymp = konymp || {};
    konymp.logger = new konyLoggerModule("SliderComponent");
    class single {
        startIndexValidateAndSet(cont, val) {
            try {
                var leftIndex = baseSlider().startIndexValidateAndSet(cont, val);
                cont.selectedCursor = "left";
                this.onTouchValidate(cont, leftIndex);
                this.setLblRange(cont);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        }
        endIndexValidateAndSet(cont, val) {
            try {
                var rightIndex = baseSlider().endIndexValidateAndSet(cont, val);
                cont.selectedCursor = "right";
                this.onTouchValidate(cont, rightIndex);
                this.setLblRange(cont);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        }
        initGlobals(cont) {
            try {
                cont.view.flxLeft.isVisible = false;
                baseSlider().initGlobals(cont);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        }
        generateDivs(cont) {
            try {
                baseSlider().generateDivs(cont);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        }
        validateRange(cont) {
            try {
                var testVariable = baseSlider().validateRange(cont);
                return testVariable;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        }
        changeSknNumbers(cont) {
            try {
                if (cont.intervalDisplay) {
                    baseSlider().changeSknNumbers(cont);
                } else {
                    baseSlider().setColorToNumber(cont);
                }
                cont.view.forceLayout();
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        }
        setLblRange(cont) {
            try {
                baseSlider().setLblRange(cont);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        }
        PinIndicatorIsEnabled(val, obj1, obj2) {
                try {
                    baseSlider().PinIndicatorIsEnabled(val, obj1, obj2);
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
            }
            /**
             * @function onSnapValidate
             * @description checks if the snap to position is valid or not
             * @private
             */
        onSnapValidate(cont, x) {
                konymp.logger.trace("----------Entering onSnapValidate function ---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    var xLeft = parseInt((cont.xInPercentages(x) - cont._sliderOffset) / cont._graduationIntervalInPercentage);
                    var diff = (Math.round(parseFloat(cont.view.flxRight.centerX) - parseFloat(cont.view.flxLeft.centerX)));
                    if (diff >= 0) {
                        this.snapToPosition(cont, x);
                    } else {
                        if (xLeft >= cont._graduations) {
                            xLeft = cont._graduations - 1;
                        }
                        if (xLeft < 0) {
                            xLeft = 0;
                        }
                        var indicatorTextLeft = Math.round(((cont.minValue) + (xLeft) * (cont._graduationInterval)) * 100) / 100;
                        var xRight = xLeft + 1;
                        var indicatorTextRight = Math.round(((cont.minValue) + (xRight) * (cont._graduationInterval)) * 100) / 100;
                        cont.view.flxLeft.centerX = (cont._sliderOffset + xLeft * cont._graduationIntervalInPercentage) + "%";
                        cont.view.lblIndicatorLeft.text = indicatorTextLeft.toFixed(0);
                        cont.view.flxRight.centerX = (cont._sliderOffset + xRight * cont._graduationIntervalInPercentage) + "%";
                        cont.view.lblIndicatorRight.text = indicatorTextRight.toFixed(0);
                        this.setLblRange(cont);
                    }
                    this.snapToPosition(cont, x);
                    this.changeSknNumbers(cont);
                    this.setLblRange(cont);
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
                konymp.logger.trace("---------------Exiting onSnapValidate function---------------", konymp.logger.FUNCTION_EXIT);
            }
            /**
             * @function snapToPosition
             * @description Calculates which step is the closest
             * @private
             */
        snapToPosition(cont, x) {
                konymp.logger.trace("----------Entering snapToPosition function---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    var rem = (cont.xInPercentages(x) - cont._sliderOffset) % cont._graduationIntervalInPercentage;
                    var mid = cont._graduationIntervalInPercentage / 2;
                    var tempX;
                    if (rem < mid) {
                        tempX = cont.xInPercentages(x) - rem;
                    } else {
                        tempX = cont.xInPercentages(x) + (cont._graduationIntervalInPercentage - rem);
                    }
                    if (tempX > cont._divArray[cont._divisions]) {
                        tempX = cont._divArray[cont._divisions];
                    }
                    var xClose = parseInt((tempX - cont._sliderOffset) / cont._graduationIntervalInPercentage);
                    var indicatorText = Math.round((parseInt(cont.minValue) + parseInt(xClose) * (cont._graduationInterval)) * 100) / 100;
                    this.snapLeftOrRight(cont, x, tempX, indicatorText);
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
                konymp.logger.trace("---------------Exiting snapToPosition function---------------", konymp.logger.FUNCTION_EXIT);
            }
            /**
             * @function snapLeftOrRight
             * @description snaps left or right depending on which is closest
             * @private
             * @param x -in dp,tempX s in percentages,indicatorText -value displayed by indicator
             */
        snapLeftOrRight(cont, x, tempX, indicatorText) {
                konymp.logger.trace("----------Entering snapLeftOrRight function---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    if (!(tempX < cont._divArray[0] || tempX > cont._divArray[cont._divisions])) {
                        var positionCen = tempX + "%";
                        cont.view.flxRight.centerX = positionCen;
                        cont.view.flxRight.lblIndicatorRight.text = indicatorText.toFixed(0);
                        if (cont.onChangeEnd !== null || cont.onChangeEnd !== undefined) {
                            cont.onChangeEnd(cont.view.lblIndicatorRight.text);
                        }
                        cont.view.forceLayout();
                        this.changeSknNumbers(cont);
                        this.setLblRange(cont);
                    }
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
                konymp.logger.trace("---------------Exiting snapLeftToRight function---------------", konymp.logger.FUNCTION_EXIT);
            }
            /**
             * @function onTouchValidate
             * @description Check if the position is within valid range
             * @private
             */
        onTouchValidate(cont, x) {
                konymp.logger.trace("----------Entering onTouchValidate function---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    if (cont.selectedCursor !== "") {
                        if (cont.xInPercentages(x) >= cont._labelArray[0].centerX && cont.xInPercentages(x) <= cont._labelArray[cont._divisions].centerX) {
                            if (Math.round(Math.abs(parseFloat(cont.view.flxRight.centerX) - parseFloat(cont.view.flxLeft.centerX))) >= 0) {
                                this.onTouchSlide(cont, x);
                            } else {
                                var xLeft = parseInt((cont.xInPercentages(x) - cont._sliderOffset) / cont._graduationIntervalInPercentage);
                                if (xLeft == cont._divisions) {
                                    xLeft = xLeft - 1;
                                }
                                if (xLeft < 0) {
                                    xLeft = 0;
                                }
                                var indicatorTextLeft = Math.round((parseInt(cont.minValue) + parseInt(xLeft) * (cont._graduationInterval)) * 100) / 100;
                                var xRight = xLeft + 1;
                                var indicatorTextRight = Math.round((parseInt(cont.minValue) + parseInt(xRight) * (cont._graduationInterval)) * 100) / 100;
                                cont.view.flxLeft.centerX = parseFloat(cont._sliderOffset + xLeft * cont._graduationIntervalInPercentage) + "%";
                                cont.view.lblIndicatorLeft.text = indicatorTextLeft.toFixed(0);
                                cont.view.flxRight.centerX = parseFloat(cont._sliderOffset + xRight * cont._graduationIntervalInPercentage) + "%";
                                cont.view.lblIndicatorRight.text = indicatorTextRight.toFixed(0);
                                cont.obj.setLblRange(cont);
                                cont.selectedCursor = "";
                            }
                        } else if (cont.xInPercentages(x) < cont._labelArray[0].centerX) {
                            try {
                                this.changeSknNumbers(cont);
                                this.setLblRange(cont);
                                cont.view.flxLeft.centerX = cont._sliderOffset + "%";
                                cont.view.forceLayout();
                            } catch (xception) {
                                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                            }
                        }
                    }
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
                konymp.logger.trace("---------------Exiting onTouchValidate function---------------", konymp.logger.FUNCTION_EXIT);
            }
            /**
             * @function onTouchSlide
             * @description Slides to the required position if the position is in valid range
             * @private
             * @param
             */
        onTouchSlide(cont, x) {
                konymp.logger.trace("----------Entering onTouchSlide function---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    var selectedFlx;
                    var centerXPer = cont.xInPercentages(x);
                    var indicatorLabel;
                    if (cont.selectedCursor === "left") {
                        selectedFlx = cont.view.flxLeft;
                        indicatorLabel = cont.view.lblIndicatorLeft;
                        this.onTouchSlideCulminate(cont, x, centerXPer, selectedFlx, indicatorLabel);
                    } else if (cont.selectedCursor === "right") {
                        selectedFlx = cont.view.flxRight;
                        indicatorLabel = cont.view.lblIndicatorRight;
                        this.onTouchSlideCulminate(cont, x, centerXPer, selectedFlx, indicatorLabel);
                    }
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
                konymp.logger.trace("---------------Exiting onTouchSlide function---------------", konymp.logger.FUNCTION_EXIT);
            }
            /**
             * @function onTouchSlideCulminate
             * @description sets the centerX of the left or right cursor(selectedFlx)
             * @private
             * @param
             */
        onTouchSlideCulminate(cont, x, centerXPer, selectedFlx, indicatorLabel) {
                konymp.logger.trace("----------Entering onTouchSlideCulminate function---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    if (!(centerXPer < cont._divArray[0] || centerXPer > cont._divArray[this._divisions])) {
                        var xClose = Math.round((centerXPer - cont._sliderOffset) / cont._graduationIntervalInPercentage);
                        var indicatorText = Math.round((parseInt(cont.minValue) + parseInt(xClose) * (cont._graduationInterval)) * 100) / 100;
                        selectedFlx.centerX = centerXPer + "%";
                        this.onTouchSlideEventAndLabelHandler(cont, x, indicatorLabel, indicatorText);
                        selectedFlx.forceLayout();
                    }
                    this.setLblRange(cont);
                    cont.view.forceLayout();
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
                konymp.logger.trace("---------------Exiting onTouchSlideCulminate function---------------", konymp.logger.FUNCTION_EXIT);
            }
            /**
             * @function onTouchSlideEventAndLabelHandler
             * @description handles the events and label skin changes
             * @private
             * @param x
             * @param indicatorLabel
             * @param indicatorText
             */
        onTouchSlideEventAndLabelHandler(cont, x, indicatorLabel, indicatorText) {
            konymp.logger.trace("----------Entering onTouchSlideEventAndLabelHandler function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (cont._bufferSelectedRight !== null && cont._bufferSelectedRight !== indicatorText && cont.selectedCursor === "right") {
                    indicatorLabel.text = indicatorText.toFixed(0);
                    cont._bufferSelectedRight = indicatorText;
                    this.changeSknNumbers(cont);
                    if (cont.onValueChange !== null || cont.onValueChange !== undefined) {
                        cont.onValueChange(cont.view.lblIndicatorRight.text);
                    }
                    cont.view.forceLayout();
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("---------------Exiting onTouchSlideEventAndHandler function---------------", konymp.logger.FUNCTION_EXIT);
        }
    }
    return {
        getObj: function() {
            return new single();
        },
    };
});