<template>
    <el-card>
        <advert-form></advert-form>
    </el-card>
</template>
<script lang="ts">
    import Vue from 'vue'
    import AdvertForm from './components/form.vue'
    export default Vue.extend({
        components: {
            AdvertForm
        }
    })
</script>