var reloadpage = false;
angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices, $location) {

  $scope.menudata = {};
  MyServices.getappconfig(function(data, status) {
    //        console.log(data);
    //for blogs
    var blogdata = JSON.parse(data[1].text);
    for (var i = 0; i < blogdata.length; i++) {
      console.log(blogdata[i]);
      if (blogdata[i].value == true) {
        $scope.menudata.blogs = true;
        $.jStorage.set("blogType", blogdata[i].name);
        break;
      } else {
        $scope.menudata.blogs = false;
      }
    }

    //        _.each(JSON.parse(data[1].text), function (n) {
    //            console.log(n);
    //            if (n.value == true) {
    //                $scope.menudata.blogs = true;
    //                $.jStorage.set("blogType", n.name);
    //            } else {
    //                $scope.menudata.blogs = false;
    //            }
    //        })

    //for gallery
    if (data[2].text == "Drop down yes") {
      $scope.menudata.gallery = true;
    } else {
      $scope.menudata.gallery = false;
    }
    //for video gallery
    if (data[3].text == "Drop down yes") {
      $scope.menudata.videogallery = true;
    } else {
      $scope.menudata.videogallery = false;
    }
    //for events
    if (data[4].text == "Drop down yes") {
      $scope.menudata.events = true;
    } else {
      $scope.menudata.events = false;
    }
    //for banner
    if (data[5].text == "Drop down yes") {
      $scope.menudata.banner = true;
    } else {
      $scope.menudata.banner = false;
    }
  })

  var logoutsuccess = function(data, success) {
    console.log(data);
    if (data == 'true') {
      $.jStorage.flush();
      reloadpage = true;
      $location.path("/access/login");
    }
  }
  $scope.logout = function() {
    MyServices.logout().success(logoutsuccess);
  }

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
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  if ($.jStorage.get("user")) {
    $scope.userdetails = {};
    $scope.userdetails.username = $.jStorage.get("user").username;
    if ($scope.userdetails.username == "") {
      $scope.userdetails.username = $.jStorage.get("user").name;
    }
    $scope.userdetails.userimage = $.jStorage.get("user").image;
    $scope.userdetails.useremail = $.jStorage.get("user").email;
  }
})

.controller('AccessCtrl', function($scope) {

})

.controller('LoginCtrl', function($scope, MyServices, $ionicPopup, $interval, $location, $window) {



  $.jStorage.flush();

  $scope.logindata = {};

  MyServices.getappconfig(function(data, status) {
    console.log(data);
    _.each(JSON.parse(data[0].text), function(n) {
      console.log(n);
      if (n.name.toLowerCase() == "email") {
        $scope.logindata.email = true;
      } else if (n.name.toLowerCase() == "google") {
        $scope.logindata.google = true;
      } else if (n.name.toLowerCase() == "twitter") {
        $scope.logindata.twitter = true;
      } else if (n.name.toLowerCase() == "instagram") {
        $scope.logindata.instagram = true;
      } else if (n.name.toLowerCase() == "facebook") {
        $scope.logindata.facebook = true;
      }
    })
  })

  //logins
  var checktwitter = function(data, status) {
    if (data != "false") {
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
    console.log(data);
    if (data != "false") {
      $.jStorage.set("user", data);
      user = data;
      $location.url("/app/home");
    }
  };
  $scope.facebooklogin = function() {
    ref = window.open(adminhauth + 'login/Facebook?returnurl=http://www.wohlig.com', '_blank', 'location=no');
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate().success(authenticatesuccess);
      $interval.cancel(stopinterval);
    });
  }
  $scope.twitterlogin = function() {
    console.log("in twitter");

    ref = window.open(adminhauth + 'login/Twitter', '_blank', 'location=no');
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate().success(authenticatesuccess);
      $interval.cancel(stopinterval);
    });
  }

  $scope.instagramlogin = function() {
    ref = window.open(adminhauth + 'login/Instagram?returnurl=http://www.wohlig.com', '_blank', 'location=no');
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate().success(authenticatesuccess);
      $interval.cancel(stopinterval);
    });
    //        $location.url("/tab/dash");
  }

  $scope.googlelogin = function() {

    ref = window.open(adminhauth + 'login/Google?returnurl=http://www.wohlig.com', '_blank', 'location=no');
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate().success(authenticatesuccess);
      $interval.cancel(stopinterval);
    });
  }

  //SIGN UP FORMn
  $scope.signup = {};
  var signupsuccess = function(data, status) {
    console.log(data);
    $scope.signup = {};
  }
  $scope.signupsubmit = function(signup) {
    $scope.signup = signup;
    MyServices.signup($scope.signup, signupsuccess);
  }

  // SIGN IN
  $scope.signin = {};
  var signinsuccess = function(data, status) {
    console.log(data);
    if (data != 'false') {
      MyServices.authenticate().success(authenticatesuccess);
      $scope.signin = {};
    } else {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed!',
        template: 'Wrong username or password!!'
      });
    }
  }
  $scope.signinsubmit = function(signin) {
    MyServices.signin(signin, signinsuccess);
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

.controller('SignupCtrl', function($scope) {})

.controller('HomeCtrl', function($scope, MyServices, $ionicSlideBoxDelegate) {

  //        $scope.slides = ["http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png", "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png", "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png"];

  MyServices.getallsliders(function(data, status) {
    $scope.slides = data.queryresult;
    $ionicSlideBoxDelegate.update();
  })

})

.controller('ContentPageCtrl', function($scope) {

})

.controller('EventsCtrl', function($scope, MyServices) {

  //    $scope.events = [{
  //        image: "img/event/1.jpg",
  //        title: "Sona Mohaptra",
  //        date: "7 Jan, 2016",
  //        subtitle: "Live at Tiwnhoase cafe",
  //        time: "8 PM , Onwards"
  //    }, {
  //        image: "img/event/2.jpg",
  //        title: "Sonu nigam",
  //        date: "8 Jan, 2016",
  //        subtitle: "Live at Townhouse cafe",
  //        time: "9 PM , Onwards"
  //    }, {
  //        image: "img/event/3.jpg",
  //        title: "Music Concert",
  //        date: "9 Jan, 2016",
  //        subtitle: "Live at Fort cafe",
  //        time: "9 PM , Onwards"
  //    }, {
  //        image: "img/event/4.jpg",
  //        title: "Arjit singh",
  //        date: "10 Jan, 2016",
  //        subtitle: "Live at Macdee cafe",
  //        time: "12 PM , Onwards"
  //    }, {
  //        image: "img/event/5.jpg",
  //        title: "sohan honakeri",
  //        date: "11 Jan, 2016",
  //        subtitle: "Live at Townhall cafe",
  //        time: "10 PM , Onwards"
  //    }, {
  //        image: "img/event/6.jpg",
  //        title: "chintan shah",
  //        date: "12 Jan, 2016",
  //        subtitle: "Live at Town cafe",
  //        time: "11 PM , Onwards"
  //    }];

  MyServices.getallevents(function(data, status) {
    $scope.events = data.queryresult;
  })
})

.controller('EventDetailCtrl', function($scope) {

})

.controller('ServiceCtrl', function($scope) {

})

.controller('BlogsCtrl', function($scope, MyServices,$location) {

  $scope.blogDetail = function() {
    $location.path('/app/blogdetail');
  }

  if ($.jStorage.get("blogType") && $.jStorage.get("blogType").toLowerCase() == "wordpress") {
    MyServices.getWordpressPosts(function(data, status) {
      console.log("my post");
      console.log(data);
      $scope.blogs = data.posts;
    });
  }
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

.controller('PhotoGalleryCtrl', function($scope, MyServices) {
  //    $scope.photos = [{
  //        image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
  //        title: "Music Concert",
  //        date: "7 Jan, 2016",
  //        subtitle: "Film, Media & Entertainment by paragyte technologies"
  //    }, {
  //        image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
  //        title: "Music Concert",
  //        date: "7 Jan, 2016",
  //        subtitle: "Film, Media & Entertainment by paragyte technologies"
  //    }, {
  //        image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
  //        title: "Music Concert",
  //        date: "7 Jan, 2016",
  //        subtitle: "Film, Media & Entertainment by paragyte technologies"
  //    }, {
  //        image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
  //        title: "Music Concert",
  //        date: "7 Jan, 2016",
  //        subtitle: "Film, Media & Entertainment by paragyte technologies"
  //    }, {
  //        image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
  //        title: "Music Concert",
  //        date: "7 Jan, 2016",
  //        subtitle: "Film, Media & Entertainment by paragyte technologies"
  //    }, {
  //        image: "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png",
  //        title: "Music Concert",
  //        date: "7 Jan, 2016",
  //        subtitle: "Film, Media & Entertainment by paragyte technologies"
  //    }];

  MyServices.getallgallery(function(data, status) {
    $scope.photos = data.queryresult;
    $scope.photos = _.chunk($scope.photos, 2);
    console.log($scope.photos);
  })
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
