<template>
  <div class="data-statistics">
    <div class="position">我的位置：数据统计</div>
    <div class="form-wrap">
      <el-form ref="form" :inline="true" class="demo-form-inline">
        <el-form-item label="时间段：">
          <el-col :span="11">
            <el-date-picker type="date" @change="getTime" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="btn-wrap">
          <el-button type="primary" @click="getStaticsInfo">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item class="btn-wrap">
          <el-button type="primary" @click="all">所有</el-button>
          <el-button type="primary" @click="thisMouth">本月</el-button>
          <el-button type="primary" @click="thisWeek">本周</el-button>
          <el-button type="primary" @click="today">今日</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="userCount" label="通过审核用户数量">
      </el-table-column>
      <el-table-column prop="taskCount" label="任务总量" width="90px">
      </el-table-column>
      <el-table-column prop="taskDoneCount" label="已审核任务数" width="70px">
      </el-table-column>
      <el-table-column prop="taskDoingCount" label="进行中任务数" width="90px">
      </el-table-column>
      <el-table-column prop="trueValue" label="true发放总量" width="100px">
      </el-table-column>
      <el-table-column prop="ttrValue" label="ttr发放总量" width="100px">
      </el-table-column>
      <el-table-column prop="rmbValue" label="rmb发放总金额">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="dataDetails(scope.row)">统计明细表</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getStaticsInfo } from '@/api'
  export default {
    data () {
      return {
        form: {
          startDate: '',
          endDate: ''
        },
        tableData: []
      }
    },
    methods: {
      getTime (date) {
        this.startDate = date
        console.log(this.startDate, '22222')
      },
      // 统计明细表
      dataDetails (scope) {
        console.log(scope)
        this.$router.push({
          path: '/DataStatisDetail',
          query: {
            startDate: scope.startDate,
            endDate: scope.endDate
          }
        })
      },
      async getStaticsInfo () {
        this.tableData = await getStaticsInfo({
          ...this.form
        }, 'json')
      },
      all () {
        this.form.startDate = ''
        this.form.endDate = ''
        this.getStaticsInfo()
      },
      async thisMouth () {
        var now = new Date() // 当前日期
        // var nowDayOfWeek = now.getDay() // 今天本周的第几天
        // var nowDay = now.getDate() // 当前日
        var nowMonth = now.getMonth() // 当前月
        var nowYear = now.getYear() // 当前年
        nowYear += (nowYear < 2000) ? 1900 : 0 //
        function formatDate (date) {
          var myyear = date.getFullYear()
          var mymonth = date.getMonth() + 1
          var myweekday = date.getDate()

          if (mymonth < 10) {
            mymonth = '0' + mymonth
          }
          if (myweekday < 10) {
            myweekday = '0' + myweekday
          }
          return (myyear + '-' + mymonth + '-' + myweekday)
        }

        function getMonthDays (myMonth) {
          var monthStartDate = new Date(nowYear, myMonth, 1)
          var monthEndDate = new Date(nowYear, myMonth + 1, 1)
          var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
          return days
        }
        var monthStartDate = new Date(nowYear, nowMonth, 1)

        var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth))

        await getStaticsInfo({
          startDate: formatDate(monthStartDate),
          endDate: formatDate(monthEndDate)
        }, 'json')
      },
      async thisWeek () {
        var now = new Date() // 当前日期
        var nowDayOfWeek = now.getDay() // 今天本周的第几天
        var nowDay = now.getDate() // 当前日
        var nowMonth = now.getMonth() // 当前月
        var nowYear = now.getYear() // 当前年
        nowYear += (nowYear < 2000) ? 1900 : 0 //
        function formatDate (date) {
          var myyear = date.getFullYear()
          var mymonth = date.getMonth() + 1
          var myweekday = date.getDate()

          if (mymonth < 10) {
            mymonth = '0' + mymonth
          }
          if (myweekday < 10) {
            myweekday = '0' + myweekday
          }
          return (myyear + '-' + mymonth + '-' + myweekday)
        }
        var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)

        var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek))

        await getStaticsInfo({
          startDate: formatDate(weekStartDate),
          endDate: formatDate(weekEndDate)
        }, 'json')
      },
      async today () {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        var nowDate = year + '-' + month + '-' + day
        this.form.startDate = nowDate

        await getStaticsInfo({
          startDate: nowDate,
          endDate: this.form.endDate
        }, 'json')
      },
      reset () {
        this.form = {
          startDateTime: '',
          endDateTime: ''
        }
        this.getStaticsInfo()
      }
    },
    mounted () {
      this.getStaticsInfo()
    }

  }
</script>
