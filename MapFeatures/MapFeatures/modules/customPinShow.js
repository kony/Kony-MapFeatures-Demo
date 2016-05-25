function setPinFromFilePathAirPort() {
    //pop1.dismiss();
    //var url = "http://findicons.com/files/icons/2846/20_social_icons/128/skype.png";
    //var url = "http://icons.iconarchive.com/icons/martz90/circle-addon2/512/plane-flight-icon.png";
  	var url = "http://travelunlimitedonline.com/wp-content/uploads/2014/09/Flight_icon.png";
  	var httpReq = new kony.net.HttpRequest();
    httpReq.open(constants.HTTP_METHOD_GET, url, false);
    httpReq.send();
    kony.print("@@@@ http status= " + httpReq.status);
    if (httpReq.responseType == constants.HTTP_RESPONSE_TYPE_RAWDATA) {
        //var file = new kony.io.File(kony.io.FileSystem.getDataDirectoryPath()+"/"+"ratingstar.png");
        var file = new kony.io.File(kony.io.FileSystem.getCacheDirectoryPath() + "/" + "ratingstar.png");
        file.write(httpReq.response);
        /*
      	var fullPath = file.fullPath;
        kony.print("@@@@ fullpath= " + fullPath);
        var imgConfig = {
            source: fullPath,
            sourceType: kony.map.PIN_IMG_SRC_TYPE_FILE_PATH
        };
        var locationData = [{
           lat: 17.2352271, lon : 78.4296922,
            image: imgConfig,
            desc: "Hyd - Airport",
            name: "Hyderabad"
        }];
        frmCustomPin.mapCustomPin.locationData = locationData;
        */
    }
}

function setPinFromFilePathPhoenix() {
    //pop1.dismiss();
  	kony.print("@@@@ in setPinFromFilePath frmCustomPin preshow");
    var url = "http://findicons.com/files/icons/2846/20_social_icons/128/skype.png";
    var httpReq = new kony.net.HttpRequest();
    httpReq.open(constants.HTTP_METHOD_GET, url, false);
    httpReq.send();
    kony.print("**************http status=" + httpReq.status);
    if (httpReq.responseType == constants.HTTP_RESPONSE_TYPE_RAWDATA) {
        //var file = new kony.io.File(kony.io.FileSystem.getDataDirectoryPath()+"/"+"ratingstar.png");
        var file = new kony.io.File(kony.io.FileSystem.getCacheDirectoryPath() + "/" + "ratingstar.png");
        file.write(httpReq.response);
        var fullPath = file.fullPath;
        kony.print("******************fullpath=" + fullPath);
        var imgConfig = {
            source: fullPath,
            sourceType: kony.map.PIN_IMG_SRC_TYPE_FILE_PATH
        };
        var locationData = [{
            lat: "17.447326",
            lon: "78.371358",
            name: "KonyLabs",
            desc: "Phoenix infocity, Gachibowli",
            image: imgConfig,
            
        }];
        frmCustomPin.mapCustomPin.locationData = locationData;
    }
}

function setPinFromFilePathDS() {
    //pop1.dismiss();
  	kony.print("@@@@ in setPinFromFilePath frmCustomPin preshow");
    var url = "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Flag-4-Right-Azure-icon.png";
    var httpReq = new kony.net.HttpRequest();
    httpReq.open(constants.HTTP_METHOD_GET, url, false);
    httpReq.send();
    kony.print("**************http status=" + httpReq.status);
    if (httpReq.responseType == constants.HTTP_RESPONSE_TYPE_RAWDATA) {
        //var file = new kony.io.File(kony.io.FileSystem.getDataDirectoryPath()+"/"+"ratingstar.png");
        var file = new kony.io.File(kony.io.FileSystem.getCacheDirectoryPath() + "/" + "ratingstar.png");
        file.write(httpReq.response);
        var fullPath = file.fullPath;
        kony.print("******************fullpath=" + fullPath);
        var imgConfig = {
            source: fullPath,
            sourceType: kony.map.PIN_IMG_SRC_TYPE_FILE_PATH
        };
        var locationData = [{
            lat: "17.423330", lon: "78.378755",
            name: "Kony - Divyasree",
            desc: "Hyderabad",
            image: imgConfig,
            
        }];
        frmCustomPin.mapCustomPin.locationData = locationData;
    }
}


