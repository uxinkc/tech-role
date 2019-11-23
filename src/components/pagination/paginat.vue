<template>

  <nav v-if="DISPLAY_PAGINATION" aria-label="Pagination" :id="ID">
    <div class="fsa-pagination" :data-current="CURRENT_PAGE" :data-total="TOTAL_PAGES">
      <ul class="fsa-pagination__list">

        <li class="fsa-pagination__item fsa-pagination__item--previous" aria-hidden="true">
          <span v-if="CURRENT_PAGE == 1" class="fsa-pagination__label fsa-pagination__label--previous fsa-pagination__label--disabled">Previous</span>
          <router-link v-if="CURRENT_PAGE > 1" class="fsa-pagination__label fsa-pagination__label--previous" to="/">Previous</router-link>
        </li>
        <!-- 1st Spot -->
        <li class="fsa-pagination__item">
          <span v-if="CURRENT_PAGE == 1" class="fsa-pagination__label fsa-pagination__label--current" aria-current="true">1</span>
          <router-link v-if="CURRENT_PAGE > 1" class="fsa-pagination__label" to="/"><span class="fsa-sr-only">Go to page</span> 1</router-link>
        </li>
        
        <!-- if 6 or more -->
        <li v-if="TOTAL_PAGES > 5 && CURRENT_PAGE > 3" class="fsa-pagination__item" aria-hidden="true">
          <span class="fsa-pagination__label">…</span>
        </li>
        
        <!-- 2nd Spot -->
        <li v-if="TOTAL_PAGES > 1 && CURRENT_PAGE < 2" class="fsa-pagination__item">
          <router-link class="fsa-pagination__label" to="/">21s>2</router-link>
        </li>
        <li v-if="TOTAL_PAGES > 1 && CURRENT_PAGE == 2" class="fsa-pagination__item fsa-pagination__label--current">
          <span class="fsa-pagination__label fsa-pagination__label--current" aria-current="true">22s>2</span>
        </li>
        <li v-if="TOTAL_PAGES > 1 && CURRENT_PAGE > 2" class="fsa-pagination__item">
          <router-link class="fsa-pagination__label" to="/">23s>{{ CURRENT_PAGE - 1 }}</router-link>
        </li>

        <!-- 3rd Spot -->
        <li v-if="TOTAL_PAGES > 2 && CURRENT_PAGE < 3" class="fsa-pagination__item">
          <router-link class="fsa-pagination__label" to="/">31s>3</router-link>
        </li>
        <li v-if="TOTAL_PAGES > 2 && CURRENT_PAGE == 3" class="fsa-pagination__item">
          <span class="fsa-pagination__label fsa-pagination__label--current" aria-current="true">32s>{{ CURRENT_PAGE }}</span>
        </li>
        <li v-if="TOTAL_PAGES > 2 && CURRENT_PAGE < (TOTAL_PAGES-3)" class="fsa-pagination__item">
          <router-link class="fsa-pagination__label" to="/">33s>{{ TOTAL_PAGES - 1 }}</router-link>
        </li>
        <li v-if="TOTAL_PAGES > 2 && CURRENT_PAGE >= (TOTAL_PAGES-3)" class="fsa-pagination__item">
          <router-link class="fsa-pagination__label" to="/">33s>{{ TOTAL_PAGES - 2 }}</router-link>
        </li>
        

        <!-- 4th Spot -->
        <li v-if="TOTAL_PAGES > 3 && CURRENT_PAGE < 4" class="fsa-pagination__item">
          <router-link class="fsa-pagination__label" to="/">41s>4</router-link>
        </li>
        <li v-if="TOTAL_PAGES > 3 && CURRENT_PAGE == 4" class="fsa-pagination__item">
          <router-link class="fsa-pagination__label" to="/">42s>5</router-link>
        </li>
        <li v-if="TOTAL_PAGES > 3 && CURRENT_PAGE == (TOTAL_PAGES-2)" class="fsa-pagination__item">
          <router-link class="fsa-pagination__label" to="/">43s>{{ (TOTAL_PAGES - 1) }}</router-link>
        </li>
        <li v-if="TOTAL_PAGES > 1 && CURRENT_PAGE == (TOTAL_PAGES-1) && CURRENT_PAGE != 5" class="fsa-pagination__item fsa-pagination__label--current">
          <span class="fsa-pagination__label fsa-pagination__label--current" aria-current="true">44s>{{ TOTAL_PAGES - 1 }}</span>
        </li>
  
        
        <!-- -->
        <li v-if="TOTAL_PAGES > 5 && CURRENT_PAGE < (TOTAL_PAGES-2)" class="fsa-pagination__item" aria-hidden="true">
          <span class="fsa-pagination__label">…</span>
        </li>
        
        <li class="fsa-pagination__item">
          <span v-if="CURRENT_PAGE == TOTAL_PAGES" class="fsa-pagination__label fsa-pagination__label--current" aria-current="true">{{ TOTAL_PAGES }}</span>
          <router-link v-if="CURRENT_PAGE < TOTAL_PAGES" class="fsa-pagination__label" to="/">{{ TOTAL_PAGES }}</router-link>
        </li>
        
        <li class="fsa-pagination__item fsa-pagination__item--next">
          <span v-if="CURRENT_PAGE == TOTAL_PAGES" class="fsa-pagination__label fsa-pagination__label--next fsa-pagination__label--disabled">Next</span>
          <router-link v-if="CURRENT_PAGE < TOTAL_PAGES" class="fsa-pagination__label fsa-pagination__label--next" to="/">Next</router-link>
        </li>
      </ul>
    </div>
  </nav>

</template>

<script>
export default {
  props: {
    ID: String,
    EXTRA_CLASSES: String,
    TOTAL_PAGES: Number,
    ITEMS_PER_PAGE: Number,
    CURRENT_PAGE: Number,  
    DISPLAY_PAGINATION: Boolean 
  },

  data: function(){
    return {

    }
  },

  computed: {

  },

  methods: {

  },

  created: function(){

  }



}
</script>