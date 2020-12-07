<template>
  <div class="cap-add">
    <van-nav-bar :title='showTitle' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft()'></van-nav-bar>

    <van-form ref="capform_ref" :show-error="false">
      <van-cell-group title='公司基本信息'>
        <van-field v-model="detail.name" label="抬头名称" placeholder="请输入抬头名" type="text"
                    maxlength="22" required clearable clear-trigger="always" name="ttname"
                    :rules=" [{ required: true, message: '抬头名不能为空!'},
                        {validator: checkComname, message: '非数字开头,2~22位汉字,字母或数字'}] " />
        <van-field v-model="detail.nscode" label="纳税识别号" placeholder="请输入纳税识别号" type="text" 
                    maxlength="24" required clearable clear-trigger="always" name="nscode"
                    :rules=" [{ required: true, message: '纳税识别号不能为空!'},
                        {validator: checkTaxcode, message: '格式不正确!'}] " />
        <van-field v-model="detail.email" label="电子邮箱" placeholder="请输入电子邮箱" type="text"
                    maxlength="32" required clearable clear-trigger="always" name="email"
                    :rules=" [{ required: true, message: '邮箱不能为空!'},
                        {validator: checkEmail, message: '邮箱格式不正确'}] " />
      </van-cell-group>

      <!-- 公司通讯 地址 -->
      <van-radio-group v-model="detail.is_addrdef" icon-size="25px" checked-color="#7EB6FF" @change="onChange">
        <van-cell-group class="info-box" title='公司通讯地址'>
          <div class="addr-item item0" >
            <van-radio :name="0">是否默认</van-radio>
            <van-field v-model="username0" label="联系人" placeholder="请输入联系人" type="text"
                      maxlength="15" required clearable clear-trigger="always" name="username"
                      :rules=" [{ required: true, message: '联系人不能为空!'},
                          {validator: checkRealname, message: '2~15位汉字或字母'}] " />
            <van-field v-model="tel0" label="座机号" placeholder="请输入座机号" type="text"
                      maxlength="18" required clearable clear-trigger="always" name="tel"
                      :rules=" [{ required: true, message: '座机号不能为空!'},
                          {validator: checkFixed, message: '座机号格式不正确'}] "/>
            <van-field v-model="address0" label="邮寄地址" placeholder="请输入地址" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="address"
                      :rules=" [{ required: true, message: '地址不能为空!'},
                          {validator: checkAddress, message: '非数字开头,不能含有逗号,共10~50位'}] "/>
          </div>
          <div class="addr-item item1" v-if="addr_length>=2">
            <van-radio :name="1">是否默认</van-radio>
            <van-field v-model="username1" label="联系人" placeholder="请输入联系人" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="username"
                      :rules=" [{ required: true, message: '联系人不能为空!'},
                          {validator: checkRealname, message: '2~15位汉字或字母'}] " />
            <van-field v-model="tel1" label="座机号" placeholder="请输入座机号" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="tel"
                      :rules=" [{ required: true, message: '座机号不能为空!'},
                          {validator: checkFixed, message: '座机号格式不正确'}] "/>
            <van-field v-model="address1" label="邮寄地址" placeholder="请输入地址" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="address"
                      :rules=" [{ required: true, message: '地址不能为空!'},
                          {validator: checkAddress, message: '非数字开头,不能含有逗号,共10~50位'}] "/>
          </div>
          <div class="addr-item item2" v-if="addr_length>=3">
            <van-radio :name="2">是否默认</van-radio>
            <van-field v-model="username2" label="联系人" placeholder="请输入联系人" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="username"
                      :rules=" [{ required: true, message: '联系人不能为空!'},
                          {validator: checkRealname, message: '2~15位汉字或字母'}] " />
            <van-field v-model="tel2" label="座机号" placeholder="请输入座机号" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="tel"
                      :rules=" [{ required: true, message: '座机号不能为空!'},
                          {validator: checkFixed, message: '座机号格式不正确'}] "/>
            <van-field v-model="address2" label="邮寄地址" placeholder="请输入地址" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="address"
                      :rules=" [{ required: true, message: '地址不能为空!'},
                          {validator: checkAddress, message: '非数字开头,不能含有逗号,共10~50位'}] "/>
          </div>
          <div class="more-btn">
            <van-button size="small" text="回删" color="#bbbbbb" @click="onMoreAddr(false)"></van-button>
            <van-button size="small" text="+ 更多地址" color="#7EB6FF" @click="onMoreAddr(true)"></van-button>
          </div>
        </van-cell-group>
      </van-radio-group>

      <!-- 公司账户信息 -->
      <van-radio-group v-model="detail.is_carddef" icon-size="25px" checked-color="#7EB6FF" @change="onChange">
        <van-cell-group class="info-box" title='公司账户信息'>
          <div class="card-item item0" >
            <van-radio :name="0">是否默认</van-radio>
            <van-field v-model="khh0" label="开户行" placeholder="请输入开户行" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="khh"
                      :rules="detail_rules.khh"></van-field>
            <van-field v-model="khname0" label="开户名" placeholder="请输入联系开户名" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="khname"
                      :rules="detail_rules.khname"></van-field>
            <van-field v-model="code0" label="银行卡号" placeholder="请输入银行卡号" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="code"
                      :rules="detail_rules.code"></van-field>
          </div>
          <div class="card-item item1" v-if="card_length>=2">
            <van-radio :name="1">是否默认</van-radio>
            <van-field v-model="khh1" label="开户行" placeholder="请输入开户行" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="khh"
                      :rules="detail_rules.khh"></van-field>
            <van-field v-model="khname1" label="开户名" placeholder="请输入联系开户名" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="khname"
                      :rules="detail_rules.khname"></van-field>
            <van-field v-model="code1" label="银行卡号" placeholder="请输入银行卡号" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="code"
                      :rules="detail_rules.code"></van-field>
          </div>
          <div class="card-item item2" v-if="card_length>=3">
            <van-radio :name="2">是否默认</van-radio>
            <van-field v-model="khh2" label="开户行" placeholder="请输入开户行" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="khh"
                      :rules="detail_rules.khh"></van-field>
            <van-field v-model="khname2" label="开户名" placeholder="请输入联系开户名" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="khname"
                      :rules="detail_rules.khname"></van-field>
            <van-field v-model="code2" label="银行卡号" placeholder="请输入地址" type="text"
                      maxlength="32" required clearable clear-trigger="always" name="code"
                      :rules="detail_rules.code"></van-field>
          </div>
          <div class="more-btn">
            <van-button size="small" text="回删" color="#bbbbbb" @click="onMoreCard(false)"></van-button>
            <van-button size="small" text="+ 更多账户" color="#7EB6FF" @click="onMoreCard(true)"></van-button>
          </div>
          
        </van-cell-group>
      </van-radio-group>
    </van-form>

    <van-cell v-if="showReasons" class="reasons" title-style="color: #ee3333;"
                title="退回原因" border center :value="reasons"/>
    
    <div class="footer">
      <van-button v-show="in_status==3" text="删除" color="#bbbbbb" :disabled="del_dis"  size="large" @click="del_pop=true"></van-button>
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
import {getCapDetail,addCap,delCap} from 'network/free'
export default {
  name: 'CapAdd',
  data() {
    return {
      del_dis: false,   // 删除按钮禁用
      comfirming: false,   // 提交中...
      del_pop: false,   // 弹出 删除窗口
      
      addr_length: 1,   // 邮寄地址的个数
      card_length: 1,   // 银行账户的个数
      
      address0: '',   // 地址 
      address1: '',   // 地址 
      address2: '',   // 地址 
      tel0: '',   // 联系电话
      tel1: '',   // 联系电话
      tel2: '',   // 联系电话
      username0: '',   // 联系人
      username1: '',   // 联系人
      username2: '',   // 联系人
      khh0: '',   // 开户行
      khh1: '',   // 开户行
      khh2: '',   // 开户行
      khname0: '',   // 开户名
      khname1: '',   // 开户名
      khname2: '',   // 开户名
      code0: '',   // 银行卡号
      code1: '',   // 银行卡号
      code2: '',   // 银行卡号

      reasons: '',   // 展示退回的原因
      in_status: null,   // 进入时的状态值
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
        id: '',
      },
      detail: {
        name: '',   // 抬头名
        nscode: '',   // 纳税识别号
        email: '',   // 邮箱

        address: '',   // 邮寄地址
        tel: '',   // 联系电话
        username: '',   // 邮箱
        khh: '',   // 开户行
        khname: '',   // 开户名
        code: '',   // 银行卡号
        is_addrdef: 0,   // 活跃的下标
        is_carddef: 0,   // 活跃的账户下标
        
        // reasons: '',   // 展示退回原因
      },

      detail_rules: {   // 格式校验
      },
    }
  },
  methods: {
    onMoreAddr(bool) {   // 增减地址
      if(bool && this.addr_length < 3) this.addr_length += 1
      else if(!bool && this.addr_length > 1) this.addr_length -= 1
      else if( this.addr_length==1 || this.addr_length==3) this.$toast.fail('数量在1~3条')
    },
    onMoreCard(bool) {   // 增减银行账户
      if(bool && this.card_length < 3) this.card_length += 1
      else if(!bool && this.card_length > 1) this.card_length -= 1
      else if( this.addr_length==1 || this.addr_length==3) this.$toast.fail('数量在1~3条')
    },

    onCfmDel() {   // 提交了 删除命令
      this.del_pop = false   // 隐藏弹出框
      delCap(this.obj).then( res => {        
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
      this.$refs.capform_ref.validate().then( () => {   // 校验格式
        this.comfirming = true   // 提交中...
        this.del_dis = true   // 禁用删除按钮...

        if (this.addr_length == 1) {
          this.detail.address = this.address0
          this.detail.tel = this.tel0
          this.detail.username = this.username0
        }
        else if(this.addr_length == 2) {
          this.detail.address = this.address0 + ',' + this.address1
          this.detail.tel = this.tel0 + ',' + this.tel1
          this.detail.username = this.username0 + ',' + this.username1
        }
        else if(this.addr_length == 3) {
          this.detail.address = this.address0 + ',' + this.address1 + ',' + this.address2
          this.detail.tel = this.tel0 + ',' + this.tel1 + ',' + this.tel2
          this.detail.username = this.username0 + ',' + this.username1 + ',' + this.username2
        }
        if (this.card_length == 1) {
          this.detail.khh = this.khh0
          this.detail.khname =this.khname0
          this.detail.code = this.code0
        }
        else if (this.card_length == 2) {
          this.detail.khh = this.khh0 + ',' + this.khh1
          this.detail.khname =this.khname0 + ',' + this.khname1
          this.detail.code = this.code0 + ',' + this.code1
        }
        else if (this.card_length == 3) {
          this.detail.khh = this.khh0 + ',' + this.khh1 + ',' + this.khh2
          this.detail.khname =this.khname0 + ',' + this.khname1 + ',' + this.khname2
          this.detail.code = this.code0 + ',' + this.code1 + ',' + this.code2
        }
        
        addCap({...this.obj, ...this.detail}).then( res => {   // 发起添加抬头的网络请求
          if(res.result==1) {
            this.$toast.success(res.message)
            setTimeout(() => {
              this.clickLeft()
            }, 1000)
          }
          else {
            this.$toast.fail(res.message)
            this.comfirming = false   // 取消 提交中
            this.del_dis = false   // 取消 删除禁用
          }
        })
      })
    },
    
    onChange() {   // 切换了 默认地址,  切换了 默认公司账户
      console.log(this.detail.is_addrdef)
      console.log(this.detail.is_carddef)
    }
  },
  computed: {
    showTitle() {   // 是否显示抬头
      if(this.in_status == 99) return '新增抬头'
      else if(this.in_status == 3) return '修改抬头'
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
    if(this.in_status==3) {
      this.obj.id = this.$route.query.id || ''

      getCapDetail(this.obj).then( res => {   // 修改时获取详情
        this.reasons = res.reasons
        this.addr_length = res.addresses.length
        this.card_length = res.yhcards.length

        this.detail.name = res.name
        this.detail.nscode = res.nscode
        this.detail.email = res.email

        res.addresses.forEach((item,index) => {
          switch(index){
            case 0: this.address0 = item.address
                    this.tel0 = item.tel
                    this.username0 = item.username
                    break;
            case 1: this.address1 = item.address
                    this.tel1 = item.tel
                    this.username1 = item.username
                    break;
            case 2: this.address2 = item.address
                    this.tel2 = item.tel
                    this.username2 = item.username
                    break;
          }
        })
        res.yhcards.forEach((item,index) => {  // 从返回来的数据中
          switch(index){
            case 0: this.khh0 = item.kkh
                    this.khname0 = item.khname
                    this.code0 = item.code
                    break;
            case 1: this.khh1 = item.kkh
                    this.khname1 = item.khname
                    this.code1 = item.code
                    break;
            case 2: this.khh2 = item.kkh
                    this.khname2 = item.khname
                    this.code2 = item.code
                    break;
          }
        })
        
      })
    }
    
  }
}
</script>

<style scoped lang='scss'>
.cap-add {
  padding: 0 10px;
  .reg-status{ margin-top: 10px; }
  .reasons { margin-top: 10px;}
  .info-box {
    .addr-item,.card-item {
      border: 1px dashed #7EB6FF;
      margin-bottom: 15px;
      .van-radio {margin: 8px 0 0 8px;}
    }
    .more-btn { display: flex; justify-content: space-between;}
    .van-button {flex: 1;}
  }
  .addr-item {}
  .card-item {}
  
  .footer { 
    margin-top: 50px;
    display: flex; justify-content: space-between;
  }
  
}
</style>

