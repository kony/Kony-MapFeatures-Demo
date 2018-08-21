define(function() {
    var controller = require("com/konymp/map2/usermap2Controller");
    var actions = require("com/konymp/map2/map2ControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});