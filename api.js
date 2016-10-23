var express = require('express');
var rp = require('request-promise')

var router = express.Router();


const YANDEX_TRANSLATE_API_KEY = 'trnsl.1.1.20161018T172437Z.81ae07a7901a9f77.945a1edf3d86891a939cdf2e6358442ac5810d28';
const YANDEX_API_BASE_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate'

const FACT_URL = 'http://numbersapi.com/random/trivia?json';

const COLORS = [
        {
            name: 'orange',
            hex: '#ff9800'
        },
        {
            name: 'brown',
            hex: '#795548'
        },
        {
            name: 'green',
            hex: '#4caf50'
        },
        {
            name: 'teal',
            hex: '#009688'
        },
        {
            name: 'red',
            hex: '#f44336'
        },
        {
            name: 'indigo',
            hex: '#3f51b5'
        },
        {
            name: 'light-green',
            hex: '#8bc34a'
        },
        {
            name: 'light-blue',
            hex: '#03a9f4'
        },
    ]

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined' ? args[number]: match;
        });
    };
}

router.use(function(req, res, next){
    console.log(req.method + " -> "+req.originalUrl);
    next();
});

router.get('/colors',function(req, res){
    res.json(COLORS);
});

router.get('/fact', function(req, res) {
    var lang = req.query.lang;
    rp(getFactOptions())
        .then(function(data) {
            var text = data.text;
            if(lang != undefined){
                rp(getTranslateOptions(text, 'en', lang))
                    .then(function(data) {
                        res.json({
                            value: data.text[0],
                            lang: lang
                        });
                    })
                    .catch(function(error){
                        console.log("Something went wrong: "+error);
                    });
            }else{
                res.json({
                    value:text,
                    lang:'en'
                })
            }
        })
        .catch(function(error){
            console.log("Something went wrong: "+error);
        });
});

router.get('/translate', function(req, res){
    var value = req.query.value,
        lang = req.query.lang,
        target = req.query.target;
    
    if((value || lang || target) != undefined){    
        rp(getTranslateOptions(value,lang,target))
            .then(function(data){
                res.json({
                value: data.text[0],
                lang: target
                });
            })
            .catch(function(error){
                console.log("Something went wrong: "+error);
            });
    }else{
        res.json({
            message: "Params have not been sent"
        });
    }
});

function getTranslateOptions(text, lang, target){
    return {
        uri: YANDEX_API_BASE_URL,
        qs: {
            key: YANDEX_TRANSLATE_API_KEY,
            text: text,
            lang: '{0}-{1}'.format(lang, target)
        },
        json: true
    }
}

function getFactOptions(){
    return {
        uri: FACT_URL,
        json: true
    }
}

module.exports = router