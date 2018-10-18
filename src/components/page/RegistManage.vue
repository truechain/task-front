<template>
	<div class="task-content">
		<div class="position">我的位置：注册用户管理</div>
		<div class="form-wrap">
			<el-form ref="form" label-width="70px">
				<el-form-item label="注册时间：">
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
				<el-form-item label="审核状态：">
					<el-select v-model="form.auditStatus" placeholder="全部">
						<el-option label="全部" value=""></el-option>
						<el-option label="未审核" value="0"></el-option>
						<el-option label="已审核" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="等级：">
					<el-select v-model="form.level" placeholder="全部">
						<el-option label="全部" value=""></el-option>
						<el-option label="A" value="a"></el-option>
						<el-option label="B" value="b"></el-option>
						<el-option label="C" value="c"></el-option>
						<el-option label="S" value="s"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item class="btn-wrap">
					<el-button type="primary" @click="getUserPage" >查询</el-button>
					<el-button @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="tableData" stripe  style="width: 100%">
			<el-table-column prop="personName" align="center" label="姓名" >
			</el-table-column>
			<el-table-column prop="wxNickName" align="center" label="微信昵称" >
			</el-table-column>
			<!-- <el-table-column prop="wxNum" align="center" label="微信号" >
			</el-table-column> -->
			<el-table-column prop="auditStatusName" align="center" label="审核状态" >
			</el-table-column>
			<el-table-column prop="mobile"  align="center" label="联系电话" >
			</el-table-column>
			<el-table-column prop="level" align="center" label="等级" >
			</el-table-column>
			<el-table-column prop="createTime" align="center" label="注册时间" width="150" >
			</el-table-column>
			<el-table-column label="操作" align="center" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="getDetail(scope)">查看详情</el-button>
					<el-button size="small" v-if='scope.row.auditStatus==-1' @click="typeButton(scope,1)">审核</el-button>
					<el-button size="small" v-if='scope.row.auditStatus==1' type="danger" @click="typeButton(scope,2)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		 <el-dialog :title= " isAudit ? '审核':'修改'"  width="30%" :visible.sync="dialogVis" >
            <el-form :model="dialogForm"   label-width="80px" >
                <el-form-item label="评级：" >
                    <el-select v-model="dialogForm.level" >
                        <el-option label="A" value="A"></el-option>
                        <el-option label="B" value="B"></el-option>
                        <el-option label="C" value="C"></el-option>
                        <el-option label="D" value="D"></el-option>
                        <el-option label="S" value="S"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if='isAudit' label="红包金额：" >
                    <el-select  v-model="dialogForm.rewardNum" >
                        <el-option label="0" value="0"></el-option>
                        <el-option label="10" value="10"></el-option>
                        <el-option label="20" value="20"></el-option>
                        <el-option label="30" value="30"></el-option>
                        <el-option label="40" value="40"></el-option>
                        <el-option label="50" value="50"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="typeCommit">确 定</el-button>
            </div>
        </el-dialog>
		<div class="page">
			<el-pagination v-show="total || total>0"	@current-change="handleCurrentChange" :current-page.sync="pageIndex"
       		 :page-size="pageSize" :total="total"  background layout="total,prev, pager, next" >	</el-pagination>
		</div>
		<div class="tips" v-show="showss">{{tips}}</div>
	</div>
</template>
<script>
import qs from 'qs'
	export default {
		data() {
			return {
				showss:false,
				tips:'',
				userId:'',
				dialogVis:false,
				isAudit:false,
				form: {
				 	auditStatus:'' ,
				 	endDate: "",
				 	level: "",
				 	name: "",
				 	startDate: "",
				 	wxNickName: ""
				},
				dialogForm: {
					level:'',
					rewardNum:''
				},
				total:1,
				pageIndex: 1,
				pageSize: 10,
				tableData: []
			}
		},
		methods:{
			handleCurrentChange(value){
				this.pageIndex = value
				this.getUserPage()
			},
			typeButton(scope,type) {
				this.userId = scope.row.id
				if(type=='1'){
					this.isAudit = true
					this.dialogForm.level = scope.row.level || ''
				} else {
					this.isAudit = false
				}
				this.dialogVis = true
			},
			typeCommit(){
				let url
				let param= {
					userId:this.userId,
					level:this.dialogForm.level,
					rewardNum:this.dialogForm.rewardNum
				}
				if(this.isAudit) {
					url='http://www.phptrain.cn/admin/user/auditUser'
				} else {
					url='http://www.phptrain.cn/admin/user/updateUser'
				}
				this.$http.post(url,qs.stringify(param) )
					.then(res => {
						if (res.data.message === "成功") {
							this.tips = '操作成功';
							this.showTips();
							this.getUserPage()
							this.dialogVis = false
						} else {
							this.tips = res.data.message;
							this.showTips();
						}
					})

			},
			getUserPage () {
				let param = {
					auditStatus:this.form.auditStatus ,
					endDate: this.form.endDate,
					level: this.form.level,
					name: this.form.name,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					startDate: this.form.startDate,
					wxNickName: this.form.wxNickName
				}
				let url ="http://www.phptrain.cn/admin/user/getUserPage";
				this.$http.post(url,param, {headers: {
						"Content-Type": "application/json"}})
					.then(res => {
						if (res.data.message === "成功") {
							if(res.data.result) {
								res.data.result.content.forEach(function(list){
									if(list.auditStatus==0 ||list.auditStatus==-1 ){
										list.auditStatusName='未审核'
									}
									if(list.auditStatus==1){
										list.auditStatusName='已审核'
									}
								})
								this.tableData = res.data.result.content;
								this.total=res.data.result.totalElements;
							}
						} else {
							this.tips = res.data.message;
							this.showTips();
						}
					})
			},
			getDetail (scope) {
				this.$router.push({
					path: "/RegistDetail",
					query: {
						id: scope.row.id
					}
				})
			},
			showTips(callback) {
				this.showss = true;
				var _this = this;
				setTimeout(function() {
					_this.showss = false;
					if (callback) {
						callback();
						}
				}, 1000);
			},
			reset () {
				this.form = {
				 	auditStatus:'' ,
				 	endDate: "",
				 	level: "",
				 	name: "",
				 	startDate: "",
				 	wxNickName: ""
				}
			}
		},
		mounted () {
			this.getUserPage()
		}
	}
</script>
<style>
.tips {
  position: absolute;
  background-color: #00aaee;
  color: white;
  text-align: left;
  width: 200px;
  padding: 20px 20px;
  word-break: break-all;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -120px;
  border-radius: 5px;
}
.task-content .el-form-item__label {
  text-align: left;
  padding-right: 0;
}

.task-content .el-form-item {
  margin-bottom: 7px;
}
.task-content .el-table .cell,
.el-table th > div {
  padding: 0 0 0 10px;
}
.btn-wrap .el-form-item__content {
  margin-left: 7px !important;
}

.btn-wrap .el-button + .el-button {
  margin-left: 2px;
}

.task-content .line {
  text-align: center;
}
.task-content .page {
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 20px;
}
.position {
  font-size: 15px;
  margin-bottom: 10px;
}

.el-form-item {
  display: inline-block;
  overflow: hidden;
}

.block .name {
  line-height: 36px;
  display: inline-block;
  font-size: 15px;
}
</style>
