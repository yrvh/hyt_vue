<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in rarr" :key="item.id" @click="onItem(item.link)">
        <!--<img :src="item.icon" alt="">-->
        <div class="icon iconfont" :class="item.icon" :style="{color: item.icolor}"></div>
        <div class="title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    rarr: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onItem(link) {   // 点击导航的每一项
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
  .recommend {
    background-color: var(--cl-bg-tF);
    padding: 15px 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .recommend-item {
    width: 25%;
    text-align: center;
  }
  .icon {
    /*background-color: brown;*/
    width: 65px;
    height: 65px;
    line-height: 65px;
    border-radius: 50%;
    margin: 0 auto;
    color: #fff;
    font-size: 40px;
  }
  .title {font-size: 14px;}

</style>
