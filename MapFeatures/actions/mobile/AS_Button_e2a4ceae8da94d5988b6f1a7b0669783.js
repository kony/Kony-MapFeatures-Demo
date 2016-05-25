function AS_Button_e2a4ceae8da94d5988b6f1a7b0669783() {
    kony.print("@@@@ in btnMyRS onClick");
    if (frmMyRouteSearch.flxScrlSeg.zIndex == 100) {
        frmMyRouteSearch.flxScrlSeg.zIndex = 1;
        frmMyRouteSearch.mapRouteSearch.zIndex = 100;
        frmMyRouteSearch.btnMyRS.text = "Show Turn By Turn Directions";
    } else {
        displySearchRoutes(selectedRouteNo);
        frmMyRouteSearch.flxScrlSeg.zIndex = 100;
        frmMyRouteSearch.mapRouteSearch.zIndex = 1;
        frmMyRouteSearch.btnMyRS.text = "Show Route Searched Map";
    }
}