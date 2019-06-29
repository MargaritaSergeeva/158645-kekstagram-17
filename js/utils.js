'use strict';

(function () {
  window.utils = {
    showElement: function (element) {
      if (element) {
        element.classList.remove('hidden');
      }
    },

    closeElement: function (element) {
      if (element) {
        element.classList.add('hidden');
      }
    },

    getRandomValue: function (arr) {
      if (arr.length > 0) {
        return arr[Math.round(-0.5 + Math.random() * arr.length)];
      }

      return 0;
    },

    resetBlockPosition: function (element) {
      element.style.top = '';
      element.style.left = '';
    },

    getMaxElement: function (arr) {
      var maxElement = arr[0];

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }

      return maxElement;
    },

    resetInputValue: function (input) {
      if (input) {
        input.value = '';
      }
    },

    resetElementStyle: function (element, selector) {
      if (element) {
        element.style[selector] = '';
      }
    },

    assignElementClass: function (element, elementClass) {
      if (element) {
        element.className = elementClass;
      }
    },

    getBlockLeftPosition: function (element) {
      var leftPosition = '';

      if (element) {
        leftPosition = element.getBoundingClientRect().left;
      }

      return leftPosition;
    },

    getBlockRightPosition: function (element) {
      var rightPosition = '';

      if (element) {
        rightPosition = element.getBoundingClientRect().right;
      }

      return rightPosition;
    }
  };
})();
