import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Regist from "@/components/Regist"
import OptionDetail from "@/components/OptionDetail"
import PersonInformation from "@/components/PersonInformation"

import List from '@/components/list/List'
import Task from '@/components/task/Task'
import Mine from '@/components/mine/Mine'
import Recommend from '@/components/mine/Recommend'
import TaskDetail from '@/components/taskDetail/taskDetail'

Vue.use(Router)

export default new Router({
  linkActiveClass: "active",
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/list"
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "登录"
      }
    },
    {
      path: "/regist",
      name: "Regist",
      component: Regist,
      meta: {
        title: "注册"
      }
    },
    {
      path: "/optiondetail",
      name: "OptionDetail",
      component: OptionDetail,
      meta: {
        title: "使用说明"
      }
    },
    {
      path: "/personinformation",
      name: "PersonInformation",
      component: PersonInformation,
      meta: {
        title: "完善个人信息"
      }
    },
    {
      path: "/list",
      name: "List",
      component: List,
      meta: {
        title: "任务列表"
      }
    },
    {
      path: "/task",
      name: "Task",
      component: Task,
      meta: {
        title: "我的任务"
      }
    },
    {
      path: "/mine",
      name: "Mine",
      component: Mine,
      meta: {
        title: "个人中心"
      }
    },
    {
      path: "/recommend",
      name: "Recommend",
      component: Recommend,
      meta: {
        title: "推荐记录"
      }
    },
    {
      path: "/taskDetail/:id",
      name: "TaskDetail",
      component: TaskDetail,
      meta: {
        title: "任务详情"
      }
    }
  ]
  //scrollBehavior(to, from,savedPosition) {
  //  return {
  //    x: 0,
  //    y: 0
  //  }
  //}
});
