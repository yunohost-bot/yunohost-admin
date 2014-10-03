;(function(y18n){
    "use strict";

    // Default options
    var defaultOptions = {
        defaultLocale: "en",
        locale: "en",
        placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
        translations: {
          'en' : {}
        },
    }

    var concatObject= function (o1,o2) {
        for(var k in o2) o1[k]=o2[k];
    }


    /**
     * Initialization
     */
    y18n.init = function() {
        // Merge options with defaults.
        for (var key in defaultOptions) {
            y18n[key] = (typeof y18n[key] !== 'undefined') ? y18n[key] : defaultOptions[key];
        }

        // User defined locale
        if (window.navigator && window.navigator.language) {
            y18n.locale = window.navigator.language.substr(0, 2);
        }
    }
    y18n.init();


    /**
     * HTML Inline translation
     */
    y18n.translateInlineHTML = function(){
      // Inner HTML
      [].forEach.call(
        document.querySelectorAll('[data-y18n]'),
        function(el){
          el.innerText = y18n.translate(el.getAttribute('data-y18n'))
        }
      );

      // Attributes
      [].forEach.call(
        document.querySelectorAll('[data-y18n-title]'),
        function(el){
          el.title = y18n.translate(el.getAttribute('data-y18n-title'))
        }
      );
    }

    y18n.loadLocales = function(basePath) {
      // Default
      basePath = basePath || '';

      $.getJSON(basePath+'locales/'+y18n.defaultLocale+'.json', function(data){
        concatObject(y18n.translations[y18n.defaultLocale], data);
        y18n.translateInlineHTML();
      });

      // User defined language
      if (y18n.locale !== 'en') {
        y18n.translations[y18n.locale] = y18n.translations[y18n.locale] || {}
        $.getJSON(basePath+'locales/'+ y18n.locale +'.json', function(data){
          concatObject(y18n.translations[y18n.locale], data);
          y18n.translateInlineHTML();
        });
      }
    }

    /**
     * Translation
     */
    y18n.translate = function(key, options) {
        options = options || {'locale' : y18n.locale};
        options.locale = options.locale || y18n.locale;

        // Get translation
        var translation = this.lookup(key, options);

        // Translation fallback
        if ((typeof translation === 'undefined' || translation === key) && options.locale !== y18n.defaultLocale) {
            options.locale = y18n.defaultLocale;
            return this.translate(key, options);
        }

        // Variables remplacement
        return (translation) ? translation.printf(options) : key;
    }

    y18n.lookup = function(key, options) {
        // Default locale
        if (typeof options.locale === 'undefined') {
            options.locale = y18n.locale;
        }

        // Get translation string
        if (typeof y18n.translations[options.locale] !== 'undefined') {
            if (typeof y18n.translations[options.locale][key] !== 'undefined') {
                return y18n.translations[options.locale][key];
            }
        }
    }

    // Save some typing
    y18n.t = y18n.translate;

})(typeof(exports) === 'undefined' ? (this.y18n || (this.y18n = {})) : exports);

// http://monocleglobe.wordpress.com/2010/01/12/everybody-needs-a-little-printf-in-their-javascript/
String.prototype.printf = function (obj) {
  var useArguments = false;
  var _arguments = arguments;
  var i = -1;
  if (typeof _arguments[0] == "string") {
    useArguments = true;
  }
  if (obj instanceof Array || useArguments) {
    return this.replace(/\%s/g,
    function (a, b) {
      i++;
      if (useArguments) {
        if (typeof _arguments[i] == 'string') {
          return _arguments[i];
        }
        else {
          throw new Error("Arguments element is an invalid type");
        }
      }
      return obj[i];
    });
  }
  else {
    return this.replace(/{([^{}]*)}/g,
    function (a, b) {
      var r = obj[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
  }
};
