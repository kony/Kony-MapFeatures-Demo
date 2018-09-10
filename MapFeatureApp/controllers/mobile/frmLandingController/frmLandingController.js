define({ 
  /**
			 * @function featureSelected
			 * @description navigates to selected feature
			 */
  featureSelected:function(){
    try{
      var formToBeNavigated = null;     

      switch(this.view.segFeatureOptions.selectedRowIndex[1]){
        case 0:	formToBeNavigated = "frmProperties";
          break;
        case 1:	formToBeNavigated = "frmSearchRoutes";
          break;      
        default:            		
          kony.print("You Shld not be here!!!");
          return;   
      }
      var ntf = new kony.mvc.Navigation(formToBeNavigated);
      ntf.navigate();
    }catch(error){
      kony.print("frmLanding Controller"+JSON.stringify(error));
    }
  }
});