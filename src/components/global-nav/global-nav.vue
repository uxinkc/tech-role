<template>
  <nav>
    <div class="fsa-nav-global">
      <div class="fsa-nav-global__bd">
        <ul class="fsa-nav-global__list" aria-label="Primary Navigation" id="primary-navigation">
          <li v-for="item in items" :class="'fsa-nav-global__list-item '+ item.columnClass">
            <div v-if="item.hasChild=='true' && item.columnClass==EXTRA_CLASSES && item.hasHeaders=='true'">
              <button :id="item.uid+'-BTN'" v-on:click="toggleMenu" class="fsa-nav-global__link fsa-nav-global__link--has-sub-menu" type="button" aria-expanded="false" :aria-controls="item.uid">
                <span class="fsa-nav-global__text" :id="item.uid+'-SUB'">{{item.label}}</span>
              </button>
              <div class="fsa-nav-global__sub-menu" :id="item.uid" aria-hidden="true">
                <div class="fsa-nav-global__sub-menu-bd" :aria-labelledby="item.uid+'-SUB'">
                  <div v-for="child in item.children" class="fsa-nav-global__sub-menu-group">
                    <h3 class="fsa-nav-global__sub-menu-title" :id="child.uid">{{ child.header }}</h3>
                    <ul class="fsa-nav-global__sub-menu-list" :aria-labelledby="child.uid">
                      <li v-for="gp in child.group" class="fsa-nav-global__sub-menu-item">
                        <router-link :to='gp.path' class="fsa-nav-global__sub-menu-link">{{ gp.label }}</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="item.hasChild=='true' && item.columnClass==EXTRA_CLASSES && item.hasHeaders=='false'">
              <button :id="item.uid+'-BTN'" v-on:click="toggleMenu" class="fsa-nav-global__link fsa-nav-global__link--has-sub-menu" type="button" aria-expanded="false" :aria-controls="item.uid">
                <span class="fsa-nav-global__text" :id="item.uid+'-SUB'">{{item.label}}</span>
              </button>
              <div class="fsa-nav-global__sub-menu" :id="item.uid" aria-hidden="true">
                <div class="fsa-nav-global__sub-menu-bd">
                  <ul class="fsa-nav-global__sub-menu-list" :aria-labelledby="item.uid+'-SUB'">
                    <li v-for="child in item.children" class="fsa-nav-global__sub-menu-item">
                      <router-link :to='child.path' class="fsa-nav-global__sub-menu-link">{{child.label}}</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-else-if="item.hasChild=='true' && item.multiColumn=='false'">
              <button :id="item.uid+'-BTN'" v-on:click="toggleMenu" class="fsa-nav-global__link fsa-nav-global__link--has-sub-menu" type="button" aria-expanded="false" :aria-controls="item.uid">
                <span class="fsa-nav-global__text" :id="item.uid+'-SUB'">{{item.label}}</span>
              </button>
              <div class="fsa-nav-global__sub-menu" :id="item.uid" aria-hidden="true">
                <div class="fsa-nav-global__sub-menu-bd">
                  <ul class="fsa-nav-global__sub-menu-list" :aria-labelledby="item.uid+'-SUB'">
                    <li v-for="child in item.children" class="fsa-nav-global__sub-menu-item">
                      <router-link :to='child.path' class="fsa-nav-global__sub-menu-link">{{child.label}}</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-else="item.hasChild=='false'">
              <router-link :to='item.path' class="fsa-nav-global__link">
                <span class="fsa-nav-global__text">{{item.label}}</span>
              </router-link> 
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {

  props: {
    NAV_DATA: Array,
    EXTRA_CLASSES: String,
  },

  data: function(){
    return {
      menuOpen: false,
    }
  },

  computed: {
    
    items: function(){
      return this.NAV_DATA;
    }
    
  },

  methods: {
    
    toggleMenu: function(e){

      let item = e.currentTarget;
      let expanded = item.getAttribute('aria-expanded');

      this.loopItems('closeAllMenus');

      if (expanded=="true") this.closeMenu( item );
      else this.openMenu( item );
      
    },

    openMenu: function(item){
      let id = item.getAttribute('aria-controls');
      item.setAttribute('aria-expanded', 'true');
      document.getElementById(id).setAttribute('aria-hidden', 'false');
    },

    closeMenu: function(item){
      let id = item.getAttribute('aria-controls');
      item.setAttribute('aria-expanded', 'false');
      document.getElementById(id).setAttribute('aria-hidden', 'true');
    },

    addFocusListeners: function(item){
      item.addEventListener('focus', this.closeMenu(item) );
    },

    removeFocusListeners: function(item){
      item.removeEventListener('focus', this.closeMenu(item) );
    },

    addUnfocusListener: function(item){
      /// this.ref below CAUSES SCRIPT TO NOT RUN
      item.ref = this;
      document.addEventListener('click', function(event){
        var isClickInside = item.contains(event.target);
        if(!isClickInside){
          item.ref.loopItems('closeAllMenus');
        }
      });
    },

    listenForClickAway: function(){
      // commented out because causing issues
      //this.loopItems('addUnfocusListener');
    },

    listenForKeys: function(e){ if(e.keyCode == 27) this.loopItems('closeAllMenus') },

    //
    // Utility Method to cycle thru ALL of top level nav items
    //
    loopItems: function( action, callback=null ){
      let menuItems = document.getElementsByClassName('fsa-nav-global__link--has-sub-menu');
      for (let i = 0; i < menuItems.length; i++) {
        let item = menuItems[i];
        item.ref = this;
        this.addActionListener(action, item);
      }
    },

    addActionListener: function( action, item){
      if(action=='addFocusListeners') this.addFocusListeners(item);
      else if(action=='removeFocusListeners') this.removeFocusListeners(item);
      else if(action=='closeAllMenus') this.closeMenu(item);
      else if(action=='addUnfocusListener') this.addUnfocusListener(item);
    }

  },

  created(){
    window.addEventListener('keydown', this.listenForKeys);
  },

  mounted(){
    this.loopItems('addFocusListeners');
    this.listenForClickAway();
  },

  beforeDestroy(){
    window.removeEventListener('keydown', this.listenForKeys);
    this.loopItems('removeFocusListeners');
  }

}
</script>