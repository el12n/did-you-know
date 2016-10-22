'use strict'

angular.module('triviaApp')
.controller('mainCtrl', function($scope, coreService, languageService){
    $scope.fact;
    
    $scope.liked = coreService.getLiked();
    $scope.color = 'blue';
    $scope.isLoading;
    
    $scope.supportedLanguages = languageService.supportedLanguages;
    $scope.selectedLanguage = languageService.getSelectedLangague();
    
    $scope.refreshFact = function(){
        $scope.isLoading = true;
        coreService.getFacts($scope.selectedLanguage)
            .success(function(data){
                $scope.isLoading = false;
                setFact(data, true);
            });
    }
    
    function setFact(fact, changeColor){
        $scope.fact = fact;
        if(changeColor){
            $scope.color = coreService.getRandomColor();
        }
    }
    
    $scope.iLikeIt = function(){
        $scope.liked = coreService.toggleLike($scope.liked);
        if ($scope.liked) {
            makeToast('Yeah! now buy me a beer', 1.5);
        }else{
            makeToast('Yikes! :c', 1.5);
        }
    }
    
    $scope.selectLanguage = function(language){
        $scope.selectedLanguage = language;
        languageService.saveSelectedLanguage(language);
        languageService.translate($scope.fact, language.code)
            .success(function(fact){
                setFact(fact, false);
            });
    }
    
    function makeToast(message, time){
        Materialize.toast(message, time*1000, 'rounded');
    }
    
    var init = function(){
        $scope.refreshFact();
    };
    
    init();
    
});