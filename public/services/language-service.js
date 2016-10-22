'use strict'

angular.module('triviaApp')
.constant('translateUrl', $window.location.pathname+'/api/translate?value={0}&lang={1}&target={2}')
.factory('languageService', function($http, $cookieStore, translateUrl){
    return {
        supportedLanguages: [
                { 
                    name: "English",
                    code: "en"
                },
                {
                    name: "Spanish",
                    code: "es"
                },
                {
                    name: "French",
                    code: "fr"
                }
            ],
        translate: function(fact, target){
            return $http({
                method: 'GET',
                url: translateUrl.format(fact.value, fact.lang, target)
            });
        },
        getSelectedLangague: function(){
          var language = $cookieStore.get('selectedLanguage') ? $cookieStore.get('selectedLanguage') : this.supportedLanguages[0];
          return language;
        },
        saveSelectedLanguage: function(language){
            $cookieStore.put('selectedLanguage', language);
        }
    }
});