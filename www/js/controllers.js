angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, $http) {
  $scope.login = function(user) {
    $http({
      method: 'POST',
      url: 'http://localhost:8180/api/authenticate',
      data: {user: user}
    }).then(function(resp) {
      $state.go('tab.dash');
    }, function() {
      $ionicPopup.alert({
        title: 'Authentication Error',
        template: 'Can\'t find user'
      });
    });
  };
})

.controller('ChatsCtrl', function($scope, $ionicLoading, $ionicPopup, $state, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $ionicLoading.show();
  Chats.all().then(
    function success(resp) {
      $scope.chats = resp.data;
    
      $ionicLoading.hide();
    },
    function error(resp) {
      $ionicLoading.hide();
      
      $ionicPopup.alert({
        title: 'Authentication Error',
        template: 'You must be logged in.'
      }).then(function() {
        $state.go('login')
      });
    }
  );
  
  $scope.remove = function(chat) {
    $ionicLoading.show();
    
    Chats.remove(chat).then(
      function success(resp) {
        $scope.chats = resp.data;
      
        $ionicLoading.hide();
      },
      function error(resp) {
        $ionicLoading.hide();
        
        $ionicPopup.alert({
          title: 'Authentication Error',
          template: 'You must be logged in.'
        }).then(function() {
          $state.go('login')
        });
      }
    );
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $ionicLoading,
    Chats) {
  $ionicLoading.show();
  
  Chats.get($stateParams.chatId)
  .then(function(resp) {
    $scope.chat = resp.data;
    
    $ionicLoading.hide();
  });
});