define(function() {

  return {
    addDataToMap : function(){
      this.view.mapView.enableMultipleCallouts = true;
      this.view.mapView.locationData =[
        { 
         id:"pin1",
         lat:"40.748817",
         lon:"-73.985428",
         showCallout:true,
         calloutData:{
           lblHeading:"Bikermann Davis",
           lblDistance :"1.2 miles",
           lblReviews: "12 Reviews",
           lblDescription :"428 Cristopher Stravenue Apt.795",
         }}];

    }	
  };
});