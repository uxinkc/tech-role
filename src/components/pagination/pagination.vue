<template>
  <nav v-if="DISPLAY_PAGINATION" aria-label="Pagination" :id="ID">
    <div class="fsa-pagination" :data-current="CURRENT_PAGE" :data-total="TOTAL_PAGES">
      <ul class="fsa-pagination__list">
        <li class="fsa-pagination__item fsa-pagination__item--previous" aria-hidden="true">
          <span v-if="CURRENT_PAGE == 1" class="fsa-pagination__label fsa-pagination__label--previous fsa-pagination__label--disabled">Previous</span>
          <router-link v-if="CURRENT_PAGE > 1" class="fsa-pagination__label fsa-pagination__label--previous" to="/">Previous</router-link>
        </li>
        <li v-for="page in pages" class="fsa-pagination__item" aria-hidden="true">
          <router-link v-if="CURRENT_PAGE!==page.value && page.label!=='...'" class="fsa-pagination__label" to="/">{{page.label}}</router-link>
          <span v-if="CURRENT_PAGE===page.value && page.label!=='...'" class="fsa-pagination__label fsa-pagination__label--current" aria-current="true">{{page.label}}</span>
          <span v-if="page.label==='...'" class="fsa-pagination__label">{{page.label}}</span>
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
    DISPLAY_PAGINATION: Boolean,
    TOTAL_ITEMS: Number,
    NUMBER_SPREAD: Number 
  },


  computed: {
    pages: function(){
      let arr = this.createPagesArray(this.CURRENT_PAGE, this.ITEMS_PER_PAGE, this.TOTAL_ITEMS, this.NUMBER_SPREAD);
      console.log(this.TOTAL_PAGES);
      return arr;
    }
  },

  methods: {

    createPagesArray: function(currentPage, itemsPerPage, totalItems, paginationRange){
      // paginationRange could be a string if passed from attribute, so cast to number.
      paginationRange = +paginationRange;
      let pages = [];
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const halfWay = Math.ceil(paginationRange / 2);

      const isStart = currentPage <= halfWay;
      const isEnd = totalPages - halfWay < currentPage;
      const isMiddle = !isStart && !isEnd;

      let ellipsesNeeded = paginationRange < totalPages;
      let i = 1;

      while (i <= totalPages && i <= paginationRange) {
        let label;
        let pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
        let openingEllipsesNeeded = (i === 2 && (isMiddle || isEnd));
        let closingEllipsesNeeded = (i === paginationRange - 1 && (isMiddle || isStart));
        if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
          label = '...';
        } else {
          label = pageNumber;
        }
        pages.push({
          label: label,
          value: pageNumber
        });
        i ++;
      }
      return pages;
    },

    calculatePageNumber: function(i, currentPage, paginationRange, totalPages) {
        let halfWay = Math.ceil(paginationRange / 2);
        if (i === paginationRange) {
            return totalPages;
        } else if (i === 1) {
            return i;
        } else if (paginationRange < totalPages) {
            if (totalPages - halfWay < currentPage) {
                return totalPages - paginationRange + i;
            } else if (halfWay < currentPage) {
                return currentPage - halfWay + i;
            } else {
                return i;
            }
        } else {
            return i;
        }
    }


  }

}
</script>