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
      <div class="title">附件信息</div>
      <div>
        <img src="./../../../static/images/jianli.png" alt="" class="pic-left">
        <div class="cont-right">
          <p>{{tableData.userName}}简历</p>
          <!-- <el-button @click="resume">预览</el-button> -->
          <el-button @click="downLoad">下载</el-button>
        </div>
      </div>
    </div>
    <div class="details-content" style="height:100px">
      <div class="title">审核</div>
      <div class="auditInput">
        <el-form ref="form" :model="auditItem" :inline="true">
          <el-form-item label="任务完成评级:" prop="finishLevelArr">
            <span>{{ finishLevelObj[tableData.finishLevel] || '无'}}</span>
          </el-form-item>
          <el-form-item label="实际任务奖励数量:">
            <span>{{ tableData.rewardNum }}</span>
          </el-form-item>
          <el-form-item label="实际推荐人奖励数量:">
            <span>{{ tableData.referralNum || 0 }}</span>
          </el-form-item>
        </el-form>
      </div>
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
  import {
    apiUrl
  } from '@/config/index.js'
  export default {
    name: 'TaskAudit',
    data () {
      return {
        finishLevelObj: {
          '1': '第一名',
          '2': '第二名',
          '3': '第三名',
          '4': '优秀',
          '5': '通过',
          '6': '通过',
          '7': '不通过'
        },
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
      this.getUserInfoAPI()
    },
    methods: {
      downLoad (x) {
        window.open(`${apiUrl}/user/downLoadResume?userId=${this.$route.query.taskUserId}`)
        // window.open(`${apiUrl}/task/downLoadFiles?filePath=${x}`)
      },
      async getUserInfoAPI () {
        const res = await auditEntryFormUser(null, null, {
          taskUserId: this.$route.query.taskUserId
        })
        console.log(res, '===')

        this.tableData = res
      },
      goback () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scope>
  .details-content {
    border: 1px solid #dfe6ec;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 15px;
    clear: both;
  }

  .auditInput {
    display: flex;

    // justify-content: space-around;
    .el-form {
      width: 100%;

      .el-form-item {
        margin: 0 50px;
      }

      // display: flex;
    }
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
