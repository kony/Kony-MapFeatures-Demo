//actions.js file 
function AS_Button_4299269387574abba02ef36310837fc3() {
    frmFeatures.show();
}
function AS_Button_5b6d44bc51e5489cb3e799fa7cc2635f() {
    location1 = {
        lat: "17.240263",
        lon: "78.429385"
    };
    location2 = {
        lat: "17.445252",
        lon: "78.378271"
    };
    var distanceInMeters = kony.map.distanceBetween(location1, location2);
    frmShowDistance.lblDistance.text = distanceInMeters;
}
function AS_Button_77c8104a6dbe48f09c8c32eb71f59629() {}
function AS_Button_ae9aa026d3da4f8881169a512a3a5612() {
    frmShowDistance.show();
}