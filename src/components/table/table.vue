<template>
  <table :class="'fsa-table ' + EXTRA_CLASSES" :id="ID">
    <caption class="sr-only">{{ SR_CAPTION }}</caption>

    <thead>
      <tr>
        <th v-for="header in tblHeaders"
          scope="col"
          :class="header.thClass"
          :aria-sort="header.thSort">
          <button v-if="header.useSort=='true'" :class="header.thSortType" type="button">
            {{ header.thLabel }}
          </button>
          <span v-if="header.useSort=='false'">
            {{ header.thLabel }}
          </span>
        </th>
      </tr>
    </thead>
    
    <tbody>
      <tr v-for="row in tblRows">
        <td v-for="item in row.rowData" :class="item.tdClass">
          <router-link v-if="item.hasLink=='true'" :to='item.link'>
            {{ item.label }}
          </router-link>
          <button v-if="item.hasButton=='true'" :class="'fsa-btn '+ item.btnClass">
            {{ item.label }}
          </button>
          <span v-if="item.hasLink=='false' && item.hasButton=='false'">{{ item.label }}</span>
        </td>
      </tr>
    </tbody>

  </table>

  <!-- BEGIN PAGINATION -->


  <!-- end Pagination -->
</template>
<script>
export default {
  props: {
    ID: String,
    EXTRA_CLASSES: String,
    SR_CAPTION: String,
    HEADERS_DATA: Array,
    TABLE_DATA: Array,
    USE_PAGINATION: String,    
  },

  computed: {
     tblHeaders: function(){
      return this.HEADERS_DATA
    },
    tblRows: function(){
      return this.TABLE_DATA
    }
  },

  methods: {
    createPagination: function(data){

    }
  }
}
</script>