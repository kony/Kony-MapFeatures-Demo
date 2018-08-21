define(function(){
	var controller = require("userFlex0hc97bc34468649Controller");
	var controllerActions = ["Flex0hc97bc34468649ControllerActions"];

	for(var i = 0; i < controllerActions.length; i++){
		var actions = require(controllerActions[i]);
		for(var key in actions){
			controller[key] = actions[key];
		}
	}

	return controller;
})