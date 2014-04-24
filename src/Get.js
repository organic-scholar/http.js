(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./Request'], factory);
    } else {
        // Browser globals
        root.Get = factory(root.Request);
    }
}(this, function (Request) {
    "use strict";
    function Get(url, async) {
        this.type = 'GET';
        if (url === undefined)
            throw new Error('Parameters mismatched');
        this.url = url;
        this.async = (async === undefined) ? true : async;
    }
    Get.prototype = new Request();
    Get.prototype.constructor = Get;
    return Get;
}));
