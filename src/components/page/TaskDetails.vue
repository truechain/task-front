<template>
  <div class="task-details-wrapper">
    <div class="position">我的位置：任务管理>查看详情</div>
    <div class="fr">
      <template v-if="task.taskStatus === 0">
        <el-button type="danger" @click="EditTask">编辑</el-button>
      </template>
      <el-button @click="goback">返回</el-button>
      <el-button type="primary" @click="TaskEntryForm">报名表</el-button>
    </div>
    <div class="details-content">
      <div class="title">任务详情</div>
      <ul>
        <li style="width: 100%;">任务logo：<span>
            <div class="logo-img"><img :src="task.iconPath" /></div>
          </span></li>
        <li style="width: 100%;">任务名称：<span>{{task.name}}</span></li>
        <li>任务等级：<span>{{task.level}}</span></li>
        <li>状态：<span>{{status[task.taskStatus]}}</span></li>
        <li>任务类别：<span>{{task.category === 0 ? '个人' : '团队' }}</span></li>
        <li>发布者：<span>{{task.createUser}}</span></li>
        <li>发布时间：<span>{{task.createTime}}</span></li>
        <!-- <li>时间范围：<span>{{task.startDateTime.split(' ')[0]}}至{{task.endDateTime.split(' ')[0]}}</span></li> -->
        <li>时间范围：<span>{{task.startDateTime}}至{{task.endDateTime}}</span></li>
        <li>奖励：<span>{{task.rewardNum}}</span></li>
        <li>任务上传方式：<span>{{commitTypeObj[task.commitType]}}</span></li>
        <li style="width: 100%;">提交地址：<span>{{task.pushAddress}}</span></li>
        <li></li>
        <li></li>
        <li style="width: 100%;">任务描述：<div><pre>{{task.description}}</pre></div></li>
      </ul>
    </div>
    <div class="details-content">
      <div class="title">岗位详情</div>
      <div class="table-wrapper">
        <el-table :data="tableData" stripe>
          <el-table-column prop="station" label="岗位">
          </el-table-column>
          <el-table-column prop="peopleNum" label="需要人数">
          </el-table-column>
          <el-table-column prop="rewardNum" label="奖励/人">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTaskInfo } from '@/api'
  export default {
    name: 'TaskDetails',
    data () {
      return {
        task: {},
        tableData: [],
        name: '',
        level: '',
        taskStatus: '',
        category: '',
        createUser: '',
        createTime: '',
        startDateTime: '',
        endDateTime: '',
        rewardNum: '',
        pushAddress: '',
        description: '',
        iconPath: '',
        status: {
          '0': '禁用',
          '1': '启用',
          '2': '关闭'
        },
        commitTypeObj: {
          '1': 'url地址',
          '2': '图片',
          '3': '文件'
        }
      }
    },
    methods: {
      EditTask () {
        this.$router.push({
          path: '/TaskEdit',
          query: {
            taskId: this.$route.query.taskId
          }
        })
      },
      goback () {
        this.$router.go(-1)
      },
      // 报名表
      TaskEntryForm () {
        let taskId = this.$route.query.taskId
        this.$router.push({
          path: '/TaskEntryForm',
          query: {
            taskId: taskId
          }
        })
      },
      async getTaskDetails () {
        // getTaskInfo
        const res = await getTaskInfo(null, null, {
          taskId: this.$route.query.taskId
        })
        this.tableData = res.taskDetailList
        this.task = res.task
      }
    },
    mounted () {
      this.getTaskDetails()
    }
  }
</script>

<style scoped>
  .fr {
    float: right;
    margin-bottom: 20px;
  }

  .logo-img {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px solid #777;
  }

  .logo-img img {
    width: 100%;
    vertical-align: middle;
    height: 50px;
  }

  .details-content {
    border: 1px solid #dfe6ec;
    margin-bottom: 20px;
    font-size: 15px;
    clear: both;
  }

  .table-wrapper {
    padding: 2%;
  }

  .title {
    font-size: 16px;
    padding-left: 5px;
    border-left: 4px solid rgba(255, 69, 0, 0.68);
  }

  .details-content ul {
    overflow: hidden;
    padding: 10px 20px 20px;
  }

  .details-content li {
    width: 24.7%;
    float: left;
    font-size: 14px;
    line-height: 30px;
  }

</style>
