<template>
  <div tabindex="0" :id="MODAL_ID" class="fsa-modal fsa-modal--top" role="dialog" aria-hidden="true">
    <div class="fsa-modal__dialog">
      <div class="fsa-modal__content">
        <button class="fsa-modal__close" data-behavior="close-modal" :aria-controls="MODAL_ID"><img class="fsa-modal__close-icon" src="img/close.svg" alt="close"></button>
        <form>
          <h1 class="fsa-modal__title">{{ MODAL_TITLE }}</h1>
          <slot name="modalBody"></slot>
        </form>
      </div>
    </div>
  </div>  
</template>

<script>

import utils from '../../_helpers/utils';

export default {
  props: {
    MODAL_ID: String,
    MODAL_TITLE: String,

  },

  data: function(){
    return {
      modalFirstTabStop: {},
      modalLastTabStop: {}
    }
  },

  computed: {

  },

  methods: {


    trapModal: function(e){
      // Check for TAB key press
      if (e.keyCode === 9) {
        // SHIFT + TAB
        if (e.shiftKey) {
          if (document.activeElement === this.modalFirstTabStop) {
            e.preventDefault();
            this.modalLastTabStop.focus();
          }modalLastTabStop
        // TAB
        } else {
          if (document.activeElement === this.modalLastTabStop) {
            e.preventDefault();
            this.modalFirstTabStop.focus();
          }
        }
      }
      // ESCAPE
      if (e.keyCode === 27) {
        closeModal();
      }
    },

    showModal: function( m ){

      let modal = m;
      // show the modal by toggling aria attribute
      modal.setAttribute('aria-hidden', 'false');

      // trap tabs inside of modal
      modal.addEventListener('keydown', this.trapModal);
      // Find all focusable children

      let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      let focusableElements = modal.querySelectorAll(focusableElementsString);

      // Convert NodeList to Array
      focusableElements = Array.prototype.slice.call(focusableElements);

      this.modalFirstTabStop = focusableElements[0];
      this.modalLastTabStop = focusableElements[focusableElements.length - 1];
      this.modalFirstTabStop.focus();

      // Fix double scrollbar issue
      let body = document.getElementsByTagName('body')[0];
      body.className = body.className + ' fsa-modal-scroll-fix';

      // gain focus --- needs rewrite
      setTimeout(function() {
        modal.focus();
      },200);

    },

    hideModal: function( m, t ){
      
      let modal = m;
      // hide the modal by toggling aria attribute
      modal.setAttribute('aria-hidden', 'true');

      // Fix double scrollbar issue
      let body = document.getElementsByTagName('body')[0];
      body.className = body.className.replace(' fsa-modal-scroll-fix','');

      // set focus back to the originating element
      let origin = document.querySelector('[data-modal-origin]');
      
      if( origin ){
        origin.removeAttribute('data-modal-origin');
        origin.setAttribute('aria-expanded', 'false');
        origin.focus();
      }
      
    },


    /// UTILITY METHOD
    loopItems: function( identifier ){

      let items = document.querySelectorAll( identifier );

      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        item.ref = this;
        item.addEventListener('click', function(e){
          let trigger = e.target;
          let id = trigger.getAttribute('aria-controls');
          
          if( identifier == '[data-behavior~="open-modal"]'){
            
            trigger.setAttribute('aria-expanded', 'true');
            trigger.setAttribute('data-modal-origin','');
            
            trigger.ref.showModal( document.getElementById( id ) );
          
          } else if(identifier == '[data-behavior~="close-modal"]'){

            trigger.ref.hideModal( utils.getClosest(e.currentTarget, '.fsa-modal') );

          }
          
        });  
      }
    },


  },

  mounted(){
    this.loopItems('[data-behavior~="close-modal"]');
    this.loopItems('[data-behavior~="open-modal"]');
  },


}
</script>