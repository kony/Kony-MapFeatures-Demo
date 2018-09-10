define({
    /**
     * @function addPolygonTomap
     * @description adds polygon to map  based on the selected place
     */
    addPolygonTomap: function() {
        try {
            this.polyData = {
                id: "polyId1",
                locations: MAPCONSTANTS.polygonLoc1,
                navigateAndZoom: true,
                polygonConfig: {
                    lineColor: "00A0DDFF",
                    lineWidth: 5
                }
            };
            if (this.view.rbtn.selectedKey === "pen") {
                this.polyData.locations = MAPCONSTANTS.polygonLoc1;
            } else {
                this.polyData.locations = MAPCONSTANTS.polygonLoc2;
            }
            this.view.mapaddPolygon.addPolygon(this.polyData);
            this.view.mapaddPolygon.zoomLevel = 5;
        } catch (error) {
            kony.print("frmPolygon Controller" + JSON.stringify(error));
        }
    }
});