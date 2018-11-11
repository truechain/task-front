<template>
  <div class="task-content">
    <div class="position">我的位置：任务管理</div>
    <div class="form-wrap">
      <el-form ref="form" :inline="true" class="demo-form-inline">
        <el-form-item label="发布时间：">
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
        <el-form-item label="发布者：">
          <el-input v-model="form.createUser"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="form.taskStatus" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="关闭" value="2"></el-option>
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="任务等级：">
					<el-select v-model="form.level" placeholder="全部">
						<el-option label="全部" value=""></el-option>
						<el-option label="A" value="A"></el-option>
						<el-option label="B" value="B"></el-option>
						<el-option label="C" value="C"></el-option>
						<el-option label="D" value="D"></el-option>
						<el-option label="S" value="S"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="任务完成状态：">
          <el-select v-model="form.auditStatus" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="已完成" value="1"></el-option>
            <el-option label="未完成" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务类别：">
          <el-select v-model="form.category" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="个人" value="0"></el-option>
            <el-option label="团体" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn-wrap">
          <el-button type="primary" @click="getTaskInfo">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item class="btn-wrap fr" style="margin-right: 0;">
          <router-link to="taskNew">
            <el-button icon="el-icon el-icon-plus">新增</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="任务名称">
      </el-table-column>
      <el-table-column prop="level" label="任务等级" width="90px">
      </el-table-column>
      <el-table-column prop="taskStatus" label="状态" width="70px">
        <template slot-scope="scope">
          <span>{{taskStatusObj[scope.row.taskStatus]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="任务类别" width="90px">
         <template slot-scope="scope">
          <span>{{scope.row.category === 0 ? '个人' : '团队' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUser" label="发布者" width="100px">
      </el-table-column>
      <el-table-column prop="auditStatus" label="任务完成状态" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.auditStatus === 0 ? '未完成' : '已完成' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="发布时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="taskDetails(scope.row)">查看详情</el-button>
          <el-button size="mini" @click="taskEntryForm(scope.row)">报名表</el-button>
          <el-button size="mini" @click="disableTAsk(scope.row)">{{ scope.row.taskStatus === 1 ? '禁用' : '启用'}}</el-button>
          <!-- <el-button size="mini" type="danger" @click="EditTask(scope.row)" v-if="scope.row.taskStatus!=='关闭'">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination v-show="total || total>0" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
        :page-size="pageSize" :total="total" background layout="total,prev, pager, next"> </el-pagination>
    </div>
  </div>
</template>
<script>
  import { getTaskPage, disableTask, enableTask } from '@/api'
  export default {
    data () {
      return {
        taskStatusObj: {
          '0': '禁用',
          '1': '启用',
          '2': '关闭'
        },
        form: {
          startDateTime: '',
          endDateTime: '',
          name: '',
          createUser: '',
          taskStatus: '',
          level: '',
          auditStatus: '',
          category: ''
        },
        tableData: [],
        pageIndex: 1,
        pageSize: 20,
        total: 1
      }
    },
    methods: {
      async disableTAsk (row) {
        if (row.taskStatus === 1) {
          await disableTask(null, null, {
            taskId: row.id
          })
        } else {
          await enableTask(null, null, {
            taskId: row.id
          })
        }
        this.getTaskInfo()
      },
      /* 重置 */
      reset () {
        this.form = {
          startDateTime: '',
          endDateTime: '',
          name: '',
          createUser: '',
          taskStatus: '',
          level: '',
          auditStatus: '',
          category: ''
        }
      },
      /* 编辑 */
      EditTask (scope) {
        this.$router.push({
          path: '/TaskEdit',
          query: {
            taskId: scope.id
          }
        })
      },
      /* 查看详情 */
      taskDetails (scope) {
        this.$router.push({
          path: '/TaskDetails',
          query: {
            taskId: scope.id
          }
        })
      },
      /* 报名表 */
      taskEntryForm (scope) {
        this.$router.push({
          path: '/TaskEntryForm',
          query: {
            taskId: scope.id
          }
        })
      },
      handleCurrentChange (value) {
        this.pageIndex = value
        this.getTaskInfo()
      },
      async getTaskInfo () {
        if (this.form.startDateTime) {
          this.form.startDateTime = this.$moment((+new Date(this.form.startDateTime))).format(
              'YYYY-MM-DD HH:mm:ss')
          this.form.endDateTime = this.$moment((+new Date(this.form.endDateTime))).format(
              'YYYY-MM-DD HH:mm:ss')
        }
        let param = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          ...this.form
        }
        const res = await getTaskPage(param, 'json')
        this.tableData = res.content
        this.total = res.totalElements
      }
    },
    mounted () {
      this.getTaskInfo()
    }
  }
</script>
<style>
  .el-select .el-input__inner {
    width: 200px;
  }

</style>
