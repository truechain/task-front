<template>
 <div>
	  <el-tabs v-model="activeName" @tab-click="handleClick">
			<!-- 权限管理部分 -->
			<el-tab-pane label="权限管理" name="first">
				<customer-manage>
				</customer-manage>
			</el-tab-pane>

			<!-- 角色管理部分 -->
			<el-tab-pane label="角色管理" name="second">
					
			</el-tab-pane>

			<!-- 用户管理部分 -->
			<el-tab-pane label="用户管理" name="third">
					
			</el-tab-pane>

			<!-- 日志部分 -->
			<el-tab-pane label="日志" name="fourth">
					
			</el-tab-pane>
		</el-tabs>
 </div>
</template>
<script>
import {getResourcePageAPI,getRolePageAPI,addResourceAPI} from "@/api/GaoAPI"
import customerManage from './customerManage'
import qs from 'qs'
export default {
	data(){
		return {
			rolePageIndex:'1',
			rolePageSize:'10',
			roleTotal:'',
			formLabelWidth:"120px",
			activeName: 'first',
			roleName:'',   
			tableData: [],
			form:{},
			options: [{
			value: '选项1',
			label: '全部'
			}, {
			value: '选项2',
			label: '启用'
			}, {
			value: '选项3',
			label: '禁用'
			}],
				optionsValue:"",
			  begindata:'',
				enddata:'',
				addQuanXianPanel:false,
				models:[{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }]
			}
		},
	methods: {
      	handleClick(tab, event) {
				if (tab.label == "角色管理"){
					 // 发送角色管理请求
					 this.getRolePage()
				} else if(tab.label == "用户管理"){
					this.$router.push({path:"/TaskDetail"})
					
				}

			},
		// 权限部分-------------
		getResourcePage(){
			let param= {
				name:this.roleName,
				pageIndex:this.rolePageIndex,
				pageSize:this.rolePageSize
			}
			this.$http.post(getResourcePageAPI,qs.stringify(param)).then(res => {
				if (res.data.message === "成功") {
					if(res.data.result) {
						this.tableData = res.data.result.content;								
						this.roleTotal=res.data.result.totalElements;
					}
				} else {
					this.tips = res.data.message;
					this.showTips();
				}
			})
		},
		clearRole(){
			this.roleName=''
		},
		rolePageChange(value){
			this.rolePageIndex = value
			this.getResourcePage()
		},
		// 添加权限
		addResourceAPI(){
				let params = {
					id:"11",
					name:"22",
				}
				this.$http.post(addResourceAPI,params).then(res=>{
					console.log(res)
				})
		},
		quanxianAdd(){
				this.addQuanXianPanel = false
				alert("确定添加！")
			//  console.log(this.$refs.tree.getCheckedNodes());
				this.addResourceAPI()
		},
		getRolePage(pageIndex,pageSize){
				if(!pageSize){
					var pageSize = 10
				}
				let params = new FormData()
				params.append("pageIndex",pageIndex)
				params.append("pageSize",pageSize)
				this.$http.post(getRolePageAPI,params).then(res=>{
					console.log(res)
				})
		}
	},
	created() {
		this.getResourcePage(1)
	}
 }
</script>	
<style lang="less" scoped>
.quanxian{
	 display: flex;
	 height: 36px;
	 align-content: center;
	 justify-content: space-between;
	
}
.quanxian-table{
	margin-top: 20px;
	.page{
			display: flex;
			justify-content: center;
			margin-top: 20px;
	}
}
.jiaose,.yonghu,.rizhi{
	 display: flex;
	 height: 36px;
	 align-content: center;
	 justify-content: space-between;
}
.flexd{
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
}

</style>

