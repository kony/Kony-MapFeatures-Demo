function AS_FlexScrollContainer_daea3b7394b844948b8c3c22cba81c49() {
    //animateDirection();
    function animationBtoT() {
        var animDefinition = {
            100: {
                "top": "0%"
            }
        };
        btot = kony.ui.createAnimation(animDefinition);
        return btot;
    }

    function animationTtoB() {
        var animDefinition = {
            100: {
                "top": "90%"
            }
        };
        ttob = kony.ui.createAnimation(animDefinition);
        return ttob;
    }

    function animateDirection() {
        var topPosition = frmRouteSearch.flxscrlContainer.top;
        kony.print("@@@@ topPosition is : " + topPosition);
        if (topPosition == "90%") {
            frmRouteSearch.flxscrlContainer.animate(animationBtoT(), animConfigBtoT(), {});
        } else {
            frmRouteSearch.flxscrlContainer.animate(animationTtoB(), animConfigTtoB(), {});
        }
    }

    function animConfigBtoT() {
        var config = {
            "duration": 2,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        return config;
    }

    function animConfigTtoB() {
        var config = {
            "duration": 2,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        return config;
    }
}