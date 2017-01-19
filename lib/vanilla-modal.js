'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash/core');
_.includes = require('lodash/includes');

var ModalClass = function () {
  function ModalClass() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, ModalClass);

    this.config = _.defaults(config, { closeClass: 'modal-close',
      contentClass: 'modal-content',
      overlayClass: 'modal-overlay',
      sourceClass: 'modal-source',
      toggleClass: 'modal-toggle'
    });

    if (init) {
      this._init();
    }
  }

  _createClass(ModalClass, [{
    key: '_init',
    value: function _init() {
      this.open = false;
      this._render();
    }
  }, {
    key: '_render',
    value: function _render() {
      this._getSource();
      this._getToggle();

      if (this.toggle && this.source) {
        this._createOverlay();
      }
    }
  }, {
    key: '_addCloseClickListener',
    value: function _addCloseClickListener() {
      this.close.addEventListener('click', this._closeClick.bind(this), false);
    }
  }, {
    key: '_addOverlayClickListener',
    value: function _addOverlayClickListener() {
      /* eslint-disable max-len */
      this.overlay.addEventListener('click', this._overlayClick.bind(this), false);
      /* eslint-enable */
    }
  }, {
    key: '_addOverlayTouchListener',
    value: function _addOverlayTouchListener() {
      /* eslint-disable max-len */
      this.overlay.addEventListener('touchstart', this._overlayTouch.bind(this), false);
      /* eslint-enable */
    }
  }, {
    key: '_addToggleClickListener',
    value: function _addToggleClickListener() {
      this.toggle.addEventListener('click', this._toggleClick.bind(this), false);
    }
  }, {
    key: '_appendOverlay',
    value: function _appendOverlay() {
      var _this = this;

      document.body.appendChild(this.overlay);

      _.delay(function () {
        _this._setContentClass();
        _this._setOverlayClass();
      }, 100);
    }
  }, {
    key: '_closeClick',
    value: function _closeClick(e) {
      e.preventDefault();

      this._setModalVisibility();
    }
  }, {
    key: '_createClose',
    value: function _createClose() {
      var span = document.createElement('span');
      this.close = document.createElement('a');

      span.innerHTML = 'close';

      this.close.className = this.config.closeClass;
      this.close.setAttribute('href', '#');
      this.close.appendChild(span);

      this._addCloseClickListener();

      this.content.appendChild(this.close);
    }
  }, {
    key: '_createContent',
    value: function _createContent() {
      this.content = document.createElement('div');

      this.content.className = this.config.contentClass;

      this.content.innerHTML = this.source.innerHTML;

      this._createClose();

      this.overlay.appendChild(this.content);
    }
  }, {
    key: '_createOverlay',
    value: function _createOverlay() {
      this.overlay = document.createElement('div');

      this.overlay.className = this.config.overlayClass;

      this._addOverlayClickListener();
      this._addOverlayTouchListener();

      this._createContent();
    }
  }, {
    key: '_getSource',
    value: function _getSource() {
      /* eslint-disable max-len */
      this.source = this.config.element.querySelector('.' + this.config.sourceClass);
      /* eslint-enable */
    }
  }, {
    key: '_getToggle',
    value: function _getToggle() {
      /* eslint-disable max-len */
      this.toggle = this.config.element.querySelector('.' + this.config.toggleClass);
      /* eslint-enable */

      this._addToggleClickListener();
    }
  }, {
    key: '_lazyLoadImages',
    value: function _lazyLoadImages() {
      var images = this.content.querySelectorAll('img');

      _.forEach(images, function (image) {
        var dataSrc = image.getAttribute('data-src');
        var src = image.getAttribute('src');

        if (dataSrc && _.isEmpty(src)) {
          image.src = dataSrc;
        }
      });
    }
  }, {
    key: '_overlayClick',
    value: function _overlayClick(e) {
      if (e.target === this.overlay && this.open) {
        e.preventDefault();

        this._setModalVisibility();
      }
    }
  }, {
    key: '_overlayTouch',
    value: function _overlayTouch(e) {
      if (e.touches.length === 2) {
        e.preventDefault();
      }
    }
  }, {
    key: '_removeOverlay',
    value: function _removeOverlay() {
      var _this2 = this;

      this._setOverlayClass();
      this._setContentClass();

      _.delay(function () {
        document.body.removeChild(_this2.overlay);
      }, 500);
    }
  }, {
    key: '_setContentClass',
    value: function _setContentClass() {
      var className = this.content.className;

      if (_.includes(className, 'active')) {
        this.content.className = className.replace(/(?:^|\s)active(?!\S)/g, '');
      } else {
        this.content.className += ' active';
      }
    }
  }, {
    key: '_setHTMLClass',
    value: function _setHTMLClass() {
      var html = document.getElementsByTagName('html')[0];
      var className = html.className;

      if (_.includes(className, 'modal-open')) {
        html.className = className.replace(/(?:^|\s)modal-open(?!\S)/g, '');
      } else {
        html.className += ' modal-open';
      }
    }
  }, {
    key: '_setModalVisibility',
    value: function _setModalVisibility() {
      if (this.open) {
        this._removeOverlay();
      } else {
        this._appendOverlay();
      }

      this._setHTMLClass();
      this._setOpenState();
    }
  }, {
    key: '_setOpenState',
    value: function _setOpenState() {
      this.open = !this.open;
    }
  }, {
    key: '_setOverlayClass',
    value: function _setOverlayClass() {
      var className = this.overlay.className;

      if (_.includes(className, 'active')) {
        this.overlay.className = className.replace(/(?:^|\s)active(?!\S)/g, '');
      } else {
        this.overlay.className += ' active';
      }
    }
  }, {
    key: '_toggleClick',
    value: function _toggleClick(e) {
      e.preventDefault();

      this._lazyLoadImages();
      this._setModalVisibility();
    }
  }]);

  return ModalClass;
}();

module.exports = ModalClass;
//# sourceMappingURL=vanilla-modal.js.map