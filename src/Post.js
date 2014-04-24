(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./Request'],factory);
    } 
    else {
        root.Post = factory(root.Request);
    }
}(this, function (Request) {
    "use strict";
    function Post(url, data, async) {

        this.type = 'POST';
        if (url === undefined || data === undefined)
            throw new Error('Parameters mismatched');
        this.async = async === undefined ? true : false;
        this.url = url;
        this.data = data;
        return this;
    }

    Post.prototype = new Request();

    Post.constructor = Post;

    return Post;
}));