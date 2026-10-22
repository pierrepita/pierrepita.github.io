(function () {
  'use strict';
  var selected = 'en';
  try {
    var requested = new URLSearchParams(window.location.search).get('lang');
    var saved = window.localStorage.getItem('rp-site-language');
    if (requested === 'en' || requested === 'pt') selected = requested;
    else if (saved === 'en' || saved === 'pt') selected = saved;
  } catch (error) {
    // Language selection still works when browser storage is unavailable.
    try {
      var queryLanguage = new URLSearchParams(window.location.search).get('lang');
      if (queryLanguage === 'en' || queryLanguage === 'pt') selected = queryLanguage;
    } catch (ignored) {}
  }
  document.documentElement.dataset.siteLanguage = selected;
  document.documentElement.lang = selected === 'pt' ? 'pt-BR' : 'en';
}());
