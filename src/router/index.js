import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/Home'
import Index from '@/components/page/Index'

import RegistManage from '@/components/page/RegistManage'
import RegistDetail from '@/components/page/RegistDetail'
import TaskManage from '@/components/page/TaskManage'
import DataStatisDetail from '@/components/page/DataStatisDetail'
import DataStatics from '@/components/page/DataStatics'
import LookTaskDetail from '@/components/page/LookTaskDetail'

import DeployManage from '@/components/page/DeployManage'

import TaskDetails from '@/components/page/TaskDetails'
import TaskNew from '@/components/page/TaskNew'
import TaskEdit from '@/components/page/TaskEdit'
import TaskEntryForm from '@/components/page/TaskEntryForm'
import TaskAudit from '@/components/page/TaskAudit'

import Login from '@/components/page/Login'
import DataDetailsTaskList from '@/components/page/DataDetailsTaskList'
import DataDetailsRecommendList from '@/components/page/DataDetailsRecommendList'
import DataDetailsRewardList from '@/components/page/DataDetailsRewardList'

import SystemView from '@/components/page/system'
import SystemLimits from '@/components/page/system/children/Limits'
import SystemLog from '@/components/page/system/children/Log'
import RoleManage from '@/components/page/system/children/RoleManage'
import UserManage from '@/components/page/system/children/UserManage'

import StaticView from '@/components/page/statistics'
import StaticDetail from '@/components/page/statistics/children/detail'
import StaticTask from '@/components/page/statistics/children/task'
import StaticCommend from '@/components/page/statistics/children/commend'
import StaticAward from '@/components/page/statistics/children/award'
import StaticBill from '@/components/page/statistics/children/Bill'

Vue.use(Router)

export default new Router({
  // mode:'history',
  // base: __dirname,
  routes: [{
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        component: Index
      },
      {
        path: '/Index',
        name: 'index',
        component: Index
      },
      {
        path: '/system',
        component: SystemView,
        children: [
          {
            path: '',
            component: SystemLimits
          },
          {
            path: 'limits',
            name: 'limits',
            component: SystemLimits
          },
          {
            path: 'log',
            name: 'log',
            component: SystemLog
          },
          {
            path: 'role',
            name: 'role',
            component: RoleManage
          },
          {
            path: 'user',
            name: 'user',
            component: UserManage
          }
        ]
      },
      {
        path: '/statistics',
        component: StaticView,
        children: [
          {
            path: 'detail',
            name: 'detail',
            component: StaticDetail
          },
          {
            path: 'task',
            name: 'task',
            component: StaticTask
          },
          {
            path: 'commend',
            name: 'commend',
            component: StaticCommend
          },
          {
            path: 'award',
            name: 'award',
            component: StaticAward
          },
          {
            path: 'bill',
            name: 'bill',
            component: StaticBill
          }
        ]
      },
      {
        path: '/RegistManage',
        name: 'registmanage',
        component: RegistManage
      },
      {
        path: '/RegistDetail',
        name: 'registdetail',
        component: RegistDetail
      },
      {
        path: '/TaskManage',
        name: 'taskmanage',
        component: TaskManage
      },
      {
        path: '/DataStatics',
        name: 'datastatics',
        component: DataStatics
      },
      {
        path: '/DataDetailsTaskList',
        name: 'datadetailstasklist',
        component: DataDetailsTaskList

      }, {
        path: '/DataDetailsRecommendList',
        name: 'datadetailsrecommendlist',
        component: DataDetailsRecommendList

      },
      {
        path: '/DataDetailsRewardList',
        name: 'datadetailsrewardlist',
        component: DataDetailsRewardList

      },
      {
        path: '/DataStatisDetail',
        name: 'datastatisdetail',
        component: DataStatisDetail
      },
      {
        path: '/LookTaskDetail',
        name: 'looktaskdetail',
        component: LookTaskDetail
      },
      {
        path: '/deploymanage',
        name: 'deploymanage',
        component: DeployManage
      }, {
        path: '/TaskDetails',
        name: 'taskdetails',
        component: TaskDetails
      }, {
        path: '/TaskNew',
        name: 'tasknew',
        component: TaskNew
      }, {
        path: '/TaskEdit',
        name: 'taskedit',
        component: TaskEdit
      },
      {
        path: '/TaskAudit',
        name: 'taskaudit',
        component: TaskAudit
      },
      {
        path: '/TaskEntryForm',
        name: 'taskentryform',
        component: TaskEntryForm
      }
    ]
  }, {
    path: '/',
    component: Login
  }, {
    path: '/login',
    component: Login
  }]
})
