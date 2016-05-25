function displayMWError() {
    kony.ui.Alert("Middleware Error ", null, "error", null, null);
};

function displaySessionError() {
    kony.ui.Alert("Session Expired .. Please re-login", null, "error", null, null);
};

function displayError(code, msg) {
    // Commented for SWA: kony.ui.Alert("Error Code: "..code .." Message: " ..msg,null,"error",null,null);
    kony.ui.Alert(code + "- " + msg, null, "error", null, null);
};
var mergeHeaders = function(httpHeaders, globalHeaders) {
        for (var attrName in globalHeaders) {
            httpHeaders[attrName] = globalHeaders[attrName];
        }
        return httpHeaders;
    };

function appmiddlewareinvokerasync(inputParam, callBack) {
    var url = appConfig.url;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "wap";
    inputParam["platform"] = kony.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam.httpheaders = globalhttpheaders;
        };
    };
    var connHandle = kony.net.invokeServiceAsync(url, inputParam, callBack)
    return connHandle;
};

function appmiddlewaresecureinvokerasync(inputParam, callBack) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "wap";
    inputParam["platform"] = kony.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = globalhttpheaders;
        };
    };
    var connHandle = kony.net.invokeServiceAsync(url, inputParam, callBack)
    return connHandle;
};

function appmiddlewaresecureinvokerasyncForMBAAS(inputParam, serviceID, operationID, callBack) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "wap";
    inputParam["platform"] = kony.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = mergeHeaders({}, globalhttpheaders);
        };
    };
    if (kony.mbaas) {
        kony.mbaas.invokeMbaasServiceFromKonyStudio(url, inputParam, serviceID, operationID, callBack);
    } else {
        alert("Unable to find the MBAAS SDK for KonyStudio. Please download the SDK from the Kony Cloud Console and add as module to the Kony Project.");
    }
};

function appmenuseq() {
    frmHome.show();
};

function callAppMenu() {
    var appMenu = [
        ["appmenuitemid1", "Item 1", "option1.png", appmenuseq,
        {}],
        ["appmenuitemid2", "Item 2", "option2.png", appmenuseq,
        {}],
        ["appmenuitemid3", "Item 3", "option3.png", appmenuseq,
        {}],
        ["appmenuitemid4", "Item 4", "option4.png", appmenuseq,
        {}]
    ];
    kony.application.createAppMenu("sampAppMenu", appMenu, "", "");
    kony.application.setCurrentAppMenu("sampAppMenu");
};

function makeCall(eventobject) {
    kony.phone.dial(eventobject.text);
};

function initializeGlobalVariables() {};