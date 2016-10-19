/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict'

	angular.module('triviaApp', ['ngCookies']);

	if (!String.prototype.format) {
	    String.prototype.format = function() {
	        var args = arguments;
	        return this.replace(/{(\d+)}/g, function(match, number) { 
	            return typeof args[number] != 'undefined' ? args[number]: match;
	        });
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict'

	angular.module('triviaApp')
	.directive('loader', function(){
	    return {
	        templateUrl: 'templates/loader.html',
	        replace: true
	    };
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);