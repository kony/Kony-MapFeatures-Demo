define(function() {
    return {
        addDataToMap: function() {
            this.previous = "1";
            this.locationData = [{
                id: "1",
                name: "pin1",
                lat: "40.748817",
                lon: "-73.985428",
                image: "kony_mp_map04_blue_pin.png",
                lblheading: "Bikermann Davis",
                lbldistance: "1.2 Miles",
                dec: "428 Cristopher Stravenue Apt. 495",
                showcallout: false
            }, {
                id: "2",
                name: "pin2",
                lat: "42.361145",
                lon: "-71.057083",
                image: "kony_mp_map04_red_pin.png",
                lblheading: "The Westin",
                lbldistance: "10 Miles",
                dec: "International Business Park",
                showcallout: false
            }, {
                id: "3",
                name: "pin3",
                lat: "39.952583",
                lon: "-75.165222",
                image: "kony_mp_map04_red_pin.png",
                lblheading: "JW Marriott",
                lbldistance: "11 Miles",
                dec: "160 Central Park S",
                showcallout: false
            }, ];
            this.view.mapView.locationData = this.locationData;
        },
        pinClicked: function(location) {
            this.view.mapView.updatePins([{
                id: this.previous,
                image: "kony_mp_map04_red_pin.png"
            }, {
                id: location.id,
                image: "kony_mp_map04_blue_pin.png"
            }, ]);
            this.previous = location.id;
            this.view.lblHeading.text = location.lblheading;
            this.view.lblDistance.text = location.lbldistance;
            this.view.lblDescription.text = location.dec;
        }
    };
});