<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <el-menu-item index="index">
        <span class="sb-icon"><i class="material-icons">home</i></span>
        <span class="sb-cn">首页</span>
      </el-menu-item>
      <el-menu-item index="systemmanage">
        <span class="sb-icon"><i class="material-icons">perm_data_setting</i></span>
        <span class="sb-cn">系统管理</span>
      </el-menu-item>
      <el-menu-item index="registmanage">
        <span class="sb-icon"><i class="material-icons">pie_chart</i></span>
        <span class="sb-cn">注册用户管理</span>
      </el-menu-item>
      <el-menu-item index="taskmanage">
        <span class="sb-icon"><i class="material-icons">content_paste</i></span>
        <span class="sb-cn">任务管理</span>
      </el-menu-item>
      <el-menu-item index="DataStatics">
        <span class="sb-icon"><i class="material-icons">border_all</i></span>
        <span class="sb-cn">数据统计</span>
      </el-menu-item>
      <el-menu-item index="deploymanage">
        <span class="sb-icon"><i class="material-icons">content_paste</i></span>
        <span class="sb-cn">配置管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>
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
