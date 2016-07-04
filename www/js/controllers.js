angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $ionicLoading, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $ionicLoading.show();
  Chats.all().then(function(resp) {
    $scope.chats = resp.data;
    
    $ionicLoading.hide();
  });
  
  $scope.remove = function(chat) {
    $ionicLoading.show();
    
    Chats.remove(chat).then(function(resp) {
      $scope.chats = resp.data;
      
      $ionicLoading.hide();
    });
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
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
