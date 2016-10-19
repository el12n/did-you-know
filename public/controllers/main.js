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
                var fact = {
                    value: data.text,
                    lang: 'en'
                };
                
                if($scope.selectedLanguage.code === 'en'){
                    $scope.isLoading = false;
                    setFact(fact, true);
                }else{
                    languageService.translate(fact, $scope.selectedLanguage.code)
                        .success(function(dataTranslated){
                            $scope.isLoading = false;
                            setFact({
                                value: dataTranslated.text[0],
                                lang: $scope.selectedLanguage.code
                            }, true);
                        });
                }
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
            .success(function(dataTranslated){
                setFact({
                    value: dataTranslated.text[0],
                    lang: $scope.selectedLanguage.code
                }, false);
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