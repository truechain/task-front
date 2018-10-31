<template>
  <div class="task-entryForm-content">
    <div class="position">我的位置：任务管理>报名表</div>
    <div class="status">
      <span>任务名称：<span>{{ taskName }}</span></span>
      <span>审核状态：<span>{{ totalAuditStatus === 0 ? '未审核' : '已审核' }}</span></span>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="station" label="岗位">
      </el-table-column>
      <el-table-column prop="wxNickName" label="微信昵称">
      </el-table-column>
      <el-table-column prop="auditStatus" label="奖励发放">
        <template slot-scope="scope">
          <span>{{auditStatusObj[scope.row.auditStatus]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rewardNum" label="奖励">
      </el-table-column>
      <el-table-column prop="personName" label="姓名">
      </el-table-column>
      <el-table-column prop="recommendUser" label="推荐人">
      </el-table-column>
      <el-table-column prop="pushAddress" label="提交地址">
      </el-table-column>
      <el-table-column prop="remark" label="提交说明">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="shDialog(scope.row)" v-if="scope.row.auditStatus === 0">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-center">
      <el-button @click="goback">返回</el-button>
    </div>
    <el-dialog title="审核" :visible.sync="dialogAuditing">
      <el-form :model="form" class="dialog-wrapper" label-width="120px">
        <el-form-item label="任务名：">
          {{taskName}}
        </el-form-item>
        <el-form-item label="默认奖励数：">
          {{formTable.rewardNum || '0'}}
        </el-form-item>
        <el-form-item label="用户姓名：">
          {{formTable.personName}}
        </el-form-item>
        <el-form-item label="用户钱包地址：">
          {{formTable.pushAddress || '暂无'}}
        </el-form-item>

        <el-form-item label="奖励数：">
          <el-input v-model.number="form.num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="推荐人奖励数：">
          <el-input v-model.number="form.reNum" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditing = false">取 消</el-button>
        <el-button type="primary" @click="dialogAudit" :plain="true">发放奖励</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getEntryFormInfo, rewardEntryFromUser, auditEntryFormUser } from '@/api'
  export default {
    name: 'TaskEntryForm',
    data () {
      return {
        totalAuditStatus: '',
        dialogAuditing: false,
        centerDialogVisible: true,
        buttonText: '',
        taskUserId: '',
        form: {
          reNum: '',
          num: ''
        },
        formTable: {

        },
        taskName: '', // 任务名
        rewardNum: '', // 默认奖励数
        personName: '', // 用户姓名
        pushAddress: '', // 用户钱包地址
        tableData: [],
        auditStatusObj: {
          '0': '未审核',
          '1': '已审核',
          '2': '已奖励'
        }
      }
    },
    methods: {
  /* 审核报名表 */
      async shDialog (scope) {
        this.formTable = scope
        this.taskUserId = scope.taskUserId
        await auditEntryFormUser(null, null, {
          taskUserId: this.taskUserId
        })

        this.dialogAuditing = true
      },
      goback () {
        this.$router.go(-1)
      },
      async dialogAudit () {
        this.dialogAuditing = false
        const data = {
          userReward: this.form.num,
          recommendUserReward: this.form.reNum
        }

        await rewardEntryFromUser(data, 'json', {
          taskUserId: this.taskUserId,
          userReward: this.form.num,
          recommendUserReward: this.form.reNum
        })
        await this.getTaskEntryForm()
        this.$message({
          message: '奖励已发送',
          type: 'success'
        })
      },
      async getTaskEntryForm () {
        const res = await getEntryFormInfo(null, null, {
          taskId: this.$route.query.taskId
        })
        this.tableData = res.taskEntryFromInfoList
        this.taskName = res.taskName
      }
    },
    mounted () {
      this.getTaskEntryForm()
    }
  }
</script>

<style type="text/css">
  .el-message {
    top: 200px !important;
  }

</style>
<style scoped>
  .el-dialog--small.el-dialog {
    width: 30%;
  }

  .dialog-wrapper .el-form-item {
    display: block;
  }

  .btn-center {
    text-align: center;
    margin: 10px 0;
  }

  .status {
    font-size: 14px;
    margin-bottom: 15px;
  }

  .status span {
    margin-right: 20px;
  }

</style>
