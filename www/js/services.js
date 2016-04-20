//Php admin
var adminbase = "http://wohlig.co.in/webappbackend/";
var adminurl = adminbase + "index.php/json/";
// var adminimage = adminbase + "uploads/";
var adminhauth = adminbase + "index.php/hauth/";
var imgpath = adminimage + "image?name=";

//Node admin
var vigzserver = "http://blazen.io/";
// var adminurl = "http://wohlig.biz/";
var adminimage = vigzserver + "upload/readFile?file=";
// var adminhauth = adminurl + "index.php/hauth/";
// var imgpath = adminimage + "image?name=";

var foods = [];

// FOR SOUNDCLOUD
var options = {};
options.client_id = 'f4f861b2fb75e16adfe48c4140d826f5';
var soundclouduser = "mimie-rubc";
// For SoundCloud
var SC_API_URL = "";

//FOR WORDPRESS INTEGRATION
var Wordpress_UserName = "en.blog.wordpress.com";
var WORDPRESS_API_URL = 'https://public-api.wordpress.com/rest/v1.1/';
var WORDPRESS_self_API_URL = '/wp-json/wp/v2/posts';

//for tumblr
var Tumblr_UserName = "";
var TUBMLR_API_URL = 'http://wohlig.co.in/tumblr/?url=http://api.tumblr.com/v2/blog/' + Tumblr_UserName + '/posts';

angular.module('starter.services', ['httpService'])
  .factory('MyServices', function($http, $filter, httpService) {
    return {
      getAllMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "videogallery/getAllMob", data, callback, errCallback);
      },
      getOneMob: function(id, pageno, callback, errCallback) {
        var data = {
          "_id": id,
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "videogallery/getOneMob", data, callback, errCallback);
      },
      getBlogAllMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "blog/getAllMob", data, callback, errCallback);
      },
      getBlogOneMob: function(id, callback, errCallback) {
        var data = {
          "_id": id
        };
        httpService.post(vigzserver + "blog/getOneMob", data, callback, errCallback);
      },
      getPhotoAllMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "photogallery/getAllMob", data, callback, errCallback);
      },
      getPhotoOneMob: function(id, pageno, callback, errCallback) {
        var data = {
          "_id": id,
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "photogallery/getOneMob", data, callback, errCallback);
      },
      getEventAllMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "event/getAllMob", data, callback, errCallback);
      },
      getEventOneMob: function(id, callback, errCallback) {
        var data = {
          "_id": id
        };
        httpService.post(vigzserver + "event/getOneMob", data, callback, errCallback);
      },
      getNotificationMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "notification/getAllMob", data, callback, errCallback);
      },
      getContactAllMob: function(callback, errCallback) {
        var data = {};
        httpService.post(vigzserver + "contact/getAllMob", data, callback, errCallback);
      },
      submitEnquiry: function(enquiry, callback, errCallback) {
        var data = {
          'name': enquiry.name,
          'email': enquiry.email,
          'subject': enquiry.title,
          'comment': enquiry.content
        };
        return $http({
          url: vigzserver + "enquiry/savemob",
          method: "POST",
          data: data
        }).success(callback).error(errCallback);
      },
      getUserMob: function(callback, errCallback) {
        var data = {};
        httpService.post(vigzserver + "user/getOneMob", data, callback, errCallback);
      },
      signinMob: function(data, callback, errCallback) {
        var data2 = {
          "email": data.username,
          "password": data.password
        };
        httpService.post(vigzserver + "user/login", data2, callback, errCallback);
      },
      saveProfileMob: function(data, callback, errCallback) {
        var data2 = {
          "email": data.email,
          "name": data.name,
          "phone": data.phone,
          "location": data.location,
          "dob": data.dob
        };
        httpService.post(vigzserver + "user/savemob", data2, callback, errCallback);
      },
      updateProfileMob: function(data, callback, errCallback) {
        var data2 = {
          "_id": "0",
          "email": data.email,
          "name": data.name,
          "phone": data.phone,
          "location": data.location,
          "dob": data.dob
        };
        httpService.post(vigzserver + "user/savemob", data2, callback, errCallback);
      },
      changePasswordMob: function(data, callback, errCallback) {
        var data2 = {
          "password": data.oldpassword,
          "editpassword": data.newpassword
        };
        httpService.post(vigzserver + "user/changePasswordMob", data2, callback, errCallback);
      },
      getStaticPages: function(id, callback, errCallback){
        var data2 = {
          "_id": id
        };
        httpService.post(vigzserver + "article/getOneMob", data2, callback, errCallback);
      },
      searchAll: function(search, callback, errCallback) {
        return $http({
          url: vigzserver + 'config/searchData',
          method: "POST",
          data: {
            'search': search
          }
        }).success(callback).error(errCallback);
      },
      getNavigationMob: function(callback, errCallback) {
        return $http({
          url: vigzserver + 'navigation/getAll',
          method: "POST",
          data: {}
        }).success(callback).error(errCallback);
      },
      getConfigMob: function(callback, errCallback) {
        return $http({
          url: vigzserver + 'config/getAll',
          method: "POST",
          data: {}
        }).success(callback).error(errCallback);
      },
      homeSlider: function(callback, errCallback){
        httpService.post(vigzserver + "homeslider/getAll", {}, callback, errCallback);
      },
      getIntroslider: function(callback, errCallback){
        httpService.post(vigzserver + "introslider/getAll", {}, callback, errCallback);
      },

      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      signup: function(signup, callback, err) {
        return $http({
          url: adminurl + 'signUp',
          method: "POST",
          data: {
            'username': signup.username,
            'email': signup.email,
            'password': signup.password,
            'dob': signup.dob
          }
        }).success(callback).error(err);
      },
      signin: function(signin, callback, err) {
        return $http({
          url: adminurl + 'signIn',
          method: "POST",
          data: {
            'username': signin.username,
            'password': signin.password
          }
        }).success(callback).error(err);
      },
      profilesubmit: function(profile, callback, err) {
        return $http({
          url: adminurl + 'profileSubmit',
          method: "POST",
          data: {
            'id': $.jStorage.get("user").id,
            'name': profile.name,
            'email': profile.email,
            'password': profile.password,
            'dob': profile.dob,
            'contact': profile.contact,
          }
        }).success(callback).error(err);
      },
      createenquiry: function(enquiry, callback, err) {
        return $http({
          url: adminurl + 'createEnquiry',
          method: "POST",
          data: {
            //						'id': $.jStorage.get("user").id,
            'name': enquiry.name,
            'email': enquiry.email,
            'title': enquiry.title,
            'content': enquiry.content
          }
        }).success(callback).error(err);
      },
      forgotpassword: function(email, callback, err) {
        return $http.get(adminurl + 'forgotPassword?email=' + email, {
          withCredentials: false
        }).success(callback).error(err);
      },
      getsingleevents: function(id, callback, err) {
        return $http({
          url: adminurl + 'getSingleEvents',
          method: "POST",
          data: {
            'id': id
          }
        }).success(callback).error(err);
      },

      searchelement: function(searchelement, callback, err) {
        return $http({
          url: adminurl + 'searchElement',
          method: "POST",
          data: {
            'searchelement': searchelement
          }
        }).success(callback).error(err);
      },
      getallvideogalleryvideo: function(id, pageno, callback, err) {
        return $http.get(adminurl + 'getAllVideoGalleryVideo?id=' + id + '&pageno=' + pageno + '&maxrow=' + 15, {
          withCredentials: false
        }).success(callback).error(err);
      },
      getallgalleryimage: function(id, pageno, callback, err) {
        return $http.get(adminurl + 'getAllGalleryImage?id=' + id + '&pageno=' + pageno + '&maxrow=' + 15, {
          withCredentials: false
        }).success(callback).error(err);
      },
      getsingleblog: function(id, callback, err) {
        return $http({
          url: adminurl + 'getSingleBlog',
          method: "POST",
          data: {
            'id': id
          }
        }).success(callback).error(err);
      },
      changepassword: function(password, callback, err) {
        return $http({
          url: adminurl + 'changePassword',
          method: "POST",
          data: password
        }).success(callback).error(err);
      },
      authenticate: function() {
        return $http({
          url: vigzserver + 'user/profile',
          method: "POST"
        });
      },
      getallblog: function(pageno, callback, err) {
        return $http.get(adminurl + 'getAllBlog?pageno=' + pageno + '&maxrow=' + 15, {
          withCredentials: false
        }).success(callback).error(err);
      },
      logout: function(callback, err) {
        $.jStorage.deleteKey('user');
        return $http.get(vigzserver + 'user/logout', {
          withCredentials: false
        }).success(callback).error(err);
      },
      getuser: function() {
        return $.jStorage.get("user");
      },

      getallevents: function(pageno, callback, err) {

        return $http.get(adminurl + 'getAllEvents?pageno=' + pageno + '&maxrow=' + 15, {
          withCredentials: false
        }).success(callback).error(err);
      },
      getappconfig: function(callback, err) {
        return $http.get(adminurl + 'getAppConfig', {
          withCredentials: false
        }).success(callback).error(err);
      },
      getallgallery: function(pageno, callback, err) {
        return $http.get(adminurl + 'getAllGallery?pageno=' + pageno + '&maxrow=' + 15, {
          withCredentials: false
        }).success(callback).error(err);
      },
      getallvideogallery: function(pageno, callback, err) {
        return $http.get(adminurl + 'getAllVideoGallery?pageno=' + pageno + '&maxrow=' + 15, {
          withCredentials: false
        }).success(callback).error(err);
      },
      changesetting: function(setting, callback, err) {
        return $http({
          url: adminurl + 'changeSetting',
          method: "POST",
          data: {
            id: setting.id,
            videonotification: JSON.stringify(setting.videonotification),
            eventnotification: JSON.stringify(setting.eventnotification),
            blognotification: JSON.stringify(setting.blognotification),
            photonotification: JSON.stringify(setting.photonotification)
          }
        }).success(callback).error(err);
      },
      editprofile: function(profile, callback, err) {
        var user = _.cloneDeep(profile);
        user.dob = $filter("date")(user.dob, "yyyy-MM-dd");

        return $http({
          url: adminurl + 'editProfile',
          method: "POST",
          data: user
        }).success(callback).error(err);
      },
      getWordpressPosts: function(wdp, callback) {
        var getdata = function(data, status) {
          return $http.get(data.meta.links.posts, {
            withCredentials: false
          }).success(callback);
        };
        $http.get(WORDPRESS_API_URL + "sites/" + wdp, {
          withCredentials: false
        }).success(getdata);
      },
      getWordpressSelfPosts: function(wdp, callback) {
        console.log(WORDPRESS_self_API_URL);
        console.log(wdp);
        $http.get(wdp + WORDPRESS_self_API_URL, {
          withCredentials: false
        }).success(callback);
      },
      getTumblrPosts: function(tmb, callback) {
        $http.get('http://wohlig.co.in/tumblr/?url=http://api.tumblr.com/v2/blog/' + tmb + '/posts?api_key=z1dnwToZiXGJkx1fTMtwqYkzcpf83G381TnPgH3wuft4EcEQTU', {
          withCredentials: false
        }).success(callback);
      },
      getNotification: function(pageno, callback, err) {
        if ($.jStorage.get("user")) {
          var notificationres = function(data) {
            return $http.get(adminurl + 'getAllNotification?event=' + data.eventnotification + '&blog=' + data.blognotification + '&video=' + data.videonotification + '&photo=' + data.photonotification + '&pageno=' + pageno, {
              withCredentials: false
            }).success(callback).error(err);
          };

          $http.get(adminurl + 'getSingleUserDetail?id=' + $.jStorage.get("user").id, {
            withCredentials: false
          }).success(notificationres);

        } else {
          console.log("else user");
          return $http.get(adminurl + 'getAllNotification?event=true&blog=true&video=true&photo=true&pageno=' + pageno, {
            withCredentials: false
          }).success(callback).error(err);
        }

      },
      getallfrontmenu: function(callback, err) {
        $http.get(adminurl + 'getAllFrontmenu', {
          withCredentials: false
        }).success(callback).error(err);
      },
      getarticle: function(id, callback, err) {
        $http.get(adminurl + 'getSingleArticles?id=' + id, {
          withCredentials: false
        }).success(callback).error(err);
      },
      getsingleuserdetail: function(callback, err) {
        $http.get(adminurl + 'getSingleUserDetail?id=' + $.jStorage.get("user").id, {
          withCredentials: false
        }).success(callback).error(err);
      },
      gethomecontent: function(callback, err) {
        $http.get(adminurl + 'getSingleArticles?id=1', {
          withCredentials: false
        }).success(callback).error(err);
      },
      setconfigdata: function(data) {
        $.jStorage.set("configdata", data);
      },
      getconfigdata: function(data) {
        return $.jStorage.get("configdata");
      },
      setNotificationToken: function(callback) {
        $http.get(adminurl + 'setNotificationToken?os=' + $.jStorage.get("os") + "&token=" + $.jStorage.get("token"), {
          withCredentials: false
        }).success(callback);
      },
      getAllAudio: function(callback) {
        $http({
          method: 'GET',
          url: 'http://api.soundcloud.com/users/' + soundclouduser + '/tracks',
          params: options,
          withCredentials: false
        }).then(callback);
      }
    };
  });
