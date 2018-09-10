define({ 
  /**
			 * @function addCircletoMapLoc
			 * @description adds circle to map at the give location and radius
			 * @private
			 * @param latValue-> lattitude
			 * @param lonValue-> longitude
			 * @param rad-> radius
			 */
  addCircletoMapLoc:function(latValue,lonValue,rad){
    try{
      var testdata = 
          {
            id:"circleId",
            centerLocation :
            {
              lat:latValue,
              lon:lonValue},
            navigatetoZoom:true,
            radius:rad,
            circleConfig:
            {
              lineColor:"00A0DDFF",
              lineWidth:3
            },
            showCenterPin:true
          };
      this.view.mapAddCircle.addCircle(testdata);
    }catch(error){
      kony.print("frmCircle Controller"+JSON.stringify(error));
    }
  },
  /**
			 * @function selectPlace
			 * @description adds circle for the selected place
			 */
  selectPlace(){
    try{
      this.view.mapAddCircle.removeCircle("circleId");
      var getRadiobtnKey=this.view.rbgDisplayPlace.selectedKey;
      var selectedSliderValue= parseInt(this.view.singleslider.getSelectedValues());
      if(getRadiobtnKey==="ny"){
        this.addCircletoMapLoc(MAPCONSTANTS.circleLat1,MAPCONSTANTS.circleLon1,selectedSliderValue);
      }else{
        this.addCircletoMapLoc(MAPCONSTANTS.circleLat2,MAPCONSTANTS.circleLon2,selectedSliderValue);
      }
    }catch(error){
      kony.print("frmCircle Controller"+JSON.stringify(error));
    }
  }
});