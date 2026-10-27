(function () {
  'use strict';
  var dataNode = document.getElementById('site-language-data');
  if (!dataNode) return;
  var pairs;
  try { pairs = JSON.parse(dataNode.textContent); } catch (error) { return; }
  if (!Array.isArray(pairs)) return;

  var normalize = function (value) { return value.replace(/\s+/g, ' ').trim(); };
  var translations = new Map();
  pairs.forEach(function (pair) {
    if (typeof pair.en !== 'string' || typeof pair.pt !== 'string') return;
    translations.set(normalize(pair.en), pair);
    translations.set(normalize(pair.pt), pair);
  });

  var originalText = new WeakMap();
  var originalAttributes = new WeakMap();
  var originalTitle = document.title;
  var protectedSelectors = 'script,style,pre,code,textarea,[data-no-translate],[data-content-language],[data-language-status],.publication-citation__text,.archive__item-title';
  var englishMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function translatedValue(original, language) {
    var value = normalize(original);
    var pair = translations.get(value);
    if (pair) return pair[language];
    if (language === 'en') return original;
    var date = /^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4})$/.exec(value);
    if (date) {
      return new Intl.DateTimeFormat('pt-BR', {day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})
        .format(new Date(Date.UTC(Number(date[3]), englishMonths.indexOf(date[1]), Number(date[2]))));
    }
    if (/^Site last updated \d{4}-\d{2}-\d{2}$/.test(value)) return value.replace('Site last updated', 'Site atualizado em');
    if (/^©.*\bPowered by$/.test(value)) return value.replace(/Powered by$/, 'Desenvolvido com');
    if (/^,?\s*a fork of$/.test(value)) return value.replace('a fork of', 'derivado de');
    return original;
  }

  function keepWhitespace(original, translated) {
    if (translated === original) return original;
    return (original.match(/^\s*/) || [''])[0] + translated + (original.match(/\s*$/) || [''])[0];
  }

  function translateBody(language) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || node.parentElement.closest(protectedSelectors)) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      var original = originalText.get(node);
      node.nodeValue = keepWhitespace(original, translatedValue(original, language));
    }
    document.querySelectorAll('[aria-label],[title]').forEach(function (element) {
      if (element.closest(protectedSelectors)) return;
      if (!originalAttributes.has(element)) {
        originalAttributes.set(element, {label: element.getAttribute('aria-label'), title: element.getAttribute('title')});
      }
      var original = originalAttributes.get(element);
      if (original.label !== null) element.setAttribute('aria-label', translatedValue(original.label, language));
      if (original.title !== null) element.setAttribute('title', translatedValue(original.title, language));
    });
    var updatedTitle = originalTitle;
    var titleNode = document.querySelector('title[data-site-name]');
    if (titleNode) {
      var siteName = titleNode.getAttribute('data-site-name');
      var separator = ' ' + titleNode.getAttribute('data-title-separator') + ' ';
      var pageTitle = titleNode.getAttribute('data-page-title') || '';
      var hasPageTitle = pageTitle && pageTitle !== siteName;
      var originalBase = siteName + (hasPageTitle ? separator + pageTitle : '');
      var suffix = originalTitle.indexOf(originalBase) === 0 ? originalTitle.slice(originalBase.length) : '';
      updatedTitle = siteName + (hasPageTitle ? separator + translatedValue(pageTitle, language) : '') + suffix;
    } else {
      translations.forEach(function (pair) {
        if (originalTitle === pair.en || originalTitle.indexOf(pair.en + ' - ') === 0) {
          updatedTitle = pair[language] + originalTitle.slice(pair.en.length);
        }
      });
    }
    document.title = updatedTitle;
    document.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"]').forEach(function (meta) {
      meta.setAttribute('content', updatedTitle);
    });
  }

  function setLanguage(language, updateURL) {
    if (language !== 'en' && language !== 'pt') return;
    document.documentElement.dataset.siteLanguage = language;
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    translateBody(language);
    try { window.localStorage.setItem('rp-site-language', language); } catch (error) {}
    document.querySelectorAll('[data-language-choice]').forEach(function (choice) {
      choice.setAttribute('aria-pressed', String(choice.dataset.languageChoice === language));
    });
    document.querySelectorAll('[data-language-status]').forEach(function (status) {
      status.textContent = language === 'pt' ? 'Idioma: Português' : 'Language: English';
    });
    if (updateURL) {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('lang', language);
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch (error) {}
    }
    window.requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
    document.dispatchEvent(new CustomEvent('site:languagechange', {detail: {language: language}}));
  }

  document.querySelectorAll('[data-language-choice]').forEach(function (choice) {
    choice.addEventListener('click', function (event) {
      event.preventDefault();
      setLanguage(choice.dataset.languageChoice, true);
    });
    choice.addEventListener('keydown', function (event) {
      if (event.key === ' ') { event.preventDefault(); choice.click(); }
    });
  });
  window.SiteLanguage = {setLanguage: setLanguage, getLanguage: function () { return document.documentElement.dataset.siteLanguage; }};
  setLanguage(document.documentElement.dataset.siteLanguage === 'pt' ? 'pt' : 'en', false);
}());

