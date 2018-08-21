/*
  * kony-sdk-ide Version 8.2.14
  */
        
/**
 * Kony namespace
 * @namespace kony
 */
if (typeof(kony) === "undefined") {
    kony = {};
}

/**
 * Constructor for creating the kony client instance.
 * @class
 * @classdesc kony Class
 * @memberof kony
 */
kony.sdk = function() {
    this.mainRef = {};
    var clientParams = {};
    this.tokens = {};
    this.currentClaimToken = null;
    this.currentBackEndToken = null;
    this.overrideUserIdFlag = true;
    this.globalRequestParams = {
        "headers":{},
        "queryparams":{},
        "bodyparams":{}
    };
    var userId = "";
    var sessionId = "";
    this.reportingheaders_allowed = false;

    if(kony.sdk.getSdkType() === "js" && typeof(kony.setUserID) === 'function') {
        var userIDflagGet = kony.ds.read("userIDFromLicenseFlag");
        if(kony.sdk.isNullOrUndefined(userIDflagGet)) {
            var userIDflagSet = new Array;
            userIDflagSet.push("false");
            kony.ds.save(userIDflagSet, "userIDFromLicenseFlag");
        }
    }


    if (kony.internal && kony.internal.sdk && kony.internal.sdk.Services) {
        this.internalSdkObject = new kony.internal.sdk.Services();
    }

    var localDataStore = new konyDataStore();
    this.getDataStore = function() {
        return localDataStore;
    };
    this.setDataStore = function(dataStore) {
        localDataStore = dataStore;
    };

    this.getUserId = function() {
        return userId;
    };
    this.setCurrentUserId = function(newUserID) {
        userId = newUserID;
    };
    this.getSessionId = function() {
        return sessionId;
    };
    this.setSessionId = function(newSessionId) {
        sessionId = newSessionId;
    };
    this.setClientParams = function(clientParamsMap) {
        clientParams = clientParamsMap;
    };

    this.getClientParams = function() {
        return clientParams;
    }

    this.globalRequestParamType = {
        headers:"headers",
        queryParams:"queryparams",
        bodyParams:"bodyparams"
    };

    this.getGlobalRequestParams = function(paramType){
        kony.sdk.logsdk.trace("Entering getGlobalRequestParams");
        if(kony.sdk.isNullOrUndefined(paramType)) {
            return this.globalRequestParams;
        }else if(paramType === this.globalRequestParamType.headers){
            return this.globalRequestParams.headers;
        }else if(paramType === this.globalRequestParamType.queryParams){
            return this.globalRequestParams.queryparams;
        }else if(paramType === this.globalRequestParamType.bodyParams) {
            return this.globalRequestParams.bodyparams;
        }
    };

    this.setGlobalRequestParam = function(paramName, paramValue, paramType){
        kony.sdk.logsdk.trace("Entering setGlobalRequestParam")
        if(typeof(paramName) === 'string' && typeof(paramValue) === 'string' && typeof(paramType) === 'string'){
            if(paramType === this.globalRequestParamType.headers){
                this.globalRequestParams.headers[paramName] = paramValue;
            }else if(paramType === this.globalRequestParamType.queryParams){
                this.globalRequestParams.queryparams[paramName] = paramValue;
            }else if(paramType === this.globalRequestParamType.bodyParams){
                this.globalRequestParams.bodyparams[paramName] = paramValue;
            }
        }
    };

    this.removeGlobalRequestParam = function(paramName, paramType){
        kony.sdk.logsdk.trace("Entering removeGlobalRequestParam")
        if(typeof(paramName) === 'string' && typeof(paramType) === 'string'){
            if(paramType.toLowerCase() == this.globalRequestParamType.headers && !kony.sdk.isNullOrUndefined(this.globalRequestParams.headers[paramName])){
                delete this.globalRequestParams.headers[paramName];
            }else if(paramType.toLowerCase() == this.globalRequestParamType.queryParams && !kony.sdk.isNullOrUndefined(this.globalRequestParams.queryparams[paramName])){
                delete this.globalRequestParams.queryparams[paramName];
            }else if(paramType.toLowerCase() == this.globalRequestParamType.bodyParams && !kony.sdk.isNullOrUndefined(this.globalRequestParams.bodyparams[paramName])){
                delete this.globalRequestParams.bodyparams[paramName];
            }
        }
    };

    this.resetGlobalRequestParams = function(){
        kony.sdk.logsdk.trace("Entering resetGlobalRequestParams");
        this.globalRequestParams = {
            "headers":{},
            "queryparams":{},
            "bodyparams":{}
        };
    };

    this.appendGlobalHeaders = function(headers){
        kony.sdk.logsdk.trace("Entering appendGlobalHeaders");
        var globalHeaders = this.getGlobalRequestParams(this.globalRequestParamType.headers);
        if(!kony.sdk.isNullOrUndefined(globalHeaders)) {
            if (kony.sdk.isNullOrUndefined(headers)) {
                headers = {};
            }
            for (var obj in globalHeaders) {
                if (kony.sdk.isNullOrUndefined(headers[obj])) {
                    headers[obj] = globalHeaders[obj];
                }
            }
        }
    };

    this.appendGlobalBodyParams = function(params){
        kony.sdk.logsdk.trace("Entering appendGlobalBodyParams");
        var globalBodyParams = this.getGlobalRequestParams(this.globalRequestParamType.bodyParams);
        if(!kony.sdk.isNullOrUndefined(globalBodyParams)) {
            if (kony.sdk.isNullOrUndefined(params)) {
                params = {};
            }
            for (var obj in globalBodyParams) {
                if (kony.sdk.isNullOrUndefined(params[obj])) {
                    params[obj] = globalBodyParams[obj];
                }
            }
        }
    };

    this.appendGlobalQueryParams = function(url){
        kony.sdk.logsdk.trace("Entering appendGlobalQueryParams");
        var globalQueryParams = this.getGlobalRequestParams(this.globalRequestParamType.queryParams);
        if(!kony.sdk.isNullOrUndefined(globalQueryParams) && Object.keys(globalQueryParams).length !== 0){
            if(url.indexOf("?") < 0){
                url = url + "?" + kony.sdk.util.objectToQueryParams(globalQueryParams);
            }else{
                url = url + "&" + kony.sdk.util.objectToQueryParams(globalQueryParams);
            }
        }
        return url;
    };

    this.appendGlobalParams = function(url, headers, params){
        kony.sdk.logsdk.trace("Entering appendGlobalParams");
        this.appendGlobalHeaders(headers);
        this.appendGlobalBodyParams(params);
        return this.appendGlobalQueryParams(url);
    };
};

kony.mbaas = kony.sdk;
kony.sdk.isDebugEnabled = true;
kony.sdk.isInitialized = false;
kony.sdk.currentInstance = null;
kony.sdk.isLicenseUrlAvailable = true;
kony.sdk.constants = kony.sdk.constants || {};
kony.sdk.version = "8.2.14";
kony.sdk.logger = new konyLogger();
kony.sdk.logsdk = new konySdkLogger();
kony.sdk.syncService = null;
kony.sdk.nativestore = kony.sdk.nativestore || new konyDataStore();
kony.sdk.skipAnonymousCall = false;

kony.sdk.getDefaultInstance = function() {
    return kony.sdk.currentInstance;
};

// This is to be deprecated with getDefaultInstance
kony.sdk.getCurrentInstance = function() {
    return kony.sdk.currentInstance;
};

// This is to be set by client to skip anonymous login calls.
kony.sdk.skipAnonymousLoginCall = function(state){
    // If enabled then client can only access public integration services.
    // If disabled then client can access protected integration services.
    // To access private client needs to get authenticated by an identity service.

    kony.sdk.skipAnonymousCall = state;
}

kony.sdk.claimsRefresh = function(callback, failureCallback) {
    kony.sdk.logsdk.trace("Entering kony.sdk.claimsRefresh");
    var konyRef = kony.sdk.getCurrentInstance();

    var networkProvider = new konyNetworkProvider();
    var loginWithAnonymousProvider = function(successCallback, failureCallback) {
        var identityObject = konyRef.getIdentityService("$anonymousProvider");
        identityObject.login(null,
            function(res) {
                successCallback();
            },
            function(res) {
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(res));
            });
    };

    if (konyRef.currentClaimToken === null) {
        kony.sdk.logsdk.warn("claims Token is Unavialable");
        if (konyRef.isAnonymousProvider) {
            loginWithAnonymousProvider(callback, failureCallback);
        } else {
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getNullClaimsTokenErrObj());
        }
    } else if (konyRef.claimTokenExpiry && new Date().getTime() > konyRef.claimTokenExpiry) {
        if (konyRef.isAnonymousProvider) {
            loginWithAnonymousProvider(callback, failureCallback);
        } else {
            kony.sdk.fetchClaimsTokenFromServer(false, callback, failureCallback);
        }
    } else {
        callback();
    }
};

kony.sdk.claimsAndProviderTokenRefresh = function(callback, failureCallback) {

    kony.sdk.logsdk.trace("Entering kony.sdk.claimsAndProviderTokenRefresh");
    kony.sdk.fetchClaimsTokenFromServer(true, callback, failureCallback);
};

/**
 * Checks for the etag in the response data. Gets the service doc & caches it if etag is updated.
 * @param data{JSON} response data from claimsRefresh or login.
 * @param callback{function} callback to be invoked.
 */
function getLatestServiceDocIfAvailable(data, callback){
    //Disabling this for phonegap and plain-js as there is not concept of auto-init there
    if(kony.sdk.getSdkType() !== "js"){
        kony.sdk.verifyAndCallClosure(callback);
        return;
    }
    var currentETag = kony.sdk.nativestore.getItem("etagID");
    var serverETag = data.service_doc_etag;

    if (!kony.sdk.isNullOrUndefined(serverETag) &&
        (kony.sdk.isNullOrUndefined(currentETag) || currentETag != serverETag)){
        kony.sdk.logsdk.info("Service doc update found.");
        var networkProvider = new konyNetworkProvider();
        var _serviceUrl = stripTrailingCharacter(konyRef.rec.url, "/") + "/appconfig";

        var headers = {};
        headers["X-Kony-App-Key"] = konyRef.mainRef.appKey;
        headers["X-Kony-App-Secret"] = konyRef.mainRef.appSecret;
        headers["X-HTTP-Method-Override"] = "GET";

        populateHeaderWithFabricAppVersion(headers);

        networkProvider.post(_serviceUrl, null, headers,
            function (successResponse) {
                kony.sdk.nativestore.setItem("etagID", serverETag);
                kony.sdk.logsdk.debug("Update done. Current version = "+currentETag+" Updated to "+serverETag);
                kony.sdk.nativestore.setItem(appConfig.appId+"_mobileFabricServiceDoc", JSON.stringify(successResponse));
                kony.sdk.verifyAndCallClosure(callback);
            },
            function (failureResponse) {
                kony.sdk.logsdk.error("Refresh of serviceDoc failed:" + JSON.stringify(failureResponse));
                kony.sdk.verifyAndCallClosure(callback);
            });
    } else {
        kony.sdk.verifyAndCallClosure(callback);
    }
}

kony.sdk.fetchClaimsTokenFromServer = function(isBackendTokenRefreshRequired, callback, failureCallback) {
    kony.sdk.logsdk.trace("Entering kony.sdk.fetchClaimsTokenFromServer");
    var konyRef = kony.sdk.getCurrentInstance();

    var networkProvider = new konyNetworkProvider();
    kony.sdk.logsdk.debug("claims token has expired. fetching new token and isBackendTokenRefreshRequired :" ,isBackendTokenRefreshRequired);
    var _serviceUrl = stripTrailingCharacter(konyRef.rec.url, "/");
    var _url = _serviceUrl + "/claims";
    if(isBackendTokenRefreshRequired){
        _url = _url + "?refresh=true";
    }
    kony.sdk.logsdk.debug("service url is " + _url);
    if (konyRef.currentRefreshToken === null) {
        kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getNullRefreshTokenErrObj());
    } else {
        networkProvider.post(_url, {}, {
                "Authorization": konyRef.currentRefreshToken,
                "Content-Type": "application/x-www-form-urlencoded"
            }, function(tokens) {
                kony.sdk.logsdk.trace("refresh success..acquiring new tokens");
                var response = kony.sdk.processClaimsSuccessResponse(tokens,konyRef,false);

                function serviceDocCallback(){
                    kony.sdk.verifyAndCallClosure(callback, response);
                }

                getLatestServiceDocIfAvailable(tokens, serviceDocCallback);
            },
            function(data) {
                kony.sdk.logsdk.error("failed to acquire refresh token",data);
                kony.sdk.processClaimsErrorResponse(data,konyRef,true,failureCallback);
            });
    }
};

kony.sdk.processClaimsSuccessResponse=function(data,konyRef,isAsync,callBack){
    kony.sdk.logsdk.trace("Entering kony.sdk.processClaimsSuccessResponse");
    data = kony.sdk.formatSuccessResponse(data);
    konyRef.currentClaimToken = data.claims_token.value;
    konyRef.claimTokenExpiry = data.claims_token.exp;
    konyRef.currentRefreshToken = data.refresh_token;
    kony.logger.setClaimsToken();
    //if offline login enabled then updating the claimstoken in the store
    if(kony.sdk.getPlatformName() !== "windows" && kony.sdk.getSdkType() === "js"){
        if(kony.sdk.offline.isOfflineEnabled && kony.sdk.offline.isOfflineEnabled == true) {
            kony.sdk.offline.updateAuthToken(data);
        }
        if(kony.sdk.offline.persistToken){
            kony.sdk.offline.updatePersistedToken(data);
        }
    }
    if(!isAsync){
        return { "message" :"success"};
    }
    else if(callBack){
        callBack();
    }
};
kony.sdk.processClaimsErrorResponse=function(data,konyRef,isAsync,callBack){
    kony.sdk.logsdk.trace("Entering kony.sdk.processClaimsErrorResponse");
	/*reset the claims token*/
    konyRef.currentClaimToken = null;
    konyRef.claimTokenExpiry = null;
    konyRef.currentRefreshToken = null;
    //setting the anonymous provider as true to access the public protected urls without any issue
    konyRef.isAnonymousProvider = true;
    if(!isAsync){
        return kony.sdk.error.getAuthErrObj(data);
    }
    else if(callBack){
        kony.sdk.verifyAndCallClosure(callBack, kony.sdk.error.getAuthErrObj(data));
    }
};
kony.sdk.prototype.setIntegrationServiceEndpoint = function(serviceName, endPoint) {
    kony.sdk.logsdk.trace("Entering kony.sdk.prototype.setIntegrationServiceEndpoint");
    if (!kony.sdk.isInitialized) {
        throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
    }
    var konyRef = kony.sdk.getCurrentInstance();
    if (!konyRef.integsvc) {
        throw new Exception(Errors.INTEGRATION_FAILURE, "no valid integration services available");
    }
    if (!konyRef.integsvc[serviceName]) {
        throw new Exception(Errors.INTEGRATION_FAILURE, "no valid integration services available for " + serviceName);
    }
    konyRef.integsvc[serviceName] = endPoint;
};

kony.sdk.prototype.setObjectServiceEndpoint = function(serviceName, endPoint) {
    kony.sdk.logsdk.trace("Entering kony.sdk.prototype.setObjectServiceEndpoint");
    if (!kony.sdk.isInitialized) {
        throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
    }
    var konyRef = kony.sdk.getCurrentInstance();
    if (!konyRef.objectsvc) {
        throw new Exception(Errors.OBJECT_FAILURE, "no valid Object services available");
    }
    if (!konyRef.objectsvc[serviceName]) {
        throw new Exception(Errors.OBJECT_FAILURE, "no valid Object services available for " + serviceName);
    }
    konyRef.objectsvc[serviceName] = endPoint;
};

kony.sdk.prototype.setAuthServiceEndpoint = function(providerName, endPoint) {

    kony.sdk.logsdk.trace("Entering kony.sdk.prototype.setAuthServiceEndpoint");
    if (!kony.sdk.isInitialized) {
        throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
    }

    var konyRef = kony.sdk.getCurrentInstance();

    if (!konyRef.login) {
        throw new Exception(Errors.AUTH_FAILURE, "no valid authentication services available");
    }

    var i = 0;
    for (i = 0; i < konyRef.login.length; i++) {
        var rec = konyRef.login[i];
        if (rec.prov.toUpperCase() === providerName.toUpperCase()) {
            break;
        }
    }

    if (i === konyRef.login.length) {
        throw new Exception(Errors.AUTH_FAILURE, "no valid authentication services available for " + providerName);
    }

    konyRef.login[i].url = endPoint;
};

kony.sdk.prototype.setSyncServiceEndpoint = function(endPoint) {
    kony.sdk.logsdk.trace("Entering kony.sdk.prototype.setSyncServiceEndpoint");
    if (!kony.sdk.isInitialized) {
        throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
    }

    var konyRef = kony.sdk.getCurrentInstance();

    if (!konyRef.sync) {
        throw new Exception(Errors.SYNC_FAILURE, "no valid sync services available");
    }

    //assuming only one sync service per app
    konyRef.sync.url = endPoint;
};

kony.sdk.prototype.setMessagingServiceEndPoint = function(endPoint) {
    kony.sdk.logsdk.trace("Entering kony.sdk.prototype.setMessagingServiceEndPoint");
    if (!kony.sdk.isInitialized) {
        throw new Exception(Errors.INIT_FAILURE, "Please call init before this, else your changes will be overridden when init is called");
    }

    var konyRef = kony.sdk.getCurrentInstance();

    if (!konyRef.messagingsvc) {
        throw new Exception(Errors.MESSAGING_FAILURE, "no valid messaging services available");
    }

    konyRef.messagingsvc.url = endPoint;
};

/**
 * Init success callback method.
 * @callback initSuccessCallback
 * @param {json} mainRef - Application Configuration
 */

/**
 * Init failure callback method.
 * @callback initFailureCallback
 */

/**
 * Initialization method for the kony SDK.
 * This method will fetch the app configuration from the kony server and stores in memory.
 * This method has to be invoked before invoking any other SDK methods.
 * @param {string} appKey - Appkey of the kony application
 * @param {string} appSecret - App Secret of the kony application
 * @param {string} serviceUrl - URL of the kony Server
 * @param {initSuccessCallback} successCallback  - Callback method on success
 * @param {initFailureCallback} failureCallback - Callback method on failure
 * @param {object} initOptions - Provision for user to provide MFAppVersion
 */
kony.sdk.prototype.init = function(appKey, appSecret, serviceUrl, successCallback, failureCallback, initOptions) {

    // removing app metadata with key for the latest app metadata
    kony.sdk.logsdk.trace("Entering kony.sdk.prototype.init");
    kony.sdk.deleteMetadatafromDs();

    if (!(appKey && appSecret && serviceUrl)) {
        kony.sdk.logsdk.error("### init:: Invalid credentials passed");
        kony.sdk.verifyAndCallClosure(failureCallback, "Invalid initialization parameters passed. Please check appKey, appSecret and ServiceUrl parameters");
        return;
    }
    var networkProvider = new konyNetworkProvider();
    serviceUrl = serviceUrl.trim();
    this.mainRef.serviceUrl = serviceUrl;
    this.mainRef.appSecret = appSecret;
    konyRef = this;
    KNYMobileFabric = this;
    var options = {};
    options["ignoreintegrity"] = true;

    setIntegrityParams();
    kony.sdk.logsdk.trace("### init:: calling GET on appConfig to retrieve servicedoc");

    var headers = {};

    headers["X-Kony-App-Key"] = appKey;
    headers["X-Kony-App-Secret"] = appSecret;
    headers["X-HTTP-Method-Override"] = "GET";

    //Resetting the value.
    kony.sdk.setFabricAppVersion(null);

    if (!kony.sdk.isNullOrUndefined(initOptions) && initOptions["MFAppVersion"]){
        kony.sdk.setFabricAppVersion(initOptions["MFAppVersion"]);
    }

    populateHeaderWithFabricAppVersion(headers);

    networkProvider.post(
        serviceUrl,
        null,
        headers,
        function(data) {
            data = kony.sdk.formatSuccessResponse(data);
            kony.sdk.logsdk.info("### init::_doInit fetched servicedoc successfuly");
            kony.sdk.logsdk.debug("### init:: retrieved data from service doc",data);
            konyRef.mainRef.config = data;
            konyRef.servicedoc = data;
            konyRef.mainRef.appId = data.appId;
            var processServiceDocResult = konyRef.initWithServiceDoc(appKey, appSecret, data);
            if (processServiceDocResult === true) {
                kony.sdk.logsdk.info("### init::_doInit processing service document successful");
                var svcDataStr = JSON.stringify(data);
                kony.sdk.logsdk.debug("### init::_doInit saving done. Calling success callback",data);
                kony.sdk.initiateSession(konyRef);
                if (kony.sdk.skipAnonymousCall){
                    kony.sdk.logsdk.info("### init::skipping anonymous login call");
                    // Enabling this flag to connect to any protected integration service.
                    konyRef.isAnonymousProvider = true ;
                    kony.sdk.verifyAndCallClosure(successCallback, konyRef.mainRef);
                }
                else{
                    var identityObject = kony.sdk.getCurrentInstance().getIdentityService("$anonymousProvider");
                    identityObject.login(null,
                        function(res) {
                            kony.sdk.verifyAndCallClosure(successCallback, konyRef.mainRef);
                        },
                        function(res) {
                            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(res));
                        });
                }
            } else {

                kony.sdk.logsdk.error("### init::_doInit processing servicedoc failed. Calling failure callback");
                kony.sdk.verifyAndCallClosure(failureCallback, JSON.stringify(processServiceDocResult));
            }
        },
        function(data) {
            kony.sdk.logsdk.error("### init::_doInit fetching service document from Server failed" + data);
            kony.sdk.logsdk.info("### init::_doInit  calling failure callback");
            kony.sdk.isInitialized = false;
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(data));
        },null,options);
};

kony.sdk.prototype.initWithServiceDoc = function(appKey, appSecret, serviceDoc) {
    kony.sdk.logsdk.trace("Entering kony.sdk.prototype.initWithServiceDoc");
    konyRef = this;
    KNYMobileFabric = this;

    kony.sdk.currentInstance = this;
    if(kony.sdk.getSdkType() === "js"){
        if (!kony.sdk.isNullOrUndefined(serviceDoc)) {
            if(serviceDoc.hasOwnProperty("integrity_check_required") && serviceDoc.integrity_check_required === true)
            {
                //MF server >=8.2
                konyRef.mainRef.integrityKey = true;
            }
            else {
                //MF server < 8.2 and integrity is disabled
                konyRef.mainRef.integrityKey = false;
            }
        }
    }else{
        //platform phonegap and plain-js doesn't support http integrity
        konyRef.mainRef.integrityKey = false;
    }
    if (serviceDoc instanceof kony.sdk.serviceDoc) {
        var servConfig = serviceDoc.toJSON();
        processServiceDocMap(servConfig);
    } else {
        return processServiceDocMap(serviceDoc);
    }

    function processServiceDocMap(servConfig) {
        var unProcessedServiceDoc = kony.sdk.cloneObject(servConfig);
        for (var item in servConfig) {
            if (kony.sdk.isNullOrUndefined(servConfig[item]) || kony.sdk.isEmptyObject(servConfig[item])) {
                delete servConfig[item];
            }
        }

        kony.sdk.logsdk.debug("### init::_doInit::_processServiceDoc", servConfig);
        try {
            konyRef.mainRef.appKey = appKey;
            konyRef.mainRef.appSecret = appSecret;
            konyRef.mainRef.appId = servConfig.appId;
            konyRef.mainRef.config = serviceDoc;

            /* if (!servConfig.baseId) {
             throw new Exception(Errors.INIT_FAILURE, "invalid baseId " + servConfig.baseId);
             } */
            konyRef.mainRef.baseId = servConfig.baseId;

            /* if (!servConfig.name) {
             throw new Exception(Errors.INIT_FAILURE, "invalid name " + servConfig.name);
             } */
            konyRef.mainRef.name = servConfig.name;

            if (servConfig.login) {
                konyRef.login = servConfig.login;
            } else {
                konyRef.login = [];
            }

            var url = servConfig.selflink;
            if (url) {
                var lastPos = url.indexOf("/appconfig");
                if (lastPos != -1) {
                    url = url.slice(0, lastPos);
                } else {
                    throw new Exception(Errors.INIT_FAILURE, "invalid self link");
                }
                var anonymousLoginProvider = {};
                anonymousLoginProvider.type = "anonymous";
                anonymousLoginProvider.url = url;
                anonymousLoginProvider.prov = "$anonymousProvider";
                konyRef.login.push(anonymousLoginProvider);
            }

            if (typeof(servConfig.integsvc) !== 'undefined') {
                kony.sdk.logsdk.info("### init::_doInit::_processServiceDoc parsing Integration services");
                konyRef.integsvc = servConfig.integsvc;
                kony.sdk.logsdk.debug("### init::_doInit::konyRef integration Services", konyRef.integsvc);
            }
            if (typeof(servConfig.services_meta) === 'object') {
                kony.sdk.logsdk.info("### init::_doInit::_processServiceDoc parsing Object services");
                kony.sdk.util.populateIndividualServiceLists(servConfig, konyRef);
            }

            if (typeof(servConfig.messagingsvc) !== 'undefined') {
                kony.sdk.logsdk.info("### init::_doInit::_processServiceDoc parsing Messaging services");
                konyRef.messagingsvc = servConfig.messagingsvc;
            }
            if (typeof(servConfig.logicsvc) !== 'undefined') {
                kony.sdk.logsdk.info("### init::_doInit::_processServiceDoc parsing Logic services");
                konyRef.logicsvc = servConfig.logicsvc;
            }

            if (typeof(servConfig.sync) !== 'undefined') {
                konyRef.sync = servConfig.sync;
            }

            if (servConfig.identity_features && servConfig.identity_features.reporting_params_header_allowed) {
                kony.sdk.logsdk.info("### init::_doInit::_processServiceDoc parsing Identity features");
                konyRef.reportingheaders_allowed = servConfig.identity_features.reporting_params_header_allowed;
            }

            if (kony.sdk.isLicenseUrlAvailable) {
                if (servConfig.reportingsvc && servConfig.reportingsvc.custom && servConfig.reportingsvc.session) {
                    konyRef.customReportingURL = servConfig.reportingsvc.custom;
                    konyRef.sessionReportingURL = servConfig.reportingsvc.session;

                    if (konyRef.sessionReportingURL && kony.logger.isNativeLoggerAvailable()) {
                        var lastIndex = konyRef.sessionReportingURL.lastIndexOf("/");
                        if (lastIndex !== -1) {
                            var networkUrl = konyRef.sessionReportingURL.substring(0, lastIndex + 1) + kony.logger.networkPersistorUrlEndpoint;
                            var networkPersistor = kony.logger.createNetworkPersistor();
                            networkPersistor.URL = networkUrl;
                            kony.logger.setPersistorConfig(networkPersistor);
                        }
                    }

                } else {
                    throw new Exception(Errors.INIT_FAILURE, "invalid url for reporting service");
                }
            }

            if (konyRef.internalSdkObject) {
                konyRef.internalSdkObject.initWithServiceDoc(appKey, appSecret, servConfig);
                if (konyRef.internalSdkObject.setClientParams) {
                    if (appConfig) {
                        konyRef.internalSdkObject.setClientParams({"aid": appConfig.appId, "aname": appConfig.appName});
                    } else {
                        konyRef.internalSdkObject.setClientParams(konyRef.getClientParams());
                    }

                }
                kony.sdk.logsdk.info("### init::internal sdk object initialized");
            }
            kony.sdk.logsdk.info("### init::_doInit::_processServiceDoc parsing service document done");
            kony.sdk.isInitialized = true;
            if (kony.sdk.metric && kony.os.deviceInfo().name == "thinclient") {
                kony.sdk.metric.flushEvents();
            }

            if (!kony.sdk.isNullOrUndefined(servConfig.reportingsvc)) {
                kony.sdk.saveMetadatainDs(appKey, appSecret, unProcessedServiceDoc);
                kony.sdk.setLicenseCall(appKey, appSecret, unProcessedServiceDoc);
            }

            if (kony.sdk.getSdkType() == "js" && kony.sdk.getSdkType() != "phonegap" && kony.sdk.getSdkType() != "plain-js") {
                if (kony.sdk.getAType() === "native" && (kony.sdk.getPlatformName() === "android" || kony.sdk.getPlatformName() === "ios")) {
                    if ((!kony.sdk.isNullOrUndefined(konyRef.offlineObjectsvc)) && !(kony.sdk.isEmptyObject(konyRef.offlineObjectsvc))) {
                        konyRef.OfflineObjects = new kony.sdk.OfflineObjects(konyRef.offlineObjectsvc);
                    }
                }
            }

            if (kony.license) {
                if (kony.licensevar && kony.licensevar.changeHandlers && kony.licensevar.changeHandlers.length == 0 && kony.license.registerChangeListener) {
                    kony.license.registerChangeListener(konyRef.sessionChangeHandler);
                    konyRef.overrideUserIdFlag = true;
                }
            }
            if (konyRef.mainRef.integrityKey === true) {
                setIntegrityParams();
                try {
                    if(!(kony.sdk.getPlatformName() === "windows" || kony.sdk.getAType() === "spa" || kony.sdk.getAType() === "watch")){
                        //invoke NFI only for android and ios.
                        kony.sdk.httpIntegrity.setIntegrityCheck(konyRef.mainRef.integrityParams);
                    }

                } catch (e) {
                    kony.sdk.logsdk.warn("Invalid Integrity properties received");
                    throw new Exception(Errors.INTEGRITY_FAILURE, "Invalid Integrity properties");
                }
            } else {
                resetIntegrityParams();
                if(!(kony.sdk.getPlatformName() === "windows" || kony.sdk.getAType() === "spa" || kony.sdk.getAType() === "watch")){
                    //invoke NFI only for android and ios
                    kony.sdk.httpIntegrity.removeIntegrityCheck();
                }
            }
            return true;
         }
        catch (err) {
            kony.sdk.logsdk.error("### init::_doInit::_processServiceDoc failed with an exception: " , err);
            return ("processing the ServiceDoc failed with an exception: " + JSON.stringify(err));
        }

    }
};

kony.sdk.prototype.sessionChangeHandler = function(changes) {
    kony.sdk.logsdk.trace("Entering kony.sdk.prototype.sessionChangeHandler");
    var konyRef = kony.sdk.getCurrentInstance();
    konyRef.getMetricsService();
    var sessionId = null;
    var userId = null;
    if (changes["sessionId"] != undefined) {
        sessionId = changes["sessionId"];
        konyRef.setSessionId(sessionId);
        if (konyRef.metricsServiceObject && konyRef.metricsServiceObject.setSessionId) {
            konyRef.metricsServiceObject.setSessionId(sessionId);
        }
    }
    if (changes["userId"] != undefined) {
        konyRef.overrideUserIdFlag = true;
        userId = changes["userId"];
        konyRef.setCurrentUserId(userId);
        if (konyRef.metricsServiceObject && konyRef.metricsServiceObject.setUserId) {
            konyRef.metricsServiceObject.setUserId(userId);
        }
    }
};

function setIntegrityParams(){

    var integrityParams = {"algo" : kony.sdk.INTEGRITY_ALGORITHM,
        "salt" : konyRef.mainRef.appSecret,
        "headerName" : kony.sdk.INTEGRITY_HEADER,
        "validateResp" : true
    };
    konyRef.mainRef.integrityKey = true;
    konyRef.mainRef.integrityParams = integrityParams;
}

function resetIntegrityParams(){
    konyRef.mainRef.integrityKey = false;
    konyRef.mainRef.integrityParams = {};
}

/**
 * MFSDK
 * Created by KH1969 on 18-01-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */

/**
 * Constructor for ClientCache service, uses lruCache.js internally to save key, value pairs.
 * This is a singleton class, object gets created for the first time of instantiation and the same object is
 * returned for next initializations.
 *
 * @param size {Number} Maximum size of the cache. It should be non zero positive number.
 * @return {kony.sdk.ClientCache}
 *
 */
kony.sdk.ClientCache = function(size){

    if (typeof kony.sdk.ClientCache.instance === 'object')
        return kony.sdk.ClientCache.instance;

    var lruCacheObj = null;

    if (size === undefined || size === null)
        lruCacheObj = new lruCache(kony.sdk.DEFAULT_CACHE_SIZE);
    else if (typeof size != 'number' || size <= 0){
        kony.sdk.logsdk.warn("cache cannot be created of size <= 0");
        return null;
    }
    else
        lruCacheObj = new lruCache(size);

    /**
     * Gets the response cached for the key. Returns null if not found.
     * @param key {string}
     * @return {null|object}
     */
    this.get = function(key){
        return lruCacheObj.get(key);
    }

    /**
     * Gets the boolean assertion for key existence in the cache.
     * @param key {string}
     * @return {boolean}
     */
    this.has = function(key){
        return lruCacheObj.has(key);
    }

    /**
     * Adds the key, value pair to cache.
     * @param key {string}
     * @param value {string}
     * @param expiryTime {number} Expiry time in seconds.
     */
    this.add = function(key, value, expiryTime){
        lruCacheObj.add(key, value, expiryTime);
    }

    /**
     * Removes the key, value from cache.
     * @param key {string}
     */
    this.remove = function(key){
        lruCacheObj.remove(key);
    }

    kony.sdk.ClientCache.instance = this;
}

/**
 * MFSDK
 * Created by KH1969 on 18-01-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */

/**
 * Constructor for standalone LRU page replacement implementation.
 * Implementation is done using a double linked list data structure and a hashmap.
 * Upon every insert & get the head gets updated to the newest element.
 * Cached nodes gets removed if size is more than the requested capacity.
 * Default cache size is 100.
 *
 * Should not be called by the developer.
 *
 *  Below is the list structure if elements are inserted in the order A, B, C & D

 *  Head = D, Tail = A
 *  D--(older)-->C--(older)-->B--(older)-->A--(older)-->NULL
 *  NULL<--(newer)--D<--(newer)--C<--(newer)--B<--(newer)--A
 *
 *  Now if B is accessed the list structure will be modified as,
 *  Head = B, Tail = A
 *
 *  B--(older)-->D--(older)-->C--(older)-->A--(older)-->NULL
 *  NULL<--(newer)--B<--(newer)--D<--(newer)--C<--(newer)--A
 */
lruCache = function(size){
    var LOG_PREFIX = "SDK_CACHE ";
    if (size === undefined || size === null)
        this.capacity = kony.sdk.DEFAULT_CACHE_SIZE;
    else if (typeof size != 'number' || size <= 0){
        kony.sdk.logsdk.warn("cache cannot be created of size <= 0");
        return null;
    }
    else
        this.capacity = size;

    this.length = 0;
    this.map = {};
    // save the head and tail so we can update it easily
    this.head = null;
    this.tail = null;

    /**
     * Gets the current time in seconds.
     * @returns {number}
     */
    function getCurrentTimeInSeconds(){
        return Math.floor(new Date().getTime()/1000);
    }

    /**
     * Double linked list data structure.
     * @param key
     * @param value
     */
    function cacheNode(key,value, expiry){
        this.key = key;
        this.val = value;
        this.newer = null;// Next newer node
        this.older = null;// Previous older node
        this.expiryTime = 0;

        if (expiry !== undefined && typeof expiry === 'number' && expiry != 0){
            this.expiryTime = getCurrentTimeInSeconds() + expiry;
        }
    }

    /**
     * Shuffles the cache by last recently used.
     * @param key
     */
    function shuffleLRUCache(key){
        var node = this.map[key];

        if (this.head === node){
            // No need to shuffle the cache, as the head itself is the recently accessed node.
            return;
        }

        // Head will not have newer node.
        if(node.newer){
            node.newer.older= node.older;
        }else{
            this.head = node.older;
        }

        // Tail will not have older node.
        if(node.older){
            node.older.newer = node.newer;
        }else{
            this.tail = node.newer;
        }

        // Now node is detached. Place it at head.
        // Updates are done in this way
        // 1: node--(older)-->head
        // 2: null<--(newer)--node
        // 3: node<--(newer)--head
        // 4: node is assigned to head. So current head got updated to node.
        node.older = this.head;
        node.newer = null;
        if(this.head){
            this.head.newer = node;
        }
        this.head = node;
    }

    /**
     * Returns the current size of the cache.
     * @returns {number}
     */
    this.getSize = function (){
        return this.length;
    }

    /**
     * Adds the key value pair to the cache.
     * Key gets removed upon expiry, expiry time is calculated by currentTimeInSeconds + expiryTime.
     * If no expiryTime is specified then key will not expire.
     * @param key {String}
     * @param value {Object}
     * @param expiryTime {Number}
     */
    this.add = function(key, value, expiryTime){
        if (key === undefined || value === undefined || key === null || value === null)
            return;

        // update the value for existing entries
        if(this.has(key)){
            this.map[key].val = value;
            kony.sdk.logsdk.debug(LOG_PREFIX+"Key: "+key+" updated");
            shuffleLRUCache.call(this, key);
            return;
        }

        if(this.length >= this.capacity){
            // remove the least recently used item
            this.remove(this.tail.key)
        }

        var node = new cacheNode(key,value, expiryTime);
        // Additions are done in this way
        // 1: node--(older)-->head
        // 2: node<--(newer)--head
        // 3: node is assigned to head. So current head got updated to node.
        // 4: tail = node, if there is no tail node then current node is tail node. This happens only for the first add.

        node.older = this.head;
        // if have head, we need re-connect node with other nodes older than head
        if(this.head){
            this.head.newer = node;
        }
        this.head = node;
        // if no tail which means first insert, set the tail to node too
        if(!this.tail){
            this.tail = node;
        }
        this.map[key] = node;
        this.length ++;

        kony.sdk.logsdk.debug(LOG_PREFIX+"Key: "+key+" added");
    }

    /**
     * Gets the cached node by key. Returns null if key is not found.
     * The key is removed if it is expired, returns null here as well.
     * @param key {String}
     * @returns {Object}
     */
    this.get = function(key){
        if(this.has(key)){
            if (this.map[key].expiryTime != 0 && getCurrentTimeInSeconds() > this.map[key].expiryTime){
                this.remove(key);
                kony.sdk.logsdk.debug(LOG_PREFIX+"Key: "+key+" expired");
                return null;
            }
            shuffleLRUCache.call(this, key);
            return this.map[key].val;
        }else{
            return null;
        }
    }

    /**
     * Removes the key, value from the cache by key.
     * @param key {String} Key to delete from the cache
     */
    this.remove = function(key){
        if(this.has(key)){
            var node = this.map[key];

            // Head node will not have newer node.
            if(node.newer){
                node.newer.older= node.older;
            }else{
                this.head = node.older;
            }

            // Tail node will not have older node.
            if(node.older){
                node.older.newer = node.newer;
            }else{
                this.tail = node.newer;
            }

            delete this.map[key];
            node = null;
            this.length --;
        }
    }

    /**
     * Clears the cache.
     */
    this.clear = function(){
        this.map = {};
        this.length = 0;
    }

    /**
     * Check if key exists.
     * @param key {string} Key to be found in the cache
     * @returns {boolean}
     */
    this.has = function(key){
        return this.map.hasOwnProperty(key);
    }

    /**
     * Updates the cache size.
     * @param size {number}
     */
    this.setMaxCacheSize = function(size){
        //    Todo: If requested size < capacity remove the last (N - size) nodes from tail.
        kony.sdk.logsdk.debug(LOG_PREFIX+"updating cache size from "+this.capacity+" to "+size);
        this.capacity = size;
    }
}

/**
 * Method to create the configuration service instance
 * @returns {ConfigurationService} Configuration service instance
 */
kony.sdk.prototype.getConfigurationService = function() {
    kony.sdk.logsdk.trace("Entering kony.sdk.prototype.getConfigurationService")
    if (!kony.sdk.isInitialized) {
        throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
    }
    var configObj = new ConfigurationService(this);
    if(configObj){
        return configObj;
    }
    else {
        throw new Exception(Errors.CONFIGURATION_FAILURE, "Error in creating configuration object");
    }
};

/**
 * Should not be called by the developer.
 * @class
 * @classdesc Configuration service instance for fetching client app properties.
 */
function ConfigurationService(konyRef){

    var istUrl = konyRef.mainRef.config.reportingsvc.session.split("/IST")[0];
    kony.sdk.logsdk.debug("IST url fetched from service doc is :"+istUrl);
    var configUrl = istUrl + kony.sdk.GET_CLIENT_PROPERTY_URL;
    kony.sdk.logsdk.debug("Configuration url formed is :"+configUrl);
    var networkProvider = new konyNetworkProvider();

    /**
     * Configuration svc method to get all the client app properties which is configured in admin console.
     * @successCallback this is called on successfull retrieval of properties
     * @failureCallback this is called on failure in retrieving properties
     * @returns {json} key value pair of all client app properties
     */
    this.getAllClientAppProperties = function(successCallback,failureCallback){

        function fetchClientPropertiesHandler(){
            _getAllClientAppProperties(successCallback,failureCallback);
        }

        kony.sdk.claimsRefresh(fetchClientPropertiesHandler, failureCallback);
    };

    function _getAllClientAppProperties(successCallback,failureCallback){
        kony.sdk.logsdk.trace("Entering into _getAllClientAppProperties");
        var defaultHeaders = {};
        var token = konyRef.currentClaimToken;
        if(!token){
            token = kony.sdk.getCurrentInstance().currentClaimToken;
        }
        defaultHeaders["X-Kony-Authorization"] = token;
        var options = {};
        options["disableIntegrity"] = true;
        networkProvider.get(configUrl,null,defaultHeaders,
            function(res) {
                kony.sdk.logsdk.trace("Entering Configuration service network success");
                kony.sdk.logsdk.debug("response from server for client properties is :"+JSON.stringify(res));
                var tempArray = ["httpresponse","opstatus"];
                var tempJSON = {};
                for(var key in res){
                    if(tempArray.indexOf(key.toLowerCase())>-1){
                        continue;
                    }
                    tempJSON[key] = res[key];
                }
                kony.sdk.verifyAndCallClosure(successCallback, tempJSON);
            },
            function(xhr, status, err) {
                kony.sdk.logsdk.trace("Entering Configuration service network error");
                if (xhr && !(status && err)) {
                    err = xhr;
                }
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getObjectServiceErrObj(err));
            }, null, options);
    }
}
kony.sdk.LAUNCHMODE_DEEPLINK = 3;
kony.sdk.DEEPLINK_VALID_PARAM = "code";
kony.sdk.LOGGER_NAME = "MFSDK";
kony.sdk.SYNC_LOGGER_NAME = "SYNCV1";
kony.sdk.APP_LOGGER_NAME = "KonyLogger";
kony.sdk.GET_BACKEND_TOKEN = "getBackendToken";
kony.sdk.GET_SECURITY_ATTRIBUTES = "getSecurityAttributes";
kony.sdk.GET_USER_ATTRIBUTES =  "getUserAttributes";
kony.sdk.GET_USER_DATA = "getUserData";
kony.sdk.GET_PROFILE = "getProfile";
kony.sdk.GET_CLIENT_PROPERTY_URL = "/metadata/configurations/client/properties";
kony.sdk.INTEGRITY_ALGORITHM = "SHA256";
kony.sdk.INTEGRITY_HEADER = "X-Kony-Integrity";
kony.sdk.REMOVE_INTEGRITY_CHECK = "removeIntegrityCheck";
kony.sdk.SET_INTEGRITY_CHECK = "setIntegrityCheck";
kony.sdk.DEFAULT_CACHE_SIZE = 100;
kony.sdk.DEFAULT_CACHE_EXPIRY_TIME = 0; //Which means it doesn't expire in the application session.
kony.sdk.SDK_TYPE_PLATFORM_IDE = "js";
kony.sdk.SDK_TYPE_PLATFORM_PHONEGAP = "phonegap";
kony.sdk.SDK_TYPE_PLATFORM_PLAIN_JS = "plain-js";
kony.sdk.KEY_DEVICE_ID = "deviceID";
kony.sdk.SDK_PLATFORM_SPA = "thinclient";

if (typeof(kony.sdk) === "undefined") {
	kony.sdk = {};
}

if (typeof(kony.sdk.error) === "undefined") {
	kony.sdk.error = {};
}

kony.sdk.error.getAuthErrObj = function(errResponse) {
	kony.sdk.logsdk.trace("Entering into kony.sdk.error.getAuthErrObj");
	if (errResponse && errResponse.httpresponse) {
		delete errResponse.httpresponse;
	}
	if (errResponse && (errResponse.opstatus == 1013 || errResponse.opstatus == 1011)) {
		errResponse["message"] = errResponse["errmsg"];
		delete errResponse.errmsg;
	}
	try {
		var mfcode = errResponse["mfcode"];
		var message = errResponse["message"];
		var details = errResponse["details"];
		if (mfcode) {
			return kony.sdk.error.getMFcodeErrObj(mfcode, message, details, "");
		}
		return errResponse;
	} catch (err) {
		return errResponse;
	}
}

kony.sdk.error.getNullClaimsTokenErrObj = function() {
		kony.sdk.logsdk.trace("Entering into kony.sdk.error.getNullClaimsTokenErrObj");
	var errorObj = {};
	errorObj.opstatus = kony.sdk.errorcodes.cliams_token_null
	errorObj.message = kony.sdk.errormessages.cliams_token_null
	errorObj.details = {};
	errorObj.mfcode = "";
	return errorObj;
}

kony.sdk.error.getIdentitySessionInactiveErrObj = function() {
		kony.sdk.logsdk.trace("Entering into kony.sdk.error.getIdentitySessionInactiveErrObj");
	var errorObj = {};	errorObj.opstatus = kony.sdk.errorcodes.identity_session_inactive
	errorObj.message = kony.sdk.errormessages.identity_session_inactive
	errorObj.details = {};
	errorObj.mfcode = "";
	return errorObj;
}

kony.sdk.error.getNullRefreshTokenErrObj = function() {
		kony.sdk.logsdk.trace("Entering into kony.sdk.error.getNullRefreshTokenErrObj");
	var errorObj = {};
	errorObj.opstatus = kony.sdk.errorcodes.invalid_session_or_token_expiry
	errorObj.message = kony.sdk.errormessages.invalid_session_or_token_expiry
	errorObj.details = {};
	errorObj.mfcode = "";
	return errorObj;
}

kony.sdk.error.getIntegrationErrObj = function(errResponse) {
		kony.sdk.logsdk.trace("Entering into kony.sdk.error.getIntegrationErrObj");
	try {
		var mfcode = errResponse["mfcode"];
		var message = errResponse["errmsg"];
		var details = errResponse["mferrmsg"];
		var service = errResponse["service"];
		if (!service) {
			service = "";
		}
		if (!details) {
			details = "";
		}
		var errorMessagePrefixForIntegration = "";
		if (service) {
			errorMessagePrefixForIntegration = "Integration Service Request Failed for " + service + ":";
		} else {
			errorMessagePrefixForIntegration = "Integration Service Request Failed:";
		}
		if (mfcode) {
			return kony.sdk.error.getMFcodeErrObj(mfcode, message, details, errorMessagePrefixForIntegration);
		}
		return errResponse;
	} catch (err) {
		return errResponse;
	}
}

kony.sdk.error.getLogicErrObj = function(errResponse) {
		kony.sdk.logsdk.trace("Entering into kony.sdk.error.getLogicErrObj");
	try {
		var mfcode = errResponse["mfcode"];
		var message = errResponse["errmsg"];
		var details = errResponse["mferrmsg"];
		var service = errResponse["service"];
		if (!service) {
			service = "";
		}
		if (!details) {
			details = "";
		}
		
		var errorMessagePrefixForLogic = "";
		if (service) {
			errorMessagePrefixForLogic = "Logic Service Request Failed for " + service + ":";
		} else {
			errorMessagePrefixForLogic = "Logic Service Request Failed:";
		}
		if (mfcode) {
			return kony.sdk.error.getMFcodeErrObj(mfcode, message, details, errorMessagePrefixForLogic);
		}
		return errResponse;
	} catch (err) {
		return errResponse;
	}
}

kony.sdk.error.getMFcodeErrObj = function(mfcode, message, details, errMessagePrefix) {
		kony.sdk.logsdk.trace("Entering into kony.sdk.error.getMFcodeErrObj");
	var errorObj = {};
	errorObj.details = {};
	if (details) {
		errorObj.details = details;
	}
	errorObj.mfcode = mfcode;
	if (mfcode === "Auth-4") {
		if (!message) {
			message = kony.sdk.errormessages.invalid_user_credentials
		}
		errorObj.opstatus = kony.sdk.errorcodes.invalid_user_credentials
		errorObj.message = errMessagePrefix + message;

	} else if (mfcode === "Auth-9") {
		if (!message) {
			message = kony.sdk.errormessages.invalid_app_credentials
		}
		errorObj.opstatus = kony.sdk.errorcodes.invalid_app_credentials
		errorObj.message = errMessagePrefix + message;
	} else if (mfcode === "Auth-3") {
		if (!message) {
			message = kony.sdk.errormessages.invalid_user_app_credentials
		}
		errorObj.opstatus = kony.sdk.errorcodes.invalid_user_app_credentials
		errorObj.message = errMessagePrefix + message;
	} else if ((mfcode === "Auth-5") || (mfcode === "Auth-6") || (mfcode === "Gateway-31") || (mfcode === "Gateway-33") || (mfcode === "Gateway-35") || (mfcode === "Gateway-36") || (mfcode === "Auth-46") || (mfcode === "Auth-55")) {
		errorObj.opstatus = kony.sdk.errorcodes.invalid_session_or_token_expiry
		errorObj.message = errMessagePrefix + kony.sdk.errormessages.invalid_session_or_token_expiry
	} else if (mfcode === "Auth-7" || mfcode === "Auth-27") {
		if (!message) {
			message = errMessagePrefix + kony.sdk.errormessages.invalid_user_app_services
		}
		errorObj.opstatus = kony.sdk.errorcodes.invalid_user_app_services
		errorObj.message = message;
	} else {
		errorObj.opstatus = kony.sdk.errorcodes.default_code
		errorObj.message = errMessagePrefix + kony.sdk.errormessages.default_message
	}
	return errorObj;
}

function getAuthErrorMessage(mfcode) {
		kony.sdk.logsdk.trace("Entering into getAuthErrorMessage");
	if (mfcode === "Auth-4") {
		return kony.sdk.errormessages.invalid_user_credentials
	} else if (mfcode === "Auth-9") {
		return kony.sdk.errormessages.invalid_app_credentials
	} else if (mfcode === "Auth-3") {
		return kony.sdk.errormessages.invalid_user_app_credentials
	} else if ((mfcode === "Auth-5") || (mfcode === "Auth-6") || (mfcode === "Gateway-31") || (mfcode === "Gateway-33") || (mfcode === "Gateway-35") || (mfcode === "Gateway-36") || (mfcode === "Auth-46") || (mfcode === "Auth-55")) {
		return kony.sdk.errormessages.invalid_session_or_token_expiry
	} else if (mfcode === "Auth-7" || mfcode === "Auth-27") {
		return kony.sdk.errormessages.invalid_user_app_services
	} else {
		return mfcode + ":" + kony.sdk.errormessages.default_message
	}
}

kony.sdk.error.getObjectServiceErrObj = function(errResponse) {
		kony.sdk.logsdk.trace("Entering into kony.sdk.error.getObjectServiceErrObj");
	try {
		var mfcode = errResponse["mfcode"];
		var message = errResponse["errmsg"];
		var details = errResponse["mferrmsg"];
		var service = errResponse["service"];
		if (!service) {
			service = "";
		}
		if (!details) {
			details = "";
		}
		var errorMessagePrefixForIntegration = "";
		if (service) {
			errorMessagePrefixForIntegration = "Object Service Request Failed for " + service + ":";
		} else {
			errorMessagePrefixForIntegration = "Object Service Request Failed:";
		}
		
		if (mfcode) {
			return kony.sdk.error.getMFcodeErrObj(mfcode, message, details, errorMessagePrefixForIntegration);
		}
		return errResponse;
	} catch (err) {
		return errResponse;
	}
}

kony.sdk.error.getClientErrObj = function(errCode,errMsg){
		kony.sdk.logsdk.trace("Entering into kony.sdk.error.getClientErrObj");
	var errObj = new Object();
	errObj.opstatus = kony.sdk.errorcodes.clientvalidation_error_opstatus;
	errObj.errmsg = errMsg;
	errObj.errcode = errCode;
	return errObj;
}

kony.sdk.error.getMessagingError = function(errMsg){
		kony.sdk.logsdk.trace("Entering into kony.sdk.error.getMessagingError");
    var errObj = new Object();
    errObj.opstatus = kony.sdk.errorcodes.messaging_service_fail;
    errObj.errmsg = kony.sdk.errormessages.messaging_service_fail + errMsg;
    errObj.errcode = kony.sdk.errorcodes.messaging_service_fail;
    return errObj;
}

kony.sdk.error.getConfigServiceErrObject = function(errResponse) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.error.getConfigServiceErrObject");
    try {
        var mfcode = errResponse["mfcode"];
        var message = errResponse["errmsg"];
        var details = errResponse["mferrmsg"];
        var service = errResponse["service"];
        if (!service) {
            service = "";
        }
        if (!details) {
            details = "";
        }
        var errorMessagePrefixForIntegration = "";
        if (service) {
            errorMessagePrefixForIntegration = "Configuration Service Request Failed for " + service + ":";
        } else {
            errorMessagePrefixForIntegration = "Configuration Service Request Failed:";
        }

        if (mfcode) {
            return kony.sdk.error.getMFcodeErrObj(mfcode, message, details, errorMessagePrefixForIntegration);
        }
        return errResponse;
    } catch (err) {
        return errResponse;
    }
};

kony.sdk.error.getIntegrityErrorMessage = function (httpRequest,url) {
	kony.sdk.logsdk.trace("Entering into kony.sdk.error.getIntegrityErrorMessage");
    var errorMessage={};
    errorMessage.httpresponse = {};
    errorMessage["opstatus"]=kony.sdk.errorcodes.integrity_check_failed;
    errorMessage["errmsg"]= kony.sdk.errormessages.integrity_check_failed;
    errorMessage["errcode"]=kony.sdk.errorcodes.integrity_check_failed;
    errorMessage["httpStatusCode"] = httpRequest.status.toString();
    errorMessage.httpresponse["response"]= httpRequest.response;
    errorMessage.httpresponse.headers = httpRequest.getAllResponseHeaders();
    errorMessage.httpresponse.url = url;
    errorMessage.httpresponse.responsecode = httpRequest.status.toString();
    return errorMessage;
};

kony.sdk.error.getOperationFailedErrorMessage = function(httpRequest,url){
    kony.sdk.logsdk.trace("Entering into kony.sdk.error.getOperationFailedErrorMessage");
    var errorMessage = {};
    errorMessage["opstatus"]=httpRequest.response.opstatus;
    errorMessage["errmsg"]= kony.sdk.errormessages.server_operation_failed;
    errorMessage["errcode"]=kony.sdk.errorcodes.server_operation_failed;
    errorMessage["httpStatusCode"] = httpRequest.status.toString();
    var httpResponse = {};
    httpResponse.response = httpRequest.response;
    httpResponse.headers = httpRequest.getAllResponseHeaders();
    httpResponse.responsecode = httpRequest.status.toString();
    httpResponse.url = url;
    errorMessage.httpResponse = httpResponse;
	return errorMessage;
};
if (typeof(kony.sdk) === "undefined") {
	kony.sdk = {};
}

if (typeof(kony.sdk.errorcodes) === "undefined") {
	kony.sdk.errorcodes = {};
}

if (typeof(kony.sdk.errormessages) === "undefined") {
	kony.sdk.errormessages = {};
}

kony.sdk.errorcodes.invalid_user_credentials = 101;
kony.sdk.errormessages.invalid_user_credentials = "Invalid User Credentials.";

kony.sdk.errorcodes.invalid_app_credentials = 102;
kony.sdk.errormessages.invalid_app_credentials = "Invalid App Credentials.";

kony.sdk.errorcodes.invalid_user_app_credentials = 103;
kony.sdk.errormessages.invalid_user_app_credentials = "Invalid User/App Credentials.";

kony.sdk.errorcodes.invalid_session_or_token_expiry = 104;
kony.sdk.errormessages.invalid_session_or_token_expiry = "Session/Token got invalidated in the backend.Please login.";

kony.sdk.errorcodes.invalid_user_app_services = 105;
kony.sdk.errormessages.invalid_user_app_services = "Invalid provider in appServices.";

kony.sdk.errorcodes.cliams_token_null = 106;
kony.sdk.errormessages.cliams_token_null = "Claims Token is Unavialable";

kony.sdk.errorcodes.identity_session_inactive= 107;
kony.sdk.errormessages.identity_session_inactive = "Identity Provider's sessions is not active. Please login";

kony.sdk.errorcodes.default_code = 100;
kony.sdk.errormessages.default_message = "UnhandledMFcode";

kony.sdk.errorcodes.unknown_error_code = 1000;
kony.sdk.errormessages.unknown_error_message = "An unknown error has occured";

kony.sdk.errorcodes.connectivity_error_code = 1011;
kony.sdk.errormessages.connectivity_error_message = "An error occurred while making the request. Please check device connectivity, server url and request parameters";

kony.sdk.errorcodes.invalid_json_code = 1013;
kony.sdk.errormessages.invalid_json_message = "Invalid Json response was returned";

kony.sdk.errorcodes.request_timed_out_code = 1014;
kony.sdk.errormessages.request_timed_out_message = "Request to server has timed out";

kony.sdk.errorcodes.offline_auth_failed = 1015;
kony.sdk.errormessages.offline_auth_failed = "Offline Authentication failed, User should atleast login once when network connectivity is available.";

kony.sdk.errorcodes.servicedoc_unavailable= 1016;
kony.sdk.errormessages.servicedoc_unavailable = "MBAAS app is not initialized properly. Service document is unavailable.";

kony.sdk.errorcodes.transient_login_fail= 1017;
kony.sdk.errormessages.transient_login_fail= "Transient Login failed, Previous Identity Token expired in backend.";

kony.sdk.errorcodes.messaging_service_fail= 1018;
kony.sdk.errormessages.messaging_service_fail= "Failure in Messaging Service. ";

kony.sdk.errorcodes.integrity_check_failed= 1019;
kony.sdk.errormessages.integrity_check_failed= "Http message Body Integrity Check failed.";

kony.sdk.errorcodes.server_operation_failed = 1020;
kony.sdk.errormessages.server_operation_failed = "Operation Failed on server";

kony.sdk.errorcodes.clientvalidation_error_opstatus = 112233;

//Object Service Error Messages
kony.sdk.errorcodes.invalid_dataobject_instance = 90001;
kony.sdk.errormessages.invalid_dataobject_instance = "Provided dataobject is invalid and should be instance of kony.sdk.dto.DataObject";

kony.sdk.errorcodes.primarykey_unavailable = 90002;
kony.sdk.errormessages.primarykey_unavailable = "Primary Keys missing, Operation Failed";

kony.sdk.errorcodes.null_or_undefined = 90003;
kony.sdk.errormessages.null_or_undefined = " cannot be null or undefined";

kony.sdk.errorcodes.transaction_failed = 90004;
kony.sdk.errormessages.transaction_failed = "Some error occurred, Operation Failed";

kony.sdk.errorcodes.norecords_to_delete = 90005;
kony.sdk.errormessages.norecords_to_delete = "No records deleted with the specified criteria";

kony.sdk.errorcodes.invalid_queryparams_instance = 90006;
kony.sdk.errormessages.invalid_queryparams_instance = "Provided queryParams is invalid and should be a json object";

kony.sdk.errorcodes.invalid_object = 90008;
kony.sdk.errormessages.invalid_object = "Invalid object name, Operation Failed.";

kony.sdk.errorcodes.invalid_blob = 90009;
kony.sdk.errormessages.invalid_blob = "Failed to read from binary file, either the file does not exist or invalid";
/**
 * Method to create the Identity service instance with the provided provider name.
 * @param {string} providerName - Name of the provider
 * @returns {IdentityService} Identity service instance
 */

kony.sdk.offline = kony.sdk.offline || {};
kony.sdk.sso = kony.sdk.sso || {};
kony.sdk.isSSOLoginSuccess = kony.sdk.isSSOLoginSuccess || true;
 
kony.sdk.prototype.getIdentityService = function(providerName) {
	kony.sdk.logsdk.trace("Entering kony.sdk.prototype.getIdentityService")
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	var provider = null;
	if (providerName) {
		if (this.login != null) {
			for (var i = 0; i < this.login.length; i++) {
				var rec = this.login[i];
				if ((rec.alias && rec.alias.toUpperCase() === providerName.toUpperCase()) || (rec.prov.toUpperCase() === providerName.toUpperCase())) {
					provider = new IdentityService(this, rec);
					break;
				}

			}
			if (provider === null) {
				throw new Exception(Errors.AUTH_FAILURE, "Invalid providerName");
			}
			//TODO: what if the providerName is not passed by the user? 
            kony.sdk.logsdk.debug("### auth:: returning authService for providerName = " + provider.getProviderName());
			return provider;
		}
	} else {
		throw new Exception(Errors.AUTH_FAILURE, "Invalid providerName");
	}
};
/**
 * Should not be called by the developer.
 * @class
 * @classdesc Identity service instance for handling login/logout calls.
 */
function IdentityService(konyRef, rec) {
	kony.sdk.logsdk.trace("Entering IdentityService")
	var networkProvider = new konyNetworkProvider();
	var serviceObj = rec;
	konyRef.rec = rec;
	var mainRef = konyRef.mainRef;
	var user_attributes={};
	var offlineEnabled = false;
	var persistToken = false;
	if (serviceObj === undefined || serviceObj.prov == undefined || serviceObj.type == undefined) {
		throw new Exception(Errors.INIT_FAILURE, "Invalid service url and service type");
	}

	var _type = serviceObj.type;
	var _serviceUrl = stripTrailingCharacter(serviceObj.url, "/");
	var _providerName = serviceObj.prov;

    kony.sdk.logsdk.debug("### AuthService:: initialized for provider " + _providerName + " with type " + _type);

    function isLoggedIn() {
        if (kony.sdk.getCurrentInstance() &&
            kony.sdk.getCurrentInstance().tokens &&
            kony.sdk.getCurrentInstance().tokens.hasOwnProperty(_providerName) &&
            !kony.sdk.isNullOrUndefined(kony.sdk.getCurrentInstance().tokens[_providerName]) &&
            Object.keys(kony.sdk.getCurrentInstance().tokens[_providerName]).length !== 0) {
            return true;
        }
        return false;
    }

	var dsKey = _serviceUrl + "::" + _providerName + "::" + _type + "::RAW";

	function resetAllCurrentTokens(konyRef, _providerName) {
		kony.sdk.resetProviderKeys(konyRef, _providerName);
	}

	/**
	 * Login with the given credentials asynchronously and executes the given callback.
	 * @param {object} options - User name and password
	 * @param {function} successCallback  - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 */
	this.login = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering Login")
		var continueOnRefreshError = true;

        var reportingData = kony.sdk.getPayload(konyRef);
        var sessionId = null;

        if (kony.ds) {
            sessionId = kony.ds.read("konyUUID");
        }

        if(sessionId){
            reportingData.rsid = sessionId[0];
        }

        reportingData.svcid = "login_" + _providerName;

        if (!reportingData.rsid) {
            kony.sdk.logsdk.warn("### login:: rsid is either empty,null or undefined");
        }
        kony.sdk.logsdk.debug("### AuthService::login Invoked login for provider " + _providerName + " of type " + _type);
		if (typeof(options) == 'undefined') {
			throw new Exception(Errors.AUTH_FAILURE, "Missing required number of arguments to login function");
		}
        if(options && options["loginOptions"] && options["loginOptions"]["continueOnRefreshError"] === false){
            continueOnRefreshError  = false;
        }
        if(options && options["loginOptions"] && options["loginOptions"]["persistLoginResponse"] === true){
            persistToken  = true;
            kony.sdk.offline.persistToken = true;
        }
		if(options && options["loginOptions"])
		{
		    offlineEnabled = options["loginOptions"]["isOfflineEnabled"] || false;
			kony.sdk.offline.isOfflineEnabled = kony.sdk.offline.isOfflineEnabled || offlineEnabled;
			kony.sdk.sso.isSSOEnabled = options["loginOptions"]["isSSOEnabled"] || false;
		}
		else
		{
			kony.sdk.sso.isSSOEnabled = false;
		}
			
		function invokeAjaxCall(url, params, headers) {

			if (!headers) {
				headers = {};
			}
			if(!kony.sdk.isNullOrUndefined(konyRef.currentClaimToken) && (new Date().getTime() < konyRef.claimTokenExpiry)){
				headers["X-Kony-Authorization"] = konyRef.currentClaimToken;
			}
			headers["X-Kony-App-Key"] = mainRef.appKey;
			headers["X-Kony-App-Secret"] = mainRef.appSecret;
			headers["X-Kony-SDK-Type"] = kony.sdk.getSdkType();
			headers["X-Kony-SDK-Version"] = kony.sdk.version;
			headers["X-Kony-Platform-Type"] = kony.sdk.getPlatformName();
			headers["Accept"] = "application/json";

            populateHeaderWithFabricAppVersion(headers);

			if(konyRef.reportingheaders_allowed) {
                if (reportingData != null && reportingData != undefined) {
                    try {
                        headers["X-Kony-ReportingParams"] = encodeURI(JSON.stringify(reportingData))
                    } catch (error) {
                        kony.sdk.logsdk.error("### login::error while parsing metrics payload" + error);
                    }
                }
            }

			if(kony.sdk.sso.isSSOEnabled === true)
			{
				var ssotoken = kony.sdk.util.getSSOToken();
				if(ssotoken != null && ssotoken != "" && ssotoken != undefined){
					headers["Authorization"] = ssotoken;
				}
			}

			var endPointUrl = null;
			if (_type === "anonymous") {
				endPointUrl = _serviceUrl + url;
			} else {
				endPointUrl = _serviceUrl + url + "?provider=" + _providerName;
				params["provider"] = _providerName;
			}
			if(kony.sdk.getPlatformName() !== "windows") {
				//Save the user entered form data to a temporary store and only if login is successful, we store the value in this to proper credentials store.
				if (kony.sdk.getSdkType() === "js" && (_type === "basic" || (options && options["userid"] && options["password"])) && offlineEnabled === true) {
					kony.sdk.offline.saveTempUserCredentials(options);

					if (!kony.sdk.isNetworkAvailable()) {
						kony.sdk.offline.loginOffline(_providerName, function (cachedAuthResponse) {
                            kony.sdk.logsdk.info("successfully authenticated offline");
							processLoginSuccessResponse(cachedAuthResponse, konyRef, true, successCallback);
						}, function (error) {
                            kony.sdk.logsdk.error("offline authentication also failed");
							resetAllCurrentTokens(konyRef, _providerName);
							if (failureCallback) {
								failureCallback(kony.sdk.error.getAuthErrObj(error));
							}
						});
						return;
					}
				}
			}
			if (options && options["include_profile"]) {
			    params["include_profile"] = params["include_profile"] ? params["include_profile"] : options["include_profile"];
		    }
			var networkOptions = {};
			if(options && options["httpRequestOptions"] && options["httpRequestOptions"] instanceof Object){
				networkOptions["httpRequestOptions"] = options["httpRequestOptions"];
			}
			networkProvider.post(endPointUrl, params, headers,
				function(data) {
                    var response = processLoginSuccessResponse(data, konyRef, false);

                    function serviceDocCallback(){
                        kony.sdk.verifyAndCallClosure(successCallback, response);
                    }

                    getLatestServiceDocIfAvailable(data, serviceDocCallback);
				},
				function(data) {
					processLoginErrorResponse(data,konyRef,true,failureCallback) 
				},null, networkOptions);
		}

		function loginHelper(url,params,headers){
			kony.sdk.logsdk.trace("Entering loginHelper");
			if(!kony.sdk.isNullOrUndefined(konyRef.currentClaimToken) && !konyRef.isAnonymousProvider){
				kony.sdk.claimsRefresh(function(res){
					invokeAjaxCall(url,params,headers)
				},function(err){
					if(continueOnRefreshError ){
                        kony.sdk.logsdk.error("### AuthService::login claimsRefresh failed, performing force login");
						invokeAjaxCall(url,params,headers);
					}else{
                        kony.sdk.logsdk.error("### AuthService::login claimsRefresh failed, invoking failurecallback");
						err.message = kony.sdk.errormessages.transient_login_fail;
						err.opstatus = kony.sdk.errorcodes.transient_login_fail;
						kony.sdk.verifyAndCallClosure(failureCallback,err);
					}
				})
			}else{
                kony.sdk.logsdk.info("### AuthService::login Claims token unavailable, performing regular login");
				invokeAjaxCall(url,params,headers);
			}
		}

        /**
         * Login once the deeplink redirection is done. .
         * @param {map} options
         */
        function loginForDeeplink(options){
			kony.sdk.logsdk.trace("Entering loginForDeeplink")
            if (options){
                var code = options["code"];
                var urlType = options["urlType"];

                try {
                    kony.sdk.logsdk.debug("### AuthService::login received authorization code");
                    var headers = {};
                    if (urlType == "oauth2" || urlType == "saml") {
                        headers["Content-Type"] = "application/x-www-form-urlencoded"
                    }
                    loginHelper("/" + urlType + "/" + "token", {
                        code: code
                    }, headers);
                } catch (err) {
                    kony.sdk.logsdk.error("exception ::" + err);
                    failureCallback();
                }
            }
        }

		if (_type === "anonymous") {
			konyRef.isAnonymousProvider = true;
            kony.sdk.logsdk.info("### AuthService::login Adapter type is anonymous");
			loginHelper("/login", {}, {
				"Content-Type": "application/x-www-form-urlencoded"
			});
		} else if (_type == "basic") {
			var mandatory_fields = ["userid", "password"];
			if(kony.sdk.sso.isSSOEnabled === false)
			{
				if (serviceObj.mandatory_fields && kony.sdk.isArray(serviceObj.mandatory_fields)) {
					mandatory_fields = serviceObj.mandatory_fields;
				}
				for (var i = 0; i < mandatory_fields.length; ++i) {
					if (kony.sdk.isNullOrUndefined(options[mandatory_fields[i]])) {
						throw new Exception(Errors.AUTH_FAILURE, " Require " + mandatory_fields[i]);
					}
				}
			}
			var payload = {};
			var encryptedStorage = {};
			if(options!=null && options!=undefined)
			{
				for (var option in options) {
					payload[option] = options[option];
				}
			}
			payload["provider"] = _providerName;

            kony.sdk.logsdk.info("### AuthService::login Adapter type is basic");
			loginHelper("/login", payload, {
				"Content-Type": "application/x-www-form-urlencoded"
			});
		} else {
			if (options.userid && options.password) {
				var payload = {};
				for(var option in options){
					payload[option] = options[option];
				}
				payload["provider"] = _providerName;
				loginHelper("/login",payload);
			} else {
                kony.sdk.logsdk.debug("### AuthService::login Adapter type is " + _type);
				if(kony.sdk.isSSOLoginSuccess && kony.sdk.sso.isSSOEnabled == true && kony.sdk.util.getSSOToken()!=null && kony.sdk.util.getSSOToken()!="" && kony.sdk.util.getSSOToken()!=undefined) {
					if(_type === "oauth2"){
                        loginHelper("/oauth2/token", {}, {});
					}else{
						loginHelper("/login",{},{});
					}
				} else {
                    //To provide backward compatibility, if MF is an older it will not have the changes for blocking the popup or opening the login url in the native browser.
                    //Identity will add a new tuple in the service doc "identity_meta". SDK will validate the compatibility with the existance of serviceDoc["identity_meta"][<priovider_name>]["success_url"]
                    var isMFVersionCompatible = false;
                    var oauthOptions = {};
                    if (options &&
                        options["loginOptions"] &&
                        options["loginOptions"]["customQueryParamsForOAuth"] &&
                        options["loginOptions"]["customQueryParamsForOAuth"] instanceof Object) {
                        oauthOptions["customQueryParamsForOAuth"] = options["loginOptions"]["customQueryParamsForOAuth"];
                    }

                    if (mainRef &&
                        mainRef.config &&
                        mainRef.config.identity_meta &&
                        mainRef.config.identity_meta[_providerName] &&
                        mainRef.config.identity_meta[_providerName].success_url) {
                        isMFVersionCompatible = true;
                    }

                    if (kony.sdk.getSdkType() === "plain-js"){
                        //Case to handle plain-js OAuth flow.
                        // Popup needs to be blocked for oauth2 type & redirect to the url "success_url" if provided in query params else the default one declared in the MF application.
                        if (options && options["noPopup"]){
                            oauthOptions["noPopup"] = true
                        }

                        if (options && options["code"] && options["urlType"]){
                            //Validating the identity service once after deeplink is redirected. Params "code" & "urlType" are mandatory and are used to distinguish the request.
                            loginForDeeplink(options);
                        }else {
                            oauthOptions["appSecret"] = mainRef.appSecret;
                            oauthOptions["serviceDoc"] = mainRef.config;
                            if(options && options["include_profile"]){
                                oauthOptions["include_profile"] = options["include_profile"]
                            }
                            OAuthHandler(_serviceUrl, _providerName, mainRef.appKey, loginHelper, _type, oauthOptions, isMFVersionCompatible);
                        }
                    } else{
                        if(options && options["browserWidget"] && kony.type(options["browserWidget"]) === "kony.ui.Browser") {
                            //Case to handle OAuth for IDE
                            oauthOptions["browserWidget"] = options["browserWidget"];
                        } else {
                            //Default case if param browserWidget and UseDeviceBrowser not present. We create one browser widget and open the url in it.
                            if (options && options["UseDeviceBrowser"]) {
                                //Validating to check the existence of param "UseDeviceBrowser".
                                // if found login url will be opened in device native broser, else in browser widget.
                                oauthOptions["UseDeviceBrowser"] = options["UseDeviceBrowser"];
                            }
                            if (options && options["success_url"]) {
                                //Validating to check the existence of param "success_url".
                                // if found after login success we will redirect to the url specified in param "success_url".
								//decoding and encoding, to handle the case where in the user himself is giving us the encoded value.
                                oauthOptions["success_url"] = encodeURIComponent(decodeURIComponent(options["success_url"]));
                            }
                        }
                        OAuthHandler(_serviceUrl, _providerName, mainRef.appKey, loginHelper, _type, oauthOptions, isMFVersionCompatible);
                    }
                }
			}
		}
	};

    /**
     * Tries to get persisted token from local store and update sdk.
     */
	this.usePersistedLogin = function(){
		kony.sdk.logsdk.trace("Entering usePersistedLogin");
		var stringifiedResponse = kony.sdk.offline.getUserAuthInformation("persistedAuthResponse");
		if(stringifiedResponse && kony.sdk.isJson(stringifiedResponse)){
			var persistedAuthResponse = JSON.parse(stringifiedResponse);

			// To support multilogin we are checking for the existence of provider name in profiles.
			if(persistedAuthResponse && persistedAuthResponse.profiles && persistedAuthResponse.profiles[_providerName]){
				konyRef.isAnonymousProvider = false;
				processMultipleProvidersResponse(persistedAuthResponse, _providerName);
				return true;
			}
		}
		return false;
	};

	var processMultipleProvidersResponse = function(data, providerName){

        if (data && data.profiles) {
        	konyRef.isAnonymousProvider = false;
            for (var provider in data.profiles) {
                if (!konyRef.tokens[provider]) {
                    konyRef.tokens[provider] = {};
                }
                konyRef.tokens[provider].profile = data.profiles[provider];
            }
        } else if (data && providerName && data.profile) {
            konyRef.isAnonymousProvider = false;
            konyRef.tokens[providerName].profile = data.profile;
        }


        if(data && data.provider_tokens){
            for(var provider in data.provider_tokens){
                if(!konyRef.tokens[provider]){
                    konyRef.tokens[provider] = {};
                }
                if(!konyRef.tokens[provider].provider_token){
                    konyRef.tokens[provider].provider_token = {}
                }
                konyRef.tokens[provider].provider_token.value = data.provider_tokens[provider];
            }
        }
		
		if(data && providerName && data.provider_token){
            konyRef.tokens[providerName].provider_token = data.provider_token;
        }


		konyRef.currentClaimToken = data.claims_token.value;
		konyRef.claimTokenExpiry = data.claims_token.exp;
		konyRef.currentRefreshToken = data.refresh_token;
	};

    var processLoginSuccessResponse = function(data,konyRef,isAsync,callBack){
		kony.sdk.logsdk.trace("Entering processLoginSuccessResponse");
        data = kony.sdk.formatSuccessResponse(data);
		if(_type !== "anonymous" &&!konyRef.tokens[_providerName]){
			konyRef.tokens[_providerName] = {};
		}
        kony.sdk.logsdk.info("### AuthService::login successful. Retrieved Data::");
		processMultipleProvidersResponse(data, _providerName);
        kony.sdk.logsdk.info("### AuthService::login extracted token. Calling success callback");

		if(kony.sdk.sso.isSSOEnabled === true)
		{	
			if(data.sso_token) {
				var isSSOSaved = kony.sdk.util.saveSSOToken(data.sso_token);
				if (isSSOSaved === true){
					kony.sdk.isSSOLoginSuccess = true;
                    kony.sdk.logsdk.info("### SSOLoginService::SSOToken being saved successfully.");
				} else {
                    kony.sdk.logsdk.info("### SSOLoginService::Failed to save SSOToken.This might result in failure of corresponding sso Logins. Please check the configuration params");
				}
			}else{
                kony.sdk.logsdk.info("### SSOLoginService::Unable to fetch sso token.");
			}
		}
		
		if (data.profile && data.profile!=undefined && data.profile.user_attributes!=undefined) {
			user_attributes = data.profile.user_attributes;
		}
		if (konyRef.overrideUserIdFlag && data.profile) {
			kony.sdk.overrideUserId(data.profile.userid);
		}

		if(kony.sdk.getPlatformName() !== "windows" && kony.sdk.getSdkType() === "js") {
			//We store the user credentials and the success auth response only on successful online login.
			if (kony.sdk.offline.isOfflineEnabled === true) {
                if (kony.sdk.isNetworkAvailable() && offlineEnabled && _type === "basic") {
                    kony.sdk.offline.updateSuccessUserCredentials(_providerName);
                }
                kony.sdk.offline.saveUserAuthInformation("authResponse", data);
			}

			if (persistToken || kony.sdk.offline.persistToken) {
				kony.sdk.offline.saveUserAuthInformation("persistedAuthResponse", data);
			}
		}

		kony.logger.setClaimsToken();
		if(!isAsync){
			return {};
		}
		else if(callBack){
			kony.sdk.verifyAndCallClosure(callBack, {});
		}
    };

    var processLoginErrorResponse = function(data,konyRef,isAsync,callBack){
		kony.sdk.logsdk.trace("Entering processLoginErrorResponse");
        kony.sdk.logsdk.info("### AuthService::login Calling failure callback");

		/*resetting all the token in case of error */
		resetAllCurrentTokens(konyRef, _providerName);
		if(kony.sdk.sso.isSSOEnabled === true){
			if(data.mfcode=="Auth-55"){
				kony.sdk.util.deleteSSOToken();
			}
			kony.sdk.isSSOLoginSuccess = false;
		}
		if(!isAsync){
			return kony.sdk.error.getAuthErrObj(data);
		}
		else if(callBack){
			callBack(kony.sdk.error.getAuthErrObj(data));
		}
    };
    
	/**
	 * Login anonymous with the given credentials synchronously and executes the given callback.
	 * @param {object} options - User name and password
	 */
    this.anonymousLoginSync = function(options) {
		kony.sdk.logsdk.trace("Entering anonymousLoginSync");
		konyRef.isAnonymousProvider = false;

        var reportingData = kony.sdk.getPayload(konyRef);
        var sessionId = null;

        if (kony.ds) {
            sessionId = kony.ds.read("konyUUID");
        }

        if(sessionId){
            reportingData.rsid = sessionId[0];
        }

        reportingData.svcid = "login_" + _providerName;

        if (!reportingData.rsid) {
            kony.sdk.logsdk.warn("### anonymousLoginSync:: rsid is either empty,null or undefined");
        }

        kony.sdk.logsdk.debug("### AuthService::login Invoked login for provider " + _providerName + " of type " + _type);
		if (typeof(options) == 'undefined') {
			throw new Exception(Errors.AUTH_FAILURE, "Missing required number of arguments to login function");
		}

		function invokeAjaxCall(url, params, headers) {

			if (!headers) {
				headers = {};
			}
			headers["X-Kony-App-Key"] = mainRef.appKey;
			headers["X-Kony-App-Secret"] = mainRef.appSecret;
			headers["Accept"] = "application/json";

			if(konyRef.reportingheaders_allowed) {
                if (reportingData != null && reportingData != undefined) {
                    try {
                        headers["X-Kony-ReportingParams"] = encodeURI(JSON.stringify(reportingData))
                    } catch (error) {
                        kony.sdk.logsdk.error("### anonymousLoginSync::error while parsing metrics payload" + error);
                    }
                }
            }

			var endPointUrl = null;
			if (_type === "anonymous") {
				endPointUrl = _serviceUrl + url;
			} else {
				endPointUrl = _serviceUrl + url + "?provider=" + _providerName;
				params["provider"] = _providerName;
			}

			var data = networkProvider.postSync(endPointUrl, params, headers);
			if(data.opstatus == 0){
               return processLoginSuccessResponse(data,konyRef,false);
			}
			else{
			   return processLoginErrorResponse(data,konyRef,false);
			}
		}
        konyRef.isAnonymousProvider = true;
        kony.sdk.logsdk.info("### AuthService::login Adapter type is anonymous");
		return invokeAjaxCall("/login", {}, {
			"Content-Type": "application/x-www-form-urlencoded"
		}); 
	};

	/**
	 * Logout and executes the given callback.
	 * @param {function} successCallback  - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 * @param {object} options - additional options for logout
	 */
	this.logout = function(successCallback, failureCallback, options) {
kony.sdk.logsdk.trace("Entering logout");
		function logoutHandler() {
			_logout(successCallback, failureCallback, options);
		}
		if(kony.sdk.getPlatformName() !== "windows") {
			//if the user logged in using offline logout
			if (offlineEnabled == true && kony.sdk.getSdkType() === "js" && _type === "basic" && !kony.sdk.isNetworkAvailable()) {
				logoutHandler();
			} else {
				kony.sdk.claimsRefresh(logoutHandler, failureCallback);
			}
		}else{
			kony.sdk.claimsRefresh(logoutHandler, failureCallback);
		}
	};

	function _logout(successCallback, failureCallback, options) {
	    function invokeLogoutHelper(formData, invokeLogoutSuccess, invokeLogoutFailure){

            var claimsTokenValue = null;

            var reportingData = kony.sdk.getPayload(konyRef);
            var sessionId = null;

            if (kony.ds) {
                sessionId = kony.ds.read("konyUUID");
            }

            if(sessionId){
                reportingData.rsid = sessionId[0];
            }

            reportingData.svcid = "logout_" + _providerName;

            if (!reportingData.rsid) {
                kony.sdk.logsdk.warn("### _logout:: rsid is either empty,null or undefined");
            }

            if (!kony.sdk.isNullOrUndefined(konyRef.currentClaimToken)) {
                claimsTokenValue = konyRef.currentClaimToken;
            }
            formdata.provider = _providerName;
            var url = "";

            if(_type == "oauth2" && kony.sdk.getSdkType() == "js"){
                url = _serviceUrl + "/oauth2/logout?provider=" + _providerName;
            }else{
                url = _serviceUrl + "/logout?provider=" + _providerName;
            }

            var headers = {};
            headers["X-Kony-Authorization"] = claimsTokenValue;
            headers["Accept"] = "*/*";
            headers["Content-Type"] =  "application/x-www-form-urlencoded";

            if(konyRef.reportingheaders_allowed) {
                if (reportingData != null && reportingData != undefined) {
                    try {
                        headers["X-Kony-ReportingParams"] = encodeURI(JSON.stringify(reportingData))
                    } catch (error) {
                        kony.sdk.logsdk.error("### login::error while parsing metrics payload" + error);
                    }
                }
            }

            networkProvider.post(url, formdata, headers,
            function(data) {
                kony.sdk.logsdk.info("AuthService::logout successfully logged out. Calling success callback");
                logoutSuccess(data);
            },
            function(err) {
                kony.sdk.logsdk.error("### AuthService::logout logged out Failed. Calling failure callback");
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(err));
            });

        }

		function logoutSuccess(data) {
			kony.sdk.logsdk.trace("Entering logoutSuccess");
			data = kony.sdk.formatSuccessResponse(data);
			delete konyRef.tokens[_providerName];

			//reset all current keys
			kony.sdk.resetCurrentKeys(konyRef,_providerName);

			//processing multiple profiles
			if(data && data.claims_token) {
				processMultipleProvidersResponse(data);
				konyRef.isAnonymousProvider = false;
			}
			if(offlineEnabled){
                kony.sdk.offline.isOfflineEnabled = false;
                kony.sdk.offline.removeUserAuthInformation();
                kony.sdk.offline.removeUserCredentials(_providerName);
			}

			if(persistToken){
                kony.sdk.offline.removePersistedUserAuthInformation();
                kony.sdk.offline.persistToken = false;
			}

			if(slo != false && kony.sdk.sso.isSSOEnabled == true){
				kony.sdk.util.deleteSSOToken();
			}
			kony.sdk.verifyAndCallClosure(successCallback, {});
		}

        kony.sdk.logsdk.debug("### AuthService::logout invoked on provider " + _providerName + " of type " + _type);
		var slo = false;
		if(!kony.sdk.isNullOrUndefined(options) && (options["slo"] === true || options["slo"] === false)) {
			slo = options["slo"];
		}
        var formdata = {};
        formdata = {"slo": slo};

		if(!isLoggedIn()){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getIdentitySessionInactiveErrObj());
		}
		else if(_type == "oauth2" && kony.sdk.getSdkType() == "js"){
            var callback_invoke = true;
            var oauth_status;

            function oAuthCallback(status){
                oauth_status = status;
				//Workaround to get around redirects
                if(callback_invoke) {
                    callback_invoke = false;
                    kony.timer.schedule("oAuthCallbackHandle", function() {
						if (oauth_status)
						    invokeLogoutHelper(formdata,logoutSuccess,failureCallback);
						else
							kony.sdk.verifyAndCallClosure(failureCallback,{});
					}, 3, false);
                }
            }
			var oauthOptions = {};
			oauthOptions["logout"] = true;
			oauthOptions["slo"] = slo;
			if(options && options["browserWidget"] && kony.type(options["browserWidget"]) === "kony.ui.Browser") {
				oauthOptions["browserWidget"] = options["browserWidget"];
			}
            OAuthHandler(_serviceUrl, _providerName, mainRef.appKey, oAuthCallback, _type, oauthOptions);
        }else {
            if(kony.sdk.getPlatformName() !== "windows") {
				//if the user logged in using offline login
				if (kony.sdk.offline.isOfflineEnabled == true && kony.sdk.getSdkType() === "js" && _type === "basic" && !kony.sdk.isNetworkAvailable()) {
                    kony.sdk.logsdk.info("AuthService::offline logout successfully logged out. Calling success callback");
					logoutSuccess();
					return;
				}
			}

			invokeLogoutHelper(formdata,logoutSuccess, failureCallback);
        }
	}

	/**
	 * Fetch the backend datasource token.
	 * @param {boolean} fromserver - Flag to force fetch from server only.
	 * @param {object} options - Options
	 * @param {function} successCallback  - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 */
	this.getBackendToken = function(fromserver, options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering getBackendToken");
		function _claimsRefreshSuccess(token){
			kony.sdk.logsdk.trace("Entering _claimsRefreshSuccess with valid token");
            processMultipleProvidersResponse(token);
            //konyRef.currentBackEndToken = token.provider_token;
            //if offline login enabled then updating the backend token in the store
            if(kony.sdk.getPlatformName() !== "windows" && kony.sdk.getSdkType() === "js") {
                if (kony.sdk.offline.isOfflineEnabled && kony.sdk.offline.isOfflineEnabled == true) {
                    kony.sdk.offline.updateAuthToken(token);
                }

				if (persistToken || kony.sdk.offline.persistToken) {
					kony.sdk.offline.updatePersistedToken("persistedAuthResponse", data);
				}
            }

            kony.sdk.verifyAndCallClosure(successCallback,konyRef.tokens[_providerName].provider_token);
		}

		function _claimsRefreshFailure(error){
			kony.sdk.logsdk.trace("Entering _claimsRefreshFailure");
            kony.sdk.logsdk.info("### AuthService::getBackendToken fetching refresh failed. Calling failure callback");
            // konyRef.tokens[_providerName] = null;
            // konyRef.currentBackEndToken = null;
            kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(error));
		}

        kony.sdk.logsdk.debug("### AuthService::getBackendToken called for provider " + _providerName + " of type " + _type);
		if(!isLoggedIn()){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getIdentitySessionInactiveErrObj());
		}
		var claimsOptions = null;
		if(options && options.refresh && options.refresh === true){
            claimsOptions = {
				"requestParams": {
					"refresh": "true"
				}
			};
		}

		if (fromserver != undefined && fromserver === true) {
            kony.sdk.logsdk.info("### AuthService::getBackendToken fromserver is enabled. Trying to login");
			_claimsRefresh(claimsOptions, _claimsRefreshSuccess, _claimsRefreshFailure);
		} else {
			if (konyRef.tokens[_providerName]) {
				var val = konyRef.tokens[_providerName];
				var _exp = val.provider_token.exp;
                kony.sdk.logsdk.debug("token expiry time: " + _exp);
                kony.sdk.logsdk.debug("Current time: " + (new Date().getTime()));
				if (_exp && _exp < (new Date().getTime())) {
                    kony.sdk.logsdk.info("### AuthService::getBackendToken Token expired. Fetching refresh from claims api");
					_claimsRefresh(claimsOptions, _claimsRefreshSuccess, _claimsRefreshFailure);
				} else {
                    kony.sdk.logsdk.info("### AuthService::getBackendToken present token is valid/doesn't have expiry time. Calling success callback");
					//konyRef.currentBackEndToken = val.provider_token;
					kony.sdk.verifyAndCallClosure(successCallback, konyRef.tokens[_providerName].provider_token);
				}
			} else {
                kony.sdk.logsdk.info("### AuthService::getBackendToken failed for find info for key " + dsKey + "in database. calling failure callback");
				kony.sdk.verifyAndCallClosure(failureCallback, null);
			}
		}
	};

	/**
	 * Get profile.
	 * @param {boolean} fromserver - Flag to force fetch from server only.
	 * @param {function} successCallback  - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 */
	this.getProfile = function(fromserver, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering getProfile");
		if(!isLoggedIn()){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getIdentitySessionInactiveErrObj());
		}
		else if (fromserver && fromserver == true) {
			profileRefresh(
				function(token) {
					konyRef.tokens[_providerName].profile = token;
					kony.sdk.verifyAndCallClosure(successCallback, token);
				},
				failureCallback)
		} else {
			if (konyRef.tokens[_providerName]) {
				var val = konyRef.tokens[_providerName];
				kony.sdk.verifyAndCallClosure(successCallback, val.profile);
			} else {
				kony.sdk.verifyAndCallClosure(failureCallback, null);
			}
		}
	};
	/**
	 * Get the provider name.
	 * @returns {string} Provider name.
	 */
	this.getProviderName = function() {
		return _providerName;
	};
	/**
	 * Get the provider type.
	 * @returns {string} Provider type.
	 */
	this.getProviderType = function() {
		return _type;
	};

	/**
	 * Get the generic session data type.
	 * @returns {string} session data.
	 */
	this.getUserData = function(successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering getUserData (Get the generic session data type)");
		if(!isLoggedIn()){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getIdentitySessionInactiveErrObj());
		}
		else {
			var userDataUrl = _serviceUrl + "/session/user_data";
            var options = {};
            options["invokedFrom"] = kony.sdk.GET_USER_DATA;
			getSessionData(userDataUrl, successCallback, failureCallback,options);
		}
	};

	/**
	 * Get the user attributes returned by a provider
	 * @returns {string} user attributes.
	 */
	this.getUserAttributes = function(successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering getUserAttributes");
		if(!isLoggedIn()){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getIdentitySessionInactiveErrObj());
		}
		else if(user_attributes && Object.keys(user_attributes).length === 0){
			var userAttributesUrl = _serviceUrl + "/session/user_attributes?provider=" + _providerName;
			var options = {};
			options["invokedFrom"] = kony.sdk.GET_USER_ATTRIBUTES;
			getSessionData(userAttributesUrl, function(res){
				user_attributes = res;
				kony.sdk.verifyAndCallClosure(successCallback,user_attributes);
			}, failureCallback,options);
		}else{
			if (konyRef.currentClaimToken === null) {
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getNullClaimsTokenErrObj());
			}else{ 
				kony.sdk.verifyAndCallClosure(successCallback,user_attributes );
			}
		}
	};

	/**
	 * Get the security attributes returned by a provider
	 * @returns {string} security attributes.
	 */
	this.getSecurityAttributes = function(successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering getSecurityAttributes");
		if(!isLoggedIn()){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getIdentitySessionInactiveErrObj());
		}
		else {
			var securityAttributesUrl = _serviceUrl + "/session/security_attributes?provider=" + _providerName;
            var options = {};
            options["invokedFrom"] = kony.sdk.GET_SECURITY_ATTRIBUTES;
			getSessionData(securityAttributesUrl, successCallback, failureCallback,options);
		}
	};

	/**
		utility method to get session data
		@private
	*/
	var getSessionData = function(sessionAttributesEndPointUrl, successCallback, failureCallback,options) {
        var reportingData = kony.sdk.getPayload(konyRef);
        var sessionId = null;

        if (kony.ds) {
            sessionId = kony.ds.read("konyUUID");
        }

        if(sessionId){
            reportingData.rsid = sessionId[0];
        }

        if(options["invokedFrom"] == kony.sdk.GET_USER_ATTRIBUTES){
            reportingData.svcid = kony.sdk.GET_USER_ATTRIBUTES;
		} else if(options["invokedFrom"] == kony.sdk.GET_SECURITY_ATTRIBUTES){
        	reportingData.svcid = kony.sdk.GET_SECURITY_ATTRIBUTES;
		} else{
            reportingData.svcid = kony.sdk.GET_USER_DATA;
		}




        if (!reportingData.rsid) {
            kony.sdk.logsdk.warn("### getsessiondata:: rsid is either empty,null or undefined");
        }

		if (konyRef.currentClaimToken === null) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getNullClaimsTokenErrObj());
		}
		else{
            var headers = {};
            headers["Authorization"] = konyRef.currentClaimToken;

            if(konyRef.reportingheaders_allowed) {
                if (reportingData != null && reportingData != undefined) {
                    try {
                        headers["X-Kony-ReportingParams"] = encodeURI(JSON.stringify(reportingData))
                    } catch (error) {
                        kony.sdk.logsdk.error("### getSessionData::error while parsing metrics payload" + error);
                    }
                }
            }

            populateHeaderWithFabricAppVersion(headers);

			networkProvider.get(sessionAttributesEndPointUrl, {}, headers,
				function(data) {
				    data = kony.sdk.formatSuccessResponse(data);
					kony.sdk.verifyAndCallClosure(successCallback, data);
				},
				function(err) {
					kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getAuthErrObj(err));
				});
		}
	};



	/**
	 * Method to refresh the claims token.
	 * @private
	 */
	var _claimsRefresh = function(options, success, failure) {
        kony.sdk.logsdk.debug("### AuthService::_claimsRefresh fetching claims from server for provider " + _providerName);
		var refreshToken = null;

        var reportingData = kony.sdk.getPayload(konyRef);
        var sessionId = null;

        if (kony.ds) {
            sessionId = kony.ds.read("konyUUID");
        }

        if(sessionId){
            reportingData.rsid = sessionId[0];
        }

        reportingData.svcid = kony.sdk.GET_BACKEND_TOKEN;

        if (!reportingData.rsid) {
            kony.sdk.logsdk.warn("### _claimsRefresh:: rsid is either empty,null or undefined");
        }

		if (!kony.sdk.isNullOrUndefined(konyRef.currentRefreshToken)) {
			refreshToken = konyRef.currentRefreshToken;
		}

		var _url = _serviceUrl + "/claims";
		if (options && options.requestParams != null) {
			_url = _url + "?";
			for (var i in options.requestParams) {
				if (options.requestParams.hasOwnProperty(i) && typeof(i) !== 'function') {
					_url = _url + (i + "=" + options.requestParams[i] + "&");
				}
			}
			_url = stripTrailingCharacter(_url, "&");
		}
		if (refreshToken) {
            kony.sdk.logsdk.info("### AuthService::_claimsRefresh making POST request to claims endpoint");
            var headers = {};
            headers["Authorization"] = refreshToken;
            headers["Content-Type"] = "application/x-www-form-urlencoded";

            if(konyRef.reportingheaders_allowed) {
                if (reportingData != null && reportingData != undefined) {
                    try {
                        headers["X-Kony-ReportingParams"] = encodeURI(JSON.stringify(reportingData))
                    } catch (error) {
                        kony.sdk.logsdk.error("### _claimsRefresh::error while parsing metrics payload" + error);
                    }
                }
            }

            populateHeaderWithFabricAppVersion(headers);

			networkProvider.post(_url, {}, headers,
				function(data) {
					data = kony.sdk.formatSuccessResponse(data);
                    kony.sdk.logsdk.info("### AuthService::_claimsRefresh Fetching claims succcessfull");
					processMultipleProvidersResponse(data);
                    kony.sdk.logsdk.info("### AuthService::_claimsRefresh saved locally. Calling success callback");
					kony.sdk.verifyAndCallClosure(success, data);
				},
				function(xhr, status, err) {
                    kony.sdk.logsdk.error("### AuthService::_claimsRefresh fetching claims failed. Calling failure callback");
					kony.sdk.verifyAndCallClosure(failure, kony.sdk.error.getAuthErrObj(err));
				});
		} else {
            kony.sdk.logsdk.info("### AuthService::_claimsRefresh no refreshtoken found. calling failure callback");
			kony.sdk.verifyAndCallClosure(failure, kony.sdk.error.getNullRefreshTokenErrObj());
		}
	};

	var profileRefresh = function(success, failure) {
		kony.sdk.logsdk.trace("Entering profileRefresh");
        kony.sdk.logsdk.debug("### AuthService::profileRefresh fetching profile from server for provider " + _providerName);

        var reportingData = kony.sdk.getPayload(konyRef);
        var sessionId = null;

        if (kony.ds) {
            sessionId = kony.ds.read("konyUUID");
        }

        if(sessionId){
            reportingData.rsid = sessionId[0];
        }

        reportingData.svcid = kony.sdk.GET_PROFILE;

        if (!reportingData.rsid) {
            kony.sdk.logsdk.warn("### profileRefresh:: rsid is either empty,null or undefined");
        }

		var refreshToken = null;
		if (!kony.sdk.isNullOrUndefined(konyRef.currentRefreshToken)) {
			refreshToken = konyRef.currentRefreshToken;
		}

		var _url = _serviceUrl + "/profile?provider=" + _providerName;
		if (refreshToken) {
            kony.sdk.logsdk.info("### AuthService::profileRefresh making POST request to profile endpoint");
            var headers = {};
            headers["Authorization"] = refreshToken;
            headers["Content-Type"] = "application/x-www-form-urlencoded";

            if(konyRef.reportingheaders_allowed) {
                if (reportingData != null && reportingData != undefined) {
                    try {
                        headers["X-Kony-ReportingParams"] = encodeURI(JSON.stringify(reportingData))
                    } catch (error) {
                        kony.sdk.logsdk.error("### profileRefresh::error while parsing metrics payload" + error);
                    }
                }
            }

            populateHeaderWithFabricAppVersion(headers);

			networkProvider.get(_url, null, headers,
				function(data) {
					data = kony.sdk.formatSuccessResponse(data);
					konyRef.tokens[_providerName].profile = data;
                    kony.sdk.logsdk.info("### AuthService::profileRefresh Fetching profile succcessfull, Calling success callback");
					kony.sdk.verifyAndCallClosure(success, data);
				},
				function(xhr, status, err) {
                    kony.sdk.logsdk.error("### AuthService::profileRefresh fetching profile failed. Calling failure callback");
					kony.sdk.verifyAndCallClosure(failure, kony.sdk.error.getAuthErrObj(err));
				});
		} else {
            kony.sdk.logsdk.info("### AuthService::profileRefresh no refreshtoken found. calling failure callback");
			kony.sdk.verifyAndCallClosure(failure, kony.sdk.error.getNullRefreshTokenErrObj());
		}
	};
}

function konySdkLogger()
{

this.INDIRECTIONLEVEL = 1;
this.trace = function(msg, params) {
    this.getInstance().trace(msg, params);
};
this.debug = function(msg, params) {
    this.getInstance().debug(msg, params);
};
this.info = function(msg, params) {
    this.getInstance().info(msg, params);
};
this.warn = function(msg, params) {
    this.getInstance().warn(msg, params);
};
this.error = function(msg, params) {
    this.getInstance().error(msg, params);
};
this.fatal = function(msg, params) {
    this.getInstance().fatal(msg, params);
};
this.loggerEngineInit = function() {
    KonySDKLoggerObj = kony.logger.createNewLogger(kony.sdk.LOGGER_NAME, null);
    KonySDKLoggerObj.setIndirectionLevel = this.INDIRECTIONLEVEL;
};
this.getInstance = function() {
    if (typeof(KonySDKLoggerObj) === 'undefined') this.loggerEngineInit();
    return KonySDKLoggerObj;
}
}
/**
 * Method to create the logic service instance with the provided service name.
 * @param {string} serviceName - Name of the service
 * @returns The url to connect to the logic service
 * @throws Exception if the serviceName or access is invalid.
 */
kony.sdk.prototype.getLogicService = function(serviceName) {

    if (!kony.sdk.isInitialized) {
        throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
    }

    

    if (this.logicsvc != null) {
        if (this.logicsvc[serviceName] != null) {
            kony.sdk.logsdk.debug("### getLogicService::found Logic service" + this.logicsvc[serviceName]);
            return new kony.sdk.LogicService(this, serviceName);
        }
    }
    throw new Exception(Errors.LOGIC_SERVICE_FAILURE, "Invalid serviceName:"+serviceName);
};
kony.sdk.LogicService = function(konyRef, serviceName){
    this.konyRef = konyRef;
    this.serviceName = serviceName;
    this.logicServiceUrl = null;
    

	this.getLogicServiceUrl = function(){
        if (this.logicServiceUrl == null) {
            this.logicServiceUrl = stripTrailingCharacter(konyRef.logicsvc[serviceName], "/");
        }
        return this.logicServiceUrl;
    };

    kony.sdk.logsdk.info(" ###LogicService Created & LogicService Url = " + this.getLogicServiceUrl());
	var networkProvider = new konyNetworkProvider();
    this.invokeOperation = function(serviceName, path, methodType, headers, data, successCallback, failureCallback, options) {
		function invokeOperationHandler() {
			_invokeOperation(serviceName, path, methodType, headers, data, true, successCallback, failureCallback, options);
		}
		kony.sdk.claimsRefresh(invokeOperationHandler, failureCallback);
	};
	function invokeOperationRetry(serviceName, path, methodType, headers, data, successCallback, failureCallback, options) {
		function invokeOperationRetryHandler() {
			_invokeOperation(serviceName, path, methodType, headers, data, false, successCallback, failureCallback, options);
		}
		kony.sdk.claimsAndProviderTokenRefresh(invokeOperationRetryHandler, failureCallback);
	}
	
	function retryServiceCall(errorResponse){
		if(errorResponse["mfcode"]){
				// check for the mf code for which,
				// retry should be done.
		} else {
			if(errorResponse["httpStatusCode"] && errorResponse["httpStatusCode"] === 401){
				return true;
			}
		}
	}
	
	function _invokeOperation(serviceName, path, methodType, headers, data, isRetryNeeded, successCallback, failureCallback, options) {

		var requestData = {};
		kony.sdk.logsdk.trace("Entered into _invokeOperation servicePath: " + serviceName + ", methodType: " + methodType + ", path" + path + ", isRetryNeeded: " + isRetryNeeded);
		var reportingData = kony.sdk.getPayload(konyRef);
		var sessionId = kony.ds.read("konyUUID");
		if(sessionId){
		  reportingData.rsid = sessionId[0];
		}
		if(!reportingData.rsid)
		{
			kony.sdk.logsdk.warn("rsid is either empty,null or undefined");
		}
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			requestData.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		for (var key in data) {
			requestData[key] = data[key];
		}
		reportingData.svcid = serviceName;
		var token;
		for (var i in konyRef.tokens) {
			if (konyRef.tokens.hasOwnProperty(i) && typeof(i) !== 'function') {
				token = konyRef.tokens[i];
				break;
			}
		}

		requestData["konyreportingparams"] = JSON.stringify(reportingData);
		var defaultHeaders = {
			"Content-Type": "application/x-www-form-urlencoded",
			"X-Kony-Authorization": konyRef.currentClaimToken
		};
		if(typeof(svcObj) === 'object' &&  svcObj.version){
			defaultHeaders["X-Kony-API-Version"] = svcObj.version;
		}

		// if the user has defined his own headers, use them
		if (headers) {
			for (var header in headers) {
				defaultHeaders[header] = headers[header];
			}
		}
		
		if (methodType == "GET")
		{
			networkProvider.get(konyRef.logicsvc[serviceName]+ path,
			requestData, defaultHeaders,
			function(res) {
				if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
				kony.sdk.verifyAndCallClosure(successCallback, res);
			},
			function(xhr, status, err) {
				if(isRetryNeeded === true && retryServiceCall(xhr) === true){
					invokeOperationRetry(serviceName, path, methodType, headers, data, successCallback, failureCallback, options);
					return;
				}
				kony.sdk.processLogicErrorResponse(xhr,true,failureCallback);
			}, null, options);
		}
		else if (methodType == "PUT")
		{
			networkProvider.put(konyRef.logicsvc[serviceName]+ path,
			requestData, defaultHeaders,
			function(res) {
				if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
				kony.sdk.verifyAndCallClosure(successCallback, res);
			},
			function(xhr, status, err) {
				if(isRetryNeeded === true && retryServiceCall(xhr) === true){
					invokeOperationRetry(serviceName, path, methodType, headers, data, successCallback, failureCallback, options);
					return;
				}
				kony.sdk.processLogicErrorResponse(xhr,true,failureCallback);
			}, null, options);
		}
		else if (methodType == "DELETE")
		{
			networkProvider.invokeDeleteRequest(konyRef.logicsvc[serviceName]+ path,
			requestData, defaultHeaders,
			function(res) {
				if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
				kony.sdk.verifyAndCallClosure(successCallback, res);
			},
			function(xhr, status, err) {
				if(isRetryNeeded === true && retryServiceCall(xhr) === true){
					invokeOperationRetry(serviceName, path, methodType, headers, data, successCallback, failureCallback, options);
					return;
				}
				kony.sdk.processLogicErrorResponse(xhr,true,failureCallback);
			}, null, options);
		}
		else{
		networkProvider.post(konyRef.logicsvc[serviceName]+ path,
			requestData, defaultHeaders,
			function(res) {
				if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
				kony.sdk.verifyAndCallClosure(successCallback, res);
			},
			function(xhr, status, err) {
				if(isRetryNeeded === true && retryServiceCall(xhr) === true){
					invokeOperationRetry(serviceName, path, methodType, headers, data, successCallback, failureCallback, options);
					return;
				}
				kony.sdk.processLogicErrorResponse(xhr,true,failureCallback);
			}, null, options);
		}
	}

	kony.sdk.processLogicErrorResponse = function(err,isAsync,callBack){
		if (kony.sdk.metric) {
			if (kony.sdk.metric.errorCodeMap[err.opstatus]) {
				kony.sdk.metric.saveInDS();
			}
		}
		if(err["mfcode"]){
			var konyRef = kony.sdk.getCurrentInstance();
			//clear the cache if the error code related to session/token expiry
			if (kony.sdk.isSessionOrTokenExpired(err["mfcode"])) {
				kony.sdk.logsdk.warn("###LogicService::invokeOperationFailure  Session/Token expired. Authenticate and Try again");
				//kony.sdk.resetCacheKeys(konyRef);
			}
		}
		if(!isAsync){
            return kony.sdk.error.getLogicErrObj(err);
		}
		else if(callBack){
		  kony.sdk.verifyAndCallClosure(callBack, kony.sdk.error.getLogicErrObj(err));
		}
	};

	//This is an internal api to invoke an service synchronously
   	this.invokeOperationSync = function(serviceName, path, headers, data) {
		var res=null;
		res = kony.sdk.claimsRefreshSync();
		if(res && res.message && res.message == "success")
		{
			return _invokeOperationSync(serviceName, path, headers, data);
		}
		else{
			return res;
		} 
	};

	function _invokeOperationSync(serviceName, path, headers, data) {
		var requestData = {};
		
		var konyRef = kony.sdk.getCurrentInstance();
		var reportingData = kony.sdk.getPayload(konyRef);
		var sessionId = kony.ds.read("konyUUID");
		if(sessionId){
		  reportingData.rsid = sessionId[0];
		}
		if(!reportingData.rsid)
		{
			kony.sdk.logsdk.warn("rsid is either empty,null or undefined");
		}
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			requestData.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		for (var key in data) {
			requestData[key] = data[key];
		}
		reportingData.svcid = serviceName;
		var token;
		for (var i in konyRef.tokens) {
			if (konyRef.tokens.hasOwnProperty(i) && typeof(i) !== 'function') {
				token = konyRef.tokens[i];
				break;
			}
		}

		requestData["konyreportingparams"] = JSON.stringify(reportingData);
		var defaultHeaders = {
			"Content-Type": "application/x-www-form-urlencoded",
			"X-Kony-Authorization": konyRef.currentClaimToken
		};

		if(typeof(svcObj) === 'object' &&  svcObj.version){
			defaultHeaders["X-Kony-API-Version"] = svcObj.version;
		}
		// if the user has defined his own headers, use them
		if (headers) {
			for (var header in headers) {
				defaultHeaders[header] = headers[header];
			}
		}
        var res = null;
		res = networkProvider.postSync(konyRef.logicsvc[serviceName]+ path,
			requestData, defaultHeaders);
     	if(res.opstatus == 0){
			if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
			return res;
		}
		else{
			return kony.sdk.processLogicErrorResponse(res,false);
		}
	}


};

kony.sdk.prototype.registerObjectService = function(objectServiceType, objectServiceClass) {
	kony.sdk.logsdk.trace("Entering kony.sdk.prototype.registerObjectService");
	kony.sdk.registeredobjsvcs = kony.sdk.registeredobjsvcs || {};
	kony.sdk.registeredobjsvcs[objectServiceType] = objectServiceClass;
};

/**
 * Method to create the object service instance with the provided service name.
 * @param {string} serviceName - Name of the service
 * @param {map} options - Map of key values like {"access":"offline"/"online"/"registered Object Service Name"}
 * @returns {@link kony.sdk.OnlineObjectService / @link kony.sdk.OfflineObjectService} Object service instance
 * @throws Exception if the serviceName or access is invalid.
 */
kony.sdk.prototype.getObjectService = function(serviceName, options) {
	kony.sdk.logsdk.trace("Entering kony.sdk.prototype.getObjectService");
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}

	var access;
	if (!kony.sdk.isNullOrUndefined(options)) {
		access = options["access"];
	}


	if (this.objectsvc != null && this.objectsvc[serviceName] != null) {
			kony.sdk.logsdk.debug("### getObjectService::found Object service" + this.objectsvc[serviceName]);
			if(kony.sdk.util.isNullOrEmptyString(access) || access.toLowerCase() === "online") {
				return new kony.sdk.OnlineObjectService(this, serviceName, this.objectsvc[serviceName]);
			} else if(access.toLowerCase() === "offline") {
				
				//This returns SyncV1 object service
				return new kony.sdk.OfflineObjectService(this, serviceName);
			}

	} else if(this.offlineObjectsvc != null) {
		if (this.offlineObjectsvc[serviceName] != null) {
			if(kony.sdk.util.isNullOrEmptyString(access) || access.toLowerCase() === "online") {

                // This returns Online Object Service Instance
                return new kony.sdk.OnlineObjectService(this, serviceName, this.offlineObjectsvc[serviceName]);
            } else if (access.toLowerCase() === "offline"){
				//This returns Offline Enabled or SyncV2 object service
				return new kony.sdk.OfflineEnabledObjectService(this, serviceName);
			}
		}
	}

	kony.sdk.registeredobjsvcs = kony.sdk.registeredobjsvcs || {};
	//verifying if the servicetype available in registeredservices if available initialize and return
	if (kony.sdk.registeredobjsvcs[access] != null && kony.sdk.registeredobjsvcs[access] != undefined) {
		return new kony.sdk.registeredobjsvcs[access](this, serviceName);
	}

	throw new Exception(Errors.OBJECT_FAILURE, "Invalid serviceName:"+ serviceName  + "or access type:" + access);

};

/**
 * Method which returns the offline enabled ObjectService object
 * @param konyRef
 * @param serviceName
 * @constructor
 */
kony.sdk.OfflineEnabledObjectService = function(konyRef, serviceName){

	this.serviceName = serviceName;
	this.konyRef = konyRef;
	
	/**
	 * This method is used to fetch records on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.fetch = function(options, successCallback, failureCallback){

		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineEnabledObjectService.fetch");
		
		if(!areOptionsValid(options, failureCallback)) {
			return;
		}
		
		try {
			var dataObject = options[kony.sdk.constants.ObjectServiceConstants.DATAOBJECT];
			var objectName = dataObject.getObjectName();
			
			function fetchHandler(objMetadata) {
				var obj = new kony.sdk.KNYObj(objectName);
				var readOptions = dataObject.getOfflineObjectsOptions();

				/* If read options are not supplied, caller such as fetchDataForColumns model API would provide a select query object and some callers provide query params. 
				 *  We parse the select query or queryParams to suite offline objects read API.
				 */
				if (!readOptions || Object.keys(readOptions).length == 0) {
					var selectQueryObject = dataObject.getSelectQueryObject();
					var queryParams = options[kony.sdk.constants.ObjectServiceConstants.QUERYPARAMS];
					
					if (selectQueryObject) {
						readOptions.projectionColumns = [];
					  
						var columns = selectQueryObject.getColumns();
						for (var column in columns) {
							readOptions.projectionColumns.push(columns[column].getName());
						}
						
						var criteriaList = selectQueryObject.getCriterias();
						var primaryKeys = {};
						for (var criteria in criteriaList) {
							var colObj = criteriaList[criteria].getColumn();
							if (colObj) {
								primaryKeys[colObj.getName()] = criteriaList[criteria].getValue();
							}
						}

						readOptions.primaryKeys = primaryKeys;
					} else if (queryParams) {
						
						var primaryKeys = {};
				
						if (objMetadata.primaryKey != null && objMetadata.primaryKey != undefined) {
							for (var indx = 0; indx < objMetadata.primaryKey.length; indx++) {
								var pKey = objMetadata.primaryKey[indx];
								var pKeyValue = queryParams[pKey];
								if(pKeyValue == null || pKeyValue == undefined || pKeyValue == "") {
									kony.sdk.logsdk.error("### OfflineEnabledObjectService:: fetch Error: Primarykey details missing so unable to fetch");
									kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
									return;
								}

								primaryKeys[pKey] =  pKeyValue;
							}
							
							readOptions.primaryKeys = primaryKeys;
							
						} else {
							kony.sdk.logsdk.error("### OfflineEnabledObjectService:: fetch Error: Primarykey details missing so unable to fetch");
							kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
							return;
						}
						
					}
				}
				
				function fetchSuccessHandler(res) {
					var response = {};
					response.records = res;
					successCallback(response);
				}

				obj.get(readOptions, fetchSuccessHandler, failureCallback);
			}
			
			this.getMetadataOfObject(objectName,{},fetchHandler,failureCallback);
			
		} catch(error) {
				kony.sdk.logsdk.error("Fetch on offline enabled object failed with error: " + error);
				kony.sdk.verifyAndCallClosure(failureCallback, error);
		}
	};

	/**
	 * This method is used to create a record on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.create = function(options, successCallback, failureCallback){

		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineEnabledObjectService.create");
		
		if(!areOptionsValid(options, failureCallback)) {
			return;
		}
		
		try{
			var dataObject = options[kony.sdk.constants.ObjectServiceConstants.DATAOBJECT];
			var objectName = dataObject.getObjectName();
			var obj = new kony.sdk.KNYObj(objectName);
			var records = dataObject.getRecord();
			obj.create(records, {}, successCallback, failureCallback);
			
		} catch(error) {
			kony.sdk.logsdk.error("Create on offline enabled object failed with error: " + error);
			kony.sdk.verifyAndCallClosure(failureCallback, error);
		}
	};

	/**
	 * This method is used to update a record on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.update = function(options, successCallback, failureCallback){
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineEnabledObjectService.update");
		
		if(!areOptionsValid(options, failureCallback)) {
			return;
		}
		
		try {
			var dataObject = options[kony.sdk.constants.ObjectServiceConstants.DATAOBJECT];
			var objectName = dataObject.getObjectName();
			
			function updateHandler(objMetadata) {
				var obj = new kony.sdk.KNYObj(objectName);
				var updateOptions = dataObject.getOfflineObjectsOptions();
				var records = dataObject.getRecord();
				
				// If primary keys are not supplied through options, they are picked from the user supplied record.
				if (!updateOptions || Object.keys(updateOptions).length == 0 || !updateOptions['primaryKeys']) {
					if(records) {
						var primaryKeys = {};
				
						if (objMetadata.primaryKey != null && objMetadata.primaryKey != undefined) {
							for (var indx = 0; indx < objMetadata.primaryKey.length; indx++) {
								var pKey = objMetadata.primaryKey[indx];
								var pKeyValue = records[pKey];
								if(pKeyValue == null || pKeyValue == undefined || pKeyValue == "") {
									kony.sdk.logsdk.error("### OfflineEnabledObjectService:: Update Error: Primarykey details missing so unable to update");
									kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
									return;
								}

								primaryKeys[pKey] =  pKeyValue;
							}
							
							updateOptions.primaryKeys = primaryKeys;
							
						} else {
							kony.sdk.logsdk.error("### OfflineEnabledObjectService:: Update Error: Primarykey details missing so unable to update");
							kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
							return;
						}
					}
					else {
						kony.sdk.logsdk.error("Update Failed: primaryKeys key missing. Please use dataObject setOfflineObjectsOptions to set primaryKeys for update operation.");
						kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
						return;
					}
					
				}
				
				obj.updateByPK(records, updateOptions, successCallback, failureCallback);
			}
				
			this.getMetadataOfObject(objectName,{},updateHandler,failureCallback);
			
		} catch(error) {
			kony.sdk.logsdk.error("Update on offline enabled object failed with error: " + error);
			kony.sdk.verifyAndCallClosure(failureCallback, error);
		}
	};

	/**
	 * This method is used to delete a record on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.deleteRecord = function(options, successCallback, failureCallback){

		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineEnabledObjectService.deleteRecord");
		
		if(!areOptionsValid(options, failureCallback)) {
			return;
		}
		
		try {
			var dataObject = options[kony.sdk.constants.ObjectServiceConstants.DATAOBJECT];
			var objectName = dataObject.getObjectName();
			
			function deleteHandler(objMetadata) {
				var obj = new kony.sdk.KNYObj(objectName);
				var deleteOptions = dataObject.getOfflineObjectsOptions();
				
				// If primary keys are not supplied through options, they are picked from the user supplied record
				if(!deleteOptions || Object.keys(deleteOptions).length == 0 || !deleteOptions['primaryKeys']) {
					var records = dataObject.getRecord();
					if(records) {
						var primaryKeys = {};
						
						if (objMetadata.primaryKey != null && objMetadata.primaryKey != undefined) {
							for (var indx = 0; indx < objMetadata.primaryKey.length; indx++) {
								var pKey = objMetadata.primaryKey[indx];
								var pKeyValue = records[pKey];
								if(pKeyValue == null || pKeyValue == undefined || pKeyValue == "") {
									kony.sdk.logsdk.error("### OfflineEnabledObjectService:: Delete Error: Primarykey details missing so unable to delete");
									kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
									return;
								}

								primaryKeys[pKey] =  pKeyValue;
							}
							
							deleteOptions.primaryKeys = primaryKeys;
						
						} else {
							kony.sdk.logsdk.error("### OfflineEnabledObjectService:: Delete Error: Primarykey details missing so unable to delete");
							kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
							return;
						}
					}
					else {
						kony.sdk.logsdk.error("Delete Failed: primaryKeys key missing. Please use dataObject setOfflineObjectsOptions to set primaryKeys for delte operation.");
						kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
						return;
					}
				}
				
				obj.deleteByPK(deleteOptions, successCallback, failureCallback);
			}
				
			this.getMetadataOfObject(objectName,{},deleteHandler,failureCallback);
			
		} catch(error) {
			kony.sdk.logsdk.error("Delete on offline enabled object failed with error: " + error);
			kony.sdk.verifyAndCallClosure(failureCallback, error);
		}
	};

	/**
	 * This method is used to retrieve metadata of all objects
	 * @param options
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfAllObjects = function(options, successCallback, failureCallback) {
		
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineEnabledObjectService.getMetadataOfAllObjects");
		_getMetadataForObjectsOrServiceOnlineUtil(konyRef, serviceName, null, options, successCallback, failureCallback);
		kony.sdk.logsdk.trace("EXiting kony.sdk.OfflineEnabledObjectService.getMetadataOfAllObjects");
	};

	/**
	 * This method is used to retrive metadata of a specific object
	 * @param objectName
	 * @param options
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfObject = function(objectName, options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineEnabledObjectService.getMetadataOfObject");
		_getMetadataForObjectsOrServiceOnlineUtil(konyRef, serviceName, objectName, options, successCallback, failureCallback);
		kony.sdk.logsdk.trace("Exiting kony.sdk.OfflineEnabledObjectService.getMetadataOfObject");
	};
	
	/**
	 * This method is used to validate options
	 * @param options
	 * @param failureCallback
	 */
	function areOptionsValid(options, failureCallback) {
		
		if(options == null || options == undefined) {
			kony.sdk.logsdk.error("### OfflineEnabledObjectService:: Options Validity check: options null or undefined");
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return false;
		}

		if(!(options[kony.sdk.constants.ObjectServiceConstants.DATAOBJECT] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.logsdk.error("### OfflineEnabledObjectService:: Options Validity check: invalid data object");
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return false;
		}

		var dataObject = options[kony.sdk.constants.ObjectServiceConstants.DATAOBJECT];
		var objectName = dataObject.getObjectName();

		if(objectName == null || objectName == undefined){
			kony.sdk.logsdk.error("### OfflineEnabledObjectService:: Options Validity check: objectname null or undefined");
          	kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"objectName" + kony.sdk.errormessages.null_or_undefined));
            return false;
        }
		
		return true;
	};

};

/**
 * Method which returns the offline ObjectService object
 * @param konyRef
 * @param serviceName
 * @constructor
 */
kony.sdk.OfflineObjectService = function(konyRef, serviceName) {
	kony.sdk.logsdk.trace("Entering kony.sdk.OfflineObjectService");
	this.konyRef = konyRef;
	this.serviceName = serviceName;

	/**
	 * This method is used to create a record on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.create = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineObjectService.create");
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		var dataObject = options["dataObject"];

		function createHandler(objMetadata){
			_invokeOfflineCreate(dataObject, successCallback, failureCallback,options);
		}

		this.getMetadataOfObject(dataObject.getObjectName(),{},createHandler,failureCallback);
	};

	/**
	 * This method is used to fetch records from the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.fetch = function(options, successCallback, failureCallback) {
        throw "This method is not implemented.Instead use executeSelectQuery";
	};

	/**
	 * This method is used to update a record in the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.update = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineObjectService.update");
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		var dataObject = options["dataObject"];

		function updateHandler(objMetadata) {
			function updateSuccessCallback(response) {
				kony.sdk.verifyAndCallClosure(successCallback, response);
			}

			function updateFailureCallback(error) {
				if(error != null && error != undefined) {
					//if the errorcode is equivalent to transaction failed then giving some generic error message to the client.
					if(error["errorCode"] == 7010) {
						kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.transaction_failed,kony.sdk.errormessages.transaction_failed));
						return;
					}
				}
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			}

			_invokeOfflineUpdate(dataObject, updateSuccessCallback, updateFailureCallback, options);
		}

		this.getMetadataOfObject(dataObject.getObjectName(),{},updateHandler,failureCallback);
	};

	/**
	 * This method is used to delete a record in the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject)}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.deleteRecord = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineObjectService.deleteRecord");
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		var dataObject = options["dataObject"];

		function deleteHandler(objMetadata) {
			function deleteSuccessCallback(response) {
				//verifying delete response contains deleted records count as 0
				if(response != null && response != undefined) {
					if(response["rowsdeleted"] == 0) {
						kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.norecords_to_delete,kony.sdk.errormessages.norecords_to_delete));
						return;
					}
				}
				kony.sdk.verifyAndCallClosure(successCallback, response);
			}

			function deleteFailureCallback(error) {
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			}

			_invokeOfflineDelete(dataObject, deleteSuccessCallback, deleteFailureCallback, options);
		}

		this.getMetadataOfObject(dataObject.getObjectName(),{},deleteHandler,failureCallback);
	};

	/**
	 * This method is used to retrieve metadata of all objects
	 * @param options
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfAllObjects = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineObjectService.getMetadataOfAllObjects");
		_getMetadataForObjectsOrServiceOnlineUtil(konyRef, serviceName, null, options, successCallback, failureCallback);
		kony.sdk.logsdk.trace("Exiting kony.sdk.OfflineObjectService.getMetadataOfAllObjects");
	};

	/**
	 * This method is used to retrive metadata of a specific object
	 * @param objectName
	 * @param options
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfObject = function(objectName, options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineObjectService.getMetadataOfObject");
		_getMetadataForObjectsOrServiceOnlineUtil(konyRef, serviceName, objectName, options, successCallback, failureCallback);
		kony.sdk.logsdk.trace("Exiting kony.sdk.OfflineObjectService.getMetadataOfObject");
	};

	/**
	 * This method is used to execute an sql query
	 * @param queryStr
	 * @param successCallback
	 * @param failureCallback
	 */
	this.executeSelectQuery = function(queryStr, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineObjectService.executeSelectQuery");
		function selctSuccess(response) {
			kony.sdk.logsdk.debug("### OfflineObjectService::executeSelectQuery::selectSuccess Response:" ,response);
			kony.sdk.verifyAndCallClosure(successCallback, response);
		}

		function selectError(error) {
			kony.sdk.logsdk.error("### OfflineObjectService::executeSelectQuery::selectError Error:" ,error);
			kony.sdk.verifyAndCallClosure(failureCallback, error);
		}

		kony.sync.single_select_execute(kony.sdk.util.getSyncDbName(),queryStr,null,selctSuccess, selectError);
	};

	/**
	 * Helps to get the binary content of the specified column on the Object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject), "responsetype":"base64string/filepath(Default)", "binaryAttrName":columnName}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getBinaryContent = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OfflineObjectService.getBinaryContenttion");
		if(kony.sdk.isNullOrUndefined(options)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		var dataObject = options["dataObject"];
		if(!(dataObject instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		var binaryColName = options["binaryAttrName"];
		if(kony.sdk.isNullOrUndefined(binaryColName)) {
			kony.sdk.logsdk.error("### OfflineObjectService::getBinaryContent Error: Please provide column name to fetch binary content");
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Please provide column name to fetch binary content"));
			return;
		}

        var getBase64 = options["responsetype"] === "base64string" ? true : false;
		var config = options["config"];

		function getBinaryDataHandler(objMetadata) {

			function selectSuccessCallback(response) {
				kony.sdk.logsdk.debug("### OfflineObjectService::getBinaryContent::selectSuccessCallback Response" , response);
                var result;
                if(getBase64){
                    //get base64 from response
                    var tempFile = new kony.io.File(response["FilePath"]);
                    if(!kony.sdk.isNullOrUndefined(tempFile) && tempFile.exists() && tempFile.readable){
                        var tempRawBytes = tempFile.read();
                        result = kony.convertToBase64 (tempRawBytes);
                    }else{
                        kony.sdk.logsdk.error("Error in reading binary file from filepath ",response["FilePath"]);
                        var errorCode = kony.sdk.errorcodes.invalid_blob;
                        var errorMessage = kony.sdk.errormessages.invalid_blob;
                        kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(errorCode,errorMessage));
                    }
                }else{
                    //get filepath from response
                    result = response["FilePath"];
                }
                kony.sdk.verifyAndCallClosure(successCallback, result);
			}

			function selectErrorCallback(error) {
				kony.sdk.logsdk.error("### OfflineObjectService::getBinaryContent::selectErrorCallback Error:" , error);
				_invokeOfflineErrorCallback(failureCallback, error);
			}

			var dbName = kony.sdk.util.getSyncDbName();
			var objName = dataObject.getObjectName();
			var columnValues = kony.sdk.util.populateColumnValues(dataObject.getRecord(),null);
			var colMeta = kony.sdk.util.getMetadataOfColumn(objMetadata, binaryColName);
			if(kony.sdk.isNullOrUndefined(colMeta)) {
				kony.sdk.logsdk.warn("### OfflineObjectService::getBinaryContent Error: Invalid binary attribute name.");
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Invalid binary attribute name."));
				return;
			}
			if(colMeta["datatype"] !== kony.sdk.constants["binary"]) {
				kony.sdk.logsdk.warn("### OfflineObjectService::getBinaryContent Error: Datatype is not binary for the specified binary attribute name");
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Datatype is not binary for the specified binary attribute name"));
				return;
			}
			var pkTable = kony.sdk.util.getPkTableForBinary(objMetadata, columnValues, failureCallback);

			kony.sync.getBinary(dbName, objName, binaryColName, pkTable, config,
                selectSuccessCallback, selectErrorCallback);
		}

		this.getMetadataOfObject(dataObject.getObjectName(),{},getBinaryDataHandler,failureCallback);
	};

	function _invokeOfflineErrorCallback(failureCallback, errorObject) {
		//call the failureCallback after adding opstatus to the errorObject.
		var errorCode, errorMessage;
		if(errorObject) {
			errorCode = (errorObject.hasOwnProperty("errorCode")) ? errorObject["errorCode"] : kony.sdk.errorcodes.transaction_failed;
			errorMessage = (errorObject.hasOwnProperty("errorMessage")) ? errorObject["errorMessage"] : kony.sdk.errormessages.transaction_failed;
		} else {
			errorCode = kony.sdk.errorcodes.transaction_failed;
			errorMessage = kony.sdk.errormessages.transaction_failed;
		}
		kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(errorCode, errorMessage));

	}

	function _invokeOfflineCreate(dataObject, successCallback, failureCallback,options) {
		var dbname = kony.sdk.util.getSyncDbName();
		kony.sync.single_insert_execute(dbname, dataObject.getObjectName(), dataObject.getRecord(),
			successCallback, function(err){
				_invokeOfflineErrorCallback(failureCallback, err);
			}, true,options);
	}

	function _invokeOfflineUpdate(dataObject, successCallback, failureCallback,options) {
		var objectName = dataObject.getObjectName();
		var columnValues = dataObject.getRecord();
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objectName);
		var pkTable = {};
		var whereClause = [];
		if (objMetadata.primaryKey != null && objMetadata.primaryKey != undefined) {
			for (var indx = 0; indx < objMetadata.primaryKey.length; indx++) {
				var pKey = objMetadata.primaryKey[indx];
				var pKeyValue = columnValues[pKey];
				if(pKeyValue == null || pKeyValue == undefined || pKeyValue == "") {
					//TODO change to error object
					kony.sdk.logsdk.error("### OfflineObjectService::_invokeOfflineUpdate Error: Primarykey details missing so unable to update");
					kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
					return;
				}

				pkTable.pKey = {
					"key": pKey,
					"value": pKeyValue
				};
				var condition = {};
				condition.key = pKey;
				condition.value = pKeyValue;
				whereClause.push(condition);
			}
		} else {
			//TODO change to error object
			kony.sdk.logsdk.error("### OfflineObjectService::_invokeOfflineUpdate Error: Primarykey details missing so unable to update");
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
			return;
		}

		var dbName = kony.sdk.util.getSyncDbName();
		kony.sync.single_update_execute(dbName, objectName, columnValues, whereClause, successCallback,
			function(err){
				_invokeOfflineErrorCallback(failureCallback, err);
			}, false, true, null,options);
	}

	function _invokeOfflineDelete(dataObject, successCallback, failureCallback, options) {
		var isError = false;
		var markForUpload = false;
		var tbname = dataObject.getObjectName();
		var errMsg = null;
		var wcs = [];
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, dataObject.getObjectName());
		var dbName = kony.sdk.util.getSyncDbName();
		var srcAttributes = kony.sdk.util.getPrimarykeysFromMetadata(objMetadata);
		if (srcAttributes != null && srcAttributes != undefined) {
			var pkLen = Object.keys(srcAttributes).length;
			for (var indx = 0; indx < pkLen; indx++) {
				var pKey = Object.keys(srcAttributes)[indx];
				var pKeyValue = dataObject.getRecord()[pKey];
				if (pKeyValue == null || pKeyValue == undefined|| pKeyValue == "") {
					//TODO
					//throw error
					kony.sdk.logsdk.error("### _invokeOfflineDelete:: Error Primarykey details missing so unable to delete");
					kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
					return;
				}
				var whereClause = {};
				whereClause.key = pKey;
				whereClause.value = pKeyValue;
				kony.table.insert(wcs, whereClause);
			}
		} else {
			//TODO
			//throw error
			kony.sdk.logsdk.error("### _invokeOfflineDelete:: Error Primarykey details missing so unable to delete");
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
			return;
		}

		kony.sync.single_delete_execute(dbName, tbname, wcs, successCallback,
			function(err){
				_invokeOfflineErrorCallback(failureCallback,err);
			}, false, false, true,options);
	}
};

/**
 * Method which returns the online ObjectService object
 * @param konyRef
 * @param serviceName
 * @constructor
 */
kony.sdk.OnlineObjectService = function(konyRef, serviceName, serviceInfo) {
	kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService");
	this.konyRef = konyRef;
	this.serviceName = serviceName;
	this.serviceInfo = serviceInfo;
	this.dataUrl = null;
	this.binaryUrl = null;
	this.operationsUrl = null;
	this.metadataUrl = null;
	this.version = null;

	var currentObject = this;

	/**
	 * This method is used to create a record on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.create = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.create");
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;

		function createOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_create(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				kony.sdk.logsdk.error("### OnlineObjectService::create Error:" , error);
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}

		if (kony.sdk.skipAnonymousCall){
            createOperationHandler();
		}
		else{
            kony.sdk.claimsRefresh(createOperationHandler, failureCallback);
		}
	};

	/**
	 * This method is used to fetch a record on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.fetch = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.fetch");
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;

		function fetchOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_fetch(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				kony.sdk.logsdk.error("### OnlineObjectService::fetch Error:" , error);
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}

		if (kony.sdk.skipAnonymousCall){
            fetchOperationHandler();
		}
		else{
            kony.sdk.claimsRefresh(fetchOperationHandler, failureCallback);
		}

	};

	/**
	 * This method is used to update a record on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.update = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.update");
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
				return;
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;

		function updateOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_update(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				kony.sdk.logsdk.error("### OnlineObjectService::update Error:" , error);
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}

		if (kony.sdk.skipAnonymousCall){
            updateOperationHandler();
		}
		else{
            kony.sdk.claimsRefresh(updateOperationHandler, failureCallback);
		}

	};

	/**
	 * This method is used to partial update a record on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.partialUpdate = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.partialUpdate");
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
				return;
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;

		function partialUpdateOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_partialUpdate(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				kony.sdk.logsdk.error("### OnlineObjectService::partialUpdate Error:" , error);
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}

		if (kony.sdk.skipAnonymousCall){
            partialUpdateOperationHandler();
		}
		else{
            kony.sdk.claimsRefresh(partialUpdateOperationHandler, failureCallback);
		}

	};

	/**
	 * This method is used to delete a record on the object
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.deleteRecord = function(options, successCallback, failureCallback) {
	kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.deleteRecord");	
		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
				return;
			}
		}

		var tmpDataUrl = this.getDataUrl();
		var objName = options["dataObject"].objectName;

		function deleteOperationHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_deleteRecord(options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				kony.sdk.logsdk.error("### OnlineObjectService::delete Error:" , error);
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}

		if (kony.sdk.skipAnonymousCall){
            deleteOperationHandler();
		}
		else{
            kony.sdk.claimsRefresh(deleteOperationHandler, failureCallback);
		}

	};

	/**
	 * This method is used to for performing custom operation
	 * @param {string} verbName -  custom verb identifier
	 * @param {map} options - includes {"dataObject":(@link kony.sdk.dto.DataObject),"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.customVerb = function(verbName, options, successCallback, failureCallback){
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.customVerb");
		if(verbName == null || verbName == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"verbName" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if(!(options["dataObject"] instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
				return;
			}
		}

		var tmpDataUrl = this.getOperationsUrl();
		var objName = options["dataObject"].objectName;

		function customVerbHandler() {
			currentObject.getMetadataOfObject(objName,{},function(result){
				_customverb(verbName,options, tmpDataUrl, successCallback, failureCallback);
			},function(error){
				kony.sdk.logsdk.error("### OnlineObjectService::customverb Error:" , error);
				kony.sdk.verifyAndCallClosure(failureCallback,error);
			});
		}

		if (kony.sdk.skipAnonymousCall){
            customVerbHandler();
		}
		else{
            kony.sdk.claimsRefresh(customVerbHandler, failureCallback);
		}

	};

	/**
	 * This method is used to retrive metadata of all objects
	 * @param {map} options - includes {"getFromServer":boolean,"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfAllObjects = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.getMetadataOfAllObjects");
		_getMetadataForObjectsOrServiceOnlineUtil(konyRef, serviceName, null, options, successCallback, failureCallback);
		kony.sdk.logsdk.trace("Exiting kony.sdk.OnlineObjectService.getMetadataOfAllObjects");
	};

	/**
	 * This method is used to retrive metadata of a specific object
	 * @param objectName
	 * @param {map} options - includes {"getFromServer":boolean,"headers":<map of http headers>}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getMetadataOfObject = function(objectName, options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.getMetadataOfObject");
		_getMetadataForObjectsOrServiceOnlineUtil(konyRef, serviceName, objectName, options, successCallback, failureCallback);
		kony.sdk.logsdk.trace("Exiting kony.sdk.OnlineObjectService.getMetadataOfObject");
	};

	this.getDataUrl = function() {
		if (kony.sdk.isNullOrUndefined(currentObject.dataUrl)) {
			currentObject.dataUrl = encodeURI(stripTrailingCharacter(currentObject.serviceInfo["url"] + "/objects/", "/"));
		}
		return currentObject.dataUrl;
	};

	this.getBinaryUrl = function() {
		if (kony.sdk.isNullOrUndefined(currentObject.binaryUrl)) {
			currentObject.binaryUrl = encodeURI(stripTrailingCharacter(currentObject.serviceInfo["url"] + "/binary/", "/"));
		}
		return currentObject.binaryUrl;
	};

	this.getOperationsUrl = function() {
		if (kony.sdk.isNullOrUndefined(currentObject.operationsUrl)) {
            currentObject.operationsUrl = encodeURI(stripTrailingCharacter(currentObject.serviceInfo["url"] + "/operations/", "/"));
		}
		return currentObject.operationsUrl;
	};

	this.getMetadataUrl = function() {
		if (kony.sdk.isNullOrUndefined(currentObject.metadataUrl)) {
			currentObject.metadataUrl = encodeURI(stripTrailingCharacter(currentObject.serviceInfo["metadata_url"], "/"));
		}
		return currentObject.metadataUrl;
	};

	this.getVersion = function() {
		if (kony.sdk.isNullOrUndefined(currentObject.version)) {
			currentObject.version = currentObject.serviceInfo["version"];
		}
		return currentObject.version;
	};

		
  	/*
     *  API for uploading binary data (either file or raw bytes) to backend
     */
	this.uploadBinaryData = function(options, onFileUploadStartedCallback, onChunkUploadCompletedCallback, onFileUploadCompletedCallback, onFileUploadFailureCallback) 
	{
        var fileUploadStartedCallback = null;
        var chunkUploadCompletedCallback = null;
        var fileUploadCompletedCallback = null;
        var fileUploadFailureCallback = null;
		var uploadParams = null;
		
		/* validations for callbacks */
		
		// validation for onFileUploadStartedCallback
		if (kony.sdk.isNullOrUndefined(onFileUploadStartedCallback) || (typeof (onFileUploadStartedCallback) !== 'function')) 
		{
			kony.sdk.logsdk.warn("### OnlineObjectService::uploadBinaryData onFileUploadStartedCallback is null or undefined or not a function");
		} 
		else 
		{
			fileUploadStartedCallback = onFileUploadStartedCallback;
		}
		
		// validation for onChunkUploadCompletedCallback
		if (kony.sdk.isNullOrUndefined(onChunkUploadCompletedCallback) || (typeof (onChunkUploadCompletedCallback) !== 'function')) 
		{
			kony.sdk.logsdk.warn("### OnlineObjectService::uploadBinaryData onChunkUploadCompletedCallback is null or undefined or not a function");
		} 
		else  
		{
			chunkUploadCompletedCallback = onChunkUploadCompletedCallback;
		} 
		
		// validation for onFileUploadCompletedCallback
		if (kony.sdk.isNullOrUndefined(onFileUploadCompletedCallback) || (typeof (onFileUploadCompletedCallback) !== 'function')) 
		{
			kony.sdk.logsdk.warn("### OnlineObjectService::uploadBinaryData onFileUploadCompletedCallback is null or undefined or not a function");
		} 
		else  
		{
			fileUploadCompletedCallback = onFileUploadCompletedCallback;
		} 
		
		// validation for onFileUploadFailureCallback
		if (kony.sdk.isNullOrUndefined(onFileUploadFailureCallback) || (typeof (onFileUploadFailureCallback) !== 'function')) 
		{
			kony.sdk.logsdk.warn("### OnlineObjectService::uploadBinaryData onFileUploadFailureCallback is null or undefined or not a function");
		} 
		else  
		{
			fileUploadFailureCallback = onFileUploadFailureCallback;
		} 
		
		// validation for options
		if (kony.sdk.isNullOrUndefined(options)) 
		{
			kony.sdk.logsdk.error("### OnlineObjectService::uploadBinaryData options is null or undefined");
            kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined, "options " + kony.sdk.errormessages.null_or_undefined));
            return;
        }

        var dataObject = options["dataObject"];
		if(kony.sdk.isNullOrUndefined(dataObject))
		{
			kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance, kony.sdk.errormessages.invalid_dataobject_instance));
            return;
		}
		
        if (!(dataObject instanceof kony.sdk.dto.DataObject)) 
		{
            kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance, kony.sdk.errormessages.invalid_dataobject_instance));
            return;
        }

        var objName = dataObject.getObjectName();
        var mfEndpointUrl = this.getDataUrl() + "/" +  objName;

        if(kony.sdk.isNullOrUndefined(dataObject.getRecord()))
		{
            kony.sdk.logsdk.error("### OnlineObjectService::uploadBinaryData Error: Please provide record to upload Binary content.");
            kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
            return;
		}
		
		uploadParams = dataObject.getRecord();
		
		// check that either rawBytes or filePath MUST be defined
		// Only one of the two is allowed, NOT  both

		// check if BOTH are defined 
        if(!kony.sdk.isNullOrUndefined(uploadParams["FilePath"]) && !kony.sdk.isNullOrUndefined(uploadParams["rawBytes"]))
		{
			kony.sdk.logsdk.error("### OnlineObjectService::uploadBinaryData Error: BOTH FilePath and rawBytes are provided - please provide only one of them");
			kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance, "BOTH FilePath and rawBytes are provided " +  kony.sdk.errormessages.invalid_queryparams_instance));
			return;
		}
		
		// check if neither are defined 
		if(kony.sdk.isNullOrUndefined(uploadParams["FilePath"]) && kony.sdk.isNullOrUndefined(uploadParams["rawBytes"]))
		{
			kony.sdk.logsdk.error("### OnlineObjectService::uploadBinaryData Error: Neither FilePath nor rawBytes is provided - please provide one of them");
			kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance, "Neither FilePath nor rawBytes is provided " +  kony.sdk.errormessages.invalid_queryparams_instance));
			return;
		}
		
		// check for datatype of filePath (if defined)
		if(!kony.sdk.isNullOrUndefined(uploadParams["FilePath"]))
		{
			if(typeof(uploadParams["FilePath"]) !== 'string')
			{
				kony.sdk.logsdk.error("### OnlineObjectService::uploadBinaryData Error: FilePath : expected string and found " + typeof(uploadParams["FilePath"]));
				kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance, "Invalid datatype of FilePath " + typeof(uploadParams["FilePath"]) + kony.sdk.errormessages.invalid_queryparams_instance));
				return;
			}
		}
		
		// check for datatype of rawBytes, if defined and convert to base64 string 
		if(!kony.sdk.isNullOrUndefined(uploadParams["rawBytes"]))
		{
			var rawBytes = uploadParams["rawBytes"];
			if(typeof(rawBytes) !== 'object')
			{
				kony.sdk.logsdk.error("### OnlineObjectService::uploadBinaryData Error: rawBytes : expected object and found " + typeof(rawBytes));
				kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance, "Invalid datatype of rawBytes " + typeof(rawBytes) + kony.sdk.errormessages.invalid_queryparams_instance));
				return;
			}
			else
			{
				var base64EncodedString = kony.convertToBase64(rawBytes);
				uploadParams["rawBytes"] = base64EncodedString;
			}
		}

        function uploadBinaryDataOperationHandler() 
		{
            currentObject.getMetadataOfObject(objName, {}, function (response) 
			{
                _uploadBinaryData(mfEndpointUrl, uploadParams, fileUploadStartedCallback, chunkUploadCompletedCallback, fileUploadCompletedCallback, fileUploadFailureCallback);
            }, 
			function (error) 
			{
                kony.sdk.logsdk.error("### OnlineObjectService::uploadBinaryData Error:" , error);
                kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, error);
            });
        }

		if((typeof(binarydata) !== "undefined") && (typeof(binarydata.uploadBinaryData) !== "undefined")) 
		{
			if (kony.sdk.skipAnonymousCall){
                uploadBinaryDataOperationHandler();
			}
			else{
                kony.sdk.claimsRefresh(uploadBinaryDataOperationHandler, fileUploadFailureCallback);
			}
        } 
		else 
		{
            kony.sdk.verifyAndCallClosure(downloadFailureCallback, "FFI is not configured to use Binary Apis");
			return;
        }
    };
	
    /*
     * Helper method to perform file upload
     */
	function _uploadBinaryData(mfEndpointUrl, uploadParams, fileUploadStartedCallback, chunkUploadCompletedCallback, fileUploadCompletedCallback, fileUploadFailureCallback)
	{
		var uploadOptions = {};
		
		if(uploadParams)
		{
            // generate the proper structure, as per the native layer
            if(uploadParams["FilePath"])
              {
                uploadOptions["FilePath"] = uploadParams["FilePath"];
                delete uploadParams["FilePath"];
              }
            else if(uploadParams["rawBytes"])
              {
                uploadOptions["rawBytes"] = uploadParams["rawBytes"];
                delete uploadParams["rawBytes"];
              }
          
          	uploadOptions["uploadParams"] = uploadParams;             
		}
		
		var headers = {};
        if (!kony.sdk.skipAnonymousCall){
            headers["X-Kony-Authorization"] = kony.sdk.getCurrentInstance().currentClaimToken;
        }

		uploadOptions["headers"] = headers;
		uploadOptions["URL"] = mfEndpointUrl;

        kony.sdk.binary.uploadBinaryData(
			uploadOptions,
			fileUploadStartedCallback,
			chunkUploadCompletedCallback,
			fileUploadCompletedCallback,
			fileUploadFailureCallback);
	}

    this.getBinaryData = function(options, arg1, arg2, arg3, arg4, arg5) {
        var externalSource = true;
        var fileDownloadStartedCallback = null;
        var chunkDownloadCompletedCallback = null;
        var fileDownloadCompletedCallback = null;
        var downloadFailureCallback = null;
        var binaryAttributeName = null;

        if (kony.sdk.isNullOrUndefined(arg5)) {
            if (kony.sdk.isNullOrUndefined(arg1)) {
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData fileDownloadStartedCallback is null or undefined");
            } else if (typeof (arg1) === 'function') {
                fileDownloadStartedCallback = arg1;
            } else{
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData invalid param provided for fileDownloadStartedCallback");
			}

            if (kony.sdk.isNullOrUndefined(arg2)) {
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData chunkDownloadCompletedCallback is null or undefined");
            } else if (typeof (arg2) === 'function') {
                chunkDownloadCompletedCallback = arg2;
            } else{
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData invalid param provided for chunkDownloadCompletedCallback");
            }

            if (kony.sdk.isNullOrUndefined(arg3)) {
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData fileDownloadCompletedCallback is null or undefined");
            } else if (typeof (arg3) === 'function') {
                fileDownloadCompletedCallback = arg3;
            } else{
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData invalid param provided for fileDownloadCompletedCallback");
            }

            if (kony.sdk.isNullOrUndefined(arg4)) {
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData downloadFailureCallback is null or undefined");
            } else if (typeof (arg4) === 'function') {
                downloadFailureCallback = arg4;
            } else{
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData invalid param provided for downloadFailureCallback");
            }
        } else {
            binaryAttributeName = arg1;
            externalSource = false;
            if (kony.sdk.isNullOrUndefined(arg2)) {
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData fileDownloadStartedCallback is null or undefined");
            } else if (typeof (arg2) === 'function') {
                fileDownloadStartedCallback = arg2;
            } else{
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData invalid param provided for fileDownloadStartedCallback");
            }

            if (kony.sdk.isNullOrUndefined(arg3)) {
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData chunkDownloadCompletedCallback is null or undefined");
            } else if (typeof (arg3) === 'function') {
                chunkDownloadCompletedCallback = arg3;
            } else{
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData invalid param provided for chunkDownloadCompletedCallback");
            }

            if (kony.sdk.isNullOrUndefined(arg4)) {
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData fileDownloadCompletedCallback is null or undefined");
            } else if (typeof (arg4) === 'function') {
                fileDownloadCompletedCallback = arg4;
            } else{
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData invalid param provided for fileDownloadCompletedCallback");
            }

            if (kony.sdk.isNullOrUndefined(arg5)) {
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData downloadFailureCallback is null or undefined");
            } else if (typeof (arg5) === 'function') {
                downloadFailureCallback = arg5;
            } else{
                kony.sdk.logsdk.warn("### OnlineObjectService::getBinaryData invalid param provided for downloadFailureCallback");
            }

        }

        if (kony.sdk.isNullOrUndefined(options)) {
            kony.sdk.verifyAndCallClosure(downloadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined, "options" + kony.sdk.errormessages.null_or_undefined));
            return;
        }

        var tmpDataUrl = null;
        if(externalSource){
        	tmpDataUrl = this.getDataUrl();
		}else{
        	tmpDataUrl = this.getBinaryUrl();
		}
        var dataObject = options["dataObject"];
        if (!(dataObject instanceof kony.sdk.dto.DataObject)) {
            kony.sdk.verifyAndCallClosure(downloadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance, kony.sdk.errormessages.invalid_dataobject_instance));
            return;
        }

        if (!(kony.sdk.isNullOrUndefined(options["queryParams"]))) {
            if (!(options["queryParams"] instanceof Object)) {
                kony.sdk.verifyAndCallClosure(downloadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance, kony.sdk.errormessages.invalid_queryparams_instance));
                return;
            }
        }
        var objName = dataObject.getObjectName();

        var streamingFlag = false;
        if (!kony.sdk.isNullOrUndefined(options["streaming"]) && options["streaming"] === true) {
            streamingFlag = true;
        }

        if (!externalSource) {
            if (kony.sdk.isNullOrUndefined(binaryAttributeName) || typeof (binaryAttributeName) !== "string") {
                kony.sdk.logsdk.error("### OnlineObjectService::getBinaryData Error: Please provide column name to fetch binary content");
                kony.sdk.verifyAndCallClosure(downloadFailureCallback, kony.sdk.error.getClientErrObj("90000", "Please provide column name to fetch binary content"));
                return;
            } else {
                options["binaryAttrName"] = binaryAttributeName;
            }
        }

        if(kony.sdk.isNullOrUndefined(dataObject.getRecord())){
            kony.sdk.logsdk.error("### OnlineObjectService::_getBinaryData Error: Please provide primary key details or fileParams to get Binary content.");
            kony.sdk.verifyAndCallClosure(downloadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
            return;
		}

        function getBinaryDataOperationHandler() {
            currentObject.getMetadataOfObject(objName, {}, function (response) {
                _getBinaryData(options, tmpDataUrl, externalSource, streamingFlag, fileDownloadStartedCallback, chunkDownloadCompletedCallback, fileDownloadCompletedCallback, downloadFailureCallback);
            }, function (error) {
                kony.sdk.logsdk.error("### OnlineObjectService::getBinaryData Error:" , error);
                kony.sdk.verifyAndCallClosure(downloadFailureCallback, error);
            });
        }

        if (kony.sdk.skipAnonymousCall){
            getBinaryDataOperationHandler();
		}
		else{
            kony.sdk.claimsRefresh(getBinaryDataOperationHandler, downloadFailureCallback);
		}
    };

	/**
	 * Helps to get the binary content of the specified column on the Object
	 * @param {map} options - includes {"dataObject":{@link kony.sdk.dto.DataObject}, "binaryAttrName":columnName}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.getBinaryContent = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.getBinaryContent");
		if(options == null || options == undefined){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined, "options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		var tmpDataUrl = this.getBinaryUrl();
		var dataObject = options["dataObject"];
		if(!(dataObject instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
				return;
			}
		}

		var objName = dataObject.getObjectName();
		var binaryColName = options["binaryAttrName"];
		if (binaryColName == null || binaryColName == undefined) {
			kony.sdk.logsdk.error("### OnlineObjectService::getBinaryContent Error: Please provide column name to fetch binary content");
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Please provide column name to fetch binary content"));
			return;
		}
		function getBinaryContentOperationHandler() {
			currentObject.getMetadataOfObject(objName, {}, function (response) {
				_getBinaryContent(options, tmpDataUrl, successCallback, failureCallback);
			}, function (error) {
				kony.sdk.logsdk.error("### OnlineObjectService::getBinaryContent Error:" , error);
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			});
		}

		if (kony.sdk.skipAnonymousCall){
            getBinaryContentOperationHandler();
		}
		else{
            kony.sdk.claimsRefresh(getBinaryContentOperationHandler, failureCallback);
		}
	};

	/**
	 * Helps to create the binary content of the specified column on the Object
	 * @param {map} options - includes {"dataObject": {@link kony.sdk.dto.DataObject}, "binaryAttrName":columnName}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.createBinaryContent = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.createBinaryContent");
		var tmpDataUrl = this.getBinaryUrl();

		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		var dataObject = options["dataObject"];
		if(!(dataObject instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
				return;
			}
		}

		var objName = dataObject.getObjectName();
		var binaryColName = options["binaryAttrName"];
		if (binaryColName == null || binaryColName == undefined) {
			kony.sdk.logsdk.error("### OnlineObjectService::createBinaryContent Error: Please provide column name to create binary content");
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("900000","Please provide column name to create binary content"));
			return;
		}
		function createBinaryContentOperationHandler() {
			currentObject.getMetadataOfObject(objName, {}, function (response) {
				_createBinaryContent(options, tmpDataUrl, successCallback, failureCallback);
			}, function (error) {
				kony.sdk.logsdk.error("### OnlineObjectService::createBinaryContent Error:" , error);
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			});
		}

		if (kony.sdk.skipAnonymousCall){
            createBinaryContentOperationHandler();
		}
		else{
            kony.sdk.claimsRefresh(createBinaryContentOperationHandler, failureCallback);
		}
	};

	/**
	 * Helps to update the binary content of the specified column on the Object
	 * @param {map} options - includes {"dataObject": {@link kony.sdk.dto.DataObject}, "binaryAttrName":columnName}
	 * @param successCallback
	 * @param failureCallback
	 */
	this.updateBinaryContent = function(options, successCallback, failureCallback) {
		kony.sdk.logsdk.trace("Entering kony.sdk.OnlineObjectService.updateBinaryContent");
		var tmpDataUrl = this.getBinaryUrl();

		if(options == null || options == undefined) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined, "options" + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		var dataObject = options["dataObject"];
		if(!(dataObject instanceof kony.sdk.dto.DataObject)) {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_dataobject_instance,kony.sdk.errormessages.invalid_dataobject_instance));
			return;
		}

		if(!(options["queryParams"] == null || options["queryParams"] == undefined)) {
			if(!(options["queryParams"] instanceof Object)){
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
				return;
			}
		}

		var objName = dataObject.getObjectName();
		var binaryColName = options["binaryAttrName"];
		if (binaryColName == null || binaryColName == undefined) {
			kony.sdk.logsdk.error("### OnlineObjectService::updateBinaryContent Error: Please provide column name to create binary content");
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj("90000","Please provide column name to create binary content"));
			return;
		}
		function updateBinaryContentOperationHandler() {
			currentObject.getMetadataOfObject(objName, {}, function (response) {
				_updateBinaryContent(options, tmpDataUrl, successCallback, failureCallback);
			}, function (error) {
				kony.sdk.logsdk.error("### OnlineObjectService::updateBinaryContent Error:" , error);
				kony.sdk.verifyAndCallClosure(failureCallback, error);
			});
		}

		if (kony.sdk.skipAnonymousCall){
            updateBinaryContentOperationHandler();
		}
		else{
            kony.sdk.claimsRefresh(updateBinaryContentOperationHandler, failureCallback);
		}

	};

	function _getBinaryContent(options, tmpDataUrl, successCallback, failureCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var binaryColName = options["binaryAttrName"];
		var objName = dataObject.getObjectName();
		var queryParams = options["queryParams"];
		var url =  tmpDataUrl + "/" + objName;
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objName);
		if (objMetadata.primaryKey != undefined && objMetadata.primaryKey != null ) {
			var pkCount = objMetadata.primaryKey.length;
			if (pkCount == 0) {
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			//reading primarykey and framing filter clause
			var pkey = objMetadata.primaryKey[0];
			if(dataObject.getRecord()[pkey] == undefined || dataObject.getRecord()[pkey] == null){
				kony.sdk.logsdk.error("### OnlineObjectService::_getBinaryContent Error: Please provide primary key details to get Binary content.");
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			url = url + "?" + pkey + "=" + dataObject.getRecord()[pkey];
			//passing binary column name to server
			if(binaryColName != null && binaryColName != undefined) {
				url = url + "&fieldName=" + binaryColName;
			}
			if(queryParams != undefined && queryParams != null){
				url = url + "&" + kony.sdk.util.objectToQueryParams(queryParams);
			}

		} else {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
			return;
		}
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}

		var isKonyApiVersionAvailable = false;
                if (typeof(headers) !== 'undefined' && headers !== null) {
                    //check for x-kony-api-version case insensitive
                    for (var header in headers) {
                        if(header !== null && header !=='undefined'){
                            if (header.toLowerCase() === "x-kony-api-version")
                                isKonyApiVersionAvailable = true
                        }
                    }
                    if (!isKonyApiVersionAvailable) {
                        headers["X-Kony-API-Version"] = currentObject.getVersion();
                    }
                }
		function invokeSuccessCallback(response){
			kony.sdk.logsdk.debug("### OnlineObjectService::_getBinaryContent::invokeSuccessCallback Response:" , response);
			kony.sdk.verifyAndCallClosure(successCallback,response["data"]);
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_getBinaryContent::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(failureCallback,error);
		}

		invokeObjectOperation(url, dataObject.getObjectName(), headers,null, kony.sdk.constants.HTTP_METHOD_GET,invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}
	
    function _getBinaryData(options, tmpDataUrl, externalSource, streamingFlag, fileDownloadStartedCallback, chunkDownloadCompletedCallback, fileDownloadCompletedCallback, downloadFailureCallback) {

        var dataObject = options["dataObject"];
        var headers = options["headers"];
        var binaryColName = options["binaryAttrName"];
        var objName = dataObject.getObjectName();
        var queryParams = options["queryParams"];
        var url =  tmpDataUrl + "/" + objName;
        var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objName);

        if(!externalSource){
            if (!kony.sdk.isNullOrUndefined(objMetadata.primaryKey)) {
                var pkCount = objMetadata.primaryKey.length;
                if (pkCount == 0) {
                    kony.sdk.verifyAndCallClosure(downloadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
                    return;
                }
                //reading primarykey and framing filter clause
                var pkey = objMetadata.primaryKey[0];
                if(kony.sdk.isNullOrUndefined(dataObject.getRecord()[pkey])){
                    kony.sdk.logsdk.error("### OnlineObjectService::_getBinaryData Error: Please provide primary key details to get Binary content.");
                    kony.sdk.verifyAndCallClosure(downloadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
                    return;
                }
                url = url + "?" + pkey + "=" + dataObject.getRecord()[pkey];
                //passing binary column name to server
                if(!kony.sdk.isNullOrUndefined(binaryColName)) {
                    url = url + "&fieldName=" + binaryColName;
                }

                url = url + "&type=bytes";
                if(!kony.sdk.isNullOrUndefined(queryParams)){
                    url = url + "&" + kony.sdk.util.objectToQueryParams(queryParams);
                }
            } else {
                kony.sdk.verifyAndCallClosure(downloadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
                return;
            }
        }

        if (!headers) {
            //if headers not sent by the deveolper
            headers = {};
        }

        var isKonyApiVersionAvailable = false;
        if (typeof(headers) !== 'undefined' && headers !== null) {
            //check for x-kony-api-version case insensitive
            for (var headerKey in headers) {
                if(!kony.sdk.isNullOrUndefined(headerKey)){
                    if (headerKey.toLowerCase() === "x-kony-api-version") {
                        isKonyApiVersionAvailable = true;
                        headers["X-Kony-API-Version"] = headers[headerKey];
                    }
                }
            }
            if (!isKonyApiVersionAvailable) {
                headers["X-Kony-API-Version"] = currentObject.getVersion();
            }
        }
        function invokeSuccessCallback(response){
            kony.sdk.logsdk.debug("### OnlineObjectService::_getBinaryData::invokeSuccessCallback Response:" , response);

			var downloadConfig = response["records"][0];

			if(options && options["ChunkSize"]){
				downloadConfig.ChunkSize = options["ChunkSize"];
			}

			var fileParams = dataObject.getRecord();
			if(kony.sdk.isNullOrUndefined(fileParams["fileId"])){
				fileParams["fileId"] = new Date().getTime().toString();
			}

			kony.sdk.binary.getBinaryData(
				fileParams,
				streamingFlag,
				downloadConfig,
				fileDownloadStartedCallback,
				chunkDownloadCompletedCallback,
				fileDownloadCompletedCallback,
				downloadFailureCallback);
        }

        function invokeFailureCallback(error){
            kony.sdk.logsdk.error("### OnlineObjectService::_getBinaryData::invokeFailureCallback Error:" , error);
            kony.sdk.verifyAndCallClosure(downloadFailureCallback,error);
        }

		if(externalSource) {
            invokeObjectOperation(url, dataObject.getObjectName(), headers, null, kony.sdk.constants.HTTP_METHOD_GET, invokeSuccessCallback, invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
        }else{
			var fileParams = dataObject.getRecord();
			if(kony.sdk.isNullOrUndefined(fileParams["fileId"])){
				fileParams["fileId"] = dataObject.getRecord()[pkey];
			}

			if (!kony.sdk.skipAnonymousCall){
				headers[Constants.APP_AUTHORIZATION_HEADER] = kony.sdk.getCurrentInstance().currentClaimToken;
			}

			var downloadConfig = {};
			downloadConfig["endpointUrl"] = url;
			downloadConfig["headers"] = headers;

			if(options && options["ChunkSize"]){
				downloadConfig.ChunkSize = options["ChunkSize"];
			}

			kony.sdk.binary.getBinaryData(
				fileParams,
				streamingFlag,
				downloadConfig,
				fileDownloadStartedCallback,
				chunkDownloadCompletedCallback,
				fileDownloadCompletedCallback,
				downloadFailureCallback);
		}
    }

	function _createBinaryContent(options, tmpDataUrl, successCallback, failureCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var binaryColName = options["binaryAttrName"];
		var objName = dataObject.getObjectName();
		var queryParams = options["queryParams"];
		var url =  tmpDataUrl + "/" + objName;
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objName);
		var jsonPayload = {};
		var pkey;
		if (objMetadata.primaryKey != undefined && objMetadata.primaryKey != null ) {
			var pkCount = objMetadata.primaryKey.length;
			if (pkCount == 0) {
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			//reading primarykey and framing filter clause
			pkey = objMetadata.primaryKey[0];
			if(dataObject.getRecord()[pkey] == undefined || dataObject.getRecord()[pkey] == null){
				kony.sdk.logsdk.error("### OnlineObjectService::_createBinaryContent Error: Please provide primary key details to create Binary content.");
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			jsonPayload[pkey] = dataObject.getRecord()[pkey];
			jsonPayload["data"] = dataObject.getRecord()[binaryColName];
			jsonPayload["fieldName"] = binaryColName;
		} else {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
			return;
		}
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}

        var isKonyApiVersionAvailable = false;
        if (typeof(headers) !== 'undefined' && headers !== null) {
                    //check for x-kony-api-version case insensitive
            for (var header in headers) {
                    if(header !== null && header !=='undefined'){
                            if (header.toLowerCase() === "x-kony-api-version")
                                isKonyApiVersionAvailable = true
                    }
            }
            if (!isKonyApiVersionAvailable) {
                headers["X-Kony-API-Version"] = currentObject.getVersion();
            }
        }
		var formData = new kony.sdk.getFormData(jsonPayload);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		function invokeSuccessCallback(response){
			kony.sdk.logsdk.debug("### OnlineObjectService::_createBinaryContent::invokeSuccessCallback Response:" , response);
			kony.sdk.verifyAndCallClosure(successCallback,response[pkey]);
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_createBinaryContent::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(failureCallback,error);
		}

		invokeObjectOperation(url, dataObject.getObjectName(), headers, formData, null, invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}

	function _updateBinaryContent(options, tmpDataUrl, successCallback, failureCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var binaryColName = options["binaryAttrName"];
		var objName = dataObject.getObjectName();
		var queryParams = options["queryParams"];
		var url =  tmpDataUrl + "/" + objName;
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objName);
		var jsonPayload = {};
		var pkey;
		if (objMetadata.primaryKey != undefined && objMetadata.primaryKey != null ) {
			var pkCount = objMetadata.primaryKey.length;
			if (pkCount == 0) {
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			//reading primarykey and framing filter clause
			pkey = objMetadata.primaryKey[0];
			if(dataObject.getRecord()[pkey] == undefined || dataObject.getRecord()[pkey] == null){
				kony.sdk.logsdk.error("### OnlineObjectService::_updateBinaryContent Error: Please provide primary key details to create Binary content.");
				kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
				return;
			}
			jsonPayload[pkey] = dataObject.getRecord()[pkey];
			jsonPayload["data"] = dataObject.getRecord()[binaryColName];
			jsonPayload["fieldName"] = binaryColName;
		} else {
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
			return;
		}
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["X-HTTP-Method-Override"] = "PUT";
        var isKonyApiVersionAvailable = false;
        if (typeof(headers) !== 'undefined' && headers !== null) {
            //check for x-kony-api-version case insensitive
            for (var header in headers) {
                if(header !== null && header !=='undefined'){
                      if (header.toLowerCase() === "x-kony-api-version")
                        isKonyApiVersionAvailable = true
                }
            }
            if (!isKonyApiVersionAvailable) {
                headers["X-Kony-API-Version"] = currentObject.getVersion();
            }
        }

		var formData = new kony.sdk.getFormData(jsonPayload);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		function invokeSuccessCallback(response){
			kony.sdk.logsdk.debug("### OnlineObjectService::_updateBinaryContent::invokeSuccessCallback Response:" , response);
			kony.sdk.verifyAndCallClosure(successCallback,response[pkey]);
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_updateBinaryContent::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(failureCallback,error);
		}

		invokeObjectOperation(url, dataObject.getObjectName(), headers, formData, null,  invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}

	function _create(options, tmpDataUrl, successCallback, failureCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var url =  tmpDataUrl + "/" + dataObject.objectName;
		var record = dataObject.getRecord();
		var queryParams = options["queryParams"];
		if(record == null || record == undefined){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.null_or_undefined,"record " + kony.sdk.errormessages.null_or_undefined));
			return;
		}

		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}

		var isKonyApiVersionAvailable = false;
        if (typeof(headers) !== 'undefined' && headers !== null) {
                    //check for x-kony-api-version case insensitive
                    for (var header in headers) {
                        if(header !== null && header !=='undefined'){
                              if (header.toLowerCase() === "x-kony-api-version")
                                isKonyApiVersionAvailable = true
                        }
                    }
                    if (!isKonyApiVersionAvailable) {
                        headers["X-Kony-API-Version"] = currentObject.getVersion();
                    }
        }

		var formData = new kony.sdk.getFormData(record, null);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		function invokeSuccessCallback(response){
			kony.sdk.logsdk.debug("### OnlineObjectService::_create::invokeSuccessCallback Response:", response);
			kony.sdk.verifyAndCallClosure(successCallback,response);
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_create::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(failureCallback, error)
		}

		invokeObjectOperation(url, dataObject.objectName, headers,formData,null,  invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}

	function _fetch(options, tmpDataUrl, successCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var odataqueryStr = dataObject.getOdataUrl();
		var headers = options["headers"];
		var queryParams = options["queryParams"];
		var url =  tmpDataUrl + "/" + dataObject.objectName;
		if(odataqueryStr != undefined && odataqueryStr != null){
			url = url + "?" + encodeURI(odataqueryStr);
			if(queryParams != undefined && queryParams != null){
				url = url + "&" + kony.sdk.util.objectToQueryParams(queryParams);
			}
		}else if(queryParams != undefined && queryParams != null){
			url = url + "?" + kony.sdk.util.objectToQueryParams(queryParams);
		}

		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
        var isKonyApiVersionAvailable = false;
        if (typeof(headers) !== 'undefined' && headers !== null) {
            //check for x-kony-api-version case insensitive
            for (var header in headers) {
                if(header !== null && header !=='undefined'){
                	if (header.toLowerCase() === "x-kony-api-version")
                		isKonyApiVersionAvailable = true
                }
            }
            if (!isKonyApiVersionAvailable) {
                headers["X-Kony-API-Version"] = currentObject.getVersion();
            }
        }

        // If useCache is enabled and cacheID is present then network call will be skipped and cached response will be returned.
        if (options && options["useCache"] && options["cacheID"]){
            var cacheResponse = new kony.sdk.ClientCache().get(options["cacheID"]);
            if (cacheResponse){
                kony.sdk.logsdk.debug("### OnlineObjectService::_fetch:: key found in cache, invokeSuccessCallback Response:" , cacheResponse);
                kony.sdk.verifyAndCallClosure(successCallback,cacheResponse);
                return;
            }
        }

		function invokeSuccessCallback(response){
			kony.sdk.logsdk.debug("### OnlineObjectService::_fetch::invokeSuccessCallback Response:" , response);

            // If useCache is enabled then the response is cached and returned.
            if (options && options["useCache"]){
                cacheResponseForKey(options, url, {"objectName": dataObject.objectName}, response);
            }

			kony.sdk.verifyAndCallClosure(successCallback,response);
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_fetch::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}

        invokeObjectOperation(url, dataObject.objectName, headers,null, kony.sdk.constants.HTTP_METHOD_GET, invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}

	function _update(options, tmpDataUrl, updateServiceCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var url =  tmpDataUrl + "/" + dataObject.objectName;
		var queryParams = options["queryParams"];
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}

		var isKonyApiVersionAvailable = false;
        if (typeof(headers) !== 'undefined' && headers !== null) {
                    //check for x-kony-api-version case insensitive
        	for (var header in headers) {
        		if(header !== null && header !=='undefined'){
        			if (header.toLowerCase() === "x-kony-api-version")
        				isKonyApiVersionAvailable = true
                }
            }
            if (!isKonyApiVersionAvailable) {
        		headers["X-Kony-API-Version"] = currentObject.getVersion();
            }
        }

		headers["X-HTTP-Method-Override"] = "PUT";
		var formData = new kony.sdk.getFormData(dataObject.getRecord(), null);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		function invokeSuccessCallback(response){
			kony.sdk.logsdk.debug("### OnlineObjectService::_update::invokeSuccessCallback Response:" , response);
			kony.sdk.verifyAndCallClosure(updateServiceCallback,response);
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_update::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}

		invokeObjectOperation(url, dataObject.objectName, headers,formData,null,  invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}

	function _partialUpdate(options, tmpDataUrl, partialUpdateServiceCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var url =  tmpDataUrl + "/" + dataObject.objectName;
		var queryParams = options["queryParams"];

		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
		headers["X-HTTP-Method-Override"] = "PATCH";

	    var isKonyApiVersionAvailable = false;
        if (typeof(headers) !== 'undefined' && headers !== null) {
                    //check for x-kony-api-version case insensitive
        	for (var header in headers) {
        		if(header !== null && header !=='undefined'){
        			if (header.toLowerCase() === "x-kony-api-version")
        				isKonyApiVersionAvailable = true
                }
            }
            if (!isKonyApiVersionAvailable) {
        		headers["X-Kony-API-Version"] = currentObject.getVersion();
            }
        }

		var formData = new kony.sdk.getFormData(dataObject.getRecord(), null);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		function invokeSuccessCallback(response){
			kony.sdk.logsdk.debug("### OnlineObjectService::_partialUpdate::invokeSuccessCallback Success Response:" , response);
			kony.sdk.verifyAndCallClosure(partialUpdateServiceCallback,response);
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_partialUpdate::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}

		invokeObjectOperation(url, dataObject.objectName, headers,formData,null, invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}

	function _deleteRecord(options, tmpDataUrl, deleteSuccessCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var objMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName,dataObject.objectName);
		var url =  tmpDataUrl + "/" + dataObject.objectName;
		var queryParams = options["queryParams"];
		var odataUrl = "";
		if (objMetadata.primaryKey != undefined && objMetadata.primaryKey != null ) {
			var pkCount = objMetadata.primaryKey.length;
			for(var i=0;i<pkCount;i++) {
				//reading primarykey and framing filter clause
				var pkey = objMetadata.primaryKey[i];
				if(dataObject.getRecord()[pkey] == undefined || dataObject.getRecord()[pkey] == null){
					kony.sdk.logsdk.error("### OnlineObjectService::_delete Error: Please provide all primary keys to process the request");
					kony.sdk.verifyAndCallClosure(serviceErrorCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
					return;
				}
				if (i == 0) {
					odataUrl = "?$filter=" + pkey + " eq '" + dataObject.getRecord()[pkey] + "'";
				} else {
					//appending the condition incase of composite primary key
					odataUrl = odataUrl + " and " + pkey + " eq '" + dataObject.getRecord()[pkey] + "'";
				}
			}
		}

		url = url + encodeURI(odataUrl);

		if(queryParams != undefined && queryParams != null) {
			if (odataUrl && odataUrl.length != 0) {
				url = url + "&" + kony.sdk.util.objectToQueryParams(queryParams);
			} else {
				url = url + "?" + kony.sdk.util.objectToQueryParams(queryParams);
			}
		}

		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}

	    var isKonyApiVersionAvailable = false;
        if (typeof(headers) !== 'undefined' && headers !== null) {
                    //check for x-kony-api-version case insensitive
        	for (var header in headers) {
        		if(header !== null && header !=='undefined'){
        			if (header.toLowerCase() === "x-kony-api-version")
        				isKonyApiVersionAvailable = true
                }
            }
            if (!isKonyApiVersionAvailable) {
        		headers["X-Kony-API-Version"] = currentObject.getVersion();
            }
        }

		headers["X-HTTP-Method-Override"] = "DELETE";

		function invokeSuccessCallback(response){
			kony.sdk.logsdk.debug("### OnlineObjectService::_delete::invokeSuccessCallback Response:" , response);
			kony.sdk.verifyAndCallClosure(deleteSuccessCallback,response);
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_delete::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}

		invokeObjectOperation(url, dataObject.objectName, headers,null, kony.sdk.constants.HTTP_METHOD_GET, invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}

	function _customverb(verbName, options, tmpDataUrl, customVerbServiceCallback, serviceErrorCallback) {
		var dataObject = options["dataObject"];
		var headers = options["headers"];
		var url =  tmpDataUrl + "/" + dataObject.objectName + "/" + verbName;
		var queryParams = options["queryParams"];
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}
        var isKonyApiVersionAvailable = false;
        if (typeof(headers) !== 'undefined' && headers !== null) {
                    //check for x-kony-api-version case insensitive
        	for (var header in headers) {
        		if(header !== null && header !=='undefined'){
        			if (header.toLowerCase() === "x-kony-api-version")
        				isKonyApiVersionAvailable = true
                }
            }
            if (!isKonyApiVersionAvailable) {
        		headers["X-Kony-API-Version"] = currentObject.getVersion();
            }
        }

		var formData = new kony.sdk.getFormData(dataObject.getRecord(), null);

		if(queryParams != undefined && queryParams != null) {
			kony.sdk.updateFormData(formData, "queryparams", queryParams);
		}

		function invokeSuccessCallback(response){
			kony.sdk.logsdk.debug("### OnlineObjectService::_customverb::invokeSuccessCallback Success Response:" , response);
			kony.sdk.verifyAndCallClosure(customVerbServiceCallback,response);
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_customverb::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(serviceErrorCallback,error);
		}

		invokeObjectOperation(url, dataObject.objectName, headers,formData,null, invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}

};


function _getMetadataUrl(konyRef, serviceName) {
	var metadataUrl = null;
	
	if (konyRef.objectsvc[serviceName]) {
		metadataUrl = encodeURI(stripTrailingCharacter(konyRef.objectsvc[serviceName]["metadata_url"], "/"));
	} else if (konyRef.offlineObjectsvc[serviceName]) {
		metadataUrl = encodeURI(stripTrailingCharacter(konyRef.offlineObjectsvc[serviceName]["metadata_url"], "/"));
	}
	
	return metadataUrl;
	
}

function _getVersion(konyRef, serviceName) {
	
	var version = null;
	
	if (konyRef.objectsvc[serviceName]) {
		version = konyRef.objectsvc[serviceName]["version"];
	} else if (konyRef.offlineObjectsvc[serviceName]) {
		version = konyRef.offlineObjectsvc[serviceName]["version"];
	}
	
	return version;
}


/*This method is used to fetch metadata for Object/Objectservice.
* It is fetched from cache first, if it not available in cache then fetches method data from metadata URL.
*/
function _getMetadataForObjectsOrServiceOnlineUtil(konyRef, serviceName, objectName, options, successCallback, failureCallback) {
	var tmpMetadataUrl = _getMetadataUrl(konyRef, serviceName);;

	if(!(kony.sdk.isNullOrUndefined(options)) && !(options["queryParams"] == null || options["queryParams"] == undefined)) {
		if(!(options["queryParams"] instanceof Object)){
			kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance,kony.sdk.errormessages.invalid_queryparams_instance));
		}
	}

	function getMetadataOfObjectOperationHandler() {
		_getMetadataForObjectOrService(konyRef, serviceName, objectName, options, tmpMetadataUrl, successCallback, failureCallback);
	}

	if (kony.sdk.skipAnonymousCall){
		getMetadataOfObjectOperationHandler();
	}
	else{
		kony.sdk.claimsRefresh(getMetadataOfObjectOperationHandler, failureCallback);
	}
	
}

function _getMetadataForObjectOrService(konyRef, serviceName, objectName, options, tmpMetadataUrl, successCallback, failureCallback) {
	
	//if the getFromServer flag is true then get metadata from server even though its available in cache
	var getFromServer = false;
	var headers  = null;
    var queryParams = null;
	if(options != null && options != undefined) {
		getFromServer = options["getFromServer"];
        headers = options["headers"];
		queryParams = options["queryParams"];
	}
	var tmpObjOrSvcMetadata = null;
	if(objectName) {
		tmpObjOrSvcMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objectName);
	} else {
		tmpObjOrSvcMetadata = kony.sdk.ObjectServiceUtil.getCachedMetadata(serviceName);
	}
	
	if (getFromServer != true && tmpObjOrSvcMetadata != null && tmpObjOrSvcMetadata != undefined) {
		kony.sdk.logsdk.debug("### OnlineObjectService::_getMetadataOfObject from KonyStore:",tmpObjOrSvcMetadata);
		kony.sdk.verifyAndCallClosure(successCallback, tmpObjOrSvcMetadata);
	} else {
		if (!headers) {
			//if headers not sent by the deveolper
			headers = {};
		}

		var isKonyApiVersionAvailable = false;
		if (typeof(headers) !== 'undefined' && headers !== null) {
					//check for x-kony-api-version case insensitive
			for (var header in headers) {
				if(header !== null && header !=='undefined'){
					if (header.toLowerCase() === "x-kony-api-version")
						isKonyApiVersionAvailable = true
				}
			}
			if (!isKonyApiVersionAvailable) {
				headers["X-Kony-API-Version"] = _getVersion(konyRef, serviceName);
			}
		}

		var url =  tmpMetadataUrl;
		var svcid = "metadata";
		
		if(objectName) {
			url = url + "/" + objectName;
			svcid = svcid + "_" + objectName;
		}

		if(queryParams != undefined && queryParams != null){
			url = url + "?" + kony.sdk.util.objectToQueryParams(queryParams);
		}

		function invokeSuccessCallback(result) {
			kony.sdk.logsdk.debug("### OnlineObjectService::_getMetadataForObjectOrService::invokeSuccessCallback Response:" ,result);
			if(objectName) {
				var table = result["Metadata"]["table"];
				kony.sdk.ObjectServiceUtil.cacheObjectMetadata(serviceName, table);
				var tmpObjMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, objectName);
				kony.sdk.verifyAndCallClosure(successCallback, tmpObjMetadata);
			} else {
				var tableArray = result["Metadata"]["tables"];
				kony.sdk.ObjectServiceUtil.cacheMetadata(serviceName, tableArray);
				var tmpMetadata = kony.sdk.ObjectServiceUtil.getCachedMetadata(serviceName);
				kony.sdk.verifyAndCallClosure(successCallback, tmpMetadata);
			}
		}

		function invokeFailureCallback(error){
			kony.sdk.logsdk.error("### OnlineObjectService::_getMetadataForObjectOrService::invokeFailureCallback Error:" , error);
			kony.sdk.verifyAndCallClosure(failureCallback,error);
		}

		invokeObjectOperation(url, svcid, headers,null, kony.sdk.constants.HTTP_METHOD_GET, invokeSuccessCallback,invokeFailureCallback, checkAndFetchNetworkProviderOptions(options));
	}
	
}

function checkAndFetchNetworkProviderOptions(options){
    var providerOptions = {};
    //Fetching httpRequestOptions
    if(options && options["httpRequestOptions"] && options["httpRequestOptions"] instanceof Object){
        providerOptions["httpRequestOptions"] = options["httpRequestOptions"];
    }
    //Fetching XMLHttpRequestOptions
    if(options && options["xmlHttpRequestOptions"] && options["xmlHttpRequestOptions"] instanceof Object){
        providerOptions["xmlHttpRequestOptions"] = options["xmlHttpRequestOptions"];
    }
    return providerOptions;
}

//Method is used to send http request for ObjectService operations
function invokeObjectOperation(url, svcid, headers, formData, httpMethod, successCallback, failureCallback, networkProviderOptions) {
	kony.sdk.logsdk.trace("Entering invokeObjectOperation");
	var requestData = {};

	var networkProvider = new konyNetworkProvider();
	var reportingData = kony.sdk.getPayload(konyRef);
	var sessionId = null;
	var defaultHeaders = {};
	if (kony.ds) {
		sessionId = kony.ds.read("konyUUID");
	}

	if(sessionId){
		reportingData.rsid = sessionId[0];
	}

	if (!reportingData.rsid) {
		kony.sdk.logsdk.warn("### invokeObjectOperation:: rsid is either empty,null or undefined");
	}

	if(!httpMethod) {
		//default http method is post
		httpMethod = "POST";
	}

    if (!kony.sdk.skipAnonymousCall){
        // Check to find if the service is public or not, in case of public service no token is required.
        defaultHeaders["X-Kony-Authorization"] =  konyRef.currentClaimToken;
	}

	defaultHeaders["Accept"] = "application/json";
	defaultHeaders["Content-Type"] = "application/json";

    var deviceId = kony.sdk.getDeviceId();
    if(!kony.sdk.isNullOrUndefined(deviceId)) {
        defaultHeaders["X-Kony-DeviceId"] = deviceId;
    }

	if(reportingData != null && reportingData != undefined) {
		try {
			defaultHeaders["X-Kony-ReportingParams"] = encodeURI(JSON.stringify(reportingData))
		}catch(error) {
			kony.sdk.logsdk.error("### invokeObjectOperation::error while parsing metrics payload" + error);
		}
	}
	// if the user has defined his own headers, use them
	   if (headers) {
            var tempHeader = "";
            for (var header in headers) {
                if ("Accept".toLowerCase() === header.toLowerCase()) {
                	//Accept can be multiple
					//Reason being client can be programmed to accept more than one type of content from server.
                    tempHeader = "Accept";
                    if (defaultHeaders[tempHeader].toLowerCase() !== headers[header].toLowerCase()) {
                        defaultHeaders[header] = defaultHeaders[tempHeader] + "," + headers[header];
                    }
                } else if ("x-kony-authorization" === header.toLowerCase()) {
                    tempHeader = "X-Kony-Authorization";
                    if (defaultHeaders[tempHeader] !== headers[header]) {
                        defaultHeaders[tempHeader] = headers[header];
                    }
                } else if ("content-type" === header.toLowerCase()) {
                    tempHeader = "Content-Type";
                    //Content-type can and should be a single value.
					//Reason being client can only send a single kind of content at a single instance
                    if (defaultHeaders[tempHeader].toLowerCase() !== headers[header].toLowerCase()) {
                        defaultHeaders[tempHeader] = headers[header];
                    }
                } else {
                    if (defaultHeaders[header] !== headers[header]) {
                        defaultHeaders[header] = headers[header];
                    }
                }
            }
        }

	function networksuccess(res) {
		kony.sdk.logsdk.trace("Entering networksuccess");
		if (kony.sdk.metric) {
			kony.sdk.metric.clearBufferEvents();
		}
		kony.sdk.verifyAndCallClosure(successCallback, res);
	}

	function networkerror(xhr, status, err) {
		kony.sdk.logsdk.trace("Entering networkerror");
		if (xhr && !(status && err)) {
			err = xhr;
		}
		if (kony.sdk.metric) {
			if (kony.sdk.metric.errorCodeMap[xhr.opstatus]) {
				kony.sdk.metric.saveInDS();
			}
		}
		if(err["mfcode"]){
			var konyRef = kony.sdk.getCurrentInstance();
			//clear the cache if the error code related to session/token expiry
			if (kony.sdk.isSessionOrTokenExpired(err["mfcode"])) {
				kony.sdk.logsdk.warn("###ObjectService::invokeObjectOperationFailure  Session/Token expired. Authenticate and Try again");
				//kony.sdk.resetCacheKeys(konyRef);
			}
		}
		kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getObjectServiceErrObj(err));
	}

	if (httpMethod === "GET") {
		networkProvider.get(url, null, defaultHeaders, networksuccess, networkerror, "formdata", networkProviderOptions);
	} else {
		networkProvider.post(url, formData, defaultHeaders,	networksuccess,	networkerror, "formdata", networkProviderOptions);
	}
}
kony.sdk.util = kony.sdk.util || {};
kony.sdk.ObjectServiceUtil = kony.sdk.ObjectServiceUtil || {};
kony.sdk.dto = kony.sdk.dto || {};
kony.sdk.constants["picklist"] = "picklist";
kony.sdk.constants["reference"] = "reference";
kony.sdk.constants["picklistmultiselect"] = "picklistmultiselect";
kony.sdk.constants["extendedfield"] = "extendedfield";
kony.sdk.constants["objectMetadataMap"] = {};//Does not contain relationshipList of the object, relationshipList of an object will be added when getMetadataOfObject for that object is called.
kony.sdk.constants["HTTP_METHOD_GET"] = "GET";
kony.sdk.constants["HTTP_METHOD_POST"] = "POST";
kony.sdk.constants["binary"] = "binary";

kony.sdk.constants.DateTimeType = {
    TODAY: "TODAY",
    YESTERDAY: "YESTERDAY",
    TOMORROW: "TOMORROW",
    CURRENTWEEK: "CURRENTWEEK",
    LASTWEEK: "LASTWEEK",
    NEXTWEEK: "NEXTWEEK",
    CURRENTMONTH: "CURRENTMONTH",
    LASTMONTH: "LASTMONTH",
    NEXTMONTH: "NEXTMONTH"
};

kony.sdk.constants.Aggregation = {
    NONE: "",
    COUNT: "COUNT",
    SUM: "SUM",
    MAX: "MAX",
    MIN: "MIN",
    AVG: "AVG"
};

kony.sdk.constants.OrderType = {
    ASCENDING: "ASC",
    DESCENDING: "DESC"
};

kony.sdk.constants.MatchType = {
    EQUALS: {
        value: "=",
        name: "EQUALS"
    },
    GREATER: {
        value: ">",
        name: "GREATER"
    },
    GREATEREQUAL: {
        value: ">=",
        name: "GREATEREQUAL"
    },
    LESS: {
        value: "<",
        name: "LESS"
    },
    LESSEQUAL: {
        value: "<=",
        name: "LESSEQUAL"
    },
    STARTSWITH: {
        value: "LIKE",
        name: "STARTSWITH"
    },
    CONTAINS: {
        value: "LIKE",
        name: "CONTAINS"
    },
    LIKE: {
        value: "LIKE",
        name: "LIKE"
    },
    ENDSWITH: {
        value: "LIKE",
        name: "ENDSWITH"
    },
    NOTEQUAL: {
        value: "<>",
        name: "NOTEQUAL"
    },
    ISNULL: {
        value: "IS NULL",
        name: "ISNULL"
    },
    ISNOTNULL: {
        value: "IS NOT NULL",
        name: "ISNOTNULL"
    }
};

kony.sdk.constants.JoinType = {
    INNER: "INNER",
    LEFT: "LEFT",
    RIGHT: "RIGHT"

};

kony.sdk.constants.Operator = {
    AND: "AND",
    OR: "OR"
};

kony.sdk.constants.ObjectServiceConstants = {

    DATAOBJECT: "dataObject",
    QUERYPARAMS: "queryParams"
};

/**
 * This is a utility function used to check whether the two strings provided
 * would match with each other.
 * @param string1
 * @param string2
 * @return boolean
 */
kony.sdk.util.matchIgnoreCase = function (string1, string2) {
    if (string1 === null || string2 === null || string1 === undefined
        || string2 === undefined) {
        return false;
    }
    return (string1.toUpperCase() === string2.toUpperCase());
};

kony.sdk.util.isNull = function (val) {
    if (val === null || val === undefined)
        return true;
    val = val + "";
    return (kony.sdk.util.matchIgnoreCase(val, "null"));
};

kony.sdk.util.isValidNumberType = function (val) {
    if (kony.sdk.util.matchIgnoreCase(typeof val, "number"))
        return true;
    else if (kony.sdk.util.matchIgnoreCase(typeof val, "string")
        && null != kony.sdk.util.toNumber(val))
        return true;
    else
        return false;

};

kony.sdk.util.toNumber = function (arg) {
    if (arguments.length != 1) {
        throw new Error("Invalid argument to kony.sdk.util.toNumber");
    }
    if (typeof (arg) === "number") {
        return arg;
    } else if (typeof (arg) === "string") {
        var str = arg.replace(/^\s*/, '').replace(/\s*$/, '');
        if (str === '') {
            return null;
        } else {
            var num = str - 0;
            return (isNaN(num) ? null : num);
        }
    } else {
        return null;
    }
};

kony.sdk.util.validateCriteriaObject = function (criteria) {
    if (criteria !== null && criteria !== undefined) {
        return (criteria instanceof kony.sdk.dto.Criteria || criteria instanceof kony.sdk.dto.Match
            || criteria instanceof kony.sdk.dto.Between
            || criteria instanceof kony.sdk.dto.LogicGroup || criteria instanceof kony.sdk.dto.And
            || criteria instanceof kony.sdk.dto.Or || criteria instanceof kony.sdk.dto.Not
            || criteria instanceof kony.sdk.dto.Expression
            || criteria instanceof kony.sdk.dto.InCriteria || criteria instanceof kony.sdk.dto.Exists
            || criteria instanceof kony.sdk.dto.Join);
    } else {
        return false;
    }
};

kony.sdk.ObjectServiceUtil.cacheMetadata = function (serviceName, objects) {
    if (objects !== undefined && objects !== null) {
        kony.sdk.nativestore.removeItem(serviceName);
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            //clearing the existing metadata of service and updating it with the latest metadata
            kony.sdk.ObjectServiceUtil.cacheObjectMetadata(serviceName, object);
        }
    }
};

kony.sdk.ObjectServiceUtil.cacheObjectMetadata = function (serviceName, object) {
    if (object !== undefined && object !== null) {
        //getting metadata of servicename
        var metadataOfAllObjs = kony.sdk.nativestore.getItem(serviceName);
        var jsonObject = JSON.parse('{}');
        //if metadata available get it
        if (metadataOfAllObjs !== null && metadataOfAllObjs !== undefined && metadataOfAllObjs !== "{}") {
            jsonObject = JSON.parse(metadataOfAllObjs);
        }
        //adding metadata of object to the existing metadata
        jsonObject[object.name] = object;
        var jsonStr = JSON.stringify(jsonObject);
        kony.sdk.nativestore.setItem(serviceName, jsonStr);
    }
};

kony.sdk.ObjectServiceUtil.getCachedMetadata = function (serviceName) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.ObjectServiceUtil.getCachedMetadata");

    var appMetadata = kony.sdk.util.getPackagedMetadata();
    if(appMetadata != null && appMetadata != undefined){
        if(serviceName != undefined && serviceName != null)
            return appMetadata[serviceName];
    }
    else{
        //reading metadata from the store
        var jsonObject = null;
        var metadataOfAllObjs = kony.sdk.nativestore.getItem(serviceName);
        if (metadataOfAllObjs !== null && metadataOfAllObjs !== undefined && metadataOfAllObjs !== "{}") {
            jsonObject = JSON.parse(metadataOfAllObjs);
        }
        return jsonObject;
    }
    return null;
};

kony.sdk.ObjectServiceUtil.getCachedObjectMetadata = function (serviceName, objectName) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.ObjectServiceUtil.getCachedObjectMetadata");
    var objectMetadata;
    if (objectName !== undefined && objectName !== null) {
        var metadataOfAllObjs = kony.sdk.ObjectServiceUtil.getCachedMetadata(serviceName);
        var jsonObject = null;
        if (metadataOfAllObjs !== null && metadataOfAllObjs !== undefined && metadataOfAllObjs !== "{}") {
            jsonObject = metadataOfAllObjs;
            //getting the object's metadata from the stored metadata
            objectMetadata = jsonObject[objectName];
        }
    }
    return objectMetadata;
};

// This function is responsible for checking if the array contains the object based on object's name property.
// returns the array element if the object matches
kony.sdk.util.getExtendedFieldsFromArray = function (array, object) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.getExtendedFieldsFromArray");
    if (array instanceof Array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] instanceof kony.sdk.dto.FieldMetadata && object instanceof kony.sdk.dto.Column) {
                if (kony.sdk.util.matchIgnoreCase(array[i].name, object.getName()) && kony.sdk.util.matchIgnoreCase(array[i].type, "extendedfield")) {
                    return array[i];
                }
            }
        }
        return null;
    }
};

/**
 * An object used to perform CRUD operations on objects
 * @param objectName
 * @param record
 * @constructor
 */
kony.sdk.dto.DataObject = function (objectName, record) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.DataObject");
    this.objectName = objectName;
    if (record != null && record != undefined) {
        this.record = record;
    } else {
        this.record = {};
    }

    this.odataUrl = null;
    this.selectQueryObject = null;
    this.offlineObjectsOptions = {};

    this.setOfflineObjectsOptions = function(offlineObjectsOptions) {
        this.offlineObjectsOptions = offlineObjectsOptions;
    };

    this.getOfflineObjectsOptions = function() {
        return this.offlineObjectsOptions;
    };

    /**
     * This function is used to add fields and their values to the dataobject
     * @param fieldName
     * @param value
     */
    this.addField = function (fieldName, value) {
        this.record[fieldName] = value;
    };

    /**
     * This function is used to set a map of records to the dataobject
     * @param fieldValuesMap
     */
    this.setRecord = function (fieldValuesMap) {
        this.record = fieldValuesMap;
    };

    /**
     * This function is used to get the map of records present in the DataObject
     * @returns {JSON} record
     */
    this.getRecord = function () {
        return this.record;
    };

    /**
     * This function is used to add a child Dataobject into the data object
     * @param  childDataObject {@link kony.sdk.dto.DataObject}
     */
    this.addChildDataObject = function (childDataObject) {
        if (this.record[childDataObject.objectName] == null || this.record[childDataObject.objectName] == undefined) {
            this.record[childDataObject.objectName] = [];
        }
        this.record[childDataObject.objectName].push(childDataObject.getRecord());
    };

    /**
     * This function is used to set the odata url to query
     * @param odataUrl
     */
    this.setOdataUrl = function (odataUrl) {
        this.odataUrl = odataUrl;
    };

    /**
     * This function is used to get the odata url to query
     * @returns {null}
     */
    this.getOdataUrl = function () {
        return this.odataUrl;
    };

    /**
     * This function is used to set a SelectQueryObject {@link kony.sdk.dto.SelectQuery}
     * @param selectQueryObject {@link kony.sdk.dto.SelectQuery}
     */
    this.setSelectQueryObject = function (selectQueryObject) {
        this.selectQueryObject = selectQueryObject;
    };

    /**
     * This function is used to get a SelectQueryObject {@link kony.sdk.dto.SelectQuery}
     * @returns selectQueryObject {@link kony.sdk.dto.SelectQuery}
     */
    this.getSelectQueryObject = function () {
        return this.selectQueryObject;
    };

    /**
     * This function is used to get the object name
     * @returns objectName {string}
     */
    this.getObjectName = function () {
        return this.objectName;
    };
};

/**
 * This Object represent picklist values
 * @constructor
 */
kony.sdk.dto.PickList = function () {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.PickList");

    this.id = null;
    this.active = null;
    this.label = null;
    this.value = null;
    this.validFor = null;
    this.defaultValue = null;
    this.fieldMappingId = null;

    this.setId = function (id) {
        this.id = id;
    }
    this.getId = function () {
        return this.id;
    }
    this.setActive = function (active) {
        this.active = active;
    }
    this.isActive = function () {
        return this.active;
    }
    this.setLabel = function (label) {
        this.label = label;
    }
    this.getLabel = function () {
        return this.label;
    }
    this.setValue = function (value) {
        this.value = value;
    }
    this.getValue = function () {
        return this.value;
    }
    this.setValidFor = function (validFor) {
        this.validFor = validFor;
    }
    this.getValidFor = function () {
        return this.validFor;
    }
    this.setDefaultValue = function (defaultValue) {
        this.defaultValue = defaultValue;
    }
    this.getDefaultValue = function () {
        return this.defaultValue;
    }
    this.setFieldMappingId = function (fieldMappingId) {
        this.fieldMappingId = fieldMappingId;
    }
    this.getFieldMappingId = function () {
        return this.fieldMappingId;
    }
}

/**
 * The structure of Object Metadata obtained from server
 * @constructor
 */
kony.sdk.dto.ObjectMetadata = function () {
    //variables to store metadata of the object.
    this.custom;
    this.customizable;
    this.displayName;
    this.entityTypeID;
    this.columns;
    this.junction;
    this.name;
    this.primaryKey;
    this.relationshipList;
    this.sourceEntityName;
    this.updateable;
    this.uniqueKeys;
}

/**
 * The structure of Field Metadata obtained from server
 * @constructor
 */
kony.sdk.dto.FieldMetadata = function () {
    this.auditColumn;
    this.createable;
    this.custom;
    this.customizable;
    this.type;
    this.defaultValue;
    this.displayName;
    this.fieldMappingId;
    this.hasIndex;
    this.name;
    this.nameField;
    this.nullable;
    this.primaryKey;
    this.sourceFieldName;
    this.table;
    this.updateable;

    // array of picklistValueDto objects to hold the pick list values. This will be populated only when the data type is of picklist type
    this.pickListValues;
}

/**
 * The structure of Object Relationship in metadata obtained from server
 * @constructor
 */
kony.sdk.dto.ObjectRelationship = function () {
    this.entityName;
    this.entityPageTemplateId;
    this.id;
    this.junctionTableName;
    this.operationType;
    this.relatedEntity;
    this.relationshipFields;
    this.relationshipName;
    this.relationshipType;
    this.custom;
}

/**
 * The Object used to define select query object, in order to fetch data
 * @param serviceName
 * @param tableObj {@link kony.sdk.dto.Table}
 * @constructor
 */
kony.sdk.dto.SelectQuery = function (serviceName, tableObj) {
    this.tables = [];
    this.columnList = [];
    this.criteriaList = [];
    this.isDistinct = false;
    this.orderList = [];
    this.joinList = [];
    this.groupList = [];
    this.limit = null;
    this.skip = null;
    this.oDataURL = null;
    if (tableObj instanceof kony.sdk.dto.Table) {
        this.tables.push(tableObj);
    }
    /**
     * This function is used to set Limit value
     * @param val
     */
    this.setLimit = function (val) {
        this.limit = val;
    };

    /**
     * This function is used to set Skip value
     * @param val
     */
    this.setSkip = function (val) {
        this.skip = val;
    };

    /**
     * This function is used to get the Limit Value
     * @returns {integer} limit
     */
    this.getLimit = function () {
        return this.limit;
    };

    /**
     * This function is used to get the Skip Value
     * @returns {integer} skip
     */
    this.getSkip = function () {
        return this.skip;
    };

    /**
     * This function is used to add a column object into the select query
     * @param columnObj {@Link kony.sdk.dto.Column}
     * @returns {Array}
     */
    this.addColumn = function (columnObj) {
        if (columnObj instanceof kony.sdk.dto.Column) {
            this.columnList.push(columnObj);
            return this.columnList;
        }
    };

    /**
     * This function is used to add a criteria object to the select query
     * @param criteriaObj
     * @returns {Array}
     */
    this.addCriteria = function (criteriaObj) {
        if (kony.sdk.util.validateCriteriaObject(criteriaObj)) {
            this.criteriaList.push(criteriaObj);
            return this.criteriaList;
        }
    };

    /**
     * This function is used to add a group object to select query
     * @param groupObj
     */
    this.addGroup = function (groupObj) {
        if (groupObj instanceof kony.sdk.dto.Group) {
            this.groupList.push(groupObj);
            for (var i = 0; i < this.tables.length; i++) {
                if (this.tables[i].getName().toUpperCase() === groupObj
                        .getColumn().getTable().getName().toUpperCase()) {
                    return;
                }
            }
            this.tables.push(groupObj.getColumn().getTable());
        }
    };

    /**
     * This function is used to add a join object
     * @param joinObj
     */
    this.addJoin = function (joinObj) {
        if (joinObj instanceof kony.sdk.dto.Join) {
            this.joinList.push(joinObj);
            for (var i = 0; i < this.tables.length; i++) {
                if (this.tables[i].getName().toUpperCase() === joinObj
                        .getTable().getName().toUpperCase()) {

                    if (this.tables[i].getAlias() != null
                        || joinObj.getTable().getAlias() != null
                        || this.tables[i].getAlias() != undefined
                        || joinObj.getTable().getAlias() != undefined) {
                        if (this.tables[i].getAlias().toUpperCase() === joinObj
                                .getTable().getAlias().toUpperCase()) {
                            return;
                        } else {
                            this.tables.push(joinObj.getTable());
                            return;
                        }
                    } else {
                        return;
                    }
                }
            }
            this.tables.push(joinObj.getTable());
        }
    };

    /**
     * This function is used to add order object to a select query
     * @param orderObj
     */
    this.addOrder = function (orderObj) {
        var currentobject = this;
        if (orderObj instanceof kony.sdk.dto.Order) {
            this.orderList.push(arguments[0]);
            for (var i = 0; i < this.tables.length; i++) {
                if (this.tables[i].getName().toUpperCase() === arguments[0]
                        .getColumn().getTable().getName().toUpperCase()) {
                    return;
                }
            }
            this.tables.push(orderObj.getColumn().getTable());
        }
    };

    /**
     * This function is used to return tables in select query
     * @returns {Array} Tables
     */
    this.getTables = function () {
        return this.tables;
    };

    /**
     * This function is used to get isDistinct flag
     * @returns {boolean}
     */
    this.getDistinct = function () {
        return this.isDistinct;
    };

    /**
     * This function is used to return columns in select query
     * @returns {Array} Columns
     */
    this.getColumns = function () {
        return this.columnList;
    };

    /**
     * This function is used to get criteria objects in the select query
     * @returns {Array} Criterias
     */
    this.getCriterias = function () {
        return this.criteriaList;
    };

    /**
     * This function is used to get the group objects in the select query
     * @returns {Array} GroupObjs
     */
    this.getGroups = function () {
        return this.groupList;
    };

    /**
     * This function is used to get the Join objects in the select query
     * @returns {Array} Joins
     */
    this.getJoins = function () {
        return this.joinList;
    };

    /**
     * This function is used to get the Order Objects in the select query
     * @returns {Array} OrderObjs
     */
    this.getOrders = function () {
        return this.orderList;
    };

    /**
     * This function is used to remove columnobject set in select query
     * @param columnObj {@link kony.sdk.dto.Column}
     */
    this.removeColumn = function (columnObj) {
        if (columnObj instanceof kony.sdk.dto.Column) {
            this.columnList.splice(this.columnList.indexOf(columnObj), 1);
        }
    };

    /**
     * This function is used to remove criteriaObject from select query
     * @param criteriaObj
     */
    this.removeCriteria = function (criteriaObj) {
        if (criteriaObj instanceof Criteria) {
            this.criteriaList.splice(this.criteriaList.indexOf(criteriaObj), 1);
        }
    };

    /**
     * This function is used to remove group set from select query
     * @param groupObj
     */
    this.removeGroup = function (groupObj) {
        if (groupObj instanceof kony.sdk.dto.Group) {
            this.groupList.splice(this.groupList.indexOf(groupObj), 1);
        }
    };

    /**
     * This function is used to remove Join set in select query
     * @param joinObj
     */
    this.removeJoin = function (joinObj) {
        if (joinObj instanceof kony.sdk.dto.Criteria) {
            this.joinList.splice(this.joinList.indexOf(joinObj), 1);
        }
    };

    /**
     * This function is used to remove OrderObj set in SelectQuery
     * @param orderObj
     */
    this.removeOrder = function (orderObj) {
        if (orderObj instanceof kony.sdk.dto.Order) {
            this.orderList.splice(this.orderList.indexOf(orderObj), 1);
        }
    };

    /**
     * This function is used to set isDistinct
     * @param isDistinct
     */
    this.setDistinct = function (isDistinct) {
        this.isDistinct = isDistinct;
    };

    /**
     * This function is used to get the select query in the form of a string
     * @returns {string}
     */
    this.toString = function () {
        var selectQueryDto = this;
        var query = "";
        query = query + "SELECT ";
        if (this.getDistinct() == true || this.getDistinct() == "true") {
            query = query + " DISTINCT ";
        }

        // Fetch the metadata for the base table and see if there are any extended fields associated with it
        // If there are any, create a join between the base table and the corresponding parent table and fetch it

        var columns = this.columnList;
        var extendedFields = [];
        var columnsArr = [];
        var extendedJoins = [];
        var baseTable = this.getTables()[0];
        var objectMetadata = kony.sdk.ObjectServiceUtil.getCachedObjectMetadata(serviceName, baseTable.getName());

        if (columns.length !== 0) {
            var field = null;
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                field = kony.sdk.util.getExtendedFieldsFromArray(objectMetadata.columns, columns[colIndex]);
                if (field !== null && field !== undefined) {
                    selectQueryDto.columnList[colIndex].dataType = field.type;
                    selectQueryDto.columnList[colIndex].parentFieldName = field.parentFieldName;
                    extendedFields.push(field);
                    field = null;
                } else {
                    columnsArr.push(columns[colIndex]);
                }
            }
        } else {
            var col = null;
            var field = null;
            for (var colIndex = 0; colIndex < objectMetadata.columns.length; colIndex++) {
                field = objectMetadata.columns[colIndex];
                col = new kony.sdk.dto.Column(baseTable, field.name);
                col.dataType = field.type;
                col.parentFieldName = field.parentFieldName;
                selectQueryDto.columnList.push(col);
                if (field !== null && field !== undefined && kony.sdk.util.matchIgnoreCase(field.type, "extendedfield")) {
                    extendedFields.push(field);
                    field = null;
                } else {
                    columnsArr.push(columns[colIndex]);
                }
            }
        }

        var columnStr = selectQueryDto.appendListToQuery(columnsArr, ", ", 0);

        if (columnStr !== null && columnStr !== "") {
            query = query + columnStr;
        }
        //TODO have to modify the code based on latest metadata
        if (extendedFields !== null && extendedFields !== undefined && extendedFields.length !== 0) {
            var join = null;
            var table = null;
            var srcCol = null;
            var destCol = null;
            var joinType = kony.sdk.constants.JoinType.LEFT;
            var col = null;
            var colList = [];
            var extendedTablesAdded = {};
            for (var extIndex = 0; extIndex < extendedFields.length; extIndex++) {

                if (extendedTablesAdded !== null && extendedTablesAdded.hasOwnProperty(extendedFields[extIndex].parentTableName)) {
                    extendedTablesAdded["" + extendedFields[extIndex].parentTableName] = ++extendedTablesAdded["" + extendedFields[extIndex].parentTableName];
                } else {
                    extendedTablesAdded["" + extendedFields[extIndex].parentTableName] = 0;
                }
                table = new kony.sdk.dto.Table(extendedFields[extIndex].parentTableName);
                // Now add all extended field columns to the query
                col = new kony.sdk.dto.Column(table, extendedFields[extIndex].parentFieldName);

                colList.push(col);
                // Need to fetch the source table's primary key name from the metadata. For now hard coding it to 'id'
                //TODO
                srcCol = new kony.sdk.dto.Column(baseTable, extendedFields[extIndex].foreignKeyFieldName);
                destCol = new kony.sdk.dto.Column(table, extendedFields[extIndex].referencedField || "id");

                join = new kony.sdk.dto.Join(table, srcCol, destCol, joinType);
                if (join !== null && join !== undefined && extendedTablesAdded["" + extendedFields[extIndex].parentTableName] === 0) {
                    extendedJoins.push(join);
                }
            }
            var extColStr = "";
            for (var i = 0; i < colList.length; i++) {
                extColStr = extColStr + colList[i].toString();
                if (i < colList.length - 1) {
                    extColStr = extColStr + ",";
                }
            }

            if (extColStr !== null && extColStr !== "") {
                query = query + "," + extColStr;
            }
            if (extendedJoins !== null && extendedJoins !== undefined) {
                for (var joinIndex = 0; joinIndex < extendedJoins.length; joinIndex++) {
                    selectQueryDto.addJoin(extendedJoins[joinIndex]);
                }
            }
        }
        query = query + " FROM ";
        query = query + selectQueryDto.getTables()[0].toString();

        if (selectQueryDto.getJoins().length !== 0) {
            var joinStr = selectQueryDto.appendListToQuery(selectQueryDto.joinList, " ", -1);
            query = query + joinStr;
        }
        if (!(selectQueryDto.criteriaList.length == 0)) {
            query = query + " WHERE ";
            query = query
                + selectQueryDto.appendListToQuery(selectQueryDto.criteriaList, " AND ", -1);
        }
        if (!(selectQueryDto.groupList.length == 0)) {
            query = query + " GROUP BY ";
            query = query + selectQueryDto.appendListToQuery(selectQueryDto.groupList, ", ", -1);
        }
        if (!(selectQueryDto.orderList.length == 0)) {
            query = query + " ORDER BY ";
            query = query + selectQueryDto.appendListToQuery(selectQueryDto.orderList, " ,", -1);
        }
        if (selectQueryDto.limit !== null && selectQueryDto.limit !== undefined
            && kony.sdk.util.isValidNumberType(selectQueryDto.limit) && selectQueryDto.limit !== 0) {
            query = query + " LIMIT " + selectQueryDto.limit;
        }
        if (selectQueryDto.skip !== null && selectQueryDto.skip !== undefined
            && kony.sdk.util.isValidNumberType(selectQueryDto.skip) && selectQueryDto.skip !== 0) {
            query = query + " OFFSET " + selectQueryDto.skip;
        }
        return query;
    };

    this.appendListToQuery = function (objectList, seperator, mode) {
        kony.sdk.logsdk.trace("Entering into kony.sdk.dto.appendListToQuery");
        var listBuffer = "";
        for (var i = 0; i < objectList.length; i++) {
            var obj = objectList[i];
            if (mode > -1) {
                if (obj !== null) {
                    if (obj instanceof kony.sdk.dto.Column) {
                        listBuffer = listBuffer.concat(obj.toString());
                    } else {
                        listBuffer = listBuffer.concat(obj.toString());
                    }
                }
            } else if (obj !== null && obj !== undefined) {
                listBuffer = listBuffer.concat(obj.toString());
            }
            if (i < objectList.length - 1) {
                listBuffer = listBuffer.concat(seperator);
            }
        }
        return listBuffer;
    };
};

/**
 * This object is used to define a record object used in Offline CRUD
 * @constructor
 */
kony.sdk.dto.RecordObject = function () {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.RecordObject");
    this.tableName = "";
    this.columnValues = {};
    this.childRecords = [];
};

/**
 * This function is the Table constructor.
 * @param tableName
 * @param tableAlias
 * @param junctionType
 * @constructor
 */
kony.sdk.dto.Table = function (tableName, tableAlias, junctionType) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.Table");
    this.name = tableName;
    this.alias = tableAlias;
    this.isjunction = junctionType;

    this.getAlias = function () {
        return this.alias;
    };
    /**
     * This function is used to set alias.
     *
     * @param alias
     */
    this.setAlias = function (alias) {
        this.alias = alias;
    };
    this.getName = function () {
        return this.name;
    };
    /**
     * This function is used to set name.
     *
     * @param name
     */
    this.setName = function (name) {
        this.name = name;
    };
    /**
     * This function is used to check object equality.
     *
     * @param obj
     * @return Boolean
     */
    this.equals = function (obj) {
        var areObjectsEqual = false;
        if (obj === null || obj === undefined) {
            areObjectsEqual = false;
        } else if (typeof (this) === typeof (obj)) {
            areObjectsEqual = true;

            if (this.hasAlias() && obj.hasAlias()) {
                areObjectsEqual = this.getAlias() === obj.getAlias();
            } else {
                areObjectsEqual = this.getName() === obj.getName();
            }
        } else {
            areObjectsEqual = false;
        }
        return areObjectsEqual;
    };
    this.getColumn = function (columnName) {
        return new kony.sdk.dto.Column(this, columnName);
    };
    /**
     * This function is used to check if alias is present or not.
     *
     * @return Boolean
     */
    this.hasAlias = function () {
        return (this.alias !== null && this.alias !== undefined);
    };
    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        return this.getName() + (this.hasAlias() ? " " + this.getAlias() : "");
    };
    /**
     * This function is used to return if the table is a junction table.
     *
     * @return boolean
     */
    this.isJunction = function () {
        return (this.isjunction && this.isjunction == true);
    };
    /**
     * This function is used to set the type of table junction/non-junction table.
     *
     * @param junctionType
     */
    this.setJunction = function (junctionType) {
        this.isjunction = junctionType;
    };
};

/**
 * This function is a Column constructor
 * @param tableObj {@link kony.sdk.dto.Table}
 * @param colName
 * @constructor
 */
kony.sdk.dto.Column = function (tableObj, colName) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.Column");
    if (tableObj instanceof kony.sdk.dto.Table) {
        this.aggregation = null;
        this.alias = null;
        this.dataType = null;
        this.name = null;
        this.table = null;

        if (colName !== undefined && colName !== null
            && typeof (colName) === "string") {
            this.name = colName;
        } else {
            //TODO
            //throw error

            kony.sdk.logsdk.error("### kony.sdk.dto.Column:: Error: colName is undefined");
        }
        this.table = tableObj;
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Column:: Error: tableObj is not an instance of kony.sdk.dto.Table");
    }

    this.getAggregation = function () {
        return this.aggregation;
    };
    this.setAggregation = function (aggregation) {
        this.aggregation = aggregation;
    };
    this.getAlias = function () {
        return this.alias;
    };
    this.setAlias = function (alias) {
        this.alias = alias;
    };
    this.getDataType = function () {
        return this.dataType;
    };
    this.setDataType = function (dataType) {
        this.dataType = dataType;
    };
    this.isComputedField = function () {
        return this.fieldComputed;
    };
    this.setComputedField = function (fieldComputed) {
        this.fieldComputed = fieldComputed;
    };
    this.getName = function () {
        return this.name;
    };
    this.setName = function (name) {
        if (name !== undefined && name !== null && typeof (name) === "string") {
            this.name = name;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Column::setName:: Error: name is undefined");
        }
    };
    this.getTable = function () {
        return this.table;
    };
    this.setTable = function (table) {
        if (table instanceof kony.sdk.dto.Table) {
            this.table = table;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Column:: Error: setTable is undefined");
        }
    };
    this.toStringByMode = function (mode) {
        var tableName = (this.getTable().getAlias() !== null && this.getTable()
            .getAlias() !== undefined) ? this.getTable().getAlias() : this
            .getTable().getName();
        var constructedColumn = null;
        var constructDataType = null;
        var constructAlias = null;
        var constructAggregation = null;

        switch (mode) {
            case 0:
                if (this.getDataType() !== null && this.getDataType() !== undefined) {
                    if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Integer")) {
                        constructDataType = "CAST (" + tableName + "."
                            + this.getName() + " AS INTEGER)";
                    } else if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Numeric")) {
                        constructDataType = "CAST (" + tableName + "."
                            + this.getName() + " AS NUMERIC)";

                    } else if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Date")) {

                        constructDataType = "date(" + tableName + "."
                            + this.getName() + ")";

                    } else {
                        constructDataType = tableName + "." + this.getName();
                    }
                } else {
                    constructDataType = tableName + "." + this.getName();
                }
                constructAlias = (this.getAlias() !== null
                    && this.getAlias() !== undefined && this.getAlias() !== "") ? " AS "
                    + this.getAlias()
                    : "";
                constructAggregation = (this.getAggregation() === kony.sdk.constants.Aggregation.NONE || (this
                    .getAggregation() === null || this.getAggregation() === undefined)) ? constructDataType
                    : (this.isComputedField() ? this.getAggregation() : this.getAggregation() + "(" + constructDataType + ")" );
                constructedColumn = constructAggregation + constructAlias;
                break;
            case 1:
                if (this.getDataType() !== null && this.getDataType() !== undefined) {
                    if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "STRING"))
                        this.setDataType("text");
                }
                constructDataType = (this.getDataType() !== null && this
                    .getDataType() !== undefined) ? "CAST (" + tableName + "."
                    + this.getName() + " AS " + this.getDataType() + ")"
                    : tableName + "." + this.getName();
                constructAggregation = (this.getAggregation() === kony.sdk.constants.Aggregation.NONE || (this
                    .getAggregation() === null || this.getAggregation() === undefined)) ? constructDataType
                    : (this.isComputedField() ? this.getAggregation() : this.getAggregation() + "(" + constructDataType + ")" );
                constructedColumn = constructAggregation;
                break;
            case 2:
                constructedColumn = this.getName();
                break;
            case 3:
                constructedColumn = this.getName();
                break;
            default:
                if (this.getDataType() !== null && this.getDataType() !== undefined) {
                    if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "STRING"))
                        this.setDataType("text");
                }
                constructDataType = (this.getDataType() !== null && this
                    .getDataType() !== undefined) ? "CAST (" + tableName + "."
                    + this.getName() + " AS " + this.getDataType() + ")"
                    : tableName + "." + this.getName();
                constructAlias = (this.getAlias() !== null && this.getAlias() !== undefined) ? " AS "
                    + this.getAlias()
                    : "";
                constructAggregation = (this.getAggregation() === kony.sdk.constants.Aggregation.NONE || (this
                    .getAggregation() === null || this.getAggregation() === undefined)) ? constructDataType
                    : (this.isComputedField() ? this.getAggregation() : this.getAggregation() + "(" + constructDataType + ")" );
                constructedColumn = constructAggregation + constructAlias;
                break;
        }
        return constructedColumn;
    };
    this.toString = function () {
        // To be removed later from here
        if (this.getDataType() !== null && this.getDataType() !== undefined) {
            if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "STRING"))
                dataType = "text";
        }
        var tableName = (this.getTable().getAlias() !== null
            && this.getTable().getAlias() !== undefined && this.getTable()
                .getAlias() !== "") ? this.getTable().getAlias() : this
            .getTable().getName();
        var constructedColumn = null;
        var constructDataType = null;
        var constructAggregation = null;
        if (this.getDataType() !== null && this.getDataType() !== undefined) {
            if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Integer")) {
                constructDataType = "CAST (" + tableName + "." + this.getName()
                    + " AS INTEGER)";
            } else if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Numeric")) {
                constructDataType = "CAST (" + tableName + "." + this.getName()
                    + " AS NUMERIC)";
            } else if (kony.sdk.util.matchIgnoreCase(this.getDataType(), "Date")) {
                constructDataType = "date(" + tableName + "." + this.getName()
                    + ")";
            } else {
                if (!this.isComputedField())
                    constructDataType = tableName + "." + this.getName();
            }
        } else {
            if (!this.isComputedField())
                constructDataType = tableName + "." + this.getName();
        }
        var constructAlias = (this.getAlias() !== null
            && this.getAlias() !== undefined && this.getAlias() !== "") ? " AS "
            + this.getAlias()
            : "";
        constructAggregation = (this.getAggregation() === kony.sdk.constants.Aggregation.NONE || (this
            .getAggregation() === null || this.getAggregation() === undefined)) ? constructDataType
            : (this.isComputedField() ? this.getAggregation() : this.getAggregation() + "(" + constructDataType + ")" );

        constructedColumn = constructAggregation + constructAlias;
        return constructedColumn;
    };

    this.toStringByTablePrefix = function (includeTablePrefix) {
        if (includeTablePrefix) {
            return this.toString();
        } else {
            return this.getName();
        }
    }
};

/**
 * This Object represents a groupby clause in select query
 * @param columnObj {@link kony.sdk.dto.Column}
 * @constructor
 */
kony.sdk.dto.Group = function (columnObj) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.Group");
    if (columnObj instanceof kony.sdk.dto.Column) {
        this.column = columnObj;
    }

    this.getColumn = function () {
        return this.column;
    };
    this.setColumn = function (column) {
        if (column instanceof kony.sdk.dto.Column) {
            this.column = column;
        }
    };
    this.toString = function () {
        var tableName = (this.column.getTable().getAlias() !== null && this.column
            .getTable().getAlias() !== undefined) ? this.column.getTable()
            .getAlias() : this.column.getTable().getName();
        return tableName + "." + this.column.getName();
    };
};

/**
 * This Object represents JOINS used in kony.sdk.dto.SelectQuery
 * @constructor
 */
kony.sdk.dto.Join = function () {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.Join");
    this.criteria;
    this.table;
    this.joinType;
    var currentObject = this;

    if (arguments.length === 3) {
        getJoinByTableCriteriaAndJoinType(arguments[0],
            arguments[1], arguments[2]);
    } else if (arguments.length === 4) {
        getJoinByDestTableAndSrcColumnAndDestColumnAndJoinType(
            arguments[0], arguments[1], arguments[2],
            arguments[3]);
    }

    /**
     * This function is the Join constructor which has 3 arguments.
     *
     * @param table
     * @param criteria
     * @param joinType
     */
    function getJoinByTableCriteriaAndJoinType(table, criteria,joinType) {
        kony.sdk.logsdk.trace("Entering into getJoinByTableCriteriaAndJoinType");

        if (table instanceof kony.sdk.dto.Table
            && kony.sdk.util.validateCriteriaObject(criteria)
            && joinType !== null
            && joinType !== undefined
            && (joinType === kony.sdk.constants.JoinType.INNER || joinType === kony.sdk.constants.JoinType.LEFT)) {
            currentObject.table = table;
            currentObject.joinType = joinType;
            currentObject.criteria = criteria;
            return currentObject;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Join::getJoinByTableCriteriaAndJoinType:: Error: Validation error at getJoinByTableCriteriaAndJoinType");
        }
    }

    /**
     * This function is the Join constructor which has 4 arguments.
     *
     * @param destTable
     * @param srcColumn
     * @param destColumn
     * @param joinTypeObj
     */
    function getJoinByDestTableAndSrcColumnAndDestColumnAndJoinType(destTable, srcColumn, destColumn, joinTypeObj) {
        kony.sdk.logsdk.trace("Entering into getJoinByDestTableAndSrcColumnAndDestColumnAndJoinType");
        if (destTable instanceof kony.sdk.dto.Table
            && srcColumn instanceof kony.sdk.dto.Column
            && destColumn instanceof kony.sdk.dto.Column
            && joinTypeObj !== null
            && joinTypeObj !== undefined
            && joinTypeObj !== ''
            && (joinTypeObj === kony.sdk.constants.JoinType.INNER || joinTypeObj === kony.sdk.constants.JoinType.LEFT)) {
            currentObject.table = destTable;
            currentObject.joinType = joinTypeObj;
            var criteria = new kony.sdk.dto.Match(srcColumn, kony.sdk.constants.MatchType.EQUALS,
                destColumn);
            currentObject.criteria = criteria;
            return currentObject;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Join::getJoinByDestTableAndSrcColumnAndDestColumnAndJoinType:: Error: Validation error at getJoinByDestTableAndSrcColumnAndDestColumnAndJoinType");
        }
    }

    this.getCriteria = function () {
        return this.criteria;
    };

    this.setCriteria = function (criteria) {
        if (kony.sdk.util.validateCriteriaObject(criteria)) {
            this.criteria = criteria;
        }
    };
    this.getTable = function () {
        return this.table;
    };

    this.setTable = function (table) {
        if (table instanceof kony.sdk.dto.Table) {
            this.table = table;
        }
    };
    this.getJoinType = function () {
        return this.joinType;
    };

    this.setJoinType = function (joinType) {
        if (joinType !== null) {
            this.joinType = joinType;
        }
    };

    this.initCriteria = function (srcColumn, destColumn) {

        if ((srcColumn instanceof kony.sdk.dto.Column)
            && (destColumn instanceof kony.sdk.dto.Column)) {
            var criteria = new kony.sdk.dto.Match(srcColumn, kony.sdk.constants.MatchType.EQUALS,
                destColumn);
            this.setCriteria(criteria);
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Join::initCriteria:: Error: srcColumn or destColumn is not an isntanceof kony.sdk.dto.Column");
        }
    };

    this.toString = function () {
        var returnString = null;
        var temp = null;
        var join;
        if (kony.sdk.constants.JoinType.INNER == this.getJoinType()) {
            join = "INNER";
        } else if (kony.sdk.constants.JoinType.LEFT == this.getJoinType()) {
            join = "LEFT";
        } else if (kony.sdk.constants.JoinType.RIGHT == this.getJoinType()) {
            join = "RIGHT";
        }
        returnString = " " + join + " JOIN "
            + this.getTable().toString() + " ON ";
        temp = this.getCriteria().toString();
        returnString = returnString + temp;
        return returnString;
    };
};

/**
 * This function is the Order constructor.
 * @param columnObj
 * @param orderTypeObj
 */
kony.sdk.dto.Order = function (columnObj, orderTypeObj) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.Order");
    if ((columnObj instanceof kony.sdk.dto.Column)
        && (orderTypeObj == kony.sdk.constants.OrderType.ASCENDING || orderTypeObj == kony.sdk.constants.OrderType.DESCENDING)) {
        this.column = columnObj;
        this.type = orderTypeObj;
        return this;
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Order:: Error: Validation error")
    }

    this.getColumn = function () {
        return this.column;
    };

    /**
     * This function is used to set column.
     *
     * @param column
     */
    this.setColumn = function (column) {
        if (column instanceof kony.sdk.dto.Column) {
            this.column = column;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Order::setColumn: Error: column is not an instance of kony.sdk.dto.Column");
        }

    };
    this.getType = function () {
        return this.type;
    };

    /**
     * This function is used to set type.
     *
     * @param type
     */
    this.setType = function (type) {
        this.type = type;
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        return this.column.toString() + " " + (this.type);
    };
};

/**
 * This function is used to check the range of values of columnObj
 * @param columnObj {@link kony.sdk.dto.Column}
 * @param colRange
 * @constructor
 */
kony.sdk.dto.Between = function (columnObj, colRange) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.Between");
    this.column;
    this.range;

    if (columnObj instanceof kony.sdk.dto.Column
        && (colRange instanceof kony.sdk.dto.DateRange
            || colRange instanceof kony.sdk.dto.StringRange
            || colRange instanceof kony.sdk.dto.IntegerRange || colRange instanceof kony.sdk.dto.FloatRange)) {
        this.column = columnObj;
        this.range = colRange;
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Between:: Error: Vaildation error");
    }


    this.quote = function (str) {
        if (kony.sdk.util.isNull(str)) {
            return "null";
        }
        // var str1 = new String(str);
        var strBuf = [];
        strBuf.push('\'');
        for (var index = 0; index < str.length; index++) {
            var charItem = str.charAt(index);
            if (charItem == '\\' || charItem == '\"'
                || charItem == '\'') {
                // strBuf.concat('\\');
                strBuf.push('\\');
            }
            strBuf.push(charItem);
        }
        strBuf.push('\'');
        return strBuf.join("");
    };

    this.setColumn = function (column) {
        if (column instanceof kony.sdk.dto.Column) {
            this.column = column;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Between::setColumn: Error:column is not an instance of kony.sdk.dto.Column");
        }
    };

    this.setRange = function (range) {
        if (range instanceof kony.sdk.dto.DateRange || range instanceof kony.sdk.dto.StringRange
            || range instanceof kony.sdk.dto.IntegerRange
            || range instanceof kony.sdk.dto.FloatRange) {
            this.range = range;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Between::setRange: Error: Validation Error");
        }
    };
    this.getColumn = function () {
        return this.column;
    };
    this.getRange = function () {
        return this.range;
    };
    this.toString = function () {
        var returnStr = "";
        returnStr = this.getColumn().toString() + " Between "
            + this.getRange().toString();
        return returnStr;
    };
};

/**
 * This function is the DateRange constructor.
 * @param startDate
 * @param endDate
 */
kony.sdk.dto.DateRange = function () {
    this.end;
    this.start;
    if (arguments.length === 2) {
        var startDate = arguments[0];
        var endDate = arguments[1];
        if (startDate instanceof Date && endDate instanceof Date) {
            this.start = startDate;
            this.end = endDate;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.DataRange:: Error: startDate or endDate is not an instance of Date");
        }
    } else if (arguments.length === 1) {
        var dateType = arguments[0];
        if (kony.sdk.util.validateDateTypeInput(dateType)) {
            var range = kony.sdk.util.getDateRange(dateType);
            if (range.length !== 2 || range[0] === 0 || range[1] === 0) {
                //TODO
                //throw error
                kony.sdk.logsdk.error("### kony.sdk.dto.DateRange:: Error: Validation Error");
            } else {
                this.start = range[0];
                this.end = range[1];
            }
        }
    }

    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end instanceof Date) {
            var month = end.getMonth() + 1;
            var date = end.getDate();
            var hr = end.getHours();
            var min = end.getMinutes();
            var sec = end.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            if (hr < 10) {
                hr = "0" + hr;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            var endDate = end.getFullYear() + "-" + month + "-" + date + " "
                + hr + ":" + min + ":" + sec;
            this.end = endDate;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.DateRange::setEnd:: Error: end is not an instance of Date");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start instanceof Date) {
            var month = start.getMonth() + 1;
            var date = start.getDate();
            var hr = start.getHours();
            var min = start.getMinutes();
            var sec = start.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            if (hr < 10) {
                hr = "0" + hr;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            var startDate = start.getFullYear() + "-" + month + "-" + date
                + " " + hr + ":" + min + ":" + sec;
            this.start = startDate;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.DateRange::setStart:: Error: start is not an instance of Date");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        returnString = "'" + this.start + "'" + " AND " + "'" + this.end + "'";
        return returnString;
    };
};

/**
 * This function is the DecimalRange constructor.
 * @param startDecimal
 * @param endDecimal
 */
kony.sdk.dto.DecimalRange = function (startDecimal, endDecimal) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.DecimalRange");
    if ((endDecimal !== null && endDecimal !== undefined && typeof endDecimal === 'number')
        && (startDecimal !== null && startDecimal !== undefined && typeof startDecimal === 'number')) {
        this.end = endDecimal;
        this.start = startDecimal;
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.DecimalRange:: Error: Validation Error");
    }


    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end !== null && end !== undefined && typeof end === 'number') {
            this.end = end;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.DecimalRange::setEnd:: Error: Validation Error");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start !== null && start !== undefined && typeof start === 'number') {
            this.start = start;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.DecimalRange::setStart:: Error: Validation Error");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        returnString = this.start + " AND " + this.end;
        return returnString;
    };
};

/**
 * This function is the FloatRange constructor.
 * @param startFloat
 * @param endFloat
 */
kony.sdk.dto.FloatRange = function (startFloat, endFloat) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.FloatRange");
    this.end = endFloat;
    this.start = startFloat;

    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end !== null && end !== undefined && typeof end === 'number') {
            this.end = end;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.FloatRange::setEnd:: Error: Validation Error");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start !== null && start !== undefined && typeof start === 'number') {
            this.start = start;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.FloatRange::setStart:: Error: Validation Error");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        returnString = this.start + " AND " + this.end;
        return returnString;
    };
};

/**
 * This function is the IntegerRange constructor.
 * @param startInt
 * @param endInt
 */
kony.sdk.dto.IntegerRange = function (startInt, endInt) {
    if ((endInt !== null && endInt !== undefined && typeof endInt === 'number')
        && (startInt !== null && startInt !== undefined && typeof startInt === 'number')) {
        this.end = endInt;
        this.start = startInt;

    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.IntegerRange:: Error: Validation Error");
    }


    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end !== null && end !== undefined && typeof end === 'number') {
            this.end = end;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.IntegerRange::setEnd:: Error: Validation Error");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start !== null && start !== undefined && typeof start === 'number') {
            this.start = start;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.IntegerRange::setStart:: Error: Validation Error");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        returnString = this.start.toFixed() + " AND " + this.end.toFixed();
        return returnString;
    };
};

/**
 * This function is the StringRange constructor.
 * @param startString
 * @param endString
 */
kony.sdk.dto.StringRange = function (startString, endString) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.StringRange");
    if ((endString !== null && endString !== undefined && typeof endString === 'string')
        && (startString !== null && startString !== undefined && typeof startString === 'string')) {
        this.end = endString;
        this.start = startString;
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.StringRange:: Error: Validation Error");
    }


    this.getEnd = function () {
        return this.end;
    };

    /**
     * This function is used to set End value.
     *
     * @param end
     */
    this.setEnd = function (end) {
        if (end !== null && end !== undefined && typeof end === 'string') {
            this.end = end;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.StringRange::setEnd:: Error: Validation Error");
        }
    };

    this.getStart = function () {
        return this.start;
    };

    /**
     * This function is used to set start value.
     *
     * @param start
     */
    this.setStart = function (start) {
        if (start !== null && start !== undefined && typeof start === 'string') {
            this.start = start;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.StringRange::setStart:: Error: Validation Error");
        }
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var returnString = null;
        var crit = new kony.sdk.dto.Criteria();
        returnString = crit.quote(this.start) + " AND " + crit.quote(this.end);
        return returnString;
    };
};

/**
 * This function helps in preparing And {@link kony.sdk.dto.And} and Or {@Link kony.sdk.dto.Or} clauses
 * @param operatorLg
 * @param leftOp
 * @param rightOp
 * @constructor
 */
kony.sdk.dto.LogicGroup = function (operatorLg, leftOp, rightOp) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.LogicGroup");
    this.left = leftOp;
    this.operator = operatorLg;
    this.right = rightOp;


    /**
     * This function is used to initialize LogicGroup.
     *
     * @param operator
     * @param left
     * @param right
     */
    this.initializeLogicGroup = function (operator, left, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    };

    this.getLeft = function () {
        return this.left;
    };

    /**
     * This function is used to set left.
     *
     * @param val
     */
    this.setLeft = function (val) {
        this.val = val;
    };
    this.getOperator = function () {
        return this.operator;
    };

    /**
     * This function is used to set Operator.
     *
     * @param val
     */
    this.setOperator = function (val) {
        this.operator = val;
    };
    this.getRight = function () {
        return this.right;
    };

    /**
     * This function is used to set Right.
     *
     * @param val
     */
    this.setRight = function (val) {
        this.right = val;
    };

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        var leftOperator = (this.getLeft() !== null && this.getLeft !== undefined) ? this
                .getLeft().toString()
            : "";
        var rightOperator = (this.getRight() !== null && this
            .getRight() !== undefined) ? this.getRight().toString()
            : "";
        return "(" + leftOperator + " " + this.getOperator() + " "
            + rightOperator + ")";
    };
};

/**
 * This function is the And constructor.
 *
 * @param left
 * @param right
 */
kony.sdk.dto.And = function (left, right) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.And");
    if (arguments.length !== 2) {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.And:: Error: invalid number of arguments, expected are left and right");
    }
    if ((right !== null && left !== null && right !== undefined
            && left !== undefined
            && kony.sdk.util.validateCriteriaObject(left) && kony.sdk.util.validateCriteriaObject(right))) {
        kony.sdk.dto.LogicGroup.call(this, 'AND', left, right);
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.And:: Error: Validation Error");
    }


    this.initializeAnd = function (left, right) {
        kony.sdk.dto.LogicGroup.call(this, 'AND', left, right);
    };
};

/**
 * This function is the Or constructor.
 *
 * @param left
 * @param right
 */
kony.sdk.dto.Or = function (left, right) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.Or");
    if (arguments.length !== 2) {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Or:: Error: invalid number of arguments, expected are left and right");
    }
    if ((right !== null && left !== null && right !== undefined
            && left !== undefined
            && kony.sdk.util.validateCriteriaObject(left) && kony.sdk.util.validateCriteriaObject(right))) {
        kony.sdk.dto.LogicGroup.call(this, 'OR', left, right);
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Or:: Error: Validation Error");
    }

    this.initializeOr = function (left, right) {
        kony.sdk.dto.LogicGroup.call(this, 'OR', left, right);
    };
};

/**
 * This function is the Not constructor.
 *
 * @param right
 */
kony.sdk.dto.Not = function (right) {
    if (arguments.length !== 1) {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Not:: Error: invalid number of arguments, expected right");
    }
    if (right !== null && right !== undefined
        && kony.sdk.util.validateCriteriaObject(right)) {
        kony.sdk.dto.LogicGroup.call(this, 'NOT', null, right);
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Not:: Error: Validation Error");
    }


    this.initializeNot = function (right) {
        kony.sdk.dto.LogicGroup.call(this, 'NOT', null, right);
    };
};

/**
 * This function is a constructor for Expression Object
 * @constructor
 */
kony.sdk.dto.Expression = function () {
    this.term;
    this.operator;
    this.expression;
    var currentExpObj = this;
    if (arguments.length === 1) {
        if (kony.sdk.util.validateCriteriaObject(arguments[0])) {
            setTerm(arguments[0]);
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Expression:: Error: Validation Error");
        }
    } else if (arguments.length === 2) {
        initExpression(arguments[0], arguments[1]);
    } else if (arguments.length === 3) {
        initExpressionByExpression(arguments[0], arguments[1],
            arguments[2]);
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Expression:: Error: invalid number of arguments, atleast 'term' is expected");
    }

    /**
     * Recursively generates a Expression from a given list of
     * criteria and an infix operator to join each criteria with the
     * next in the list. Operator AND or Operator OR that joins each
     * criteria term with the next in the list.
     *
     * @param criterias
     *            the list of criteria terms from which the
     *            constructor generates the new criteria expression.
     * @param operator
     *            the infix operator
     */
    function initExpression(criterias, operator) {
        if (operator === kony.sdk.constants.Operator.OR) {
            setOperator(kony.sdk.constants.Operator.OR);
        } else if (operator === kony.sdk.constants.Operator.AND) {
            setOperator(kony.sdk.constants.Operator.AND);
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Expression::initExpression:: Error: Invalid Operator");
        }
        if (criterias !== null && criterias !== undefined
            && criterias instanceof Array
            && criterias.length > 0) {
            if (kony.sdk.util.validateCriteriaObject(criterias[0])) {
                setTerm(criterias[0]);
            }
            if (criterias.length > 1) {
                var tmpOperator = operator;
                criterias.shift();
                setExpression(new kony.sdk.dto.Expression(criterias, tmpOperator));
            }
        } else {
            if (kony.sdk.util.validateCriteriaObject(criterias)) {
                setTerm(criterias);
                // return currentExpObj;
            } else {
                //TODO
                //throw error
                kony.sdk.logsdk.error("### kony.sdk.dto.Expression::initExpression:: Error: Validation Error");
            }
        }
    }

    function setExpression(expression) {
        if (expression instanceof kony.sdk.dto.Expression) {
            currentExpObj.expression = expression;
            // return currentExpObj;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Expression::setExpression:: Error: expression not an instance of kony.sdk.do.Expression");
        }
    }

    function setTerm(term) {
        if (kony.sdk.util.validateCriteriaObject(term)) {
            currentExpObj.term = term;
            // return currentExpObj;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Expression::setTerm:: Error: Validation Error");
        }
    }

    /**
     * Initializes a Expression with an initial criteria term, an
     * operator, and a another trailing criteria expression.
     *
     * @param criterias
     *            the starting criteria to assign to the new
     *            criteria expression.
     * @param operator
     *            the infix operator
     * @param expression
     *            the trailing expression to assign to the new
     *            criteria expression.
     */
    function initExpressionByExpression(criterias, operator,
                                        expression) {
        if (operator === kony.sdk.constants.Operator.OR) {
            initExpression(criterias, kony.sdk.constants.Operator.OR);
        } else if (operator === kony.sdk.constants.Operator.AND) {
            initExpression(criterias, kony.sdk.constants.Operator.AND);
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Expression::initExpressionByExpression:: Error: Invalid Operator");
        }

        setExpression(expression);
        // return currentExpObj;
    }

    function setOperator(operator) {
        currentExpObj.operator = operator;
    }


    this.getTerm = function () {
        return this.term;
    };
    this.getOperator = function () {
        return this.operator;
    };
    this.getExpression = function () {
        return this.expression;
    };
    this.toString = function () {
        var returnString = null;
        if ((this.getTerm() === null || this.getTerm() === undefined)
            && (this.getExpression() === null || this.getExpression() === undefined)) {
            returnString = "";
        } else if (this.getExpression() === null
            || this.getExpression() === undefined) {
            returnString = this.getTerm().toString();
        } else if (this.getOperator() === kony.sdk.constants.Operator.AND) {
            returnString = (new kony.sdk.dto.And(this.getTerm(), this
                .getExpression())).toString();
        } else if (this.getOperator() === kony.sdk.constants.Operator.OR) {
            returnString = (new kony.sdk.dto.Or(this.getTerm(), this.getExpression()))
                .toString();
        }
        return returnString;
    }

};

/**
 * This function is a constructor for InCriteria Object
 * @constructor
 */
kony.sdk.dto.InCriteria = function () {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.InCriteria");
    this.column;
    this.values;
    var currentInCriteriaObj = this;

    if (arguments.length === 2) {
        getInCriteriaByColumnAndCollection(arguments[0],
            arguments[1]);
    } else if (arguments.length === 3) {
        getInCriteriaByTableAndCollection(arguments[0],
            arguments[1], arguments[2]);
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.InCriteria:: Error: invalid number of arguments, atleast column,values are expected");
    }

    /**
     * This function is the InCriteria constructor which has 3
     * arguments.
     *
     * @param table
     * @param columnname
     * @param values
     */
    function getInCriteriaByTableAndCollection(table, columnname,values) {
        kony.sdk.logsdk.trace("Entering into getInCriteriaByTableAndCollection");
        if (table instanceof kony.sdk.dto.Table) {
            currentInCriteriaObj.column = new kony.sdk.dto.Column(table, columnname);
            currentInCriteriaObj.values = values;

            return currentInCriteriaObj;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.InCriteria::getInCriteriaByTableAndCollection:: Error: table is not an instance of kony.sdk.dto.Table");
        }
    }

    /**
     * This function is the InCriteria constructor which has 2
     * arguments.
     *
     * @param column
     * @param values
     */
    function getInCriteriaByColumnAndCollection(column, values) {
        kony.sdk.logsdk.trace("Entering into getInCriteriaByColumnAndCollection");
        if (column instanceof kony.sdk.dto.Column && values instanceof Array
            && values.length > 0) {
            currentInCriteriaObj.column = column;
            currentInCriteriaObj.values = values;

            return currentInCriteriaObj;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.InCriteria::getInCriteriaByColumnAndCollection:: Error: Validation Error");

        }
    }


    this.getColumnForTable = function (table, columnName) {
        if (table instanceof kony.sdk.dto.Table) {
            var column = new kony.sdk.dto.Column(table, columnName);
            return column;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.InCriteria::getColumnForTable:: Error: table not an instance of kony.sdk.dto.Table");
        }
    };
    this.getColumn = function () {
        return this.column;
    };
    this.setColumn = function (column) {
        if (column instanceof kony.sdk.dto.Column) {
            this.column = column;
        }
    };
    this.setValues = function (valuesCollection) {
        this.values = valuesCollection;

    };
    this.getValues = function () {
        return this.values;
    };

    this.toString = function () {
        var result = "";
        result = this.column.toString() + " IN (";
        if (this.values !== null && this.values !== undefined
            && this.values.length > 0) {
            for (var index = 0; index < this.values.length; index++) {
                var value;
                var criteria = new kony.sdk.dto.Criteria();
                if (typeof (this.values[index]) === "string") {
                    value = criteria.quote(this.values[index]);
                } else {
                    value = this.values[index];
                }
                result = result + value;
                if (index !== (this.values.length - 1)) {
                    result = result + ", ";
                }
            }
        }
        /*
         * else if (this.subSelect !== null && this.subSelect !==
         * undefined) { result = result + this.subSelect; }
         */
        result = result + ")";
        return result;
    };
};

/**
 * This function is used to in set Exists param in select query
 * @param subSelectQuery {@link kony.sdk.dto.SelectQuery}
 * @constructor
 */
kony.sdk.dto.Exists = function (subSelectQuery) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.Exists");
    if (subSelectQuery instanceof kony.sdk.dto.SelectQuery) {
        this.subSelect = subSelectQuery;
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Exists:: Error: subSelectQuery is not an instance of kony.sdk.dto.SelectQuery");
    }

    this.getSubSelect = function () {
        return this.subSelect;
    };
    this.setSubSelect = function (subSelect) {

        if (subSelect instanceof kony.sdk.dto.SelectQuery) {
            this.subSelect = subSelect;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Exists::subSelectQuery:: Error: subSelectQuery is not an instance of kony.sdk.dto.SelectQuery");
        }
    };
    this.toString = function () {
        return "EXISTS ( " + this.subSelect.toString() + " )";
    };
};

/**
 * This is Interface to define where clauses
 * @constructor
 */
kony.sdk.dto.Criteria = function () {
    kony.sdk.logsdk.trace("Entering into kony.sdk.dto.Criteria");

    this.quote = function (str) {

        if (str === null || str === undefined) {
            return "null";
        }
        // var str1 = new String(str);
        var strBuf = [];
        strBuf.push('\'');
        for (var index = 0; index < str.length; index++) {
            var charItem = str.charAt(index);
            if (charItem == '\\' || charItem == '\"' || charItem == '\'') {
                // strBuf.concat('\\');
                strBuf.push('\\');
            }
            strBuf.push(charItem);
        }
        strBuf.push('\'');
        return strBuf.join("");
    };
};

/**
 * This function is used to define where clause
 * @constructor
 */
kony.sdk.dto.Match = function () {
    this.column;
    this.matchType;
    this.value;
    var currentMatchObj = this;

    if (arguments.length === 3) {
        initMatchByColumn(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 4) {
        initMatchByTableAndColName(arguments[0], arguments[1],
            arguments[2], arguments[3]);
    } else {
        //TODO
        //throw error
        kony.sdk.logsdk.error("### kony.sdk.dto.Match:: Error: Invalid number of arguments, atleast columnObj,matchType,value is required")
    }

    /**
     * This function is the Match constructor which has 3 arguments.
     *
     * @param columnObj
     * @param matchType
     * @param value
     */
    function initMatchByColumn(columnObj, matchType, value) {
        if (columnObj instanceof kony.sdk.dto.Column) {
            currentMatchObj.column = columnObj;
            if (matchType !== kony.sdk.constants.MatchType.EQUALS
                && matchType !== kony.sdk.constants.MatchType.GREATER
                && matchType !== kony.sdk.constants.MatchType.GREATEREQUAL
                && matchType !== kony.sdk.constants.MatchType.LESS
                && matchType !== kony.sdk.constants.MatchType.LESSEQUAL
                && matchType !== kony.sdk.constants.MatchType.STARTSWITH
                && matchType !== kony.sdk.constants.MatchType.CONTAINS
                && matchType !== kony.sdk.constants.MatchType.LIKE
                && matchType !== kony.sdk.constants.MatchType.ENDSWITH
                && matchType !== kony.sdk.constants.MatchType.NOTEQUAL
                && matchType !== kony.sdk.constants.MatchType.ISNULL
                && matchType !== kony.sdk.constants.MatchType.ISNOTNULL) {

                //TODO
                //throw error
                kony.sdk.logsdk.error("### kony.sdk.dto.Match::initMatchByColumn:: Error: Invalid MatchType");
            } else {
                if (matchType !== kony.sdk.constants.MatchType.ISNULL
                    && matchType !== kony.sdk.constants.MatchType.ISNOTNULL) {
                    // check if the value is passed or not except
                    // for NULL and NOT NULL cases.
                    if (value !== null && value !== undefined) {
                        if (value instanceof Array
                            && value.length <= 0) {
                            //TODO
                            //throw error
                            kony.sdk.logsdk.error("### kony.sdk.dto.Match::initMatchByColumn:: Error: value is undefined ,null or empty object");
                        }
                        currentMatchObj.value = value;
                    } else {
                        //TODO
                        //throw error
                        kony.sdk.logsdk.error("### kony.sdk.dto.Match::initMatchByColumn:: Error: Invalid MatchType");
                    }
                }
                currentMatchObj.matchType = matchType;
                return currentMatchObj;
            }
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Match::initMatchByColumn:: Error: columnObj is not an instance of kony.sdk.dto.Column");
        }
    }

    /**
     * This function is the Match constructor which has 4 arguments.
     *
     * @param tableObj
     * @param columnName
     * @param matchType
     * @param value
     */
    function initMatchByTableAndColName(tableObj, columnName, matchType, value) {
        // check for validity of tableObj
        if (tableObj instanceof kony.sdk.dto.Table) {
            // columnName should not empty or null or undefined.
            if (columnName !== null && columnName !== undefined
                && typeof (columnName) === 'string'
                && columnName.trim().length > 0) {
                currentMatchObj.column = tableObj
                    .getColumn(columnName);
                if (matchType !== kony.sdk.constants.MatchType.EQUALS
                    && matchType !== kony.sdk.constants.MatchType.GREATER
                    && matchType !== kony.sdk.constants.MatchType.GREATEREQUAL
                    && matchType !== kony.sdk.constants.MatchType.LESS
                    && matchType !== kony.sdk.constants.MatchType.LESSEQUAL
                    && matchType !== kony.sdk.constants.MatchType.STARTSWITH
                    && matchType !== kony.sdk.constants.MatchType.CONTAINS
                    && matchType !== kony.sdk.constants.MatchType.LIKE
                    && matchType !== kony.sdk.constants.MatchType.ENDSWITH
                    && matchType !== kony.sdk.constants.MatchType.NOTEQUAL
                    && matchType !== kony.sdk.constants.MatchType.ISNULL
                    && matchType !== kony.sdk.constants.MatchType.ISNOTNULL) {

                    //TODO
                    //throw error
                    kony.sdk.logsdk.error("### kony.sdk.dto.Match::initMatchByTableAndColName:: Error: Invalid MatchType");
                } else {
                    if (matchType !== kony.sdk.constants.MatchType.ISNULL
                        && matchType !== kony.sdk.constants.MatchType.ISNOTNULL) {
                        // check if the value is passed or not
                        // except for NULL and NOT NULL cases.
                        if (value !== null && value !== undefined) {
                            currentMatchObj.value = value;
                        } else {
                            //TODO
                            //throw error
                            kony.sdk.logsdk.error("### kony.sdk.dto.Match::initMatchByTableAndColName:: Error: value is undefined ,null or empty object");
                        }
                    }
                    currentMatchObj.matchType = matchType;
                }
                return currentMatchObj;
            } else {
                //TODO
                //throw error
                kony.sdk.logsdk.error("### kony.sdk.dto.Match::initMatchByTableAndColName:: Error: Invalid MatchType");
            }
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Match:: Error: columnObj is not an instance of kony.sdk.dto.Column");
        }
    }

    this.getColumn = function () {
        if (this.column !== null && this.column !== undefined) {
            return this.column;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Match::getColumn:: Error: column is null or undefined");
        }
    };

    this.getMatchType = function () {
        if (this.matchType !== null && this.matchType !== undefined) {
            return this.matchType;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Match::getMatchType:: Error: matchType is null or undefined");
        }
    };

    /**
     * This function is used to set match type.
     *
     * @param matchType
     */
    this.setMatchType = function (matchType) {
        this.matchType = matchType;
    };

    this.getValue = function () {
        return this.value;
    };

    /*
     * quote=function(value){ return "'"+value+"'"; }
     */

    /**
     * This function is used to convert to String.
     *
     * @return string
     */
    this.toString = function () {
        if (this.matchType !== null && this.matchType !== undefined
            && this.column !== null && this.column !== undefined) {
            var constructedMatch = null;
            var constructedValue = null;
            var type = this.matchType;
            var val = this.matchType.name;

            if (this.value instanceof Date) {
                var dateStr = "";
                var month = this.getValue().getMonth() + 1;
                var date = this.getValue().getDate();

                if (month < 10) {
                    month = "0" + month;
                }

                if (date < 10) {
                    date = "0" + date;
                }
                dateStr = this.getValue().getFullYear() + "-" + month
                    + "-" + date;
                constructedMatch = "date(substr("
                    + this.getColumn().toString() + ",0,11)) "
                    + this.getMatchType().value + "'" + dateStr
                    + "'";
                return constructedMatch;
            }
            if (typeof (this.getValue()) === 'boolean') {
                if (this.getValue() === true) {
                    return "(" + this.getColumn().toString()
                        + " = 'true' OR "
                        + this.getColumn().toString() + " = 1)";
                } else if (this.getValue() === false) {
                    return "(" + this.getColumn().toString()
                        + " = 'false' OR "
                        + this.getColumn().toString() + " = 0)";
                } else {
                    this.value = "'" + this.value + "'";
                }
            }

            constructedMatch = this.getColumn().toString() + " "
                + this.getMatchType().value + " ";
            if (typeof (this.getValue()) === 'string') {
                constructedValue = kony.sdk.util.replaceAll(this.getValue(),
                    "'", "");
                if (kony.sdk.util.matchIgnoreCase(type.name, "STARTSWITH")) {
                    constructedValue = constructedValue + "%";
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "CONTAINS")) {
                    constructedValue = "%" + constructedValue + "%";
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "ENDSWITH")) {
                    constructedValue = "%" + constructedValue;
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "ISNULL")) {
                    return "(lower(" + this.getColumn().toString()
                        + ") = 'null' OR "
                        + this.getColumn().toString() + " IS NULL)";
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "ISNOTNULL")) {
                    return "(lower(" + this.getColumn().toString()
                        + ") != 'null' OR "
                        + this.getColumn().toString()
                        + " IS NOT NULL)";
                }
                constructedValue = new kony.sdk.dto.Criteria().quote(constructedValue);
            } else {
                if (kony.sdk.util.matchIgnoreCase(type.name, "ISNULL")) {
                    return "(lower(" + this.getColumn().toString()
                        + ") = 'null' OR "
                        + this.getColumn().toString() + " IS NULL)";
                } else if (kony.sdk.util.matchIgnoreCase(type.name, "ISNOTNULL")) {
                    return "(lower(" + this.getColumn().toString()
                        + ") != 'null' OR "
                        + this.getColumn().toString()
                        + " IS NOT NULL)";
                }
                constructedValue = this.getValue().toString();
            }
            if (!(kony.sdk.util.matchIgnoreCase(type.name, "ISNULL") || kony.sdk.util.matchIgnoreCase(type.name, "ISNOTNULL"))) {
                constructedMatch = constructedMatch + constructedValue;
            }
            return constructedMatch;
        } else {
            //TODO
            //throw error
            kony.sdk.logsdk.error("### kony.sdk.dto.Match::toString:: Error: matchType is undefined");
        }
    }

};

kony.sdk.util.getSyncDbName = function () {
    return kony.sync.getDBName();
};


kony.sdk.util.getPrimarykeysFromMetadata = function (objMetadata) {
    var tmpSrcAttributes = null;
    if (objMetadata.primaryKey != null && objMetadata.primaryKey != undefined && objMetadata.primaryKey.length > 0) {
        tmpSrcAttributes = {};
        var pkLen = objMetadata.primaryKey.length;
        for (var indx = 0; indx < pkLen; indx++) {
            var pKey = objMetadata.primaryKey[indx];
            //adding primarykey column names in srcattributes which will be useful while deleting children
            tmpSrcAttributes[pKey] = pKey;
        }
    }
    return tmpSrcAttributes;
};


/**
 * This is a replaceAll utility function
 * @param string
 * @param toReplace
 * @param replaceWith
 * @return String temp
 */
kony.sdk.util.replaceAll = function (string, toReplace, replaceWith) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.replaceAll");
    var temp = string;
    var index = temp.indexOf(toReplace);
    while (index != -1) {
        temp = temp.replace(toReplace, replaceWith);
        index = temp.indexOf(toReplace);
    }
    return temp;
};

kony.sdk.util.validateDateTypeInput = function (dateType) {
    return (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.TODAY)
        || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.TOMORROW)
        || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.YESTERDAY)
        || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.CURRENTWEEK)
        || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.NEXTWEEK)
        || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.LASTWEEK)
        || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.CURRENTMONTH)
        || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.NEXTMONTH)
        || kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.LASTMONTH));
};

kony.sdk.util.getDateRange = function (dateType) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.getDateRange");
    var result = [];
    var currentDate = new Date();
    var formattedDate = new Date(currentDate.getFullYear(), currentDate
            .getMonth(), currentDate.getDate(), currentDate.getHours(),
        currentDate.getMinutes(), currentDate.getSeconds(), currentDate
            .getMilliseconds());
    var start;
    var end;
    if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.TODAY)) {
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.TOMORROW)) {
        formattedDate.setDate(formattedDate.getDate() + 1);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.YESTERDAY)) {
        formattedDate.setDate(formattedDate.getDate() - 1);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.CURRENTWEEK)) {
        var firstDayofWeek = formattedDate.getDate() - formattedDate.getDay();
        var lastDayofWeek = firstDayofWeek + 6;
        formattedDate.setDate(firstDayofWeek);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
        formattedDate.setDate(lastDayofWeek);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.LASTWEEK)) {
        formattedDate.setDate(formattedDate.getDate() - 7);
        var firstDayofWeek = formattedDate.getDate() - formattedDate.getDay();
        var lastDayofWeek = firstDayofWeek + 6;
        formattedDate.setDate(firstDayofWeek);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
        formattedDate.setDate(lastDayofWeek);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.NEXTWEEK)) {
        formattedDate.setDate(formattedDate.getDate() + 7);
        var firstDayofWeek = formattedDate.getDate() - formattedDate.getDay();
        var lastDayofWeek = firstDayofWeek + 6;
        formattedDate.setDate(firstDayofWeek);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 0, 0, 0);
        formattedDate.setDate(lastDayofWeek);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            formattedDate.getDate(), 23, 59, 59);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.CURRENTMONTH)) {
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            1, 0, 0, 0);
        end = new Date(formattedDate.getFullYear(),
            formattedDate.getMonth() + 1, 0, 23, 59, 59);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.LASTMONTH)) {
        start = new Date(formattedDate.getFullYear(),
            formattedDate.getMonth() - 1, 1, 0, 0, 0, 0);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(),
            0, 23, 59, 59, 999);
    } else if (kony.sdk.util.matchIgnoreCase(dateType, kony.sdk.constants.DateTimeType.NEXTMONTH)) {
        start = new Date(formattedDate.getFullYear(),
            formattedDate.getMonth() + 1, 1, 0, 0, 0, 0);
        end = new Date(formattedDate.getFullYear(),
            formattedDate.getMonth() + 2, 0, 23, 59, 59, 999);
    } else {
        start = 0;
        end = 0;
    }
    result.push(start);
    result.push(end);
    return result;
};

//Helps to prepare the primary condition to get binary data
kony.sdk.util.getPkTableForBinary = function (objMetadata, columnValues, failureCallback) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.getPkTableForBinary");
    var pkTable = {};
    var whereClause = [];
    if (!kony.sdk.isNullOrUndefined(objMetadata.primaryKey)) {
        for (var indx = 0; indx < objMetadata.primaryKey.length; indx++) {
            var pKey = objMetadata.primaryKey[indx];
            var pKeyValue = columnValues[pKey];
            if (kony.sdk.isNullOrUndefined(pKeyValue)) {
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
                return;
            }
            pkTable[pKey] = pKeyValue;
        }
        return pkTable;
    } else {
        kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.primarykey_unavailable,kony.sdk.errormessages.primarykey_unavailable));
    }
};

//Helps to provide the Metadata of column in a Object
kony.sdk.util.getMetadataOfColumn = function (objMetadata, colName) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.getMetadataOfColumn");
    if (objMetadata != null && objMetadata != undefined) {
        var columns = objMetadata["columns"];
        if (columns != null && columns != undefined) {
            for (var indx in columns) {
                var colMeta = columns[indx];
                if (colMeta["name"] == colName) {
                    return colMeta;
                }
            }
        }
    }
    return null;
};

//Helps in generating kony.sdk.dto.RecordObject from a given complex record
kony.sdk.util.populateColumnValues = function (record, childRecords) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.populateColumnValues");
    var columnValues = {};
    var recordsLength = Object.keys(record).length;
    for (var index = 0; index < recordsLength; index++) {
        var colName = Object.keys(record)[index];
        var colVal = record[colName];
        if (colVal instanceof Array) {
            for (var tempIndex = 0; tempIndex < colVal.length; tempIndex++) {
                var tempRecord = new kony.sdk.dto.RecordObject();
                tempRecord.tableName = colName;
                tempRecord.columnValues = kony.sdk.util.populateColumnValues(record[colName][tempIndex], tempRecord.childRecords);
                childRecords.push(tempRecord);
            }
        } else {
            columnValues[colName] = colVal;
        }
    }
    return columnValues;
};

//Helps in getting the relationship data of an entity from a given relationship list
kony.sdk.util.getRelationOfEntity = function (relationshipList, entityName) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.getRelationOfEntity");
    var i = 0;
    for (; i < relationshipList.length; i++) {
        //considering only OneToMany relationships as it will have parent and child hierarchy
        if (relationshipList[i] != null && relationshipList[i]["relationshipType"] == "OneToMany" && relationshipList[i].relatedEntity.localeCompare(entityName) == 0) {
            return relationshipList[i];
        }
    }
    return null;
};

//Helps in finding if a given column name is a primary key
kony.sdk.util.isPrimaryKey = function (primaryKeyList, columnValue) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.isPrimaryKey");
    for (var i = 0; i < primaryKeyList.length; i++) {
        if (primaryKeyList[i] == columnValue)
            return true;
    }
    return false;
};

kony.sdk.util.objectToQueryParams  = function(valueObject){
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.objectToQueryParams ");
    var queryParams = "";
    if(!kony.sdk.isNullOrUndefined(valueObject) && valueObject instanceof Object && Object.keys(valueObject).length > 0) {
        var objCount = Object.keys(valueObject).length;
        for (var i = 0; i < objCount; i++) {
            var tempKey = Object.keys(valueObject)[i];
            if (queryParams.length === 0)
                queryParams = encodeURIComponent(tempKey) + "=" + encodeURIComponent(valueObject[tempKey]);
            else
                queryParams = queryParams + "&" + encodeURIComponent(tempKey) + "=" + encodeURIComponent(valueObject[tempKey]);
        }
    }

    return queryParams;
};

kony.sdk.util.getPackagedMetadata = function(){
    kony.sdk.logsdk.trace("Entering into   kony.sdk.util.getPackagedMetadata");
    if(kony.sdk.APP_META === undefined || kony.sdk.APP_META === null){
        kony.sdk.APP_META = {};
    }
    return kony.sdk.APP_META["objectsvc_meta"];
};

/**
 User needs to call this API to prepackage the metadata of the app. The data needs to be passed as json object or a stringified version of json object
 */
kony.sdk.util.setPackagedMetadata = function(metadataJson){
    kony.sdk.logsdk.trace("Entering into   kony.sdk.util.setPackagedMetadata");
    try{
        if(typeof metadataJson == "object"){
            kony.sdk.APP_META = metadataJson;
        }
        else if(typeof metadataJson == "string"){
            var parsedMetadata = JSON.parse(metadataJson);
            kony.sdk.APP_META = parsedMetadata;
        }
    }catch(error) {
        kony.sdk.logsdk.error("### kony.sdk.setPackagedMetadata::error while validating the input packaged metadata" , error);
    }
};
stripTrailingCharacter = function(str, character) {
		kony.sdk.logsdk.trace("Entering into stripTrailingCharacter");
	if (str.substr(str.length - 1) == character) {
		return str.substr(0, str.length - 1);
	}
	return str;
};

var Constants = {
	APP_KEY_HEADER: "X-Kony-App-Key",
	APP_SECRET_HEADER: "X-Kony-App-Secret",
	APP_AUTHORIZATION_HEADER	: "X-Kony-Authorization",
	AUTHORIZATION_HEADER: "Authorization"
};

kony.sdk.setLogLevelFromServerResponse = function(responseHeaders){
		kony.sdk.logsdk.trace("Entering into kony.sdk.setLogLevelFromServerResponse");
	if(responseHeaders && responseHeaders[kony.logger.deviceLogLevelHeader]){
		logLevel = responseHeaders[kony.logger.deviceLogLevelHeader].toUpperCase();
		if(!logLevel.localeCompare(kony.logger.logLevel.NONE.code) && kony.logger.currentLogLevel != kony.logger.logLevel.NONE)
			kony.logger.currentLogLevel = kony.logger.logLevel.NONE;
		else if(!logLevel.localeCompare(kony.logger.logLevel.FATAL.code) && kony.logger.currentLogLevel != kony.logger.logLevel.FATAL)
			kony.logger.currentLogLevel = kony.logger.logLevel.FATAL;
		else if(!logLevel.localeCompare(kony.logger.logLevel.ERROR.code) && kony.logger.currentLogLevel != kony.logger.logLevel.ERROR)
			kony.logger.currentLogLevel = kony.logger.logLevel.ERROR;
		else if(!logLevel.localeCompare(kony.logger.logLevel.WARN.code) && kony.logger.currentLogLevel != kony.logger.logLevel.WARN)
			kony.logger.currentLogLevel = kony.logger.logLevel.WARN;
		else if(!logLevel.localeCompare(kony.logger.logLevel.INFO.code) && kony.logger.currentLogLevel != kony.logger.logLevel.INFO)
			kony.logger.currentLogLevel = kony.logger.logLevel.INFO;
		else if(!logLevel.localeCompare(kony.logger.logLevel.DEBUG.code) && kony.logger.currentLogLevel != kony.logger.logLevel.DEBUG)
			kony.logger.currentLogLevel = kony.logger.logLevel.DEBUG;
		else if(!logLevel.localeCompare(kony.logger.logLevel.TRACE.code) && kony.logger.currentLogLevel != kony.logger.logLevel.TRACE)
			kony.logger.currentLogLevel = kony.logger.logLevel.TRACE;
		else if(!logLevel.localeCompare(kony.logger.logLevel.ALL.code) && kony.logger.currentLogLevel != kony.logger.logLevel.ALL)
			kony.logger.currentLogLevel = kony.logger.logLevel.ALL;
		else if(!logLevel.localeCompare('OFF'))
		{
			kony.logger.deactivatePersistors(kony.logger.networkPersistor);
			kony.logger.currentLogLevel = kony.logger.logLevel.NONE;
			var sdkRef = kony.sdk.getCurrentInstance();
			sdkRef.removeGlobalRequestParam(kony.logger.deviceLogLevelHeader,sdkRef.globalRequestParamType.headers);
			return;
		}
		else
			return;
		var sdkRef = kony.sdk.getCurrentInstance();
		sdkRef.setGlobalRequestParam(kony.logger.deviceLogLevelHeader,logLevel,sdkRef.globalRequestParamType.headers);
		kony.logger.activatePersistors(kony.logger.networkPersistor);
	}
}

var Errors = {
	INIT_FAILURE: "INIT_FAILURE",
	DATA_STORE_EXCEPTION: "DATASTORE_FAILURE",
	AUTH_FAILURE: "AUTH_FAILURE",
	INTEGRATION_FAILURE: "INTEGRATION_FAILURE",
	MESSAGING_FAILURE: "MESSAGING_FAILURE",
	SYNC_FAILURE: "SYNC_FAILURE",
	METRICS_FAILURE: "METRICS_FAILURE",
	MISC_FAILURE: "MISCELLANEOUS_FAILURE",
	OBJECT_FAILURE: "OBJECT_FAILURE",
	LOGIC_SERVICE_FAILURE: "LOGIC_SERVICE_FAILURE",
	SYNC_V2_FAILURE: "SYNC_V2_FAILURE",
	CONFIGURATION_URL_FAILURE: "CONFIGURATION_URL_FAILURE",
    CONFIGURATION_FAILURE: "CONFIGURATION_FAILURE",
	INTEGRITY_FAILURE: "INTEGRITY_FAILURE"
};
kony.sdk.prototype.enableDebug = function() {
		kony.sdk.logsdk.trace("Entering into kony.sdk.prototype.enableDebug");
	kony.sdk.isDebugEnabled = true;
}

kony.sdk.prototype.disableDebug = function() {
		kony.sdk.logsdk.trace("Entering into kony.sdk.prototype.disableDebug");
	kony.sdk.isDebugEnabled = false;
}

function Exception(name, message) {
    kony.sdk.logsdk.error("Exception --> " + name + ": " + message);
	return {
		code: name,
		message: message
	};
};

kony.sdk.verifyAndCallClosure = function(closure, params) {
	if (typeof(closure) === 'function') {
		closure(params);
	} else {
	kony.sdk.logsdk.warn("invalid callback",JSON.stringify(closure));
	}
}

kony.sdk.overrideUserId = function(userId){
	kony.sdk.logsdk.trace("Entering into kony.sdk.overrideUserId");
	if(konyRef.overrideUserIdFlag) {
		if(kony.sdk.getSdkType() === "js" && typeof(kony.setUserID) === 'function') {
			kony.setUserID(userId,true);
			konyRef.overrideUserIdFlag = true;
		}else{
			konyRef.setCurrentUserId(userId);
		}
	}
}

kony.sdk.formatCurrentDate = function(inputDateString) {
	kony.sdk.logsdk.trace("Entering into kony.sdk.formatCurrentDate");
	var dateObj = new Date(inputDateString);
	var year = dateObj.getUTCFullYear();
	var month = kony.sdk.formatDateComponent(dateObj.getUTCMonth() + 1);
	var date = kony.sdk.formatDateComponent(dateObj.getUTCDate());
	var hours = kony.sdk.formatDateComponent(dateObj.getUTCHours());
	var minutes = kony.sdk.formatDateComponent(dateObj.getUTCMinutes());
	var seconds = kony.sdk.formatDateComponent(dateObj.getUTCSeconds());
	var dateSeparator = "-"
	var timeSeparator = ":"
	var dateString = year + dateSeparator + month + dateSeparator + date + " " + hours + timeSeparator + minutes + timeSeparator + seconds;
	return dateString;
}

kony.sdk.formatDateComponent = function(dateComponent) {
	kony.sdk.logsdk.trace("Entering into kony.sdk.formatDateComponent");
	if (dateComponent < 10) {
		dateComponent = "0" + dateComponent;
	}
	return dateComponent;
}

kony.sdk.isNullOrUndefined = function(val) {
	if (val === null || val === undefined) {
		return true;
	} else {
		return false;
	}
};

kony.sdk.constants.reportingType = {
		session: "session",
		custom: "custom"
	};

kony.sdk.isEmptyObject = function(obj) {
    if(typeof(obj) === "boolean"){
        return false;
    }
    else if(typeof(obj) === "string"){
        return obj.trim().length === 0;
    }
	for (var prop in obj) {
		return false;
	}
	return true;
};


kony.sdk.isArray = function(data) {
	if (data && Object.prototype.toString.call(data) === '[object Array]') {
		return true;
	}
	return false;
}


kony.sdk.formatSuccessResponse = function(data)
{
	if(data && data.httpresponse)
	{
		delete data.httpresponse;
	}
	return data;
}

kony.sdk.isJson = function(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

kony.sdk.util.getString = function (val) {

    if (!kony.sdk.isNullOrUndefined(val) && (val.toString()).toLocaleLowerCase() !== "null") {
        return val.toString();
    }
    return "";
};

//private method to identify whether session/token expired or not based on error code
kony.sdk.isSessionOrTokenExpired = function(mfcode) {
	if (mfcode && (mfcode === "Auth-5" || mfcode === "Auth-6" || mfcode === "Gateway-31" || mfcode === "Gateway-33" || mfcode === "Gateway-35" || mfcode === "Gateway-36" || mfcode === "Auth-46" || mfcode === "Auth-55")) {
		return true;
	}
	return false;
}

//private method to clear cache
kony.sdk.resetProviderKeys = function(konyRef, _providerName) {
	try {
		if (konyRef) {
			if (_providerName) {
				if (konyRef.tokens.hasOwnProperty(_providerName)) {
					konyRef.tokens[_providerName] = null;
				}
			}
		}
	} catch(e) {
		kony.sdk.logsdk.error("Error while clearing the cache..");
	}
};

//private method to clear cache
kony.sdk.resetCurrentKeys = function(konyRef, _providerName) {
	try {
		if (konyRef) {
			konyRef.currentClaimToken = null;
			konyRef.currentBackEndToken = null;
			konyRef.claimTokenExpiry = null;
			konyRef.currentRefreshToken = null;
			//setting the anonymous provider as true to access the public protected urls without any issue
			konyRef.isAnonymousProvider = true;
			if (_providerName) {
				if (konyRef.tokens.hasOwnProperty(_providerName)) {
					konyRef.tokens[_providerName] = null;
				}
			}
		}
	} catch(e) {
		kony.sdk.logsdk.error("Error while clearing the cache..");
	}
};

kony.sdk.util.populateIndividualServiceLists = function(serviceConfig,objectToPopulate){
	kony.sdk.logsdk.trace("Entering into kony.sdk.util.populateIndividualServiceLists");
	var svcMeta = serviceConfig["services_meta"];
	if(kony.sdk.isNullOrUndefined(objectToPopulate["objectsvc"])) {
		objectToPopulate["objectsvc"] = {};
	}
	if(kony.sdk.isNullOrUndefined(objectToPopulate["offlineObjectsvc"])) {
		objectToPopulate["offlineObjectsvc"] = {};
	}
	if(svcMeta){
		for(svc in svcMeta){
			var svcObj = svcMeta[svc];
			if(svcObj && svcObj["type"] === "objectsvc"){
				if(!kony.sdk.isNullOrUndefined(svcObj["offline"])){
					if(svcObj["offline"] === false){
						objectToPopulate["objectsvc"][svc]=svcObj;
					}else if(svcObj["offline"] === true){
						objectToPopulate["offlineObjectsvc"][svc]=svcObj;
					}
				} else {
					objectToPopulate["objectsvc"][svc]=svcObj;
					objectToPopulate["offlineObjectsvc"][svc]=svcObj;
				}
			}
			else if(svcObj && svcObj["type"] === "integsvc"){
				objectToPopulate["integsvc"][svc]=svcObj;
			}
		}
	}
}

kony.sdk.util.saveSSOToken = function(SSOToken){
    if(typeof(SSOFFI) !== "undefined" ) {
        kony.sdk.logsdk.trace("Entering into kony.sdk.util.saveSSOToken");
        var encryptedToken = kony.sdk.util.encryptSSOToken(SSOToken);
        return SSOFFI.saveToken(encryptedToken, "TokenKey");
    } else {
        return null;
    }
};

kony.sdk.util.getSSOToken = function(){
    if(typeof(SSOFFI) !== "undefined" ) {
        kony.sdk.logsdk.trace("Entering into kony.sdk.util.getSSOToken");
        var decryptedToken = SSOFFI.getToken("TokenKey");
        return kony.sdk.util.decrpytSSOToken(decryptedToken);
    } else {
        return null;
    }
};

kony.sdk.util.deleteSSOToken = function(){
    if(typeof(SSOFFI) !== "undefined" ) {
        kony.sdk.logsdk.trace("Entering into kony.sdk.util.deleteSSOToken");
        return SSOFFI.deleteToken("TokenKey");
    } else {
        return null;
    }
};

/**
 * Returns a unique identifier for device to encrypt/decrypt sso token.
 * Android & iOS SDK is generating a UUID if not exist and share accross multiple applications.
 * This UUID is used as a secure key for encrypting/decrypting tokens.
 * @return {string}
 * @private
 */
function _getUUIDForClientApps(){
    var deviceUUID = SSOFFI.getToken(kony.sdk.KEY_DEVICE_ID);

    if (kony.sdk.util.isNullOrEmptyString(deviceUUID)){
        deviceUUID = kony.license.generateUUID().toString();
        SSOFFI.saveToken(deviceUUID, kony.sdk.KEY_DEVICE_ID);
    }
    return deviceUUID;
}

kony.sdk.util.encryptSSOToken = function (ssotoken) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.encryptSSOToken");
    return kony.sdk.encryptText(ssotoken, [_getUUIDForClientApps()], "aes");
};

kony.sdk.util.decrpytSSOToken = function (encryptedtoken) {
    kony.sdk.logsdk.trace("Entering into kony.sdk.util.decrpytSSOToken");
    if(encryptedtoken == null || encryptedtoken == "" || encryptedtoken == undefined)
        return encryptedtoken;

    var decryptedToken = kony.sdk.decryptText(encryptedtoken, [_getUUIDForClientApps()], "aes");

    if (kony.sdk.isNullOrUndefined(decryptedToken) || decryptedToken === ''){
        // Backward compatibility. Since we didnt encrypt with deviceID decryption will fail. Decrypt with old key "ssoencryption". Encrypting with deviceID & persisting response.
        decryptedToken = kony.sdk.decryptText(encryptedtoken, ["ssoencryption"], "aes");

        if (!kony.sdk.isNullOrUndefined(decryptedToken) && decryptedToken !== ''){
            kony.sdk.logsdk.debug("SSO token encrypted with old key. Encrypting with new key and saving");
            kony.sdk.util.saveSSOToken(decryptedToken);
        }
    }

    return decryptedToken;
};

/**
 * Generates hash code for the URL by sha512 algorithm
 * @param url
 * @param requestParams
 * @param keysToIgnore keys to be ignored, these keys will not be considered in requestParams for generating hashcode.
 * @type url String
 * @type requestParams Object
 * @type keysToIgnore Array
 * @return {*}
 */
kony.sdk.util.generateHashcodeForURL = function (url, requestParams){
	var concatenatedResult = "";
    var hashID = null;

    if (url != null && url != undefined)
        concatenatedResult += url;

    if (requestParams != null && requestParams != undefined){
        concatenatedResult += JSON.stringify(requestParams);
    }

    if (concatenatedResult != "" && kony.sdk.getSdkType() != "plain-js" && kony.sdk.getSdkType() != "phonegap"){
        hashID = kony.crypto.createHash("sha512", concatenatedResult);
    }

    return hashID;
}

/**
 * Utility function to save the response in the cache.
 * @param options {object} save the response with key options["cacheID"]. If not provided then we will calculate hashcode by url and requestData.
 * @param url {string}
 * @param requestData {object}
 * @param response {object}
 */
function cacheResponseForKey(options, url, requestData, response){
	var hashCode = null;
	
	if (options["cacheID"])
		hashCode = options["cacheID"];
	else
		hashCode = kony.sdk.util.generateHashcodeForURL(url, requestData);
	
	if (hashCode){
		
		if (typeof (hashCode) !== "string"){
			hashCode = hashCode.toString();
		}
					
        var expiry = options["expiryTime"] ? options["expiryTime"] : kony.sdk.DEFAULT_CACHE_EXPIRY_TIME;
		response["cacheID"] = hashCode;
		new kony.sdk.ClientCache().add(hashCode, response, expiry);
	}
}

kony.sdk.util.isNullOrEmptyString = function (val) {
    if (kony.sdk.isNullOrUndefined(val) || (typeof(val) === "string" && val.trim() === "")) {
        return true;
    }
    return false;
};

function doesMFSupportsAppversioning(){
	// In case of IDE platforms we will check the existence of appConfig.svcDoc.service_doc_etag for compatibility of app version with the MF.
	// In case of plain-js & phone gap initOptions should not be sent during init call.
	if (kony.sdk.getSdkType() === kony.sdk.SDK_TYPE_PLATFORM_IDE && !kony.sdk.isNullOrUndefined(appConfig) && !kony.sdk.isNullOrUndefined(appConfig.svcDoc) && !kony.sdk.isNullOrUndefined(appConfig.svcDoc.service_doc_etag)){
		return true;
	}
	else if (kony.sdk.getSdkType() === kony.sdk.SDK_TYPE_PLATFORM_PLAIN_JS || kony.sdk.getSdkType() === kony.sdk.SDK_TYPE_PLATFORM_PHONEGAP){
		return true;
	}
	else{
		return false;
	}
}

function populateHeaderWithFabricAppVersion(headers){
    if (doesMFSupportsAppversioning() && !kony.sdk.isNullOrUndefined(headers) && !kony.sdk.isNullOrUndefined(kony.sdk.getFabricAppVersion())){
        headers["X-Kony-App-Version"] = kony.sdk.getFabricAppVersion();
    }
}


/**
 * Generates key to encrypt/decrypt any text.
 * @param salt {Array}
 * @returns string
 */
kony.sdk.generateSecureKeyFromText = function (salt, algo) {
    var secureKey = "";

    if (!kony.sdk.isNullOrUndefined(salt) && kony.sdk.isArray(salt) && !kony.sdk.isNullOrUndefined(algo)){
        secureKey = kony.crypto.newKey("passphrase", 128, {
            passphrasetext: salt,
            subalgo: algo,
            passphrasehashalgo: "md5"
        });
    }
    else{
        throw new Exception(Errors.CONFIGURATION_FAILURE, "Invalid param. salt cannot be null, should be of type Array");
    }

    return secureKey;
};

/**
 * Encrypts text with the given salt and encryptionAlgo.
 * @param text {string}
 * @param salt {Array}
 * @param encryptionAlgo {text}
 * @returns {string}
 */
kony.sdk.encryptText = function (text, salt, encryptionAlgo){
    var encryptionKey = kony.sdk.generateSecureKeyFromText(salt, encryptionAlgo);
    var encryptedText = kony.crypto.encrypt(encryptionAlgo, encryptionKey, text, {});
    return kony.convertToBase64(encryptedText);
};

/**
 * Decrypts text with the given salt and encryptionAlgo.
 * @param text {string}
 * @param salt {Array}
 * @param decryptionAlgo {text}
 * @returns {string}
 */
kony.sdk.decryptText = function (text, salt, decryptionAlgo){
    var decryptionKey = kony.sdk.generateSecureKeyFromText(salt, decryptionAlgo);
    var rawText = kony.convertToRawBytes(text);
    return kony.crypto.decrypt(decryptionAlgo, decryptionKey, rawText, {});
};

/*
** Utility method to clone any object
*  @return cloned object
*/
kony.sdk.cloneObject = function(obj){
    var clonedObject;
    try{
        clonedObject = JSON.parse(JSON.stringify(obj));
    }catch(err){
        kony.sdk.logsdk.error("cloning object failed, reverting back to copy");
        clonedObject = obj;
    }
    return clonedObject;
};
kony.sdk.serviceDoc = function() {
	kony.sdk.logsdk.trace("Entering into kony.sdk.serviceDoc");
	var appId = "";
	var baseId = "";
	var services_meta = {};
	var name = "";
	var selflink = "";
	var login = null;
	var integsvc = {};
	var reportingsvc = {};
	var messagingsvc = {};
	var sync = {};
	var objectsvc = {};
	var logicsvc = {};

	this.toJSON = function() {
		servConfig = {};
		servConfig.appId = this.getAppId();
		servConfig.baseId = this.getBaseId();
		servConfig.name = this.getAppName();
		servConfig.selflink = this.getSelfLink();
		servConfig.services_meta = this.getServicesMeta();
		servConfig.login = this.getAuthServices();
		servConfig.integsvc = this.getIntegrationServices();
		servConfig.messagingsvc = this.getMessagingServices();
		servConfig.sync = this.getSyncServices();
		servConfig.reportingsvc = this.getReportingServices();
		servConfig.objectsvc = this.getObjectServices();
		servConfig.logicsvc = this.getLogicServices();
		kony.sdk.util.populateIndividualServiceLists(this,servConfig);
		return servConfig;
	}

	this.setAppId = function(appIdStr) {
		appId = appIdStr;
	};

	this.getAppId = function() {
		return appId;
	};

	this.setBaseId = function(baseIdStr) {
		baseId = baseIdStr;
	};

	this.getBaseId = function() {
		return baseId;
	};

	this.setAppName = function(appName) {
		name = appName;
	};

	this.getAppName = function() {
		return name;
	};

	this.setSelfLink = function(selfLinkStr) {
		selflink = selfLinkStr;
	};

	this.getSelfLink = function() {
		return selflink;
	};

	function setEndPoints(providerType, providerValues) {
		for (var provider in providerValues) {
			providerType[provider] = providerValues[provider];
		}
	}

	this.setAuthService = function(loginProvider) {
		if(login === null){
			login = [];
		}
		login.push(loginProvider);
	};

	//what will this return? name?
	this.getAuthServiceByName = function(authServiceProvider) {
		if(login === null){
			return null;
		}
		for (var i in login) {
			var provider = login[i];
			if (provider.prov == authServiceProvider) {
				return provider;
			}
		}
	};

	this.getAuthServices = function() {
		return login;
	};

	this.setIntegrationService = function(providerName, endPointUrl) {
		integsvc[providerName] = endPointUrl;
	};

	this.getIntegrationServiceByName = function(integrationServiceProviderName) {
		return integsvc[integrationServiceProviderName];
	};

	this.getIntegrationServices = function() {
		return integsvc;
	};

	this.setObjectService = function(providerName, endPointUrl) {
		objectsvc[providerName] = endPointUrl;
	};

	this.getObjectServiceByName = function(objectServiceProviderName) {
		return objectsvc[objectServiceProviderName];
	};

	this.getObjectServices = function() {
		return objectsvc;
	};

	this.getLogicServices = function() {
		return logicsvc;
	};

	this.getServicesMeta = function() {
		return services_meta;
	};

	this.setReportingService = function(reportingType, url) {
		if (reportingType == kony.sdk.constants.reportingType.session || reportingType == kony.sdk.constants.reportingType.custom) {
			reportingsvc[reportingType] = url;
		} else {
			throw new Exception(Errors.INIT_FAILURE, "invalid reporting type " + reportingType);
		}
	}

	this.getReportingServiceByType = function(reportingServiceProviderType) {
		return reportingsvc[reportingServiceProviderType];
	};

	this.getReportingServices = function() {
		return reportingsvc;
	};

	this.setMessagingService = function(appId, url) {
		messagingsvc[appId] = url;
	};

	this.getMessagingServiceByName = function(messagingServiceProviderName) {
		return messagingsvc[messagingServiceProviderName];
	};

	this.getMessagingServices = function() {
		return messagingsvc;
	}

	this.setSyncService = function(syncServiceProvider) {
		sync = syncServiceProvider;
	};

	this.getSyncServices = function() {
		return sync;
	};

};

kony.logger = kony.logger || {};

kony.logger = {

    // Logger constants

    networkPersistorUrlEndpoint: "deviceLogs",

    deviceLogLevelHeader: "X-KONY-DEVICE-LOG-LEVEL",

    filePersistor: 1,

    consolePersistor: 2,

    networkPersistor: 4,

    // Log Level Block which gives all the handle for setting and getting

    //ALL(0) < TRACE(1) < DEBUG(2) < INFO(4) < WARN(8) < ERROR(16) < FATAL(32) < NONE(63)
    logLevel: {
        NONE: {
            value: 63,
            name: "none",
            code: "NONE"
        },
        FATAL: {
            value: 32,
            name: "fatal",
            code: "FATAL"
        },
        ERROR: {
            value: 16,
            name: "error",
            code: "ERROR"
        },
        WARN: {
            value: 8,
            name: "warn",
            code: "WARN"
        },
        INFO: {
            value: 4,
            name: "info",
            code: "INFO"
        },
        DEBUG: {
            value: 2,
            name: "debug",
            code: "DEBUG"
        },
        TRACE: {
            value: 1,
            name: "trace",
            code: "TRACE"
        },
        ALL: {
            value: 0,
            name: "all",
            code: "ALL"
        }
    },



    get currentLogLevel() {
        if (typeof(currentLevel) === 'undefined')
            currentLevel = kony.logger.logLevel.NONE;
        if (kony.logger.isNativeLoggerAvailable()) {
            var logLevelValue = KonyLogger.getLogLevel();
            for (var key in kony.logger.logLevel) {
                if (kony.logger.logLevel.hasOwnProperty(key)) {
                    if (kony.logger.logLevel[key].value == logLevelValue) {
                        currentLevel = kony.logger.logLevel[key];
                        break;
                    }
                }
            }
        }
        return currentLevel;
    },

    set currentLogLevel(level) {
        currentLevel = level;
        if (kony.logger.isNativeLoggerAvailable())
            KonyLogger.setLogLevel(currentLevel.value);
    },

    isNativeLoggerAvailable: function() {
        if (typeof(KonyLogger) === 'undefined')
            return false;
        else
            return true;
    },


    flush: function() {
        if (kony.logger.isNativeLoggerAvailable())
            KonyLogger.flush();
    },

    // Persister block for activating and deactivating

    activatePersistors: function(activatedList) {
        if (kony.logger.isNativeLoggerAvailable())
            KonyLogger.activatePersistors(activatedList);
    },
    deactivatePersistors: function(deactivatedList) {
        if (kony.logger.isNativeLoggerAvailable())
            KonyLogger.deactivatePersistors(deactivatedList);
    },

    //setting claims token after referesh
    setClaimsToken: function() {
        var token = kony.sdk.getCurrentInstance().currentClaimToken;
        if (kony.logger.isNativeLoggerAvailable())
            KonyLogger.setClaimsToken(token);
    },

    setConfig: function(loggerConfig) {
        if (kony.logger.isNativeLoggerAvailable()) {
            KonyLogger.setConfig(loggerConfig.getLoggerConfig());
        }
    },

    setPersistorConfig: function(persistor) {
        if (kony.logger.isNativeLoggerAvailable()) {
            KonyLogger.setPersistorConfig(persistor.getPersistorConfig());
        }
    },


    createLoggerObject: function(loggerName, loggerConfig) {
        var loggerObj = {};
        loggerObj.config = parseConfig(loggerConfig);


        loggerObj.trace = function(msg, params) {
            logMessage(loggerObj, kony.logger.logLevel.TRACE, msg, params);
        };
        loggerObj.debug = function(msg, params) {
            logMessage(loggerObj, kony.logger.logLevel.DEBUG, msg, params);
        };
        loggerObj.info = function(msg, params) {
            logMessage(loggerObj, kony.logger.logLevel.INFO, msg, params);
        };
        loggerObj.warn = function(msg, params) {
            logMessage(loggerObj, kony.logger.logLevel.WARN, msg, params);
        };
        loggerObj.error = function(msg, params) {
            logMessage(loggerObj, kony.logger.logLevel.ERROR, msg, params);
        };
        loggerObj.fatal = function(msg, params) {
            logMessage(loggerObj, kony.logger.logLevel.FATAL, msg, params);
        };

        var indirectionLevel = 0;

        loggerObj.setIndirectionLevel = function(_indirectionLevel) {
            indirectionLevel = _indirectionLevel;
        }
        loggerObj.getIndirectionLevel = function() {
            return indirectionLevel;
        }

        loggerObj.loggerName = loggerName;

        return loggerObj;

    },

    createLoggerConfig: function() {
        var formatC = {};
        var logFilterC = {};
        var accConfig = {};
        var overrideConfig = null;
        var persistorList = [];

        var config = {
            //formatterConfig
            //timeformat
            set timeFormat(val) {
                formatC.timeFormat = val;
            },
            //timeZone
            set timeZone(val) {
                formatC.timeZone = val;
            },

            //FilterConfig
            //logLevel
            set logLevel(val) {
                logFilterC.logLevel = val;
            },

            //accumulatorConfig
            //bytesLimit
            set bytesLimit(val) {
                accConfig.bytesLimit = val;
            },
            //statementsLimit
            set statementsLimit(val) {
                accConfig.statementsLimit = val;
            },

            //overrideConfig
            set overrideConfig(val) {
                overrideConfig = val;
            },

            //peristorList
            get persistorList() {
                return persistorList;
            },
            addPersistor: function(val) {
                persistorList.push(val.getPersistorConfig());
            },

            getLoggerConfig: function() {
                var loggerConfig = {};
                if (Object.keys(formatC).length > 0) loggerConfig.formatterConfig = formatC;
                if (Object.keys(logFilterC).length > 0) loggerConfig.logFilterConfig = logFilterC;
                if (Object.keys(accConfig).length > 0) loggerConfig.accumulatorConfig = accConfig;
                if (overrideConfig !== null) loggerConfig.overrideConfig = overrideConfig;
				loggerConfig.persistors = persistorList;
                return loggerConfig;
            }
        };
        return config;
    },

    createFilePersistor: function() {
        var prop = {};
        var persistorProperties = {
            //Persistor properites
            get persistorType() {
                return kony.logger.filePersistor;
            },
            //maxNumberOfLogFiles
            set maxNumberOfLogFiles(val) {
                prop.maxNumberOfLogFiles = val;
            },
            //maxFileSize
            set maxFileSize(val) {
                prop.maxFileSize = val;
            },

            getPersistorConfig: function() {
                var perConfig = {};
                perConfig.type = this.persistorType;
                if (Object.keys(prop).length > 0) perConfig.properties = prop;
                return perConfig;
            }
        };
        return persistorProperties;
    },
    createNetworkPersistor: function() {
        var prop = {};
        var persistorProperties = {
            //persistorType
            get persistorType() {
                return kony.logger.networkPersistor;
            },
            //URL
            set URL(val) {
                prop.URL = val;
            },
            getPersistorConfig: function() {
                var perConfig = {};
                perConfig.type = this.persistorType;
                if (Object.keys(prop).length > 0) perConfig.properties = prop;
                return perConfig;
            }
        };
        return persistorProperties;
    },

    appLoggerInitialisation: function() {
        var loggerObj = {};
        loggerObj = new kony.logger.createNewLogger(kony.sdk.APP_LOGGER_NAME, null);
        return loggerObj;
    },


};
//#ifdef KONYSYNC_WINDOWS
//#else

kony.sdk.KNYObj = function(name){

	var LOG_PREFIX = "KNYObj";
	kony.sdk.logsdk.info(LOG_PREFIX + ": Creating KNYObj with name " + name);
	var sdkObjectSync = kony.sdk.KNYObj.createSDKObjectSync(name);
	
	this.name = name;

	this.getSdkObjectSync = function(){
		return sdkObjectSync;
	}

	this.startSync = function(syncConfig, successCallback, failureCallback, progressCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX+ ": Starting sync on " + this.name + " object");
		kony.sdk.logsdk.debug(LOG_PREFIX+ ": Refreshing claims token");
		kony.sdk.claimsRefresh(
			function(){ //claims refresh success callback
				kony.sdk.logsdk.info(LOG_PREFIX+ ": Refresh claims token SUCCESS");
				var token = kony.sdk.getCurrentInstance().currentClaimToken;
			//	kony.sdk.logsdk.log(LOG_PREFIX+ ": Token : " + token);
				kony.sdk.OfflineObjects.setToken(token);
				kony.sdk.OfflineObjects.setReportingParams(kony.sdk.getReportingParamsForOfflineObjects());
				kony.sdk.KNYObj.startSync(this, syncConfig, successCallback, failureCallback, progressCallback)
			}.bind(this),

			function(){ //claims refresh failure callback
				kony.sdk.logsdk.info(LOG_PREFIX + ": Refresh claims token FAILED");
				failureCallback();
			}
		);
	};

	this.create = function(record, options, successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Create record in " + this.name + " object");
		kony.sdk.KNYObj.create(this, record, options, successCallback, failureCallback);
	};

	this.updateByPK = function(record, options, successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Update record in " + this.name +" object");
		kony.sdk.KNYObj.updateByPK(this, record, options, successCallback, failureCallback);
	};

	this.deleteByPK = function(options, successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Delete record in " + this.name + " object");
		kony.sdk.KNYObj.deleteByPK(this, options, successCallback, failureCallback);
	};

	this.get = function(options, successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Get record from " + this.name + " object");
		kony.sdk.KNYObj.get(this, options, successCallback, failureCallback);
	};

	this.getBinary = function(options, fileDownloadStartedCallback, chunkDownloadCompletedCallback, 
		streamDownloadCompletedCallback, fileDownloadCompletedCallback, downloadFailureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Get binary for " + this.name + " object");
		kony.sdk.KNYObj.getBinary(this, options, fileDownloadStartedCallback, chunkDownloadCompletedCallback, 
			streamDownloadCompletedCallback, fileDownloadCompletedCallback, downloadFailureCallback);
	};

	this.rollback = function(primaryKeyValueMap, successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Rollback for " + this.name + " object");
		kony.sdk.KNYObj.rollback(this, primaryKeyValueMap, successCallback, failureCallback);
	};
    
    this.markForUpload = function(options, successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": MarkForUpload for " + this.name + " object");
		kony.sdk.KNYObj.markForUpload(this, options, successCallback, failureCallback);
	};
    
    this.getUploadDeferredRecordKeys = function(successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Get deferred record primary keys in " + this.name + " object");
		kony.sdk.KNYObj.getUploadDeferredRecordKeys(this, successCallback, failureCallback);
	};
	
	this.cancelSync = function(options, successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Cancel for " + this.name + " object");
		kony.sdk.KNYObj.cancelSync(this, options, successCallback, failureCallback);
	};
};

//#endif
//#ifdef KONYSYNC_WINDOWS
//#else

kony.sdk.KNYObjSvc = function(name){

	var LOG_PREFIX = "KNYObjSvc";
	kony.sdk.logsdk.debug(LOG_PREFIX+": Creating KNYObjSvc with name " + name);
	var sdkObjectServiceSync = kony.sdk.KNYObjSvc.createSDKObjectServiceSync(name);
	
	this.name = name;

	this.getSdkObjectServiceSync = function(){
		return sdkObjectServiceSync;
	}
    
    this.getSdkObjectByName = function(name){
        kony.sdk.logsdk.debug(LOG_PREFIX + ": Creating KNYObj with name " + name);
        return new kony.sdk.KNYObj(name);
    }

	this.startSync = function(syncConfig, successCallback, failureCallback, progressCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Starting sync on " + this.name + " object service");
		kony.sdk.logsdk.trace(LOG_PREFIX + ": Refreshing claims token");
		kony.sdk.claimsRefresh(
			function(){ //claims refresh success callback
				kony.sdk.logsdk.info(LOG_PREFIX + ": Refresh claims token SUCCESS");
				var token = kony.sdk.getCurrentInstance().currentClaimToken;
				kony.sdk.OfflineObjects.setToken(token);
				kony.sdk.OfflineObjects.setReportingParams(kony.sdk.getReportingParamsForOfflineObjects());
				kony.sdk.KNYObjSvc.startSync(this, syncConfig, successCallback, failureCallback, progressCallback)
			}.bind(this),

			function(){ //claims refresh failure callback
				kony.sdk.logsdk.error(LOG_PREFIX + ": Refresh claims token FAILED");
				failureCallback();
			}
		);
	};

	this.rollback = function(successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Rollback on " + this.name + " object service");
		kony.sdk.KNYObjSvc.rollback(this, successCallback, failureCallback)
	}
	
	this.cancelSync = function(options, successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Cancel for " + this.name + " object service");
		kony.sdk.KNYObjSvc.cancelSync(this, options, successCallback, failureCallback);
	}
	
	this.clearOfflineData = function(options, successCallback, failureCallback){
		kony.sdk.logsdk.debug(LOG_PREFIX + ": Clearing Offline Data for " + this.name + " object service.");
		kony.sdk.KNYObjSvc.clearOfflineData(this, options, successCallback, failureCallback);
	}
};

//#endif
//#ifdef KONYSYNC_WINDOWS
//#else

kony.sdk.OfflineObjects = function(objServiceList){

	var LOG_PREFIX = "OfflineObjects";
	kony.sdk.logsdk.trace(LOG_PREFIX+": Creating OfflineObjects");

	this.setup = function(options, successCallback, failureCallback){
		// This check is required for app upgrade from 8.0 to 8.1
		var argSuccessCallback = successCallback;
		var argFailueCallback = failureCallback;
		var setupOptions = (typeof arguments[0] != "function") ? options : null;
		
		if(setupOptions === null) {
			argSuccessCallback = options;
			argFailueCallback = successCallback;
		}

		kony.sdk.logsdk.trace(LOG_PREFIX+": OfflineObjects.setup() called");
		kony.sdk.logsdk.trace(LOG_PREFIX+": Refreshing claims token");
		kony.sdk.claimsRefresh(
			function(){ //claims refresh success callback
				kony.sdk.logsdk.trace(LOG_PREFIX+": Refresh claims token SUCCESS");
				var token = kony.sdk.getCurrentInstance().currentClaimToken;
				//kony.sdk.logsdk.debug(LOG_PREFIX+": Token : "+token);
				kony.sdk.OfflineObjects.setToken(token);
				kony.sdk.OfflineObjects.setReportingParams(kony.sdk.getReportingParamsForOfflineObjects());
				kony.sdk.OfflineObjects.setup(objServiceList, setupOptions, argSuccessCallback, argFailueCallback);
			},

			function(){ //claims refresh failure callback
				kony.sdk.logsdk.error(LOG_PREFIX+": Refresh claims token FAILED. Setup offline started.");
				kony.sdk.OfflineObjects.setup(objServiceList, setupOptions, argSuccessCallback, argFailueCallback);
			}
		);
	};

	this.incrementalSetup = function(options, successCallback, failureCallback) {
		if(!options) {
			options = {};
        } 
        options.incrementalSetup = true;
        this.setup(options, successCallback, failureCallback);
    }

	this.drop = function(options, successCallback, failureCallback){
		// This change is required for app upgrade from 8.0 to 8.1
		var argSuccessCallback = successCallback;
		var argFailueCallback = failureCallback;
		var dropOptions = (typeof arguments[0] != "function") ? options : null;
		
		if(dropOptions === null) {
			argSuccessCallback = options;
			argFailueCallback = successCallback;
		}

		kony.sdk.logsdk.trace(LOG_PREFIX+": OfflineObjects.drop() called");
		kony.sdk.OfflineObjects.drop(dropOptions, argSuccessCallback, argFailueCallback);
	}

	this.reset = function(options, successCallback, failureCallback) {
		// This change is required for app upgrade from 8.0 to 8.1
		var argSuccessCallback = successCallback;
		var argFailueCallback = failureCallback;
		var resetOptions = (typeof arguments[0] != "function") ? options : null;
		
		if(resetOptions === null) {
			argSuccessCallback = options;
			argFailueCallback = successCallback;
		}

		kony.sdk.logsdk.trace(LOG_PREFIX+": OfflineObjects.reset called");
		kony.sdk.logsdk.trace(LOG_PREFIX+": Refreshing claims token");
		kony.sdk.claimsRefresh(
			function(){ //claims refresh success callback
				kony.sdk.logsdk.trace(LOG_PREFIX+": Refresh claims token SUCCESS");
				var token = kony.sdk.getCurrentInstance().currentClaimToken;
				//kony.sdk.logsdk.debug(LOG_PREFIX+": Token : "+token);
				kony.sdk.OfflineObjects.setToken(token);
				kony.sdk.OfflineObjects.setReportingParams(kony.sdk.getReportingParamsForOfflineObjects());
				kony.sdk.OfflineObjects.reset(objServiceList, resetOptions, argSuccessCallback, argFailueCallback);
			},

			function(){ //claims refresh failure callback
				kony.sdk.logsdk.error(LOG_PREFIX+": Refresh claims token FAILED. Reset offline started.");
				kony.sdk.OfflineObjects.reset(objServiceList, resetOptions, argSuccessCallback, argFailueCallback);
			}
		);
	}

	this.rollback = function(successCallback, failureCallback){
		kony.sdk.logsdk.trace(LOG_PREFIX+": OfflineObjects.rollback() called");
		kony.sdk.OfflineObjects.rollback(successCallback,failureCallback);
	}

	this.executeSelectQuery = function(query, successCallback, failureCallback){
        kony.sdk.logsdk.trace(LOG_PREFIX+": OfflineObjects.executeSelectQuery() called");
        kony.sdk.OfflineObjects.executeSelectQuery(query, successCallback, failureCallback);
    }
};

//#endif
kony.sdk.util = kony.sdk.util || {};

//#ifdef iphone
//#define KONYSYNC_IOS
//#endif
//#ifdef bb
//#define KONYSYNC_BB
//#endif
//#ifdef bb10
//#define KONYSYNC_BB10
//#endif
//#ifdef spabb
//#define KONYSYNC_BB
//#endif
//#ifdef spabbnth
//#define KONYSYNC_BB
//#endif
//#ifdef winmobile
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef winmobile6x
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef winphone8
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef android
//#define KONYSYNC_ANDROID
//#endif
//#ifdef j2me
//#define KONYSYNC_J2ME
//#endif

//#ifdef ipad
//#define KONYSYNC_IOS
//#endif
//#ifdef tabrcandroid
//#define KONYSYNC_ANDROID
//#endif
//#ifdef playbook
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef spaip
//#define KONYSYNC_IOS
//#endif
//#ifdef spaipad
//#define KONYSYNC_IOS
//#endif
//#ifdef spaan
//#define KONYSYNC_ANDROID
//#endif
//#ifdef spatabandroid
//#define KONYSYNC_ANDROID
//#endif
//#ifdef spaplaybook
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef windows8
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef spawinphone8
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef spawindows
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef spatabwindows
//#define KONYSYNC_WINDOWS
//#endif

//#ifdef desktop_kiosk
//#define KONYSYNC_WINDOWS
//#endif
//#ifdef desktopweb
//#define KONYSYNC_WINDOWS
//#endif


//#ifdef iphone
//#define KONYSYNC_MOBILE
//#endif
//#ifdef bb
//#define KONYSYNC_MOBILE
//#endif
//#ifdef bb10
//#define KONYSYNC_MOBILE
//#endif
//#ifdef winmobile
//#define KONYSYNC_MOBILE
//#endif
//#ifdef winmobile6x
//#define KONYSYNC_MOBILE
//#endif
//#ifdef winphone8
//#define KONYSYNC_MOBILE
//#endif
//#ifdef android
//#define KONYSYNC_MOBILE
//#endif
//#ifdef j2me
//#define KONYSYNC_MOBILE
//#endif
//#ifdef symbian
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spaip
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spaan
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spabb
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spawindows
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spabbnth
//#define KONYSYNC_MOBILE
//#endif
//#ifdef spawinphone8
//#define KONYSYNC_MOBILE
//#endif

//#ifdef ipad
//#define KONYSYNC_TAB
//#endif
//#ifdef tabrcandroid
//#define KONYSYNC_TAB
//#endif
//#ifdef playbook
//#define KONYSYNC_TAB
//#endif
//#ifdef spaipad
//#define KONYSYNC_TAB
//#endif
//#ifdef spatabandroid
//#define KONYSYNC_TAB
//#endif
//#ifdef spaplaybook
//#define KONYSYNC_TAB
//#endif
//#ifdef windows8
//#define KONYSYNC_TAB
//#endif
//#ifdef spatabwindows
//#define KONYSYNC_TAB
//#endif

//#ifdef desktop_kiosk
//#define KONYSYNC_DESKTOP
//#endif
//#ifdef desktopweb
//#define KONYSYNC_DESKTOP
//#endif

function konyLogger() {
    this.log = function(text) {
        if (kony.sdk.isDebugEnabled) {
            kony.print(text);
        }
    }
}
/**
 * Flag used to override the network availability api for automation testing.
 * @type {boolean}
 */
overrideNetworkFlag = false;
/**
 *	Utility Method for the application to check the network availability.
 */
kony.sdk.isNetworkAvailable = function(){
    //Check the network flag if set for testing. This would mandate the application to be offline if device has network connectivity.
    if(overrideNetworkFlag !== undefined && overrideNetworkFlag !== null && overrideNetworkFlag && overrideNetworkFlag === true)
        return false;

    return kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
}
/**
 *	Utility method to set the network flag for offline testing.
 */
kony.sdk.overrideNetworkFlag = function(){
    overrideNetworkFlag = true;
}
/**
 *	Utility method to reset the network flag set for offline testing.
 */
kony.sdk.resetNetworkFlag = function(){
    overrideNetworkFlag = false;
    overrideNetworkFlag = undefined;
};

function konyNetworkProvider() {

    this.post = function(url, params, headers, successCallback, failureCallback, konyContentType, options) {
        if(kony.sdk.util.isNullOrEmptyString(url)){
            kony.sdk.verifyAndCallClosure(failureCallback,"url cannot be null or empty");
            return;
        }
        //Appending global params
        if(kony.sdk.isNullOrUndefined(params)) {
            params = {};
        }
        if(!kony.sdk.isNullOrUndefined(kony.sdk.currentInstance)){
            url = kony.sdk.currentInstance.appendGlobalParams(url, headers, params);
        }
        konyNetHttpRequest(url, params, headers, "POST", konyContentType, successCallback, failureCallback, options);
    };
    this.put = function(url, params, headers, successCallback, failureCallback, konyContentType, options) {
        if(kony.sdk.util.isNullOrEmptyString(url)){
            kony.sdk.verifyAndCallClosure(failureCallback,"url cannot be null or empty");
            return;
        }
        //Appending global params
        if(kony.sdk.isNullOrUndefined(params)) {
            params = {};
        }
        if(!kony.sdk.isNullOrUndefined(kony.sdk.currentInstance)){
            url = kony.sdk.currentInstance.appendGlobalParams(url, headers, params);
        }
        konyNetHttpRequest(url, params, headers, "PUT", konyContentType, successCallback, failureCallback, options);
    };
    this.invokeDeleteRequest = function(url, params, headers, successCallback, failureCallback, konyContentType, options) {
        if(kony.sdk.util.isNullOrEmptyString(url)){
            kony.sdk.verifyAndCallClosure(failureCallback,"url cannot be null or empty");
            return;
        }
        //Appending global params
        if(kony.sdk.isNullOrUndefined(params)) {
            params = {};
        }
        if(!kony.sdk.isNullOrUndefined(kony.sdk.currentInstance)){
            url = kony.sdk.currentInstance.appendGlobalParams(url, headers, params);
        }
        konyNetHttpRequest(url, params, headers, "DELETE", konyContentType, successCallback, failureCallback, options);
    };
    //postSync will only work for Richclients like Android,IOS
    this.postSync = function(url,params,headers){
        if(kony.sdk.util.isNullOrEmptyString(url)){
            kony.sdk.verifyAndCallClosure(failureCallback,"url cannot be null or empty");
            return;
        }
        //Appending global params
        if(kony.sdk.isNullOrUndefined(params)) {
            params = {};
        }
        if(!kony.sdk.isNullOrUndefined(kony.sdk.currentInstance)){
            url = kony.sdk.currentInstance.appendGlobalParams(url, headers, params);
        }
        return konyNetHttpRequestSync(url,params,headers);
    };

    this.get = function(url, params, headers, successCallback, failureCallback, konyContentType, options) {
        if(kony.sdk.util.isNullOrEmptyString(url)){
            kony.sdk.verifyAndCallClosure(failureCallback,"url cannot be null or empty");
            return;
        }
        //Appending global params
        if(kony.sdk.isNullOrUndefined(params)) {
            params = {};
        }
        if(!kony.sdk.isNullOrUndefined(kony.sdk.currentInstance)){
            url = kony.sdk.currentInstance.appendGlobalParams(url, headers, params);
        }
        konyNetHttpRequest(url, params, headers, "GET", konyContentType, successCallback, failureCallback, options);
    }
}

function konyXMLHttpRequestWrapper(url, params, headers, httpMethod, konyContentType, successCallback, failureCallback, options) {

    if (typeof(window) === 'undefined') {
        kony.sdk.logsdk.error("window is not defined.");
        return;
    }
    var userAgent = window.navigator.userAgent;
    var IE = userAgent.indexOf("MSIE ");
    if (IE != -1 && typeof(xdomain) === "undefined") {

        function callback(xdomain) {
            kony.sdk.logsdk.debug("xdomain is " + xdomain);
            xdomain.debug = true;
            var slaves = kony.sdk.getXdomainSlaves();
            xdomain.slaves(slaves);
            konyXMLHttpRequest(url, params, headers, httpMethod, konyContentType, successCallback, failureCallback, options);
        }
        xdomain_init(callback);

    } else {
        konyXMLHttpRequest(url, params, headers, httpMethod, konyContentType, successCallback, failureCallback, options);
    }
};

function konyNetHttpRequest(url, params, headers, httpMethod, konyContentType, successCallback, failureCallback, options) {

    var paramsTable = null;
    var httpRequest;
    if(options && options["httpRequestOptions"] && options["httpRequestOptions"] instanceof Object){
        httpRequest = new kony.net.HttpRequest(options["httpRequestOptions"]);
    }else {
        httpRequest = new kony.net.HttpRequest();
    }
    // check for the deprecated property if set in appmiddlewaresecureinvokerasync() API
    if(options && options["httpconfig_old"]){
        if(options["httpconfig_old"]["timeout"]){
            httpRequest.timeout = options["httpconfig_old"]["timeout"] * 1000;
        }
    }
    //#ifdef  KONYSYNC_IOS
    if(options && options["httpRequestOptions"] && options["httpRequestOptions"] instanceof Object && options["httpRequestOptions"]["timeoutIntervalForRequest"]){
        httpRequest.timeout = options["httpRequestOptions"]["timeoutIntervalForRequest"] * 1000;
    }
    if(options && options["httpRequestOptions"] && options["httpRequestOptions"] instanceof Object && options["httpRequestOptions"]["enableBackgroundTransfer"] == true){
        httpRequest.backgroundTransfer = true;
    }
    //#endif
    //#ifdef  KONYSYNC_WINDOWS
    if(options && options["httpRequestOptions"] && options["httpRequestOptions"] instanceof Object && options["httpRequestOptions"]["timeoutIntervalForRequest"]){
        httpRequest.timeout = options["httpRequestOptions"]["timeoutIntervalForRequest"] * 1000;
    }
    //#endif

    // As older versions of IE doesn't have xmlHttpRequest2, and it doesn't support "withCredentials" property
    // We put a check to handle a crash. Cookies will not be transferred in CORS request for IE due to this restriction
    if(typeof (XMLHttpRequest) !== "undefined" &&
        "withCredentials" in (new XMLHttpRequest()) &&
        options &&
        options["xmlHttpRequestOptions"] &&
        options["xmlHttpRequestOptions"]["enableWithCredentials"] === true)
    {
        httpRequest.enableWithCredentials = true;
    }

    var isInvalidJSON = false;
    //if httpmethod is not provided falling back to POST
    if (!httpMethod) {
        httpMethod = constants.HTTP_METHOD_POST;
    }
    httpRequest.open(httpMethod, url);
    function localRequestCallback(result) {
        var readyState = Number(httpRequest.readyState.toString());
        var status = Number(httpRequest.status.toString());
        if (readyState === 4) {
            var response = null;
            if (result && result.response) {
                response = kony.sdk.cloneObject(result.response);
            } else if (httpRequest.response) {
                response = kony.sdk.cloneObject(httpRequest.response);
            }

            //If option "passthrough" is enabled then SDK will not parse the result from backend.
            if (options && options["passthrough"]){
                response = {};
                response.rawResponse = result.response;
            }else if (response && typeof(response) === 'string') {
                if(kony.sdk.isJson(response)){
                    response = JSON.parse(response);
                }
                else{
                    isInvalidJSON = true;
                }
            }
            kony.sdk.setLogLevelFromServerResponse(httpRequest.getAllResponseHeaders());
            if(response && !(isInvalidJSON)){
                response.httpresponse = {};
                response.httpresponse.headers = httpRequest.getAllResponseHeaders();
                response.httpresponse.url = url;
                response.httpresponse.responsecode = status;
            }
            if(isInvalidJSON || (!response &&  status >= 200 && status < 300)){
                var errorMessage={};
                errorMessage.httpresponse = {};
                errorMessage["opstatus"]=kony.sdk.errorcodes.invalid_json_code;
                errorMessage["errmsg"]= kony.sdk.errormessages.invalid_json_message;
                errorMessage["errcode"]=kony.sdk.errorcodes.invalid_json_code;
                errorMessage["httpStatusCode"] = status;
                errorMessage.httpresponse["response"]= response;
                errorMessage.httpresponse.headers = httpRequest.getAllResponseHeaders();
                errorMessage.httpresponse.url = url;
                errorMessage.httpresponse.responsecode = status;

                failureCallback(errorMessage);
            }
            else if (status >= 200 && status < 300) {
                if (!response.opstatus) {
                    response.opstatus = 0;
                }
                if (response.opstatus == 0) {
                    if(options && (options["disableIntegrity"] || options["passthrough"])){
                        successCallback(response);
                    }else{
                        if (typeof(konyRef) !== "undefined" && konyRef && konyRef.mainRef.integrityKey === true) {
                            if(response.httpresponse.headers.hasOwnProperty("X-Kony-Integrity")){
                                if (!(kony.sdk.isNullOrUndefined(httpRequest.integrityStatus))) {
                                    var integrityStatus = parseInt(httpRequest["integrityStatus"].toString());
                                    switch (integrityStatus) {
                                        case constants.HTTP_INTEGRITY_CHECK_NOT_DONE:
                                            failureCallback(kony.sdk.error.getIntegrityErrorMessage(httpRequest, url));
                                            break;
                                        case constants.HTTP_INTEGRITY_CHECK_SUCCESSFUL:
                                            successCallback(response);
                                            break;
                                        case constants.HTTP_INTEGRITY_CHECK_FAILED:
                                            failureCallback(kony.sdk.error.getIntegrityErrorMessage(httpRequest, url));
                                            break;
                                    }
                                } else{
                                    failureCallback(kony.sdk.error.getIntegrityErrorMessage(httpRequest, url));
                                }
                            } else if(options && options !=null  && options["ignoreintegrity"]){
                                    successCallback(response);
                            } else {
                                failureCallback(kony.sdk.error.getIntegrityErrorMessage(httpRequest, url));
                            }
                        } else{
                            successCallback(response);
                        }
                    }
                } else {
                    failureCallback(response);
                }
            } else {
                var resultTable = {};
                if (response) {
                    resultTable = response;
                } else {
                    resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
                    resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
                    resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;

                }
                if(!kony.sdk.isNullOrUndefined(httpRequest.status)){
                    resultTable.httpStatusCode = httpRequest.status.toString();
                }
                failureCallback(resultTable);
            }

        }
    }
    if (konyContentType == undefined || konyContentType == null || konyContentType != 'formdata') {
        //preparing params for other than object services
        var firstKey = true;
        for (var key in params) {
            if (firstKey) {
                paramsTable = new kony.net.FormData();
                firstKey = false;
            }
            if (typeof(params[key])!= "undefined") {
                if(typeof(params[key]) !== "string"){
                    params[key] = JSON.stringify(params[key]);
                }
                paramsTable.append((key), (params[key]));
            }
        }
    } else if (konyContentType == "formdata"){
        //for specific requests like object services we will send formdata through form encoding machanism.
        if (params) {
            //for object services we are getting kony.net.FormData so using the same.
            paramsTable = params;
        }
    }
    if (headers) {
        for (var key in headers) {
            httpRequest.setRequestHeader(key, headers[key]);
        }
    } else {
        httpRequest.setRequestHeader("Content-Type", "application/json");
    }
    httpRequest.onReadyStateChange = localRequestCallback;
    if(kony.sdk.getAType() === "spa" || (options && (options["disableIntegrity"] || options["passthrough"]))){
        //mesasging service and pass through enabled integration svc doesn't support http message body integrity
        //IDE SPA also doesn't support message body integrity
        //if integrity is enabled earlier,remove integrity
        //check is for windows 8.x and Kiosk platforms,which doesn't support integrity
        if(kony.sdk.REMOVE_INTEGRITY_CHECK in kony.net) {
            kony.net.removeIntegrityCheck();
        }
        if (paramsTable) {
            httpRequest.send(paramsTable);
        } else {
            httpRequest.send();
        }
    }else{
        if (typeof(konyRef) !== "undefined" && konyRef && konyRef.mainRef.integrityKey === true) {
            var properties = konyRef.mainRef.integrityParams;
            try{
                //check is for windows 8.x and Kiosk platforms,which doesn't support integrity
                if(kony.sdk.SET_INTEGRITY_CHECK in kony.net) {
                    kony.net.setIntegrityCheck(properties);
                }
            }catch (e){
                kony.sdk.logsdk.warn("Invalid Integrity properties received");
                throw "Invalid Integrity properties received";
            }
        }else{
            //check is for windows 8.x and Kiosk platforms,which doesn't support integrity
            if(kony.sdk.REMOVE_INTEGRITY_CHECK in kony.net) {
                kony.net.removeIntegrityCheck();
            }
        }
        if (paramsTable) {
            httpRequest.send(paramsTable);
        } else {
            httpRequest.send();
        }
    }
}

function konyNetHttpRequestSync(url, params, headers) {

    var paramsTable = null;
    var httpRequest = new kony.net.HttpRequest();
    var isInvalidJSON = false;
    httpRequest.open(constants.HTTP_METHOD_POST, url,false);
    var firstKey = true;
    for (var key in params) {
        if (firstKey) {
            paramsTable = new kony.net.FormData();
            firstKey = false;
        }
        if (typeof(params[key])!= "undefined") {
            if(typeof(params[key]) !== "string"){
                params[key] = JSON.stringify(params[key]);
            }
            paramsTable.append((key), (params[key]));
        }
    }

    if (headers) {
        for (var key in headers) {
            httpRequest.setRequestHeader(key, headers[key]);
        }
    } else {
        httpRequest.setRequestHeader("Content-Type", "application/json");
    }
    httpRequest.send(paramsTable);
    var response = null;
    var status = Number(httpRequest.status.toString());
    kony.sdk.setLogLevelFromServerResponse(httpRequest.getAllResponseHeaders());
    if (httpRequest.response) {
        response = httpRequest.response;
    }
    if (response && typeof(response) === 'string') {
        if(kony.sdk.isJson(response)){
            response = JSON.parse(response);
        }
        else{
            isInvalidJSON = true;
        }
    }
    if(response && !(isInvalidJSON)){
        response.httpresponse = {};
        response.httpresponse.headers = httpRequest.getAllResponseHeaders();
        response.httpresponse.url = url;
        response.httpresponse.responsecode = status;
    }
    if(isInvalidJSON || (!response &&  status >= 200 && status < 300)){
        var errorMessage={};
        errorMessage.httpresponse = {};
        errorMessage["opstatus"]=kony.sdk.errorcodes.invalid_json_code;
        errorMessage["errmsg"]= kony.sdk.errormessages.invalid_json_message;
        errorMessage["errcode"]=kony.sdk.errorcodes.invalid_json_code;
        errorMessage["httpStatusCode"] = status;
        errorMessage.httpresponse["response"]= response;
        errorMessage.httpresponse.headers = httpRequest.getAllResponseHeaders();
        errorMessage.httpresponse.url = url;
        errorMessage.httpresponse.responsecode = status;

        return errorMessage;
    }
    else if (status >= 200 && status < 300) {
        if (!response.opstatus) {
            response.opstatus = 0;
        }
        return response;
    } else {
        var resultTable = {};
        if (response) {
            resultTable = response;
            resultTable.httpStatusCode = httpRequest.status.toString();
        } else {
            resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
            resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
            resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;

        }
        return resultTable;
    }
}


function konyXMLHttpRequest(url, params, headers, httpMethod, konyContentType, successCallback, errorCallback, options) {


    var paramsTable = "";
    var firstVal = true;
    var resultTable = {};
    var xmlHttpRequestOptions;
    if(options && options["xmlHttpRequestOptions"]){
        xmlHttpRequestOptions = options["xmlHttpRequestOptions"];
    }else{
        xmlHttpRequestOptions = {};
    }
    var httpRequest = new XMLHttpRequest();
    if (typeof(errorCallback) === 'undefined') {
        errorCallback = successCallback;
    }
    if (!params) {
        params = "";
    }


    //if httpmethod is not provided falling back to POST
    if (!httpMethod) {
        httpMethod = constants.HTTP_METHOD_POST;
    }

    httpRequest.onerror = function(res) {
        resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
        resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
        resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;
        errorCallback(resultTable);
    };

    httpRequest.onload = function (res) {
        var isInvalidJSON=false;
        if(res){
            if(httpRequest.responseText !== ""){
                if(kony.sdk.isJson(httpRequest.responseText)){
                    resultTable = JSON.parse(httpRequest.responseText);
                }
                else{
                    isInvalidJSON=true;
                }
            }
            kony.sdk.setLogLevelFromServerResponse(httpRequest.getAllResponseHeaders());
            if(isInvalidJSON || (httpRequest.status >= 200 && httpRequest.status < 300 && !httpRequest.responseText))
            {
                resultTable={};
                resultTable.httpresponse = {};
                resultTable["opstatus"]= kony.sdk.errorcodes.invalid_json_code;
                resultTable["errmsg"]= kony.sdk.errormessages.invalid_json_message;
                resultTable["errcode"]= kony.sdk.errorcodes.invalid_json_code;
                resultTable["httpStatusCode"] = httpRequest.status;
                resultTable.httpresponse["response"]= httpRequest.responseText;
                resultTable.httpresponse.headers = httpRequest.getAllResponseHeaders();
                resultTable.httpresponse.responsecode =httpRequest.status;
                resultTable.httpresponse.url= url;
                errorCallback(resultTable);
            }
            else if(httpRequest.status >= 200 && httpRequest.status < 300){
                resultTable.httpresponse = {};
                resultTable.httpresponse.headers = httpRequest.getAllResponseHeaders();
                resultTable.httpresponse.responsecode =httpRequest.status;
                resultTable.httpresponse.url= url;
                if(!resultTable.opstatus){
                    resultTable.opstatus = 0;
                }
                if (resultTable["opstatus"] == 0) {
                    successCallback(resultTable);
                } else {
                    errorCallback(resultTable);
                }

            }
            else {
                if(httpRequest.responseText){
                    resultTable["httpStatusCode"] = httpRequest.status;
                    resultTable.httpresponse = {};
                    resultTable.httpresponse.headers = httpRequest.getAllResponseHeaders();
                    resultTable.httpresponse.responsecode =httpRequest.status;
                    resultTable.httpresponse.url= url;
                    errorCallback(resultTable);
                }
                else
                {
                    resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
                    resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
                    resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;
                    errorCallback(resultTable);
                }
            }
        }
        else{
            resultTable["opstatus"] = kony.sdk.errorcodes.unknown_error_code;
            resultTable["errcode"] = kony.sdk.errorcodes.unknown_error_code;
            resultTable["errmsg"] = kony.sdk.errormessages.unknown_error_message;
            errorCallback(resultTable);
        }
    };

    httpRequest.ontimeout = function(res) {
        resultTable["opstatus"] = kony.sdk.errorcodes.connectivity_error_code;
        resultTable["errcode"] = kony.sdk.errorcodes.connectivity_error_code;
        resultTable["errmsg"] = kony.sdk.errormessages.connectivity_error_message;
        errorCallback(resultTable);
    };
    // As older versions of IE doesn't have xmlHttpRequest2, and it doesn't support "withCredentials" property
    // We put a check to handle a crash. Cookies will not be transferred in CORS request for IE due to this restriction
    if("withCredentials" in httpRequest && xmlHttpRequestOptions["enableWithCredentials"] == true){
        httpRequest.withCredentials = true;
    }

    httpRequest.open(httpMethod, url, true);

    var isContentTypeAvailable = false;
    if (typeof(headers) !== 'undefined' && headers !== null) {
        //check content-type for case insensitive
        for (var header in headers) {
            if (header.toLowerCase() === "content-type")
                isContentTypeAvailable = true
            httpRequest.setRequestHeader(header, headers[header]);
        }
        if (!isContentTypeAvailable) {
            headers["Content-Type"] = "application/json";
        }
    }
    if (params && params.httpconfig && params.httpconfig.timeout) {

        httpRequest.timeout = params.httpconfig.timeout * 1000;

    }
    if (konyContentType == undefined || konyContentType == null || konyContentType != 'formdata') {
        //preparing params for other than object services

        if (headers["Content-Type"] === "application/x-www-form-urlencoded" || headers["Content-Type"] === "application/json") {
            var paramsTable = "";
            var firstVal = true;
            for (var key in params) {
                if (!firstVal) {
                    paramsTable += "&";
                }
                firstVal = false;
                if (typeof(params[key])!= "undefined") {
                    if(typeof(params[key]) !== "string"){
                        if(!(params[key] instanceof Array && typeof(options) != "undefined" && options != null && typeof(options["enablePreMFCompat"]) != "undefined" && options["enablePreMFCompat"] === true))
                            params[key] = JSON.stringify(params[key]);
                    }
                    paramsTable = paramsTable + key + "=" + encodeURIComponent(params[key]);
                }
            }
            params = paramsTable;
        } else if (typeof(params) !== "string") {
            params = JSON.stringify(params);
        }

    } else if (konyContentType == "formdata"){
        //for specific requests like object services we will get formdata object
        //for object services we are getting kony.net.FormData as params so using the same.
    }
    try {
        if (params) {
            httpRequest.send(params);
        } else {
            httpRequest.send();
        }

    } catch (e) {
        kony.sdk.logsdk.error("catch -> error occurred " , JSON.stringify(e));
    }

}

function konyDataStore() {
    //kony.sdk.logsdk.trace("Setting konyDataStore");
    this.setItem = function(key, value) {
        if (typeof(key) !== "string") {
            throw new Exception(Errors.DATA_STORE_EXCEPTION, "Invalid Key");
        } else {
            try {
                key = key.replace(/\//gi, "");
                kony.store.setItem(key, value);
            } catch (e) {
                kony.sdk.logsdk.error("Failed to set item in dtastore:" + e);
            }
        }
    };

    this.getItem = function(key) {
        kony.sdk.logsdk.debug("Getting item for key:" + key);
        if (typeof(key) !== "string") {
            throw new Exception(Errors.DATA_STORE_EXCEPTION);
        } else {
            key = key.replace(/\//gi, "");
            var value = kony.store.getItem(key);
            if (value === null || value === undefined) {
                kony.sdk.logsdk.debug("No value found with key:" + key);
                return null;
            } else {
                return value;
            }
        }
    };

    this.removeItem = function(key) {
        kony.sdk.logsdk.debug("Removing item for key:" + key);
        if (typeof(key) !== "string") {
            throw new Exception(Error.DATA_STORE_EXCEPTION);
        } else {
            key = key.replace(/\//gi, "");
            kony.store.removeItem(key); //If no item with that key exists, the method does not perform any action. Thus no need to check for key availablity.
        }
    };

    this.destroy = function() {
        kony.sdk.logsdk.info("Destroying data store for this app");
        kony.store.clear();
    };

    this.getAllItems = function() {
        kony.sdk.logsdk.info("Getting all item from data store");
        var items = {};
        var len = kony.store.length(); //get key length
        for (var i = 0; i < len; i++) {
            var key = kony.store.key(i); //get ith key
            var value = kony.store.getItem(key); //get value
            items[key] = value; //prepare itemset
        }
        return items;
    }
};


kony.sdk.getSdkType = function() {
    return "js";
}

kony.sdk.getPayload = function(konyRef) {
    var payload = {};
    payload.os = kony.os.deviceInfo().version + "";
    payload.dm = kony.os.deviceInfo().model;
    payload.did = kony.sdk.getDeviceId();
    payload.ua = kony.os.userAgent();
    if(appConfig){
        payload.aid =  appConfig.appId;
        payload.aname = appConfig.appName;
    } else {
        var clientParams = konyRef.getClientParams();
        payload.aid =  clientParams.aid ? clientParams.aid : konyRef.mainRef.baseId;
        payload.aname = clientParams.aname ? clientParams.aname : konyRef.mainRef.name;
    }

    payload.chnl = kony.sdk.getChannelType();
    payload.plat = kony.sdk.getPlatformName();
    if(payload.plat === "ios"  && kony.os.deviceInfo().name !== "thinclient") {
        payload.did = getDeviceIdForIOSPlatform();
    }
    if(payload.plat === "ios" && payload.dm.toLowerCase().indexOf("ipod") != -1){
        payload.chnl = "ipod";
    }
    payload.aver = appConfig.appVersion;
    payload.atype = kony.sdk.getAType();
    payload.stype = "b2c";
    payload.kuid = konyRef.getUserId();
    payload.mfaid = konyRef.mainRef.appId;
    payload.mfbaseid = konyRef.mainRef.baseId;
    payload.mfaname = konyRef.mainRef.name;
    payload.sdkversion = kony.sdk.version;
    payload.sdktype = kony.sdk.getSdkType();
    if (kony.application.getCurrentForm()) {
        var fid = kony.application.getCurrentForm().id;
        if (fid) {
            payload.fid = fid;
        }
    }


    return payload;
};

kony.sdk.getDeviceId = function() {
    var name = kony.os.deviceInfo().name;
    if (name === kony.sdk.SDK_PLATFORM_SPA) {
        var deviceID = kony.ds.read(kony.sdk.KEY_DEVICE_ID);
        if (!deviceID) {
            deviceID = kony.license.generateUUID().toString();
            kony.ds.save(deviceID, kony.sdk.KEY_DEVICE_ID);
        }
        return deviceID;
    } else {
        //#ifdef KONYSYNC_IOS
        return kony.os.deviceInfo().identifierForVendor;
        //#else
        // For Android & Windows platforms.
        return kony.os.deviceInfo().deviceid;
        //#endif
    }
};

kony.sdk.getChannelType = function() {
    var returnVal = "";
    //#ifdef KONYSYNC_MOBILE
    returnVal = "mobile";
    //#endif
    //#ifdef KONYSYNC_TAB
    returnVal = "tablet";
    //#endif
    //#ifdef KONYSYNC_DESKTOP
    returnVal = "desktop";
    //#endif
    return returnVal;
};

kony.sdk.getPlatformName = function() {
    var returnVal = "";
    //#ifdef KONYSYNC_IOS
    returnVal = "ios";
    //#endif
    //#ifdef KONYSYNC_WINDOWS
    returnVal = "windows";
    //#endif
    //#ifdef KONYSYNC_ANDROID
    returnVal = "android";
    //#endif
    //#ifdef KONYSYNC_J2ME
    returnVal = "j2me";
    //#endif
    //#ifdef KONYSYNC_BB
    returnVal = "blackberry";
    //#endif
    return returnVal;
};

kony.mbaas.invokeMbaasServiceFromKonyStudio = function(url, inputParam, serviceID, operationID, callBack, infoObject) {
    var currentInstance = kony.sdk.getCurrentInstance();
    if (!currentInstance) {
        throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
    }
    var integrationService = currentInstance.getIntegrationService(serviceID);
    var options = {};
    if (inputParam && inputParam["httpconfig"]) {
        options["httpconfig_old"] = inputParam["httpconfig"];
        delete inputParam["httpconfig"];
    }
    if (inputParam && inputParam["httpRequestOptions"] && inputParam["httpRequestOptions"] instanceof Object) {
        options["httpRequestOptions"] = inputParam["httpRequestOptions"];
        delete inputParam["httpRequestOptions"];
    }
    var headers = null;
    if (inputParam && inputParam["httpheaders"]) {
        headers = inputParam["httpheaders"];
        delete inputParam["httpheaders"];
    }

    integrationService.invokeOperation(operationID, headers, inputParam, function(res) {
        if (typeof(callBack) === 'function') {
            callBack(400, res, infoObject);
        }

    }, function(res) {
        if (typeof(callBack) === 'function') {
            callBack(400, res, infoObject);
        }
    }, options);
}
kony.mbaas.invokeMbaasServiceFromKonyStudioSync = function(url,inputParam, serviceID, operationID) {
    var currentInstance = kony.sdk.getCurrentInstance();
    if (!currentInstance) {
        throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
    }
    var integrationService = currentInstance.getIntegrationService(serviceID);

    var headers = null;
    if (inputParam && inputParam["httpheaders"]) {
        headers = inputParam["httpheaders"];
        delete inputParam["httpheaders"];
    }

    return integrationService.invokeOperationSync(operationID, headers, inputParam);
}
kony.mbaas.invokeMbaasServiceFromKonyStudioAsync = function(url,inputParam, serviceID, operationID,callBack,info) {
    kony.mbaas.invokeMbaasServiceFromKonyStudio(url,inputParam, serviceID, operationID,callBack, info);
}
kony.sdk.XdomainSlaves = {};

kony.sdk.XdomainLibPath = null;

kony.sdk.getXdomainSlaves = function() {
    function isEmptyObject(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    }
    if (isEmptyObject(kony.sdk.XdomainSlaves)) {
        throw new Exception(Errors.MISC_FAILURE, "No XdomainSlaves defined. Please use the kony.sdk.setXdomainSlaves({'http://authtenant.konycloud.com':'xdomain'}) to set the Xdomain slaves");
    }
    return kony.sdk.XdomainSlaves;
};

kony.sdk.setXdomainSlaves = function(slaveEndPointMap) {
    if (!slaveEndPointMap) {
        throw new Exception(Errors.MISC_FAILURE, "Invalid slave end points");
    }
    for (var key in slaveEndPointMap) {
        kony.sdk.XdomainSlaves[key] = slaveEndPointMap[key];
    }
}

kony.sdk.getXdomainLibPath = function() {
    return kony.sdk.XdomainLibPath;
}

kony.sdk.setXdomainLibPath = function(path) {
    if (!path) {
        throw new Exception(Errors.MISC_FAILURE, "Invalid path");
    }
    kony.sdk.XdomainLibPath = path;
}

function xdomain_init(callback) {


    jQuery.getScript(kony.sdk.getXdomainLibPath()).done(function() {
        if (typeof(xdomain) !== 'undefined') {
            kony.sdk.logsdk.info("xdomain Script loading done");
            callback(xdomain);
        } else {
            throw new Exception(Errors.MISC_FAILURE, "not able to fetch xdomain library from " + kony.sdk.getXdomainLibPath());
        }

    }).fail(function() {
        //TODO: handle failure case
        throw new Exception(Errors.MISC_FAILURE, "xdomain library load failed from " + kony.sdk.getXdomainLibPath());
    });
}

function getDeviceIdForIOSPlatform() {
    if(kony.os.deviceInfo().osversion >= 6.0) {
        return kony.os.deviceInfo().identifierForVendor;
    }
    return kony.os.deviceInfo().customdeviceid;
}

//Helps to prepare the input wrapped into kony.net.FormData
kony.sdk.getFormData = function(payload) {
    var formData = new kony.net.FormData();
    formData.append("jsondata", JSON.stringify(payload));

    return formData;
}

//Helps to update prepare the input wrapped into kony.net.FormData
kony.sdk.updateFormData = function(formData, key, value) {
    formData.append(key, JSON.stringify(value));
    return formData;
}

//Helps to get the atype for Spa and DesktopWeb applications it would be "spa" ,for android wear applications it would be "watch" and remaining it would be "native"
kony.sdk.getAType = function() {
    var returnVal = "native";
    //#ifdef spaip
    returnVal = "spa";
    //#endif
    //#ifdef spaan
    returnVal = "spa";
    //#endif
    //#ifdef spabb
    returnVal = "spa";
    //#endif
    //#ifdef spawindows
    returnVal = "spa";
    //#endif
    //#ifdef spabbnth
    returnVal = "spa";
    //#endif
    //#ifdef spawinphone8
    returnVal = "spa";
    //#endif
    //#ifdef spaipad
    returnVal = "spa";
    //#endif
    //#ifdef spatabandroid
    returnVal = "spa";
    //#endif
    //#ifdef spaplaybook
    returnVal = "spa";
    //#endif
    //#ifdef spatabwindows
    returnVal = "spa";
    //#endif
    //#ifdef desktopweb
    returnVal = "spa";
    //#endif
    //#ifdef androidwearos
    returnVal = "watch";
    //#endif
    return returnVal;
};

kony.sdk.setLicenseCall = function(appKey,appSecret,data){
    //checking if new MF app is connected
    var reportingServiceUrl = data.reportingsvc.session;
    if(typeof(appConfig) != "undefined" ) {
        if ((appKey != appConfig.appKey) && (appSecret != appConfig.appSecret) &&(data.selflink != appConfig.serviceUrl)) {
            appConfig.isturlbase = reportingServiceUrl.replace("/IST", "");
            appConfig.appKey = appKey;
            appConfig.appSecret = appSecret;
            appConfig.serviceUrl = data.selflink;
            appConfig.svcDoc=data;
            //IST is triggered with previous sid and new MF-appd details on new IST server.
            kony.license.captureKonyLicenseUsage(true);
        }else if ((appKey != appConfig.appKey) && (appSecret != appConfig.appSecret) &&(data.selflink == appConfig.serviceUrl)) {
            kony.license.createSession();
            appConfig.appKey = appKey;
            appConfig.appSecret = appSecret;
            appConfig.serviceUrl = data.selflink;
            appConfig.svcDoc=data;
            //IST is triggered with new sid and new MF-appd details on same IST server.
            kony.license.captureKonyLicenseUsage(true);
        }
    }
};

kony.sdk.saveMetadatainDs = function(appKey,appSecret,servConfig) {

    // Saving App metadata in storage for Persistence.
    kony.sdk.isLicenseUrlAvailable = true;

    var appId = {
        "appKey": appKey,
        "appSecret": appSecret,
        "serviceUrl": servConfig.selflink,
        "appVersion": appConfig.appVersion,
        "licenseUrl": servConfig.reportingsvc.session

	}
	if(typeof(sdkInitConfig)!== "undefined"){
		sdkInitConfig.appKey = appKey;
		sdkInitConfig.appSecret = appSecret;
		sdkInitConfig.serviceUrl = servConfig.selflink;
	}
    kony.sdk.nativestore.setItem(appConfig.appId+"_mobileFabricServiceDoc", JSON.stringify(servConfig));

    kony.sdk.nativestore.setItem(appConfig.appId, JSON.stringify(appId));

};

kony.sdk.deleteMetadatafromDs = function() {

    kony.sdk.nativestore.removeItem(appConfig.appId);
};

/**
 * Validates the deeplink params. A valid deeplink redirection will contain params "code" & "launchmode" is 3.
 * @param {map} params  - query parameters from the deeplink redirection
 */
kony.sdk.isValidDeeplinkCallback = function(params) {
    if (params && params.launchmode == kony.sdk.LAUNCHMODE_DEEPLINK && params.launchparams.code)
        return true;
    else
        return false;
}

kony.sdk.getReportingParamsForOfflineObjects = function() {
    var reportingData = kony.sdk.getPayload(konyRef);
    reportingData.xmode = "offline";
    var sessionId = null;
    if (kony.ds) {
        sessionId = kony.ds.read("konyUUID");
    }

    if(sessionId){
        reportingData.rsid = sessionId[0];
    }

    if (!reportingData.rsid) {
        kony.sdk.logsdk.warn("### kony.sdk.getReportingParamsForOfflineObjects:: rsid is either empty,null or undefined");
    }

    return JSON.stringify(reportingData);
}

var MFAppVersion;

kony.sdk.setFabricAppVersion = function(version){
    MFAppVersion = version;
}

/**
 * Returns the default fabric application version. For auto init app version will be available in appConfig,
 * for manual init developer has to send fabric version explicitly.
 *
 * Fabric version in manual init has more priority over one specified in visualizer.
 * @return {*}
 */
kony.sdk.getFabricAppVersion = function(){
    if (!kony.sdk.isNullOrUndefined(MFAppVersion)){
		return MFAppVersion;
	}        
	else if (!kony.sdk.isNullOrUndefined(appConfig) && !kony.sdk.isNullOrUndefined(appConfig.runtimeAppVersion)){
		return appConfig.runtimeAppVersion;
	}
}

//#ifdef KONYSYNC_ANDROID

/*
JS Bindings to SyncV2 native classes
*/
kony.sdk.SyncV2Classes = (function(){
    var instance = null;
    var LOG_PREFIX = "kony.sdk.SyncV2Classes";

    function createInstance(){
        kony.sdk.logsdk.info(LOG_PREFIX+": Creating instance of SyncV2Classes");
        var obj = {};
        obj.ApplicationSync = java.import("sync.kony.com.syncv2library.Android.SyncMFInterface.ApplicationSync");
        obj.SDKObjectSync = java.import("sync.kony.com.syncv2library.Android.SyncMFInterface.SDKObjectSync");
        obj.KonyMain = java.import("com.konylabs.android.KonyMain");
        obj.SDKObjectServiceSync = java.import("sync.kony.com.syncv2library.Android.SyncMFInterface.SDKObjectServiceSync");
        obj.ApplicationSync.setApplicationContext(obj.KonyMain.getAppContext());
        obj.SyncCallback = java.newClass("SyncCallback", "java.lang.Object", ["sync.kony.com.syncv2library.Android.SyncMFInterface.SyncCallback"], 
            {

                successCallback: undefined,

                successLog: "onSuccess",

                failureLog: "onFailure",

                failureCallback: undefined,

                onSuccess: function(obj) {
                    kony.sdk.logsdk.info("SyncCallback : "+this.successLog);
                    this.successCallback(obj);
                },

                onFailure: function(error){
                    kony.sdk.logsdk.error("SyncCallback : "+this.failureLog);
                    var err = new Exception(error.getErrorCode(), error.getLocalizedMessage());
                    var syncErrors = error.getSyncErrors();
                    var callStack = error.getCallStack();
                    var domain = error.getDomain();
                    var userInfo = error.getUserInfo();
                    if(syncErrors) { 
                        err.syncErrors = syncErrors;
                    } 
                    if (callStack) {
                        err.callStack = callStack;
                    }
                    if (domain) {
                        err.domain = domain;
                    }
                    if (userInfo) {
                        var JavaClasses = kony.sdk.JavaClasses.import();
                        var gson = new JavaClasses.GsonBuilder().serializeNulls().create();
                        var infoJson = gson.toJson(userInfo);
                        err.userInfo = JSON.parse(infoJson);
                    }
                    this.failureCallback(err);
                }
            }
        );
		obj.KonySyncProgressCallback = java.newClass("SyncProgressCallback", "java.lang.Object", 
		["sync.kony.com.syncv2library.Android.SyncMFInterface.SyncProgressCallback"], 
            {

                progressCallback: undefined,

                progressLog: "onProgress",

                onProgress: function(obj) {
                    kony.sdk.logsdk.trace("KonySyncProgressCallback : "+this.progressLog);
                    this.progressCallback(obj);
                }
            }
        );
        obj.BinaryDownloadCallback = java.newClass("BinaryDownloadCallback", "java.lang.Object", 
        ["sync.kony.com.syncv2library.Android.SyncMFInterface.BinaryDownloadCallback"], 
            {

                fileDownloadStartedCompletionBlock: undefined,
                streamDownloadCompletionBlock: undefined,
                chunkDownloadCompletedCompletionBlock: undefined,
                fileDownloadCompletedCompletionBlock: undefined,
                downloadFailureCompletionBlock: undefined,

                onFileDownloadStartedLog: "onFileDownloadStarted",
                onStreamDownloadCompletedLog: "onStreamDownloadCompleted",
                onChunkDownloadCompletedLog: "onChunkDownloadCompleted",
                onFileDownloadCompletedLog: "onFileDownloadCompleted",
                onDownloadFailureLog: "onDownloadFailure",

                onFileDownloadStarted: function(obj) {
                    kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onFileDownloadStartedLog);
                    this.fileDownloadStartedCompletionBlock(obj);
                },

                onStreamDownloadCompleted: function(obj) {
                    kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onStreamDownloadCompletedLog);
                    this.streamDownloadCompletionBlock(obj);
                },

                onChunkDownloadCompleted: function(obj) {
                    kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onChunkDownloadCompletedLog);
                    this.chunkDownloadCompletedCompletionBlock(obj);
                },

                onFileDownloadCompleted: function(obj) {
                    kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onFileDownloadCompletedLog);
                    this.fileDownloadCompletedCompletionBlock(obj);
                },

                onDownloadFailure: function(error) {
                    kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onDownloadFailureLog);
                    var err = new Exception(error.getErrorCode(), error.getLocalizedMessage());
                    var syncErrors = error.getSyncErrors();
                    var callStack = error.getCallStack();
                    var domain = error.getDomain();
                    var userInfo = error.getUserInfo();

                    if(syncErrors) { 
                        err.syncErrors = syncErrors;
                    } 
                    if (callStack) {
                        err.callStack = callStack;
                    }
                    if (domain) {
                        err.domain = domain;
                    }
                    if (userInfo) {
                        var JavaClasses = kony.sdk.JavaClasses.import();
                        var gson = new JavaClasses.GsonBuilder().serializeNulls().create();
                        var infoJson = gson.toJson(userInfo);
                        err.userInfo = JSON.parse(infoJson);
                    }

                    this.downloadFailureCompletionBlock(err);
                }
            }
        );
		
        return obj;
    }

    return {
        import : function(){
            kony.sdk.logsdk.info(LOG_PREFIX+": Importing native SyncV2 Classes");
            if(instance === null){
                instance = createInstance();
            }
            return instance;
        }
    };

})();


/*
JS Bindings to Java native classes
*/
kony.sdk.JavaClasses = (function(){
    var instance = null;
    var LOG_PREFIX = "kony.sdk.JavaClasses";

    function createInstance(){
        kony.sdk.logsdk.trace(LOG_PREFIX+": Creating instance of SyncV2Classes");
        var obj = {};
        obj.HashMap = java.import("java.util.HashMap");
        obj.Gson = java.import("com.google.gson.Gson");
        obj.GsonBuilder = java.import("com.google.gson.GsonBuilder");

        return obj;
    }

    return {
        import : function(){
            kony.sdk.logsdk.info(LOG_PREFIX+": Importing native Java Classes");
            if(instance === null){
                instance = createInstance();
            }
            return instance;
        }
    };

})();

kony.sdk.messageIntegrityManager = (function() {
    var instance = null;
    var LOG_PREFIX = "kony.sdk.messageIntegrityManager";

    function createInstance(){
        kony.sdk.logsdk.info(LOG_PREFIX+": Creating instance of messageIntegrityManager");
        var obj = {};
        obj.httpMessageIntegrityManager = java.import("com.kony.sdkcommons.Network.NetworkCore.KNYHTTPMessageIntegrityManager");
        return obj;
    }

    return {
        import : function(){
            kony.sdk.logsdk.info(LOG_PREFIX+": Importing native classes for HTTP message integrity.");
            if(instance === null){
                instance = createInstance();
            }
            return instance;
        }
    };

})();
//#endif
//#ifdef KONYSYNC_ANDROID

kony.sdk.httpIntegrity = kony.sdk.httpIntegrity || {};

kony.sdk.httpIntegrity.getHTTPIntegrityManager = function () {
	var LOG_PREFIX = "kony.sdk.httpIntegrity.getHTTPIntegrityManager";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var httpIntegrityManager = kony.sdk.messageIntegrityManager.import();
    return httpIntegrityManager;
};

kony.sdk.httpIntegrity.setIntegrityCheck = function(propertiesForIntegrity) {
	var LOG_PREFIX = "kony.sdk.httpIntegrity.setIntegrityCheck";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	
	var importedClasses = kony.sdk.httpIntegrity.getHTTPIntegrityManager();
    
    try {
        var propertiesForIntegrityHashMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(propertiesForIntegrity, "Properties being created.");
	    importedClasses.httpMessageIntegrityManager.setIntegrityCheck(propertiesForIntegrityHashMap);
    } catch(error) {
      	var exception = new Exception(error.code, error.message);
        if(error.domain) {
            exception.domain = error.domain;
        }
        if (error.userInfo && error.userInfo.callStack) {
            exception.callStack = error.userInfo.callStack;
        }
		throw exception;
    }    
};

kony.sdk.httpIntegrity.removeIntegrityCheck = function() {
    var LOG_PREFIX = "kony.sdk.httpIntegrity.removeIntegrityCheck";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	
	var importedClasses = kony.sdk.httpIntegrity.getHTTPIntegrityManager();
    importedClasses.httpMessageIntegrityManager.removeIntegrityCheck();
};
//#endif
//#ifdef KONYSYNC_ANDROID

kony.sdk.OfflineObjects.setToken = function(token){
	var LOG_PREFIX = "kony.sdk.OfflineObjects.setToken";
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	syncV2Classes.ApplicationSync.setToken(token);
};

kony.sdk.OfflineObjects.setReportingParams = function(reportingParams){
	var LOG_PREFIX = "kony.sdk.OfflineObjects.setReportingParams";
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	syncV2Classes.ApplicationSync.setReportingParams(reportingParams);
};

kony.sdk.OfflineObjects.createSyncCallback = function(successLog, successCallback, failureLog, failureCallback){
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var syncCallback = new syncV2Classes.SyncCallback();
	syncCallback.successCallback = successCallback;
	syncCallback.successLog = successLog;
	syncCallback.failureCallback = failureCallback;
	syncCallback.failureLog = failureLog;
	return syncCallback;
};

kony.sdk.OfflineObjects.createKonySyncProgressCallback = function(progressLog, progressCallback){
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var konySyncProgressCallback = new syncV2Classes.KonySyncProgressCallback();
	konySyncProgressCallback.progressCallback = progressCallback;
	konySyncProgressCallback.progressLog = progressLog;
	return konySyncProgressCallback;
};

kony.sdk.OfflineObjects.createKonyBinaryDownloadCallback = function(onFileDownloadStartedLog, fileDownloadStartedCompletionBlock, 
	onChunkDownloadCompletedLog, streamDownloadCompletionBlock,
	onStreamDownloadCompletedLog, chunkDownloadCompletedCompletionBlock, 
	onFileDownloadCompletedLog, fileDownloadCompletedCompletionBlock,
	onDownloadFailureLog, downloadFailureCompletionBlock) {

	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var konySyncBinaryDownloadCallback = new syncV2Classes.BinaryDownloadCallback();
	konySyncBinaryDownloadCallback.fileDownloadStartedCompletionBlock = fileDownloadStartedCompletionBlock;
	konySyncBinaryDownloadCallback.streamDownloadCompletionBlock = streamDownloadCompletionBlock;
	konySyncBinaryDownloadCallback.chunkDownloadCompletedCompletionBlock = chunkDownloadCompletedCompletionBlock;
	konySyncBinaryDownloadCallback.fileDownloadCompletedCompletionBlock = fileDownloadCompletedCompletionBlock;
	konySyncBinaryDownloadCallback.downloadFailureCompletionBlock = downloadFailureCompletionBlock;

	return konySyncBinaryDownloadCallback;
};

kony.sdk.OfflineObjects.createHashMapFromJSONObject = function(json, logPrefix){
	if(!json)
		return null;
	var jsonString = JSON.stringify(json);
	kony.sdk.logsdk.debug(logPrefix+" : "+jsonString);
	var JavaClasses = kony.sdk.JavaClasses.import();
	return new JavaClasses.Gson().fromJson(jsonString, JavaClasses.HashMap.class);
}

kony.sdk.OfflineObjects.createJSONObjectFromHashMap = function(hashMap, logPrefix){
	if(!hashMap)
		return null;
	var JavaClasses = kony.sdk.JavaClasses.import();
	var gson = new JavaClasses.GsonBuilder().serializeNulls().create();
	var records = gson.toJson(hashMap);
	kony.sdk.logsdk.debug(logPrefix+" : "+records);
	records = JSON.parse(records);
	return records;
}

kony.sdk.OfflineObjects.setup = function(objServiceList, options, successCallback, failureCallback){

	var LOG_PREFIX = "kony.sdk.OfflineObjects.setup";
	kony.sdk.logsdk.trace("Entering "+LOG_PREFIX);

	var objectServiesMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(objServiceList, "Object Service List to setup with");
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Setup Success", successCallback, "Setup Failed", failureCallback);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "Setup with connection options");
	syncV2Classes.ApplicationSync.syncSetup(objectServiesMap, optionsMap, syncCallback);
};

kony.sdk.OfflineObjects.reset = function(objServiceList, options, successCallback, failureCallback){

	var LOG_PREFIX = "kony.sdk.OfflineObjects.reset";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);

	var objectServiesMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(objServiceList, "Object Service List to reset with");
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Reset Success", successCallback, "Reset Failed", failureCallback);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "Reset with connection options");
	syncV2Classes.ApplicationSync.reset(objectServiesMap, optionsMap, syncCallback);
};

kony.sdk.OfflineObjects.drop = function(options, successCallback, failureCallback){
	kony.sdk.logsdk.trace("Invoking DROP operation from function kony.sdk.OfflineObjects.drop");
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Drop Success", successCallback, "Drop Failed", failureCallback);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "Drop with connection options");
	syncV2Classes.ApplicationSync.drop(optionsMap, syncCallback);
}

kony.sdk.OfflineObjects.rollback = function(successCallback,failureCallback){
	kony.sdk.logsdk.trace("Invoking Rollback operation from function kony.sdk.OfflineObjects.Rollback");
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Rollback Success", successCallback, "Rollback Failed", failureCallback);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	syncV2Classes.ApplicationSync.rollback(syncCallback);
}

kony.sdk.OfflineObjects.executeSelectQuery = function(query, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.OfflineObjects.executeSelectQuery";
	kony.sdk.logsdk.trace("Invoking executeSelectQuery operation from function kony.sdk.OfflineObjects.executeSelectQuery");
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("ExecuteSelectQuery Success", onSuccess, "ExecuteSelectQuery Failed", failureCallback);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	syncV2Classes.ApplicationSync.executeSelectQuery(query, syncCallback);
	
	function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Execute Select Query records success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "Records");
		successCallback(jsonObject);
    }
}

kony.sdk.KNYObj.createSDKObjectSync = function(name){
	var LOG_PREFIX = "kony.sdk.KNYObj.createSDKObjectSync";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	try {
     	var sdkObjectSync = new syncV2Classes.SDKObjectSync(name); 
    } catch(error) {
      	var exception = new Exception(error.code, error.message);
        if(error.domain) {
            exception.domain = error.domain;
        }
        if (error.userInfo && error.userInfo.callStack) {
            exception.callStack = error.userInfo.callStack;
        }
		throw exception;
    }
	return sdkObjectSync;
};

kony.sdk.KNYObj.startSync = function(knyObj, syncConfig, successCallback, failureCallback, progressCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.startSync";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Syncing "+knyObj.name+" object success", onSuccess, "Syncing "+knyObj.name+" object failed", onFailure);
	var konyProgressCallback = kony.sdk.OfflineObjects.createKonySyncProgressCallback("Sync Progress Callback Called", onProgress);
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(syncConfig, "Object sync options");
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.startSync(optionsMap, syncCallback, konyProgressCallback);

	function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Sync success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "syncSuccessCallbackObject");
		successCallback(jsonObject);
	}

	function onFailure(error){
		if(error.syncErrors) {
			error.syncErrors = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(error.syncErrors, "syncFailureCallbackObject");
		}
		kony.sdk.logsdk.error(LOG_PREFIX+": Sync failed with error: "+JSON.stringify(error));
		failureCallback(error);
	}
	
	function onProgress(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Sync Progress Callback");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "syncProgressCallbackObject");
		progressCallback(jsonObject);
	}
};

kony.sdk.KNYObj.create = function(knyObj, record, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.create";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Creating record in "+knyObj.name+" object success", onSuccess, "Creating record in "+knyObj.name+" object failed", onFailure);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	var syncRecordHashMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(record, "Records being created");
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "Creating Records with options");
	sdkObjectSync.create(syncRecordHashMap, optionsMap, syncCallback);

	function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Creating records success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "Created Records PKs");
		successCallback(jsonObject);
	}

	function onFailure(error){
		kony.sdk.logsdk.error(LOG_PREFIX+": Creating records failed with error: "+JSON.stringify(error));
		failureCallback(error);
	}
};

kony.sdk.KNYObj.updateByPK = function(knyObj, record, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.updateByPK";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Updating record in "+knyObj.name+" object success", onSuccess, "Updating record in "+knyObj.name+" object failed", onFailure);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	var syncRecordHashMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(record, "Records being updated");
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "Updating records with options");
	sdkObjectSync.updateByPK(syncRecordHashMap, optionsMap, syncCallback);

	function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Updating records success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "Updated Records PKs");
		successCallback(jsonObject);
	}

	function onFailure(error){
		kony.sdk.logsdk.error(LOG_PREFIX+": Updating records failed with error: "+JSON.stringify(error));
		failureCallback(error);
	}
}

kony.sdk.KNYObj.deleteByPK = function(knyObj, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.deleteByPK";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Deleting record in "+knyObj.name+" object success", successCallback, "Deleting record in "+knyObj.name+" object failed", failureCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "Deleting record with options");
	sdkObjectSync.deleteByPK(optionsMap, syncCallback);
}

kony.sdk.KNYObj.get = function(knyObj, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.get";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Retrieving record from "+knyObj.name+" object success", onSuccess, "Retrieving record from "+knyObj.name+" object failed", onFailure);
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "Getting records with options");
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.get(optionsMap, syncCallback);

    function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Getting records success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "Records");
		successCallback(jsonObject);
    }

    function onFailure(error){
    	kony.sdk.logsdk.error(LOG_PREFIX+": Getting records failed with error: "+JSON.stringify(error));
      	failureCallback(error);
    }
}

kony.sdk.KNYObj.rollback = function(knyObj, primaryKeyValueMap, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.rollback";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Rollback on "+knyObj.name+" object success", onSuccess, "Rollback on "+knyObj.name+" object failed", onFailure);
	var primaryKeys = kony.sdk.OfflineObjects.createHashMapFromJSONObject(primaryKeyValueMap, "Getting primaryKeys");
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.rollback(primaryKeys, syncCallback);

    function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Rollback success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "rollbackSuccessCallbackObject");
		successCallback(jsonObject);
	}

	function onFailure(error){
		kony.sdk.logsdk.error(LOG_PREFIX+": Rollback failed with error: "+JSON.stringify(error));
		failureCallback(error);
	}
}

kony.sdk.KNYObj.getBinary = function(knyObj, options, fileDownloadStartedCompletionBlock, chunkDownloadCompletedCompletionBlock, 
		streamDownloadCompletionBlock, fileDownloadCompletedCompletionBlock, downloadFailureCompletionBlock){
	var LOG_PREFIX = "kony.sdk.KNYObj.getBinary";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var binaryCallback = kony.sdk.OfflineObjects.createKonyBinaryDownloadCallback("Get binary on "+knyObj.name+" object started", onFileDownloadStarted,
	 "Get binary on "+knyObj.name+" object: chunk download completed", onChunkDownloadCompleted,
	 "Get binary on "+knyObj.name+" object: stream download completed", onStreamDownloadCompleted,
	 "Get binary on "+knyObj.name+" object: file download completed", onFileDownloadCompleted,
	 "Get binary on "+knyObj.name+" object failed", onDownloadFailure);
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "Updating records with options");
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.getBinary(optionsMap, binaryCallback);

	function onFileDownloadStarted(obj) {
        kony.sdk.logsdk.info(LOG_PREFIX + ": File download started");
        var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "getBinary");
        fileDownloadStartedCompletionBlock(jsonObject);
    }

    function onStreamDownloadCompleted(obj) {
        kony.sdk.logsdk.info(LOG_PREFIX + ": Stream download completed");
        var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "getBinary");
        streamDownloadCompletionBlock(jsonObject);
    }

    function onChunkDownloadCompleted(obj) {
        kony.sdk.logsdk.info(LOG_PREFIX + ": Chunk download completed");
        var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "getBinary");
        chunkDownloadCompletedCompletionBlock(jsonObject);
    }

    function onFileDownloadCompleted(obj) {
        kony.sdk.logsdk.info(LOG_PREFIX + ": File download completed");
        var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "getBinary");
        fileDownloadCompletedCompletionBlock(jsonObject);
    }

    function onDownloadFailure(error) {
        kony.sdk.logsdk.error(LOG_PREFIX + ": File download failed with error: " + JSON.stringify(error));
        downloadFailureCompletionBlock(error);
    }
}

kony.sdk.KNYObj.markForUpload = function(knyObj, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.markForUpload";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("MarkForUpload on "+knyObj.name+" object success", onSuccess, "MarkForUpload on "+knyObj.name+" object failed", onFailure);
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "Mark for upload records with options");
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.markForUpload(optionsMap, syncCallback);

    function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": MarkForUpload success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "MarkForUploadSuccessCallbackObject");
		successCallback(jsonObject);
	}

	function onFailure(error){
		kony.sdk.logsdk.error(LOG_PREFIX+": MarkForUpload failed with error: "+JSON.stringify(error));
		failureCallback(error);
	}
}

kony.sdk.KNYObj.cancelSync = function(knyObj, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.cancelSync";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("cancel on "+knyObj.name+" object success", onSuccess, "Cancel on "+knyObj.name+" object failed", onFailure);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.cancelSync(syncCallback);

    function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Cancel success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "cancelSuccessCallbackObject");
		successCallback(jsonObject);
	}

	function onFailure(error){
		kony.sdk.logsdk.error(LOG_PREFIX+": Cancel failed with error : "+error);
		failureCallback(error);
	}
}

kony.sdk.KNYObj.getUploadDeferredRecordKeys = function(knyObj, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.getUploadDeferredRecordKeys";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Retrieving record from "+knyObj.name+" object success", onSuccess, "Retrieving record from "+knyObj.name+" object failed", onFailure);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.getUploadDeferredRecordKeys(syncCallback);

    function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Getting deffered records primary keys success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "Records");
		successCallback(jsonObject);
    }

    function onFailure(error){
    	kony.sdk.logsdk.error(LOG_PREFIX+": Getting deffered records failed with error: "+JSON.stringify(error));
      	failureCallback(error);
    }
}

kony.sdk.KNYObjSvc.createSDKObjectServiceSync = function(name){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.createSDKObjectServiceSync";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
    try {
	   var sdkObjectServiceSync = new syncV2Classes.SDKObjectServiceSync(name);
    } catch(error) {
      	var exception = new Exception(error.code, error.message);
        if(error.domain) {
            exception.domain = error.domain;
        }
        if (error.userInfo && error.userInfo.callStack) {
            exception.callStack = error.userInfo.callStack;
        }
		throw exception;
    }
	return sdkObjectServiceSync;
};

kony.sdk.KNYObjSvc.startSync = function(knyObjSvc, syncConfig, successCallback, failureCallback, progressCallback){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.startSync";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Syncing "+knyObjSvc.name+" object service success", onSuccess, "Syncing "+knyObjSvc.name+" object service failed", onFailure);
	var konyProgressCallback = kony.sdk.OfflineObjects.createKonySyncProgressCallback("Sync Progress Callback Called", onProgress);
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(syncConfig, "Object service sync options");
	var sdkObjectServiceSync = knyObjSvc.getSdkObjectServiceSync();
	sdkObjectServiceSync.startSync(optionsMap, syncCallback, konyProgressCallback);

	function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Sync success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "syncSuccessCallbackObject");
		successCallback(jsonObject);
	}

	function onFailure(error){
		if(error.syncErrors) {
			error.syncErrors = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(error.syncErrors, "syncFailureCallbackObject");
		}
		kony.sdk.logsdk.error(LOG_PREFIX+": Sync failed with error: "+JSON.stringify(error));
		failureCallback(error);
	}
	
	function onProgress(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Sync Progress Callback");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "syncProgressCallbackObject");
		progressCallback(jsonObject);
	}
};

kony.sdk.KNYObjSvc.rollback = function(knyObjSvc, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.rollback";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Rollback on "+knyObjSvc.name+" object service success", onSuccess, "Rollback on "+knyObjSvc.name+" object service failed", onFailure);
	var sdkObjectServiceSync = knyObjSvc.getSdkObjectServiceSync();
	sdkObjectServiceSync.rollback(syncCallback);

	function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Rollback success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "rollbackSuccessCallbackObject");
		successCallback(jsonObject);
	}

	function onFailure(error){
		kony.sdk.logsdk.error(LOG_PREFIX+": Rollback failed with error: "+JSON.stringify(error));
		failureCallback(error);
	}
};

kony.sdk.KNYObjSvc.cancelSync = function(knyObjSvc, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.cancelSync";
	kony.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("cancel on "+knyObjSvc.name+" object service success", onSuccess, "Cancel on "+knyObjSvc.name+" object service failed", onFailure);
	var sdkObjectServiceSync = knyObjSvc.getSdkObjectServiceSync();
	sdkObjectServiceSync.cancelSync(syncCallback);

    function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Cancel success");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "cancelSuccessCallbackObject");
		successCallback(jsonObject);
	}

	function onFailure(error){
		kony.sdk.logsdk.error(LOG_PREFIX+": Cancel failed with error : "+error);
		failureCallback(error);
	}
}

kony.sdk.KNYObjSvc.clearOfflineData = function(knyObjSvc, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.clearOfflineData";
	kony.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
	var optionsMap = kony.sdk.OfflineObjects.createHashMapFromJSONObject(options, "clearOfflineData options");
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Successfully cleared offline data in "+knyObjSvc.name+" object service.", onSuccess, "Failed to clear offline data in "+knyObjSvc.name+" object service.", onFailure);
	var sdkObjectServiceSync = knyObjSvc.getSdkObjectServiceSync();
	sdkObjectServiceSync.clearData(optionsMap, syncCallback);

	function onSuccess(obj){
		kony.sdk.logsdk.info(LOG_PREFIX+": Successfully cleared offline data.");
		var jsonObject = kony.sdk.OfflineObjects.createJSONObjectFromHashMap(obj, "clearDataSuccessCallbackObject");
		successCallback(jsonObject);
	}

	function onFailure(error){
		kony.sdk.logsdk.error(LOG_PREFIX+": Clearing offline data failed with error: "+JSON.stringify(error));
		failureCallback(error);
	}
};
//#endif
if(kony.sdk){
    kony.sdk.binary = {};
}

kony.sdk.binary.constants = {
    ENDPOINT_URL:"endpointUrl",
    DOMAIN:"domain",
    RELATIVE_PATH:"relativepath",
    URL:"URL"
};

kony.sdk.binary.getBinaryData = function(inputParams, streaming, downloadConfig,
                                         fileDownloadStartedCallback, chunkDownloadCompletedCallback,
                                         fileDownloadCompletedCallback, downloadFailureCallback, options){
    if(kony.sdk.isNullOrUndefined(downloadConfig[kony.sdk.binary.constants.ENDPOINT_URL]) &&
        kony.sdk.isNullOrUndefined(downloadConfig[kony.sdk.binary.constants.DOMAIN]) &&
        kony.sdk.isNullOrUndefined(downloadConfig[kony.sdk.binary.constants.RELATIVE_PATH])) {
        kony.sdk.verifyAndCallClosure(downloadFailureCallback, "endpointUrl or domain and relative path is required in order to download a file");
        return;
    }

    options = kony.sdk.binary.injectDomainAndKonyAuthorization(options);

    if(typeof(binarydata) !== "undefined" ) {
        binarydata.getOnlineBinaryData(
            inputParams,
            streaming,
            downloadConfig,
            fileDownloadStartedCallback,
            chunkDownloadCompletedCallback,
            fileDownloadCompletedCallback,
            downloadFailureCallback,
            options);
    } else {
        kony.sdk.verifyAndCallClosure(downloadFailureCallback, "FFI is not configured to use Binary Apis");
    }
};

kony.sdk.binary.uploadBinaryData = function(uploadParams, fileUploadStartedCallback, chunkUploadCompletedCallback,
                                            fileUploadCompletedCallback, fileUploadFailureCallback, options){
    if(kony.sdk.isNullOrUndefined(uploadParams[kony.sdk.binary.constants.URL])){
        kony.sdk.verifyAndCallClosure(downloadFailureCallback, "URL is required in order to download a file");
        return;
    }

    options = kony.sdk.binary.injectDomainAndKonyAuthorization(options);

    if(typeof(binarydata) !== "undefined" ) {
        binarydata.uploadBinaryData(
            uploadParams,
            fileUploadStartedCallback,
            chunkUploadCompletedCallback,
            fileUploadCompletedCallback,
            fileUploadFailureCallback,
            options);
    } else {
        kony.sdk.verifyAndCallClosure(downloadFailureCallback, "FFI is not configured to use Binary Apis");
    }
};

kony.sdk.binary.injectDomainAndKonyAuthorization = function(options){
    if(kony.sdk.isNullOrUndefined(options)) {
        options = {};
    }
    options[kony.sdk.binary.constants.DOMAIN] = konyRef.sessionReportingURL.split("/IST")[0];
    if(!kony.sdk.isNullOrUndefined(konyRef.currentClaimToken)) {
        options[Constants.APP_AUTHORIZATION_HEADER] = konyRef.currentClaimToken;
    }
    return options;
}
if (typeof(kony.sdk.metric) === "undefined") {
	kony.sdk.metric = {};
}

kony.sdk.metric.eventFlowTag = "";
kony.sdk.metric.eventConfig = {
	"confType": "BUFFER",
	"eventBufferAutoFlushCount": kony.sdk.metric.eventBufferAutoFlushValue,
	"eventBufferMaxCount": kony.sdk.metric.eventBufferMaxValue
};
kony.sdk.metric.eventBufferMaxValue = 1000;
kony.sdk.metric.eventBufferAutoFlushValue = 15;
kony.sdk.metric.characterLengthLimit = 256;
kony.sdk.metric.reportEventBufferArray = [];
kony.sdk.metric.reportEventBufferBackupArray = [];
kony.sdk.metric.retrievedDS = false;
kony.sdk.metric.eventBufferCount = 0;
kony.sdk.metric.eventTypeMap = {
	"formentry": "FormEntry",
	"touch": "Touch",
	"servicecall": "ServiceCall",
	"gesture": "Gesture",
	"orientation": "Orientation",
	"custom": "Custom"
};
kony.sdk.metric.errorCodeMap = {
	"1000": true,
	"1011": true,
	"1012": true,
	"1014": true,
	"1015": true,
	"1016": true
};

kony.sdk.metric.setEventFlowTag = function(flowTag) {
	if (kony.sdk.isNullOrUndefined(flowTag)) {
		throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event flow tag");
	} else if (flowTag.length <= kony.sdk.metric.characterLengthLimit) {
		kony.sdk.metric.eventFlowTag = flowTag;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
	}
};

kony.sdk.metric.clearEventFlowTag = function() {
	kony.sdk.metric.eventFlowTag = "";
};

kony.sdk.metric.getEventFlowTag = function() {
	return kony.sdk.metric.eventFlowTag;
};

kony.sdk.metric.setEventConfig = function(confType, eventBufferAutoFlushCount, eventBufferMaxCount) {
	if (kony.sdk.isNullOrUndefined(confType)) {
		throw new Exception(Errors.METRICS_FAILURE, "Config Type can not be null");
	} else {
		confType = confType.toUpperCase();
	}
	if (confType === "BUFFER") {
		kony.sdk.metric.eventConfig["confType"] = confType;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Invalid value for config type");
	}
	if (!kony.sdk.isNullOrUndefined(eventBufferMaxCount) && typeof(eventBufferMaxCount) === "number" && eventBufferMaxCount > 0) {
		kony.sdk.metric.eventConfig["eventBufferMaxCount"] = eventBufferMaxCount;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "eventBufferMaxCount has to be a Number and greater than 0");
	}
	if (!kony.sdk.isNullOrUndefined(eventBufferAutoFlushCount) && typeof(eventBufferAutoFlushCount) === "number" && eventBufferAutoFlushCount > 0 && eventBufferAutoFlushCount <= eventBufferMaxCount) {
		kony.sdk.metric.eventConfig["eventBufferAutoFlushCount"] = eventBufferAutoFlushCount;
	} else if (eventBufferAutoFlushCount >= eventBufferMaxCount) {
		kony.sdk.metric.eventConfig["eventBufferMaxCount"] = 1000;
		throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount can not be greater than eventBufferMaxCount");
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount has to be a Number and greater than 0");
	}
};

kony.sdk.metric.reportEvent = function(evttype, evtSubType, formID, widgetID, flowTag) {
	if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
		kony.sdk.metric.readFromDS();
	}
	kony.sdk.metric.eventBufferCount = kony.sdk.metric.reportEventBufferBackupArray.length + kony.sdk.metric.reportEventBufferArray.length;

	if (kony.sdk.metric.eventBufferCount === kony.sdk.metric.eventConfig["eventBufferMaxCount"]) {
		throw new Exception(Errors.DATA_STORE_EXCEPTION, "Reached maximum limit to store events");
		return;
	}
	var reportEventMap = {};
	reportEventMap.ts = kony.sdk.formatCurrentDate(new Date());
	evttype = evttype.toLowerCase();
	if (kony.sdk.isNullOrUndefined(kony.sdk.metric.eventTypeMap[evttype])) {
		throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event type");
		return;
	} else {
		reportEventMap["evttype"] = kony.sdk.metric.eventTypeMap[evttype];
	}
	if (kony.sdk.isNullOrUndefined(evtSubType)) {
		reportEventMap["evtSubType"] = "";
	} else if (evtSubType.length <= kony.sdk.metric.characterLengthLimit) {
		reportEventMap["evtSubType"] = evtSubType;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	if (kony.sdk.isNullOrUndefined(formID)) {
		reportEventMap["formID"] = kony.application.getCurrentForm().id;
	} else if (formID.length <= kony.sdk.metric.characterLengthLimit) {
		reportEventMap["formID"] = formID;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	if (kony.sdk.isNullOrUndefined(widgetID)) {
		reportEventMap["widgetID"] = "";
	} else if (widgetID.length <= kony.sdk.metric.characterLengthLimit) {
		reportEventMap["widgetID"] = widgetID;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	if (kony.sdk.isNullOrUndefined(flowTag)) {
		reportEventMap["flowTag"] = kony.sdk.metric.getEventFlowTag();
	} else if (flowTag.length <= kony.sdk.metric.characterLengthLimit) {
		reportEventMap["flowTag"] = flowTag;
	} else {
		throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + kony.sdk.metric.characterLengthLimit + " characters");
		return;
	}
	reportEventMap.SID = kony.ds.read("konyUUID")[0];
	kony.sdk.metric.reportEventBufferArray.push(reportEventMap);

	if (kony.sdk.metric.reportEventBufferArray.length % kony.sdk.metric.eventConfig["eventBufferAutoFlushCount"] === 0) {
		kony.sdk.metric.flushEvents();
	}
};

kony.sdk.metric.flushEvents = function() {
	
	if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
		kony.sdk.metric.readFromDS();
	}
	if (kony.sdk.metric.reportEventBufferBackupArray.length === 0 && kony.sdk.metric.reportEventBufferArray.length === 0) {
		kony.sdk.logsdk.warn("There are no events to flush");
		return;
	}
	var payload = kony.sdk.getPayload(kony.sdk.getCurrentInstance());
	var params = {};
	if (kony.sdk.metric.reportEventBufferArray.length !== 0) {
		kony.sdk.metric.pushEventsToBufferArray();
	}
	var headers = {
		"Content-Type": "application/x-www-form-urlencoded"
	};
	params.httpheaders = headers;
	payload.events = kony.sdk.metric.reportEventBufferBackupArray;
	payload.svcid = "SendEvents";
	payload.rsid = kony.sdk.metric.reportEventBufferBackupArray[0].SID;
	params.konyreportingparams = JSON.stringify(payload);
	kony.net.invokeServiceAsync(kony.sdk.currentInstance.customReportingURL, params, flushCallback);

	function flushCallback(status, response) {
		if (status === 400) {
			if (response.opstatus == 0) {
				kony.sdk.metric.clearBufferEvents();
			} else if (kony.sdk.metric.errorCodeMap[response.opstatus]) {
				kony.sdk.metric.saveInDS();
			} else {
				kony.sdk.metric.clearBufferEvents();
			}
		} else if (status === 300) {
			kony.sdk.metric.saveInDS();
		}
	}
};

/*Stores event data in Data Store on failure of service Call*/
kony.sdk.metric.saveInDS = function() {
	if(!kony.sdk.isNullOrUndefined(kony.sdk.metric.reportEventBufferBackupArray) && kony.sdk.metric.reportEventBufferBackupArray.length > 0)
	  {
		var eventsToSave = [];
	    eventsToSave.push(JSON.stringify(kony.sdk.metric.reportEventBufferBackupArray));
	    kony.ds.save(eventsToSave, "konyMetricsBuffer");
	    kony.sdk.metric.reportEventBufferBackupArray = [];
	  }
    };

/*Clearing events sent to server */
kony.sdk.metric.clearBufferEvents = function() {
	kony.sdk.metric.reportEventBufferBackupArray = [];
	kony.ds.remove("konyMetricsBuffer");
};

/*Reading any pending events from Data Store */
kony.sdk.metric.readFromDS = function() {
	var eventsFromDS = kony.ds.read("konyMetricsBuffer");
	if (eventsFromDS !== null) {
		var pushToArray = [];
		pushToArray.push(JSON.parse(eventsFromDS[0]));
		kony.sdk.metric.reportEventBufferBackupArray.push.apply(kony.sdk.metric.reportEventBufferBackupArray, pushToArray);
	}
};

/*Pushes events received from user to BufferBackupArray which will be flushed to server */
kony.sdk.metric.pushEventsToBufferArray = function() {
	kony.sdk.metric.reportEventBufferBackupArray.push.apply(kony.sdk.metric.reportEventBufferBackupArray, kony.sdk.metric.reportEventBufferArray);
	kony.sdk.metric.reportEventBufferArray = [];
};

kony.sdk.metric.getEventsInBuffer = function() {
	var eventsFromDS = kony.ds.read("konyMetricsBuffer");
	var eventsToReturn = [];
	if (!kony.sdk.isNullOrUndefined(eventsFromDS)) {
		eventsToReturn.push(JSON.parse(eventsFromDS[0]));
	}
	if (kony.sdk.metric.reportEventBufferArray.length !== 0) {
		eventsToReturn.push.apply(eventsToReturn, kony.sdk.metric.reportEventBufferArray);
	}
	if (eventsToReturn.length !== 0) {
		return eventsToReturn;
	} else {
		return null;
	}
};
//#ifdef KONYSYNC_IOS

/*
JS Bindings to SyncV2 native classes
*/
kony.sdk.SyncV2Classes = (function(){
    var instance = null;
    var LOG_PREFIX = "kony.sdk.SyncV2Classes";

    function createInstance(){
        kony.sdk.logsdk.info(LOG_PREFIX+": Creating instance of SyncV2Classes");
        var obj = {};
        obj.ApplicationSync = objc.import("ApplicationSync");
        obj.SDKObjectSync = objc.import("SDKObjectSync");
        obj.SDKObjectServiceSync = objc.import("SDKObjectServiceSync");
        return obj;
    }

    return {
        import : function(){
            kony.sdk.logsdk.info(LOG_PREFIX+": Importing native SyncV2 Classes");
            if(instance === null){
                instance = createInstance();
            }
            return instance;
        }
    };

})();


kony.sdk.messageIntegrityManager = (function() {
    var instance = null;
    var LOG_PREFIX = "kony.sdk.messageIntegrityManager";

    function createInstance(){
        kony.sdk.logsdk.info(LOG_PREFIX+": Creating instance of messageIntegrityManager");
        var obj = {};
        obj.httpMessageIntegrityManager = objc.import("KNYHTTPMessageIntegrityManager");
        return obj;
    }

    return {
        import : function(){
            kony.sdk.logsdk.info(LOG_PREFIX+": Importing native classes for HTTP message integrity.");
            if(instance === null){
                instance = createInstance();
            }
            return instance;
        }
    };

})();

//#endif
//#ifdef KONYSYNC_IOS

kony.sdk.httpIntegrity = kony.sdk.httpIntegrity || {};

kony.sdk.httpIntegrity.getHTTPIntegrityManager = function(){
	var LOG_PREFIX = "kony.sdk.httpIntegrity.getHTTPIntegrityManager";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var httpIntegrityManager = kony.sdk.messageIntegrityManager.import();
	return httpIntegrityManager;
};

kony.sdk.httpIntegrity.setIntegrityCheck = function(propertiesForIntegrity){
	var LOG_PREFIX = "kony.sdk.httpIntegrity.setIntegrityCheck";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	
	var importedClasses = kony.sdk.httpIntegrity.getHTTPIntegrityManager();
	var err = {};
    importedClasses.httpMessageIntegrityManager.setIntegrityCheckError(propertiesForIntegrity, err);
	if(err.error) {
        var exception = new Exception(err.error.code, err.error.localizedDescription);
        if(err.error.domain) {
            exception.domain = err.error.domain;
        }
        if (err.error.userInfo && err.error.userInfo.callStack) {
            exception.callStack = err.error.userInfo.callStack;
        }
        throw exception;
    }
    
};

kony.sdk.httpIntegrity.removeIntegrityCheck = function() {
    var LOG_PREFIX = "kony.sdk.httpIntegrity.removeIntegrityCheck";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	
	var importedClasses = kony.sdk.httpIntegrity.getHTTPIntegrityManager();
    importedClasses.httpMessageIntegrityManager.removeIntegrityCheck();
};
//#endif
//#ifdef KONYSYNC_IOS

kony.sdk.OfflineObjects.setToken = function(token){
	var LOG_PREFIX = "kony.sdk.OfflineObjects.setToken";
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	syncV2Classes.ApplicationSync.setToken(token);
};

kony.sdk.OfflineObjects.setReportingParams = function(reportingParams){
	var LOG_PREFIX = "kony.sdk.OfflineObjects.setReportingParams";
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	syncV2Classes.ApplicationSync.setReportingParams(reportingParams);
};

kony.sdk.OfflineObjects.createSyncCallback = function(successLog, successCallback, failureLog, failureCallback){

	return {

		onSuccess : function(obj) {
	        kony.sdk.logsdk.info("SyncCallback : "+successLog);
	        successCallback(obj);
	    },

	    onFailure : function(error){
	        kony.sdk.logsdk.error("SyncCallback : "+failureLog);
	        var exception = new Exception(error.code, error.localizedDescription);
	        if(error.userInfo && error.userInfo.syncErrors) {
	        	exception.syncErrors = error.userInfo.syncErrors;
	        }
            if(error.domain) {
                exception.domain = error.domain;
            }
	        if (error.userInfo && error.userInfo.callStack) {
                exception.callStack = error.userInfo.callStack;
            }
	        failureCallback(exception);
	    }

	};
}

kony.sdk.OfflineObjects.createKonySyncProgressCallback = function(progressLog, progressCallback){

	return {

		onProgress : function(obj) {
	        kony.sdk.logsdk.info("SyncCallback : "+ progressLog);
	        progressCallback(obj);
	    }

	};
}

kony.sdk.OfflineObjects.createKonyBinaryDownloadCallback = function(onFileDownloadStartedLog, fileDownloadStartedCompletionBlock, 
	onChunkDownloadCompletedLog, streamDownloadCompletionBlock,
	onStreamDownloadCompletedLog, chunkDownloadCompletedCompletionBlock, 
	onFileDownloadCompletedLog, fileDownloadCompletedCompletionBlock,
	onDownloadFailureLog, downloadFailureCompletionBlock) {

	return {
		onFileDownloadStarted: function(obj) {
            kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onFileDownloadStartedLog);
            fileDownloadStartedCompletionBlock(obj);
        },

        onStreamDownloadCompleted: function(obj) {
            kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onStreamDownloadCompletedLog);
            streamDownloadCompletionBlock(obj);
        },

        onChunkDownloadCompleted: function(obj) {
            kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onChunkDownloadCompletedLog);
            chunkDownloadCompletedCompletionBlock(obj);
        },

        onFileDownloadCompleted: function(obj) {
            kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onFileDownloadCompletedLog);
            fileDownloadCompletedCompletionBlock(obj);
        },

        onDownloadFailure: function(error) {
            kony.sdk.logsdk.trace("BinaryDownloadCallback : "+this.onDownloadFailureLog);
            var exception = new Exception(error.code, error.localizedDescription);
	        if(error.userInfo && error.userInfo.syncErrors) {
	        	exception.syncErrors = error.userInfo.syncErrors;
	        }
            if(error.domain) {
                exception.domain = error.domain;
            }
	        if (error.userInfo && error.userInfo.callStack) {
                exception.callStack = error.userInfo.callStack;
            }
            downloadFailureCompletionBlock(exception);
        }
	};
}

kony.sdk.OfflineObjects.setup = function(objServiceList, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.OfflineObjects.setup";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Setup Success", successCallback, "Setup Failed", failureCallback);
	syncV2Classes.ApplicationSync.setupSyncWithOptionsOnSuccessOnFailure(objServiceList, options, syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.OfflineObjects.reset = function(objServiceList, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.OfflineObjects.reset";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Reset Success", successCallback, "Reset Failed", failureCallback);
	syncV2Classes.ApplicationSync.resetWithOptionsOnSuccessOnFailure(objServiceList, options, syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.OfflineObjects.drop = function(options, successCallback, failureCallback){
	kony.sdk.logsdk.trace("Invoking DROP operation from function kony.sdk.OfflineObjects.drop");
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Drop Success", successCallback, "Drop Failed", failureCallback);
	syncV2Classes.ApplicationSync.dropOnSuccessOnFailure(options, syncCallback.onSuccess, syncCallback.onFailure);
}

kony.sdk.OfflineObjects.rollback = function(successCallback, failureCallback){
	kony.sdk.logsdk.trace("Invoking Rollback operation from function kony.sdk.OfflineObjects.rollback");
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Rollback Success", successCallback, "Rollback Failed", failureCallback);
	syncV2Classes.ApplicationSync.rollbackOnFailure(syncCallback.onSuccess, syncCallback.onFailure);
}

kony.sdk.OfflineObjects.executeSelectQuery = function(query, successCallback, failureCallback){
	kony.sdk.logsdk.trace("Invoking executeSelectQuery operation from function kony.sdk.OfflineObjects.executeSelectQuery");
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("ExecuteSelectQuery Success", successCallback, "ExecuteSelectQuery Failed", failureCallback);
	syncV2Classes.ApplicationSync.executeSelectQueryOnSuccessOnFailure(query, syncCallback.onSuccess, syncCallback.onFailure);
}

kony.sdk.KNYObj.createSDKObjectSync = function(name){
	var LOG_PREFIX = "kony.sdk.KNYObj.createSDKObjectSync";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var err = {};
	var sdkObjectSync = syncV2Classes.SDKObjectSync.alloc().initWithNameError(name, err);
	if(err.error) {
        var exception = new Exception(err.error.code, err.error.localizedDescription);
        if(err.error.domain) {
            exception.domain = err.error.domain;
        }
        if (err.error.userInfo && err.error.userInfo.callStack) {
            exception.callStack = err.error.userInfo.callStack;
        }
        throw exception;
    }
	return sdkObjectSync;
};

kony.sdk.KNYObj.startSync = function(knyObj, syncConfig, successCallback, failureCallback, progressCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.startSync";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Syncing "+knyObj.name+" object success", successCallback, "Syncing "+knyObj.name+" object failed", failureCallback);
	var konySyncProgressCallback = kony.sdk.OfflineObjects.createKonySyncProgressCallback("Sync Progresss Callback Called", progressCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.startSyncOnSuccessOnFailureOnProgress(syncConfig, syncCallback.onSuccess, syncCallback.onFailure, konySyncProgressCallback.onProgress);
};

kony.sdk.KNYObj.create = function(knyObj, record, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.create";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Creating record in "+knyObj.name+" object success", successCallback, "Creating record in "+knyObj.name+" object failed", failureCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.createOptionsOnSuccessOnFailure(record, options, syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.KNYObj.updateByPK = function(knyObj, record, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.updateByPK";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Updating record in "+knyObj.name+" object success", successCallback, "Updating record in "+knyObj.name+" object failed", failureCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.updateByPKOptionsOnSuccessOnFailure(record, options, syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.KNYObj.deleteByPK = function(knyObj, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.deleteByPK";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Deleting record in "+knyObj.name+" object success", successCallback, "Deleting record in "+knyObj.name+" object failed", failureCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.deleteByPKOnSuccessOnFailure(options, syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.KNYObj.get = function(knyObj, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.get";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Retrieving record from "+knyObj.name+" object success", successCallback, "Retrieving record from "+knyObj.name+" object failed", failureCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.getOnSuccessOnFailure(options, syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.KNYObj.rollback = function(knyObj, primaryKeyValueMap, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.rollback";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Rollback on "+knyObj.name+" object success", successCallback, "Rollback on "+knyObj.name+" object failed", failureCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.rollbackOnSuccessOnFailure(primaryKeyValueMap, syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.KNYObj.getBinary = function(knyObj, options, fileDownloadStartedCompletionBlock, chunkDownloadCompletedCompletionBlock, 
		streamDownloadCompletionBlock, fileDownloadCompletedCompletionBlock, downloadFailureCompletionBlock){
	var LOG_PREFIX = "kony.sdk.KNYObj.getBinary";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var binaryCallback = kony.sdk.OfflineObjects.createKonyBinaryDownloadCallback("Get binary on "+knyObj.name+" object started", fileDownloadStartedCompletionBlock,
	 "Get binary on "+knyObj.name+" object: chunk download completed", chunkDownloadCompletedCompletionBlock,
	 "Get binary on "+knyObj.name+" object: stream download completed", streamDownloadCompletionBlock,
	 "Get binary on "+knyObj.name+" object: file download completed", fileDownloadCompletedCompletionBlock,
	 "Get binary on "+knyObj.name+" object failed", downloadFailureCompletionBlock);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.getBinaryDownloadStartedHandlerChunkDownloadCompletedHandlerStreamDownloadCompletedHandlerFileDownloadCompletedHandlerDownloadFailureHandler(options, binaryCallback.onFileDownloadStarted, binaryCallback.onChunkDownloadCompleted, 
		binaryCallback.onStreamDownloadCompleted, binaryCallback.onFileDownloadCompleted, binaryCallback.onDownloadFailure);
};

kony.sdk.KNYObj.markForUpload = function(knyObj, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.markForUpload";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("MarkForUpload on "+knyObj.name+" object success", successCallback, "Mark For Upload on "+knyObj.name+" object failed", failureCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.markForUploadOnSuccessOnFailure(options, syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.KNYObj.getUploadDeferredRecordKeys = function(knyObj, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObj.getUploadDeferredRecordKeys";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Retrieving deffered record primary keys from "+knyObj.name+" object success", successCallback, "Retrieving deferred record primary keys from "+knyObj.name+" object failed", failureCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.getUploadDeferredRecordKeysOnFailure(syncCallback.onSuccess, syncCallback.onFailure);
};
kony.sdk.KNYObj.cancelSync = function(knyObj, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.knyObj.cancelSync";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("CancelSync on "+knyObj.name+" object success", successCallback, "CancelSync on "+knyObj.name+" object failed", failureCallback);
	var sdkObjectSync = knyObj.getSdkObjectSync();
	sdkObjectSync.cancelSyncOnFailure(syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.KNYObjSvc.createSDKObjectServiceSync = function(name){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.createSDKObjectServiceSync";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncV2Classes = kony.sdk.SyncV2Classes.import();
	var err = {};
	var sdkObjectServiceSync = syncV2Classes.SDKObjectServiceSync.alloc().initWithNameError(name, err);
	if(err.error) {
        var exception = new Exception(err.error.code, err.error.localizedDescription);
        if(err.error.domain) {
            exception.domain = err.error.domain;
        }
        if (err.error.userInfo && err.error.userInfo.callStack) {
            exception.callStack = err.error.userInfo.callStack;
        }
		throw exception;
    }
	return sdkObjectServiceSync;
};

kony.sdk.KNYObjSvc.startSync = function(knyObjSvc, syncConfig, successCallback, failureCallback, progressCallback){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.startSync";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Syncing "+knyObjSvc.name+" object service success", successCallback, "Syncing "+knyObjSvc.name+" object service failed", failureCallback);
	var konySyncProgressCallback = kony.sdk.OfflineObjects.createKonySyncProgressCallback("Sync Progresss Callback Called", progressCallback);
	var sdkObjectServiceSync = knyObjSvc.getSdkObjectServiceSync();
	sdkObjectServiceSync.startSyncOnSuccessOnFailureOnProgress(syncConfig, syncCallback.onSuccess, syncCallback.onFailure, konySyncProgressCallback.onProgress);
};

kony.sdk.KNYObjSvc.rollback = function(knyObjSvc, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.rollback";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Rollback on "+knyObjSvc.name+" object service success", successCallback, "Rollback on "+knyObjSvc.name+" object service failed", failureCallback);
	var sdkObjectServiceSync = knyObjSvc.getSdkObjectServiceSync();
	sdkObjectServiceSync.rollbackOnFailure(syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.KNYObjSvc.cancelSync = function(knyObjSvc, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.cancelSync";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("CancelSync on "+knyObjSvc.name+" object service success", successCallback, "CancelSync on "+knyObjSvc.name+" object service failed", failureCallback);
	var sdkObjectServiceSync = knyObjSvc.getSdkObjectServiceSync();
	sdkObjectServiceSync.cancelSyncOnFailure(syncCallback.onSuccess, syncCallback.onFailure);
};

kony.sdk.KNYObjSvc.clearOfflineData = function(knyObjSvc, options, successCallback, failureCallback){
	var LOG_PREFIX = "kony.sdk.KNYObjSvc.clearOfflineData";
	kony.sdk.logsdk.trace("Entering "+ LOG_PREFIX);
	var syncCallback = kony.sdk.OfflineObjects.createSyncCallback("Successfully cleared offline data in " + knyObjSvc.name + " object service.", successCallback, "Failed to clear offline data in "+knyObjSvc.name+" object service.", failureCallback);
	var sdkObjectServiceSync = knyObjSvc.getSdkObjectServiceSync();
	sdkObjectServiceSync.clearDataWithOptionsOnSuccessOnFailure(options, syncCallback.onSuccess, syncCallback.onFailure);
};

//#endif
//#ifdef iphone
//#define KONYLOGGER_IOS
//#endif
//#ifdef android
//#define KONYLOGGER_ANDROID
//#endif
//#ifdef ipad
//#define KONYLOGGER_IOS
//#endif
//#ifdef tabrcandroid
//#define KONYLOGGER_ANDROID
//#endif
kony.logger = kony.logger || {};

kony.logger.createNewLogger = function(loggerName, loggerConfig) {
    parseConfig = function(loggerConfig) {
        //private methods
        if (loggerConfig === null || typeof(loggerConfig) === 'undefined') {
            loggerConfig = {};
        } else {
            loggerConfig = loggerConfig.getLoggerConfig();
        }
        if (typeof(appConfig) != 'undefined') {
            appDetails = {
                appID: appConfig.appId,
                appVersion: appConfig.appVersion,
                sessionID: kony.license.getSessionId()
            };

            //appInfo
            loggerConfig.appInfo = appDetails;
        }
        return loggerConfig;
    };

    logMessage = function(loggerObj, logLevel, msg, params) {
        logMessageInFFI = function(NativeLoggerObject, logLevel, message) {
            switch (logLevel) {
                case kony.logger.logLevel.TRACE:
                    NativeLoggerObject.logTrace(message);
                    break;
                case kony.logger.logLevel.DEBUG:
                    NativeLoggerObject.logDebug(message);
                    break;
                case kony.logger.logLevel.INFO:
                    NativeLoggerObject.logInfo(message);
                    break;
                case kony.logger.logLevel.WARN:
                    NativeLoggerObject.logWarning(message);
                    break;
                case kony.logger.logLevel.ERROR:
                    NativeLoggerObject.logError(message);
                    break;
                case kony.logger.logLevel.FATAL:
                    NativeLoggerObject.logFatal(message);
                    break;
                default:
                    kony.print("Implementation not found for the specified log level " + logLevel);
                    return;
            }
        };
        formatLineInfo = function(callerInformation) {
            if (callerInformation.length == 3) {
                return callerInformation[1];
            }
        };
        formatFileInfo = function(callerInformation) {
            callerInformation = callerInformation[callerInformation.length - 1];
            //#ifndef KONYLOGGER_IOS
            callerInformation = callerInformation.replace("(", "");
            callerInformation = callerInformation.replace(")", "");
            //#endif

            callerInformation = callerInformation.split(":");

            if (callerInformation.length == 3) {
                return callerInformation[0];
            }
        };
        formatMethodInformation = function(callerInformation) {
            if (callerInformation.length > 1)
                return callerInformation[callerInformation.length - 2];
        };
        formatCallerInformation = function(callerInformation) {
            //JSCore syntax: <methodName>@<fileName>:<row>:<col>
            //V8 syntax: at <methodName> (<fileName>:<row>:<col>)
            //Chakra syntax: at (<methodURL> <fileURL>:<row>:<col>)

            if (callerInformation !== null) {
                var seperator = " ";
                //#ifdef KONYLOGGER_IOS
                seperator = "@";
                //#endif
                formattedCallerInformation = callerInformation.split(seperator);

                return formattedCallerInformation;



            }
            return metaData;
        };
        getCallerInformationFromCallStack = function(callStack, indirectionLevel) {
            var index = 5;

            //#ifdef KONYLOGGER_IOS
            index = 4;
            //#endif

            index += indirectionLevel;

            if (callStack.length >= index)
                return callStack[index];
            return null;
        };
        generateCallerInformation = function(indirectionLevel) {
            var errorObject = new Error();
            var callStack = errorObject.stack.split("\n");

            var callerInformation = getCallerInformationFromCallStack(callStack, indirectionLevel);
            return formatCallerInformation(callerInformation);
        };
        parseMessage = function(loggerObj, logLevel, msg, params) {
			var logLevelVal = (kony.logger.isNativeLoggerAvailable())? KonyLogger.getLogLevel() : kony.logger.currentLogLevel.value;
			if(logLevel.value >= logLevelVal){
			
			var metaData = {};

                params = (typeof(params) === "undefined") ? "" : params;
                //Stringify object
                if (kony.sync.isValidJSTable(params)) {
                    params = JSON.stringify(params, null, " ");
                }
                metaData.message = msg + params;
                metaData.callerInformation = generateCallerInformation(loggerObj.getIndirectionLevel());
                metaData.methodName = formatMethodInformation(metaData.callerInformation);
                metaData.fileName = formatFileInfo(metaData.callerInformation);
                metaData.lineNo = formatLineInfo(metaData.callerInformation);


                if (kony.logger.isNativeLoggerAvailable()) {
                    if (!loggerObj.NativeLoggerObject) {
                        loggerObj.NativeLoggerObject = new KonyLogger.InitializeLogger(loggerObj.loggerName);
                        KonyLogger.setConfig(loggerObj.config);
                    }
                    if (loggerObj.NativeLoggerObject) {
                        logMessageInFFI(loggerObj.NativeLoggerObject, logLevel, metaData);
                    } else {
                        var date = new Date().toLocaleDateString();
                        var time = new Date().toLocaleTimeString();
                        var level = logLevel.code;
                        var formattedMessage = "[" + loggerObj.loggerName + "][" + level + "][" + date + " " + time + "][" + metaData.fileName + "][" + metaData.methodName + "][" + metaData.lineNo + "] : " + metaData.message;
                        kony.print(formattedMessage);
                    }
                } else {

                    var date = new Date().toLocaleDateString();
                    var time = new Date().toLocaleTimeString();
                    var level = logLevel.code;

                    var formattedMessage = "[" + loggerObj.loggerName + "][" + level + "][" + date + " " + time + "][" + metaData.fileName + "][" + metaData.methodName + "][" + metaData.lineNo + "] : " + metaData.message;
                    kony.print(formattedMessage);
                }
            }
        };
        parseMessage(loggerObj, logLevel, msg, params);
    };

    //Exposed object and it's methods
    var loggerObj = kony.logger.createLoggerObject(loggerName, loggerConfig);

    //Native object creation
    if (kony.logger.isNativeLoggerAvailable()) {
        loggerObj.NativeLoggerObject = new KonyLogger.InitializeLogger(loggerName);
        KonyLogger.setConfig(loggerObj.config);
    }

    return loggerObj;
}
kony.logger["appLogger"] = kony.logger.appLoggerInitialisation();
/**
 * Method to create the integration service instance with the provided service name.
 * @param {string} serviceName - Name of the service
 * @returns {IntegrationService} Integration service instance
 */
kony.sdk.prototype.getIntegrationService = function(serviceName) {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	var konyRef = kony.sdk.getCurrentInstance();
	if (!kony.sdk.skipAnonymousCall && !this.currentClaimToken && !konyRef.isAnonymousProvider) {
		throw new Exception(Errors.AUTH_FAILURE, "Please call login in Identity Service before invoking this service");
	}
	var integrationService = null;
	if (this.integsvc != null) {
		if (this.integsvc[serviceName] != null) {
            kony.sdk.logsdk.debug("found integration service" + this.integsvc[serviceName]);
			return new IntegrationService(this, serviceName);
		}

	}

	throw new Exception(Errors.INTEGRATION_FAILURE, "Invalid serviceName");

};
/**
 * Should not be called by the developer.
 * @class
 * @classdesc Integration service instance for invoking the integration services.
 */
function IntegrationService(konyRef, serviceName) {
	var dataStore = new konyDataStore();
	var svcObj = konyRef.integsvc[serviceName];
	var homeUrl = "";
	if(typeof(svcObj) === "object"){
		homeUrl = svcObj["url"];
	}
	else{
		homeUrl = svcObj;
	}
	var networkProvider = new konyNetworkProvider();
	if (homeUrl == undefined || serviceName == undefined) {
		throw new Exception(Errors.INIT_FAILURE, "Invalid homeUrl and serviceName");
	}
	homeUrl = stripTrailingCharacter(homeUrl, "/");

	this.getUrl = function() {
		return homeUrl;
	};


	/**
	 * Integration service success callback method.
	 * @callback integrationSuccessCallback
	 * @param {object} response - Integration service response
	 */

	/**
	 * Integration service failure callback method.
	 * @callback integrationFailureCallback
	 * @param {object} error - Error information
	 */
	/**
	 * Integration service options
	 * @object options
	 * @param {boolean}enablePreMFCompat - prevents stringification of array during xmlhttprequest.
	 */
	/**
	 * invoke the specified operation
	 * @param {string} operationName - Name of the operation
	 * @param {object} headers - Input headers for the operation
	 * @param {object} data - Input data for the operation
	 * @param {integrationSuccessCallback} successCallback  - Callback method on success
	 * @param {integrationFailureCallback} failureCallback - Callback method on failure
	 * @param {object} options - Integration service options
	 */
	this.invokeOperation = function(operationName, headers, data, successCallback, failureCallback, options) {
		function invokeOperationHandler() {
			_invokeOperation(operationName, headers, data, true, successCallback, failureCallback, options);
		}

        if (kony.sdk.skipAnonymousCall){
            // Check to find if the service is public or not, in case of public service anonymous login is not required.
            invokeOperationHandler();
        }
        else{
            kony.sdk.claimsRefresh(invokeOperationHandler, failureCallback);
        }
	};

    /**
	 * Integration service API to upload binaries based on adapter template
     * @param {string} operationName - Name of the operation
     * @param {Object} uploadParams - InputContext or template variables
     * @param {callback} fileUploadStartedCallback - Callback which is invoked on start of file upload
     * @param {callback} chunkUploadCompletedCallback - Callback which is invoked on chunk upload
     * @param {callback} fileUploadCompletedCallback - Callback which is invoked on complete of file upload
     * @param {callback} fileUploadFailureCallback - Callback which is invoked in case of error during upload
     * @param {Object} options - Provision for user to send additional options
     */
	this.uploadBinaryData = function(operationName, uploadParams, fileUploadStartedCallback, chunkUploadCompletedCallback,
                                     fileUploadCompletedCallback, fileUploadFailureCallback, options) {

        if(!kony.sdk.isNullOrUndefined(uploadParams["FilePath"]) && !kony.sdk.isNullOrUndefined(uploadParams["rawBytes"]))
        {
            kony.sdk.logsdk.error("### IntegrationService::uploadBinaryData Error: BOTH FilePath and rawBytes are provided - please provide only one of them");
            kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance, "BOTH FilePath and rawBytes are provided " +  kony.sdk.errormessages.invalid_queryparams_instance));
            return;
        }

        // check if neither are defined
        if(kony.sdk.isNullOrUndefined(uploadParams["FilePath"]) && kony.sdk.isNullOrUndefined(uploadParams["rawBytes"]))
        {
            kony.sdk.logsdk.error("### IntegrationService::uploadBinaryData Error: Neither FilePath nor rawBytes is provided - please provide one of them");
            kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance, "Neither FilePath nor rawBytes is provided " +  kony.sdk.errormessages.invalid_queryparams_instance));
            return;
        }

        // check for datatype of filePath (if defined)
        if(!kony.sdk.isNullOrUndefined(uploadParams["FilePath"]))
        {
            if(typeof(uploadParams["FilePath"]) !== 'string')
            {
                kony.sdk.logsdk.error("### IntegrationService::uploadBinaryData Error: FilePath : expected string and found " + typeof(uploadParams["FilePath"]));
                kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance, "Invalid datatype of FilePath " + typeof(uploadParams["FilePath"]) + kony.sdk.errormessages.invalid_queryparams_instance));
                return;
            }
        }

        // check for datatype of rawBytes, if defined and convert to base64 string
        if(!kony.sdk.isNullOrUndefined(uploadParams["rawBytes"]))
        {
            var rawBytes = uploadParams["rawBytes"];
            if(typeof(rawBytes) !== 'object')
            {
                kony.sdk.logsdk.error("### IntegrationService::uploadBinaryData Error: rawBytes : expected object and found " + typeof(rawBytes));
                kony.sdk.verifyAndCallClosure(fileUploadFailureCallback, kony.sdk.error.getClientErrObj(kony.sdk.errorcodes.invalid_queryparams_instance, "Invalid datatype of rawBytes " + typeof(rawBytes) + kony.sdk.errormessages.invalid_queryparams_instance));
                return;
            }
            else
            {
                var base64String = kony.convertToBase64(rawBytes);
                uploadParams["rawBytes"] = base64String;
            }
        }

		function uploadBinaryDataHandler(){
			var uploadOptions = {};

			uploadOptions["URL"] = homeUrl + "/" + operationName;
			var headers = {};
			if (!kony.sdk.skipAnonymousCall){
				headers[Constants.APP_AUTHORIZATION_HEADER] = kony.sdk.getCurrentInstance().currentClaimToken;
			}
			uploadOptions["headers"] = headers;

			if(uploadParams["FilePath"])
			{
				uploadOptions["FilePath"] = uploadParams["FilePath"];
				delete uploadParams["FilePath"];
			}
			else if(uploadParams["rawBytes"])
			{
				uploadOptions["rawBytes"] = uploadParams["rawBytes"];
				delete uploadParams["rawBytes"];
			}

			uploadOptions["uploadParams"] = uploadParams;
			kony.sdk.binary.uploadBinaryData(
				uploadOptions,
				fileUploadStartedCallback,
				chunkUploadCompletedCallback,
				fileUploadCompletedCallback,
				fileUploadFailureCallback,
                options);
		}

		if(kony.sdk.skipAnonymousCall){
			uploadBinaryDataHandler();
		}else{
			kony.sdk.claimsRefresh(uploadBinaryDataHandler,fileUploadFailureCallback);
		}
	};

    /**
	 * Integration service API to download binaries based on adapter template
     * @param {string} operationName - Name of the operation
     * @param {Object} fileparams - InputContext or template variables
     * @param {boolean} streaming - Boolean value to determine, whether chunks need to be saved to file or sent in callbacks
     * @param {Object} headers - Provision for custom headers
     * @param {callback} fileDownloadStartedCallback - Callback which is invoked on start of file download
     * @param {callback} chunkDownloadCompletedCallback - Callback which is invoked on stream/chunk download
     * @param {callback} fileDownloadCompletedCallback - Callback which is invoked on complete of file download
     * @param {callback} downloadFailureCallback - Callback which is invoked in case of error during download
     * @param {Object} options - Provision for user to send additional options
     */
    this.getBinaryData = function(operationName, fileparams, streaming, headers,
								  fileDownloadStartedCallback, chunkDownloadCompletedCallback,
								  fileDownloadCompletedCallback, downloadFailureCallback, options) {
        function getBinaryDataHandler() {
            _getBinaryData(operationName, fileparams, streaming, headers,
				fileDownloadStartedCallback, chunkDownloadCompletedCallback,
				fileDownloadCompletedCallback, downloadFailureCallback, options)
        }

        if (kony.sdk.skipAnonymousCall){
            // Check to find if the service is public or not, in case of public service anonymous login is not required.
            getBinaryDataHandler();
        }
        else{
            kony.sdk.claimsRefresh(getBinaryDataHandler, downloadFailureCallback);
		}
    };

    function _getBinaryData(operationName, fileparams, streaming, headers,
							fileDownloadStartedCallback, chunkDownloadCompletedCallback,
							fileDownloadCompletedCallback, downloadFailureCallback, options){
    	_invokeOperation(operationName, headers, fileparams,true,
			function(downloadConfig){
    			if(kony.sdk.isNullOrUndefined(downloadConfig)){
    				downloadConfig = {};
				}

                if(options && options["ChunkSize"]){
                    downloadConfig.ChunkSize = options["ChunkSize"];
                }

                if(headers){
    				if(kony.sdk.isNullOrUndefined(downloadConfig.headers)){
    					downloadConfig.headers = {};
					}
                	for(var header in headers){
                		downloadConfig.headers[header] = headers[header];
					}
				}
                kony.sdk.binary.getBinaryData(
					fileparams,
					streaming,
					downloadConfig,
					fileDownloadStartedCallback,
					chunkDownloadCompletedCallback,
					fileDownloadCompletedCallback,
					downloadFailureCallback,
					options);
			},downloadFailureCallback, options);
	}

	function invokeOperationRetry(operationName, headers, data, successCallback, failureCallback, options) {
		function invokeOperationRetryHandler() {
			_invokeOperation(operationName, headers, data, false, successCallback, failureCallback, options);
		}

        if (kony.sdk.skipAnonymousCall){
            // Check to find if the service is public or not, in case of public service anonymous login is not required.
            invokeOperationRetryHandler();
        }
        else{
            kony.sdk.claimsAndProviderTokenRefresh(invokeOperationRetryHandler, failureCallback);
        }
	}

	function retryServiceCall(errorResponse){
		if(errorResponse["mfcode"]){
				// check for the mf code for which,
				// retry should be done.
		} else {
			if(errorResponse["httpStatusCode"] && errorResponse["httpStatusCode"] === 401){
                kony.sdk.logsdk.debug("### IntegrationService::retryServiceCall received 401 from fabric, trying to refresh backend token");
				return true;
			}
		}
	}

	function _invokeOperation(operationName, headers, data, isRetryNeeded, successCallback, failureCallback, options) {

		var requestData = {};
        kony.sdk.logsdk.debug("Entered into _invokeOperation operationName: " + operationName + ", isRetryNeeded: " + isRetryNeeded);
		var reportingData = kony.sdk.getPayload(konyRef);
		var sessionId = kony.ds.read("konyUUID");
		if(sessionId){
		  reportingData.rsid = sessionId[0];
		}
		if(!reportingData.rsid)
		{
            kony.sdk.logsdk.info("rsid is either empty,null or undefined");
		}
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			reportingData.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		for (var key in data) {
			requestData[key] = data[key];
		}
		reportingData.svcid = operationName;

		var defaultHeaders = {
			"Content-Type": "application/x-www-form-urlencoded"
		};

        if (options && options["passthrough"] && options["passthrough"] === true){
            defaultHeaders["konyreportingparams"] = JSON.stringify(reportingData);
		}else{
            requestData["konyreportingparams"] = JSON.stringify(reportingData);
		}

		if (!kony.sdk.skipAnonymousCall){
            // Check to find if the service is public or not, in case of public service no token is required.
            var token = konyRef.currentClaimToken;
            if(!token){
                token = kony.sdk.getCurrentInstance().currentClaimToken;
            }
            defaultHeaders["X-Kony-Authorization"] = token;
		}

        var deviceId = kony.sdk.getDeviceId();
        if(!kony.sdk.isNullOrUndefined(deviceId)) {
            defaultHeaders["X-Kony-DeviceId"] = deviceId;
        }
		if(typeof(svcObj) === 'object' &&  svcObj.version){
			defaultHeaders["X-Kony-API-Version"] = svcObj.version;
		}

		// if the user has defined his own headers, use them
		if(!kony.sdk.isNullOrUndefined(headers)){
		    if((Object.keys(headers)).length !== 0 && typeof(headers)==="object") {
                        var defaultKeys = [];
                        defaultKeys = Object.keys(defaultHeaders);
                        var defaultkeyLower = {};
                        defaultkeyLower = defaultKeys.map(function (x) {
                         return x.toLowerCase()
                        });

                        for (var header in headers) {
                            var headerConst = header
                            if (defaultkeyLower.indexOf(headerConst.toLowerCase()) !== -1) {
                                for (var i = 0; i < defaultKeys.length; i++) {
                                    var tempKey = defaultKeys[i];
                                    if (tempKey.toLowerCase() === headerConst.toLowerCase()) {
                                        defaultHeaders[tempKey] = headers[header];
                                    }
                                }
                            }else {
                                defaultHeaders[header] = headers[header];
                            }
                    }
		    }

        }

        // If useCache is enabled and cacheID is present then network call will be skipped and cached response will be returned.
        if (options && options["useCache"] && options["cacheID"]){
            var cacheResponse = new kony.sdk.ClientCache().get(options["cacheID"]);
            if (cacheResponse){
                kony.sdk.logsdk.debug("Key found in hash, returning cached response.");
                kony.sdk.verifyAndCallClosure(successCallback, cacheResponse);
                return;
            }
        }

        function networkSuccessCallback(res){
            if (kony.sdk.metric) {
                kony.sdk.metric.clearBufferEvents();
            }
            // If useCache is enabled then the response is cached and returned.
            if (options && options["useCache"]){
                cacheResponseForKey(options, homeUrl + "/" + operationName, requestData, res);
            }
            kony.sdk.verifyAndCallClosure(successCallback, res);
		}

		function networkFailureCallback(xhr, status, err) {
            if(isRetryNeeded === true && retryServiceCall(xhr) === true){
                invokeOperationRetry(operationName, headers, data, successCallback, failureCallback, options);
                return;
            }
            kony.sdk.processIntegrationErrorResponse(xhr,true,failureCallback);
        }

        networkProvider.post(homeUrl + "/" + operationName, requestData, defaultHeaders, networkSuccessCallback,
            networkFailureCallback, null, options);
	}

	kony.sdk.processIntegrationErrorResponse = function(err,isAsync,callBack){
		if (kony.sdk.metric) {
			if (kony.sdk.metric.errorCodeMap[err.opstatus]) {
				kony.sdk.metric.saveInDS();
			}
		}
		if(err["mfcode"]){
			var konyRef = kony.sdk.getCurrentInstance();
			//clear the cache if the error code related to session/token expiry
			if (kony.sdk.isSessionOrTokenExpired(err["mfcode"])) {
                kony.sdk.logsdk.info("###IntegrationService::invokeOperationFailure  Session/Token expired. Authenticate and Try again");
				//kony.sdk.resetCacheKeys(konyRef);
			}
		}
		if(!isAsync){
            return kony.sdk.error.getIntegrationErrObj(err);
		}
		else if(callBack){
		  kony.sdk.verifyAndCallClosure(callBack, kony.sdk.error.getIntegrationErrObj(err));
		}
	};

	//This is an internal api to invoke an service synchronously
   	this.invokeOperationSync = function(operationName, headers, data) {
		var res=null;
		res = kony.sdk.claimsRefreshSync();
		if(res && res.message && res.message == "success")
		{
			return _invokeOperationSync(operationName, headers, data);
		}
		else{
			return res;
		}
	};

	function _invokeOperationSync(operationName, headers, data) {
		var requestData = {};
		var konyRef = kony.sdk.getCurrentInstance();
		var reportingData = kony.sdk.getPayload(konyRef);
		var sessionId = kony.ds.read("konyUUID");
		if(sessionId){
		  reportingData.rsid = sessionId[0];
		}
		if(!reportingData.rsid)
		{
            kony.sdk.logsdk.info("rsid is either empty,null or undefined");
		}
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
            reportingData.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		for (var key in data) {
			requestData[key] = data[key];
		}
		reportingData.svcid = operationName;
		var token;
		for (var i in konyRef.tokens) {
			if (konyRef.tokens.hasOwnProperty(i) && typeof(i) !== 'function') {
				token = konyRef.tokens[i];
				break;
			}
		}

		requestData["konyreportingparams"] = JSON.stringify(reportingData);
		var defaultHeaders = {
			"Content-Type": "application/x-www-form-urlencoded",
			"X-Kony-Authorization": konyRef.currentClaimToken
		};

		if(typeof(svcObj) === 'object' &&  svcObj.version){
			defaultHeaders["X-Kony-API-Version"] = svcObj.version;
		}
		// if the user has defined his own headers, use them
		if((Object.keys(headers)).length !== 0){
                    var defaultKeys = [];
                    defaultKeys = Object.keys(defaultHeaders);
                    var defaultkeyLower = {};
                    defaultkeyLower = defaultKeys.map(function (x) {
                        return x.toLowerCase()
                    });

                    for (var header in headers) {
                        var headerConst = header
                        if (defaultkeyLower.indexOf(headerConst.toLowerCase()) !== -1) {
                            for (var i = 0; i < defaultKeys.length; i++) {
                                var tempKey = defaultKeys[i];
                                if (tempKey.toLowerCase() === headerConst.toLowerCase()) {
                                    defaultHeaders[tempKey] = headers[header];
                                }
                            }
                        } else {
                            defaultHeaders[header] = headers[header];
                        }
                    }
                }
        var res = null;
		res = networkProvider.postSync(homeUrl + "/" + operationName,
			requestData, defaultHeaders);
		if(res.opstatus == 0){
			if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
			return res;
		}
		else{
			return kony.sdk.processIntegrationErrorResponse(res,false);
		}
	}
}

kony.sdk.claimsRefreshSync = function() {
	var konyRef = kony.sdk.getCurrentInstance();
	var networkProvider = new konyNetworkProvider();
	var loginWithAnonymousProvider = function() {
		var identityObject = konyRef.getIdentityService("$anonymousProvider");
		var res = identityObject.anonymousLoginSync(null);
		if(res && JSON.stringify(res) == "{}")
		{
			return {"message" : "success"};
		}
		else{
			return kony.sdk.error.getAuthErrObj(res);
		}
	};

	if (konyRef.currentClaimToken === null) {
        kony.sdk.logsdk.info("claims Token is Unavialable");
		if (konyRef.isAnonymousProvider) {
			return loginWithAnonymousProvider();
		} else {
			return kony.sdk.error.getNullClaimsTokenErrObj();
		}
	} else if (konyRef.claimTokenExpiry && new Date().getTime() > konyRef.claimTokenExpiry) {
		if (konyRef.isAnonymousProvider) {
			return loginWithAnonymousProvider();
		} else {
            kony.sdk.logsdk.info("claims token has expired. fetching new token..");
			var _serviceUrl = stripTrailingCharacter(konyRef.rec.url, "/");
			var _url = _serviceUrl + "/claims";
            kony.sdk.logsdk.debug("service url is " + _url);
			if (konyRef.currentRefreshToken === null) {
				return kony.sdk.error.getNullRefreshTokenErrObj();
			} else {
		         var data = networkProvider.postSync(_url, {}, {
							"Authorization": konyRef.currentRefreshToken,
							"Content-Type": "application/x-www-form-urlencoded"
							});
		         if(data.opstatus == 0){
                     kony.sdk.logsdk.info("refresh success..acquiring new tokens");
		         	return kony.sdk.processClaimsSuccessResponse(data,konyRef,false);
	             }
		         else{
                     kony.sdk.logsdk.info("failed to acquire refresh token");
                    return kony.sdk.processClaimsErrorResponse(data,konyRef,false);
		         }
			}
		}
	} else {
		return { "message" :"success"};
	}
};
/**
 * Method to create the messaging service instance.
 * @returns {MessagingService} Messaging service instance
 */
kony.sdk.prototype.getMessagingService = function() {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	return new MessagingService(this);
};

/**
 * Should not be called by the developer.
 * @class
 * @classdesc Messaging service instance for invoking the Messaging services.
 * @param konyRef - reference to kony object
 */
function MessagingService(konyRef) {

	var homeUrl = konyRef.messagingsvc.url;
	var KSID;
	var appId = konyRef.messagingsvc.appId;
	
	var networkProvider = new konyNetworkProvider();
	var dsKey = homeUrl + ":KMS:AppId";
	var currentObject = this;
	var geoBoundaryData;

	this.getUrl = function() {
		return homeUrl;
	};

	this.setKSID = function(ksid) {
		konyRef.getDataStore().setItem(dsKey, ksid);
		KSID = ksid;
	};

	this.getKSID = function() {
		if (!KSID) {
			KSID = konyRef.getDataStore().getItem(dsKey);
		}
		return KSID;
	};

	var setGeoBoundaryData = function(data){
        konyRef.getDataStore().setItem("geoBoundaryData", data);
        geoBoundaryData = data;
	};

	var getGeoBoundaryDataForBoundaryId = function(boundaryId){
		if(!geoBoundaryData){
            geoBoundaryData = konyRef.getDataStore().getItem("geoBoundaryData")
		}

		return geoBoundaryData[boundaryId];
	};

	this.setKmsAppId = function(id) {
		appId = id;
	};

	this.getKmsAppId = function() {
		return appId;
	};

	var registerForMessagingService = function(osType, deviceId, pnsToken, email, authToken, successCallback, failureCallback) {
		var uri = homeUrl + "/subscribers";
		var subscribeParamsJson = {
				"sid": pnsToken,
				"appId": appId,
				"ufid": email,
				"osType": osType,
				"deviceId": deviceId
			};

		if(authToken!=undefined && authToken != null) {
			subscribeParamsJson["authToken"] = authToken;
		}

		var jsonParam = {
			"subscriptionService": {
				"subscribe": subscribeParamsJson
			}
		};

		var headers = {
			"Content-Type": "application/json"
		};

		var payload = {
			postdata: JSON.stringify(jsonParam)
		};
		var networkOptions={};
		networkOptions["disableIntegrity"] = true;
		networkProvider.post(uri, payload, headers,
			function(data) {
				KSID = data.id;
				konyRef.getDataStore().setItem(dsKey, KSID);
				kony.sdk.verifyAndCallClosure(successCallback, data);
			},
			function(data, status, error) {
				kony.sdk.logsdk.error("ERROR: Failed to register device for KMS");
				var errorObj = {};
				errorObj.data = data;
				errorObj.status = status;
				errorObj.error = error;
				kony.sdk.verifyAndCallClosure(failureCallback, errorObj);
			},null,networkOptions);
	};

	/**
	 * register to messaging service
	 * @param {string} osType - Type of the operating system
	 * @param {string} deviceId - Device Id
	 * @param {string} pnsToken - Token value
	 * @param {string} email - email
	 * @param {function} successCallback - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 */
	this.register = function(osType, deviceId, pnsToken, email, successCallback, failureCallback) {
		if (typeof(pnsToken) === 'undefined' || pnsToken === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid pnsToken/sId. Please check your messaging provider");
		}
		if (typeof(osType) === 'undefined' || osType === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid osType.");
		}
		if (typeof(deviceId) === 'undefined' || deviceId === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid deviceId.");
		}
		if (typeof(email) === 'undefined' || email === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid email.");
		}

		registerForMessagingService(osType, deviceId, pnsToken, email, null,function(data){
			kony.sdk.verifyAndCallClosure(successCallback, data)
		}, function(errorObj){
			kony.sdk.verifyAndCallClosure(failureCallback, errorObj);
		});
	};

	/**
	 * register to messaging service
	 * @param {string} osType - Type of the operating system
	 * @param {string} deviceId - Device Id
	 * @param {string} authToken - Authorization Token
	 * @param {string} pnsToken - Token value
	 * @param {string} email - email
	 * @param {function} successCallback - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 */
	this.registerWithAuthToken = function(osType, deviceId, pnsToken, email, authToken, successCallback, failureCallback) {
		if (typeof(pnsToken) === 'undefined' || pnsToken === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid pnsToken/sId. Please check your messaging provider");
		}
		if (typeof(osType) === 'undefined' || osType === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid osType.");
		}
		if (typeof(deviceId) === 'undefined' || deviceId === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid deviceId.");
		}
		if (typeof(email) === 'undefined' || email === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid email.");
		}
		if (typeof(authToken) === 'undefined' || authToken === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid authToken.");
		}

		registerForMessagingService(osType, deviceId, pnsToken, email, authToken,function(data){
			kony.sdk.verifyAndCallClosure(successCallback, data)
		}, function(errorObj){
			kony.sdk.verifyAndCallClosure(failureCallback, errorObj);
		});
	};

	var unregisterFromMessagingService = function(authToken, successCallback, failureCallback) {
		var uri = homeUrl + "/subscribers";
		var sub = {
			"ksid": currentObject.getKSID()
		};

		if(authToken != undefined && authToken != null){
			sub["authToken"] = authToken;
		}

		var inp = {
			"subscriptionService": {
				"unsubscribe": sub
			}
		};

		var headers = {
			"Content-Type": "application/json"
		};

		var payload = {
			postdata: JSON.stringify(inp)
		};

		kony.sdk.logsdk.info("unsubscribe uri:" + uri);

		konyRef.getDataStore().removeItem(dsKey);

        var networkOptions={};
        networkOptions["disableIntegrity"] = true;

		networkProvider.post(uri, payload, headers,
			function(data) {
				kony.sdk.verifyAndCallClosure(successCallback, data);
			},
			function(data, status, error) {
				kony.sdk.logsdk.error("ERROR: Failed to unregister device for KMS");
				var errorObj = {};
				errorObj.data = data;
				errorObj.status = status;
				errorObj.error = error;
				kony.sdk.verifyAndCallClosure(failureCallback, errorObj);
			},null,networkOptions);
	};

	/**
	 * unregister to messaging service
	 * @param {function} successCallback - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 */
	this.unregister = function(successCallback, failureCallback) {
		var tempKSID = currentObject.getKSID();
		if (typeof(tempKSID) === 'undefined' || tempKSID === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "KSID not available, Register and try again.");
		}

		unregisterFromMessagingService(null,successCallback, failureCallback);
	};

	/**
	 * unregister to messaging service
	 * @param {string} authToken - Authorization Token
	 * @param {function} successCallback - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 */
	this.unregisterWithAuthToken = function(authToken, successCallback, failureCallback) {
		var tempKSID = currentObject.getKSID();
		if (typeof(tempKSID) === 'undefined' || tempKSID === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "KSID not available, Register and try again.");
		}
		if (typeof(authToken) === 'undefined' || authToken === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid authToken.");
		}
		unregisterFromMessagingService(authToken,successCallback,failureCallback);
	};

	/**
	 * Fetch all messages
	 * @param {number} startIndex - starting index
	 * @param {number} pageSize - page size
	 * @param {function} successCallback - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 * @param {dictionary} options - {authToken: <Auth Token>}
	 */
	this.fetchAllMessages = function(startIndex, pageSize, successCallback, failureCallback, options) {
		var tempKSID = currentObject.getKSID();
		if (typeof(tempKSID) === 'undefined' || tempKSID === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "KSID not available, Register and try again.");
		}

		var uri = homeUrl + "/messages/fetch";

		var data = {
			"ksid": tempKSID,
			"startElement": startIndex,
			"elementsPerPage": pageSize
		};

        if(options && options["authToken"]){
            data["authToken"] = options["authToken"];
        }

		var headers = {
			"Content-Type": "application/json"
		};

		var payload = {
			postdata: JSON.stringify(data)
		};

        var networkOptions={};
        networkOptions["disableIntegrity"] = true;
		networkProvider.post(uri, payload, headers, successCallback, failureCallback,null,networkOptions);
	};

	var updateGeoLocationForMessagingService= function(latitude, longitude, locationName, authToken, successCallback, failureCallback) {
		var uri = homeUrl + "/location";

		var data = {
			"ksid": currentObject.getKSID(),
			"latitude": latitude,
			"longitude": longitude
		};

		if(typeof (locationName) === "string"){
			data["locname"] = locationName;
		}

		if(authToken != null && authToken != undefined){
			data["authToken"] = authToken;
		}

		var headers = {
			"Content-Type": "application/json"
		};

		var payload = {
			postdata: JSON.stringify(data)
		};


        var networkOptions={};
        networkOptions["disableIntegrity"] = true;
		networkProvider.post(uri, payload, headers, successCallback, failureCallback,null,networkOptions);
	};

	/**
	 * Update the location
	 * @param {string} latitude - Latitude value
	 * @param {string} longitude - Longitude value
	 * @param {string} locationName - Location name
	 * @param {function} successCallback - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 */
	this.updateGeoLocation = function(latitude, longitude, locationName, successCallback, failureCallback) {
		var tempKSID = currentObject.getKSID();
		if (typeof(tempKSID) === 'undefined' || tempKSID === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "KSID not available, Register and try again.");
		}
		if (typeof(latitude) === 'undefined' || latitude === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid latitude.");
		}
		if (typeof(longitude) === 'undefined' || longitude === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid longitude.");
		}

		updateGeoLocationForMessagingService(latitude, longitude, locationName, null, successCallback, failureCallback);
	};

	/**
	 * Update the location
	 * @param {string} latitude - Latitude value
	 * @param {string} longitude - Longitude value
	 * @param {string} locationName - Location name
	 * @param {string} authToken - Authorization Token
	 * @param {function} successCallback - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 */
	this.updateGeoLocationWithAuthToken = function(latitude, longitude, locationName, authToken, successCallback, failureCallback) {
		var tempKSID = currentObject.getKSID();
		if (typeof(tempKSID) === 'undefined' || tempKSID === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "KSID not available, Register and try again.");
		}
		if (typeof(latitude) === 'undefined' || latitude === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid latitude.");
		}
		if (typeof(longitude) === 'undefined' || longitude === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid longitude.");
		}
		if (typeof(authToken) === 'undefined' || authToken === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "Invalid authToken.");
		}

		updateGeoLocationForMessagingService(latitude,longitude,locationName,authToken,successCallback,failureCallback);
	};

	/**
	 * Mark the message as read for a given message id
	 * @param {string} fetchId - Message id
	 * @param {function} successCallback - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 * @param {dictionary} options - {authToken: <Auth Token>}
	 */
	this.markMessageRead = function(fetchId, successCallback, failureCallback, options) {
		if (typeof(fetchId) === 'undefined' || fetchId === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "invalid fetchId parameter value");
		}
		var headers = {};
		headers["X-HTTP-Method-Override"] = "get";
		headers["Content-Type"] = "application/json";
		var uri = homeUrl + "/messages/open/" + fetchId;

        if(options && options["authToken"]){
            headers["X-Device-AuthToken"] = options["authToken"];
        }

        var networkOptions={};
        networkOptions["disableIntegrity"] = true;
		networkProvider.get(uri, null, headers, successCallback, failureCallback,null,networkOptions);
	};

	/**
	 * Fetches the message conetent for a given message id
	 * @param {string} fetchId - Message id
	 * @param {function} successCallback - Callback method on success
	 * @param {function} failureCallback - Callback method on failure
	 * @param {dictionary} options - {authToken: <Auth Token>}
	 */
	this.fetchMessageContent = function(fetchId, successCallback, failureCallback, options) {
		if (typeof(fetchId) === 'undefined' || fetchId === null) {
			throw new Exception(Errors.MESSAGING_FAILURE, "invalid fetchId parameter value");
		}
		var uri = homeUrl + "/messages/content/" + fetchId;

		var headers = null;
        if(options && options["authToken"]){
            headers = {"X-Device-AuthToken": options["authToken"]};
        }

        var networkOptions={};
        networkOptions["disableIntegrity"] = true;
		networkProvider.get(uri, null, headers, successCallback, failureCallback,null,networkOptions);
	};

	var manageGeoBoundariesCallback = function(data){
		if(data.state.toLocaleUpperCase() === "ENTRY" || data.state.toLocaleUpperCase() === "ENTER"){
            if(data.geofenceID !== "refreshBoundary"){
            	var action = getGeoBoundaryDataForBoundaryId(parseInt(data.geofenceID));
            	if(action && action.clientAction === "notifyEngagementServer") {
                    currentObject.updateGeoLocation(data.lat, data.lon, action.locationName, function (res) {
                        kony.sdk.logsdk.info("### MessagingService::manageGeoBoundariesCallback successfully notified KMS");
                    }, function (err) {
                        kony.sdk.logsdk.error("### MessagingService::manageGeoBoundariesCallback error in notifying KMS");
                    });
                }else if(action && action.clientAction === "localNotification"){
                    try{
                        //Setting time to invoke after 1 second
                        var date = new Date().getTime() + 1000;
                        var dateString;
                        var format;

                        if(kony.sdk.getPlatformName() === "windows"){
                            dateString = new Date(date).toString().slice(4,24);
                            format = "MMM dd yyyy HH:mm:ss";
                        }else{
                            dateString = new Date(date).toString().slice(4,24) + " " + new Date().toString().match(/([-\+][0-9]+)\s/)[1];
                            format = "MMM dd yyyy HH:mm:ss Z";
                        }
                        kony.sdk.logsdk.trace("### MessagingService::manageGeoBoundariesCallback invoking local notification");
                        kony.localnotifications.create ({
                            "id":			date.toString(),
                            "dateTime":	{
                                "date":		dateString,
                                "format":		format
                            },"message":	action.message,
                            "title":		appId.toString(),
                            "categoryId":   "geoBoundary"
                        });
                    }catch(e){
                        kony.sdk.logsdk.error("Exception while creating localNotification " + e);
                    }
				}else if(action && action.clientAction === "customLogic"){
                    if(!kony.sdk.isNullOrUndefined(currentObject.geoBoundaryOptions["customLogicCallback"]) && typeof (currentObject.geoBoundaryOptions["customLogicCallback"]) == "function") {
                        kony.sdk.logsdk.info("### MessagingService::manageGeoBoundariesCallback invoking customLogicCallback defined by user");

                        //Appending current location to the kms data obtained from the server
                        action["CurrentLocation"] = {
                        	"latitude"	:	data.lat,
							"longitude"	:	data.lon
						};

                        kony.sdk.verifyAndCallClosure(currentObject.geoBoundaryOptions["customLogicCallback"],action);
                    }else{
                        kony.sdk.logsdk.info("### MessagingService::manageGeoBoundariesCallback customLogicCallback is not defined by user");
                    }
                }
            }
		}else if(data.state.toLocaleUpperCase() === "EXIT"){
			if(data.geofenceID === "refreshBoundary"){
                currentObject.updateGeoLocation(data.lat, data.lon, data.geofenceID, function (res) {
                    kony.sdk.logsdk.info("### MessagingService::manageGeoBoundariesCallback successfully notified KMS");
                    getAndRefreshBoundaries(currentObject.geoBoundaryOptions, function(res1){
                        kony.sdk.logsdk.info("### MessagingService::manageGeoBoundariesCallback successfully refreshed geoBoundaries");
                    }, function(err1){
                        kony.sdk.logsdk.error("### MessagingService::manageGeoBoundariesCallback failed to refresh geoBoundaries");
                        kony.sdk.verifyAndCallClosure(currentObject.refreshBoundariesFailuresCallback, err1);
                    });
                }, function (err) {
                    kony.sdk.logsdk.error("### MessagingService::manageGeoBoundariesCallback error in notifying KMS");
                });
			}
		}
	};

	var getAndRefreshBoundaries = function(geoBoundaryOptions, successCallback, failureCallback, options){
		function formGeoBoundariesInput(id, latitude, longitude, distance){
			return {
                "geofenceID": id.toString(),
                "lat": latitude,
                "lon": longitude,
                "radius" : Number(distance.toFixed(4))
            }
		}

		var url = homeUrl + "/geolocations/nearest/" + KSID;
		var flag = true;
		if(!kony.sdk.isNullOrUndefined(geoBoundaryOptions["radius"]) && typeof (geoBoundaryOptions["radius"]) == "number"){
			if(flag) {
                url = url + "?radius=" + geoBoundaryOptions["radius"];
                flag = false;
            }else{
                url = url + "&radius=" + geoBoundaryOptions["radius"];
			}
        }
        if(!kony.sdk.isNullOrUndefined(geoBoundaryOptions["pageSize"]) && typeof (geoBoundaryOptions["pageSize"]) == "number"){
            if(flag) {
                url = url + "?pageSize=" + geoBoundaryOptions["pageSize"];
                flag = false;
            }else{
                url = url + "&pageSize=" + geoBoundaryOptions["pageSize"];
            }
        }
        if(!kony.sdk.isNullOrUndefined(geoBoundaryOptions["tags"])){
            if(flag) {
                url = url + "?tags=" + encodeURI(geoBoundaryOptions["tags"]);
                flag = false;
            }else{
                url = url + "&tags=" + encodeURI(geoBoundaryOptions["tags"]);
            }
        }

        var headers = null;
        if(options && options["authToken"]){
            headers = {"X-Device-AuthToken": options["authToken"]};
        }

        kony.sdk.logsdk.info("### MessagingService::getAndRefreshBoundaries invoking refreshGeoBoundaries with url: " + url);

        var networkOptions={};
        networkOptions["disableIntegrity"] = true;
		networkProvider.get(url, null, headers,
			function(res){
				var geoBoundaries = [];
				var boundaryActions = {};
				var boundariesLimit;
                if(!kony.sdk.isNullOrUndefined(geoBoundaryOptions["pageSize"]) && typeof (geoBoundaryOptions["pageSize"]) == "number"){
                	boundariesLimit = geoBoundaryOptions["pageSize"];
				}else{
                	if(kony.sdk.getPlatformName() == "android") {
                        boundariesLimit = 99;
                    }else {
                		boundariesLimit = 19;
					}
				}
				geoBoundaries.push(formGeoBoundariesInput("refreshBoundary", res["refreshBoundary"].latitude, res["refreshBoundary"].longitude, Math.abs(res["refreshBoundary"].distance * 1609.34)));
				var locations = res["locations"];
				for(var i=0; i < locations.length && i < boundariesLimit; i++){
					var boundaryid = locations[i].id;
                    geoBoundaries.push(formGeoBoundariesInput(boundaryid, locations[i].latitude, locations[i].longitude, Math.abs(locations[i].radius * 1609.34)));
                    boundaryActions[boundaryid] =locations[i];
				}
				setGeoBoundaryData(boundaryActions);
                kony.sdk.logsdk.debug("### MessagingService::getAndRefreshBoundaries registering " + geoBoundaries.length + " boundaries with frameworks for monitoring.");
                kony.location.setGeofencesCallback(manageGeoBoundariesCallback);
                kony.location.createGeofences(geoBoundaries);
                kony.sdk.verifyAndCallClosure(successCallback, {});
			},function(err){
                kony.sdk.logsdk.error("### MessagingService::getAndRefreshBoundaries failed to get geoBoundaries from KMS");
                kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getMessagingError("Failed to get geoBoundaries from KMS"));
			},null,networkOptions);
	};

    /**
     * Register for registerGeoBoundaries with given radius
     * @param {object} options - JSON Object with radius, pageSize, tags and customLogicCallback
     * @param {function} successCallback - Callback method on success
     * @param {function} failureCallback - Callback method on failure of registerGeoBoundary and refreshGeoBoundariesFailure
     */
	this.registerGeoBoundaries = function(options, successCallback, failureCallback){
        var tempKSID = currentObject.getKSID();
		var geoBoundaryOptions = {};
        if(!kony.sdk.isNullOrUndefined(options)) {
            if(!kony.sdk.isNullOrUndefined(options["radius"])){
                geoBoundaryOptions["radius"] = options["radius"];
            }

            if(!kony.sdk.isNullOrUndefined(options["pageSize"])){
            	geoBoundaryOptions["pageSize"] = options["pageSize"];
            }

            if(!kony.sdk.isNullOrUndefined(options["tags"]) && options["tags"] instanceof Array){
            	geoBoundaryOptions["tags"] = options["tags"];
			}

            if(!kony.sdk.isNullOrUndefined(options["customLogicCallback"]) && typeof (failureCallback) == "function"){
                geoBoundaryOptions["customLogicCallback"]= options["customLogicCallback"];
            }else{
                kony.sdk.logsdk.warn("### MessagingService::registerGeoBoundaries customLogicCallback not provided by user");
            }
        }

        currentObject.geoBoundaryOptions = geoBoundaryOptions;

        if (typeof(tempKSID) === 'undefined' || tempKSID === null) {
            throw new Exception(Errors.MESSAGING_FAILURE, "KSID not available, Register and try again.");
        }

        if(!typeof (failureCallback) == "function"){
            throw new Exception(Errors.MESSAGING_FAILURE, "failureCallback is not provided");
        }else{
            currentObject.refreshBoundariesFailuresCallback = failureCallback;
        }

        kony.location.getCurrentPosition(
        	function(res){
                if(kony.sdk.getPlatformName() !== "windows") {
                    var accept = kony.notificationsettings.createAction({
                        "id": "Accept",
                        "label": "Accept",
                        "pspConfig": {
                            "activationMode": kony.notificationsettings.ACTIVATION_MODE_FORWARDS,
                            "authenticationRequired": true,
                            "destructive": false
                        }
                    });

                    var reject = kony.notificationsettings.createAction({
                        "id": "Reject",
                        "label": "Reject",
                        "pspConfig": {
                            "activationMode": kony.notificationsettings.ACTIVATION_MODE_BACKWARDS,
                            "authenticationRequired": false,
                            "destructive": false
                        }
                    });
                    var categoryObj = kony.notificationsettings.createCategory({
                        "categoryId": "geoBoundary",
                        "actions": [accept, reject],
                        "pspConfig": {
                            "minimalActions": [accept, reject]
                        }
                    });

                    var categoryArr = [categoryObj];
                    kony.notificationsettings.registerCategory({
                        "categories": categoryArr,
                        "pspConfig": {
                            "types": [0, 1, 2]
                        }
                    });
                }
                var currentLocation = res.coords;

                var authToken = null;
                if(options && options["authToken"]){
                    authToken = options["authToken"];
                }

        		currentObject.updateGeoLocationWithAuthToken(currentLocation.latitude,
					currentLocation.longitude,
					"fetchBoundaries",
					authToken,
					function(res){
						kony.sdk.logsdk.trace("### MessagingService::registerGeoBoundaries updated current location, fetching geoBoundaries from server.");
						getAndRefreshBoundaries(currentObject.geoBoundaryOptions, successCallback, failureCallback, options);
					},
					function(err){
						kony.sdk.logsdk.error("### MessagingService::registerGeoBoundaries Failed to update current location with KMS.");
						kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getMessagingError("Failed to update current location with KMS"));
				});
			},function(err){
				if(err.code == 1){
                    throw new Exception(Errors.MESSAGING_FAILURE, "Permission to access location is not enabled");
				}else if(err.code == 2){
					throw new Exception(Errors.MESSAGING_FAILURE, "Enable location and try again");
				}else if(err.code == 3){
                    kony.sdk.logsdk.error("### MessagingService::registerGeoBoundaries Unable to retrieve current location.");
					kony.sdk.verifyAndCallClosure(failureCallback, kony.sdk.error.getMessagingError("Unable to retrieve current location"));
				}
			}
		);
	}
}
/**
 * Method to create the Metrics service instance with the provided service name.
 * @returns {MetricsService} Metrics service instance
 */
kony.sdk.prototype.getMetricsService = function() {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	if(!kony.sdk.isLicenseUrlAvailable) {
		throw new Exception(Errors.METRICS_FAILURE, "metrics is not enabled");
	}

	//var metricsServiceObject = null;
	if (this.metricsServiceObject) {
		return this.metricsServiceObject;
	}

	if (this.internalSdkObject) {
		//framework implementation
		this.metricsServiceObject = this.internalSdkObject.getMetricsService();
	} else {
		//sdk local implementation
		this.metricsServiceObject = new MetricsService(this);
	}
	return this.metricsServiceObject;
};

/**
 * Should not be called by the developer.
 * @class
 * @classdesc Metrics service instance for invoking the Metrics services.
 */
function MetricsService(konyRef) {
	
	var url = konyRef.customReportingURL;
	if (typeof(url) === 'undefined') {
		throw new Exception(Errors.METRICS_FAILURE, "reporting url is undefined");
		return;
	}
	var networkProvider = new konyNetworkProvider();

	/**
	 * invoke the getUserId operation
	 */

	this.getUserId = function(userId) {
		return konyRef.getUserId();
	}

	//start of event api
	var eventFlowTag = "";
	var eventBufferMaxValue = 1000;
	var eventBufferAutoFlushValue = 15;
	var characterLengthLimit = 256;
	var eventConfig = {
		"confType": "BUFFER",
		"eventBufferAutoFlushCount": eventBufferAutoFlushValue,
		"eventBufferMaxCount": eventBufferMaxValue
	};
	var reportEventBufferArray = [];
	var reportEventBufferBackupArray = [];
	var retrievedDS = false;
	var eventBufferCount = 0;
	var eventTypeMap = {
		"formentry": "FormEntry",
		"formexit": "FormExit",
		"touch": "Touch",
		"servicerequest": "ServiceRequest",
		"serviceresponse": "ServiceResponse",
		"gesture": "Gesture",
		"orientation": "Orientation",
		"error": "Error",
		"exception": "Exception",
		"crash": "Crash",
		"custom": "Custom",
		"servicecall": "ServiceCall",
		"apptransition": "AppTransition",
		"appload": "AppLoad",
		"component": "Component"
	};
	var errorCodeMap = {
		"1000": true,
		"1011": true,
		"1012": true,
		"1014": true,
		"1015": true,
		"1016": true
	};
	var currentSessionId = "";
	/**
	 * This method will take the a String to set a Flow Tag for the reported events.
	 * @param {string} flowTag - sets flow tag for reporting the events.
	 */
	this.setFlowTag = function(flowTag) {
		if (kony.sdk.isNullOrUndefined(flowTag)) {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event flow tag");
		} else if (flowTag.length <= characterLengthLimit) {
			eventFlowTag = flowTag;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
		}
	};

	/**
	 * This method will clear the flow tag set by the user previously.
	 */
	this.clearFlowTag = function() {
		eventFlowTag = "";
	};

	/**
	 * This method will return the a String to set a Flow Tag for the reported events.
	 * @return {string} flowTag - flow tag set by the user for reporting the events.
	 */
	this.getFlowTag = function() {
		return eventFlowTag;
	};

	/**
	 * This method will take the required values to set the event Configuration values.
	 * @param {string} confType - sets the Current Configuration Type
	 * 					possible values BUFFER or INSTANT.
	 * @param {number} eventBufferAutoFlushCount - event buffer count to auto flush the events
	 * 								possible values any positive integer
	 * 								Default value 15
	 * @param {number} eventBufferMaxCount - Maximum event buffer count to store the events
	 * 								possible values any positive integer
	 * 								Default value 1000
	 */
	this.setEventConfig = function(confType, eventBufferAutoFlushCount, eventBufferMaxCount) {
		if (kony.sdk.isNullOrUndefined(confType)) {
			throw new Exception(Errors.METRICS_FAILURE, "Config Type can not be null");
		} else {
			confType = confType.toUpperCase();
		}
		if (confType === "BUFFER") {
			eventConfig["confType"] = confType;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid value for config type");
		}
		if (!kony.sdk.isNullOrUndefined(eventBufferMaxCount) && typeof(eventBufferMaxCount) === "number" && eventBufferMaxCount > 0) {
			eventConfig["eventBufferMaxCount"] = eventBufferMaxCount;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "eventBufferMaxCount has to be a Number and greater than 0");
		}
		if (!kony.sdk.isNullOrUndefined(eventBufferAutoFlushCount) && typeof(eventBufferAutoFlushCount) === "number" && eventBufferAutoFlushCount > 0 && eventBufferAutoFlushCount <= eventBufferMaxCount) {
			eventConfig["eventBufferAutoFlushCount"] = eventBufferAutoFlushCount;
		} else if (eventBufferAutoFlushCount >= eventBufferMaxCount) {
			eventConfig["eventBufferMaxCount"] = 1000;
			throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount can not be greater than eventBufferMaxCount");
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "eventBufferAutoFlushCount has to be a Number and greater than 0");
		}
	};

	/**
	 * This method takes the event details from the developer and schedule it for sending to server as per Configuration values set by the developer.
	 * @param {string} evttype - Event Type for the reported event.
	 * @param {string} evtSubType - string literal for eventSubType(max 256 Chars)
	 * @param {string} formID -   string literal for formID(max 256 Chars)
	 * @param {string} widgetID - string literal for widgetID(max 256 Chars)
	 * @param {string} flowTag - string literal to override flow tag (max 256 Chars)
	 * @param {string} metaData - string to describe metaData
	 * @throws Exception
	 */

	this.sendEvent = function(evttype, evtSubType, formID, widgetID, flowTag, metaData) {
		if (reportEventBufferBackupArray.length === 0) {
			this.readFromDS();
		}
		eventBufferCount = reportEventBufferBackupArray.length + reportEventBufferArray.length;

		if (eventBufferCount === eventConfig["eventBufferMaxCount"]) {
			throw new Exception(Errors.DATA_STORE_EXCEPTION, "Reached maximum limit to store events");
			return;
		}
		var reportEventMap = {};
		reportEventMap.ts = kony.sdk.formatCurrentDate(new Date());
		evttype = evttype.toLowerCase();
		if (kony.sdk.isNullOrUndefined(eventTypeMap[evttype])) {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid value for event type");
			return;
		} else {
			reportEventMap["evttype"] = eventTypeMap[evttype];
		}
		if (kony.sdk.isNullOrUndefined(evtSubType)) {
			reportEventMap["evtSubType"] = "";
		} else if (evtSubType.length <= characterLengthLimit) {
			reportEventMap["evtSubType"] = evtSubType;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
			return;
		}
		if (kony.sdk.isNullOrUndefined(formID)) {
			reportEventMap["formID"] = kony.application.getCurrentForm().id;
		} else if (formID.length <= characterLengthLimit) {
			reportEventMap["formID"] = formID;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
			return;
		}
		if (kony.sdk.isNullOrUndefined(widgetID)) {
			reportEventMap["widgetID"] = "";
		} else if (widgetID.length <= characterLengthLimit) {
			reportEventMap["widgetID"] = widgetID;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
			return;
		}
		if (kony.sdk.isNullOrUndefined(flowTag)) {
			reportEventMap["flowTag"] = this.getFlowTag();
		} else if (flowTag.length <= characterLengthLimit) {
			reportEventMap["flowTag"] = flowTag;
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Length exceeded, Maximum length of event flow tag is " + characterLengthLimit + " characters");
			return;
		}
		reportEventMap.SID = currentSessionId;
		reportEventMap.metaData = metaData;
		//checking each event data is a proper json or not
		// 	throw new Exception(Errors.METRICS_FAILURE, "Invalid json string passed for events data");
		// }

		reportEventBufferArray.push(reportEventMap);

		if (reportEventBufferArray.length % eventConfig["eventBufferAutoFlushCount"] === 0) {
			this.flushEvents();
		}
	};

	/**
	 * This method will send the buffered events to the server at once.
	 */

	this.flushEvents = function() {
		
		var ref = this;
		if (reportEventBufferBackupArray.length === 0) {
			ref.readFromDS();
		}
		if (reportEventBufferBackupArray.length === 0 && reportEventBufferArray.length === 0) {
			kony.sdk.logsdk.warn("There are no events to flush");
			return;
		}
		var payload = kony.sdk.getPayload(kony.sdk.getCurrentInstance());
		var params = {};
		if (reportEventBufferArray.length !== 0) {
			ref.pushEventsToBufferArray();
		}
		var headers = {
			"Content-Type": "application/x-www-form-urlencoded"
		};

		payload.events = reportEventBufferBackupArray;
		payload.svcid = "SendEvents";
		payload.rsid = reportEventBufferBackupArray[0].SID;
		params.konyreportingparams = JSON.stringify(payload);
		var options = {};
        options["disableIntegrity"] = true;
		networkProvider.post(url, params, headers, flushSuccessCallback, flushErrorCallback,null,options);
		function flushSuccessCallback(response) {
			if (response.opstatus == 0) {
				ref.clearBufferEvents();
			} else if (errorCodeMap[response.opstatus]) {
				ref.saveInDS();
			} else {
				ref.clearBufferEvents();
			}
		}
		function flushErrorCallback(response) {
			kony.sdk.logsdk.error("Unable to flush events");
			ref.saveInDS();	
		}

	};

	/*Stores event data in Data Store on failure of service Call*/
	this.saveInDS = function() {
		var eventsToSave = [];
		eventsToSave.push(JSON.stringify(reportEventBufferBackupArray));
		kony.ds.save(eventsToSave, "konyMetricsBuffer");
		reportEventBufferBackupArray = [];
	};

	/*Clearing events sent to server */
	this.clearBufferEvents = function() {
		reportEventBufferBackupArray = [];
		kony.ds.remove("konyMetricsBuffer");
	};

	/*Reading any pending events from Data Store */
	this.readFromDS = function() {
		var eventsFromDS = kony.ds.read("konyMetricsBuffer");
		if (eventsFromDS !== null) {
			var pushToArray = [];
			pushToArray.push(JSON.parse(eventsFromDS[0]));
			reportEventBufferBackupArray.push.apply(reportEventBufferBackupArray, pushToArray);
		}
	};

	/*Pushes events received from user to BufferBackupArray which will be flushed to server */
	this.pushEventsToBufferArray = function() {
		reportEventBufferBackupArray.push.apply(reportEventBufferBackupArray, reportEventBufferArray);
		reportEventBufferArray = [];
	};

	/**
	 * This method will return the a List of the buffered events.
	 * @return {object} events - list of events stored in buffer.
	 */

	this.getEventsInBuffer = function() {
		var eventsFromDS = kony.ds.read("konyMetricsBuffer");
		var eventsToReturn = [];
		if (!kony.sdk.isNullOrUndefined(eventsFromDS)) {
			eventsToReturn.push(JSON.parse(eventsFromDS[0]));
		}
		if (reportEventBufferArray.length !== 0) {
			eventsToReturn.push.apply(eventsToReturn, reportEventBufferArray);
		}
		if (eventsToReturn.length !== 0) {
			return eventsToReturn;
		} else {
			return null;
		}
	};
	/**
	 * invoke the sendCustomMetrics operation
	 * @param {string} reportingGroupID - reporting Group ID
	 * @param {object} metrics - metrics being reported
	 */
	this.sendCustomMetrics = function(reportingGroupID, metrics) {
		if (typeof(metrics) !== "object") {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid type for metrics data.");
			return;
		}
		var sessionID = currentSessionId;
		var reportData = konyRef.getDataStore().getItem("konyCustomReportData");
		if (!reportData) {
			reportData = new Array();
		} else {
			reportData = JSON.parse(reportData);
		}

		konyRef.getDataStore().removeItem("konyCustomReportData");

		var currentData = {};
		currentData.ts = kony.sdk.formatCurrentDate(new Date().toString());
		currentData.fid = reportingGroupID;
		currentData.metrics = metrics;
		currentData.rsid = sessionID;
		reportData.push(currentData);
		//nyRef.getDataStore().setItem("konyCustomReportData",JSON.stringify(reportData));
		var payload = kony.sdk.getPayload(konyRef);
		if (kony.sdk.metric) {
			if (kony.sdk.metric.reportEventBufferBackupArray.length === 0) {
				kony.sdk.metric.readFromDS();
			}
			kony.sdk.metric.pushEventsToBufferArray();
			payload.events = kony.sdk.metric.reportEventBufferBackupArray;
		}
		payload.reportData = reportData;
		payload.rsid = sessionID;
		payload.svcid = "CaptureKonyCustomMetrics";
		// if (!kony.sdk.isJson(payload)) {
		// 	throw new Exception(Errors.METRICS_FAILURE, "Invalid json string passed for custom metrics");
		// }
		var newData = {};
		newData["konyreportingparams"] = JSON.stringify(payload);

		var options = {};
        options["disableIntegrity"] = true;

		networkProvider.post(url, newData, {
				"Content-Type": "application/x-www-form-urlencoded"
			}, function(res) {
				//successcallback
				//konyRef.getDataStore().removeItem("konyCustomReportData");
				if (kony.sdk.metric) {
					kony.sdk.metric.clearBufferEvents();
				}
				kony.sdk.logsdk.info("metric data successfully sent" + JSON.stringify(res));
			},
			function(res) {

				var storeData = konyRef.getDataStore().getItem("konyCustomReportData");
				if (!storeData) {
					storeData = reportData;
				} else {
					storeData = JSON.parse(storeData);
					reportData.forEach(function(e){
						storeData.push(e);
					});
				}
				if (kony.sdk.metric) {
					if (kony.sdk.metric.errorCodeMap[res.opstatus]) {
						kony.sdk.metric.saveInDS();
					}
				}
				konyRef.getDataStore().setItem("konyCustomReportData", JSON.stringify(storeData));

				kony.sdk.logsdk.error("Unable to send metric report" + JSON.stringify(res));
			}, true,options);
	};

	/**
	 * This method takes the event details from the developer and schedule it for sending to server as per Configuration values set by the developer.
	 * @param {string} errorCode - errorCode of the reported error. Can be empty if not applicable
	 * @param {string} errorType -   errorType of the reported error. Can be empty if not applicable
	 * @param {string} errorMessage - errorMessage of the reported error. Can be empty if not applicable
	 * @param {json} errorDetails - errorDetails of the reported error as a json string that can have key-value pairs for the following
					keys errfile, errmethod, errline, errstacktrace, formID, widgetID, flowTag.
	 * @throws Exception
	 */

	this.reportError = function(errorCode, errorType, errorMessage, errorDetails) {
		var metaData = {};
		metaData.errorcode = errorCode ? errorCode : "";
		metaData.errmsg = errorMessage ? errorMessage : "";
		if (errorDetails && kony.sdk.isJson(errorDetails)) {
			metaData.errfile = errorDetails.errfile ? errorDetails.errfile : "";
			metaData.errmethod = errorDetails.errmethod ? errorDetails.errmethod : "";
			metaData.errline = errorDetails.errline ? errorDetails.errline : "";
			metaData.errstacktrace = errorDetails.errstacktrace ? errorDetails.errstacktrace : "";
			metaData.errcustommsg = errorDetails.errcustommsg ? errorDetails.errcustommsg : "";
			var formID = errorDetails.formID ? errorDetails.formID : "";
			var widgetID = errorDetails.widgetID ? errorDetails.widgetID : "";
			var flowTag = errorDetails.flowTag ? errorDetails.flowTag : "";
			var evtSubType = errorType ? errorType : "";
			this.sendEvent("Error", evtSubType, formID, widgetID, flowTag, metaData);
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid json string passed for error details.");
		}
	};


	/**
	 * This method takes the event details from the developer and schedule it for sending to server as per Configuration values set by the developer.
	 * @param {string} exceptionCode - Code for the reported exception. Can be empty if not applicable
	 * @param {string} exceptionType -   Type of the reported exception. Can be empty if not applicable
	 * @param {string} exceptionMessage - Message of the reported exception. Can be empty if not applicable
	 * @param {json}   exceptionDetails - Details of the reported exception as a JSON string that can have key-value pairs for the
					following keys exceptioncode, exceptionfile, exceptionmethod, exceptionline,
					exceptionstacktrace, formID, widgetID, flowTag.
	 * @throws Exception
	 */

	this.reportHandledException = function(exceptionCode, exceptionType, exceptionMessage, exceptionDetails) {
		var metaData = {};
		metaData.exceptioncode = exceptionCode ? exceptionCode : "";
		metaData.exceptionmsg = exceptionMessage ? exceptionMessage : "";
		if (exceptionDetails && kony.sdk.isJson(exceptionDetails)) {
			metaData.errfile = exceptionDetails.errfile ? exceptionDetails.errfile : "";
			metaData.errmethod = exceptionDetails.errmethod ? exceptionDetails.errmethod : "";
			metaData.errline = exceptionDetails.errline ? exceptionDetails.errline : "";
			metaData.errstacktrace = exceptionDetails.errstacktrace ? exceptionDetails.errstacktrace : "";
			metaData.errcustommsg = exceptionDetails.errcustommsg ? exceptionDetails.errcustommsg : "";
			var formID = exceptionDetails.formID ? exceptionDetails.formID : "";
			var widgetID = exceptionDetails.widgetID ? exceptionDetails.widgetID : "";
			var flowTag = exceptionDetails.flowTag ? exceptionDetails.flowTag : "";
			var evtSubType = exceptionType ? exceptionType : "";
			this.sendEvent("Exception", evtSubType, formID, widgetID, flowTag, metaData);
		} else {
			throw new Exception(Errors.METRICS_FAILURE, "Invalid json string passed for exception details.");
		}
	};

	/**
	 * sets the current sessionId
	 * @param {string} sessionId
	 */

	this.setSessionId = function(sessionId) {
		if (sessionId) {
			currentSessionId = sessionId;
		}
	}

	/**
	 * get the current sessionID
	 *
	 */


	this.getSessionId = function() {
		return currentSessionId;
	}

	/**
	 * stub method used for event tracking
	 *
	 */
	this.setEventTracking = function(eventTypes) {
		// Stub.  This is implemented in native->js binding
	}
}

kony.sdk.initiateSession = function() {};
/**
 * Method to create the sync service instance.
 * @returns {SyncService} sync service instance
 */
kony.sdk.prototype.getSyncService = function() {
	if (!kony.sdk.isInitialized) {
		throw new Exception(Errors.INIT_FAILURE, "Please call init before invoking this service");
	}
	return new konySdkSyncService(this);

}

function konySdkSyncService(konyRef) {
	var SyncProvider = konyRef.sync;
	if(kony.sdk.isNullOrUndefined(kony.sdk.syncService)){
		kony.sdk.syncService = sync;
	}
	var syncServiceHandler = kony.sdk.syncService;
	
	if (!SyncProvider) {
		throw new Exception(Errors.SYNC_FAILURE, "invalid sync provider in serviceDoc");
	}
	//mapping the sync logger to mbaassyncservice logger
	this.log = syncServiceHandler.log;
	
	//generic apis
	this.init = function(initSuccess, initFailure) {
		syncServiceHandler.init(initSuccess, initFailure);
	};

	this.reset = function(resetSuccess, resetFailure) {
		syncServiceHandler.reset(resetSuccess, resetFailure);
	};

	this.cancelPendingChunkRequests = function(successCallback, errorCallback) {
		syncServiceHandler.cancelPendingChunkRequests(successCallback, errorCallback);
	};

	this.stopSession = function(successCallback) {
		syncServiceHandler.stopSession(successCallback);
	};

	this.rollbackPendingLocalChanges = function(successCallback, errorCallback) {
		syncServiceHandler.rollbackPendingLocalChanges(successCallback, errorCallback);
	};

	this.getPendingAcknowledgement = function(successCallback, errorCallback) {
		syncServiceHandler.getPendingAcknowledgement(successCallback, errorCallback);
	};

	this.getPendingUpload = function(successCallback, errorCallback) {
		syncServiceHandler.getPendingUpload(successCallback, errorCallback);
	};

	this.getDeferredUpload = function(successCallback, errorCallback) {
		syncServiceHandler.getDeferredUpload(successCallback, errorCallback);
	};

	this.getAllPendingUploadInstances = function(retrieveOnlyCount, successcallback, errorcallback) {
		syncServiceHandler.getAllPendingUploadInstances(retrieveOnlyCount, successcallback, errorcallback);
	};

	this.executeSelectQuery = function(query, successcallback, errorcallback) {
		syncServiceHandler.executeSelectQuery(query, successcallback, errorcallback);
	};

	//adding the binary apis
	this.getFailedBinaryRecords = function(isDownload, tablename, columnname, successCallback, errorCallback) {
		syncServiceHandler.getFailedBinaryRecords(isDownload, tablename, columnname, successCallback, errorCallback);
	};

	this.getStatusForBinary = function(tbname, columnName, pks, successCallback, errorCallback) {
		syncServiceHandler.getStatusForBinary(tbname, columnName, pks, successCallback, errorCallback);
	};

	this.getBinaryBase64 = function(tbname, columnName, pks, config, successCallback, errorCallback) {
		syncServiceHandler.getBinaryBase64(tbname, columnName, pks, config, successCallback, errorCallback);
	};

	this.getBinaryFilepath = function(tbname, columnName, pks, config, successCallback, errorCallback) {
		syncServiceHandler.getBinaryFilepath(tbname, columnName, pks, config, successCallback, errorCallback);
	};
    //binary chunking apis
    this.createDownloadTask = function(tbname, columnName, pks, config, successCallback, errorCallback) {
        syncServiceHandler.createDownloadTask(tbname, columnName, pks, config, successCallback, errorCallback);
    };
    
    this.startDownload = function(downloadID, successCallback, errorCallback) {
        syncServiceHandler.startDownload(downloadID, successCallback, errorCallback);
    };

	this.pauseDownload = function(downloadID, successCallback, errorCallback) {
		syncServiceHandler.pauseDownload(downloadID, successCallback, errorCallback);
	};

	this.resumeDownload = function(downloadID, successCallback, errorCallback) {
		syncServiceHandler.resumeDownload(downloadID, successCallback, errorCallback);
	};
    
    this.getBinaryDataFilePath = function(tbname, columnName, pks, successCallback, errorCallback) {
      	syncServiceHandler.getBinaryDataFilePath(tbname, columnName, pks, successCallback, errorCallback);
    };
    
    this.getBinary = function(tableName, binaryColumnName, primaryKeyTable, config, successCallback, errorCallback) {
        syncServiceHandler.getBinary(tableName, binaryColumnName, primaryKeyTable, config, successCallback, errorCallback);
    };

	this.deleteBinaryObject = function(tableName, binaryColumnName, primaryKeyTable, options, successCallback, errorCallback) {
		syncServiceHandler.deleteBinaryObject(tableName, binaryColumnName, primaryKeyTable, options, successCallback, errorCallback);
	};
	
	var syncServiceAppid = SyncProvider["appId"];
	var syncServiceUrl = SyncProvider["url"] + "/";

	function genericErrorCallback(res) {
		kony.sdk.logsdk.error("error occurred in refreshing claims token.. Please call login again " + JSON.stringify(res));
	}

	//modified api
	this.startSession = function(config) {
		var errorCallback;
		if (config.onsyncerror) {
			errorCallback = config.onsyncerror;
		} else {
			errorCallback = genericErrorCallback;
		}
		kony.sdk.claimsRefresh(sdkStartSession, errorCallback);

		function sdkStartSession() {
			config = processConfig(config);
			syncServiceHandler.startSession(config);
		}
	}

	this.performUpgrade = function(config) {
		var errorCallback;
		if (config.onperformupgradeerror) {
			errorCallback = config.onperformupgradeerror;
		} else {
			errorCallback = genericErrorCallback;
		}
		kony.sdk.claimsRefresh(sdkPerformUpgrade, errorCallback);

		function sdkPerformUpgrade() {
			config = processConfig(config);
			syncServiceHandler.performUpgrade(config);
		}
	}

	this.isUpgradeRequired = function(config) {
		var errorCallback;
		if (config.isupgraderequirederror) {
			errorCallback = config.isupgraderequirederror;
		} else {
			errorCallback = genericErrorCallback;
		}
		kony.sdk.claimsRefresh(sdkIsUpgradeRequired, errorCallback);

		function sdkIsUpgradeRequired() {
			config = processConfig(config);
			syncServiceHandler.isUpgradeRequired(config);
		}

	}

	function processConfig(config) {
		var tempConfig = config;
		tempConfig.serverurl = syncServiceUrl;
		tempConfig.appid = syncServiceAppid;
		tempConfig.authtoken = konyRef.currentClaimToken;
		return tempConfig;
	}
	
	this.startReconciliation = function(config){
		if(!syncServiceHandler.startReconciliation)
			throw new Exception(Errors.SYNC_FAILURE, "sync provider doesnot support reconciliation");
		syncServiceHandler.startReconciliation(config);
	}
	
}

function OAuthHandler(serviceUrl, providerName, appkey, callback, type, options, isMFVersionCompatible) {
    var urlType = "/" + type + "/";
    var isSuccess = true;
    var isLogout = false;
    var slo = false;
    // This will make sure the scheduler to request tokens will be instantiated only once in the method handleRequestCallback.
	// In case of Google OAuth changes Identity returns the success_url, so page gets refreshed twice which will fail in instantiating the scheduler twice.
    var isLoginCallbackInvoked = false;
    if(options  && options.hasOwnProperty("logout") && options["logout"] === true) {
        isLogout = true;
    }

    if(options && options.hasOwnProperty("slo") && options["slo"] === true) {
        slo = options["slo"];
    }
    var customQueryParamsForOAuth;
    if(options && options.hasOwnProperty("customQueryParamsForOAuth")){
        customQueryParamsForOAuth = kony.sdk.util.objectToQueryParams(options["customQueryParamsForOAuth"]);
    }
    var requestUrl;

    function appendCustomOAuthParamsToURL(url){
        if(!kony.sdk.util.isNullOrEmptyString(customQueryParamsForOAuth)){
            url = url + "&" + customQueryParamsForOAuth;
        }
        return url;
    }

	if (typeof(XMLHttpRequest) !== 'undefined') {
		var _window = window;
		var _popup = null;
		var _listener = function (event) {
			var _contents = event.data;
			_popup.close();
			_detachEvent();
			try {
				var headers = {};
				if (type === "oauth2" || type === "saml") {
					headers["Content-Type"] = "application/x-www-form-urlencoded"
				}
				callback(urlType + "token", {
					code: _contents
				}, headers);
			} catch (err) {
                kony.sdk.logsdk.error("exception ::" + err);
				failureCallback();
			}
		};
		var _attachEvent = function () {
			if (_window.addEventListener) {
				_window.addEventListener('message', _listener, false);
			} else if (_window.attachEvent) {
				_window.attachEvent('message', _listener);
			} else {
				throw new Exception(Errors.INIT_FAILURE, "environment doesn't support event attaching");
			}
		};

		var _detachEvent = function () {
			if (_window.detachEvent) {
				_window.detachEvent('message', _listener);
			} else if (_window.removeEventListener) {
				_window.removeEventListener('message', _listener);
			} else {
				throw new Exception(Errors.INIT_FAILURE, "environment doesn't support detaching an event");
			}
		};
		_attachEvent();
        if(isLogout){
            requestUrl = serviceUrl + urlType + "logout?provider=" + providerName + "&appkey=" + appkey + "&slo=" + slo;
        }else{
            requestUrl = serviceUrl + urlType + "login?provider=" + providerName + "&appkey=" + appkey;
            requestUrl = appendCustomOAuthParamsToURL(requestUrl);
        }
        _popup = _window.open(requestUrl);
    }
	else {
		var browserSF = null;
		var userDefined = false;
		if(options && options["browserWidget"] && kony.type(options["browserWidget"]) === "kony.ui.Browser"){
			browserSF = options["browserWidget"];
			userDefined = true;
		} else if (options && options["UseDeviceBrowser"] && isMFVersionCompatible){
            kony.sdk.util.OAuthCallback = callback;
            kony.sdk.util.OAuthType = type;
		} else {
			var formBasic = {
				id: "popUp",
				skin: null,
				isModal: false,
				transparencyBehindThePopup: 80,
				"needAppMenu": false
			};
			var formLayout = {
				containerWeight: 100,
				padding: [5, 5, 5, 5],
				"paddingInPixel": true
			};
			var formPSP = {
				"titleBar": true,
				"titleBarConfig": {
					"renderTitleText": true,
					"prevFormTitle": false,
					"titleBarLeftSideView": "button",
					"labelLeftSideView": "Back",
					"titleBarRightSideView": "none"
				},
				"titleBarSkin": "slTitleBar"
			};
			//to do.. this is a workaround for android browser issue.. need to refactor this code
			browserSF = new kony.ui.Browser({
				"id": "browserSF",
				"text": "Browser",
				"isVisible": true,
				"detectTelNumber": true,
				"screenLevelWidget": true,
				"enableZoom": false
			}, {
				"margin": [0, 0, 0, 0],
				"marginInPixel": true,
				"paddingInPixel": true,
				"containerWeight": 100
			}, {});

			var prevForm = kony.application.getCurrentForm();
			var oauthForm = new kony.ui.Form2(formBasic, formLayout, formPSP);
			oauthForm.add(browserSF);
			oauthForm.show();
		}
		var urlConf;
		var headersConf = {};
        if(!kony.sdk.isNullOrUndefined(konyRef.currentClaimToken)){
            headersConf[Constants.APP_AUTHORIZATION_HEADER] = konyRef.currentClaimToken;
        }
        konyRef.appendGlobalHeaders(headersConf);

        requestUrl = serviceUrl + urlType;

        if (isLogout){
            requestUrl += "logout?provider=" + providerName + "&appkey=" + appkey + "&slo=" + slo;
		}
		else{
            requestUrl += "login?provider=" + providerName + "&appkey=" + appkey;
		}

        if (!kony.sdk.isNullOrUndefined(kony.sdk.getFabricAppVersion())){
            requestUrl += "&app_version=" + kony.sdk.getFabricAppVersion();
		}

		if (isLogout) {
			browserSF.onSuccess = handleOAuthLogoutSuccessCallback;
			browserSF.onFailure = handleOAuthLogoutFailureCallback;
        } else {
            if (options && options["success_url"] && isMFVersionCompatible) {
                requestUrl += "&success_url=" + options["success_url"];
            }

            requestUrl = appendCustomOAuthParamsToURL(requestUrl);
			if (options && options["UseDeviceBrowser"] && isMFVersionCompatible) {
				kony.application.openURL(requestUrl);
				return;
            } else {
                isLoginCallbackInvoked = false;
                //#ifdef android
                browserSF.onPageStarted = handleRequestCallback;
                //#else
                browserSF.handleRequest = handleRequestCallback;
                //#endif
			}
        }

        urlConf = {
            URL: requestUrl,
            requestMethod: constants.BROWSER_REQUEST_METHOD_GET
        };
        if(Object.keys(headersConf).length > 0){
            urlConf["headers"] = headersConf;
        }
        browserSF.requestURLConfig = urlConf;

        function handleOAuthLogoutSuccessCallback(){
			if(!userDefined) {
				var prevFormPostShow = prevForm.postShow;
				function postShowOverride() {
					oauthForm.destroy();
					if (prevFormPostShow) {
						prevFormPostShow();
					}
					prevForm.postShow = prevFormPostShow;
				}

				prevForm.postShow = postShowOverride;
				prevForm.show();
			}
			callback(isSuccess);
		}

		function handleOAuthLogoutFailureCallback(){
			isSuccess = false;
		}

		function handleRequestCallback(browserWidget, params) {

			var originalUrl = params["originalURL"];
			if (!isLoginCallbackInvoked && typeof(params.queryParams) !== "undefined" && typeof(params.queryParams.code) !== "undefined") {
				if(!userDefined) {
					var prevFormPostShow = prevForm.postShow;
					prevForm.postShow = postShowOverride;
					function postShowOverride() {
						oauthForm.destroy();
						if (prevFormPostShow) {
							prevFormPostShow();
						}
						prevForm.postShow = prevFormPostShow;
					}

					prevForm.show();
				}
				var headers = {};
				if (type === "oauth2" || type === "saml") {
					headers["Content-Type"] = "application/x-www-form-urlencoded"
				}
				if (!isLoginCallbackInvoked){
                    // make request for tokens
                    kony.timer.schedule(new Date().getTime().toString(), function (url, callback, code, headers) {
                        return function () {
                            callback(url, {code: code}, headers);
                        };
                    }(urlType + "token", callback, decodeURIComponent(params.queryParams.code), headers), 1, false);
                    isLoginCallbackInvoked = true;
				}
			}
			return false;
		}
	}

}

/**
 * Handles the deeplink callback, this needs to be called once deep link redirection is done.
 * @param {json} params parameters from Identity service - "code": HashValue
 */
function handleDeeplinkCallback(params){
    if (params && kony.sdk.isValidDeeplinkCallback(params)){
        var headers = {};
        var requestUrl;
        if (kony.sdk.util.OAuthType === "oauth2" || kony.sdk.util.OAuthType === "saml") {
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        }

        if(kony.sdk.util.OAuthType === "oauth2"){
            requestUrl = "/oauth2/token";
        }else{
            requestUrl = "/login";
        }
        // make request for tokens
        kony.sdk.util.OAuthCallback(requestUrl, {code: decodeURIComponent(params.launchparams.code)}, headers);
    }
}

if(kony.sdk){
	kony.sdk.offline = {};
}

//#ifdef KONYSYNC_WINDOWS

//#else
//defined constants related to offline authentication.
kony.sdk.offline.isOfflineEnabled = false;
kony.sdk.offline.persistToken = false;
kony.sdk.constants.iterations = 1024;
kony.sdk.constants.keyLength = 256;

function getOfflineLoginDBKeyForProvider(providerName){
	return "userCredentials" + providerName;
}

/**
 *	This Utility API to be used for the user to be able to login offline into the application.
 */
kony.sdk.offline.loginOffline = function(providerName, successCallback,errorCallback){
	
	//retrieving the temporarily stored encrypted username.
	var tempUserIdBase64 = kony.store.getItem("tempUserCredentials");

	if(tempUserIdBase64 != null && tempUserIdBase64 != undefined){
		var storedBase64 = kony.store.getItem(getOfflineLoginDBKeyForProvider(providerName));

		if(tempUserIdBase64 == storedBase64 ){
			var authResponseStr = kony.sdk.offline.getUserAuthInformation("authResponse");
			if(authResponseStr)
				successCallback(JSON.parse(authResponseStr));
			else{
				errorCallback(kony.sdk.error.getMFcodeErrObj(kony.sdk.errorcodes.offline_auth_failed,kony.sdk.errormessages.offline_auth_failed));
			}
		}
		else{
			errorCallback(kony.sdk.error.getMFcodeErrObj(kony.sdk.errorcodes.offline_auth_failed,kony.sdk.errormessages.offline_auth_failed))
		}
	}
};

/**
 *	This API is to be used to store the user login success response to the device and read it in the offline auth success scenario.
 */
kony.sdk.offline.saveUserAuthInformation = function(dbKey, authResponse){

    //validating arguments
    if(kony.sdk.isNullOrUndefined(dbKey) || typeof (dbKey) != "string" || dbKey.length === 0 ||
        kony.sdk.isNullOrUndefined(authResponse) || typeof (authResponse) != "object" || Object.keys(authResponse).length === 0){
        kony.sdk.logsdk.warn("### kony.sdk.offline.saveUserAuthInformation invalid arguments passed, returning");
        return;
    }

    var stringifiedResponse = JSON.stringify(authResponse);

    // Encryption and saving authInformation
    // kony.sdk.getDeviceId() + appKey + appSecret is used as the secure key to encrypt / decrypt sensitive information saved into the local store
    var encryptedAuthResponse = kony.sdk.encryptText(stringifiedResponse, [kony.sdk.getDeviceId(), konyRef.mainRef.appKey, konyRef.mainRef.appSecret], "aes");

    kony.store.setItem(dbKey,encryptedAuthResponse);
    kony.sdk.logsdk.info("saved auth info from the login success response");

};

/**
 *	This API is to be used to retrieve the user login success response to the device and read it in the offline auth success scenario.
 */
kony.sdk.offline.getUserAuthInformation = function(dbKey){

    var decryptedAuthResponse = null;
    var encryptedAuthResponse;
    if(!kony.sdk.isNullOrUndefined(dbKey) && typeof (dbKey) == "string")
        encryptedAuthResponse = kony.store.getItem(dbKey);

    if(!kony.sdk.isNullOrUndefined(encryptedAuthResponse)) {
        //Decrypting the saved response
        decryptedAuthResponse = kony.sdk.decryptText(encryptedAuthResponse, [kony.sdk.getDeviceId(), konyRef.mainRef.appKey, konyRef.mainRef.appSecret], "aes");

        if (kony.sdk.isNullOrUndefined(decryptedAuthResponse) || decryptedAuthResponse === ''){
            // Backward compatibility. Since we didnt encrypt with deviceID decryption will fail. Decrypt with old key "ssoencryption". Encrypting with deviceID & persisting response.
            decryptedAuthResponse = kony.sdk.decryptText(encryptedAuthResponse, [konyRef.mainRef.appKey, konyRef.mainRef.appSecret], "aes");

            if (!kony.sdk.isNullOrUndefined(decryptedAuthResponse) && decryptedAuthResponse !== ''){
                kony.sdk.offline.saveUserAuthInformation(dbKey, JSON.parse(decryptedAuthResponse));
            }
        }
    }

    return decryptedAuthResponse;
};


/**
 *	This api saves the temporary user credentials to the device store.  This is to be called only if the app is offline auth enabled.
 */
kony.sdk.offline.saveTempUserCredentials = function(options){
	
	var op = {"algo":"SHA256","userid":options["userid"],"password":options["password"],"iterations":kony.sdk.constants.iterations,"keyLength":kony.sdk.constants.keyLength};
	var key = kony.sdk.offline.getKey(op);
	var encrypteduserid = kony.crypto.encrypt("aes", key, options["userid"], {});

	var base64userid = kony.convertToBase64(encrypteduserid);

	kony.store.setItem("tempUserCredentials",base64userid);
};
/**
 *	This Util method reads the temporarily stored user credentials and updates the actual store of user credentials. This should be called on successful onlnine login.
 */
kony.sdk.offline.updateSuccessUserCredentials=function(providerName){
	var tempUserObj = kony.store.getItem("tempUserCredentials");
	if(tempUserObj != null && tempUserObj != undefined)
		kony.store.setItem(getOfflineLoginDBKeyForProvider(providerName),tempUserObj);
	kony.store.removeItem("tempUserCredentials");
};

/**
 * 	This API generates the PBKDF2 key by reading the options passed as argument.
 */
kony.sdk.offline.getKey = function(options){
	var userid = options["userid"];
	var password = options["password"];
	var salt = userid+password;
	var iterations = options["iterations"];
	var klen = options["keyLength"];
	var key = kony.crypto.createPBKDF2Key(options["algo"], options["password"], salt ,iterations, klen);
	return key;
};
/**
 *	This Utility API is to enable the developer read the claims token when the device is in offline mode.
 */
kony.sdk.offline.getClaimsToken = function(){

	var userAuthInfoStr = kony.sdk.offline.getUserAuthInformation("authResponse");
	if(userAuthInfoStr != null && userAuthInfoStr != undefined) {
		var userAuthInfo = JSON.parse(userAuthInfoStr);
		return userAuthInfo.claims_token;
	}
	return null;
};

/**
 *	This Utility API is to update the the claims token.
 */
kony.sdk.offline.updateAuthToken = function(data){
	var userAuthInfoStr = kony.sdk.offline.getUserAuthInformation("authResponse");
	if(userAuthInfoStr != null && userAuthInfoStr != undefined) {
        kony.sdk.offline.saveUserAuthInformation("authResponse", data);
	}
};

/**
 *	This Utility API is to update the the backend token.
 */
kony.sdk.offline.updatePersistedToken = function(data){
	var userAuthInfoStr = kony.sdk.offline.getUserAuthInformation("persistedAuthResponse");
	if(userAuthInfoStr != null && userAuthInfoStr != undefined) {
        kony.sdk.offline.saveUserAuthInformation("persistedAuthResponse",data);
	}
};

/**
 *	This API removes the user credentials from the device store.
 */
kony.sdk.offline.removeUserCredentials = function(providerName){
	kony.store.removeItem(getOfflineLoginDBKeyForProvider(providerName));
	kony.store.removeItem("tempUserCredentials");
};

/**
 *	Removes the user auth information from device store.
 */
kony.sdk.offline.removeUserAuthInformation = function(){
	kony.store.removeItem("authResponse");
};

kony.sdk.offline.removePersistedUserAuthInformation = function(){
    kony.store.removeItem("persistedAuthResponse");
};
//#endif
var KNYMobileFabric = null;
var KNYMetricsService = null;
var serviceDocTimerId = null;
dsAppMetaData  = null;
AppServiceDoc = null;

kony.setupsdks = function(initConfig, successCallBack, errorCallBack) {

  // var KNYMobileFabric = null;
  // var KNYMetricsService = null;

  var getServiceDocNonMFApp = function(initConfig) {
    var serviceDoc = new kony.sdk.serviceDoc();

    serviceDoc.setAppId(initConfig.appConfig.appId);
    serviceDoc.setBaseId(initConfig.appConfig.appId);
    serviceDoc.setAppName(initConfig.appConfig.appName);

    serviceDoc.setReportingService(kony.sdk.constants.reportingType.session, getLicenseUrl(initConfig.appConfig));
    serviceDoc.setReportingService(kony.sdk.constants.reportingType.custom, getMetricsUrl(initConfig.appConfig));

    return serviceDoc.toJSON();
  };

    // Comparing the older etag vs current etag sent by tools, if mismatch considering the service doc from tools is latest.
    if (initConfig.appConfig.svcDoc && initConfig.appConfig.svcDoc.service_doc_etag){
        var currentToolsEtag = initConfig.appConfig.svcDoc.service_doc_etag;
        var cachedToolsEtag = kony.sdk.nativestore.getItem("tools_etagID");

        if (currentToolsEtag !== cachedToolsEtag){
            kony.print("New etag set from the app/visulizer");
            kony.sdk.nativestore.setItem("tools_etagID", currentToolsEtag);
            kony.sdk.nativestore.setItem(appConfig.appId+"_mobileFabricServiceDoc", JSON.stringify(initConfig.appConfig.svcDoc));
        }
    }

    dsAppData = kony.sdk.nativestore.getItem(appConfig.appId);

    if(!kony.sdk.isNullOrUndefined(dsAppData)) {
        dsAppMetaData = JSON.parse(dsAppData);
    }

    dsAppServiceDoc = kony.sdk.nativestore.getItem(appConfig.appId+"_mobileFabricServiceDoc");
    if(!kony.sdk.isNullOrUndefined(dsAppServiceDoc)) {
        AppServiceDoc = JSON.parse(dsAppServiceDoc);
    }

    //This code will come into play in the second app launch of an upgraded app
    //In this scenario both the keys(aid_mfdoc,mfdoc) are present.
    //Checking for both self link and  server app name, before deleting the old service doc
    //For an environment self link and server app name act as a composite primary key
    var oldDsAppServiceDoc = kony.sdk.nativestore.getItem("mobileFabricServiceDoc");
    if(!kony.sdk.isNullOrUndefined(oldDsAppServiceDoc)){
        var oldAppServiceDoc = JSON.parse(oldDsAppServiceDoc);
        if (!kony.sdk.isNullOrUndefined(AppServiceDoc) &&
            AppServiceDoc.name === oldAppServiceDoc.name &&
            AppServiceDoc.selflink === oldAppServiceDoc.selflink) {
            kony.sdk.nativestore.removeItem("mobileFabricServiceDoc");
        }
    }

    var getLicenseUrl = function(appConfig) {
    var url = "";
      if (appConfig.isturlbase) {
      url = appConfig.isturlbase + "/IST";
    } else if (appConfig.secureurl) {
      url = getFromServerUrl(appConfig.secureurl, "IST");
    } else if (appConfig.url) {
      url = getFromServerUrl(appConfig.url, "IST");
    }
    return url;
  };

  var getMetricsUrl = function(appConfig) {
    var url = "";
      if (appConfig.isturlbase) {
      url = appConfig.isturlbase + "/CMS";
    } else if (appConfig.secureurl) {
      url = getFromServerUrl(appConfig.secureurl, "CMS");
    } else if (appConfig.url) {
      url = getFromServerUrl(appConfig.url, "CMS");
    }
    return url;
  };

  var getFromServerUrl = function(url, path) {
    // ServerURL for non-mf has /mwservlet appended after the context path.
    // We need to remove it to get the base server url
    //url = url.replace(/mwservlet\/*$/i, "");
    //return url + path;
    var newUrl = "";
    var exactSubString = url.match(/mwservlet/i);
    if (exactSubString) {
      var exactSubStringLength = "mwservlet".length;
      var lastSubStringIndex = url.lastIndexOf(exactSubString);
      var subString = url.slice(0, lastSubStringIndex);
      var index = (lastSubStringIndex + exactSubStringLength);
      var subString2 = url.slice(index, url.length);
      var has = /[a-zA-Z0-9]/.test(subString2);
      if (!has) {
        newUrl = subString;
      } else {
        newUrl = url;
      }
    } else {
      newUrl = url;
    }
    return newUrl + path;
  };

  var konyAPMSuccessCallBack = function(metricsObject, initConfig) {
    kony.print("Initializing event tracking");
    KNYMetricsService = metricsObject;
    if(KNYMetricsService) {
      KNYMetricsService.setEventTracking(initConfig.eventTypes);
    }

  };

  var initKNYMobileFabric = function(initConfig) {
    KNYMobileFabric = new kony.sdk();
    clientParams = {};
    clientParams.aid = appConfig.appId;
    clientParams.aname = appConfig.appName;
    KNYMobileFabric.setClientParams(clientParams);
  };

  var sdkInit = function(initConfig, successcallback, failurecallback) {
    var isInvalidConfig = false;
    var networkProvider = new konyNetworkProvider();

      if(!(kony.sdk.isNullOrUndefined(dsAppMetaData) || kony.sdk.isNullOrUndefined(AppServiceDoc))) {
          if (dsAppMetaData.appId === appConfig.appId && dsAppMetaData.appVersion === appConfig.appVersion) {

              appConfig.appKey = dsAppMetaData.appKey;
              appConfig.appSecret = dsAppMetaData.appSecret;
              appConfig.serviceUrl = dsAppMetaData.serviceUrl;
              var reportingServiceUrl = dsAppMetaData.licenseUrl;
              appConfig.isturlbase = reportingServiceUrl.replace("/IST","");
              appConfig.svcDoc = AppServiceDoc;
              sdkInitConfig.appKey = dsAppMetaData.appKey;
              sdkInitConfig.appSecret = dsAppMetaData.appSecret;
              sdkInitConfig.serviceUrl = dsAppMetaData.serviceUrl;
          }
      }

    var refreshServiceDoc = function(){
      var networkProvider = new konyNetworkProvider();

        if(!kony.sdk.isNullOrUndefined(dsAppMetaData)){
            if(dsAppMetaData.appId === appConfig.appId && dsAppMetaData.appVersion === appConfig.appVersion){
                initConfig.appKey = dsAppMetaData.appKey;
                initConfig.appSecret = dsAppMetaData.appSecret;
                initConfig.serviceUrl = dsAppMetaData.serviceUrl;
            }
        }
      networkProvider.post(initConfig.serviceUrl,null, {
                                "X-Kony-App-Key": initConfig.appKey,
                                "X-Kony-App-Secret": initConfig.appSecret,
                                "X-HTTP-Method-Override": "GET"
          },
          function (data) {
              kony.sdk.nativestore.setItem(appConfig.appId+"_mobileFabricServiceDoc", JSON.stringify(data));
            },
          function (data) {
              kony.sdk.logger.warn("Refresh of serviceDoc failed:" + data);
          });
    };
    if (KNYMobileFabric == null) {
      initKNYMobileFabric(initConfig);
    }
    if (initConfig && initConfig.appConfig && (getLicenseUrl(initConfig.appConfig) === "")) {
      if(kony.license && kony.license.setIsLicenseUrlAvailable) {
        kony.license.setIsLicenseUrlAvailable(false);
        kony.sdk.isLicenseUrlAvailable = false;
      }
    }
    if (kony.sdk.isLicenseUrlAvailable && kony.license && kony.license.createSession) {
      kony.license.createSession();
    }
     if(!initConfig.isMFApp){

      initWithServiceDocHelper(initConfig,successcallback,failurecallback,getServiceDocNonMFApp(initConfig));
    }
    else
    {
      if(!initConfig.appConfig.svcDocRefresh){
           if(initConfig.appConfig.svcDoc){
               initWithServiceDocHelper(initConfig,successcallback,failurecallback,initConfig.appConfig.svcDoc);
           }
           else{
               isInvalidConfig = true;
           }
      }
      if(isInvalidConfig || initConfig.appConfig.svcDocRefresh){
           var cachedServiceDoc = kony.sdk.nativestore.getItem(appConfig.appId+"_mobileFabricServiceDoc");
           if(cachedServiceDoc) {
               try {
                   cachedServiceDoc = JSON.parse(cachedServiceDoc);
               }
               catch (err) {
                   cachedServiceDoc = "";
                   kony.sdk.logsdk.error("cached service doc corrupted:"+err);
               }
           }
          //Todo: Dead code, remove this refresh service doc logic. (MFSDK-2084)
           if(initConfig.appConfig.svcDocRefreshTimeSecs && !isInvalidConfig){
                if(cachedServiceDoc || initConfig.appConfig.svcDoc){
                    var offlineServiceDoc = cachedServiceDoc ? cachedServiceDoc : initConfig.appConfig.svcDoc;
                    initWithServiceDocHelper(initConfig, successcallback, failurecallback, offlineServiceDoc);
                    serviceDocTimerId = Date.now().toString();
                    kony.timer.schedule(serviceDocTimerId, refreshServiceDoc, initConfig.appConfig.svcDocRefreshTimeSecs, true);
                }
                else{
                    networkProvider.post(initConfig.serviceUrl, null, {
                        "X-Kony-App-Key": initConfig.appKey,
                        "X-Kony-App-Secret": initConfig.appSecret,
                        "X-HTTP-Method-Override": "GET"
                    }, function(res){
                        res = kony.sdk.formatSuccessResponse(res);
                        initWithServiceDocHelper(initConfig, successcallback, failurecallback, res);
                      //  kony.sdk.nativestore.setItem(appConfig.appId+"_mobileFabricServiceDoc", JSON.stringify(res));
                    },function(res){
                        failurecallback(res);
                    });
                }
           }
           else{
              networkProvider.post(initConfig.serviceUrl,null, {
                    "X-Kony-App-Key": initConfig.appKey,
                    "X-Kony-App-Secret": initConfig.appSecret,
                    "X-HTTP-Method-Override": "GET"
              },function(res){
                  res = kony.sdk.formatSuccessResponse(res);
                  initWithServiceDocHelper(initConfig,successcallback,failurecallback,res);
                 // kony.sdk.nativestore.setItem(appConfig.appId+"_mobileFabricServiceDoc",JSON.stringify(res));
              },function(res) {
                  if(cachedServiceDoc || initConfig.appConfig.svcDoc){
                    var offlineServiceDoc = cachedServiceDoc ? cachedServiceDoc : initConfig.appConfig.svcDoc;
                    initWithServiceDocHelper(initConfig, successcallback, failurecallback, offlineServiceDoc);
                  }
                  else{
                  failurecallback(res);
                  }
              });
           }
      }

    }

  };

  var initWithServiceDocHelper = function(initConfig,successcallback, failurecallback,serviceDoc) {
    try {
		if(initConfig != null && initConfig != undefined && initConfig["appMetadata"] != undefined && initConfig["appMetadata"] != null){
			kony.sdk.util.setPackagedMetadata(initConfig["appMetadata"]);
		}
      KNYMobileFabric.initWithServiceDoc(initConfig.appKey,initConfig.appSecret,serviceDoc);
      var MetricsService = null;
      if (kony.sdk.isLicenseUrlAvailable) {
        MetricsService = KNYMobileFabric.getMetricsService();
      }
      if(initConfig.isMFApp){
         konyRef.isAnonymousProvider = true ;
      }
      if (successcallback){
         successcallback(MetricsService, initConfig);
      }
    }
    catch (error) {
      if (failurecallback)
        failurecallback(error);
    }
  };

  /*
   * isMFApp -- boolean to indicate app is being built for MFapp as backend or plain Konyserver
   * appConfig -- set to appConfig of startup.js
   *
   * --MF Parameters--
   * serviceUrl -- mf appconfig url
   * appKey -- set to App Key for MF app scenario
   * appSecret -- set to App Secret for MF app scenario
   *
   * -- For APM --
   * eventTypes -- This should be set to comma separated values chosen in the IDE for events chosen for automatic tracking
   *
   * Examples
   * var sdkInitConfigForMF = {
   *    "isMFApp": true,
        "appConfig" : appconfig,

        "appKey" :"<appkey fetched from MF>",
        "appSecret":"<appsecret fetched from MF>",
        "serviceUrl" : "<appconfig url of the form https://100000013.auth.sit2-konycloud.com/appconfig>",
        "eventTypes" :   ["FormEntry","FormExit","Touch","ServiceRequest","ServiceResponse","Gesture","Orientation","Error","Crash"]
        }
   * var sdkInitConfigForNonMF = {
        "isMFApp": false,
        "appConfig" : appconfig

        "eventTypes" :   ["FormEntry","FormExit","Touch","ServiceRequest","ServiceResponse","Gesture","Orientation","Error","Crash"]
        }
   */

  sdkInit(initConfig,
    function (metricsObject, initConfig) {
      kony.print("sdk initialization done");
      konyAPMSuccessCallBack(metricsObject, initConfig);
      if (successCallBack)
        successCallBack(KNYMobileFabric);
    },
    function(errorObj) {
      kony.print("Error in setup" + errorObj ? errorObj.toString() : "");
      if (errorCallBack)
        errorCallBack(errorObj);
    });

};
