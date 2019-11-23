<template>
  <div :class="'fsa-growl-container ' + CONTAINER_CENTERED">
    <div tabindex="0" :id="GROWL_ID" :class="'fsa-growl ' + VARIATION + ' ' + CENTERED" role="dialog" aria-hidden="true">
      <div class="fsa-growl__hd">
        <button class="fsa-growl__close" :data-behavior="'growl-dismiss '+ WHITEOUT_DISMISS" type="button" title="Close Notification" aria-label="Close Notification"></button>
        <h2 class="fsa-growl__title">{{ GROWL_TITLE }}</h2>
      </div>
      <div class="fsa-growl__bd">
        <slot name="growlBody"></slot>
      </div>
    </div>
  </div>  
</template>

<script>

import utils from "../../_helpers/utils";

export default {
  props: {
    GROWL_ID: String,
    VARIATION: String,
    CONTAINER_CENTERED: String,
    CENTERED: String,
    GROWL_TITLE: String,
    WHITEOUT_DISMISS: String,

  },

  data: function(){
    return {
      growlFirstTabStop: {},
      growlLastTabStop: {}
    }
  },

  computed: {

  },

  methods: {


    trapGrowl: function(e){
      // Check for TAB key press
      if (e.keyCode === 9) {
        // SHIFT + TAB
        if (e.shiftKey) {
          if (document.activeElement === this.growlFirstTabStop) {
            e.preventDefault();
            this.growlLastTabStop.focus();
          }
        // TAB
        } else {
          if (document.activeElement === this.growlLastTabStop) {
            e.preventDefault();
            this.growlFirstTabStop.focus();
          }
        }
      }
      // ESCAPE
      if (e.keyCode === 27) {
        this.dismissGrowl();
      }
    },

    showGrowl: function( g ){

      let growl = g;
      
      // show the growl by toggling aria attribute
      growl.setAttribute('aria-hidden', 'false');

      // for Center Modal style only
      if( utils.hasClass(growl, 'fsa-growl--centered') ){

        let whiteout = document.getElementById('fsa-whiteout');
        whiteout.setAttribute('aria-hidden', 'false');
        whiteout.setAttribute('aria-expanded', 'false');

        // trap tabs inside of growl
        growl.addEventListener('keydown', this.trapGrowl);

        // Find all focusable children
        let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        let focusableElements = growl.querySelectorAll(focusableElementsString);

        // Convert NodeList to Array
        focusableElements = Array.prototype.slice.call(focusableElements);

        this.growlFirstTabStop = focusableElements[0];
        this.growlLastTabStop = focusableElements[focusableElements.length - 1];
        this.growlFirstTabStop.focus();

        growl.focus();


      } else {
        growl.addEventListener( utils.getAnimationString(growl), this.showGrowlDelay);
      }

    },

     showGrowlDelay: function(e){
      let growl = e.target;

      // clean up
      growl.removeEventListener( utils.getAnimationString( growl ), this.showGrowlDelay);
    },

    dismissGrowl: function( g ){
      
      let growl = g;

      growl.className = growl.className + ' fsa-growl--dismissing';
      growl.addEventListener( utils.getAnimationString( growl ), this.dismissGrowlDelay);
      
      if( utils.hasClass(growl, 'fsa-growl--centered') ){
        let whiteout = document.getElementById('fsa-whiteout');
        whiteout.setAttribute('aria-hidden', 'true');
        whiteout.setAttribute('aria-expanded', 'true');
        growl.focus();
      }
      
    },

    dismissGrowlDelay: function(e){
      let growl = e.target;

      growl.className = growl.className.replace(' fsa-growl--dismissing','');
      growl.setAttribute('aria-hidden', 'true');

      let origin = document.querySelector('[data-growl-origin]');
      origin.removeAttribute('data-growl-origin');
      origin.setAttribute('aria-expanded', 'false');
      // set focus back to the originating element
      origin.focus();
      // clean up
      growl.removeEventListener( utils.getAnimationString(growl), this.dismissGrowlDelay);
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
          
          if( identifier == '[data-behavior~="growl-show"]'){
            
            trigger.setAttribute('aria-expanded', 'true');
            trigger.setAttribute('data-growl-origin','');
            
            trigger.ref.showGrowl( document.getElementById( id ) );
          
          } else if(identifier == '[data-behavior~="growl-dismiss"]'){

            trigger.ref.dismissGrowl( utils.getClosest(e.currentTarget, '.fsa-growl') );

          } else if(identifier == '[data-behavior~="growl-dismiss-delay"]'){

            trigger.ref.dismissGrowlDelay( utils.getClosest(e.currentTarget, '.fsa-growl') );

          }
          
        });  
      }
    },


  },

  mounted(){
    this.loopItems('[data-behavior~="growl-show"]');
    this.loopItems('[data-behavior~="growl-dismiss"]');
    this.loopItems('[data-behavior~="growl-dismiss-delay"]');
  },


}
</script>