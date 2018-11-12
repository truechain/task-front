<template>
  <div>
    <div class="task-new-wrapper">
      <div class="position">我的位置：任务管理>新建任务</div>
      <div class="fr">
        <el-button type="primary" @click="save('form')">保存</el-button>
        <el-button @click="goback">取消</el-button>
      </div>
      <div class="details-content">
        <div class="title">任务详情</div>
        <div class="form-wrap">
          <el-form
            ref="form"
            :inline="true"
            :label-position="labelPosition"
            :model="form"
            :rules="rules">
            <el-form-item label="任务logo：" style="width: 100%">
              <div class="file-wrapper">
                <div v-if="!file">
                  <img src="../../../static/images/add-logo.png" />
                </div>
                <div v-else>
                  <img :src="imgUrl" />
                </div>
                <input type="file" class="file" @change="uploadChange" />
              </div>
            </el-form-item>
            <el-form-item label="任务名称：" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="任务等级：" prop="level">
              <el-select v-model="form.level" placeholder="全部">
                <el-option label="A" value="A"></el-option>
                <el-option label="B" value="B"></el-option>
                <el-option label="C" value="C"></el-option>
                <el-option label="D" value="D"></el-option>
                <el-option label="S" value="S"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="form.taskStatus" placeholder="全部">
                <el-option label="禁用" value="0"></el-option>
                <el-option label="启用" value="1"></el-option>
                <el-option label="关闭" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务类别：" prop="category">
              <el-select v-model="form.category" placeholder="全部">
                <el-option label="个人" value="0"></el-option>
                <el-option label="团体" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间范围：">
              <el-col :span="11">
                <el-form-item prop="startDateTime">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.startDateTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endDateTime">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="奖励类型：" prop="rewardType">
              <!-- <span class="red">*</span> -->
              <el-select v-model="form.rewardType" placeholder="全部">
                <el-option label="True" value="1"></el-option>
                <el-option label="TTR" value="2"></el-option>
                <el-option label="RMB" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="奖励数量：" prop="rewardNum">
              <!-- <span class="red">*</span> -->
              <el-input v-model="form.rewardNum" type="number"></el-input>
            </el-form-item>
            <el-form-item label="提交地址：" style="display:block;">
              <el-input v-model="form.pushAddress" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="任务描述：" style="display:block">
              <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="details-content">
      <div class="title">岗位详情</div>
      <el-button @click="onNewWork">新增岗位</el-button>
      <div class="table-wrapper">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="station" label="岗位" style="width: 30%">
            <template slot-scope="scope">
              <el-input style="width: 200px" v-model="scope.row.station"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="peopleNum" label="需要人数" style="width: 30%">
            <template slot-scope="scope">
              <el-input style="width: 200px" v-model="scope.row.peopleNum" type="number" />
            </template>
          </el-table-column>
          <el-table-column prop="rewardNum" label="奖励/人" style="width: 30%">
            <template slot-scope="scope">
              <el-input style="width: 200px" v-model="scope.row.rewardNum" type="number" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {
    uploadTaskIcon,
    addTask
  } from '@/api'
  export default {
    data () {
      return {
        rules: {
          name: [{
            required: true,
            message: '请输入任务名称',
            trigger: 'blur'
          }],
          startDateTime: [{
            type: 'date',
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }],
          endDateTime: [{
            type: 'date',
            required: true,
            message: '请选择结束时间',
            trigger: 'blur'
          }],
          rewardNum: [{
            required: true,
            message: '请填写奖励数量',
            trigger: 'blur'
          }],
          rewardType: [{
            required: true,
            message: '请填写奖励类型',
            trigger: 'blur'
          }],
          level: [{
            required: true,
            message: '请填写奖励类型',
            trigger: 'blur'
          }],
          category: [{
            required: true,
            message: '请填写奖励类型',
            trigger: 'blur'
          }]
        },
        tableData: [{
          station: '',
          peopleNum: '',
          rewardNum: ''
        }],
        file: '',
        imgUrl: '',
        imgData: {
          accept: 'image/gif, image/jpeg, image/png, image/jpg'
        },
        station: '',
        peopleNum: '',
        rewardNum: '',
        labelPosition: 'right',
        workList: [],
        form: {
          category: '',
          description: '',
          endDateTime: '',
          level: '',
          name: '',
          peopleNum: '',
          pushAddress: '',
          rewardNum: '',
          rewardType: '',
          startDateTime: '',
          taskStatus: ''
        }
      }
    },
    methods: {
      onNewWork () {
        this.tableData.push({
          station: '',
          peopleNum: '',
          rewardNum: ''
        })
      },
      goback () {
        this.$router.go(-1)
      },
      async save (form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            const param = {
              task: {
                iconPath: this.imgUrl,
                ...this.form
              },
              taskDetailList: this.tableData
            }
            await addTask(param, 'json')
            this.$router.push({
              path: '/TaskManage'
            })
          } else {
            this.$message.error('请修改标红处的信息')
            return false
          }
        })
      },
      async uploadChange (event) {
        let img1 = event.target.files[0]
        this.file = img1
        let type = img1.type // 文件的类型，判断是否是图片
        let size = img1.size // 文件的大小，判断图片的大小
        if (this.imgData.accept.indexOf(type) === -1) {
          this.$message({
            message: '请选择正确的图片格式！',
            type: 'warning'
          })
          return false
        }
        if (size > 3145728) {
          this.$message({
            message: '请选择3M以内的图片！',
            type: 'warning'
          })
          return false
        }

        let form = new FormData()
        form.append('file', img1)
        const res = await uploadTaskIcon(form, 'form-data')
        this.imgUrl = res.showPath
      }

    }
  }
</script>

<style scoped>
  .red {
    position: absolute;
    left: -88px;
    color: red;
  }

  .file-wrapper {
    position: relative;
    width: 130px;
    height: 130px;
    cursor: pointer;
  }

  .file-wrapper .file {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }

  .file-wrapper img {
    width: 100%;
    height: 130px;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    border: 1px solid #dfe6ec;
    border-spacing: 0;
  }

  .table th {
    text-align: left;
  }

  .table td,
  .table th {
    border-right: 1px solid #dfe6ec;
    padding: 0 18px;
  }

  .table td,
  .table th {
    border-width: 0 0 1px;
    height: 40px;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-style: solid;
    border-color: #e6e6e6;
  }

  .el-table__row {
    background-color: #fff;
  }

  .table td {
    padding: 5px 10px;
    position: relative;
  }

  .table td .red {
    left: 0;
    top: 18px;
  }

  .table tr input {
    width: 240px;
  }

</style>
