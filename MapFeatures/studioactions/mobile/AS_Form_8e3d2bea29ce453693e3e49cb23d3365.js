function AS_Form_8e3d2bea29ce453693e3e49cb23d3365() {
    frmDrawCircle.mapDrawCircle.calloutTemplate = Flextemp;
    frmDrawCircle.mapDrawCircle.widgetDataMapForCallout = {
        "lbl1": "lbl1"
    };
    frmDrawCircle.mapDrawCircle.defaultPinImage = {
        source: "pin6.png",
        sourceType: kony.map.PIN_IMG_SRC_TYPE_RESOURCES,
        anchor: kony.map.PIN_IMG_ANCHOR_TOP_LEFT
    }
    frmDrawCircle.mapDrawCircle.locationData = [{
        lat: "17.447326",
        lon: "78.371358",
        name: "KonyLabs(new)",
        showCallout: true,
        calloutData: {
            lbl1: {
                text: "konylabs.com(new)"
            }
        }
    }, {
        lat: "17.441839",
        lon: "78.380928",
        name: "KonyLabs(old)",
        showCallout: true,
        calloutData: {
            btn1: {
                lbl1: "konylabs.com(old)"
            }
        }
    }];
}