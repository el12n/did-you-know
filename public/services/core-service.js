'use strict'

angular.module('triviaApp')
.constant('baseApiUrl','/api')
.factory('coreService', function($http, $cookieStore, baseApiUrl){
    return {
        getFacts: function(lang){
            var finalUrl = lang.code === 'en' ? baseApiUrl+"/fact" : baseApiUrl+"/fact?lang="+lang.code;
            return $http({
                method:'GET',
                url: finalUrl
            })
        },
        getColors: function(){
            if(!$cookieStore.get('colors')){
                $http({
                    method:'GET',
                    url: baseApiUrl+'/colors'
                })
                .success(function(data){
                    $cookieStore.put('colors', data);
                });
            }
        },
        getRandomColor: function(){
            var colors = $cookieStore.get('colors');
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