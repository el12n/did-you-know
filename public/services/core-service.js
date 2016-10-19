'use strict'

angular.module('triviaApp')
.constant('baseApiUrl', 'http://numbersapi.com/random/trivia?json')
.factory('coreService', function($http, $cookieStore, baseApiUrl){
    return {
        getFacts: function(){
            return $http({
                method:'GET',
                url: baseApiUrl
            })
        },
        getRandomColor: function(){
            var colors = [
                'orange',
                'brown',
                'green',
                'teal',
                'red',
                'indigo',
                'light-green',
                'light-blue'
                ];
            var min = 0, max = colors.length - 1;
            var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            return colors[randomNumber];
        },
        getLiked: function(){
          return $cookieStore.get('likeIt');  
        },
        toggleLike: function(liked){
            liked = !liked;
            $cookieStore.put('likeIt', liked);
            return liked;
        }
    }
});