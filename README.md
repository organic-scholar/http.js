Http.js
=======
Http.js is an object oriented javascript library for making http requests and ajax calls.

Getting Started
-----------------

This repo contains both AMD and non-AMD version of Http.js.

### For AMD version. ###

    <script data-main="path to main.js" src="path to require.js" type="text/javascript">

In main.js

    require.config({
        paths: {
            Http: 'path to http-amd.js'
        }
    });

    require([Http], function(Http){

    });

### For non-AMD version. ###
	<script src="path to http.js" type="text/javascript">

__Http.js can perform GET, POST, PUT and DELETE Http verbs.__

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


### PUT ###

		
	var request = new Http.Put(Url, Data, Async);
	request.start().
	then(function(response){
	
	}).fail(function(error, errorCode){
	
	});
		

+ Url: String.
+ Data: Any.
+ Async: Boolean.

### DELETE ###


	var request = new Http.Delete(Url, Data, Async);
	request.start().then(function(response){
		
	}).
	fail(function(error, errorCode){
	
	});
		
+ Url:String.
+ Data:Any.
+ Async:Boolean.		

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

Response from request is also available on request object.

   	request.response;
[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/852b9bc744d1a9a736728475219f81b1 "githalytics.com")](http://githalytics.com/nauman1225/Http.js)   	
