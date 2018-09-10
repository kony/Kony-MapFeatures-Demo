define({  
  oldZoomLevel:null,
  icon:"",
  _cluster:null,
  /**
			 * @function setPins
			 * @description set pins on the map during zoom in and zoom out
			 */
  setPins:function(){
    try{

      this.icon="atm_map_pin.png";
      var image=this.icon;
      var data=atms.results;
      var locationList=[];
      var locationObj={};

      for(var i=0;i<data.length;i++){
        locationObj={	
          "lat":data[i]["geometry"]["location"]["lat"],
          "lon":data[i]["geometry"]["location"]["lng"],
          "image":image,  
          "name":data[i]["name"].toString(),
          "desc":data[i]["vicinity"].toString(),
          "merged":false,
          "id":i,
          "showcallout":true
        };
        locationList.push(locationObj);
      }
      this._cluster=locationList;
      this.view.zMap.locationData=[];
      setCluster(locationList);
      this.view.zMap.zoomLevel=15;
    }catch(error){
      kony.print("frmClustered Controller"+JSON.stringify(error));
    }
  },
  /**
			 * @function setImage
			 * @description sets map pin image to be merged pin or single pin 
			 * @private
			 * @param pinData
			 */
  setImage:function(pinData){
    try{
      for(var i=0;i<pinData.length;i++){
        if(isNaN(pinData[i]["desc"])){
          pinData[i]["image"]=this.icon;
        }else{
          var count=parseInt(pinData[i]["desc"]);
          pinData[i]["image"]="z"+count+".png";
        }
      }
      return pinData;
    }catch(error){
      kony.print("frmClustered Controller"+JSON.stringify(error));
    }
  },
  /**
			 * @function onBoundsChangedForMap
			 * @description  cllabck for the bounds change
			 * @private
			 * @param eventObject
			 * @param locationData
			 */
  onBoundsChangedForMap:function(eventObject,locationData){
    try{
      var pinData=null;
      if(eventObject==undefined)
        return;
      if(this.oldZoomLevel==null){
        pinData=setNodes(eventObject.zoomLevel);
        if(pinData==undefined) return;
        this.view.zMap.locationData=this.setImage(pinData);
        this.oldZoomLevel=eventObject.zoomLevel;
      }else if(eventObject.zoomLevel==oldZoomLevel){
        return;
      }else{
        pinData=setNodes(eventObject.zoomLevel);
        if(pinData==undefined) return;
        this.view.zMap.locationData=this.setImage(pinData);
        this.oldZoomLevel=eventObject.zoomLevel;
      }
    }catch(error){
      kony.print("frmClustered Controller"+JSON.stringify(error));
    }
  }

});