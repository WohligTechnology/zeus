angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $ionicConfigProvider.views.maxCache(0);
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })


    .state('access', {
        url: '/access',
        abstract: true,
        templateUrl: 'templates/access.html',
        controller: 'AccessCtrl'
    })

    .state('access.login', {
        url: '/login',
        views: {
            'content': {
                templateUrl: 'templates/accessView/login.html',
                controller: "LoginCtrl"
            }
        }
    })

    .state('access.signup', {
            url: '/signup',
            views: {
                'content': {
                    templateUrl: 'templates/accessView/signup.html',
                    controller: "SignupCtrl"
                }
            }
        })
        .state('access.resetpassword', {
            url: '/resetpassword',
            views: {
                'content': {
                    templateUrl: 'templates/accessView/resetpassword.html',
                    controller: "ResetPasswordCtrl"
                }
            }
        })
        .state('access.forgotpassword', {
            url: '/forgotpassword',
            views: {
                'content': {
                    templateUrl: 'templates/accessView/forgotpassword.html',
                    controller: 'ForgotPasswordCtrl'
                }
            }
        })

    .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appView/home.html',
                    controller: "HomeCtrl"
                }
            }
        })
        .state('app.contentpage', {
            url: '/contentpage',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appView/contentpage.html',
                    controller: "ContentPageCtrl"
                }
            }
        })

    .state('app.events', {
        url: '/events',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/events.html',
                controller: "EventsCtrl"
            }
        }
    })

    .state('app.eventdetail', {
            url: '/eventdetail/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appView/eventdetail.html',
                    controller: "EventDetailCtrl"
                }
            }
        })
        .state('app.service', {
            url: '/service',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appView/service.html',
                    controller: "ServiceCtrl"
                }
            }
        })

    .state('app.blogs', {
        url: '/blogs',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/blogs.html',
                controller: "BlogsCtrl"
            }
        }
    })

    .state('app.blogdetail', {
        url: '/blogdetail/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/blogdetail.html',
                controller: "BlogDetailCtrl"
            }
        }
    })

    .state('app.photogallerycategory', {
        url: '/photogallerycategory',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/photogallerycategory.html',
                controller: "PhotoGalleryCategoryCtrl"
            }
        }
    })

    .state('app.photogallery', {
        url: '/photogallery/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/photogallery.html',
                controller: "PhotoGalleryCtrl"
            }
        }
    })

    .state('app.videogallerycategory', {
        url: '/videogallerycategory',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/videogallerycategory.html',
                controller: "VideoGalleryCategoryCtrl"
            }
        }
    })

    .state('app.videogallery', {
        url: '/videogallery/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/videogallery.html',
                controller: "VideoGalleryCtrl"
            }
        }
    })

    .state('app.account', {
        url: '/account',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/account.html',
                controller: "AccountCtrl"
            }
        }
    })

    .state('app.setting', {
        url: '/setting',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/setting.html',
                controller: "SettingCtrl"
            }
        }
    })

    .state('app.notification', {
        url: '/notification',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/notification.html',
                controller: "NotificationCtrl"
            }
        }
    })

    .state('app.contact', {
        url: '/contact',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/contact.html',
                controller: "ContactCtrl"
            }
        }
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/appView/search.html',
                controller: "SearchCtrl"
            }
        }
    })



    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');


})



.filter('serverimage', function () {
    return function (image) {
        return adminimage + image;
    };
})

.directive('youtube', function ($sce) {
    return {
        restrict: 'A',
        scope: {
            code: '='
        },
        replace: true,
        template: '<iframe style="overflow:hidden;width:100%;" src="{{url}}" frameborder="0"></iframe>',
        //        template: '<iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe>',
        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });
        }
    };
})


.filter('convertto12', function () {
    return function (date) {
        var newtime = "";
        var split = date.split(":");
        if (parseInt(split[0]) >= 12) {
            newtime = (parseInt(split[0]) - 12) + ":" + split[1] + " PM Onwards";
        } else {
            newtime = split[0] + ":" + split[1] + " AM Onwards";
        }
        return newtime;
    };
})

.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
})

.filter('rawHtml', ['$sce',
        function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
        }
    ]);