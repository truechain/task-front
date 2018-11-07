<template>
  <div>
    <div class="position">我的位置：配置管理>参数配置</div>
    <el-tabs v-model="activeName">
      <!-- 角色管理部分 -->
      <el-tab-pane label="配置管理" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="类型名称:">
            <el-input v-model="formInline.userName" placeholder="输入名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="数据类型:">
            <el-input v-model="formInline.realName" placeholder="请输入名称"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="getUserPage">查询</el-button>
            <el-button type="warning" @click="clearRole">重置</el-button>
            <el-button type="success" @click="addUserDialog = true">新增用户</el-button>
          </el-form-item>
        </el-form>
        <div class="quanxian-table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="manageName" label="类型名称"></el-table-column>
            <el-table-column prop="typeName" label="类型key"></el-table-column>
            <!-- <el-table-column prop="configType" label="数据类型"></el-table-column> -->
            <el-table-column prop="configData" label="类型值">
              <template slot-scope="scope">
                <span>{{scope.row.configData}}</span>
                <!-- <template v-if="scope.row.configType === 2">
                  <span v-for="(item, index) in scope.row.configData">
                    {{item.value}}
                  </span>
                </template>
                <template v-else>
                  {{scope.row.configData}}
                </template> -->
              </template>
            </el-table-column>
            <el-table-column prop="datetime" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
                <el-button size="small" type="danger" @click="handleDelete( scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination v-show="roleTotal || roleTotal>0" @current-change="rolePageChange" :current-page.sync="rolePageIndex"
              :page-size="rolePageSize" :total="roleTotal" background layout="total,prev, pager, next"> </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-dialog title="新增" :visible.sync="addUserDialog" label-width="80px">
        <el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="类型名称:" prop="username">
            <el-input v-model="addForm.manageName" placeholder="类型名称"></el-input>
          </el-form-item>
          <el-form-item label="类型key:" prop="password">
            <el-input v-model="addForm.typeName" placeholder="类型key"></el-input>
          </el-form-item>
          <!-- <el-form-item label="数据类型:" prop="comfirmPassword">
            <el-input v-model="addForm.configType" placeholder="数据类型"></el-input>
          </el-form-item> -->
          <el-form-item label="类型值:" prop="realName">
            <el-input v-model="addForm.configData" placeholder="多个类型值请用 ',' 分开"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserDialog = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改" :visible.sync="editDialog" label-width="80px">
        <el-form :inline="true" :model="editingItem" ref="editForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="类型名称:" prop="username">
            <el-input v-model="editingItem.manageName" placeholder="请输入类型名称"></el-input>
          </el-form-item>
          <el-form-item label="类型key:" prop="password">
            <el-input v-model="editingItem.typeName" placeholder="请输入类型key"></el-input>
          </el-form-item>
          <!-- <el-form-item label="数据类型:" prop="comfirmPassword">
            <el-input v-model="editingItem.configType" placeholder="请输入数据类型"></el-input>
          </el-form-item> -->
          <el-form-item label="类型值:" prop="realName">
            <template slot-scope="scope">
              <el-input v-model="editingItem.configData" placeholder="请输入类型值"></el-input>
                <!-- <template v-if="editingItem.configType === 2">
                  <div v-for="(item, index) in editingItem.configData">
                    <el-input :value="item.value" :placeholder="item.key"></el-input>
                  </div>
                </template>
                <template v-else>
                  <el-input v-model="editingItem.configData" placeholder="请输入类型值"></el-input>
                </template> -->
              </template>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
      </el-dialog>

    </el-tabs>
  </div>
</template>
<script>
  import {
    addUserAPI,
    getUserInfoAPI,
    updateAuthUserAPI,
    deleteAuthUserAPI,

    addManage,
    getTaskPageManage,
    updateManage,
    deleteManage
  } from '@/api'
  import qs from 'qs'
  export default {
    data () {
      /* const password = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.addForm.comfirmPassword !== '') {
            this.$refs.addForm.validateField('comfirmPassword')
          }
          callback()
        }
      }
      const comfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.addForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      const phoneRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!(/^1[3|4|5|8|2|7|6|9][0-9]\d{8}$/.test(value))) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      } */

      return {
        rolePageIndex: 1,
        rolePageSize: 10,
        roleTotal: 0,
        activeName: 'first',
        formInline: {
          userName: '',
          realName: '',
          phone: '',
          roleName: ''
        },
        addForm: {
          configType: null,
          configData: '',
          manageName: '',
          typeName: ''
        },
        roleName: '',
        tableData: [],
        form: {},
        addUserDialog: false,
        radio2: '',
        roleList: [],
        rules: {
          /*

          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: password,
            trigger: 'blur'
          }
          ],
          comfirmPassword: [{
            required: true,
            message: '请输入确认密码',
            trigger: 'blur'
          },
          {
            validator: comfirmPassword,
            trigger: 'blur'
          }
          ],
          phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: phoneRule,
            trigger: 'blur'
          }
          ],
          realName: [{
            required: true,
            message: '请输入登录账号',
            trigger: 'blur'
          } ],
          username: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          } ]

        */
        },
        isSee: false,
        editDialog: false,
        id: '',
        editRules: {},
        editingItem: {}
      }
    },
    async created () {
      this.getUserPage()
    },
    methods: {
      // 角色管理部分-------------
      async getUserPage () {
        const { content, totalElements } = await getTaskPageManage({
          'pageIndex': 1,
          'pageSize': 20
        }, 'json')

        this.tableData = content
        this.roleTotal = totalElements
      },
      // 获取角色下拉
      clearRole () {
        this.formInline = {
          userName: '',
          realName: '',
          phone: '',
          roleName: ''
        }
      },
      rolePageChange (value) {
        this.rolePageIndex = value
        this.getUserPage()
      },

      // 新增角色
      async addUser () {
        await addManage({
          ...this.addForm,
          configType: 0
        }, 'json')
        this.addUserDialog = false
        this.getUserPage()
      },
      // 编辑角色
      async editUser () {
        await updateManage(this.editingItem, 'json')
        this.editDialog = false
        this.getUserPage()
        // console.log(this.editingItem, 'this.editingItem')
      },
      // 删除
      async handleDelete (id) {
        await deleteManage(null, null, { id })
        this.getUserPage()
      },
      // 操作 修改和查看
      handleEdit (row) {
        this.editingItem = JSON.parse(JSON.stringify(row))
        this.editDialog = true
        // this.isSee = true
      },
      // 获取系统用户信息
      async getUserInfo (id) {
        let param = {
          userId: id
        }
        this.editForm = await getUserInfoAPI(qs.stringify(param))
        this.editDialog = true
      }
    }
  }
</script>
<style lang="less" scoped>
  .quanxian {
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

  .jiaose,
  .yonghu,
  .rizhi {
    display: flex;
    height: 36px;
    align-content: center;
    justify-content: space-between;
  }

  .flexd {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }

</style>
