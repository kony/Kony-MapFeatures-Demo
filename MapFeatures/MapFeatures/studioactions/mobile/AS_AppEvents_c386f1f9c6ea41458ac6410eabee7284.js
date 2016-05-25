function AS_AppEvents_c386f1f9c6ea41458ac6410eabee7284() {
    setPinFromFilePathAirPort();
    if (kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPhone Simulator" || kony.os.deviceInfo().name == "iPad" || kony.os.deviceInfo().name == "iPad Simulator") {
        kony.print("@# the device is iphone");
        //frmShowDistanceIphone.show();
        //kony.application.showLoadingScreen("loadingscreen","Searching...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true,{shouldShowLabelInBottom :true,separatorHeight:30});
    }
}