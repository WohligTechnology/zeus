//var adminbase = "http://wohlig.co.in/webappbackend/";
var adminbase = "http://localhost/webappbackend/";
//var adminbase = "http://192.168.2.9/webappbackend/";
var adminurl = adminbase + "index.php/json/";
var adminhauth = adminbase + "index.php/hauth/";

var foods = [];

angular.module('starter.services', [])
    .factory('MyServices', function ($http) {
        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            },
            signup: function (signup,callback) {
                return $http({
                    url: adminurl + 'signup',
                    method: "POST",
                    data: {
                        'username': signup.username,
                        'email': signup.email,
                        'password': signup.password,
                        'dob': signup.dob
                    }
                }).success(callback);
            }, 
            signin: function (signin,callback) {
                return $http({
                    url: adminurl + 'signin',
                    method: "POST",
                    data: {
                        'username': signin.username,
                        'password': signin.password
                    }
                }).success(callback);
            },
  authenticate: function () {
                return $http({
                    url: adminurl + 'authenticate',
                    method: "POST"
                });
            }, 
            logout: function () {
                return $http({
                    url: adminurl + 'logout',
                    method: "POST"
                });
            },
          
        };
    });