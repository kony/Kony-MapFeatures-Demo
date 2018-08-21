/**
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(function() {
    var konyLoggerModule = require('com/konymp/singleslider/konyLogger');
    var konymp = konymp || {};
    konymp.logger = new konyLoggerModule("SliderComponent");
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            this._divisions = null;
            this._minValue = null;
            this._maxValue = null;
            this._beginRange = 0;
            this._endRange = 0;
            this._divArray = [];
            this._intervalDisplay = null;
            this._graduations = null;
            this._flagForRender = null;
            this._preShowFlag = true;
        },
        initGettersSetters: function() {
            defineSetter(this, "divisions", function(divisions) {
                konymp.logger.trace("----------Entering initGetterSetter function---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    if ((divisions === null && divisions === undefined) || divisions <= 0) {
                        throw {
                            "Error": "SliderComponent",
                            "message": "Invalid data type for division"
                        };
                    }
                    if (this._divisions === null) {
                        if (this.minValue === null || this.maxValue === null) {
                            throw {
                                "Error": "SliderComponent",
                                "message": "Please set Minimum Label Value and Maximum Label Value before setting graduations and divisions."
                            };
                        }
                        var range = Math.abs(this._minValue - this._maxValue);
                        if (!isNaN(parseInt(divisions)) && (divisions > 0) && (range % parseInt(divisions)) === 0) {
                            this._divisions = parseInt(divisions);
                        } else {
                            throw {
                                "Error": "SliderComponent",
                                "message": "Invalid datatype for property Interval Count.Number of Steps must be perfectly divisible by Interval Count"
                            };
                        }
                    } else {
                        throw {
                            "Error": "SliderComponent",
                            "message": "Trying to set the read-only property divisions"
                        };
                    }
                } catch (exception) {
                    konymp.logger.error("#####Exception in divisions setter : " + exception.message, konymp.logger.EXCEPTION);
                    if (exception.Error === "SliderComponent") {
                        throw exception;
                    }
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
                konymp.logger.trace("---------------Exiting initGettersSetters function---------------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "divisions", function() {
                konymp.logger.trace("----------Entering divisions function---------", konymp.logger.FUNCTION_ENTRY);
                return this._divisions;
            });
            defineSetter(this, "intervalDisplay", function(val) {
                konymp.logger.trace("----------Entering intervalDisplay function---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    if (this._intervalDisplay === null) {
                        this._intervalDisplay = val;
                    } else {
                        throw {
                            "Error": "SliderComponent",
                            "message": "Trying to set the read-only property intervalDisplay"
                        };
                    }
                } catch (exception) {
                    if (exception.Error === "SliderComponent") {
                        throw exception;
                    }
                }
                konymp.logger.trace("---------------Exiting intervalDisplay setter function---------------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "intervalDisplay", function() {
                konymp.logger.trace("----------Entering intervalDisplay function---------", konymp.logger.FUNCTION_ENTRY);
                return this._intervalDisplay;
            });
            defineSetter(this, "graduations", function(val) {
                try {
                    konymp.logger.trace("----------Entering graduations function---------", konymp.logger.FUNCTION_ENTRY);
                    if (this._graduations === null) {
                        if (this.minValue === null || this.maxValue === null) {
                            throw {
                                "Error": "SliderComponent",
                                "message": "Please set Minimum Label Value,Maximum Label Value before setting Graduations."
                            };
                        }
                        var range = Math.abs(this.minValue - this.maxValue);
                        if (!isNaN(parseInt(val)) && (parseInt(val)) >= 0) {
                            if (range % val !== 0) {
                                this._graduations = this._divisions;
                            } else {
                                this._graduations = parseInt(val);
                            }
                        } else {
                            throw {
                                "Error": "SliderComponent",
                                "message": "Invalid datatype for property Steps"
                            };
                        }
                    } else {
                        throw {
                            "Error": "SliderComponent",
                            "message": "Trying to set the read-only property graduations"
                        };
                    }
                } catch (exception) {
                    konymp.logger.error("#####Exception in graduations setter : " + exception.message, konymp.logger.EXCEPTION);
                    if (exception.Error === "SliderComponent") {
                        throw exception;
                    }
                }
                konymp.logger.trace("---------------Exiting graduation setter function---------------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "graduations", function() {
                return this._graduations;
            });
            defineGetter(this, "endIndex", function() {
                konymp.logger.trace("----------Entering endIndex Getter---------", konymp.logger.FUNCTION_ENTRY);
                return this._endIndex;
            });
            defineSetter(this, "endIndex", function(val) {
                konymp.logger.trace("----------Entering endIndex Setter---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    if (this.minValue === null || this.maxValue === null || this.graduations === null || this.divisions === null) {
                        throw {
                            "Error": "SliderComponent",
                            "message": "Please set Minimum Label Value,Maximum Label Value,Graduations and Divisions before setting endIndex."
                        };
                    }
                    var singleobj = require('com/konymp/singleslider/single');
                    this.obj = singleobj.getObj();
                    this.obj.initGlobals(this);
                    this.obj.generateDivs(this);
                    this._endIndex = val;
                    this.obj.endIndexValidateAndSet(this, val);
                } catch (exception) {
                    konymp.logger.error("#####Exception in endIndex  setter : " + exception.message, konymp.logger.EXCEPTION);
                    if (exception.Error == "SliderComponent") {
                        throw exception;
                    }
                }
                konymp.logger.trace("---------------Exiting endIndex function---------------", konymp.logger.FUNCTION_EXIT);
            });
            defineSetter(this, "minValue", function(val) {
                try {
                    if (this._minValue === null) {
                        if ((val === null && val === undefined) || isNaN(val) || val === "") {
                            throw {
                                "Error": "SliderComponent",
                                "message": "Invalid data type of Minimum Value property. Required Integer"
                            };
                        }
                        this.view.lblBegin.text = val;
                        this.view.lblBegin.isVisible = false;
                        this._minValue = val;
                    } else {
                        throw {
                            "Error": "SliderComponent",
                            "message": "Trying to set the read-only property minValue"
                        };
                    }
                } catch (exception) {
                    if (exception.Error === "SliderComponent") {
                        throw exception;
                    }
                }
            });
            defineSetter(this, "maxValue", function(val) {
                try {
                    if (this._maxValue === null) {
                        if ((val === null && val === undefined) || isNaN(val) || val === "") {
                            throw {
                                "Error": "SliderComponent",
                                "message": "Invalid data type of Maximum  Value property. Recquired Integer"
                            };
                        }
                        if (parseInt(val) <= parseInt(this.minValue)) {
                            throw {
                                "Error": "SliderComponent",
                                "message": "Maximum Label Value can't be less than or equal to Minimum Label Value"
                            };
                        }
                        this.view.lblEnd.text = val;
                        this.view.lblEnd.isVisible = false;
                        this._maxValue = val;
                    } else {
                        throw {
                            "Error": "SliderComponent",
                            "message": "Trying to set the read-only property maxValue"
                        };
                    }
                } catch (exception) {
                    if (exception.Error === "SliderComponent") {
                        throw exception;
                    }
                }
            });
        },
        /**
         * @function xInPercentages
         * @description converts x in dp to x in percentages
         * @private
         * @param x
         */
        xInPercentages: function(x) {
            try {
                return (x / this._containerWidth * 100);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function getSelectedValues (APIs)
         * @description returns slected values of the slider
         * @public
         * @param
         */
        getSelectedValues: function() {
            try {
                return this.view.lblIndicatorRight.text;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
        }
    };
});