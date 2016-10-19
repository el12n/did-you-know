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
        coreService.getFacts()
            .success(function(data){
                if($scope.selectedLanguage.code === 'en'){
                    $scope.isLoading = false;
                    setFact(data.text);
                }else{
                    languageService.translate(data.text, $scope.selectedLanguage.code)
                        .success(function(dataTranslated){
                            $scope.isLoading = false;
                            setFact(dataTranslated.text[0]);
                        });
                }
            });
    }
    
    function setFact(fact){
        $scope.fact = fact;
        $scope.color = coreService.getRandomColor();
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
        
        makeToast("Changes will show when new facts", 3);
    }
    
    function makeToast(message, time){
        Materialize.toast(message, time*1000, 'rounded');
    }
    
    var init = function(){
        $scope.refreshFact();
    };
    
    init();
    
});