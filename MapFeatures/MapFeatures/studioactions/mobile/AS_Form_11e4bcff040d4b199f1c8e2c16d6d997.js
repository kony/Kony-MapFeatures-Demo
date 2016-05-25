function AS_Form_11e4bcff040d4b199f1c8e2c16d6d997() {
    var deviceInfo;
    skipDrawing = false;
    var cnt = 0;
    searchRoutesMine();
    frmRouteSearch.mapRouteSearch.onClick = onRouteMapClick;

    function searchRoutesMine() {
        var searchCriteria = {
            origin: {
                "address": "Kukatpally"
            },
            destination: {
                "address": "Gachibowli"
            },
            directionServiceUrl: "https://maps.googleapis.com/maps/api/directions/json"
        };
        //if(pop1.cbalt.selectedKeys != null && pop1.cbalt.selectedKeys.length > 0)
        searchCriteria.alternatives = true;
        //if(pop1.cbapikey.selectedKeys != null && pop1.cbapikey.selectedKeys.length > 0)
        searchCriteria.apiKey = "AIzaSyDzDds91h97mL-WvxKc6h6F-wx2P1tlTRo";
        //if(pop1.tbmode.text != "")
        //searchCriteria.transportMode = pop1.tbmode.text; 
        searchCriteria.transportMode = "driving";
        /*	
	if(pop1.tbwaypoints.text!= null && pop1.tbwaypoints.text != ""){
		searchCriteria.waypoints = [];
		waypoints = pop1.tbwaypoints.text.split(",");
		for(var i=0;i<waypoints.length;++i)
			searchCriteria.waypoints.push({"address":waypoints[i]});
		//searchCriteria.waypoints = [{"address":"chandanagar"},{"address":"hafeezpet"}];
	} 
		
	if(pop1.tbavoid.text != null && pop1.tbavoid.text != ""){
		searchCriteria.avoid = [];
		toAvoid = pop1.tbavoid.text.split(",");
		for(var i=0;i<toAvoid.length;++i)
			searchCriteria.avoid.push(toAvoid[i]);	
	}
		
	if(pop1.tblang.text != "")
		searchCriteria.language = pop1.tblang.text; 
		
	if(pop1.tbdptime.text != "")
		searchCriteria.departureTime = pop1.tbdptime.text; 
		
	if(pop1.tbarrtime.text != "")
		searchCriteria.arrivalTime = pop1.tbarrtime.text; 
		
	if(pop1.tbtsitmode.text != null && pop1.tbtsitmode.text != ""){
		searchCriteria.transitMode = [];
		var transitModes = pop1.tbtsitmode.text.split(",");
		for(var i=0;i<transitModes.length;++i)
			searchCriteria.transitMode.push(transitModes[i]);	
	}
	
	if(pop1.tbtsitpref.text != null && pop1.tbtsitpref.text != ""){
		searchCriteria.transitRoutingPreference = [];
		var transitPrefs = pop1.tbtsitpref.text.split(",");
		for(var i=0;transitPrefs.length;++i)
			searchCriteria.transitRoutingPreference.push(transitPrefs[i]);	
	}
	*/
        kony.map.searchRoutes(searchCriteria, mapRouteSearchSuccessCallback, mapRouteSearchErrorCallback);
        return searchCriteria;
        //kony.application.showLoadingScreen(null,"Fetching routes...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,{enableMenuKey:true,enableBackKey:false});
    }

    function searchRoutesRepeat() {
        var cnt = parseInt(pop1.tbrcnt.text);
        for (var i = 0; i < cnt; i++) {
            searchRoutes();
        }
    }

    function routeSuccessCallback(routes) {
        kony.print("********** Search Routes Success : " + (++cnt));
    }

    function routeErrorCallback(code, emsg) {
        kony.print("Search Route Error for - " + (++cnt) + " error - " + emsg);
    }

    function timerCallback() {
        kony.map.searchRoutes(mySearchCriteria, routeSuccessCallback, routeErrorCallback);
    }

    function searchRoutesInTimer() {
        mySearchCriteria = searchRoutes();
        kony.timer.schedule("timer1", timerCallback, 1, true);
    }
    var mainRoute = -1;
    var resultRoutes;
    var routeColors = ["0000FF77", "FF00FF77", "FF000077", "FFFF0077", "0x00000077"];
    var mainRouteColor = "0000FFFF";

    function mapRouteSearchSuccessCallback(routes) {
        kony.print("@@@@ the routes from mapRouteSearchSuccessCallback are " + routes);
        resultRoutes = routes;
        kony.application.dismissLoadingScreen();
        /*
	if(pop1.cbskdr.selectedKeys != null && pop1.cbskdr.selectedKeys.length > 0)
	{
		kony.print("******* Route Search Success-"+(++i));
		return;
	}
	*/
        kony.print(routes);
        frmRouteSearch.mapRouteSearch.clear();
        if (routes == null || routes.length == 0) {
            alert("No Routes Found");
            return;
        }
        var routeWidth = [10, 5, 5, 5];
        for (var i = 0; i < routes.length; ++i) {
            if (i == 0) drawRoute("route" + i, routes[i], mainRouteColor, routeWidth[i]);
            else drawRoute("route" + i, routes[i], routeColors[i], routeWidth[i]);
        }
    }

    function drawRoute(routeid, route, color, width) {
        //var steps = getPathPoints(route);
        //kony.print("@@@@ the steps from getPathPoints are " + steps);
        var steps = getPathPointsFromRoute(route);
        kony.print("@@@@ the steps from getPathPointsFromRoute are " + steps);
        ei = steps.length - 1;
        var startLo = {
            lat: steps[0].lat,
            lon: steps[0].lon,
            image: {
                source: "skony.png",
                anchor: kony.map.PIN_IMG_ANCHOR_CENTER
            }
        };
        var endLoc = {
            lat: steps[ei].lat,
            lon: steps[ei].lon,
            image: {
                source: "skony.png",
                anchor: kony.map.PIN_IMG_ANCHOR_CENTER
            }
        };
        //alert("No of Steps:"+steps.length);
        var polylineData = {
            id: routeid,
            locations: steps,
            startLocation: startLo,
            endLocation: endLoc,
            polylineConfig: {
                lineWidth: width,
                lineColor: color
            }
        }
        frmRouteSearch.mapRouteSearch.addPolyline(polylineData);
    }

    function onRouteMapClick(map, loc) {
        kony.print("@@@@ the onRouteMapClick function called");
        var selRoute = -1;
        for (var i = 0; i < resultRoutes.length; i++) {
            var shapeData = {
                "locations": resultRoutes[i].polylinePoints,
                tolerance: 500
            };
            var result = kony.map.containsLocation(kony.map.SHAPE_TYPE_POLYLINE, loc, shapeData);
            if (result == true) {
                selRoute = i;
                break;
            }
        }
        kony.print("******** Selected Route No = " + selRoute);
        if (selRoute != -1 && mainRoute != selRoute) {
            mainRoute = selRoute;
            for (var j = 0; j < resultRoutes.length; ++j) {
                if (j == selRoute) drawRoute("route" + j, resultRoutes[j], mainRouteColor, 10);
                else drawRoute("route" + j, resultRoutes[j], routeColors[j], 5);
            }
        }
    }

    function mapRouteSearchErrorCallback(code, emsg) {
        kony.application.dismissLoadingScreen();
        alert("Error=" + emsg);
    }

    function getPathPointsFromRoute(route) {
        kony.print("@@@@ the route from getPathPointsFromRoute are " + route);
        return route.polylinePoints;
    }

    function getPathPoints(route) {
        kony.print("@@@@ the route from getPathPoints are " + route);
        var pathPoints = new Array();
        for (var i = 0; i < route.legs[0].steps.length; i++) {
            var step = route.legs[0].steps[i];
            for (var j = 0; j < step.points.length; j++)
            pathPoints.push(step.points[j]);
        }
        return pathPoints;
    }

    function showPlacesForm() {
        frmMapCircle.show();
    }

    function showPlaces() {
        var center = {
            lat: "28.449311",
            lon: "-81.481511",
            image: "skony.ong",
            name: "Kony Solutions",
            desc: "7380 West Sand Lake Road #390Orlando, FL 32819 USA 1-407-730-KONY (5669)"
        }
        var circleData = {
            id: "circle1",
            radius: 1000,
            centerLocation: center,
            navigateAndZoom: true,
            circleConfig: {
                lineWidth: 5,
                lineColor: "FF0000FF",
                fillColor: "FF000050"
            }
        }
        frmMapCircle.map1.addCircle(circleData);
        locations = [{
            lat: "28.449424",
            lon: "-81.480181",
            image: "mcd.png",
            name: "McDonalds",
            desc: "McDonald's, 7344 W Sand Lake Rd"
        }, {
            lat: "28.450452",
            lon: "-81.480820",
            image: "rest.png",
            name: "Ocean Prime Orlando",
            desc: "Upscale spot for streak and seafood"
        }, {
            lat: "28.450558",
            lon: "-81.478845",
            image: "rest.png",
            name: "Chick-Fill-A",
            desc: "Fast food chain for chicken sandwiches"
        }, {
            lat: "28.449369",
            lon: "-81.476775",
            image: "shop.png",
            name: "Whole Foods Market",
            desc: "Mainstay for natural & organic food"
        }, {
            lat: "28.451142",
            lon: "-81.479518",
            image: "beer.png",
            name: "Bar Louie",
            desc: "American pub grub, Microbrews & martinis"
        }, {
            lat: "28.452733",
            lon: "-81.477995",
            image: "beer.png",
            name: "Sports Bar",
            desc: "Sports Bar"
        }, {
            lat: "28.450566",
            lon: "-81.484462",
            image: "rest.png",
            name: "MoonFish",
            desc: "Seafood, steak & Sushi spot"
        }, {
            lat: "28.448956",
            lon: "-81.484735",
            image: "rest.png",
            name: "First Watch",
            desc: "Casual chain cafe for breakfast and lunch"
        }, {
            lat: "28.449395",
            lon: "-81.487419",
            image: "shop.png",
            name: "Walgreens",
            desc: "Presciprtions plus health & beauty items"
        }, {
            lat: "28.444930",
            lon: "-81.475758",
            image: "shop.png",
            name: "Dollar Tree",
            desc: "Wide range of products at bargain prices"
        }];
        frmMapCircle.map1.locationData = locations;
    }
}