define({
    featureSelected: function() {
        var formToBeNavigated = null;
        switch (this.view.segFeatureOptions.selectedRowIndex[1]) {
            case 0:
                formToBeNavigated = "frmProperties";
                break;
            case 1:
                formToBeNavigated = "frmSearchRoutes";
                break;
            default:
                kony.print("You Shld not be here!!!");
                return;
        }
        var ntf = new kony.mvc.Navigation(formToBeNavigated);
        ntf.navigate();
    }
});