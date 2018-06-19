
function loadScript(scriptPath){
  // polyfill the platform!
  var e = document.createElement('script');
  e.src = scriptPath;
  document.body.appendChild(e);
}

(function() {
  if ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')) {
      loadScript('/js/application.js')
  } else {
    window.addEventListener('WebComponentsReady', function(e) {
      loadScript('/js/application.js')
    });
  }
})();
