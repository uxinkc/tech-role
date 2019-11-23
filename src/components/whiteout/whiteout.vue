<template>
  <div class="fsa-whiteout" id="fsa-whiteout" aria-hidden="true" aria-expanded="false"></div>
</template>


<script>
export default {
  props: {

  },

  data: function(){
    return {

    }
  },

  computed: {

  },

  methods: {


    /// UTILITY METHOD
    loopItems: function( identifier ){

      let items = document.querySelectorAll( '[data-behavior~="' + identifier +'"]' );

      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        item.ref = this;
        item.addEventListener('click', function(e){
          let whiteout = document.getElementById('fsa-whiteout');

          if( identifier == 'whiteout-show'){
            whiteout.setAttribute('aria-hidden', 'false');
            whiteout.setAttribute('aria-expanded', 'false');
          
          } else if(identifier == 'whiteout-dismiss'){
            whiteout.setAttribute('aria-hidden', 'true');
            whiteout.setAttribute('aria-expanded', 'true');
          }
          
        });  
      }
    },


  },

  mounted(){
    //this.loopItems('whiteout-show');
    //this.loopItems('whiteout-dismiss');
  },


}
</script>
