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

})
.controller('ResetPasswordCtrl', function($scope) {

})
.controller('ForgotPasswordCtrl', function($scope) {

})
.controller('SignupCtrl', function($scope) {

})
.controller('HomeCtrl', function($scope) {

})
.controller('ContentPageCtrl', function($scope) {

})
.controller('EventsCtrl', function($scope) {

})
.controller('EventDetailCtrl', function($scope) {

})
    .controller('BlogsCtrl', function($scope) {

})
    .controller('BlogDetailCtrl', function($scope) {

})
    .controller('PhotoGalleryCategoryCtrl', function($scope) {

})
    .controller('PhotoGalleryCtrl', function($scope) {

})
    .controller('VideoGalleryCategoryCtrl', function($scope) {

})
    .controller('VideoGalleryCtrl', function($scope) {

})
.controller('AccountCtrl', function($scope) {

})
.controller('SettingCtrl', function($scope) {

})
.controller('NotificationCtrl', function($scope) {

})
.controller('ContactCtrl', function($scope) {

})
.controller('SearchCtrl', function($scope) {

})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
