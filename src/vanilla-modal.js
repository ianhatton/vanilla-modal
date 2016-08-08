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
    this.overlayClick = this._overlayClick.bind(this);
    this._render();
  }

  _render(){
    this._getSource();
    this._getToggle();
  }

  _addOverlayClickListener(){
    this.overlay.addEventListener('click', this.overlayClick, {capture: false, once: true});
  }

  _addToggleClickListener(){
    this.toggle.addEventListener('click', this._toggleClick.bind(this), false);
  }

  _appendOverlay(){
    document.body.appendChild(this.overlay);

    _.delay(()=>{
      this._toggleModalClass();
      this._toggleOverlayClass();
    }, 100);
  }

  _overlayClick(e){
    e.preventDefault();

    if(e.target === this.overlay){
      this._toggleModal();
    }
  }

  _createModal(){
    this.modal = document.createElement('div');

    this.modal.className += this.config.contentClass;

    this.modal.innerHTML = this.source.innerHTML;

    this.overlay.appendChild(this.modal);
  }

  _createOverlay(){
    this.overlay = document.createElement('div');

    this.overlay.className += this.config.overlayClass;

    this._createModal();
  }

  _getSource(){
    /* eslint-disable max-len */
    this.source = this.config.element.querySelector('.' + this.config.sourceClass);
    /* eslint-enable */

    this._createOverlay();
  }

  _getToggle(){
    /* eslint-disable max-len */
    this.toggle = this.config.element.querySelector('.' + this.config.toggleClass);
    /* eslint-enable */

    this._addToggleClickListener();
  }

  _removeOverlay(){
    this._toggleOverlayClass();
    this._toggleModalClass();

    _.delay(()=>{
      document.body.removeChild(this.overlay);
    }, 500);
  }

  _setModalPosition(){
    let position = 40;

    this.modal.style.top = position + 'px';
  }

  _toggleBodyClass(){
    let className = document.body.className;

    if(_.includes(className, 'modal-open')){
      document.body.className = className.replace(/(?:^|\s)modal-open(?!\S)/g, '');
    } else {
      document.body.className += ' modal-open';
    }
  }

  _toggleClick(e){
    e.preventDefault();

    this._toggleModal();
  }

  _toggleOverlayClass(){
    let className = this.overlay.className;

    if(_.includes(className, 'active')){
      this.overlay.className = className.replace(/(?:^|\s)active(?!\S)/g, '');
    } else {
      this.overlay.className += ' active';
    }
  }

  _toggleModalClass(){
    let className = this.modal.className;

    if(_.includes(className, 'active')){
      this.modal.className = className.replace(/(?:^|\s)active(?!\S)/g, '');
    } else {
      this.modal.className += ' active';
    }
  }

  _toggleModal(){
    if(this.open){
      this._removeOverlay();
    } else {
      this._setModalPosition();
      this._appendOverlay();
      this._addOverlayClickListener();
    }

    this._toggleBodyClass();
    this._toggleOpenState();
  }

  _toggleOpenState(){
    this.open = !this.open;
  }
}

module.exports = ModalClass;
