<template>
    <el-card>
        <div slot="header">
            <el-form ref="filter-form" inline>
                <el-form-item>
                    <el-button @click="addAdvertSpace">添加广告位</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="advertSpaceList" style="width: 100%">
            <el-table-column prop="id" label="spaceKey">
            </el-table-column>
            <el-table-column prop="name" label="广告位名称">
            </el-table-column>
            <el-table-column prop="name" label="创建时间">
                <template slot-scope="scope">
                    <p>{{scope.row.createTime | formatTime}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="img" label="更新时间">
                <template slot-scope="scope">
                    <p>{{scope.row.createTime | formatTime}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="onEditAdvertSapce(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { getAllSpaces } from '@/services/advert'

    export default Vue.extend({
        name: 'AdvertSpaceList',
        data() {
            return {
                advertSpaceList: [],
                params: {}
            }
        },
        created() {
            this.onQueryAdvertSpaceList()
        },
        methods: {
            async onQueryAdvertSpaceList() {
                const { data: { content } } = await getAllSpaces(this.params)
                this.advertSpaceList = content
            },
            addAdvertSpace() {
                this.$router.push('/addAdvertiseSpace')
            },
            onEditAdvertSapce(row: any) {
                this.$router.push({
                    path: '/updateAdvertiseSpace',
                    query: {
                        id: row.id
                    }
                })
            }
        }
    })
</script>

<style lang="scss" scoped></style>