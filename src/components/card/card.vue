<template>
  <div class="test-card">
    <h3 class="test-card__name">{{ NAME }}</h3>
    <ul v-for="item in items" class="test-card__attr">
      <li><strong>{{ item.label }}</strong>: {{ item.desc }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    NAME: String,
    CARDDATA: Array
  },
  
  data(){
    return {
      items: this.CARDDATA
    }
  }
}

</script>