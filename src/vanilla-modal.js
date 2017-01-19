const _ = require('lodash/core');
_.includes = require('lodash/includes');

class ModalClass{
  constructor(config = {}, init = true){
    this.config = _.defaults(config,
      {closeClass: 'modal-close'
      , contentClass: 'modal-content'
      , overlayClass: 'modal-overlay'
      , sourceClass: 'modal-source'
      , toggleClass: 'modal-toggle'
      }
    );

    if (init){
      this._init();
    }
  }

  _init(){
    this.open = false;
    this._render();
  }

  _render(){
    this._getSource();
    this._getToggle();

    if (this.toggle && this.source){
      this._createOverlay();
    }
  }

  _addCloseClickListener(){
    this.close.addEventListener('click', this._closeClick.bind(this), false);
  }

  _addOverlayClickListener(){
    /* eslint-disable max-len */
    this.overlay.addEventListener('click', this._overlayClick.bind(this), false);
    /* eslint-enable */
  }

  _addOverlayTouchListener(){
    /* eslint-disable max-len */
    this.overlay.addEventListener('touchstart', this._overlayTouch.bind(this), false);
    /* eslint-enable */
  }

  _addToggleClickListener(){
    this.toggle.addEventListener('click', this._toggleClick.bind(this), false);
  }

  _appendOverlay(){
    document.body.appendChild(this.overlay);

    _.delay(()=>{
      this._setContentClass();
      this._setOverlayClass();
    }, 100);
  }

  _closeClick(e){
    e.preventDefault();

    this._setModalVisibility();
  }

  _createClose(){
    let span = document.createElement('span');
    this.close = document.createElement('a');

    span.innerHTML = 'close';

    this.close.className = this.config.closeClass;
    this.close.setAttribute('href', '#');
    this.close.appendChild(span);

    this._addCloseClickListener();

    this.content.appendChild(this.close);
  }

  _createContent(){
    this.content = document.createElement('div');

    this.content.className = this.config.contentClass;

    this.content.innerHTML = this.source.innerHTML;

    this._createClose();

    this.overlay.appendChild(this.content);
  }

  _createOverlay(){
    this.overlay = document.createElement('div');

    this.overlay.className = this.config.overlayClass;

    this._addOverlayClickListener();
    this._addOverlayTouchListener();

    this._createContent();
  }

  _getSource(){
    /* eslint-disable max-len */
    this.source = this.config.element.querySelector('.' + this.config.sourceClass);
    /* eslint-enable */
  }

  _getToggle(){
    /* eslint-disable max-len */
    this.toggle = this.config.element.querySelector('.' + this.config.toggleClass);
    /* eslint-enable */

    this._addToggleClickListener();
  }

  _lazyLoadImages(){
    let images = this.content.querySelectorAll('img');

    _.forEach(images, (image)=>{
      let dataSrc = image.getAttribute('data-src');
      let src = image.getAttribute('src');

      if (dataSrc && _.isEmpty(src)){
        image.src = dataSrc;
      }
    });
  }

  _overlayClick(e){
    if (e.target === this.overlay && this.open){
      e.preventDefault();

      this._setModalVisibility();
    }
  }

  _overlayTouch(e){
    if (e.touches.length === 2){
      e.preventDefault();
    }
  }

  _removeOverlay(){
    this._setOverlayClass();
    this._setContentClass();

    _.delay(()=>{
      document.body.removeChild(this.overlay);
    }, 500);
  }

  _setContentClass(){
    let className = this.content.className;

    if (_.includes(className, 'active')){
      this.content.className = className.replace(/(?:^|\s)active(?!\S)/g, '');
    } else {
      this.content.className += ' active';
    }
  }

  _setHTMLClass(){
    let html = document.getElementsByTagName('html')[0];
    let className = html.className;

    if (_.includes(className, 'modal-open')){
      html.className = className.replace(/(?:^|\s)modal-open(?!\S)/g, '');
    } else {
      html.className += ' modal-open';
    }
  }

  _setModalVisibility(){
    if (this.open){
      this._removeOverlay();
    } else {
      this._appendOverlay();
    }

    this._setHTMLClass();
    this._setOpenState();
  }

  _setOpenState(){
    this.open = !this.open;
  }

  _setOverlayClass(){
    let className = this.overlay.className;

    if (_.includes(className, 'active')){
      this.overlay.className = className.replace(/(?:^|\s)active(?!\S)/g, '');
    } else {
      this.overlay.className += ' active';
    }
  }

  _toggleClick(e){
    e.preventDefault();

    this._lazyLoadImages();
    this._setModalVisibility();
  }
}

module.exports = ModalClass;
