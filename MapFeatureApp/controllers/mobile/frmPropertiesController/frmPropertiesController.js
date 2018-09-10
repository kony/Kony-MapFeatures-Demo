define({ 
  /**
			 * @function featureSelected
			 * @description navigates to selected feature
			 */
  featureSelected:function(){
    try{
      var formToBeNavigated = null;

      switch(this.view.segFeatureOptions.selectedRowIndex[1]){
        case 0:	formToBeNavigated = "frmCircle";
          break;
        case 1:	formToBeNavigated = "frmPolygon";
          break;
        case 2:	formToBeNavigated = "frmAddPin";
          break;
        case 3:	formToBeNavigated = "frmMultiplePinsDockedCallout";
          break;
        case 4:	formToBeNavigated = "frmClustered";
          break;
        default:

          kony.print("You Shld not be here!!!");
          return;   
      }
      var ntf = new kony.mvc.Navigation(formToBeNavigated);
      ntf.navigate();
    }catch(error){
      kony.print("frmProperties Controller"+JSON.stringify(error));
    }
  }
});