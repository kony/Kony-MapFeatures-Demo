define({
    //Type your controller code here 
    oldZoomLevel: null,
    icon: "",
    _cluster: null,
    setPins: function() {
        this.icon = "atm_map_pin.png";
        var image = this.icon;
        var data = atms.results;
        var locationList = [];
        var locationObj = {};
        for (var i = 0; i < data.length; i++) {
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
        var pinData = null;
        if (eventObject == undefined) return;
        if (this.oldZoomLevel == null) {
            pinData = setNodes(eventObject.zoomLevel);
            if (pinData == undefined) return;
            this.view.zMap.locationData = this.setImage(pinData);
            this.oldZoomLevel = eventObject.zoomLevel;
        } else if (eventObject.zoomLevel == oldZoomLevel) {
            return;
        } else {
            pinData = setNodes(eventObject.zoomLevel);
            if (pinData == undefined) return;
            this.view.zMap.locationData = this.setImage(pinData);
            this.oldZoomLevel = eventObject.zoomLevel;
        }
    }
});