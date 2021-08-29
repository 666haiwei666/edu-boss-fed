<template>
    <el-card>
        <advert-space-form></advert-space-form>
    </el-card>
</template>
<script lang="ts">
    import Vue from 'vue'
    import AdvertSpaceForm from './components/form.vue'
    export default Vue.extend({
        components: {
            AdvertSpaceForm
        }
    })
</script>