<template>
  <span :class="'fsa-label '+ EXTRA_CLASSES" :title="ATTR_TITLE">
    {{ TEXT }}
  </span>
</template>
<script>
export default {
  props: {
    TEXT: String,
    EXTRA_CLASSES: String,
    ATTR_TITLE: String,
  },
}

</script>