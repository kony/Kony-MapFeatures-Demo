//animateDirection();
function animationBtoT() {
    if (frmRouteSearch.flxscrlContainer.opacity == 0) {
        frmRouteSearch.flxscrlContainer.opacity = 1;
        frmRouteSearch.flxscrlContainer.top = "90%";
    }
    //alert("going top")
    var animDefinition = {
        100: {
            "top": "0%"
            //frmRouteSearch.flxscrlContainer.opacity =1;
        }
    };
    btot = kony.ui.createAnimation(animDefinition);
    return btot;
}

function animationTtoB() {
    //alert("going bottom")
    var animDefinition = {
        100: {
            "top": "90%"
        }
    };
    ttob = kony.ui.createAnimation(animDefinition);
    return ttob;
}

function animateDirection() {
    //displySearchRoutes(selRoute);
    var topPosition = frmRouteSearch.flxscrlContainer.top;
    kony.print("@@@@ topPosition is : " + topPosition);
    if (topPosition == "90%") {
        flexFtr.btnHdr.text = "Show directions";
        frmRouteSearch.flxscrlContainer.animate(animationBtoT(), animConfigBtoT(), {});
    } else {
        flexFtr.btnHdr.text = "Hide directions";
        frmRouteSearch.flxscrlContainer.animate(animationTtoB(), animConfigTtoB(), {});
    }
}

function animConfigBtoT() {
    var config = {
        "duration": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    return config;
}

function animConfigTtoB() {
    var config = {
        "duration": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    return config;
}