var reloadpage = false;
var configreload = {};
angular.module('starter.controllers', ['starter.services', 'ion-gallery', 'ngCordova', 'ngSanitize'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, MyServices, $ionicLoading, $location, $filter, $ionicLoading, $cordovaNetwork) {

	$ionicLoading.hide();
	
	console.log($cordovaNetwork.getNetwork());
//	function internetaccess(toState) {
//		if (navigator) {
////			console.log(navigator.onLine);
//			if (navigator.onLine != true) {
////				console.log("on login false");
//				onoffline = false;
//				$location.url("/access/offline");
//			} else {
//
////				console.log("on login true");
//				onoffline = true;
//			}
//		}
//	}
//	$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//		internetaccess(toState);
//	});
//	window.addEventListener("offline", function (e) {
//		internetaccess();
//	})
//	window.addEventListener("online", function (e) {
//		internetaccess();
//	})
	$scope.menudata = [];
	var loginstatus = false;

	// loader
	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};
	configreload.onallpage = function () {
		var loginstatus = false;
		if (MyServices.getconfigdata()) {
			_.each(MyServices.getconfigdata().config[0], function (n) {
				if (n.value == true) {
					loginstatus = true;
				}
			});
		}
		if (loginstatus == true && !MyServices.getuser()) {
			$location.url("/access/login");
		}
	}
	configreload.func = function () {
		$scope.menudata = [];
		var data = MyServices.getconfigdata();
		_.each(data.config[0], function (n) {
			if (n.value == true) {
				loginstatus = true;
			}
		});
		_.each(data.menu, function (n) {
			if (loginstatus == false) {
				if (n.linktypelink != "setting" && n.linktypelink != "contact" && n.linktypelink != "profile") {
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
		$scope.contact = data.config[5];
		$scope.menu = {};
		$scope.menu.setting = false;
		var blogdata1 = JSON.parse(data.config[0].text);

		// config data
		var blogdata = JSON.parse(data.config[1].text);
		for (var i = 0; i < blogdata.length; i++) {
			if (blogdata[i].value == true) {
				$scope.menudata.blogs = true;
				$.jStorage.set("blogType", blogdata[i]);
				break;
			} else {
				$scope.menudata.blogs = false;
			}
		}
		_.each(blogdata1, function (n) {
			if (n.value == true) {
				loginstatus = true;
			}
		});

		$scope.logso = "";
		if (loginstatus == false) {
			$scope.menu.setting = false;
		} else {
			$scope.menu.setting = true;
			$scope.logso = "has-menu-photo";
		}
	}

	MyServices.getallfrontmenu(function (data) {
		MyServices.setconfigdata(data);
			configreload.func();
	})
	var logoutsuccess = function (data, success) {
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

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function () {
			$scope.closeLogin();
		}, 1000);
	};

	if ($.jStorage.get("user")) {

		MyServices.getsingleuserdetail(function (data) {
			$scope.userdetails = data;
			$scope.userdetails.myimage = {
				'background-image': "url('" + $filter("profileimg")(data.image) + "')"
			};
		});

	}

})

.controller('AccessCtrl', function ($scope) {

})

.controller('ArticleCtrl', function ($scope, MyServices, $stateParams, $ionicPopup, $interval, $location, $window, $ionicLoading, $timeout) {
	configreload.onallpage();
	$scope.article = {};
	$scope.article.title = "my article";
	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};
	$scope.showloading();
	MyServices.getarticle($stateParams.id, function (data) {
		$scope.article = data;
		$ionicLoading.hide();
	});

})

.controller('LoginCtrl', function ($scope, MyServices, $ionicPopup, $interval, $location, $window, $ionicLoading, $timeout) {
	$scope.logindata = {};
	$.jStorage.flush();
	$scope.config = MyServices.getconfigdata();
	var loginstatus = false;
	
//	function internetaccess(toState) {
//		if (navigator) {
//			console.log(navigator.onLine);
//			if (navigator.onLine != true) {
//				console.log("on login false");
//				onoffline = false;
//				$location.url("/access/offline");
//			} else {
//
//				console.log("on login true");
//				onoffline = true;
//			}
//		}
//	}
//	$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//		internetaccess(toState);
//	});
//	window.addEventListener("offline", function (e) {
//		internetaccess();
//	})
//	window.addEventListener("online", function (e) {
//		internetaccess();
//	})

	$scope.setup = function () {
		$scope.config = MyServices.getconfigdata();
		_.each(JSON.parse($scope.config.config[0].text), function (n) {
			if (n.name.toLowerCase() == "email" && n.value == true) {
				$scope.logindata.email = true;
				loginstatus = true;
			} else if (n.name.toLowerCase() == "google" && n.value == true) {
				$scope.logindata.google = true;
				loginstatus = true;
			} else if (n.name.toLowerCase() == "twitter" && n.value == true) {
				$scope.logindata.twitter = true;
				loginstatus = true;
			} else if (n.name.toLowerCase() == "instagram" && n.value == true) {
				$scope.logindata.instagram = true;
				loginstatus = true;
			} else if (n.name.toLowerCase() == "facebook" && n.value == true) {
				$scope.logindata.facebook = true;
				loginstatus = true;
			} else {}
		})
		if (loginstatus == false) {
			$location.url("/app/home");
		}
	}

	MyServices.getallfrontmenu(function (data) {
		MyServices.setconfigdata(data);
		$scope.setup();
	})


	// loader
	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};

	//logins
	var checktwitter = function (data, status) {
		if (data != "false" && data != '') {
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
		if (data != "false") {
			$.jStorage.set("user", data);
			user = data;
			var myPopup = $ionicPopup.show({
				template: '<p class="text-center">Signup successfully.</p>',
				scope: $scope,

			});
			$timeout(function () {
				myPopup.close(); //close the popup after 3 seconds for some reason
				$location.url("/app/home");
			}, 2000);

		} else {
			$scope.showPopupsignupfailure();
		}
		$ionicLoading.hide();
		$scope.signup = {};
	}
	$scope.signupsubmit = function (signup) {
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
			MyServices.signup($scope.signup, signupsuccess);
		} else {
			$ionicLoading.hide();
		}

	}

	// SIGN IN
	$scope.signin = {};
	var signinsuccess = function (data, status) {
		$ionicLoading.hide();
		if (data != 'false') {

			$.jStorage.set("user", data);
			user = data;
			$location.url("/app/home");
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
		} else {
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
		}, 5000);
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
		}, 5000);
	};
	var forgotpasswordcallback = function (data, status) {
		$ionicLoading.hide();
	}
	$scope.forgotpassword = function (email) {
		$ionicLoading.show();
		MyServices.forgotpassword(email, forgotpasswordcallback)

	}
})

.controller('SignupCtrl', function ($scope) {

})

.controller('HomeCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce) {

	configreload.onallpage();
	var showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};
	showloading();

	var loginstatus = false;
	var menu = {};
	menu.setting = false;

	$scope.content = {};
	MyServices.gethomecontent(function (data) {
		$scope.content = data;
		$scope.content.content = $sce.trustAsHtml($scope.content.content);
		$ionicLoading.hide();
	});
	$scope.setup = function () {
		var blogdata = JSON.parse(MyServices.getconfigdata().config[0].text);
		_.each(blogdata, function (n) {
			if (n.value == true) {
				loginstatus = true;
			}
		});
		if (loginstatus == false) {
			menu.setting = false;
			$.jStorage.deleteKey("user");
		} else {
			if (!MyServices.getuser() && MyServices.getuser() == null) {
				$location.url("/access/login");
				menu.setting = true;
			}
		}
	}

	MyServices.getallfrontmenu(function (data) {
		MyServices.setconfigdata(data);
		$scope.setup();
	})

	MyServices.getallsliders(function (data) {
		//		console.log(data);
		$scope.slides = data;
	});

	$scope.slides = ["img/image1.jpg", "img/image2.jpg", "img/image3.jpg"];
})

.controller('AboutCtrl', function ($scope) {

})

.controller('TeamCtrl', function ($scope) {

})

.controller('OfflineCtrl', function ($scope, $ionicLoading) {
	$ionicLoading.hide();
})

.controller('ProfileCtrl', function ($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout, $cordovaFileTransfer, $cordovaImagePicker, $filter) {

	configreload.onallpage();
	$scope.edit = false;
	$scope.user = {};
	$scope.user.newimage = "";

	var showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};
	showloading();
	MyServices.getsingleuserdetail(function (data) {
		$ionicLoading.hide();
		$scope.user = data;
		$scope.user.newcoverimage = {
			'background-image': "url('" + $filter("serverimage")($scope.user.coverimage) + "')"
		};
		$scope.user.newimage = {
			'background-image': "url('" + $filter("profileimg")($scope.user.image) + "')"
		};

	});
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
			if (data != 0) {
				$.jStorage.set("user", data);
				$scope.showPopup1();
				$scope.edit = !$scope.edit
			}
		})
	}

	//	pick image from gallery
	var options = {
		maximumImagesCount: 1,
		width: 800,
		height: 800,
		quality: 80,
		allowEdit: true

	};
	$scope.picFromGallery = function () {
		$cordovaImagePicker.getPictures(options).then(function (resultImage) {
			$scope.user.newimage = {
				'background-image': "url('" + resultImage[0] + "')"
			};
			$cordovaFileTransfer.upload(adminurl + "profileimageupload?id=" + MyServices.getuser().id, resultImage[0], {})
				.then(function (result) {
					var data = JSON.parse(result.response);
					$ionicLoading.hide();
				}, function (err) {}, function (progress) {});

		}, function (err) {
			// An error occured. Show a message to the user
		});
	};

	$scope.picImageForCover = function () {
		$cordovaImagePicker.getPictures(options).then(function (resultImage) {
			$scope.user.newcoverimage = {
				'background-image': "url('" + resultImage[0] + "')"
			};
			$cordovaFileTransfer.upload(adminurl + "coverimageupload?id=" + MyServices.getuser().id, resultImage[0], {})
				.then(function (result) {
					var data = JSON.parse(result.response);
					$ionicLoading.hide();
				}, function (err) {}, function (progress) {;
				});
		}, function (err) {
			// An error occured. Show a message to the user
		});

	};
})

.controller('EventsCtrl', function ($scope, MyServices, $location, $ionicLoading) {

	configreload.onallpage();
	$ionicLoading.show();
	$scope.pageno = 1;
	$scope.events = [];
	$scope.keepscrolling = true;
	$scope.msg = "Loading....";
	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};

	$scope.loadevents = function (pageno) {
		MyServices.getallevents(pageno, function (data) {
			$ionicLoading.hide();
			_.each(data.queryresult, function (n) {
				$scope.events.push(n);
			});

			if ($scope.events.length == 0) {
				$scope.msg = "No data found.";
			} else {
				$scope.msg = "";
			}

			if (data.queryresult.length == 0) {
				$scope.keepscrolling = false;
			}
		})
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.loadevents(1);

	$scope.loadMorePolls = function () {
		$scope.loadevents(++$scope.pageno);
	}

	$scope.geteventdetails = function (id) {
		$location.url("app/eventdetail/" + id);
	}

})

.controller('EventDetailCtrl', function ($scope, $stateParams, MyServices, $ionicLoading, $ionicSlideBoxDelegate) {
	configreload.onallpage();
	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};

	$scope.msg = "Loading...";

	$scope.id = $stateParams.id;
	var getsingleeventscallback = function (data, status) {
		if (data == "") {
			$scope.msg = "No data found";
		} else {
			$scope.msg = "";
		}
		if (data.eventimages && data.eventimages.length > 0) {
			data.eventimages = _.chunk(data.eventimages, 2);
		}
		if (data.eventvideos && data.eventvideos.length > 0) {
			data.eventvideos = _.chunk(data.eventvideos, 2);
		}
		$scope.eventdetail = data;
		$ionicSlideBoxDelegate.update();
	}
	MyServices.getsingleevents($stateParams.id, getsingleeventscallback)
})

.controller('BlogsCtrl', function ($scope, MyServices, $location, $ionicLoading) {
	configreload.onallpage();
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
	$scope.pageno = 1;
	$scope.keepscrolling = true;
	$scope.msg = "Loading...";
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
		}, 5000);
	};

	$scope.blogDetail = function (blog, name) {
		$ionicLoading.show();
		blog.provider = name;
		$.jStorage.set('postdetail', blog);
		if (name == "cms") {
			$location.path('/app/blogdetail/' + blog.id);
		} else {
			$location.path('/app/blogdetail/0');
		}
	}

	$scope.reloadblog = function (page) {
		MyServices.getallblog(page, function (data, status) {
			$ionicLoading.hide();
			_.each(data.queryresult, function (n) {
				$scope.blogs.push(n);
			});

			if (data.queryresult.length == 0) {
				$scope.keepscrolling = false;
			}
			if ($scope.blogs.length != 0) {
				$scope.msg = "";
			} else {
				$scope.msg = "No data found";
			}
		});
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.$broadcast('scroll.refreshComplete');
	}


	if ($.jStorage.get("blogType") && $.jStorage.get("blogType").name.toLowerCase() == "wordpress") {
		$scope.showWordpress = true;
		$scope.keepscrolling = false;
		Wordpress_UserName = $.jStorage.get("blogType").appid;
		MyServices.getWordpressPosts($.jStorage.get("blogType").appid, function (data, status) {
			$ionicLoading.hide();
			$scope.blogs = data.posts;
		});
	} else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").name.toLowerCase() == "tumblr") {
		$scope.showTumblr = true;
		$scope.keepscrolling = false;
		Tumblr_UserName = $.jStorage.get("blogType").appid;
		MyServices.getTumblrPosts($.jStorage.get("blogType").appid, function (data, status) {

			$ionicLoading.hide();
			if (data) {
				$scope.msg = "";
				$scope.blogs = data.response.posts;
			} else {
				$scope.msg = "No blog data or Invalid blog";
			}
		});
	} else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").name.toLowerCase() == "cms") {
		$scope.showCustomblog = true;
		$scope.reloadblog(1);
	}

	$scope.loadMorePolls = function () {
		$scope.reloadblog(++$scope.pageno);
	}

})

.controller('BlogDetailCtrl', function ($scope, MyServices, $ionicLoading, $stateParams) {

	configreload.onallpage();
	$ionicLoading.hide();
	$scope.msg = "Loading....";
	var getsingleblogsuccess = function (data, status) {
		$scope.showcmsdetail = true;
		$scope.details = data;
		if (data == '') {
			$scope.msg = "No such blog";
		} else {
			$scope.msg = "";
		}
	}

	$scope.id = $stateParams.id;

	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};

	// tumblr and wordpress
	if ($stateParams.id == 0) {
		$scope.msg = "";
		$scope.details = $.jStorage.get('postdetail');
		if ($scope.details.provider == 'tumblr') {
			var newdt = $scope.details.date.split('T');
			$scope.details.date = newdt[0];
		}
	} else {
		MyServices.getsingleblog($scope.id, getsingleblogsuccess);
	}
})

.controller('PhotoGalleryCategoryCtrl', function ($scope, MyServices, $location, $ionicLoading) {

	configreload.onallpage();
	$ionicLoading.show();
	$scope.msg = "Loading....";
	$scope.pageno = 1;
	$scope.photos = [];
	$scope.keepscrolling = true;
	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};

	$scope.sendphotoid = function (id) {
		$location.url("app/photogallery/" + id);
	}

	$scope.loadgallery = function (pageno) {
		MyServices.getallgallery(pageno, function (data, status) {
			//			console.log(data.queryresult);
			$ionicLoading.hide();

			_.each(data.queryresult, function (n) {
				$scope.photos.push(n);
			});

			if (data.queryresult == '') {
				//				console.log("keep scrolling false");
				$scope.keepscrolling = false;
			}

			if ($scope.photos.length == 0) {
				$scope.msg = "The gallery is empty.";
			} else {
				$scope.msg = "";
			}
		});

		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.loadgallery(1);

	$scope.loadMorePolls = function () {
		$scope.loadgallery(++$scope.pageno);
	}

})

.controller('PhotoGalleryCtrl', function ($scope, MyServices, $stateParams, $ionicLoading, $timeout) {

	configreload.onallpage();
	$ionicLoading.show();
	$scope.msg = "Loading....";
	$scope.keepscrolling = true;
	$scope.photos = [];
	$scope.pageno = 1;
	// loader

	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};

	$scope.showloading();

	$scope.photoid = $stateParams.id;

	$scope.loadphoto = function (pageno) {
		MyServices.getallgalleryimage($stateParams.id, pageno, function (data, status) {
			$ionicLoading.hide();
			_.each(data.queryresult, function (n) {
				$scope.photoObj = {};
				$scope.photoObj.src = adminimage + n.src;
				$scope.photos.push($scope.photoObj);
			});
			if (data.queryresult == '') {
				$scope.keepscrolling = false;
			}

			if ($scope.photos.length == 0) {
				$scope.msg = "The gallery is empty.";
			} else {
				$scope.msg = "";
			}
		});
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.loadphoto(1);

	$scope.loadMorePolls = function () {
		$scope.loadphoto(++$scope.pageno);
	}

})

.controller('VideoGalleryCategoryCtrl', function ($scope, MyServices, $ionicLoading) {


	configreload.onallpage();
	$ionicLoading.show();
	$scope.videos = [];
	$scope.keepscrolling = true;
	$scope.pageno = 1;
	$scope.msg = "Loading....";
	// loader
	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};
	$scope.loadphoto = function (pageno) {
		MyServices.getallvideogallery(pageno, function (data, status) {
			$ionicLoading.hide();

			_.each(data.queryresult, function (n) {
				$scope.videos.push(n);
			});

			if (data.queryresult == '') {
				$scope.keepscrolling = false;
			}

			if ($scope.videos.length == 0) {
				$scope.msg = "The gallery is empty.";
			} else {
				$scope.msg = "";
			}

		});

		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.loadphoto(1);

	$scope.loadMorePolls = function () {
		$scope.loadphoto(++$scope.pageno);
	}
})

.controller('VideoGalleryCtrl', function ($scope, MyServices, $location, $ionicModal, $stateParams, $ionicLoading, $ionicPopup, $timeout) {

	configreload.onallpage();
	$ionicLoading.show();
	$scope.pageno = 1;
	$scope.videos = [];
	$scope.keepscrolling = true;
	$scope.msg = "Loading....";

	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};
	$scope.showloading();
	$scope.videoid = $stateParams.id;

	$scope.loadphoto = function (pageno) {
		MyServices.getallvideogalleryvideo($scope.videoid, pageno, function (data, status) {
			$ionicLoading.hide();
			_.each(data.queryresult, function (n) {
				$scope.videos.push(n);
			});


			if (data.queryresult == '') {
				$scope.keepscrolling = false;
			}

			if ($scope.videos.length == 0) {
				$scope.msg = "The gallery is empty.";
			} else {
				$scope.msg = "";
			}
		});

		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.$broadcast('scroll.refreshComplete');
	}


	$scope.loadphoto(1);

	$scope.loadMorePolls = function () {
		$scope.loadphoto(++$scope.pageno);
	}



	$ionicModal.fromTemplateUrl('templates/appView/modal-video.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.showVideo = function (url) {
		$scope.modal.show();
		$scope.video = [];
		$scope.video.url = url + "?autoplay=1";
	};

	$scope.closeVideo = function () {
		$scope.modal.hide();
	};

})

.controller('AccountCtrl', function ($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout) {

	configreload.onallpage();
	if ($.jStorage.get("user")) {
		$scope.userdetails = {};
		$scope.userdetails.username = $.jStorage.get("user").username;
		if ($scope.userdetails.username == "") {
			$scope.userdetails.username = $.jStorage.get("user").name;
		}
		$scope.userdetails.userimage = $.jStorage.get("user").image;
		$scope.userdetails.useremail = $.jStorage.get("user").email;
	}

	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
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

.controller('SettingCtrl', function ($scope, MyServices) {

	configreload.onallpage();
	$scope.setting = {};
	MyServices.getsingleuserdetail(function (data) {
		$scope.user = data;
		$scope.setting.videonotification = $scope.user.videonotification;
		$scope.setting.eventnotification = $scope.user.eventnotification;
		$scope.setting.blognotification = $scope.user.blognotification;
		$scope.setting.photonotification = $scope.user.photonotification;
		$scope.id = $scope.user.id;
	});

	$scope.changeSetting = function (setting) {
		setting.id = $scope.user.id;
		MyServices.changesetting(setting, function (data) {});
	}

})

.controller('SocialCtrl', function ($scope) {
	configreload.onallpage();
	$scope.tab = 'fb';
})

.controller('NotificationCtrl', function ($scope, MyServices, $ionicLoading) {

	configreload.onallpage();
	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};
	MyServices.getNotification(function (data) {
		$scope.events = data.queryresult;
		$ionicLoading.hide();
	});
})

.controller('ContactCtrl', function ($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout, $compile) {
	configreload.onallpage();
	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};
	$scope.enquiry = {};
	var createenquirycallback = function (data, status) {
		$ionicLoading.hide();
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
			MyServices.createenquiry(enquiry, createenquirycallback)
		} else {
			$ionicLoading.hide();
		}

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

	configreload.onallpage();

	$scope.showloading = function () {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-royal"></ion-spinner>'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 5000);
	};
	$scope.searchresults = {};

	var searchelementcallback = function (data, status) {
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