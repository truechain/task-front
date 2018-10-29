import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/Home'
import Index from '@/components/page/Index'
import SystemManage from '@/components/page/SystemManage'

import RegistManage from '@/components/page/RegistManage'
import RegistDetail from '@/components/page/RegistDetail'
import TaskManage from '@/components/page/TaskManage'
import DataStatisDetail from '@/components/page/DataStatisDetail'
import DataStatics from '@/components/page/DataStatics'

import DeployManage from '@/components/page/DeployManage'
import TaskDetails from '@/components/page/TaskDetails'
import TaskNew from '@/components/page/TaskNew'
import TaskEdit from '@/components/page/TaskEdit'
import TaskEntryForm from '@/components/page/TaskEntryForm'
import Login from '@/components/page/Login'
import DataDetailsTaskList from '@/components/page/DataDetailsTaskList'
import DataDetailsRecommendList from '@/components/page/DataDetailsRecommendList'
import DataDetailsRewardList from '@/components/page/DataDetailsRewardList'
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
        component: Index
      },
      {
        path: '/systemManage',
        component: SystemManage
      },
      {
        path: '/RegistManage',
        component: RegistManage
      },
      {
        path: '/RegistDetail',
        component: RegistDetail
      },
      {
        path: '/TaskManage',
        component: TaskManage
      },
      {
        path: '/DataStatics',
        component: DataStatics
      },
      {
        path: '/DataDetailsTaskList',
        component: DataDetailsTaskList

      }, {
        path: '/DataDetailsRecommendList',
        component: DataDetailsRecommendList

      },
      {
        path: '/DataDetailsRewardList',
        component: DataDetailsRewardList

      },
      {
        path: '/DataStatisDetail',
        component: DataStatisDetail
      }, {
        path: '/DeployManage',
        component: DeployManage
      }, {
        path: '/TaskDetails',
        component: TaskDetails
      }, {
        path: '/TaskNew',
        component: TaskNew
      }, {
        path: '/TaskEdit',
        component: TaskEdit
      },
      {
        path: '/TaskEntryForm',
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
