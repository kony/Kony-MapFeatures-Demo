function AS_Form_b3a7b9db8b1847f6b1db4cde76afeb38() {
    addPolygon();

    function addPolygon() {
        // pop1.dismiss();
        var locations = [{
            lat: 17.494332,
            lon: 78.391793
        }, {
            lat: 17.451759,
            lon: 78.380806
        }, {
            lat: 17.427789,
            lon: 78.451751
        }, {
            lat: 17.473305,
            lon: 78.425191
        }];
        var holes = [
            [{
                lat: 17.469702,
                lon: 78.391202
            }, {
                lat: 17.469866,
                lon: 78.409742
            }, {
                lat: 17.475924,
                lon: 78.412832
            }, {
                lat: 17.483456,
                lon: 78.403733
            }, {
                lat: 17.482965,
                lon: 78.393949
            }, {
                lat: 17.476907,
                lon: 78.394464
            }],
            [{
                lat: 17.455320,
                lon: 78.408714
            }, {
                lat: 17.448114,
                lon: 78.406311
            }, {
                lat: 17.441400,
                lon: 78.416096
            }, {
                lat: 17.450243,
                lon: 78.426567
            }]
        ];
        var locationData = {
            id: "polygon1",
            locations: locations,
            navigateAndZoom: true,
            polygonConfig: {
                innerPolygons: holes,
                lineColor: "0xFF0000FF",
                lineWidth: 9,
                fillColor: "0xFF0000FF"
            }
        };
        frmDrawPolygon.mapDrawPolygon.addPolygon(locationData);
    }
}