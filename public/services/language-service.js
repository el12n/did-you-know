'use strict'

angular.module('triviaApp')
.constant('translateUrl', 'https://translate.yandex.net/api/v1.5/tr.json/translate?key={0}&text={1}&lang={2}-{3}&[callback=JSON]')
.constant('yandexTranlateApiKey', 'trnsl.1.1.20161018T172437Z.81ae07a7901a9f77.945a1edf3d86891a939cdf2e6358442ac5810d28')
.factory('languageService', function($http, $cookieStore, yandexTranlateApiKey, translateUrl){
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
                url: translateUrl.format(yandexTranlateApiKey, fact.value, fact.lang, target)
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