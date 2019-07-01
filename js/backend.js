'use strict';

(function () {
  var SUCСESS__STATUS = 200;
  var MAX_TIMEOUT = 10000;

  window.backend = {
    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCСESS__STATUS) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа сервера: ' + xhr.status);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = MAX_TIMEOUT;

      xhr.open('GET', url);
      xhr.send();
    }
  };
})();
