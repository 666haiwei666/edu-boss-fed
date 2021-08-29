<template>
  <div class="advert-space">
    <advert-space-list />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import AdvertSpaceList from './components/advertSpaceList.vue'

  export default Vue.extend({
    name: 'UserIndex',
    components: {
      AdvertSpaceList
    }
  })
</script>

<style lang="scss" scoped></style>