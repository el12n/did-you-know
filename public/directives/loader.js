'use strict'

angular.module('triviaApp')
.directive('loader', function(){
    return {
        templateUrl: 'templates/loader.html',
        replace: true
    };
});