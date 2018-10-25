<template>
  <div class="">
    <div class="position">我的位置：统计明细表>任务明细</div>
    <el-form ref="form" :inline="true" class="demo-form-inline">
      <el-form-item label="时间段：">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.startDateTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="任务名称：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="任务等级：">
        <el-select v-model="form.level" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务类别：">
        <el-select v-model="form.category" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="个人" value="0"></el-option>
          <el-option label="团队" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务状态：">
        <el-select v-model="form.taskStatus" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="进行中" value="0"></el-option>
          <el-option label="已完成" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button type="primary" @click="getStaticsInfo">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item class="btn-wrap fr" style="margin-right: 0;">
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
    <div class="name">姓名：<span></span></div>
    <div class="data-table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="taskName" label="任务名称"></el-table-column>
        <el-table-column prop="taskLevel" label="任务等级"></el-table-column>
        <el-table-column prop="taskState" label="任务状态"></el-table-column>
        <el-table-column prop="taskCategory" label="任务类型"></el-table-column>
        <el-table-column prop="taskStartTime" label="抢任务时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [],
        pageIndex: 1,
        pageSize: 20,
        id: '',
        form: {
          taskStatus: '',
          category: '',
          startDateTime: '',
          endDateTime: '',
          level: '',
          name: ''
        }
      }
  },
    methods: {
      goback () {
        this.$router.go(-1)
      },
      getStaticsInfo () {
        //				this.id =  this.$route.query.id

        let url = 'http://www.phptrain.cn/admin/report/getTaskStats'
        var param = {
          userId: this.$route.query.userId,
          taskStatus: this.form.taskStatus,
          category: this.form.category,
          endDateTime: this.form.endDateTime,
          startDateTime: this.form.startDateTime,
          level: this.form.level,
          name: this.form.name,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        this.$http.post(url, param, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
  				// console.log(res, '777777')
          if (res.data.message == '成功') {
            if (res.data.result) {
              var result = res.data.result

              result.forEach(function (list) {
                if (list.taskState == 0) {
                  list.taskState = '任务中'
                }
                if (list.taskState == 1) {
                  list.taskState = '已经完成'
                }
                if (list.taskCategory == 0) {
                  list.taskCategory = '个人'
                }
                if (list.taskCategory == 1) {
                  list.taskCategory = '团队'
                }
              })

              this.tableData = res.data.result
              // 返回结构中{taskName:任务名称;taskState:任务状态(0-任务中,1-已经完成);taskCategory:任务类型(0-个人，1-团队)}
            }
          }
        })
      },
      reset () {
        this.form = {
          auditStatus: '',
          category: '',
          startDateTime: '',
          endDateTime: '',
          level: '',
          name: ''
        }
        this.getStaticsInfo()
      }
  },
    mounted () {
      this.getStaticsInfo()
  }
  }
</script>

<style scoped="scoped">
  .name {
    font-size: 14px;
  }

</style>
