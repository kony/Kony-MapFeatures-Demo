define({
    //Type your controller code here 
    oldZoomLevel: null,
    icon: "",
    _cluster: null,
    setPins: function() {
        // var locationObj={};
        this.icon = "atm_map_pin.png";
        var image = this.icon;
        var data = atms.results;
        locationList = [];
        var locationObj = {};
        /*locationList = [
                  	{lat:"40.748817", lon:"-73.985428", image:"map_pin_red.png","name":"test","desc":"desc"},   
               		{lat:"42.361145", lon:"-71.057083", image:"map_pin_red.png","name":"test1","desc":"desc1"},
                	{lat:"39.952583", lon:"-75.165222", image:"map_pin_red.png","name":"test2","desc":"desc2"},
                  	{lat:"41.763710", lon:"-72.685097", image:"map_pin_red.png","name":"test3","desc":"desc3"},
                  	{lat:"41.512177", lon:"-74.018326", image:"map_pin_red.png","name":"test4","desc":"desc4"},
                  	{lat:"42.652580", lon:"-73.756233", image:"map_pin_red.png","name":"test5","desc":"desc5"},
                  	{lat:"40.610306", lon:"-75.477104", image:"map_pin_red.png","name":"test6","desc":"desc6"},
                  	{lat:"42.452858", lon:"-75.063774", image:"map_pin_red.png","name":"test7","desc":"desc7"},
                  	{lat:"41.408970", lon:"-75.662415", image:"map_pin_red.png","name":"test8","desc":"desc8"}
          		];*/
        for (i = 0; i < data.length; i++) {
            locationObj = {
                "lat": data[i]["geometry"]["location"]["lat"], //.toString(),
                "lon": data[i]["geometry"]["location"]["lng"], //.toString(),
                "image": image,
                //"type":"ATM",
                "name": data[i]["name"].toString(),
                "desc": data[i]["vicinity"].toString(),
                "merged": false,
                "id": i,
                //"calloutData": {"lblName":data[i]["name"].toString(),"lblDesc":data[i]["vicinity"].toString()},
                "showcallout": true
            };
            locationList.push(locationObj);
        }
        this._cluster = locationList;
        this.view.zMap.locationData = [];
        setCluster(locationList);
        this.view.zMap.zoomLevel = 15;
    },
    setImage: function(pinData) {
        for (var i = 0; i < pinData.length; i++) {
            if (isNaN(pinData[i]["desc"])) {
                pinData[i]["image"] = this.icon;
            } else {
                var count = parseInt(pinData[i]["desc"]);
                pinData[i]["image"] = "z" + count + ".png";
            }
        }
        return pinData;
    },
    onBoundsChangedForMap: function(eventObject, locationData) {
        if (eventObject == undefined) return;
        if (this.oldZoomLevel == null) {
            var pinData = setNodes(eventObject.zoomLevel);
            if (pinData == undefined) return;
            this.view.zMap.locationData = this.setImage(pinData);
            this.oldZoomLevel = eventObject.zoomLevel;
        } else if (eventObject.zoomLevel == oldZoomLevel) {
            return;
        } else {
            var pinData = setNodes(eventObject.zoomLevel);
            if (pinData == undefined) return;
            this.view.zMap.locationData = this.setImage(pinData);
            this.oldZoomLevel = eventObject.zoomLevel;
        }
    }
});