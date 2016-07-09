angular.module('starter.services', [])

.factory('Chats', function($http) {
  return {
    all: function() {
      return $http.get('http://localhost:8180/api/chats');
    },
    remove: function(chat) {
      return $http.delete('http://localhost:8180/api/chats/' + chat.id);
    },
    get: function(chatId) {
      return $http.get('http://localhost:8180/api/chats/' + chatId);
    }
  };
})

.factory('AuthService', function($http) {
	var authService = {};

	authService.isAuthenticated = false;
	authService.jwt = '';
	
	authService.login = function(user) {
		return $http.post('http://localhost:8180/api/authenticate', {user: user})
		.then(function(res) {
			authService.isAuthenticated = true;
			authService.jwt = res.data.token;
			
			// Set the jwt in authorization header for all subsequent requests
			$http.defaults.headers.common.Authorization = 'Bearer ' + authService.jwt;
		
			return res.data.token;
    });
	};
	
	authService.logout = function() {
		authService.isAuthenticated = false;
		authService.jwt = '';
		$http.defaults.headers.common.Authorization = undefined;
	};
	
	return authService;
});