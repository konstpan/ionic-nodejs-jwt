angular.module('starter.controllers', [])

// top level controller
.controller('AppCtrl', function($scope, $state, AuthService) {
	$scope.logout = function() {
		AuthService.logout();
		$state.go('login');
	};
})

.controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, $http, $ionicLoading, AuthService) {
	$scope.login = function(user) {
		$ionicLoading.show();
		
    AuthService.login(user).then(function(token) {
			$ionicLoading.hide();
			
			$state.go('tab.dash');
		}, function() {
			$ionicLoading.hide();
			
			$ionicPopup.alert({
        title: 'Authentication Error',
        template: 'Wrong username or password'
      });
		});
	};
})

.controller('ChatsCtrl', function($scope, $ionicLoading, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	$scope.remove = function(chat) {
    $ionicLoading.show();
    
    Chats.remove(chat).then(function(chats) {
			$scope.chats = chats;

			$ionicLoading.hide();
		});
  };
	
  $ionicLoading.show();
  Chats.all().then(function(chats) {
		$scope.chats = chats;

		$ionicLoading.hide();
	});
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $ionicLoading,
    Chats) {
  $ionicLoading.show();
  
  Chats.get($stateParams.chatId).then(function(chat) {
    $scope.chat = chat;
    
    $ionicLoading.hide();
  });
});