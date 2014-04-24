Http.js
=======
Http.js is an object oriented javascript library for making http requests and ajax calls.

Getting Started
-----------------

This library is also AMD compatible can be require using require js.

### GET ###

	var request = new Http.Get(Url, Async);

	request.start().then(function(response) {
	
	}).fail(function(error, errorCode) {
			
	});


+ Url: String.
+ Async: Boolean.

We instantiated Get request by providing Url and Async for process to be async or sync,
but this will not process the request.
For starting the request process we call start() method on request object
and it return a promise.


### POST ###


	var request = new Http.Post(Url, Data, Async);
	request.start().then(function(response) {
	
	}).fail(function(error, errorCode){
		
	});
		

+ Url: String.
+ Data: Any.
+ Async: Boolean.

We instantiated POST request by providing Url, Data and Async for process to be async or sync,
For starting the request process we call start() method on request object
and it returns a promise.

## Reference

### Request

The request object(Get, Post, Put, Delete) contains data and url,
which can be changed after instantiating.
E.g
		

	var request = new Http.POST('/home',data);
   	request.start();
   	request.data = otherData;
  	request.url = otherUrl;

and request can be restart.

    request.restart();

XHR object from request is also available on request object.

   	request.xhr;
