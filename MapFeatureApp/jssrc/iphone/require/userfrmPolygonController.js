define({
    //Type your controller code here 
    addPolygonTomap: function() {
        this.polyData = {
            id: "polyId1",
            locations: [{
                lat: "41.9761852",
                lon: "-80.5194486"
            }, {
                lat: "41.9903855",
                lon: "-75.3377141"
            }, {
                lat: "41.3537697",
                lon: "-74.6950917"
            }, {
                lat: "40.7639107",
                lon: "-75.1715017"
            }, {
                lat: "40.1536600",
                lon: "-74.7230434"
            }, {
                lat: "39.7215696",
                lon: "-75.7740764"
            }, {
                lat: "39.7212829",
                lon: "-80.5189779"
            }],
            navigateAndZoom: true,
            polygonConfig: {
                lineColor: "0x7D664DFF",
                lineWidth: 5
            }
        };
        if (this.view.rbtn.selectedKey === "pen") {
            this.polyData.locations = [{
                lat: "41.9761852",
                lon: "-80.5194486"
            }, {
                lat: "41.9903855",
                lon: "-75.3377141"
            }, {
                lat: "41.3537697",
                lon: "-74.6950917"
            }, {
                lat: "40.7639107",
                lon: "-75.1715017"
            }, {
                lat: "40.1536600",
                lon: "-74.7230434"
            }, {
                lat: "39.7215696",
                lon: "-75.7740764"
            }, {
                lat: "39.7212829",
                lon: "-80.5189779"
            }]
        } else {
            this.polyData.locations = [{
                lat: "41.7549062",
                lon: "-87.5216476"
            }, {
                lat: "41.7600353",
                lon: "-84.8049675"
            }, {
                lat: "38.7874035",
                lon: "-84.8142087"
            }, {
                lat: "37.9594226",
                lon: "-86.0395347"
            }, {
                lat: "37.8200046",
                lon: "-88.0979943"
            }, {
                lat: "38.7347453",
                lon: "-87.5120516"
            }]
        }
        this.view.Map1.addPolygon(this.polyData);
        this.view.Map1.zoomLevel = 5;
    }
});