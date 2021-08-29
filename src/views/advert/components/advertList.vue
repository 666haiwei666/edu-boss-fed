<template>
    <el-card>
        <div slot="header">
            <el-form ref="filter-form" inline>
                <el-form-item>
                    <el-button @click="addAdvert">添加广告</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="advertList" style="width: 100%" v-loading="loading">
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="name" label="广告名称">
            </el-table-column>
            <el-table-column prop="name" label="广告位置">
            </el-table-column>
            <el-table-column prop="img" label="广告图片">
                <template slot-scope="scope">
                    <img width="100%"
                        :src="scope.row.img || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
                </template>
            </el-table-column>
            <el-table-column label="时间">
                <template slot-scope="scope">
                    <p>开始时间：{{scope.row.createTime | formatTime}}</p>
                    <p>到期时间：{{scope.row.endTime| formatTime}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="textStatus" label="上线/下线">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.textStatus" active-value="ENABLE" inactive-value="DISABLE"
                        active-color="#13ce66" inactive-color="#ff4949" @change="handleAdvertStatus(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="onEditAdvert(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
            <p>是否修改上下线状态?</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onDialogCancel">取 消</el-button>
                <el-button type="primary" @click="onDialogConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { getAdList, updateStatus } from '@/services/advert'
    export default Vue.extend({
        name: 'AdvertList',
        data() {
            return {
                advertList: [],
                loading: true,
                params: {},
                updateStatusParams: {
                    id: null,
                    status: null
                },
                dialogVisible: false
            }
        },
        created() {
            this.onQueryAdvertList()
        },
        methods: {
            async onQueryAdvertList() {
                this.loading = true
                const { data: { content } } = await getAdList(this.params)
                this.advertList = (content).map((el: any) => {
                    return {
                        ...el,
                        textStatus: el.status ? 'ENABLE' : 'DISABLE'
                    }
                })
                this.loading = false
            },
            async onUpdateStatus() {
                const { data: { success } } = await updateStatus({
                    status: this.updateStatusParams.status ? 0 : 1,
                    id: this.updateStatusParams.id
                })
                if (success) {
                    this.dialogVisible = false
                }
            },
            handleAdvertStatus(row: any) {
                this.dialogVisible = true
                this.updateStatusParams = {
                    id: row.id,
                    status: row.status
                }
            },
            onDialogCancel() {
                this.dialogVisible = false
                const index = this.advertList.findIndex((item: any) => { return item.id === this.updateStatusParams.id })
                if (index !== -1) {
                    const obj = {
                        status: this.updateStatusParams.status,
                        textStatus: this.updateStatusParams.status ? 'ENABLE' : 'DISABLE'
                    }
                    this.advertList[index] = Object.assign(this.advertList[index], obj)
                }
            },
            onDialogConfirm() {
                this.onUpdateStatus()
            },
            addAdvert() {
                this.$router.push('/addAdvertise')
            },
            onEditAdvert(row: {id: string}) {
                this.$router.push({
                    path: '/updateAdvertise',
                    query: {
                        id: row.id
                    }
                })
            }
        }
    })
</script>

<style lang="scss" scoped></style>