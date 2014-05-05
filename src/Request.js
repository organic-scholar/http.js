define(['./RequestManager'],

    function(RequestManager) {
        "use strict";

        function Promise() {

        }
        Promise.prototype.then = function(callback) {
            this.resolve = callback;
            return this;
        };
        Promise.prototype.fail = function(callback) {
            this.reject = callback;
            return this;
        };

        function Completer() {
            this.promise = new Promise();
        }
        Completer.prototype.complete = function() {
            if (this.promise.resolve !== undefined) {
                this.promise.resolve.apply(this, arguments);
            }
        };
        Completer.prototype.completeError = function(error) {
            if (this.promise.reject !== undefined)
                this.promise.reject(error);
        };
        function Request() {
            this.xhr = new XMLHttpRequest();
            this.completer = new Completer();
            this.requestManager = new RequestManager();
        }
        Request.prototype.start = function() {
            this.requestManager.process(this);
            return this.completer.promise;
        };
        Request.prototype.restart = function() {
            this.requestManager.process();
            return this.completer.promise;
        };
        return Request;
    });
