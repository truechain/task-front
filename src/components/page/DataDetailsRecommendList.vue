<template>
	<div class="">
		<div class="position">我的位置：数据统计>推荐列表</div>
		<el-form ref="form"  :inline="true"  class="demo-form-inline">
				<el-form-item label="时间段：">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>

				<el-form-item label="姓名：">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="微信昵称：">
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
					<el-button type="primary"  @click="getStaticsInfo">查询</el-button>
					<el-button @click="reset">重置</el-button>

				</el-form-item>
			</el-form>
			<div >
					<el-button type="primary" style="float:right" @click="goback">返回</el-button>
			</div>
			<div class="name">姓名：<span></span></div>
		</br>
			<div  class="data-table">
				<el-table
				:data="tableData"
				stripe
				style="width: 100%">
				<el-table-column  prop="name"	label="姓名"></el-table-column>
				<el-table-column prop="wxName"	label="微信昵称"></el-table-column>
			<!--	<el-table-column	prop="wxNum"	label="微信号"></el-table-column>-->
				<el-table-column	prop="level"	label="等级" ></el-table-column>
				<!--<el-table-column	prop="doneTaskCount"	label="完成任务数量"  ></el-table-column>
				<el-table-column	prop="rewardValue"	label="得到奖励数量"  ></el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getRecommendStats } from '@/api'
  export default {
    data () {
      return {
        tableData: [],
        pageIndex: 1,
        pageSize: 20,
        form: {
          endDate: '',
          startDate: '',
          level: '',
          name: '',
          wxNickName: ''
        }
      }
    },
    methods: {
      goback () {
        this.$router.go(-1)
      },
      async getStaticsInfo () {
        const param = {
          ...this.form,
          id: this.$route.query.id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        this.tableData = await getRecommendStats(param, 'json')
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
