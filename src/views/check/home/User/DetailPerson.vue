<template>
  <div class="detail-person">
    <van-nav-bar title="个人信息(1)" left-text="返回" right-text="下一页"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>
    <van-cell class="reg-status" title="注册状态" :value="reg_status"></van-cell>
    <van-cell-group title="个人信息">
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
    <van-cell-group title="个体工商户信息">
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "DetailPerson",
  data() {
    return {
      reg_status: '待商秘公司确认',
      person_info: [1,2,3,34]
    }
  },
  methods: {
    handleNext() {
      this.$router.push('/checkhome_userdetail_individual')
    }
  }
}
</script>

<style scoped lang="scss">
.detail-person {
  .reg-status{
    margin-top: 10px;
  }
}
</style>