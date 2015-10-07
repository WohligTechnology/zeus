var adminbase = "http://wohlig.co.in/webappbackend/";
//var adminbase = "http://localhost/apphiloback/";
var adminurl = adminbase + "index.php/json/";
var adminimage = adminbase + "uploads/";
var adminhauth = adminbase + "index.php/hauth/";
var imgpath = adminimage + "image?name=";

var foods = [];

//FOR WORDPRESS INTEGRATION 
var Wordpress_UserName = "en.blog.wordpress.com";

var WORDPRESS_API_URL = 'https://public-api.wordpress.com/rest/v1.1/';

//for tumblr
var Tumblr_UserName = "";
var TUBMLR_API_URL = 'http://wohlig.co.in/tumblr/?url=http://api.tumblr.com/v2/blog/' + Tumblr_UserName + '/posts';

angular.module('starter.services', [])
	.factory('MyServices', function ($http,$filter) {
		return {
			all: function () {
				return chats;
			},
			remove: function (chat) {
				chats.splice(chats.indexOf(chat), 1);
			},
			get: function (chatId) {
				for (var i = 0; i < chats.length; i++) {
					if (chats[i].id === parseInt(chatId)) {
						return chats[i];
					}
				}
				return null;
			},
			signup: function (signup, callback) {
				return $http({
					url: adminurl + 'signup',
					method: "POST",
					data: {
						'username': signup.username,
						'email': signup.email,
						'password': signup.password,
						'dob': signup.dob
					}
				}).success(callback);
			},
			signin: function (signin, callback) {
				return $http({
					url: adminurl + 'signin',
					method: "POST",
					data: {
						'username': signin.username,
						'password': signin.password
					}
				}).success(callback);
			},
			changepassword: function (password, callback) {
				return $http({
					url: adminurl + 'changepassword',
					method: "POST",
					data: {
						'id': $.jStorage.get("user").id,
						'oldpassword': password.oldpassword,
						'newpassword': password.newpassword,
						'confirmpassword': password.confirmpassword
					}
				}).success(callback);
			},
			profilesubmit: function (profile, callback) {
				return $http({
					url: adminurl + 'profilesubmit',
					method: "POST",
					data: {
						'id': $.jStorage.get("user").id,
						'name': profile.name,
						'email': profile.email,
						'password': profile.password,
						'dob': profile.dob,
						'contact': profile.contact,
					}
				}).success(callback);
			},
			createenquiry: function (enquiry, callback) {
				return $http({
					url: adminurl + 'createenquiry',
					method: "POST",
					data: {
						'id': $.jStorage.get("user").id,
						'name': enquiry.name,
						'email': enquiry.email,
						'title': enquiry.title,
						'content': enquiry.content
					}
				}).success(callback);
			},
			forgotpassword: function (email, callback) {
				return $http.get(adminurl + 'forgotpassword?email=' + email, {
					withCredentials: false
				}).success(callback);
			},
			getsingleevents: function (id, callback) {
				return $http({
					url: adminurl + 'getsingleevents',
					method: "POST",
					data: {
						'id': id
					}
				}).success(callback);
			},

			searchelement: function (searchelement, callback) {
				return $http({
					url: adminurl + 'searchelement',
					method: "POST",
					data: {
						'searchelement': searchelement
					}
				}).success(callback);
			},
			getallvideogalleryvideo: function (id, pageno, callback) {
				return $http.get(adminurl + 'getallvideogalleryvideo?id=' + id + '&pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback);
			},
			getallgalleryimage: function (id, pageno, callback) {
				return $http.get(adminurl + 'getallgalleryimage?id=' + id + '&pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback);
			},
			getsingleblog: function (id, callback) {
				return $http({
					url: adminurl + 'getsingleblog',
					method: "POST",
					data: {
						'id': id
					}
				}).success(callback);
			},
			changepassword: function (password, callback) {
				return $http({
					url: adminurl + 'changepassword',
					method: "POST",
					data: password
				}).success(callback);
			},
			authenticate: function () {
				return $http({
					url: adminurl + 'authenticate',
					method: "POST"
				});
			},
			getallblog: function (pageno, callback) {
				return $http.get(adminurl + 'getallblog?pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback);
			},
			logout: function () {
				$.jStorage.flush();
				return $http.get(adminurl + 'logout', {
					withCredentials: false
				}).success(callback);
			},
			getuser: function () {
				return $.jStorage.get("user");
			},
			getallsliders: function (callback) {
				return $http.get(adminurl + 'getallsliders', {
					withCredentials: false
				}).success(callback);
			},
			getallevents: function (pageno, callback) {
				
				return $http.get(adminurl + 'getallevents?pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback);
			},
			getappconfig: function (callback) {
				return $http.get(adminurl + 'getappconfig', {
					withCredentials: false
				}).success(callback);
			},
			getallgallery: function (pageno, callback) {
				return $http.get(adminurl + 'getallgallery?pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback);
			},
			getallvideogallery: function (pageno, callback) {
				return $http.get(adminurl + 'getallvideogallery?pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback);
			},
			changesetting: function (setting, callback) {
				return $http({
					url: adminurl + 'changesetting',
					method: "POST",
					data: {
						id: setting.id,
						videonotification: JSON.stringify(setting.videonotification),
						eventnotification: JSON.stringify(setting.eventnotification),
						blognotification: JSON.stringify(setting.blognotification),
						photonotification: JSON.stringify(setting.photonotification)
					}
				}).success(callback);
			},
			editprofile: function (profile, callback) {
				var user=_.cloneDeep(profile);
				user.dob=$filter("date")(user.dob,"yyyy-MM-dd");
				
				return $http({
					url: adminurl + 'editprofile',
					method: "POST",
					data: user
				}).success(callback);
			},
			getWordpressPosts: function (wdp, callback) {
				var getdata = function (data, status) {
					return $http.get(data.meta.links.posts, {
						withCredentials: false
					}).success(callback);
				}
				$http.get(WORDPRESS_API_URL + "sites/" + wdp, {
					withCredentials: false
				}).success(getdata);
			},
			getTumblrPosts: function (tmb, callback) {
				$http.get('http://wohlig.co.in/tumblr/?url=http://api.tumblr.com/v2/blog/' + tmb + '/posts', {
					withCredentials: false
				}).success(callback);
			},
			getNotification: function (pageno, data, callback) {
					$http.get(adminurl + 'getallnotification?event='+data.event+'&blog='+data.blog+'&video='+data.video+'&photo='+data.photo+'&pageno='+pageno, {
						withCredentials: false
					}).success(callback);
			},
			getallfrontmenu: function (callback) {
				$http.get(adminurl + 'getallfrontmenu', {
					withCredentials: false
				}).success(callback);
			},
			getarticle: function (id, callback) {
				$http.get(adminurl + 'getsinglearticles?id=' + id, {
					withCredentials: false
				}).success(callback);
			},
			getsingleuserdetail: function (callback) {
				$http.get(adminurl + 'getsingleuserdetail?id=' + $.jStorage.get("user").id, {
					withCredentials: false
				}).success(callback);
			},
			gethomecontent: function (callback) {
				$http.get(adminurl + 'getsinglearticles?id=1', {
					withCredentials: false
				}).success(callback);
			},
			setconfigdata: function (data) {
				$.jStorage.set("configdata", data);
			},
			getconfigdata: function (data) {
				return $.jStorage.get("configdata");
			},
		};
	});