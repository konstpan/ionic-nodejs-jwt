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
});
