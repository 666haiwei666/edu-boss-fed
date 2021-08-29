<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="广告位名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
            <p>是否提交数据?</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="onDialogConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import { Form } from 'element-ui'
    import { spaceSaveOrUpdate, getSpaceById } from '@/services/advert'
    export default Vue.extend({
        data() {
            return {
                dialogVisible: false,
                ruleForm: {
                    name: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入广告位名称', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.onGetSpaceById()
        },
        methods: {
            submitForm(formName: string) {
                (this.$refs[formName] as Form).validate((valid) => {
                    if (valid) {
                        this.dialogVisible = true
                    } else {
                        return false
                    }
                })
            },
            async onGetSpaceById() {
                const id = this.$route.query.id
                if (!id) return
                const { data: { content, success } } = await getSpaceById({
                    id
                })
                this.ruleForm = content
            },
            async onSpaceSaveOrUpdate() {
                const { data: { success } } = await spaceSaveOrUpdate(this.ruleForm)
                if (success) {
                    this.$router.replace('/advert-space')
                    this.dialogVisible = false
                    this.$message.success('操作成功')
                } else {
                    this.$message.error('操作失败')
                }
            },
            onDialogConfirm() {
                this.onSpaceSaveOrUpdate()
            },
            resetForm(formName: string) {
                (this.$refs[formName] as Form).resetFields()
            }
        }
    })
</script>