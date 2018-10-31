<template>
  <div>
    <div class="task-new-wrapper">
      <div class="position">我的位置：任务管理>新建任务</div>
      <div class="fr">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="goback">取消</el-button>
      </div>
        <div class="details-content">
          <div class="title">任务详情</div>
          <div class="form-wrap">
        <el-form ref="form" label-width="90px" :label-position="labelPosition" >
          <el-form-item label="任务logo：">
            <div class="file-wrapper">
              <div>
                <img :src="form.iconPath || '../../../static/images/add-logo.png'"/>
              </div>
              <input type="file" class="file" @change="uploadChange"/>
            </div>
        </el-form-item><br />
          <el-form-item label="任务名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
            <el-form-item label="任务等级：">
            <el-select v-model="form.level" placeholder="全部">
              <el-option label="A" value="A"></el-option>
              <el-option label="B" value="B"></el-option>
              <el-option label="C" value="C"></el-option>
              <el-option label="D" value="D"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="form.taskStatus" placeholder="全部">
              <el-option
                v-for="item in taskStatusArr"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
          </el-select>
          </el-form-item>
            <el-form-item label="任务类别：">
            <el-select v-model="form.category" placeholder="全部">
              <el-option
                v-for="item in categoryArr"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.startDateTime" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateTime" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="奖励类型：">
            <el-select v-model="form.rewardType" placeholder="全部">
              <el-option
                v-for="item in rewardTypeArr"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖励数量：">
            <el-input v-model="form.rewardNum"></el-input>
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
        <div class="table-wrapper">
          <table class="table">
            <tr>
              <th>岗位</th>
              <th>需要人数</th>
              <th>奖励/人</th>
            </tr>
            <tr class="el-table__row" v-for="item in taskDetailList">
              <td><input type="text" class="el-input__inner" v-model="item.station" /></td>
              <td><input type="text" class="el-input__inner" v-model="item.peopleNum" /></td>
              <td><input type="text" class="el-input__inner" v-model="item.rewardNum" /></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTaskInfo, updateTask, uploadTaskIcon } from '@/api'
  export default {
    data () {
      return {
        name: 'TaskEdit',
        file: '',
        imgUrl: '',
        taskDetailList: [],
        imgData: {
          accept: 'image/gif, image/jpeg, image/png, image/jpg'
        },
        rewardTypeArr: [{id: 1, value: 'TRUE'}, {id: 2, value: 'TTR'}, {id: 3, value: 'RMB'}],
        taskStatusArr: [{id: 0, value: '禁用'}, {id: 1, value: '启用'}, {id: 2, value: '关闭'}],
        categoryArr: [{id: 0, value: '个人'}, {id: 1, value: '团队'}],
        station: '',
        peopleNum: '',
        rewardNum: '',
        labelPosition: 'right',
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
    mounted () {
      this.getTaskInfo()
    },
    methods: {
      goback () {
        this.$router.go(-1)
      },
      async getTaskInfo () {
        const res = await getTaskInfo(null, null, {
          taskId: this.$route.query.taskId
        })
        this.form = res.task
        this.taskDetailList = res.taskDetailList
      },
      async save () {
        var param = {
          task: {
            id: this.$route.query.taskId,
            iconPath: this.imgUrl,
            ...this.form
          },
          taskDetailList: this.taskDetailList
        }
        await updateTask(param, 'json')
        this.$router.push({
          path: '/TaskManage'
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
  }

  .table tr input {
    width: 240px;
  }

</style>
