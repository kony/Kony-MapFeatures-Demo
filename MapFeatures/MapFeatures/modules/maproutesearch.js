var selectedRouteNo = 0;
var selectedRoute = [];

var deviceInfo;
skipDrawing = false;
var cnt = 0;

function searchRoutes_Mine() {
  	kony.print("@@@@ this is sample function");
  	
  	//if(kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPhone Simulator" || kony.os.deviceInfo().name == "iPad" || kony.os.deviceInfo().name=="iPad Simulator"  )
		//kony.application.showLoadingScreen("loadingscreen","Searching...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true,{shouldShowLabelInBottom :true,separatorHeight:30});
	//else
		//kony.application.showLoadingScreen("loadingscreen","Searching...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true,null);
  	
  	var selectDest = frmShowDistanceIphone.rbtngrpDestination.selectedKeyValue[1];
    var index = selectDest.toString();
  	kony.print("@@@@ selectDest : " + selectDest + " index : " + index);
  
  	var searchCriteria = {
		//origin : {"address":"Orlando"},
		//destination : {"address":"Gachibowli"},
    	origin : {lat: 28.431139, lon : -81.308093}, //Orlando - Airport       
    	destination : {lat: 28.449344, lon: -81.481501}, //Kony - Orlando 28.449344, -81.481501
		directionServiceUrl : "https://maps.googleapis.com/maps/api/directions/json"
	};
  
    if (index == null) {
        alert('Please select any one destination');
    }
    switch (index) {
    case "Kony - Foster City":
        searchCriteria.destination = {lat: 37.558315, lon: -122.276358};
        break;
    case "Kony - Austin":
        searchCriteria.destination = {lat: 30.315840, lon: -97.868492};
        break;
    default :
      	kony.print("@@@@ destination is Orlando ");
        break;
    }  	

	//if(pop1.cbalt.selectedKeys != null && pop1.cbalt.selectedKeys.length > 0)
		searchCriteria.alternatives = true;

	//if(pop1.cbapikey.selectedKeys != null && pop1.cbapikey.selectedKeys.length > 0)
		searchCriteria.apiKey = "AIzaSyDzDds91h97mL-WvxKc6h6F-wx2P1tlTRo";

	//if(pop1.tbmode.text != "")
		//searchCriteria.transportMode = pop1.tbmode.text; 
	
	searchCriteria.transportMode = "driving"; 
	
	kony.map.searchRoutes(searchCriteria,mapRouteSearchSuccessCallback,mapRouteSearchErrorCallback);
	//return searchCriteria;
	//kony.application.showLoadingScreen(null,"Fetching routes...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,{enableMenuKey:true,enableBackKey:false});
}

function searchRoutesOnSelection()
{
  	kony.application.showLoadingScreen("formskin", "LoadingScreen", constants.
    LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
        enableMenuKey: true,
        enableBackKey: true,
        progressIndicatorColor: "ffffff77"
    });
	
	var searchCriteria = {
		origin : {lat: 17.2352271, lon : 78.4296922},
    	destination : {lat: 17.447326, lon: 78.371358},
		directionServiceUrl : "https://maps.googleapis.com/maps/api/directions/json"
	};

	//if(pop1.cbalt.selectedKeys != null && pop1.cbalt.selectedKeys.length > 0)
		searchCriteria.alternatives = true;

	//if(pop1.cbapikey.selectedKeys != null && pop1.cbapikey.selectedKeys.length > 0)
		searchCriteria.apiKey = "AIzaSyDzDds91h97mL-WvxKc6h6F-wx2P1tlTRo";

	//if(pop1.tbmode.text != "")
		//searchCriteria.transportMode = pop1.tbmode.text; 
	
	searchCriteria.transportMode = "driving"; 
	
	kony.map.searchRoutes(searchCriteria,mapRouteSearchSuccessCallback,mapRouteSearchErrorCallback);
	return searchCriteria;
	//kony.application.showLoadingScreen(null,"Fetching routes...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,{enableMenuKey:true,enableBackKey:false});
}


function routeSuccessCallback(routes){
	kony.print("********** Search Routes Success : "+(++cnt));
}

function routeErrorCallback(code,emsg){
	kony.print("Search Route Error for - "+(++cnt)+" error - "+emsg);
}

function timerCallback(){
	kony.map.searchRoutes(mySearchCriteria,routeSuccessCallback,routeErrorCallback);
}

function searchRoutesInTimer(){
	mySearchCriteria = searchRoutes();
	kony.timer.schedule("timer1", timerCallback, 1, true);
}
var mainRoute = -1;
var routesabc=[] ;
var routeColors = ["0000FF77","FF00FF77","FF000077","FFFF0077","0x00000077"];
var mainRouteColor = "0000FFFF";
var resultRoutes;

function mapRouteSearchSuccessCallback(routes){
  
	kony.print("@@@@ the routes length from are " + routes.length);
	
  	resultRoutes = routes;
   
	kony.print(routes);
	frmMyRouteSearch.mapRouteSearch.clear();
	if(routes == null || routes.length == 0)
	{
		alert("No Routes Found");
		return;
	}

	var routeWidth = [10,5,5,5];
	for(var i=0;i<routes.length;++i){
		if(i == 0) {
			drawRoute("route"+i, routes[i],mainRouteColor,routeWidth[i]);
          	selectedRouteNo = 0;
          	//displySearchRoutes(i);
        }
		else {
		 	drawRoute("route"+i, routes[i],routeColors[i],routeWidth[i]);
        }
	}
  	kony.application.dismissLoadingScreen();
}

function drawRoute(routeid,route,color,width){
	
	//var steps = getPathPoints(route);
	//kony.print("@@@@ the steps from getPathPoints are " + steps);
	
	var steps = getPathPointsFromRoute(route);
	//kony.print("@@@@ the steps from getPathPointsFromRoute are " + steps);
	
	ei = steps.length-1;
  
  	var file = new kony.io.File(kony.io.FileSystem.getCacheDirectoryPath() + "/" + "ratingstar.png");
    var fullPath = file.fullPath;
    kony.print("@@@@ fullpath= " + fullPath);
    var imgConfig = {
      source: fullPath,
      sourceType: kony.map.PIN_IMG_SRC_TYPE_FILE_PATH
     };
  
	var startLo = {lat:steps[0].lat,lon:steps[0].lon, image : imgConfig};
	var endLoc = {lat:steps[ei].lat,lon:steps[ei].lon,image:{source:"skony.png",anchor:kony.map.PIN_IMG_ANCHOR_CENTER}};
	//alert("No of Steps:"+steps.length);
	var polylineData = {
		id : routeid,
		locations : steps,
		startLocation : startLo,
		endLocation : endLoc,
		polylineConfig : {
			lineWidth : width,
			lineColor : color
		}
	};
	
	frmMyRouteSearch.mapRouteSearch.addPolyline(polylineData);
  	//frmMapRoute.map1.addPolyline(polylineData);
}
var selRoute = -1;
function onRouteMapClick(map, loc){
  	kony.print("@@@@ the onRouteMapClick function called");
	
	for(var i=0;i<resultRoutes.length;i++){
		var shapeData = {"locations":resultRoutes[i].polylinePoints,tolerance:1000};
		var result = kony.map.containsLocation(kony.map.SHAPE_TYPE_POLYLINE,loc,shapeData);
		if(result == true){
			selRoute = i;
			break;
		}
	}
	kony.print("******** Selected Route No = "+selRoute);
	if(selRoute != -1 && mainRoute != selRoute){
		mainRoute = selRoute;
		for(var j=0;j<resultRoutes.length;++j){
				if(j == selRoute) {
					drawRoute("route"+j, resultRoutes[j],mainRouteColor,10);
                  	selectedRouteNo = j;
                }
				else {
				 	drawRoute("route"+j, resultRoutes[j],routeColors[j],5);
                  	selectedRouteNo = j;
                }
		}
	}
  	displySearchRoutes(selRoute);
  	//kony.print("@@@@ the selected route is " + resultRoutes[selRoute]);
}

function mapRouteSearchErrorCallback(code,emsg){
	kony.application.dismissLoadingScreen();
	alert("Error="+emsg);
}

function getPathPointsFromRoute(route){
	//kony.print("@@@@ the route from getPathPointsFromRoute are " + route);
  	
	return route.polylinePoints;
}

function getPathPoints(route){
	//kony.print("@@@@ the route from getPathPoints are " + route);
	var pathPoints = new Array();
	for(var i=0;i<route.legs[0].steps.length;i++){
		var step = route.legs[0].steps[i];
		for(var j=0;j<step.points.length;j++)
		pathPoints.push(step.points[j]);
	}
	
	return pathPoints;
}

kony.print("@@@@ in onScrollStart");
routeColors = ["0000FFFF", "FF00FFFF", "FF0000FF", "FFFF00FF", "0x000000FF"];
lblName = 0;
lblPropName = 0;
hbxId = 0;

function displySearchRoutes(pathNo) {
    //frmSearchRoutesResults.destroy();
    kony.print("@@@@ routes length is : " +resultRoutes.length + " pathNo is " +pathNo);
    //kony.print("@@@@ routes is : " +resultRoutes);
  
    var myRouteData = [];
	
    //for (var i = 0; i < resultRoutes.length; i++) //routes Info
    //{        
        var legsLegth = resultRoutes[pathNo].legs.length;
        //kony.print("@@@@ legs : " + resultRoutes[pathNo].legs);
        for (var j = 0; j < legsLegth; j++) //Legs Info
        { 
          	
          	//kony.print("@@@@ steps : " + resultRoutes[pathNo].legs[j].steps);
            var stepssLegth = resultRoutes[pathNo].legs[j].steps.length;
            for (var k = 0; k < stepssLegth; k++) {
              	var tempObj = {};
                kony.print("@@@@ instruction "+k+" "+ resultRoutes[pathNo].legs[j].steps[k].instruction);
              	tempObj.lblDistance = resultRoutes[pathNo].legs[j].steps[k].distance+" meters";
              
                tempObj.lblDirection = "step-"+k+" " + resultRoutes[pathNo].legs[j].steps[k].instruction.trim();
              	              	  
              	myRouteData.push(tempObj);              	             	
            }
          	
        }
        //drawRoute("route" + i, resultRoutes[pathNo].polylinePoints, routeColors[i]);
    //}
  	frmMyRouteSearch.segDirections.setData(myRouteData);
  	//frmRouteSearch.flxscrlContainer.top = "90%";
    kony.application.dismissLoadingScreen();
    //frmRouteSearch.forceLayout();
    
}

