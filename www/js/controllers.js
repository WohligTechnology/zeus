var reloadpage = false;
angular.module('starter.controllers', ['starter.services', 'ion-gallery'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, MyServices, $ionicLoading, $location) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.menudata = {};

    // loader
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };

    MyServices.getappconfig(function (data, status) {
        //for blog s
        var blogdata = JSON.parse(data[1].text);
        for (var i = 0; i < blogdata.length; i++) {
            if (blogdata[i].value == true) {
                $scope.menudata.blogs = true;
                $.jStorage.set("blogType", blogdata[i].name);
                break;
            } else {
                $scope.menudata.blogs = false;
            }
        }

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
        console.log($scope.menudata);
    })

    var logoutsuccess = function (data, success) {
        console.log(data);
        if (data == 'true') {
            $.jStorage.flush();
            reloadpage = true;
            $ionicLoading.hide();
            $location.path("/access/login");
        }
    }
    $scope.logout = function () {
        $ionicLoading.show();
        MyServices.logout().success(logoutsuccess);
    }

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/accessView/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
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

.controller('AccessCtrl', function ($scope) {

})

.controller('LoginCtrl', function ($scope, MyServices, $ionicPopup, $interval, $location, $window, $ionicLoading, $timeout) {

    $.jStorage.flush();

    $scope.logindata = {};

    MyServices.getappconfig(function (data, status) {
        console.log(data);
        _.each(JSON.parse(data[0].text), function (n) {
            if (n.name.toLowerCase() == "email" && n.value == true) {
                $scope.logindata.email = true;
            } else if (n.name.toLowerCase() == "google" && n.value == true) {
                $scope.logindata.google = true;
            } else if (n.name.toLowerCase() == "twitter" && n.value == true) {
                $scope.logindata.twitter = true;
            } else if (n.name.toLowerCase() == "instagram" && n.value == true) {
                $scope.logindata.instagram = true;
            } else if (n.name.toLowerCase() == "facebook" && n.value == true) {
                $scope.logindata.facebook = true;
            }
        })
        console.log($scope.logindata);
    })

    // loader

    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };

    //logins
    var checktwitter = function (data, status) {
        if (data != "false") {
            $interval.cancel(stopinterval);
            ref.close();
            MyServices.authenticate().success(authenticatesuccess);
        } else {

        }
    };

    var callAtIntervaltwitter = function () {
        MyServices.authenticate().success(checktwitter);
    };
    var authenticatesuccess = function (data, status) {
        $ionicLoading.hide();
        console.log(data);
        if (data != "false") {
            $.jStorage.set("user", data);
            user = data;
            reloadpage = true;
            $location.url("/app/home");
        }
    };
    $scope.facebooklogin = function () {
        ref = window.open(adminhauth + 'login/Facebook?returnurl=http://www.wohlig.com', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function (event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
    }
    $scope.twitterlogin = function () {
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
        // popup
    $scope.showPopupsignupsuccess = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Successfully Registered!!</p>',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $scope.showPopupsignupfailure = function () {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Sorry Try Again!!</p>',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    //SIGN UP FORM
    $scope.signup = {};
    var signupsuccess = function (data, status) {
        console.log(data);
        if (data == "1") {
            $scope.showPopupsignupsuccess();
        } else {
            $scope.showPopupsignupfailure();
        }
        $ionicLoading.hide();
        $scope.signup = {};
    }
    $scope.signupsubmit = function (signup) {
        $ionicLoading.show();
        $scope.signup = signup;
        MyServices.signup($scope.signup, signupsuccess);
    }

    // SIGN IN
    $scope.signin = {};
    var signinsuccess = function (data, status) {
        console.log(data);
	    $ionicLoading.hide();
        if (data != 'false') {
		   
            $.jStorage.set("user", data);
            user = data;
//            reloadpage = true;
            $location.url("/app/home");
//            MyServices.authenticate().success(authenticatesuccess);
            $scope.signin = {};
        } else {
            
            var alertPopup = $ionicPopup.alert({
                title: 'Login Failed!',
                template: 'Wrong username or password!!'
            });
        }
    }
    $scope.signinsubmit = function (signin) {
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
            MyServices.signin(signin, signinsuccess);
        }else{
		   $ionicLoading.hide();
	   }
        
    }

    //        ***** tabchange ****

    $scope.tab = 'signin';
    $scope.classa = 'active';
    $scope.classb = '';

    $scope.tabchange = function (tab, a) {

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

.controller('ResetPasswordCtrl', function ($scope) {

    // loader
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };

    $scope.showPopup2 = function () {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your Password is Changed!!</p>',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.showPopup3 = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your New Password and Confirm Password do not Match!!</p>',
            title: 'Sorry!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.showPopup4 = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Something went wrong!!</p>',
            title: 'Oops Try Again!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.password = {};
    var changepasswordcallback = function (data, status) {
        console.log(data);
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

    $scope.changepassword = function (password) {
        $ionicLoading.show();
        MyServices.changepassword(password, changepasswordcallback)
    }

})

.controller('ForgotPasswordCtrl', function ($scope) {
    // loader
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    var forgotpasswordcallback = function (data, status) {
        console.log(data);
        $ionicLoading.hide();
    }
    $scope.forgotpassword = function (email) {
        $ionicLoading.show();
        MyServices.forgotpassword(email, forgotpasswordcallback)

    }
})

.controller('SignupCtrl', function ($scope) {

})

.controller('HomeCtrl', function ($scope, $location, $window) {

    if (!$.jStorage.get("user"))
        $location.url("/access/login");

    if (reloadpage == true) {
        reloadpage = false;
        window.location.reload();
    }

    $scope.slides = ["img/image1.jpg", "img/image2.jpg", "img/image3.jpg"];
})

.controller('AboutCtrl', function ($scope) {

})

.controller('TeamCtrl', function ($scope) {

})

.controller('OfflineCtrl', function ($scope) {

})

.controller('ProfileCtrl', function ($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout) {

    $scope.edit = false;
    $scope.user = {};
    $scope.user.id = $.jStorage.get("user").id;
    $scope.user.name = $.jStorage.get("user").name;
    $scope.user.email = $.jStorage.get("user").email;
    $scope.user.contact = $.jStorage.get("user").contact;
    $scope.user.location = $.jStorage.get("user").address;
    if ($.jStorage.get("user") && $.jStorage.get("user").dob)
        $scope.user.dob = new Date($.jStorage.get("user").dob);

    $scope.showPopup1 = function () {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your Profile is Updated!!</p>',
            title: 'Thankyou!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.saveProfile = function () {
        MyServices.editprofile($scope.user, function (data, status) {
            console.log(data);
            if (data != 0) {
                $.jStorage.set("user", data);
                $scope.showPopup1();
                $scope.edit = !$scope.edit
            }
        })
    }
})

.controller('EventsCtrl', function ($scope, MyServices, $location, $ionicLoading) {

    $ionicLoading.show();
    // loader

    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };

    MyServices.getallevents(function (data, status) {
        $ionicLoading.hide();
        $scope.events = data.queryresult;
        console.log($scope.events);
    })
    $scope.geteventdetails = function (id) {
        $location.url("app/eventdetail/" + id);
    }

})

.controller('EventDetailCtrl', function ($scope, $stateParams, MyServices, $ionicLoading, $ionicSlideBoxDelegate) {
    // loader
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };

    $scope.id = $stateParams.id;
    var getsingleeventscallback = function (data, status) {
        if (data.eventimages && data.eventimages.length > 0) {
            data.eventimages = _.chunk(data.eventimages, 2);
        }
        if (data.eventvideos && data.eventvideos.length > 0) {
            data.eventvideos = _.chunk(data.eventvideos, 2);
        }
        $scope.eventdetail = data;
        console.log($scope.eventdetail);
        $ionicSlideBoxDelegate.update();
    }
    MyServices.getsingleevents($stateParams.id, getsingleeventscallback)
})

.controller('BlogsCtrl', function ($scope, MyServices, $location, $ionicLoading) {
    $scope.events = [{
        image: "img/image1.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image2.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image3.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image4.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image5.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image6.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }];

    $scope.blogs = [];
    $ionicLoading.show();
    // loader

    $scope.getblogdetailscms = function (id) {
        $location.path('/app/blogdetail/' + id);
    }
    showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    //    $scope.showWordpress = true;

    $scope.blogDetail = function (blog, name) {
        console.log(name)
        $ionicLoading.show();
        blog.provider = name;
        $.jStorage.set('postdetail', blog);
        $location.path('/app/blogdetail/0');
    }


    if ($.jStorage.get("blogType") && $.jStorage.get("blogType").toLowerCase() == "wordpress") {
        $scope.showWordpress = true;
        MyServices.getWordpressPosts(function (data, status) {
            $ionicLoading.hide();
            console.log("WORDPRESS");
            console.log(data);
            $scope.blogs = data.posts;
        });
    } else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").toLowerCase() == "tumblr") {
        $scope.showWordpress = false;
        MyServices.getTumblrPosts(function (data, status) {
            $ionicLoading.hide();
            console.log("TUMBLR");
            console.log(data);
            $scope.blogs = data.response.posts;
        });
    } else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").toLowerCase() == "cms") {
        $scope.showCustomblog = true;
        MyServices.getallblog(function (data, status) {
            $ionicLoading.hide();
            console.log("CMS");
            console.log(data.queryresult);
            $scope.blogs = data.queryresult;
        });
    }

})

.controller('BlogDetailCtrl', function ($scope, MyServices, $ionicLoading, $stateParams) {
    $ionicLoading.hide();
    var getsingleblogsuccess = function (data, status) {
        $scope.showcmsdetail = true;
        console.log(data);
        $scope.cmsdetails = data;
    }

    $scope.id = $stateParams.id;
    MyServices.getsingleblog($scope.id, getsingleblogsuccess)

    //loader
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };

    // tumblr and wordpress
    if ($stateParams.id == 0) {
        $scope.details = $.jStorage.get('postdetail');
        if ($scope.details.provider == 'tumblr') {
            var newdt = $scope.details.date.split('T');
            $scope.details.date = newdt[0];
        }
        console.log($scope.details);
    }
})

.controller('PhotoGalleryCategoryCtrl', function ($scope, MyServices, $location, $ionicLoading) {

    $ionicLoading.show();
    // loader
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };

    $scope.sendphotoid = function (id) {
        $location.url("app/photogallery/" + id);
    }

    var getallgallerycallback = function (data, status) {
        $ionicLoading.hide();
        console.log(data.queryresult);
        $scope.photos = data.queryresult;
    }
    MyServices.getallgallery(getallgallerycallback);

})

.controller('PhotoGalleryCtrl', function ($scope, MyServices, $stateParams, $ionicLoading) {

    $ionicLoading.show();
    // loader

    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };

    $scope.photoid = $stateParams.id;

    var getallgalleryimagecallback = function (data, status) {
        $ionicLoading.hide();
        $scope.photos = [];
        _.each(data.queryresult, function (n) {
            $scope.photoObj = {};
            $scope.photoObj.src = adminimage + n.image;
            $scope.photos.push($scope.photoObj);
        })
        console.log($scope.photos);
    }
    MyServices.getallgalleryimage($scope.photoid, getallgalleryimagecallback);

    $scope.items = [{

        "src": 'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
  }, {
        gallery: "1",
        id: "1",
        image: "download_(2)4.jpg",
        order: "1",
        status: "1",
        "src": 'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
  }, {
        gallery: "1",
        id: "1",
        image: "download_(2)4.jpg",
        order: "1",
        status: "1",
        "src": 'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
  }]

})

.controller('VideoGalleryCategoryCtrl', function ($scope, MyServices, $ionicLoading) {

    $ionicLoading.show();
    // loader
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.videos = {};
    var getallvideogallerycallback = function (data, status) {
        $ionicLoading.hide();
        console.log(data.queryresult);
        $scope.videos = data.queryresult;
    }
    MyServices.getallvideogallery(getallvideogallerycallback);

    $scope.events = [{
        image: "img/image1.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image2.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image3.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image4.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image5.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image6.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }];


})

.controller('VideoGalleryCtrl', function ($scope, MyServices, $location, $ionicModal, $stateParams, $ionicLoading, $ionicPopup, $timeout) {

    $ionicLoading.show();
    // loader
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.videoid = $stateParams.id;
    console.log($scope.videoid);
    var getallvideogalleryvideocallback = function (data, status) {
        $ionicLoading.hide();
        console.log(data.queryresult);
        $scope.videos = data.queryresult;
    }
    MyServices.getallvideogalleryvideo($scope.videoid, getallvideogalleryvideocallback);

    $scope.items = [{
        url: "l6JjuhIiXmM",
        name: "MOST PREGNANCY EVER - Kya Kehna Review",
        date: "21 Aug 2015",
        alt: "We had the chance to watch the scientifically inconsistent but somewhat progressive Kya Kehna, a movie that charts extremely high on the middle class discomfort index. It always gets uncomfortable."
  }, {
        url: "l6JjuhIiXmM",
        name: "MOST PREGNANCY EVER - Kya Kehna Review",
        date: "21 Aug 2015",
        alt: "We had the chance to watch the scientifically inconsistent but somewhat progressive Kya Kehna, a movie that charts extremely high on the middle class discomfort index. It always gets uncomfortable."
  }];

    $ionicModal.fromTemplateUrl('templates/appView/modal-video.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.showVideo = function (url) {
        $scope.modal.show();
        $scope.video = [];
        $scope.video.url = url;
    };

    $scope.closeVideo = function () {
        $scope.modal.remove();
    };

})

.controller('AccountCtrl', function ($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout) {

    if ($.jStorage.get("user")) {
        $scope.userdetails = {};
        $scope.userdetails.username = $.jStorage.get("user").username;
        if ($scope.userdetails.username == "") {
            $scope.userdetails.username = $.jStorage.get("user").name;
        }
        $scope.userdetails.userimage = $.jStorage.get("user").image;
        $scope.userdetails.useremail = $.jStorage.get("user").email;
    }

    // loader
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.profile = {};
    $scope.showPopup1 = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your Profile is Created!!</p>',
            title: 'Thankyou!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    var profilesubmitcallback = function (data, status) {
        $ionicLoading.hide();
        console.log(data);
        if (data == 1) {
            $scope.showPopup1();
            $scope.profile = {};
        }
    }

    $scope.profilesubmit = function (profile) {
        $ionicLoading.show();
        MyServices.profilesubmit(profile, profilesubmitcallback)
    }

})

.controller('SettingCtrl', function ($scope) {

})

.controller('SocialCtrl', function ($scope) {

    //init tab
    $scope.tab = 'fb';


})

.controller('NotificationCtrl', function ($scope) {
    $scope.events = [{
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image3.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image4.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }, {
        image: "img/image6.jpg",
        title: "Music Concert",
        date: "7 Jan, 2016",
        subtitle: "Film, Media & Entertainment by paragyte technologies"
  }];
})

.controller('ContactCtrl', function ($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout) {
    // loader

    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.enquiry = {};
    var createenquirycallback = function (data, status) {
        $ionicLoading.hide();
        console.log(data);
        if (data == 1) {
            $scope.showPopupcontact();
            $scope.enquiry = {};
        } else {
            $scope.showPopupcontactfailure();
        }
    }

    $scope.showPopupcontact = function () {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Successfully Submitted!!</p>',
            title: 'Thank you!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $scope.showPopupcontactfailure = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Try Again!!</p>',
            title: 'Sorry!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.enquiryform = function (enquiry) {
        MyServices.createenquiry(enquiry, createenquirycallback)
        $ionicLoading.show();
    }

    //        ***** tabchange ****

    $scope.tab = 'contactus';
    $scope.classa = 'active';
    $scope.classb = '';

    $scope.tabchange = function (tab, a) {

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

.controller('SearchCtrl', function ($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout) {

    // loader

    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.searchresults = {};

    var searchelementcallback = function (data, status) {
        console.log(data);
        $scope.searchresults.searchevent = data.events;
        $scope.searchresults.searchgallery = data.gallery;
        $scope.searchresults.searchvideogallery = data.videogallery;
    }
    $scope.getsearchelement = function (searchelement) {
        MyServices.searchelement(searchelement, searchelementcallback)
    }

    // Go to Events page
    $scope.openevents = function (id) {
        $location.url("app/eventdetail/" + id);
    }
    $scope.openvideogallery = function (id) {
        $location.url("app/videogallery/" + id);
    }
    $scope.opengallery = function (id) {
        $location.url("app/photogallery/" + id);
    }

});