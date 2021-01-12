<template>
  <div class="mine">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" title="个人中心" placeholder @click-left="clickLeft()"/>
    <div class="avant">
      <div class="realname">{{realname}}</div>
      <div class="telphoto">{{tel}}</div>
    </div>

    <van-cell v-for="item in mine_arr" :key="item.id" :title="item.title"
              is-link :to="{path: item.path, query: {in_title: item.title}}"/>
  </div>
</template>

<script>
import { getRealname } from "@/network/check";

export default {
  name: "Mine",
  components: {
  },
  data() {
    return {
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
      },
      realname: '',   // 真名
      tel: '',   // 电话
      mine_arr: [
        {
          id: 0,
          title: '个人信息',
          path: '/check_revpersonal',
        },
        {
          id: 88,
          title: '设置',
          path: '/check_setting',
        },
                
      ]

    }
  },
  methods: {
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    
    getRealname(this.obj).then( res => {  
      if(res.result==1) {
        this.realname = res.realname
        this.tel =  res.tel
      }
      else if(res.result==0) {
        this.$toast.fail(res.message)
      }
    })
  },

}
</script>

<style scoped lang="scss">
.mine {
  .van-nav-bar{
    //background-color: rgba(0,0,100,0.2) !important;
  }
  .avant {
    margin-top: 10px;
    background-color: #faffff;
    font-weight: 700;
    padding: 20px;
  }
  .realname { line-height: 30px; }

  .telphoto { line-height: 30px; }
  
  .van-cell { margin-top: 20px; }
  
}
</style>
