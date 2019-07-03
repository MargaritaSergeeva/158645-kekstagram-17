'use strict';

(function () {
  window.backend = {
    load: function (url, onLoad, onError) {
      window.variables.xhr.responseType = 'json';

      window.variables.xhr.addEventListener('load', function () {
        if (window.variables.xhr.status === window.constants.SUCСESS__STATUS) {
          onLoad(window.variables.xhr.response);
        } else {
          onError('Статус ответа сервера: ' + window.variables.xhr.status);
        }
      });

      window.variables.xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      window.variables.xhr.open('GET', url);
      window.variables.xhr.send();
    }
  };
})();
