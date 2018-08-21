define(function() {
    var controller = require("com/konymp/singleslider/usersinglesliderController");
    var actions = require("com/konymp/singleslider/singlesliderControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    controller.initializeProperties = function() {
        defineSetter(this, "minValue", function(val) {
            this.view.lblBegin.text = val;
        });
        defineGetter(this, "minValue", function() {
            return this.view.lblBegin.text;
        });
        defineSetter(this, "sliderSource", function(val) {
            this.view.sliderPin.src = val;
        });
        defineGetter(this, "sliderSource", function() {
            return this.view.sliderPin.src;
        });
        defineSetter(this, "maxValue", function(val) {
            this.view.lblEnd.text = val;
        });
        defineGetter(this, "maxValue", function() {
            return this.view.lblEnd.text;
        });
        defineSetter(this, "pinSource", function(val) {
            this.view.imgPinIndicatorRight.src = val;
        });
        defineGetter(this, "pinSource", function() {
            return this.view.imgPinIndicatorRight.src;
        });
        defineSetter(this, "srcLeftBullet", function(val) {
            this.view.imgBullet1.src = val;
        });
        defineGetter(this, "srcLeftBullet", function() {
            return this.view.imgBullet1.src;
        });
        defineSetter(this, "srcRightBullet", function(val) {
            this.view.imgBullet2.src = val;
        });
        defineGetter(this, "srcRightBullet", function() {
            return this.view.imgBullet2.src;
        });
        defineSetter(this, "sknRange", function(val) {
            this.view.lblRange.skin = val;
        });
        defineGetter(this, "sknRange", function() {
            return this.view.lblRange.skin;
        });
        defineSetter(this, "sknActiveIndex", function(val) {
            this.view.lblBegin.skin = val;
        });
        defineGetter(this, "sknActiveIndex", function() {
            return this.view.lblBegin.skin;
        });
        defineSetter(this, "sknInactiveIndex", function(val) {
            this.view.lblEnd.skin = val;
        });
        defineGetter(this, "sknInactiveIndex", function() {
            return this.view.lblEnd.skin;
        });
        defineSetter(this, "sknSelectedIndex", function(val) {
            this.view.lblIndicatorRight.skin = val;
        });
        defineGetter(this, "sknSelectedIndex", function() {
            return this.view.lblIndicatorRight.skin;
        });
        defineSetter(this, "sknBackground", function(val) {
            this.view.flxback.skin = val;
        });
        defineGetter(this, "sknBackground", function() {
            return this.view.flxback.skin;
        });
        if (this.initGettersSetters) {
            this.initGettersSetters.apply(this, arguments);
        }
    };
    return controller;
});