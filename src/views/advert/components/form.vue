<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="广告名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="广告位置" prop="spaceId">
                <el-select v-model="ruleForm.spaceId" placeholder="请选择">
                    <el-option v-for="(item,index) in spaceList" :key='index' :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-date-picker v-model="ruleForm.startTime" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间" prop="endTime">
                <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="上线/下线" prop="status">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio :label="1">上线</el-radio>
                    <el-radio :label="0">下线</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="广告图片" prop="img">
                <upload-image v-model="ruleForm.img" :limit="5" />
            </el-form-item>
            <el-form-item label="广告链接" prop="link">
                <el-input v-model="ruleForm.link"></el-input>
            </el-form-item>
            <el-form-item label="广告备注" prop="text">
                <el-input type="textarea" v-model="ruleForm.text"></el-input>
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
    import uploadImage from './uploadImage.vue'
    import { saveOrUpdate, getAdById, getAllSpaces } from '@/services/advert'
    export default Vue.extend({
        components: {
            uploadImage
        },
        data() {
            return {
                dialogVisible: false,
                spaceList: [],
                ruleForm: {
                    endTime: '',
                    img: null,
                    link: '',
                    name: '',
                    sort: 0,
                    spaceId: null,
                    startTime: '',
                    status: 0,
                    text: null
                },
                rules: {
                    name: [
                        { required: true, message: '请输入广告名称', trigger: 'blur' },
                        { min: 2, message: '不能低于两个字符', trigger: 'blur' }
                    ],
                    startTime: [
                        { required: true, message: '请选择开始时间', trigger: 'blur' }
                    ],
                    endTime: [
                        { required: true, message: '请选择到期时间', trigger: 'blur' }
                    ],
                    link: [
                        { required: true, message: '请输入广告链接', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.onGetAdById()
            this.onGetAllSpaces()
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
            async onGetAllSpaces() {
                const { data: { content } } = await getAllSpaces({})
                this.spaceList = content
            },
            async onGetAdById() {
                const id = this.$route.query.id
                if (!id) return
                const { data: { content } } = await getAdById({
                    id
                })
                this.ruleForm = content
            },
            async onSaveOrUpdate() {
                const { data: { success } } = await saveOrUpdate(this.ruleForm)
                if (success) {
                    this.$router.replace('/advert')
                    this.dialogVisible = false
                    this.$message.success('操作成功')
                } else {
                    this.$message.error('操作失败')
                }
            },
            onDialogConfirm() {
                this.onSaveOrUpdate()
            },
            resetForm(formName: string) {
                (this.$refs[formName] as Form).resetFields()
            }
        }
    })
</script>