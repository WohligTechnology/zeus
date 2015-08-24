angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
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
  .controller('LoginCtrl', function($scope) {
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

  })


.controller('PlaylistCtrl', function($scope, $stateParams) {});
