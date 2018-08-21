define(function() {
    var controller = require("com/konymp/map4/usermap4Controller");
    var actions = require("com/konymp/map4/map4ControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});