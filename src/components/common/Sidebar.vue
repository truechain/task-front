<template>
  <div class="sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      theme="dark"
      unique-opened
      router
    >
      <el-menu-item :route="{ path: '/home'}" index="/home">
        <span class="sb-icon"><i class="material-icons">home</i></span>
        <span class="sb-cn">首页</span>
      </el-menu-item>
      <!-- <el-menu-item index="systemmanage">
        <span class="sb-icon"><i class="material-icons">perm_data_setting</i></span>
        <span class="sb-cn">系统管理</span>
      </el-menu-item> -->
      <el-submenu index="system">
        <template slot="title">
          <span class="sb-icon">
            <i class="material-icons">perm_data_setting</i>
          </span>
          <span class="sb-cn">系统管理</span>
        </template>
          <!-- <el-menu-item
            index="limits"
            :route="{ name: 'limits'}">
            权限管理
          </el-menu-item> -->
          <el-menu-item
            index="user"
            :route="{ name: 'role'}">
            角色管理
          </el-menu-item>
          <!-- <el-menu-item
            index="role"
            :route="{ name: 'user'}">
            用户管理
          </el-menu-item> -->
          <!-- <el-menu-item
            index="log"
            :route="{ name: 'log'}">
            日志
          </el-menu-item> -->
      </el-submenu>
      <el-menu-item :route="{ path: '/registmanage'}" index="/registmanage">
        <span class="sb-icon">
          <i class="material-icons">pie_chart</i>
        </span>
        <span class="sb-cn">注册用户管理</span>
      </el-menu-item>
      <el-menu-item :route="{ path: '/taskmanage'}" index="/taskmanage">
        <span class="sb-icon">
          <i class="material-icons">content_paste</i>
        </span>
        <span class="sb-cn">任务管理</span>
      </el-menu-item>
      <!-- <el-menu-item :route="{ path: '/DataStatics'}" index="/DataStatics">
        <span class="sb-icon"><i class="material-icons">border_all</i></span>
        <span class="sb-cn">数据统计</span>
      </el-menu-item> -->
       <el-submenu :route="{ path: '/statistics'}" index="/statistics">
        <template slot="title">
          <span class="sb-icon">
            <i class="material-icons">border_all</i>
          </span>
          <span class="sb-cn">数据统计</span>
        </template>
          <el-menu-item
            index="bill"
            :route="{ name: 'bill'}">
            奖励清单
          </el-menu-item>
          <el-menu-item
            index="detail"
            :route="{ name: 'detail'}">
            统计详情
          </el-menu-item>
          <!-- <el-menu-item
            index="task"
            :route="{ name: 'task'}">
            任务列表
          </el-menu-item>
          <el-menu-item
            index="commend"
            :route="{ name: 'commend'}">
            推荐列表
          </el-menu-item>
          <el-menu-item
            index="award"
            :route="{ name: 'award'}">
            奖励列表
          </el-menu-item> -->
      </el-submenu>
      <el-menu-item :route="{ path: '/deploymanage'}" index="/deploymanage">
        <span class="sb-icon">
          <i class="material-icons">content_paste</i>
        </span>
        <span class="sb-cn">配置管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 200px;
    left: 0;
    top: 66px;
    bottom: 0;
    background: #324157;

  }

  .sidebar>ul {
    height: 100%;
  }

  .el-menu-item,
  .el-submenu__title {
    font-size: 14px;

  }

  .material-icons {
    font-size: 12px;
  }

</style>
