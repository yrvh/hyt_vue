<template>
  <div class="deal-add">
    <van-nav-bar :title='showTitle' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft()'></van-nav-bar>
    <van-form ref="dealform_ref" :show-error="false">
      <van-cell-group title='业务合同信息'>
        <van-cell v-if="in_status==99" title="选择抬头" :value="cap_text" required is-link border center @click="cap_pop = true"></van-cell>
        <van-popup v-model="cap_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                    close-on-popstate get-container=".deal-add">
          <van-picker :columns="cap_list" title="抬头" show-toolbar
                      @cancel="cap_pop = false" @confirm="onConfirm">
          </van-picker>
        </van-popup>

        <van-field v-model="detail.code" label="编号" placeholder="请输入编号" type="number"
                    maxlength="18" required clearable clear-trigger="always" name="code"
                    :rules=" [{ required: true, message: '编号不能为空!'}] " />
        <van-field v-model="detail.title" label="合同标题" placeholder="请输入合同标题" type="text" 
                    maxlength="24" required clearable clear-trigger="always" name="title"
                    :rules=" [{ required: true, message: '合同标题不能为空!'},
                            {validator: checkDeal, message: '非数字开头,2~50位汉字,字母或数字'}] " />
        <!-- <van-field v-model="detail.files" label="合同内容" placeholder="请输入合同内容" type="text"
                    maxlength="32" required clearable clear-trigger="always" name="files"
                    :rules="detail_rules.files"/> -->
        <div class="content">
          <div class="info-title">请上传业务合同内容 :</div>
          <van-uploader v-model="photo_list" :after-read="onRead" name="photo_list" preview-size="80px" max-count="10" :preview-options="{closeable: true}">
            <!-- <template #default>
              <van-image height="150px" width="100%" :src="require('assets/img/login/idcard.png')"></van-image>
            </template> -->
          </van-uploader>
        </div>
        

      </van-cell-group>
    </van-form>
    

    <van-cell v-if="showReasons" class="reasons" title-style="color: #ee3333;"
                title="退回原因" border center :value="reasons"/>
    
    <div class="footer">
      <van-button v-show="false" text="删除" color="#bbbbbb" :disabled="del_dis"  size="large" @click="del_pop=true"></van-button>
      <van-button text="确认完成" color="#7EB6FF" :loading="comfirming" size="large"
              loading-text="确认中..." @click="onComfirm"></van-button>
    </div>

    <!-- 删除的 dialog弹出层 -->
    <van-dialog v-model="del_pop" title="确认删除 ：" width="320px" message="删除后将无法恢复!" confirm-button-text="删除"
                :show-cancel-button="true" confirm-button-color="#7EB6FF" cancelButtonColor="#666666" 
                close-on-click-overlay @confirm="onCfmDel" @cancel="del_pop=false"></van-dialog>

  </div>
</template>

<script>
import {getDealDetail, addDeal, delDeal, getTtData, editDeal} from 'network/free'
export default {
  name: 'DealAdd',
  data() {
    return {
      del_dis: false,   // 删除按钮禁用
      comfirming: false,   // 提交中...
      del_pop: false,   // 弹出 删除窗口
      
      reasons: '',   // 展示退回的原因
      in_status: null,   // 进入时的状态值
      
      cap_pop: false,   // 是否显示 抬头的选择器
      cap_list: [],   // 抬头列表
      cap_text: '',   // 选中的抬头名称

      photo_list: [],   // 添加合同图片的列表
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        id: '',   // 新增时: 选中的抬头id,,, 修改时: 该条记录的id
      },
      detail: {
        code: '',   // 编号
        title: '',   // 合同标题
        files: [],   // 处理后的 合同图片内容
        imgs_xy: [],   // 修改时,需要 额外上传的图片内容
      },

      detail_rules: {   // 格式校验
      },
    }
  },
  methods: {
    onRead(file) {   // 获取当前这个图片
      if(this.in_status==5) this.detail.imgs_xy.push(file.file)
      else this.detail.files.push(file.file)
    },
    onConfirm({id, text}) {   // 确定当前 抬头============================
      this.cap_text = text
      this.obj.id = id
      this.cap_pop = false
    },

    onCfmDel() {   // 提交了 删除命令
      this.del_pop = false   // 隐藏弹出框
      delDeal(this.obj).then( res => {        
        if(res.result==1) {
          this.$toast.success(res.message + '请到待提交状态:完成最终提交!')
          setTimeout(() => {
            this.clickLeft()
          }, 1000)
        }
        else if(res.result==0) {
          this.$toast.fail(res.message)
        }
      })
    },
    onComfirm() {   // 点击了 完成
      if(this.in_status == 99) {   // 新增
        this.$refs.dealform_ref.validate().then( () => {   // 校验格式
          this.comfirming = true   // 提交中...
          this.del_dis = true   // 禁用删除按钮...
          let formData = new FormData()
          formData.append('tel_app', this.obj.tel_app)
          formData.append('pass_app', this.obj.pass_app)
          formData.append('code_app', this.obj.code_app)
          formData.append('id', this.obj.id)
          formData.append('code', this.detail.code)
          formData.append('title', this.detail.title)
          this.detail.files.forEach( (item,i) => {
            formData.append('files', item)
          });
          
          if(this.obj.id!=''){
            addDeal(formData).then( res => {   // 添加业务合同的请求
              if(res.result==1) {
                this.$toast.success(res.message)
                setTimeout(() => {
                  this.clickLeft()
                }, 1000)
              }
              else if(res.result==0) {
                this.$toast.fail(res.message)
                this.comfirming = false   // 取消 提交中
                this.del_dis = false   // 取消 删除禁用
              }
            })
          }
          else {
            this.$toast.fail('请选择抬头!')
          }
        })
      }
      else if(this.in_status == 5) {   // 修改
        this.$refs.dealform_ref.validate().then( () => {   // 校验格式
          this.comfirming = true   // 提交中...
          this.del_dis = true   // 禁用删除按钮...
          let formData = new FormData()
          formData.append('tel_app', this.obj.tel_app)
          formData.append('pass_app', this.obj.pass_app)
          formData.append('code_app', this.obj.code_app)
          formData.append('id', this.obj.id)
          formData.append('code', this.detail.code)
          formData.append('title', this.detail.title)
          this.detail.files.forEach( (item,i) => {
            formData.append('files', item)
          });
          this.detail.imgs_xy.forEach( (item,i) => {
            formData.append('imgs_xy', item)
          });
          
          if(this.obj.id!=''){
            editDeal(formData).then( res => {   // 添加业务合同的请求
              if(res.result==1) {
                this.$toast.success(res.message)
                setTimeout(() => {
                  this.clickLeft()
                }, 1000)
              }
              else if(res.result==0) {
                this.$toast.fail(res.message)
                this.comfirming = false   // 取消 提交中
                this.del_dis = false   // 取消 删除禁用
              }
            })
          }
          else {
            this.$toast.fail('请选择抬头!')
          }
        })
      }
      
      
    },
  },
  computed: {
    showTitle() {   // 是否显示抬头
      if(this.in_status == 99) return '新增业务合同'
      else if(this.in_status == 5) return '修改业务合同'
    },
    showReasons() {   // 显示退回原因
      let reason = Boolean(this.reasons)
      return reason
    }
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app

    
    this.in_status = this.$route.query.in_status
    if(this.in_status==5) {   // 修改时 获取详情
      this.obj.id = this.$route.query.id || ''
      this.detail.title = this.$route.query.title || ''
      this.detail.code = this.$route.query.code || ''

      getDealDetail(this.obj).then( res => {
        this.reasons = res.reasons
        this.detail.files = res.imgs
        this.photo_list = res.imgs
      })
    }
    
  },
  mounted() {
    getTtData(this.obj).then(res => {
      this.cap_list= res
    })
  },
}
</script>

<style scoped lang='scss'>
.deal-add {
  padding: 0 10px;
  .reg-status{ margin-top: 10px; }
  .reasons { margin-top: 10px;}

  .info-title {
    line-height: 60px; font-size: 16px; 
  }
  .van-uploader {width: 100%; background-color: #fff;}
  
  .footer { 
    margin-top: 50px;
    display: flex; justify-content: space-between;
  }
  
}
</style>

