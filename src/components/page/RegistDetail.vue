<template>
  <div class="task-details-wrapper">
    <div class="position">我的位置：注册用户管理 > 查看详情</div>
    <div class="fr">
      <el-button @click="onBlock">加入黑名单</el-button>
      <el-button @click="goback">返回</el-button>
      <el-button @click="onAudit">审核</el-button>
      <el-button @click="onChange">修改</el-button>
    </div>
    <div class="details-content">
      <div class="title">基本信息</div>
      <ul>
        <li>姓名：<span> {{tableData.sysUser.personName}}</span></li>
        <li>微信昵称：<span> {{tableData.sysUser.wxNickName}}</span></li>
        <li>微信号：<span> {{tableData.sysUser.wxNum || '暂无'}}</span></li>
        <li>审核状态：<span> {{auditStatusObj[tableData.sysUser.auditStatus]}}</span></li>
        <li>联系方式：<span> {{tableData.sysUser.mobile}}</span></li>
        <li>等级：<span> {{tableData.sysUser.level}}</span></li>
        <li>推荐码：<span> {{tableData.sysUser.recommendShareCode || '无'}}</span></li>
        <li>提交时间：<span> {{tableData.sysUser.updateTime}}</span></li>
        <li style="width: 100%;">钱包地址：<span> {{tableData.sysUser.trueChainAddress}}</span></li>
        <li style="width: 100%;">黑名单：<span> {{ tableData.sysUser.auditStatus === -2 ? '是' : '否' }}</span></li>
        <li style="width: 100%;">用户来源：<span> {{ tableData.sysUser.recommendResource }}</span></li>
        <li>推荐人微信昵称：<span>{{tableData.refererWXName || '无'}}</span></li>
        <li>推荐人手机号：<span>{{tableData.refererPhone || '无'}}</span></li>
        <li>推荐人钱包地址：<span>{{tableData.refererAddress || '无'}}</span></li>
        <li></li>
      </ul>
    </div>
    <div class="details-content" style="height:120px">
      <div class="title">附件信息</div>
      <div>
        <img src="./../../../static/images/jianli.png" alt="" class="pic-left">
        <div class="cont-right">
          <p>{{tableData.userName}}简历</p>
          <!-- <el-button @click="resume">预览</el-button> -->
          <el-button @click="downLoad">下载</el-button>
        </div>
      </div>
    </div>
    <div>
      <pdf v-if="dialogVis" :src="resumeFilePath"></pdf>
      <!-- <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas> -->
    </div>
    <el-dialog title="审核" width="30%" :visible.sync="auditDia">
      <el-form :model="auditItem" label-width="80px">
        <el-form-item label="评级：">
          <el-select v-model="auditItem.level">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
            <el-option label="D" value="D"></el-option>
            <el-option label="S" value="S"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="auditItem" label-width="80px">
        <el-form-item label="红包金额">
          <el-select v-model="auditItem.money">
            <el-option label="0" value="0"></el-option>
            <el-option label="10" value="10"></el-option>
            <el-option label="20" value="20"></el-option>
            <el-option label="30" value="30"></el-option>
            <el-option label="40" value="40"></el-option>
            <el-option label="50" value="50"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="auditItem" label-width="80px">
        <el-form-item label="用户来源：">
          <el-select v-model="auditItem.source">
            <el-option label="活动" value="活动"></el-option>
            <el-option label="官网" value="官网"></el-option>
            <el-option label="朋友推荐" value="朋友推荐"></el-option>
            <el-option label="朋友圈" value="朋友圈"></el-option>
            <el-option label="微信群" value="微信群"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onAuditConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" width="20%" :visible.sync="editDia">
      <el-form ref="form" :model="editItem" :inline="true" class="demo-form-inline" label-width="100px">
        <el-form-item label="姓名:">
          <el-input v-model="editItem.personName" style="width: 500px" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="微信昵称:">
          <el-input v-model="editItem.wxNickName" style="width: 500px" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="微信号:">
          <el-input v-model="editItem.wxNum" style="width: 500px" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="上传简历:">
          <el-upload
            class="avatar-uploader"
            action="http://test.phptrain.cn/admin/user/updateUser/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <span v-if="fileName">{{ fileName}}</span>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户来源：">
          <el-select v-model="editItem.recommendResource">
            <el-option label="活动" value="活动"></el-option>
            <el-option label="官网" value="官网"></el-option>
            <el-option label="朋友推荐" value="朋友推荐"></el-option>
            <el-option label="朋友圈" value="朋友圈"></el-option>
            <el-option label="微信群" value="微信群"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐人推荐码:">
          <el-input v-model="editItem.recommendShareCode" style="width: 300px" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-button @click="onCheck">检测</el-button>
      </el-form>
      <div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onChangeConfirm">通过审核</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import PDFJS from 'pdfjs-dist'
  import pdf from 'vue-pdf'
  import {
    getUserInfo,
    updateUserBlank,
    auditUser,
    updateUser,
    checkRecommendShareCode
  } from '@/api'
  import {
    apiUrl
  } from '@/config/index.js'
  export default {
    name: 'TaskDetails',
    components: {
      pdf
    },
    data () {
      return {
        editDia: false,
        fileName: null,
        file: null,
        editItem: {
          personName: null,
          wxNickName: null,
          wxNum: null,
          recommendResource: null,
          recommendShareCode: null
        },
        auditDia: false,
        auditItem: {
          level: '',
          money: '',
          source: ''
        },
        auditStatusObj: {
          '-2': '已拉黑',
          '-1': '未审核',
          '0': '未完善',
          '1': '已审核',
          '2': '已奖励'
        },
        tableData: {
          sysUser: {}
        },
        isAudit: '',
        dialogVis: false,
        form: {},
        resumeFilePath: '',
        pdfDoc: null,
        loadding: false,
        pages: 0
      }
    },
    mounted () {
      this.getUserInfo()
    },
    methods: {
      async onCheck () {
        await checkRecommendShareCode(null, null, {
          recommendShareCode: this.editItem.recommendShareCode
        })
      },
      handleAvatarSuccess (res, file) {
        this.fileName = file.name
      },
      beforeAvatarUpload (file) {
        const MB10 = 1024 * 1024 * 10
        const postfix = file.name.match(/\w+$/g)[0]
        const legalPostfix = ['pdf', 'docx', 'doc', 'xls']
        if (!legalPostfix.includes(postfix)) {
          this.$message.error('文件不合法')
        }
        if (file.size > MB10) {
          this.$message.error('上传文件不能大于10MB')
        }
        this.file = file
      },
      async onAuditConfirm () {
        await auditUser(null, null, {
          level: this.auditItem.level,
          rewardNum: this.auditItem.money,
          recommendResource: this.auditItem.source,
          userId: this.$route.query.id
        })
        this.auditDia = false
        this.getUserInfo()
      },
      async onBlock () {
        await updateUserBlank(null, null, {
          userId: this.tableData.sysUser.id,
          auditStatus: -2
        })
        this.getUserInfo()
      },
      async onChangeConfirm () {
        console.log(this.file, 'this.file')
        console.log(this.editItem, 'this.editItem')
        let param = null
        if (this.file) {
          param = new FormData()
          param.append('file', this.file)
        }

        let paramObj = {
          file: this.file,
          id: this.editItem.id,
          name: this.editItem.personName,
          wxNickName: this.editItem.wxNickName,
          wxNum: this.editItem.wxNum,
          recommendResource: this.editItem.recommendResource
        }
        if (this.editItem.recommendShareCode) {
          paramObj.recommendShareCode = this.editItem.recommendShareCode
        }
        await updateUser(param, 'form-data', paramObj)
        this.editDia = false
        this.getUserInfo()
      },
      async onAudit () {
        this.auditDia = true
      },
      async onChange () {
        this.editDia = true
      },
      async getUserInfo () {
        const res = await getUserInfo(null, null, {
          userId: this.$route.query.id
        })

        this.tableData = res
        this.editItem = JSON.parse(JSON.stringify(res.sysUser))
        this.resumeFilePath = res.sysUser.resumeFilePath
      },
      goback () {
        this.$router.go(-1)
      },
      resume () {
        // let url = this.resumeFilePath
        // this.dialogVis = true
        // window.open(url)
        // this.loadFile(url)
      },
      downLoad () {
        window.open(`${apiUrl}/user/downLoadResume?userId=${this.$route.query.id}`)
      },
      renderPage (num) {
        let _this = this
        this.pdfDoc.getPage(num).then(function (page) {
          let canvas = document.getElementById('the-canvas' + num)
          let ctx = canvas.getContext('2d')
          let dpr = window.devicePixelRatio || 1
          let bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1
          let ratio = dpr / bsr
          var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
          canvas.width = viewport.width * ratio
          canvas.height = viewport.height * ratio
          canvas.style.width = viewport.width + 'px'
          canvas.style.height = viewport.height + 'px'
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
          var renderContext = {
            canvasContext: ctx,
            viewport: viewport
          }
          page.render(renderContext)
          if (_this.pages > num) {
            _this.renderPage(num + 1)
          }
        })
      },
      loadFile (url) {
        let _this = this
        PDFJS.getDocument(url).then(function (pdf) {
          _this.pdfDoc = pdf
          _this.pages = _this.pdfDoc.numPages
          // _this.$nextTick(() => {
          // _this.renderPage(1)
          // })
        })
      }
    }
  }
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .fr {
    float: right;
    margin-bottom: 20px;
  }

  .pic-left {
    width: 60px;
    float: left;
    margin-left: 10px;
  }

  .cont-right {
    float: left;
    margin-left: 20px;
  }

  .cont-right p {
    margin-bottom: 10px;
  }

  .details-content {
    border: 1px solid #dfe6ec;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 15px;
    clear: both;
  }

  .table-wrapper {
    padding: 2%;
  }

  .title {
    margin: 15px 0 20px 0;
    font-size: 16px;
    padding-left: 5px;
    border-left: 4px solid rgba(255, 69, 0, 0.68);
  }

  .details-content ul {
    overflow: hidden;
    padding: 10px 20px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .details-content li {
    width: 25%;
    white-space: nowrap;
    font-size: 14px;
    line-height: 30px;
  }

</style>
