'use strict'

angular.module('triviaApp')
.constant('baseApiUrl','/api/fact')
.factory('coreService', function($http, $cookieStore, baseApiUrl){
    return {
        getFacts: function(lang){
            var finalUrl = lang.code === 'en' ? baseApiUrl : baseApiUrl+"?lang="+lang.code;
            return $http({
                method:'GET',
                url: finalUrl
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