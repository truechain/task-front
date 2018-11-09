<template>
  <div class="datastatis">
    <div class="form-wrap">
      <el-form ref="form" :inline="true" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="微信名称：">
          <el-input v-model="form.wxNickName"></el-input>
        </el-form-item>
        <el-form-item label="等级：">
          <el-select v-model="form.level" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
            <el-option label="D" value="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn-wrap">
          <el-button type="primary" @click="getProfile">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item class="btn-wrap fr" style="margin-right: 0;">
          <el-button @click="exportDialog = true">导出</el-button>
          <el-button @click="goback">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="导出" :visible.sync="exportDialog" label-width="80px">
      <el-form :inline="true" :model="exportItem" :rules="rules" ref="exportItem" label-width="100px" class="demo-ruleForm">
        <el-form-item label="时间范围：">
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="exportItem.startDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="exportItem.endDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="exportItem.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="微信昵称:" prop="wxNickName">
          <el-input v-model="exportItem.wxNickName" placeholder="请输入微信昵称"></el-input>
        </el-form-item>
        <el-form-item label="审核状态:" prop="auditStatus">
          <el-select v-model="exportItem.auditStatus" placeholder="请选择审核状态">
            <el-option label="已拉黑" value="-2"></el-option>
            <el-option label="未审核" value="-1"></el-option>
            <el-option label="未完善" value="0"></el-option>
            <el-option label="已审核" value="1"></el-option>
            <el-option label="已奖励" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级:" prop="level">
          <el-select v-model="exportItem.level" placeholder="请选择等级">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
            <el-option label="D" value="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="pageSize:" prop="pageSize">
          <el-input v-model="exportItem.pageSize" placeholder="请输入pageSize"></el-input>
        </el-form-item>
        <el-form-item label="pageIndex:" prop="pageIndex">
          <el-input v-model="exportItem.pageIndex" placeholder="请输入pageIndex"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exportDialog = false">取 消</el-button>
        <el-button type="primary" @click="exportTable('exportItem')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="data-table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="sysUser.personName" label="姓名" width="78"></el-table-column>
        <el-table-column prop="sysUser.wxNickName" label="微信昵称"></el-table-column>
        <el-table-column prop="sysUser.wxNum" label="微信号"></el-table-column>
        <el-table-column prop="taskCount" label="抢任务数"></el-table-column>
        <el-table-column prop="taskDoneCount" label="完成任务数" width="120"></el-table-column>
        <el-table-column prop="taskDoingCount" label="进行中任务数" width="120"></el-table-column>
        <el-table-column prop="trueValue" label="true数量"></el-table-column>
        <el-table-column prop="ttrValue" label="ttr数量"></el-table-column>
        <el-table-column prop="rmbValue" label="rmb数量"></el-table-column>
        <el-table-column prop="recommendPerson" label="推荐人" color="red">
          <template slot-scope="scope">
            <span style="color: red;">{{scope.row.recommendPerson}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="recommendCount" label="用户推荐数" width="120"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <div style="width:  400px;">
              <el-button size="mini" @click="handleTaskList(scope.row)">任务列表</el-button>
              <el-button size="mini" @click="handleRecommend(scope.row)">推荐列表</el-button>
              <el-button size="mini" @click="handleReword(scope.row)">奖励列表</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination v-show="total || total > 0" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
          :page-size="pageSize" :total="total" background layout="total,prev, pager, next"> </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getUserProfilePage
  } from '@/api'
  import qs from 'qs'
  export default {
    data () {
      return {
        rules: {
          name: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }],
          startDate: [{
            type: 'date',
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }],
          endDate: [{
            type: 'date',
            required: true,
            message: '请选择结束时间',
            trigger: 'blur'
          }],
          wxNickName: [{
            required: true,
            message: '请输入微信昵称',
            trigger: 'blur'
          }],
          auditStatus: [{
            required: true,
            message: '请选择审核状态',
            trigger: 'blur'
          }],
          level: [{
            required: true,
            message: '请选择等级',
            trigger: 'blur'
          }],
          pageSize: [{
            required: true,
            message: '请输入页面大小',
            trigger: 'blur'
          }],
          pageIndex: [{
            required: true,
            message: '请输入起始页',
            trigger: 'blur'
          }]
        },
        auditStatusObj: {
          '-2': '已拉黑',
          '-1': '未审核',
          '0': '未完善',
          '1': '已审核',
          '2': '已奖励'
        },
        exportDialog: false,
        exportItem: {
          startDate: '',
          endDate: '',
          name: '',
          wxNickName: '',
          auditStatus: '',
          level: '',
          pageSize: '',
          pageIndex: ''
        },
        pageIndex: 1,
        pageSize: 20,
        total: 1,
        auditStatus: '',
        endDate: '',
        startDate: '',
        form: {
          wxNickName: '',
          name: '',
          level: ''
        },
        tableData: []
      }
    },
    methods: {
      // 任务列表
      handleTaskList (scope) {
        this.$router.push({
          path: '/DataDetailsTaskList',
          query: {
            userId: scope.id
          }
        })
      },
      // 推荐列表
      handleRecommend (scope) {
        this.$router.push({
          path: '/DataDetailsRecommendList',
          query: {
            id: scope.id
          }
        })
      },
      // 奖励列表
      handleReword (scope) {
        this.$router.push({
          path: '/DataDetailsRewardList',
          query: {
            id: scope.id
          }
        })
      },
      goback () {
        this.$router.go(-1)
      },
      // 导出
      async exportTable (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.exportItem.startDate = this.$moment((+new Date(this.exportItem.startDate))).format(
              'YYYY-MM-DD HH:mm:ss')
            this.exportItem.endDate = this.$moment((+new Date(this.exportItem.endDate))).format(
              'YYYY-MM-DD HH:mm:ss')
            console.log('==ok')
            window.open(`
              http://${
                  process.env.NODE_ENV === 'production'
                  ? 'www'
                  : 'test'
                }.phptrain.cn/admin/report/export?${qs.stringify(this.exportItem)}
            `)
          } else {
            this.$message.error('必填项未填写')
          }
        })
      },
      async getProfile () {
        let param = {
          ...this.form,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          startDate: this.$route.query.startDate,
          endDate: this.$route.query.endDate
        }
        const res = await getUserProfilePage(param, 'json')
        this.tableData = res.content
        this.total = res.totalElements
      },
      reset () {
        this.form = {
          name: '',
          level: '',
          wxNickName: ''
        }
      },
      handleCurrentChange (value) {
        this.pageIndex = value
        this.getProfile()
      }
    },
    mounted () {
      this.getProfile()
    }
  }
</script>
<style scoped lang="less">
  .datastatis {
    .top {
      display: flex;
      height: 36px;
      align-content: center;
      justify-content: space-between;
    }

    .data-table {
      margin-top: 20px;

      .page {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
    }
  }

</style>
