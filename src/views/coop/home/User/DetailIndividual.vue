<template>
  <div class="detail-individual">
    <van-nav-bar title="工商户信息(2)" left-text="返回" right-text="下一页"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>

    <van-cell class="reg-status" title="【注册状态】" :value=" detail.regState || '' "></van-cell>
    <template v-if="detail.ishave_sh">
      <van-cell-group title="商户基本信息">
        <van-cell title="统一社会信用代码" :value="detail.xycode" />
        <van-cell title="经营者" :value="detail.jyname" />
        <van-cell title="商户名称" :value="detail.shname" />
        <van-cell title="注册日期" :value="detail.regtime" />
        <van-cell title="经营范围" :value="detail.businessRange" />
        <van-cell title="登记地址" :value="detail.address" />
        <van-cell title="登记机关" :value="detail.registerCompany" />
        <van-cell title="发证日期" :value="detail.getCartTime" />
        <van-cell title="经营执照" is-link border center @click="onPhoto([detail.CertificUpUrl])" />
      </van-cell-group>
      <van-cell-group titel="账户信息">
        <van-cell title="开户行" :value="detail.khh_dg" />
        <van-cell title="开户名" :value="detail.kh_name_dg" />
        <van-cell title="账号" :value="detail.code_dg" />
      </van-cell-group>
    </template>

    <template v-else>
      <div class="node">暂无工商户信息</div>
    </template>


  </div>
</template>

<script>
import {getUserDetailFree} from "network/check";

export default {
  name: "DetailIndividual",
  data() {
    return {
      detail: {},   // 联系人详情信息
      param: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        id: '',
      }
    }
  },
  methods: {
    handleNext() {
      this.$router.push({
        path: '/checkhome_ud_contract',
        query: {
          id: this.param.id
        }
      })
    },
    onPhoto(link) {
      this.$imagePreview({
        images: link,
        closeable: true
      })
    }
  },
  computed: {
    jntype() {
      if(this.detail.zzsjntype==1) return "按月"
      else if(this.detail.zzsjntype==2) return "按季"
      else if(this.detail.zzsjntype==3) return "按年"
    }
  },
  created() {
    console.log("created被执行了");
    this.param.pass_app = this.$store.state.login.password
    this.param.tel_app = this.$store.state.login.tel
    this.param.code_app = this.$store.state.login.code_app

    this.param.id = this.$route.query.id
    getUserDetailFree(this.param).then( res => {
      this.detail = res
    })
  },
  // activated() {
  //   this.param.id = this.$route.query.id
  //   getUserDetailFree(this.param).then( res => {
  //     this.detail = res
  //   })
  // }
}
</script>

<style scoped lang="scss">
.detail-individual {
  .reg-status{
    margin-top: 10px; font-size: 18px;
  }
  .node { margin-top: 200px; width: 100%; text-align: center; color: var(--cl-bg-theme);}
}
</style>
