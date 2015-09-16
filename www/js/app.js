// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
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
        controller: "LoginCtrl"
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
    url: '/eventdetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/eventdetail.html',
        controller: "EventDetailCtrl"
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
    url: '/blogdetail',
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
    url: '/photogallery',
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
    url: '/videogallery',
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
});
