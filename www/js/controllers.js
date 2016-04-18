var reloadpage = false;
var configreload = {};
angular.module('starter.controllers', ['starter.services', 'ion-gallery', 'ngCordova', 'ngSanitize', 'vcRecaptcha'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices, $ionicLoading, $location, $filter, $cordovaNetwork) {
  addanalytics("flexible menu");
  //	$ionicLoading.hide();
  $scope.config = MyServices.getconfigdata();

  function internetaccess(toState) {
    if (navigator) {
      if (navigator.onLine !== true) {
        onoffline = false;
        // $location.url("/access/offline");
      } else {
        onoffline = true;
      }
    }
  }
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    internetaccess(toState);
  });
  window.addEventListener("offline", function(e) {
    internetaccess();
  });
  window.addEventListener("online", function(e) {
    internetaccess();
  });

  $scope.menudata = [];
  var loginstatus = false;

  // loader
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  //	$scope.showloading();
  configreload.onallpage = function() {
    var loginstatus = false;
    if (MyServices.getconfigdata()) {
      _.each(MyServices.getconfigdata().config[0], function(n) {
        if (n.value === true) {
          loginstatus = true;
        }
      });
    }
    if (loginstatus === true && !MyServices.getuser()) {

      $location.url("/access/login");
    }
  };
  configreload.func = function() {
    console.log(config);
    $scope.menudata = [];
    var data = MyServices.getconfigdata();
    console.log(data);
    // _.each(data.config[0], function(n) {
    //   if (n.value === true) {
    //     loginstatus = true;
    //   }
    // });
    _.each(data.menu, function(n) {
      if (data.config.login.hasLogin) {
          var newmenu = {};
          newmenu.id = n._id;
          newmenu.name = n.name;
          newmenu.order = n.order;
          newmenu.icon = n.iconType;
          newmenu.link_type = n.linktypename;
            switch (n.type) {
              case 'Blog':
                newmenu.typeid = n.link._id;
                newmenu.link = 'blogdetail';
                break;
              case 'Event':
                newmenu.typeid = n.link._id;
                newmenu.link = 'eventdetail';
                break;
              case 'Video Gallery':
                newmenu.typeid = n.link._id;
                newmenu.link = "videogallery";
                break;
              case 'Photo Gallery':
                newmenu.typeid = n.link._id;
                newmenu.link = "photogallery";
                break;
              case '2':
                newmenu.typeid = n.article;
                break;
              default:
                newmenu.link = $filter('lowercase')(n.link);

            }

          // newmenu.link = n.linktypelink;
          $scope.menudata.push(newmenu);

      } else {
        var newmenu = {};
        newmenu.id = n.id;
        newmenu.name = n.name;
        newmenu.order = n.order;
        newmenu.icon = n.icon;
        newmenu.link_type = n.linktypename;
        switch (n.linktype) {
          case '3':
            newmenu.typeid = n.event;
            break;
          case '6':
            newmenu.typeid = n.gallery;
            break;
          case '8':
            newmenu.typeid = n.video;
            break;
          case '10':
            newmenu.typeid = n.blog;
            break;
          case '2':
            newmenu.typeid = n.article;
            break;
          default:
            newmenu.typeid = 0;

        }
        newmenu.link = n.linktypelink;
        $scope.menudata.push(newmenu);
      }
    });
    // $scope.contact = data.config[5];
    // $scope.menu = {};
    // $scope.menu.setting = false;
    // var blogdata1 = JSON.parse(data.config[0].text);
    //
    // // config data
    // var blogdata = JSON.parse(data.config[1].text);
    // for (var i = 0; i < blogdata.length; i++) {
    //   if (blogdata[i].value === true) {
    //     $scope.menudata.blogs = true;
    //     $.jStorage.set("blogType", blogdata[i]);
    //     break;
    //   } else {
    //     $scope.menudata.blogs = false;
    //   }
    // }
    // _.each(blogdata1, function(n) {
    //   if (n.value === true) {
    //     loginstatus = true;
    //   }
    // });
    //
    $scope.logso = "";
    if (!data.config.login.hasLogin) {
      // $scope.menu.setting = false;
    } else {
      // $scope.menu.setting = true;
      $scope.logso = "has-menu-photo";
    }
  };

  // MyServices.getallfrontmenu(function(data) {
  //   MyServices.setconfigdata(data);
  //   _.each(data.config[0], function(n) {
  //     if (n.value === true) {
  //       loginstatus = true;
  //     }
  //   });
  //   configreload.func();
  // }, function(err) {
  //   // $location.url("/access/offline");
  // });
configreload.func();
  var logoutsuccess = function(data, success) {
    if (data == 'true') {
      $.jStorage.deleteKey('user');
      reloadpage = true;
      $ionicLoading.hide();
      $location.path("/access/login");
    }
  };
  $scope.logout = function() {
    $ionicLoading.show();
    MyServices.logout(logoutsuccess, function(err) {
      // $location.url("/access/offline");
    });
  };

  // Form data for the login modal
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

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  if ($.jStorage.get("user")) {
    console.log("user in");
    MyServices.getUserMob(function(data) {
      console.log(data);
      if (data.value === false) {
        $scope.userdetails = $.jStorage.get("user");
      }else{
      $scope.userdetails = data.data;
      $scope.userdetails.myimage = {
        'background-image': "url('" + $filter("profileimg")(data.image) + "')"
      };
    }
    }, function(err) {
      $scope.userdetails = $.jStorage.get("user");
      // $location.url("/access/offline");
    });

  }

})

.controller('AccessCtrl', function($scope) {

  })
  .controller('AudiogalleryCtrl', function($scope, MyServices, $stateParams, $http) {
    // 	$scope.audio = [{
    //   img: "img/audio.jpg",
    //   name:"Fever Ray",
    //   desc:"if i had a heart"

    // },{
    //   img: "img/audio.jpg",
    //   name:"Moby",
    //   desc:"Mistake"

    // },{
    //   img: "img/audio.jpg",
    //   name:"Uppermost",
    //   desc:"Revolution"

    // },{
    //   img: "img/audio.jpg",
    //   name:"Nigel Standford",
    //   desc:"cyamatics"

    // }];
    // $scope.audio = [];
    var options = {};
    options.client_id = 'cbd22121cc1612b8146c72dd16651cb4';
    var user = "hiimharsh";
    $http({
      method: 'GET',
      url: 'http://api.soundcloud.com/users/' + user + '/tracks',
      params: options,
      withCredentials: false
    }).then(function(data) {
      $scope.audio = data.data;
      console.log('audio: ', $scope.audio);
    });
    // return audio;
    // var sound = MyServices.getTracks();
    // console.log('sound: ', sound);
  })
  .controller('AudiogallerycategoryCtrl', function($scope, MyServices, $stateParams) {
    // 	$scope.audio = [{
    //   img: "img/audio.jpg",
    //   name:"Fever Ray",
    //   desc:"if i had a heart"

    // },{
    //   img: "img/audio.jpg",
    //   name:"Moby",
    //   desc:"Mistake"

    // },{
    //   img: "img/audio.jpg",
    //   name:"Uppermost",
    //   desc:"Revolution"

    // },{
    //   img: "img/audio.jpg",
    //   name:"Nigel Standford",
    //   desc:"cyamatics"

    // }];

    SC.initialize({
      client_id: '3316b4d5bb6dc355bef2c72c161a9084'
    });
    var pauser;
    $scope.item = $stateParams.item;
    var allAudio = $stateParams.items;
    console.log('each item: ', $stateParams);
    $scope.isPlaying = 1;
    console.log('isPlaying: ', $scope.isPlaying);

    $scope.streamNow = function(value, isPlaying) {
      console.log("stream now cliked");
      console.log("is playing value: ", isPlaying);
      if (isPlaying == 1) {
        console.log("value: ", value);
        $scope.isPlaying = 0;
        SC.stream('/tracks/' + value.id).then(function(player) {
          pauser.pause();
          // $.jStorage.set('pauser', pauser);
          // $.jStorage.set('id', value.id);
          console.log('1');
        });
      } else {
        console.log("value: ", value);
        $scope.isPlaying = 1;
        SC.stream('/tracks/' + value.id).then(function(player) {
          player.play();
          pauser = player;
          // $.jStorage.set('pauser', pauser);
          // $.jStorage.set('id', value.id);
          console.log('0');
        });
      }
    };

    console.log('all audio length: ', allAudio.length);
    $scope.nextPlay = function(value) {
      var index = allAudio.indexOf(value);
      if (index >= allAudio.length - 1) {
        // $scope.isPlaying = 1;
        index = 0;
        $scope.item = allAudio[index];
        SC.stream('/tracks/' + allAudio[index].id).then(function(player) {
          player.play();
          pauser = player;
          // $.jStorage.set('pauser', pauser);
          // $.jStorage.set('id', allAudio[index].id);
        });
      } else {
        // $scope.isPlaying = 1;
        ++index;
        $scope.item = allAudio[index];
        SC.stream('/tracks/' + allAudio[index].id).then(function(player) {
          player.play();
          pauser = player;
          // $.jStorage.set('pauser', pauser);
          // $.jStorage.set('id', allAudio[index].id);
        });
      }
    };

    $scope.prevPlay = function(value) {
      var index = allAudio.indexOf(value);
      if (index === 0) {
        $scope.isPlaying = 1;
        index = allAudio.length - 1;
        $scope.item = allAudio[index];
        SC.stream('/tracks/' + allAudio[index].id).then(function(player) {
          player.play();
          pauser = player;
          // $.jStorage.set('pauser', pauser);
          // $.jStorage.set('id', allAudio[index].id);
        });
      } else {
        $scope.isPlaying = 1;
        --index;
        $scope.item = allAudio[index];
        SC.stream('/tracks/' + allAudio[index].id).then(function(player) {
          player.play();
          pauser = player;
          // $.jStorage.set('pauser', pauser);
          // $.jStorage.set('id', allAudio[index].id);
        });
      }
    };

    $scope.$on('$destroy', function() {
      // console.log('exiting AudiogallerycategoryCtrl!')
      SC.stream('/tracks/' + $scope.item.id).then(function(player) {
        pauser.pause();
        // pauser = player;
        // $.jStorage.set('pauser', pauser);
        // $.jStorage.set('id', allAudio[index].id);
      });
    });
  })

.controller('ArticleCtrl', function($scope, MyServices, $stateParams, $ionicPopup, $interval, $location, $window, $ionicLoading, $timeout) {
  configreload.onallpage();
  $scope.article = {};
  $scope.msg = "";
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.showloading();
  MyServices.getStaticPages($stateParams.id, function(data) {
    $scope.article = data.data;
    if (data.value === false) {
      $scope.msg = "Blank Article.";
    }
    addanalytics(data.title);
    $ionicLoading.hide();
  }, function(err) {
    // $location.url("/access/offline");
  });

})

.controller('LoginCtrl', function($scope, MyServices, $ionicPopup, $interval, $location, $window, $ionicLoading, $timeout) {
  addanalytics("flexible login page");
  $scope.logindata = {};
  $.jStorage.deleteKey("user");

  $scope.forgotpass = function() {
    $location.url("/access/forgotpassword");
  };

  $scope.config = MyServices.getconfigdata();
  var loginstatus = false;

  function internetaccess(toState) {
    if (navigator) {
      if (navigator.onLine !== true) {
        onoffline = false;
        // $location.url("/access/offline");
      } else {
        onoffline = true;
      }
    }
  }
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    internetaccess(toState);
  });
  window.addEventListener("offline", function(e) {
    internetaccess();
  });
  window.addEventListener("online", function(e) {
    internetaccess();
  });

  // loader
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  //logins
  var checktwitter = function(data, status) {
    if (data !== "false" && data !== '') {
      $interval.cancel(stopinterval);
      ref.close();
      MyServices.authenticate().success(authenticatesuccess);
    } else {

    }
  };

  var callAtIntervaltwitter = function() {
    MyServices.authenticate().success(checktwitter);
  };
  var authenticatesuccess = function(data, status) {
    $ionicLoading.hide();
    if (data != "false") {
      $.jStorage.set("user", data);
      user = data;
      reloadpage = true;
      $location.url("/app/home");
    }
  };
  $scope.facebooklogin = function() {
    if (isapp) {
      ref = cordova.InAppBrowser.open(adminhauth + 'login/Facebook?returnurl=http://www.wohlig.com', '_blank', 'location=no');
    } else {
      ref = window.open(adminhauth + 'login/Facebook?returnurl=http://www.wohlig.com', '_blank', 'location=no');
    }
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate().success(authenticatesuccess);
      $interval.cancel(stopinterval);
    });
  };
  $scope.twitterlogin = function() {
    if (isapp) {
      ref = cordova.InAppBrowser.open(adminhauth + 'login/Twitter', '_blank', 'location=no');
    } else {
      ref = window.open(adminhauth + 'login/Twitter', '_blank', 'location=no');
    }
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate().success(authenticatesuccess);
      $interval.cancel(stopinterval);
    });
  };

  $scope.instagramlogin = function() {
    if (isapp) {
      ref = cordova.InAppBrowser.open(adminhauth + 'login/Instagram?returnurl=http://www.wohlig.com', '_blank', 'location=no');
    } else {
      ref = window.open(adminhauth + 'login/Instagram?returnurl=http://www.wohlig.com', '_blank', 'location=no');
    }
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate().success(authenticatesuccess);
      $interval.cancel(stopinterval);
    });
  };

  $scope.googlelogin = function() {
    if (isapp) {
      ref = cordova.InAppBrowser.open(adminhauth + 'login/Google?returnurl=http://www.wohlig.com', '_blank', 'location=no');
    } else {
      ref = window.open(adminhauth + 'login/Google?returnurl=http://www.wohlig.com', '_blank', 'location=no');
    }
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate().success(authenticatesuccess);
      $interval.cancel(stopinterval);
    });
  };
  // popup
  $scope.showPopupsignupsuccess = function() {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Successfully registered!</p>',
      title: 'Congrats!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };
  $scope.showPopupsignupfailure = function() {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">User already exist</p>',
      title: 'Oops!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  //SIGN UP FORM
  $scope.signup = {};
  var signupsuccess = function(data, status) {
    if (data != "false") {
      $.jStorage.set("user", data);
      user = data;
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">Signed up successfully!</p>',
        title: 'Congrats!',
        scope: $scope,

      });
      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $location.url("/app/home");
      }, 2000);

    } else {
      $scope.showPopupsignupfailure();
    }
    $ionicLoading.hide();
    $scope.signup = {};
  };

  var msgforall = function(msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Login',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  };

  $scope.signupsubmit = function(signup) {
    $ionicLoading.show();
    $scope.allvalidation = [{
      field: $scope.signup.username,
      validation: ""
    }, {
      field: $scope.signup.email,
      validation: ""
    }, {
      field: $scope.signup.dob,
      validation: ""
    }, {
      field: $scope.signup.password,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.signup($scope.signup, signupsuccess, function(err) {
        // $location.url("/access/offline");
      });
    } else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }

  };

  // SIGN IN
  $scope.signin = {};
  var signinsuccess = function(data, status) {
    $ionicLoading.hide();
    if (data.value === true) {
      $.jStorage.set("user", data.data);
      user = data;
      $location.url("/app/home");
      $scope.signin = {};
    } else {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Wrong username or password!'
      });
    }
  };
  $scope.signinsubmit = function(signin) {
    $ionicLoading.show();
    $scope.allvalidation = [{
      field: $scope.signin.username,
      validation: ""
    }, {
      field: $scope.signin.password,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.signinMob(signin, signinsuccess, function(err) {
        // $location.url("/access/offline");
      });
    } else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }
  };

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
  addanalytics("Reset password");
  // loader
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.showPopup2 = function() {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Your password is updated!</p>',
      title: 'Password updated!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.showPopup3 = function() {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Your passwords do not match!</p>',
      title: 'Sorry!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.showPopup4 = function() {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Something went wrong!</p>',
      title: 'Oops! Try again.',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.password = {};
  var changepasswordcallback = function(data, status) {
    if (data == 1) {
      $scope.showPopup2();
      $ionicLoading.hide();
      $scope.password = {};
    } else if (data == 0) {
      $ionicLoading.hide();
      $scope.showPopup4();
    } else if (data == -1) {
      $ionicLoading.hide();
      $scope.showPopup3();
    }
  }

  $scope.changepassword = function(password) {
    $ionicLoading.show();

    $ionicLoading.show();
    $scope.allvalidation = [{
      field: $scope.password.oldpassword,
      validation: ""
    }, {
      field: $scope.password.newpassword,
      validation: ""
    }, {
      field: $scope.password.confirmpassword,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.changepassword(password, changepasswordcallback, function(err) {
        // $location.url("/access/offline");
      });
    } else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }

  }

})

.controller('ForgotPasswordCtrl', function($scope, $ionicLoading, $timeout, MyServices, $location, $ionicPopup) {
  addanalytics("Forgot password");
  // loader
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  var forgotpasswordcallback = function(data, status) {
    console.log(data);
    $ionicLoading.hide();
    if (data == "true") {
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">Please check your email, an email has been send to your id.</p>',
        title: 'Email sent!',
        scope: $scope,

      });
      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $location.url("/access/login");
      }, 2000);

    } else {
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">Not a valid email.</p>',
        title: 'Oops! Try again.',
        scope: $scope,

      });
      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);
    }
  };
  $scope.forgotpassword = function(email) {
    $ionicLoading.show();
    MyServices.forgotpassword(email, forgotpasswordcallback, function(err) {
      // $location.url("/access/offline");
    });
  };
})

.controller('SignupCtrl', function($scope) {

})

.controller('HomeCtrl', function($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
  addanalytics("Home page");
  configreload.onallpage();
  var showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 3000);
  };
  showloading();

  var loginstatus = false;
  var menu = {};
  menu.setting = false;

  $scope.content = {};
  MyServices.gethomecontent(function(data) {
    $scope.content = data;
    $scope.content.content = $sce.trustAsHtml($scope.content.content);
    //		$ionicLoading.hide();
  }, function(err) {
    // $location.url("/access/offline");
  });
  $scope.setup = function() {
    var blogdata = JSON.parse(MyServices.getconfigdata().config[0].text);
    _.each(blogdata, function(n) {
      if (n.value === true) {
        loginstatus = true;
      }
    });
    if (loginstatus === false) {
      menu.setting = false;
      $.jStorage.deleteKey("user");
    } else {
      if (!MyServices.getuser() && MyServices.getuser() === null) {
        $location.url("/access/login");
        menu.setting = true;
        //		$ionicLoading.hide();
      } else {
        $ionicLoading.hide();
      }
    }
  };

  // MyServices.getallfrontmenu(function(data) {
  //   MyServices.setconfigdata(data);
  //   $scope.setup();
  // }, function(err) {
  //   // $location.url("/access/offline");
  // });

  MyServices.getallsliders(function(data) {
    $scope.slides = data;
    $ionicSlideBoxDelegate.update();
  }, function(err) {
    // $location.url("/access/offline");
  });

})

.controller('AboutCtrl', function($scope) {

})

.controller('TeamCtrl', function($scope) {

})

.controller('OfflineCtrl', function($scope, $ionicLoading) {
  addanalytics("Offline page");
  $ionicLoading.hide();
})

.controller('ProfileCtrl', function($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout, $cordovaFileTransfer, $cordovaImagePicker, $filter) {

  configreload.onallpage();
  $scope.edit = false;
  $scope.user = {};
  $scope.user.newimage = "";
  $scope.password = {};
  //	$scope.user.dob = moment().format("YYYY-MM-DD");

  $scope.changeedit = function(val) {

    if ($.jStorage.get("user") && $.jStorage.get("user").dob)
      $scope.user.dob = new Date($.jStorage.get("user").dob);
    if (!_.isDate($scope.user.dob)) {
      $scope.user.dob = moment($scope.user.dob, "YYYY-MM-DD");
    }
    if (!_.isDate($scope.user.dob)) {
      $scope.user.dob = moment($scope.user.dob);
    }

    $scope.edit = val;
  };

  var showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  showloading();
  MyServices.getUserMob(function(data) {
    $ionicLoading.hide();
    $scope.user = data.data;
    addanalytics(data.name);
    $scope.user.newcoverimage = {
      'background-image': "url('" + $filter("serverimage")($scope.user.coverimage) + "')"
    };
    $scope.user.newimage = {
      'background-image': "url('" + $filter("profileimg")($scope.user.image) + "')"
    };

  }, function(err) {
    // $location.url("/access/offline");
  });
  $scope.showPopup1 = function() {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Your profile is updated!</p>',
      title: 'Thank you!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.saveProfile = function() {
    MyServices.updateProfileMob($scope.user, function(data, status) {
      if (data !== 0) {
        $.jStorage.set("user", data);
        $scope.showPopup1();
        $scope.edit = !$scope.edit;
      }
    }, function(err) {
      // $location.url("/access/offline");
    });
  };

  $scope.passwordpopup = function(msg) {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Forgot Password!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.changePassword = function() {
    $scope.password.id = MyServices.getuser().id;


    $scope.allvalidation = [{
      field: $scope.password.oldpassword,
      validation: ""
    }, {
      field: $scope.password.newpassword,
      validation: ""
    }, {
      field: $scope.password.confirmpassword,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    if (check) {
			if($scope.password.newpassword === $scope.password.confirmpassword){
      MyServices.changePasswordMob($scope.password, function(data) {
        if (data.value === true) {
					$scope.passwordpopup("Password changed successfully");
        } else {
          $scope.passwordpopup("Old password does not match");
        }
        console.log(data);
      }, function(err) {
        // $location.url("/access/offline");
      });
		}else {
			$scope.passwordpopup("Both the passwords does not match");
		}
    } else {
      $ionicLoading.hide();
      $scope.passwordpopup("Please enter all the fields.");
    }
  };

  //	pick image from gallery
  var options = {
    maximumImagesCount: 1,
    width: 800,
    height: 800,
    quality: 80,
    allowEdit: true

  };
  $scope.picFromGallery = function() {
    $cordovaImagePicker.getPictures(options).then(function(resultImage) {
      $scope.user.newimage = {
        'background-image': "url('" + resultImage[0] + "')"
      };
      $cordovaFileTransfer.upload(adminurl + "profileimageupload?id=" + MyServices.getuser().id, resultImage[0], {})
        .then(function(result) {
          var data = JSON.parse(result.response);
          $ionicLoading.hide();
        }, function(err) {}, function(progress) {});

    }, function(err) {
      // An error occured. Show a message to the user
    });
  };

  $scope.picImageForCover = function() {
    $cordovaImagePicker.getPictures(options).then(function(resultImage) {
      $scope.user.newcoverimage = {
        'background-image': "url('" + resultImage[0] + "')"
      };
      $cordovaFileTransfer.upload(adminurl + "coverimageupload?id=" + MyServices.getuser().id, resultImage[0], {})
        .then(function(result) {
          var data = JSON.parse(result.response);
          $ionicLoading.hide();
        }, function(err) {}, function(progress) {
        });
    }, function(err) {
      // An error occured. Show a message to the user
    });

  };
})

.controller('EventsCtrl', function($scope, MyServices, $location, $ionicLoading, $filter) {
  addanalytics("Event page");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.pageno = 1;
  $scope.events = [];
  $scope.keepscrolling = true;
  $scope.msg = "Loading....";
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.share = function(item) {
    var data = {};
    data.startdate = $filter('date')(item.startdate, 'dd MMM, yyyy');
    data.starttime = $filter('convertto12')(item.starttime);
    data.image = $filter('serverimage')(item.image);
    window.plugins.socialsharing.share('Checkout "' + item.title + '" starting on ' + data.startdate + ', ' + data.starttime, null, data.image + 'At ' + item.venue);
  };

  $scope.loadevents = function(pageno) {
    MyServices.getEventAllMob(pageno, function(data) {
      $ionicLoading.hide();
      _.each(data.data.data, function(n) {
        $scope.events.push(n);
      });

      if ($scope.events.length === 0) {
        $scope.msg = "No data found.";
      } else {
        $scope.msg = "";
      }

      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }
    }, function(err) {
      // $location.url("/access/offline");
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadevents(1);

  $scope.loadMorePolls = function() {
    $scope.loadevents(++$scope.pageno);
  };

  $scope.geteventdetails = function(id) {
    $location.url("app/eventdetail/" + id);
  };

})

.controller('EventDetailCtrl', function($scope, $stateParams, MyServices, $ionicLoading, $ionicSlideBoxDelegate, $ionicModal) {
  configreload.onallpage();
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.msg = "Loading...";
  $scope.video = {};
  $scope.image = {};


  var init = function() {
    return $ionicModal.fromTemplateUrl('templates/appView/modal-video.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

    });
  };

  $ionicModal.fromTemplateUrl('templates/appView/modal-image.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;

  });

  $scope.showVideo = function(url) {
    console.log(url);
    init().then(function() {
      $scope.modal.show();
    });
    $scope.video.url = url + "?autoplay=1";
  };
  $scope.showImage = function(url) {
    $scope.modal.show();
    $scope.image.img = url;
  };

  $scope.closeVideo = function() {
    $scope.modal.remove()
      .then(function() {
        $scope.modal = null;
      });
  };
  $scope.closeImage = function() {
    $scope.modal.hide();
  };

  $scope.id = $stateParams.id;
  var getsingleeventscallback = function(data, status) {
    if (data.data === "") {
      $scope.msg = "No data found";
      addanalytics("Event detail page");
    } else {
      $scope.msg = "";
      addanalytics(data.title);
    }
    if (data.eventimages && data.eventimages.length > 0) {
      data.eventimages = _.chunk(data.eventimages, 2);
    }
    if (data.eventvideos && data.eventvideos.length > 0) {
      data.eventvideos = _.chunk(data.eventvideos, 2);
    }
    $scope.eventdetail = data.data;
    $ionicSlideBoxDelegate.update();
  };
  MyServices.getEventOneMob($stateParams.id, getsingleeventscallback, function(err) {
    // $location.url("/access/offline");
  });
})

.controller('BlogsCtrl', function($scope, MyServices, $location, $ionicLoading) {
  configreload.onallpage();
  $scope.blogs = [];
  $ionicLoading.show();
  $scope.pageno = 1;
  $scope.keepscrolling = true;
  $scope.msg = "Loading...";
  // loader

  $scope.getblogdetailscms = function(id) {
    $location.path('/app/blogdetail/' + id);
  };
  showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.blogDetail = function(blog, name) {
    $ionicLoading.show();
    blog.provider = name;
    $.jStorage.set('postdetail', blog);
    if (name == "cms") {
      $location.path('/app/blogdetail/' + blog._id);
    } else {
      $location.path('/app/blogdetail/0');
    }
  };

  $scope.reloadblog = function(page) {
    MyServices.getBlogAllMob(page, function(data, status) {
      //			console.log(data);
      $ionicLoading.hide();
      _.each(data.data.data, function(n) {
        $scope.blogs.push(n);
      });

      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }
      if ($scope.blogs.length !== 0) {
        $scope.msg = "";
      } else {
        $scope.msg = "No data found";
      }
    }, function(err) {
      // $location.url("/access/offline");
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };


  if ($.jStorage.get("blogType") && $.jStorage.get("blogType").name.toLowerCase() == "wordpress") {
    addanalytics("Wordpress blog");
    $scope.showWordpress = true;
    $scope.keepscrolling = false;
    Wordpress_UserName = $.jStorage.get("blogType").appid;
    MyServices.getWordpressPosts($.jStorage.get("blogType").appid, function(data, status) {
      $ionicLoading.hide();
      $scope.blogs = data.posts;
      $scope.msg = "";
    });
  } else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").name.toLowerCase() == "tumblr") {
    addanalytics("Tumblr Blog");
    $scope.showTumblr = true;
    $scope.keepscrolling = false;
    Tumblr_UserName = $.jStorage.get("blogType").appid;
    MyServices.getTumblrPosts($.jStorage.get("blogType").appid, function(data, status) {

      $ionicLoading.hide();
      if (data) {
        $scope.msg = "";
        $scope.blogs = data.response.posts;
      } else {
        $scope.msg = "No blog data or Invalid blog";
      }
    });
  } else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").name.toLowerCase() == "cms") {
    addanalytics("Custom blog");
    $scope.showCustomblog = true;
    $scope.reloadblog(1);
  } else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").name.toLowerCase() == "wordpressself") {
    addanalytics("Wordpress self blog");
    $scope.showWordpressSelf = true;
    $scope.keepscrolling = false;
    Wordpress_UserName = $.jStorage.get("blogType").appid;
    MyServices.getWordpressSelfPosts($.jStorage.get("blogType").appid, function(data, status) {
      $ionicLoading.hide();
      $scope.msg = "";
      console.log(data);
      $scope.blogs = data;
      _.each($scope.blogs, function(n) {
        n.content = n.content.rendered;
      });
    });
  }

  $scope.loadMorePolls = function() {
    $scope.reloadblog(++$scope.pageno);
  };

})

.controller('BlogDetailCtrl', function($scope, MyServices, $ionicLoading, $stateParams, $timeout) {

  configreload.onallpage();
  $ionicLoading.hide();
  $scope.msg = "Loading....";
  var getsingleblogsuccess = function(data, status) {
    console.log(data);
    $ionicLoading.hide();
    $scope.showcmsdetail = true;
    $scope.details = data.data;
    addanalytics(data.data.blogtitle);
    if (data === '') {
      $scope.msg = "No such blog";
    } else {
      $scope.msg = "";
    }
  };

  $scope.id = $stateParams.id;

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.showloading();

  // tumblr and wordpress
  if ($stateParams.id === 0) {
    $scope.msg = "";
    $ionicLoading.hide();
    $scope.details = $.jStorage.get('postdetail');
    addanalytics("tumblr wordpress blog" + $scope.details.album);
    if ($scope.details.provider == 'tumblr') {
      var newdt = $scope.details.date.split('T');
      $scope.details.date = newdt[0];
    }
  } else {
    MyServices.getBlogOneMob($scope.id, getsingleblogsuccess, function(err) {
      // $location.url("/access/offline");
    });
  }
})

.controller('PhotoGalleryCategoryCtrl', function($scope, MyServices, $location, $ionicLoading) {
  addanalytics("Photo gallery");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.msg = "Loading....";
  $scope.pageno = 1;
  $scope.photos = [];
  $scope.keepscrolling = true;
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.sendphotoid = function(id) {
    $location.url("app/photogallery/" + id);
  };

  $scope.loadgallery = function(pageno) {
    MyServices.getPhotoAllMob(pageno, function(data, status) {
      $ionicLoading.hide();

      _.each(data.data.data, function(n) {
        $scope.photos.push(n);
      });

      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }

      if ($scope.photos.length === 0) {
        $scope.msg = "The gallery is empty.";
      } else {
        $scope.msg = "";
      }
    }, function(err) {
      // $location.url("/access/offline");
    });

    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadgallery(1);

  $scope.loadMorePolls = function() {
    $scope.loadgallery(++$scope.pageno);
  };

})

.controller('PhotoGalleryCtrl', function($scope, MyServices, $stateParams, $ionicLoading, $timeout, $location) {
  addanalytics("Photo gallery Details");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.msg = "Loading....";
  $scope.keepscrolling = true;
  $scope.photos = [];
  $scope.pageno = 1;
  // loader

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.showloading();

  $scope.photoid = $stateParams.id;

  $scope.loadphoto = function(pageno) {
    MyServices.getPhotoOneMob($stateParams.id, pageno, function(data, status) {
      $ionicLoading.hide();
      _.each(data.data.data, function(n) {
        $scope.photoObj = {};
        $scope.photoObj.src = adminimage + n.image;
        $scope.photos.push($scope.photoObj);
      });
      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }

      if ($scope.photos.length === 0) {
        $scope.msg = "The gallery is empty.";
      } else {
        $scope.msg = "";
      }
    }, function(err) {
      // $location.url("/access/offline");
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadphoto(1);

  $scope.loadMorePolls = function() {
    $scope.loadphoto(++$scope.pageno);
  };

})

.controller('VideoGalleryCategoryCtrl', function($scope, MyServices, $ionicLoading) {
  addanalytics("Video Gallery Page");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.videos = [];
  $scope.keepscrolling = true;
  $scope.pageno = 1;
  $scope.msg = "Loading....";
  // loader
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.loadphoto = function(pageno) {
    MyServices.getAllMob(pageno, function(data, status) {
      $ionicLoading.hide();

      _.each(data.data.data, function(n) {
        $scope.videos.push(n);
      });

      if (data.data.data === '') {
        $scope.keepscrolling = false;
      }

      if ($scope.videos.length === 0) {
        $scope.msg = "The gallery is empty.";
      } else {
        $scope.msg = "";
      }

    }, function(err) {
      // $location.url("/access/offline");
    }, function(err) {
      console.log(err);
    });

    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadphoto(1);

  $scope.loadMorePolls = function() {
    $scope.loadphoto(++$scope.pageno);
  };
})

.controller('VideoGalleryCtrl', function($scope, MyServices, $location, $ionicModal, $stateParams, $ionicLoading, $ionicPopup, $timeout, $ionicPlatform, $filter) {
  addanalytics("Video gallery detail page");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.pageno = 1;
  $scope.videos = [];
  $scope.keepscrolling = true;
  $scope.msg = "Loading....";

  $scope.share = function(item) {
    console.log(item);
    window.plugins.socialsharing.share(item.alt, null, 'http://img.youtube.com/vi/' + item.url + '/default.jpg', 'https://www.youtube.com/watch?v=' + item.url);
  };

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.showloading();
  $scope.videoid = $stateParams.id;

  $scope.loadphoto = function(pageno) {
    MyServices.getOneMob($scope.videoid, pageno, function(data, status) {
      $ionicLoading.hide();
      _.each(data.data.data, function(n) {
        $scope.videos.push(n);
      });


      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }

      if ($scope.videos.length === 0) {
        $scope.msg = "The gallery is empty.";
      } else {
        $scope.msg = "";
      }
    }, function(err) {
      // $location.url("/access/offline");
    });

    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };


  $scope.loadphoto(1);

  // $scope.loadMorePolls = function () {
  // 	$scope.loadphoto(++$scope.pageno);
  // }



  var init = function() {
    return $ionicModal.fromTemplateUrl('templates/appView/modal-video.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

    });
  };


  $scope.showVideo = function(url) {
    init().then(function() {
      $scope.modal.show();
    });
    $scope.video = [];
    $scope.video.url = $filter("extractVideoId")(url) + "?autoplay=1";
  };

  $scope.closeVideo = function() {
    $scope.modal.remove()
      .then(function() {
        $scope.modal = null;
      });
  };

  document.addEventListener('backbutton', function(event) {
    console.log("on back button");
    event.preventDefault(); // EDIT
    $scope.closeVideo();
    //		navigator.app.exitApp(); // exit the app
  });


  $ionicPlatform.onHardwareBackButton(function() {
    console.log("hardwarebutton");
    //		alert("back back");
    $scope.closeVideo();
    //		console.log("Back Button");
  });

  $scope.$on('modal.remove', function() {
    // Execute action
    console.log("on removed");
    $scope.currentURL = {};
  });

})

.controller('AccountCtrl', function($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout) {
  addanalytics("Account page");
	console.log("fasdfasd&&&&&&&&&&&&&&&");
  configreload.onallpage();
  if ($.jStorage.get("user")) {
    $scope.userdetails = {};
    $scope.userdetails.username = $.jStorage.get("user").name;
    if ($scope.userdetails.username === "") {
      $scope.userdetails.username = $.jStorage.get("user").name;
    }
    $scope.userdetails.userimage = $.jStorage.get("user").image;
    $scope.userdetails.useremail = $.jStorage.get("user").email;
  }

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.profile = {};
  $scope.showPopup1 = function() {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Your profile is created!</p>',
      title: 'Thank you!',
      scope: $scope,
    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  var profilesubmitcallback = function(data, status) {
    $ionicLoading.hide();
    if (data == 1) {
      $scope.showPopup1();
      $scope.profile = {};
    }
  };

  $scope.profilesubmit = function(profile) {
    $ionicLoading.show();
    MyServices.profilesubmit(profile, profilesubmitcallback, function(err) {
      // $location.url("/access/offline");
    });
  };
})

.controller('SettingCtrl', function($scope, MyServices, $ionicLoading, $timeout, $location) {
  addanalytics("Setting page");
  configreload.onallpage();
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive"></ion-spinner>'
  });
  $timeout(function() {
    $ionicLoading.hide();
  }, 5000);
  $scope.setting = {};
  MyServices.getUserMob(function(data) {
    $ionicLoading.hide();
    $scope.user = data.data;
    $scope.setting.videonotification = $scope.user.videonotification;
    $scope.setting.eventnotification = $scope.user.eventnotification;
    $scope.setting.blognotification = $scope.user.blognotification;
    $scope.setting.photonotification = $scope.user.photonotification;
    $scope.id = $scope.user.id;
  }, function(err) {
    // $location.url("/access/offline");
  });

  $scope.changeSetting = function(setting) {
    setting.id = $scope.user.id;
    MyServices.changesetting(setting, function(data) {
      console.log(data);
    }, function(err) {
      // $location.url("/access/offline");
    });
  };

})

.controller('SocialCtrl', function($scope, MyServices) {
  addanalytics("Social page");
  configreload.onallpage();
  $scope.tab = 'fb';
  $scope.social = {};
  $scope.showsocial = {};

  $scope.go = function() {
    console.log("demo demo");
  };

  console.log(MyServices.getconfigdata());
  $scope.config = MyServices.getconfigdata().config;
  if ($scope.config[6]) {
    $scope.social = JSON.parse($scope.config[6].text);
    $scope.social = _.filter($scope.social, function(n) {
      return n.value !== ""
    });
  }
  $scope.social = _.chunk($scope.social, 2);
  console.log($scope.social);

  $scope.goSocial = function(link) {
    console.log(link);
    console.log("dfasdf");
    if (typeof cordova != 'undefined') {
      cordova.InAppBrowser.open(link, '_blank', 'location=yes');
    } else {
      window.open(link, "_blank");
    }
  };

})

.controller('NotificationCtrl', function($scope, MyServices, $ionicLoading, $filter, $location) {
  addanalytics("Notification page");
  configreload.onallpage();
  $scope.notification = {};
  $scope.notify = [];
  $scope.pageno = 1;
  $scope.user = MyServices.getuser();
  $scope.msg = "Loading...";

  $scope.share = function(item) {
    console.log(item);
    item.image = $filter('serverimage')(item.image);
    if (item.linktype == 17) {
      item.link = item.link;
    } else {
      item.link = null;
    }
    window.plugins.socialsharing.share(item.content, null, item.image, item.link);
  };

  //	console.log(
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.loadnotification = function(pageno) {
    console.log($scope.notification);
    MyServices.getNotificationMob(pageno, function(data) {
      _.each(data.data.data, function(n) {
        switch (n.linktype) {
          case '3':
            n.tolink = n.event;
            break;
          case '6':
            n.tolink = n.gallery;
            break;
          case '8':
            n.tolink = n.video;
            break;
          case '10':
            n.tolink = n.blog;
            break;
          case '2':
            n.tolink = n.article;
            break;
          case '17':
            n.tolink = n.article;
            break;
          default:
            n.tolink = 0;

        }
        n.tolinkpath = n.linktypelink;

        $scope.notify.push(n);
      });

      if ($scope.notify.length === 0) {
        $scope.msg = "No notifications.";
      } else {
        $scope.msg = "";
      }
      $ionicLoading.hide();
    }, function(err) {
      // $location.url("/access/offline");
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadnotification(1);

  $scope.loadMoreNotification = function() {
    $scope.loadnotification(++$scope.pageno);
  };

  $scope.notifyclick = function(item) {
    if (item.linktype == 17) {
      window.open(item.link, '_blank', 'location=no');
    } else {
      $location.url("/app/" + item.tolinkpath + "/" + item.tolink);
    }
  };

})

.controller('ContactCtrl', function($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout, $compile, $ionicModal, vcRecaptchaService) {
  addanalytics("Contact page");
  configreload.onallpage();
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.showloading();
  $scope.enquiry = {};
  var msgforall = function(msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Contact Us',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  };
  var createenquirycallback = function(data, status) {
    $ionicLoading.hide();
    if (data.value === true) {
      $scope.showPopupcontact();
      $scope.enquiry = {};
    } else {
      $scope.showPopupcontactfailure();
    }
  };

  $scope.showPopupcontact = function() {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Successfully submitted!</p>',
      title: 'Thank you!',
      scope: $scope,
    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };
  $scope.showPopupcontactfailure = function() {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Try again!</p>',
      title: 'Sorry!',
      scope: $scope,
    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.enquiryform = function(enquiry) {
    $scope.allvalidation = [{
      field: $scope.enquiry.name,
      validation: ""
    }, {
      field: $scope.enquiry.email,
      validation: ""
    }, {
      field: $scope.enquiry.title,
      validation: ""
    }, {
      field: $scope.enquiry.content,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.submitEnquiry(enquiry, createenquirycallback, function(err) {
        // $location.url("/access/offline");
      });
    } else {
      msgforall('Fill all data');
      $ionicLoading.hide();
    }

  };

  //        ***** tabchange ****
	// $scope.mapframe = "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7543.043871128432!2d72.8626547!3d19.04077635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf2cc4000001%3A0xc683a42662527334!2sSadhana+English+Primary+School!5e0!3m2!1sen!2sin!4v1443430462486' width='600' height='450' frameborder='0' style='border:0' allowfullscreen></iframe>";



  $scope.tab = 'contactus';
  $scope.classa = 'active';
  $scope.classb = '';

	$ionicModal.fromTemplateUrl('templates/appView/modal-map.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

	$scope.showMap = function(lat, long){
		$scope.mapframe = "<iframe width='600' height='450' frameborder='0' scrolling='yes' marginheight='0' marginwidth='0' src='https://maps.google.com/maps?q="+lat+","+long+"&hl=es;z=14&amp;output=embed' allowfullscreen></iframe>";
		console.log($scope.mapframe);
		$scope.modal.show();
	};

	$scope.closeMap = function(){
		$scope.modal.hide();
	};

  MyServices.getContactAllMob(function(data, status) {
    console.log();
		$scope.contacts = data.data;
  }, function(err) {
    // $location.url("/access/offline");
  });

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


  $scope.response = null;
  $scope.widgetId = null;

  $scope.model = {
      key: '6LfUix0TAAAAAJoY6U1m13_4reMUI2g4x2cVLUEu'
  };

  $scope.setResponse = function (response) {
      console.info('Response available');

      $scope.response = response;
  };

  $scope.setWidgetId = function (widgetId) {
      console.info('Created widget ID: %s', widgetId);

      $scope.widgetId = widgetId;
  };

  $scope.cbExpiration = function() {
      console.info('Captcha expired. Resetting response object');

      vcRecaptchaService.reload($scope.widgetId);

      $scope.response = null;
   };

  $scope.submit = function () {
      var valid;

      /**
       * SERVER SIDE VALIDATION
       *
       * You need to implement your server side validation here.
       * Send the reCaptcha response to the server and use some of the server side APIs to validate it
       * See https://developers.google.com/recaptcha/docs/verify
       */
      console.log('sending the captcha response to the server', $scope.response);

      if (valid) {
          console.log('Success');
      } else {
          console.log('Failed validation');

          // In case of a failed validation you need to reload the captcha
          // because each response can be checked just once
          vcRecaptchaService.reload($scope.widgetId);
      }
  };

})

.controller('SearchCtrl', function($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout) {
  addanalytics("Search page");
  // loader
  $scope.search = {};
  $scope.search.text = "";
  configreload.onallpage();

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.searchresults = [];

  var searchelementcallback = function(data, status) {
    console.log(data);
    $scope.searchresults.searchevent = data.data.event;
    $scope.searchresults.searchgallery = data.data.photo;
    $scope.searchresults.searchvideogallery = data.data.video;
    $scope.searchresults.blog = data.data.blog;
    $scope.searchresults.article = data.data.article;
    $scope.searchresults.notification = data.data.notification;
    $scope.searchresults.contacts = data.data.contact;
  };
  $scope.getsearchelement = function(searchelement) {
    $timeout(function() {
      MyServices.searchAll(searchelement, searchelementcallback, function(err) {
        // $location.url("/access/offline");
      });
    }, 2000);

  };

  // Go to Events page
  $scope.openevents = function(id) {
    $location.url("/app/eventdetail/" + id);
  };
  $scope.openvideogallery = function(id) {
    $location.url("/app/videogallery/" + id);
  };
  $scope.opengallery = function(id) {
    $location.url("/app/photogallery/" + id);
  };
  $scope.openblog = function(id) {
    console.log(id);
    $location.url("/app/blogdetail/" + id);
  };
  $scope.openarticle = function(id) {
    $location.url("/app/article/" + id);
  };
  $scope.clear = function() {
    $scope.search.text = "";
    $scope.searchresults = [];
  };

});
