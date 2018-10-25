<template>
  <div class="deploy">
    暂未开发
    <!-- <div class="rizhi">
							  <div>
									<span style="line-height:36px;">更新时间：</span>
									<el-date-picker
										v-model="begindata"
										type="date"
										placeholder="选择日期">
									</el-date-picker>
									<span style="line-height:36px;">--</span>
									<el-date-picker
										v-model="enddata"
										type="date"
										placeholder="选择日期">
									</el-date-picker>
									<span style="line-height:36px;margin-left:20px;">更新者：</span>
									<el-input  style="width:120px; margin: 0 20px;"></el-input>
									<el-button type="primary">查询</el-button>
									<el-button type="warning">重置</el-button>
								</div>
								<el-button type="success" style="width:100px">新增用户</el-button>
						</div>
						<div class="quanxian-table">
							  <el-table
									:data="tableData"
									border
									style="width: 100%">
									<el-table-column  prop="date"	label="使用说明"></el-table-column>
									<el-table-column prop="name"	label="系统配置"></el-table-column>
									<el-table-column	prop="address"	label="更新者"></el-table-column>
									<el-table-column	label="操作">
										    <template slot-scope="scope">
													<el-button size="mini"
														@click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
													<el-button size="mini"
														@click="handleEdit(scope.$index, scope.row)">修改</el-button>
													<el-button size="mini"
														type="danger"
														@click="handleDelete(scope.$index, scope.row)">删除</el-button>
												</template>
									</el-table-column>
								</el-table>
								<div class="page">
										<el-pagination background layout="prev, pager, next"	:total="1000">	</el-pagination>
								</div>

						</div> -->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        ]
      }
    }
  }
</script>
<style scoped lang="less">
  .deploy {
    .rizhi {
      display: flex;
      height: 36px;
      align-content: center;
      justify-content: space-between;
    }

    .quanxian-table {
      margin-top: 20px;

      .page {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
    }
  }

</style>
