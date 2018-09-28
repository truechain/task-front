<template>
    <div class="yonghu">
        <div>
            <span style="line-height:36px;">登录账号：</span>
            <el-input placeholder="请输入内容" style="width:120px; margin: 0 20px;"></el-input>
            <span style="line-height:36px;">姓名：</span>
            <el-input placeholder="请输入内容" style="width:120px; margin: 0 20px;"></el-input>
            <span style="line-height:36px;">手机号：</span>
            <el-input placeholder="请输入内容" style="width:120px; margin: 0 20px;"></el-input>
            <span style="line-height:36px;">系统角色：</span>
            <el-input placeholder="请输入内容" style="width:120px; margin: 0 20px;"></el-input>
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
                <el-table-column  prop="date"	label="登录账号"></el-table-column>
                <el-table-column prop="name"	label="姓名"></el-table-column>
                <el-table-column	prop="address"	label="手机号"></el-table-column>
                <el-table-column label="系统角色"></el-table-column>
                <el-table-column label="描述"></el-table-column>
                <el-table-column	label="操作">
                        <template slot-scope="scope">
                                <el-button size="small"
                                    @click="handleEdit(scope.$index, scope.row)" type="primary">查看详情</el-button>
                                <el-button size="small"
                                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                <el-button size="small"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                </el-table-column>
            </el-table>
            <div class="page">
                    <el-pagination background layout="prev, pager, next"	:total="1000">	</el-pagination>
            </div>

    </div>
</template>
<script>
import qs from 'qs'
export default {
	data() {
		return {}
	},
}
</script>
