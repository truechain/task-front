<template>
  <div class="task-details-wrapper">
    <div class="position">我的位置：任务管理 > 报名表 > 任务完成审核</div>
    <div class="fr">
      <el-button @click="goback">返回</el-button>
    </div>
    <div class="details-content">
      <div class="title">任务完成详情</div>
      <ul>
        <li>任务名称：<span> {{tableData.task.name}}</span></li>
        <li>岗位：<span> {{tableData.station || '暂无'}}</span></li>
        <li>微信昵称<span> {{tableData.wxNickName || '暂无'}}</span></li>
        <li>姓名：<span> {{tableData.personName}}</span></li>
        <li style="width: 100%;">钱包地址：<span> {{tableData.user.trueChainAddress || '暂无'}}</span></li>
        <li>文件上传类型：<span> {{commitTypeObj[tableData.task.commitType]}}</span></li>
        <li style="width: 100%;">提交地址：<span> {{tableData.pushAddress || '无'}}</span></li>
        <li>提交说明：<span> {{tableData.task.description || '无'}}</span></li>
        <li>奖励类型：<span>{{ rewardTypeObj[tableData.task.rewardType] || '无'}}</span></li>
        <li>奖励数量：<span>{{tableData.task.rewardNum || '无'}}</span></li>
        <li>发放状态：<span>{{tableData.bsTaskUser.taskStatus === 4 ? '已发放' : '未发放' }}</span></li>
        <li>推荐人昵称：<span>{{tableData.recommendUser && tableData.recommendUser.userName || '无'}}</span></li>
        <li>推荐人推荐码：<span>{{tableData.user.recommend_share_code || '无'}}</span></li>
        <li>推荐人钱包地址：<span>{{tableData.recommendUser && tableData.recommendUser.trueChainAddress || '无'}}</span></li>
        <!-- <li>推荐人手机号：<span>{{tableData.user.recommend_user_mobile || '无'}}</span></li> -->
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="details-content" style="height:120px">
      <div class="title">审核</div>
      <div class="taskAuditInput">
        <el-form ref="form" :model="auditItem" :inline="true">
          <el-form-item label="任务完成评级:" prop="finishLevelArr">
              <!-- <span class="red">*</span> -->
              <el-select
                v-model="auditItem.finishLevel"
                placeholder="全部">
                <el-option
                  v-for="item in finishLevelArr"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          <!-- <el-form-item label="任务完成评级:">
            <el-select v-model="auditItem.finishLevel">
              <el-option label="第一名" value="第一名"></el-option>
              <el-option label="第二名" value="第二名"></el-option>
              <el-option label="第三名" value="第三名"></el-option>
              <el-option label="优秀" value="优秀"></el-option>
              <el-option label="通过" value="通过"></el-option>
              <el-option label="通过" value="通过"></el-option>
              <el-option label="不通过" value="不通过"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="实际任务奖励数量:">
            <el-input style="width: 300px" v-model="auditItem.num"></el-input>
          </el-form-item>
          <el-form-item label="实际推荐人奖励数量:">
            <el-input style="width: 300px" v-model="auditItem.reNum"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button @click="dialogAudit">审核</el-button>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
  import {
    getUserInfoAPI,
    checkRecommendShareCode,
    auditEntryFormUser,
    rewardEntryFromUser
  } from '@/api'
  export default {
    name: 'TaskAudit',
    data () {
      return {
        rewardTypeObj: {
          '1': 'true',
          '2': 'ttr',
          '3': 'rmp'
        },
        commitTypeObj: {
          '1': 'url地址',
          '2': '图片',
          '3': '文件'
        },
        finishLevelArr: [{
          id: 1,
          value: '第一名'
        }, {
          id: 2,
          value: '第二名'
        }, {
          id: 3,
          value: '第三名'
        }, {
          id: 4,
          value: '优秀'
        }, {
          id: 5,
          value: '通过'
        }, {
          id: 6,
          value: '通过'
        }, {
          id: 7,
          value: '不通过'
        }],
        editDia: false,
        fileName: null,
        file: null,
        editItem: {
          personName: null,
          wxNickName: null,
          wxNum: null,
          recommendResource: null,
          recommendShareCode: null
        },
        auditDia: false,
        auditItem: {
          num: '',
          reNum: '',
          finishLevel: ''
        },
        auditStatusObj: {
          '-2': '已拉黑',
          '-1': '未审核',
          '0': '未完善',
          '1': '已审核',
          '2': '已奖励'
        },
        tableData: {
          bsTaskDetail: {},
          bsTaskUser: {},
          task: {},
          user: {},
          recommendUser: {}
        },
        isAudit: '',
        dialogVis: false,
        form: {},
        pdfDoc: null,
        loadding: false,
        pages: 0
      }
    },
    async mounted () {
      await this.getUserInfoAPI()
    },
    methods: {
      async dialogAudit () {
        if (!this.auditItem.finishLevel) {
          this.$message({
            message: '请选择任务评级',
            type: 'warning'
          })
          return false
        }
        if (!this.auditItem.num) {
          this.$message({
            message: '请填写奖励数量',
            type: 'warning'
          })
          return false
        }
        await rewardEntryFromUser(null, null, {
          taskUserId: this.$route.query.taskUserId,
          userReward: this.auditItem.num,
          recommendUserReward: this.auditItem.reNum,
          finishLevel: this.auditItem.finishLevel
        })
        this.$message({
          message: '奖励已发送',
          type: 'success'
        })
        setTimeout(() => {
          this.goback()
        }, 2000)
      },
      async getUserInfoAPI () {
        const res = await auditEntryFormUser(null, null, {
          taskUserId: this.$route.query.taskUserId
        })
        this.tableData = res
      },
      goback () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
  .taskAuditInput {
    display: flex;
    justify-content: space-between;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .fr {
    float: right;
    margin-bottom: 20px;
  }

  .pic-left {
    width: 60px;
    float: left;
    margin-left: 10px;
  }

  .cont-right {
    float: left;
    margin-left: 20px;
  }

  .cont-right p {
    margin-bottom: 10px;
  }

  .details-content {
    border: 1px solid #dfe6ec;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 15px;
    clear: both;
  }

  .table-wrapper {
    padding: 2%;
  }

  .title {
    margin: 15px 0 20px 0;
    font-size: 16px;
    padding-left: 5px;
    border-left: 4px solid rgba(255, 69, 0, 0.68);
  }

  .details-content ul {
    overflow: hidden;
    padding: 10px 20px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .details-content li {
    width: 25%;
    white-space: nowrap;
    font-size: 14px;
    line-height: 30px;
  }

</style>
