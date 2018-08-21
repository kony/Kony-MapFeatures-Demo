define({ 
	index:null,
  routeId:[],
  routeColors:[],
  polylinePoints:[],
  distance:[],
  duration:[],
  min:[],
  hrs:[],
  kms:[],
  onNavigate:function(rbgSelectedValue){
   	this.index=rbgSelectedValue;
   	this.callSearchRoutefunc();
    var deviceHeight=kony.os.deviceInfo().screenHeight;
     var topValue=deviceHeight-95;
      //this.view.flxRoutes.top=topValue+"dp";
    this.view.hdrDest.text=this.index;
    },
  callSearchRoutefunc:function()
{
    var searchCriteriaObj = {
        alternatives : true, 
        directionServiceUrl : "https://maps.googleapis.com/maps/api/directions/json",
        destination : {lat: 28.449373, lon: -81.48162769999999},//Kony - Orlando
        origin :  {lat: 28.4310206, lon : -81.3080398}, //Orlando - Airport    ,
       // waypoints : [  {lon : -81.431853, lat : 28.4502945 } ] , 
        transportMode : "driving",
     	 apiKey:"AIzaSyBiLhaDbWkOVlAcGx8gQ0csyRbfZbpOmpQ"
    };
    if (this.index === null || this.index === undefined) {
        alert('Please select any one destination');
    }
    switch (this.index) {
    case "Kony Foster City":
        searchCriteriaObj.destination = {lat: 37.5608292, lon: -122.2710158};
        break;
    case "Kony Austin":
        searchCriteriaObj.destination = {lat: 30.3158671, lon: -97.868505};
        break;
    default :
      	kony.print("@@@@ destination is Orlando ");
        break;
    } 

    kony.map.searchRoutes(searchCriteriaObj, this.searchRouteSuccesCallback, this.errorRouteSuccesCallback);  
},

searchRouteSuccesCallback:function(routes)
{
    kony.print("######Succeess callback is called### "+routes);
    this.displySearchRoutes(routes);
},
errorRouteSuccesCallback:function(){
  alert("Search result failed");
},

displySearchRoutes:function(Searchroutes)
{
    kony.application.showLoadingScreen(
        "formskin",
        "LoadingScreen...",
        constants.LOADING_SCREEN_POSITION_ONLY_CENTER, 
        false,
        true,
        {
            enableMenuKey:true, 
            enableBackKey:true, progressIndicatorColor : "ffffff77"
        });

        //this.routeColors = ["0000FFFF","FF00FFFF","FF00FFFF","FF0000FF","FFFF00FF","0x000000FF"];00a0dd,4B88F1FF
		this.routeColors = ["00A0DDFF","A9A9A9FF","A9A9A9FF","FF0000FF","FFFF00FF","0x000000FF"];
        for(var i=Searchroutes.length-1;i>=0;i--)
        {
          	this.routeId[i]="Route"+(i+1);
          	this.polylinePoints[i]=Searchroutes[i].polylinePoints;
          	this.distance[i]=Searchroutes[i].distance;
          	this.duration[i]=Searchroutes[i].duration;  
          	this.drawRoute(this.routeId[i], this.polylinePoints[i],this.routeColors[i]) ;
        }
  		this.segData(0);
        kony.application.dismissLoadingScreen();    
},
  SegRouteClick:function(){
   	var rowdata= this.view.segRoutes.selectedRowItems;
    //alert(rowdata);
    var getRouteId=parseInt(rowdata[0].key.slice(5,6));
    var rowIndex= getRouteId-1;
    
    //var data={};    
   for(var i=0;i<this.routeId.length;i++){
         if(rowIndex===i ){        
    	} else{
       this.drawRoute(this.routeId[i], this.polylinePoints[i],this.routeColors[1]) ;
    	}    
    }
     this.drawRoute(this.routeId[rowIndex], this.polylinePoints[rowIndex],this.routeColors[0]) ;    
    this.segData(rowIndex);
     this.view.lblDist.text=this.kms[rowIndex] +" Miles";  
     if(Math.floor(this.hrs[rowIndex])<=0){
          this.view.lblTime.text=Math.round(this.min[rowIndex])+" min";
      	}  else{
         this.view.lblTime.text=Math.round(this.hrs[rowIndex])+" hr";
      	}
    this.animateFlexToSmall();
  },
   segData:function(rowindex){
    var data=[];
     var data2=[];
     var tmp={};
     var tmp2={};
     var tmp3={};
      this.view.lblDest.text=this.index;   
          
    for(var i=this.routeId.length-1;i>=0;i--){
       this.min[i]=this.duration[i]/60;
       this.hrs[i]=this.duration[i]/3600;
       this.kms[i]=Math.round(this.distance[i]*0.000621371192);
      	this.view.lblDist.text=this.kms[i]+" Miles"; 
      	if(Math.floor(this.hrs[i])<=0){
          this.view.lblTime.text=Math.round(this.min[i])+" min";
           tmp={"key":this.routeId[i],"lblRoute":"Route"+(i+1),"lbldistnTime":this.kms[i]+" Miles, "+Math.round(this.min[i])+" min"};
     	}else{
         this.view.lblTime.text=Math.round(this.hrs[i])+" hr";
          tmp={"key":this.routeId[i],"lblRoute":"Route"+(i+1),"lbldistnTime":this.kms[i]+" Miles, "+Math.round(this.hrs[i])+" hr"};
       } 
      if(rowindex!==i)
      data.push(tmp);  
    	
     }  
     for(var j=0;j<=data.length;j++){
       tmp2=data.pop();
        tmp3={"key":tmp2.key,"lblRoute":"Route"+(j+2),"lbldistnTime":tmp2.lbldistnTime};
       data2.push(tmp3);
     }
     
    this.view.segRoutes.setData(data2);
     //this.view.flxRoutes.forceLayout();
  },

 drawRoute:function(routeid,polyPoints,color)
{
    var steps = polyPoints;
    kony.print("################The polyline points "+steps);
    //kony.print(steps);
    ei = steps.length-1;

    var startLoc = {
        lat:steps[0].lat,
        lon:steps[0].lon,
        image:{source:"location_icon_blue.png",anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };

    var endLoc = {
        lat:steps[ei].lat,
        lon:steps[ei].lon,
        image:{source:"location_icon_red.png",anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };

    var polylineData = {
        id : routeid,
        locations : steps,
        startLocation : startLoc,
        endLocation : endLoc,
        polylineConfig : {lineWidth : 5, lineColor: color}
    };
  
      this.view.map1.addPolyline(polylineData);  
    
},
   animateFlexToFull: function(){     
      this.view.flxRoutes.animate(
        kony.ui.createAnimation({
          "100": {
            "top": "60%",
            "stepConfig": {
              "timingFunction": kony.anim.LINEAR
            },
            "rectified": true
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.4
        }, {

        });
      //this.view.flxOverlay.isVisible=true;
    },
    animateFlexToSmall: function(){
      var deviceHeight=kony.os.deviceInfo().screenHeight;
     var topValue=deviceHeight-148;    
      
      this.view.flxRoutes.animate(
        kony.ui.createAnimation({
          "100": {
            //"top": "86.5%",
           "top": topValue+"dp",
            "stepConfig": {
              "timingFunction": kony.anim.LINEAR
            },
            "rectified": true
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.4
        }, {

        });
      this.view.imgArrow.src="arrow_right.png";
		this.view.segRoutes.isVisible=false;
      //this.view.flxOverlay.isVisible=false;
    },
  	showRoutes:function(){         
      if(this.view.imgArrow.src=="arrow_right.png"){
         this.view.imgArrow.src="arrow_down.png";
        this.view.imgArrow.left="7dp"
		this.view.segRoutes.isVisible=true;
		this.animateFlexToFull();
      }else{
        
        this.animateFlexToSmall();
        
      }
     
    }


 });