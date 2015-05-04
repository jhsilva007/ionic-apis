angular.module('starter.controllers', ['ngFx'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $auth, $state) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.logOut = function () {
    $auth.signOut()
      .then(function(resp) { 

          $state.go("app.playlists", {cache: false});
      })
      .catch(function(resp) { 
          console.log(resp);
    });
  };

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

    $auth.submitLogin($scope.loginData)
        .then(function(resp) { 
            console.log(resp);

        })
        .catch(function(resp) { 
          // handle error response
          console.log(resp);
    });


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $auth, $rootScope) {
  

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];


})




.controller('PlaylistCtrl', function($scope, $stateParams, $http) {
  console.log($stateParams.Id);
  var url = "http://localhost:3000/posts/"+$stateParams.Id;

  $http.get(url)
    .success(function(posts){
      console.log(posts);
      $scope.post = posts;
    })
    .error(function(err){
      console.log(err);
    });

})

.controller('CrearPostCtrl', function($scope, $auth, $http, $cordovaGeolocation) {
    
  console.log('holaasd');

  var url = "http://localhost:3000/posts";
  $scope.postData = {};
  $scope.crearPost = function () {
    $scope.infos = {
      titulo : $scope.postData.titulo,
      cuerpo : $scope.postData.cuerpo
    }

    $http.post(url, $scope.infos).
      success(function(data, status, headers, config) {
        $scope.postData = {};
      }).
        error(function(data, status, headers, config) {
          console.log(data.titulo);
          if (status == 422) {
          };
    });
  };
})

.controller('SearchCtrl', function($scope, $rootScope, $auth, $http) {
  console.log($auth.validateUser());
  var url = "http://localhost:3000/posts";

  $http.get(url)
    .success(function(posts){
      console.log(posts);
      $scope.todosPosts = posts;
    })
    .error(function(err){
      console.log(err);
    });

});
