function downloadImageApplicationPath() {
    var url = "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Flag-4-Right-Azure-icon.png";
    var httpReq = new kony.net.HttpRequest();
    httpReq.open(constants.HTTP_METHOD_GET, url, false);
    httpReq.send();
    kony.print("**************http status=" + httpReq.status);
    if (httpReq.responseType == constants.HTTP_RESPONSE_TYPE_RAWDATA) {
        var file = new kony.io.File(kony.io.FileSystem.getApplicationDirectoryPath() + "/" + "ratingstar5.png");
        kony.print("************** ratingstar5.png file location is  " + file.fullPath);
      	file.createFile();
        file.write(httpReq.response);
        var fullPath = file.fullPath;
        kony.print("******************fullpath=" + fullPath);
        imgConfigApplicationPath = {
            source: fullPath,
            sourceType: kony.map.PIN_IMG_SRC_TYPE_FILE_PATH,
            anchor: kony.map.PIN_IMG_ANCHOR_MIDDLE_CENTER
        };
    }
}

function downloadingImage() {
    var url = "http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/pin-icon.png";
    var httpReq = new kony.net.HttpRequest();
    httpReq.open(constants.HTTP_METHOD_GET, url, false);
    httpReq.send();
    kony.print("**************http status=" + httpReq.status);
    if (httpReq.responseType == constants.HTTP_RESPONSE_TYPE_RAWDATA) {
        var file = new kony.io.File(kony.io.FileSystem.getDataDirectoryPath() + "/" + "ratingstar.png");
        kony.print("************** ratingstar.png file location is  " + file.fullPath);
      	file.createFile();
        file.write(httpReq.response);
        var fullPath = file.fullPath;
        kony.print("******************fullpath=" + fullPath);
        imgConfig = {
            source: fullPath,
            sourceType: kony.map.PIN_IMG_SRC_TYPE_FILE_PATH
        };
        var file2 = new kony.io.File(kony.io.FileSystem.getCacheDirectoryPath() + "/" + "cacheimage.png");
        file2.createFile();
        file2.write(httpReq.response);
        var fullPath1 = file2.fullPath;
        kony.print("******************fullpath=" + fullPath1);
        imgcacheConfig = {
            source: fullPath1,
            sourceType: kony.map.PIN_IMG_SRC_TYPE_FILE_PATH
        };
    }
}


function addLocationDatawithFileAppData() {
    frmCustomPin.mapCustomPin.calloutTemplate = Flextemp;
    frmCustomPin.mapCustomPin.widgetDataMapForCallout = {
        "lbl1": "lbl1"
    };
    frmCustomPin.mapCustomPin.defaultPinImage = imgcacheConfig;
    frmCustomPin.mapCustomPin.locationData = [{
        lat: "17.447326",
        lon: "78.371358",
        name: "KonyLabs(new)",
        desc: "Phoenix infocity, Gachibowli",
        image: imgConfigApplicationPath,
        showCallout: true,
        calloutData: {
            lbl1: {
                text: "konylabs.com(new)"
            }
        }
    }, {
        lat: "17.445252",
        lon: "78.378271",
        name: "tcs",
        desc: "Phoenix infocity, Gachibowli",
        image: imgConfigApplicationPath,
        showCallout: true,
        calloutData: {
            lbl1: {
                text: "TCS"
            }
        }
    }, {
        lat: "17.450368",
        lon: "78.381052",
        name: "Cyber Towers",
        desc: "Phoenix infocity, Gachibowli",
        image: imgConfigApplicationPath,
        showCallout: true,
        calloutData: {
            lbl1: {
                text: "CyberTowers"
            }
        }
    }, ];
    var testdata1 = {
        id: "circleId2",
        centerLocation: {
            lat: "17.447326",
            lon: "78.371358"
        },
        radius: 2
    }
    var testdata2 = {
        id: "circleId1",
        centerLocation: {
            lat: "17.445252",
            lon: "78.378271"
        },
        radius: 2
    }
    var testdata3 = {
        id: "circleId3",
        centerLocation: {
            lat: "17.450368",
            lon: "78.381052"
        },
        radius: 2
    }
    frmCustomPin.mapCustomPin.addCircle(testdata1);
    frmCustomPin.mapCustomPin.addCircle(testdata2);
    frmCustomPin.mapCustomPin.addCircle(testdata3);
}
