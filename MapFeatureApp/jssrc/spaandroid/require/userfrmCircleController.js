define({
    addCircletoMapLoc: function(latValue, lonValue, rad) {
        var testdata = {
            id: "circleId",
            centerLocation: {
                lat: latValue,
                lon: lonValue
            },
            navigatetoZoom: true,
            radius: rad,
            circleConfig: {
                lineColor: "00A0DDFF",
                lineWidth: 3
            },
            showCenterPin: true
        };
        this.view.Map1.addCircle(testdata);
    },
    radiobuttonClick() {
        this.view.Map1.removeCircle("circleId");
        var getRadiobtnKey = this.view.RadioButtonGroup0b6c5b64beb7940.selectedKey;
        var selectedValues = parseInt(this.view.singleslider.getSelectedValues());
        if (getRadiobtnKey === "ny") {
            this.addCircletoMapLoc("40.7127753", "-74.0059728", selectedValues);
        } else {
            this.addCircletoMapLoc("38.9071923", "-77.0368707", selectedValues);
        }
    }
});