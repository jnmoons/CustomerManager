﻿/*#######################################################################
  
  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Ward Bell - Breeze Integration
  http://twitter.com/WardBell
  http://neverindoubtnet.blogspot.com

  #######################################################################*/

'use strict';

define(['services/routeResolver'], function () {

    var app = angular.module('customersApp', ['routeResolverServices', 'CustomAnimations', '$strap']);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

            //Change default views and controllers directory using the following:
            //routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
                //route.resolve() now accepts the convention to use (name of controller & view) as well as the 
                //path where the controller or view lives in the controllers or views folder if it's in a sub folder. 
                //For example, the controllers for customers live in controllers/customers and the views are in views/customers.
                //The controllers for orders live in controllers/orders and the views are in views/orders
                //The second parameter allows for putting related controllers/views into subfolders to better organize large projects
                //Thanks to Ton Yeung for the idea and contribution
                .when('/customers', route.resolve('Customers', 'customers/'))
                .when('/customerorders/:customerID', route.resolve('CustomerOrders', 'customers/'))
                .when('/customeredit/:customerID', route.resolve('CustomerEdit', 'customers/'))
                .when('/orders', route.resolve('Orders', 'orders/'))
                .otherwise({ redirectTo: '/customers' });

    }]);

    return app;
});





