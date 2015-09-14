var reloadpage = false;
angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, MyServices, $location, $ionicLoading) {

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
        console.log(data);
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

.controller('AccessCtrl', function ($scope, $ionicLoading) {
    // loader

    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
})

.controller('LoginCtrl', function ($scope, MyServices, $ionicPopup, $interval, $location, $window, $ionicLoading, $timeout) {

    $.jStorage.flush();

    $scope.logindata = {};

    MyServices.getappconfig(function (data, status) {
            console.log(data);
            _.each(JSON.parse(data[0].text), function (n) {
                console.log(n);
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
        console.log(data);
        if (data != "false") {
            $.jStorage.set("user", data);
            user = data;

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

    //SIGN UP FORMn
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
        if (data != 'false') {

            MyServices.authenticate().success(authenticatesuccess);
            $scope.signin = {};
        } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Login Failed!',
                template: 'Wrong username or password!!'
            });
        }
    }
    $scope.signinsubmit = function (signin) {
        $ionicLoading.show();
        MyServices.signin(signin, signinsuccess);
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

    //    ***** End ******

})

.controller('ResetPasswordCtrl', function ($scope, MyServices, $ionicPopup, $timeout, $ionicLoading) {

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

.controller('ForgotPasswordCtrl', function ($scope, MyServices, $ionicLoading) {
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

.controller('SignupCtrl', function ($scope, $ionicLoading) {})
    
    .controller('AboutCtrl', function ($scope, $ionicLoading , $stateParams, $window, $ionicScrollDelegate) {
    
         $scope.abouthead = [{
            content: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."

        }];
        $scope.content = [{
            detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a massa sit amet justo pretium condimentum. Integer sed lectus sit amet leo dictum ullamcorper nec in tellus. Quisque vitae venenatis eros, vitae venenatis eros. Maecenas nec leo non tortor dignissim fermentum sed aliquet ligula."

        }];
        $scope.moretext = [{
            more: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam aliquet ultrices dignissim. Donec pretium et dui ut imperdiet. Aliquam et urna non neque tempor vehicula at quis justo. Ut eleifend odio justo, et finibus mi aliquet vitae. Etiam euismod dapibus arcu nec pellentesque. Suspendisse faucibus velit ornare, tincidunt massa in, ullamcorper lectus. Quisque semper venenatis nulla, at auctor libero pharetra ultrices. Duis ut enim egestas, varius lorem ac, sodales sapien."

        }];
    
    
        //    ****** More Text Json Format data ******

        $scope.showDetails = "dontshow";
        $scope.moredetails = "Read More";
        $scope.showmore = function(classname) {
            var newheight = $(".moretext." + classname).height();
            console.log(newheight);
            console.log("show more clicked");
            if ($scope.showDetails == "showmore") {
                $scope.showDetails = "dontshow";
                $(".addanimation").height(0);
                $scope.moredetails = "Read More";
                $ionicScrollDelegate.$getByHandle('mainScroll').resize();
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
            } else {
                $scope.showDetails = "showmore";
                $(".addanimation").height(newheight);
                $scope.moredetails = "Hide";
                $ionicScrollDelegate.$getByHandle('mainScroll').resize();
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
            }

        };

        //***** End ******
    
    
})

.controller('HomeCtrl', function ($scope, MyServices, $ionicSlideBoxDelegate, $ionicLoading) {
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

    //        $scope.slides = ["http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png", "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png", "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png"];

    MyServices.getallsliders(function (data, status) {
        $ionicLoading.hide();
        $scope.slides = data.queryresult;
        $ionicSlideBoxDelegate.update();
    })

})

.controller('ContentPageCtrl', function ($scope, $ionicLoading) {
    // loader

    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
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

.controller('EventDetailCtrl', function ($scope, $stateParams, MyServices, $ionicLoading) {
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
        console.log(data);
        $scope.eventdetail = data;
    }
    MyServices.getsingleevents($scope.id, getsingleeventscallback)
})

.controller('ServiceCtrl', function ($scope, $ionicLoading) {
    // loader

    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
})

.controller('BlogsCtrl', function ($scope, MyServices, $location, $ionicLoading) {
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
    // loader
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
    console.log($scope.photoid);
    var getallgalleryimagecallback = function (data, status) {
        $ionicLoading.hide();
        $scope.photos = data.queryresult;
        $scope.photos = _.chunk($scope.photos, 2);
        console.log($scope.photos);
    }
    MyServices.getallgalleryimage($scope.photoid, getallgalleryimagecallback)

    //    MyServices.getallgalleryimage(function (data, status) {
    //        $scope.photos = data.queryresult;
    //        $scope.photos = _.chunk($scope.photos, 2);
    //        console.log($scope.photos);
    //    })
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

        //        $scope.videos = [{
        //            url: "bNSLwCS7vpU",
        //            title: "Music Concert",
        //            date: "7 Jan, 2016",
        //            subtitle: "Film, Media & Entertainment by paragyte technologies"
        //  }];


    })
    .controller('VideoGalleryCtrl', function ($scope, MyServices, $stateParams, $ionicLoading) {
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
    })
    .controller('AccountCtrl', function ($scope, MyServices, $ionicPopup, $timeout, $ionicLoading) {
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
    .controller('SettingCtrl', function ($scope, $ionicLoading) {
        // loader

        $scope.showloading = function () {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-royal"></ion-spinner>'
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 10000);
        };
    })   
    .controller('ProfileCtrl', function ($scope, $ionicLoading) {
        // loader

//        $scope.showloading = function () {
//            $ionicLoading.show({
//                template: '<ion-spinner class="spinner-royal"></ion-spinner>'
//            });
//            $timeout(function () {
//                $ionicLoading.hide();
//            }, 10000);
//        };
    })
    .controller('NotificationCtrl', function ($scope, $ionicLoading) {
        // loader

        $scope.showloading = function () {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-royal"></ion-spinner>'
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 10000);
        };
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
    .controller('ContactCtrl', function ($scope, MyServices, $ionicPopup, $timeout, $ionicLoading) {
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

.controller('SearchCtrl', function ($scope, MyServices, $location, $ionicLoading) {
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