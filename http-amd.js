var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Request = (function () {
        function Request() {
            this.xhr = new XMLHttpRequest();
            this.promise = new Promise();
            this.requestManager = new RequestManager(this);
        }
        Request.prototype.resume = function (callback) {
            if (callback === 'resolve' && this.promise[callback] !== undefined)
                this.promise[callback](this.response);
            if (callback === 'reject' && this.promise[callback] !== undefined)
                this.promise[callback](this.xhr.statusText, this.xhr.status);
        };
        Request.prototype.start = function () {
            this.requestManager.process();
            return this.promise;
        };
        Request.prototype.restart = function () {
            this.requestManager.process();
            return this.promise;
        };
        return Request;
    })();
    exports.Request = Request;

    var Get = (function (_super) {
        __extends(Get, _super);
        function Get(url, async) {
            _super.call(this);
            this.type = 'GET';
            if (url === undefined)
                throw new Error('Parameters mismatched');
            this.url = url;

            async === undefined ? this.async = true : this.async = false;
        }
        return Get;
    })(Request);
    exports.Get = Get;
    var Post = (function (_super) {
        __extends(Post, _super);
        function Post(url, data, async) {
            _super.call(this);
            this.type = 'POST';
            if (url === undefined || data === undefined)
                throw new Error('Parameters mismatched');
            async === undefined ? this.async = true : this.async = false;
            this.url = url;
            this.data = data;
            return this;
        }
        return Post;
    })(Request);
    exports.Post = Post;
    var Put = (function (_super) {
        __extends(Put, _super);
        function Put(url, data, async) {
            _super.call(this);
            this.type = 'PUT';
            if (url === undefined || data === undefined)
                throw new Error('Parameters mismatched');
            async === undefined ? this.async = true : this.async = false;
            this.url = url;
            this.data = data;
            return this;
        }
        return Put;
    })(Request);
    exports.Put = Put;
    var Delete = (function (_super) {
        __extends(Delete, _super);
        function Delete(url, data, async) {
            _super.call(this);
            this.type = 'DELETE';
            if (url === undefined || data === undefined)
                throw new Error('Parameters mismatched');
            async === undefined ? this.async = true : this.async = false;
            this.url = url;
            this.data = data;
            return this;
        }
        return Delete;
    })(Request);
    exports.Delete = Delete;

    var RequestManager = (function () {
        function RequestManager(request) {
            this.request = request;
        }
        RequestManager.prototype.verifyStatus = function () {
            return !(this.request.xhr.status < 200 || this.request.xhr.status >= 300 && this.request.xhr.status !== 304);
        };
        RequestManager.prototype.statedChanged = function () {
            if (this.verifyStatus()) {
                return this.parseData();
            }
            return this.request.resume.call(this.request, 'reject');
        };
        RequestManager.prototype.parseData = function () {
            if (this.request.xhr.getResponseHeader('content-type') == 'application/json')
                this.request.response = JSON.parse(this.request.xhr.response);
else
                this.request.response = this.request.xhr.response;
            return this.request.resume.call(this.request, 'resolve');
        };
        RequestManager.prototype.process = function () {
            this.request.xhr.open(this.request.type, this.request.url, this.request.async);
            this.request.xhr.onload = this.statedChanged.bind(this);
            this.request.xhr.send(this.prepareData());
        };
        RequestManager.prototype.prepareData = function () {
            if (typeof (this.request.data) === 'object') {
                this.request.xhr.setRequestHeader("Content-Type", "application/json");
                return JSON.stringify(this.request.data);
            }
            if (typeof (this.request.data) === 'string') {
                return this.request.data;
            }
            return null;
        };
        return RequestManager;
    })();
    exports.RequestManager = RequestManager;
    var Promise = (function () {
        function Promise() {
        }
        Promise.prototype.fail = function (callback) {
            this.reject = callback;
        };
        Promise.prototype.then = function (callback, callback1) {
            this.resolve = callback;
            callback1 !== undefined ? this.reject = callback1 : false;
        };
        return Promise;
    })();
    exports.Promise = Promise;
});
//# sourceMappingURL=http-amd.js.map
