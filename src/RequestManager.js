define([],function(){
    "use strict";
    function RequestManager() {
    }
    RequestManager.prototype.verifyStatus = function (request) {
        return !(request.xhr.status < 200 || request.xhr.status >= 300 && request.xhr.status !== 304);
    };
    RequestManager.prototype.loaded = function (request) {
        if (this.verifyStatus(request)) {
            request.response = this.parseData(request);
            request.completer.complete(request.response);
        }
        else{
            request.completer.completeError(request.xhr.statusText);
        }
    };
    RequestManager.prototype.parseData = function (request) {
        if (request.xhr.getResponseHeader('content-type') == 'application/json')
            return JSON.parse(request.xhr.responseText);
        else
            return request.xhr.responseText;
    };
    RequestManager.prototype.process = function (request) {
        request.xhr.open(request.type, request.url, request.async);
        this.send(request);
    };
    RequestManager.prototype.send = function(request){
        this.prepareData(request);
        var that = this;
        if(request.async === true){
            request.xhr.onload = function(){
                that.loaded.call(that,request);
            };
            request.xhr.send(this.prepareData(request));
        }
        else{
            request.xhr.send(this.prepareData(request));
            this.loaded.call(this,request);
        }
    };
    RequestManager.prototype.prepareData = function (request) {
        if (typeof (request.data) === 'object') {
            request.xhr.setRequestHeader("Content-Type", "application/json");
            return JSON.stringify(request.data);
        }
        if (typeof (request.data) === 'string') {
            return request.data;
        }
        return null;
    };
    return RequestManager;
});
