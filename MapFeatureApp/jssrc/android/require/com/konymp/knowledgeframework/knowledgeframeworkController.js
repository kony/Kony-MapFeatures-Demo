define(function() {
    var controller = require("com/konymp/knowledgeframework/userknowledgeframeworkController");
    var actions = require("com/konymp/knowledgeframework/knowledgeframeworkControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    controller.initializeProperties = function() {
        if (this.initGettersSetters) {
            this.initGettersSetters.apply(this, arguments);
        }
    };
    return controller;
});