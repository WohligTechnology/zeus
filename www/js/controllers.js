angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$location,MyServices ) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
    var logoutsuccess=function(data,success){
    console.log(data);
        if(data=='true'){
         $location.url("/access/login");
        }
    }
    $scope.logout=function(){
      MyServices.logout().success(logoutsuccess);
    }
  $scope.loginData = {};
  

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/accessView/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AccessCtrl', function($scope) {

})
  .controller('LoginCtrl', function($scope,$location,$interval,MyServices,$ionicPopup) {
      $scope.loginfail = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Login Failed!',
     template: 'Wrong username or password!!'
   });
 };
    
    
    //logins
     var checktwitter = function (data, status) {
        if (data != "false") {
            $interval.cancel(stopinterval);
            ref.close();
            MyServices.authenticate().success(authenticatesuccess);
        } else {
           $scope.loginfail();
        }
    };

    var callAtIntervaltwitter = function () {
        MyServices.authenticate().success(checktwitter);
    };
      var authenticatesuccess = function (data, status) {
        console.log(data);
        if (data != "false") {
//            $.jStorage.set("user", data);
            user = data;
            $location.url("/home");
        } else {
           $scope.loginfail();
        };
    };
    $scope.facebooklogin=function(){
     ref = window.open(adminhauth + 'login/Facebook?returnurl=http://www.wohlig.com', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function (event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
    }
    $scope.twitterlogin=function(){
     console.log("in twitter");

        ref = window.open(adminhauth + 'login/Twitter', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function (event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
    }
    
      $scope.instagramlogin = function () {

        ref = window.open(adminhauth + 'login/Instagram?returnurl=http://www.wohlig.com', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function (event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
        //        $location.url("/tab/dash");
    }
      
        $scope.googlelogin = function () {

        ref = window.open(adminhauth + 'login/Google?returnurl=http://www.wohlig.com', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function (event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
    }
    
        //SIGN UP FORMn
        $scope.signup={};
        var signupsuccess=function(data,status){
        console.log(data);
             $scope.signup={};
        }
        $scope.signupsubmit=function(signup){
            $scope.signup=signup;
          MyServices.signup($scope.signup,signupsuccess);
        }
        
        // SIGN IN 
         $scope.signin={};
        var signinsuccess=function(data,status){
        console.log(data);
            if(data!='false'){
             MyServices.authenticate().success(authenticatesuccess);
                 $scope.signin={};
            }
            
            else{
              $scope.loginfail();
            }
        }
        $scope.signinsubmit=function(signin){
            $scope.signin=signin;
          MyServices.signin($scope.signin,signinsuccess);
        }
    //        ***** tabchange ****

    $scope.tab = 'signin';
    $scope.classa = 'active';
    $scope.classb = '';

    $scope.tabchange = function(tab, a) {

      $scope.tab = tab;
      if (a == 1) {
        $scope.classa = "active";
        $scope.classb = '';

      } else {
        $scope.classa = '';
        $scope.classb = "active";

      }
    };

    //    ****** End ******

  })
  .controller('ResetPasswordCtrl', function($scope) {

  })
  .controller('ForgotPasswordCtrl', function($scope) {

  })
  .controller('SignupCtrl', function($scope) {

  })
  .controller('HomeCtrl', function($scope) {
    $scope.slides = ["http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png", "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png", "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png"];

  })
  .controller('ContentPageCtrl', function($scope) {

  })
  .controller('EventsCtrl', function($scope) {

    $scope.events = [{
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }];
  })
  .controller('EventDetailCtrl', function($scope) {

  })
  .controller('BlogsCtrl', function($scope) {
    $scope.blogs = [{
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }];
  })
  .controller('BlogDetailCtrl', function($scope) {

  })
  .controller('PhotoGalleryCategoryCtrl', function($scope) {
    $scope.photos = [{
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }];
  })
  .controller('PhotoGalleryCtrl', function($scope) {
    $scope.photos = [{
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }];
  })
  .controller('VideoGalleryCategoryCtrl', function($scope) {

    $scope.videos = [{
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }];


  })
  .controller('VideoGalleryCtrl', function($scope) {
    $scope.videos = [{
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }];
  })
  .controller('AccountCtrl', function($scope) {

  })
  .controller('SettingCtrl', function($scope) {

  })
  .controller('NotificationCtrl', function($scope) {
    $scope.notifications = [{
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }];
  })
  .controller('ContactCtrl', function($scope) {
    //        ***** tabchange ****

    $scope.tab = 'contactus';
    $scope.classa = 'active';
    $scope.classb = '';

    $scope.tabchange = function(tab, a) {

      $scope.tab = tab;
      if (a == 1) {
        $scope.classa = "active";
        $scope.classb = '';

      } else {
        $scope.classa = '';
        $scope.classb = "active";

      }
    };

    //    ****** End ******

  })
  .controller('SearchCtrl', function($scope) {
    $scope.searches = [{
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }, {
      image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
      title: "Music Concert",
      date: "7 Jan, 2016",
      subtitle: "Film, Media & Entertainment by paragyte technologies"
    }];
  });
