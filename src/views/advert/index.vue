<template>
  <div class="user">
    <advert-list />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import AdvertList from './components/advertList.vue'

  export default Vue.extend({
    name: 'UserIndex',
    components: {
      AdvertList
    }
  })
</script>

<style lang="scss" scoped></style>