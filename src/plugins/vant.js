import Vue from 'vue'

import { Button,Swipe,SwipeItem } from 'vant'

const components_arr = [Button,Swipe,SwipeItem]

components_arr.forEach( (item,i) => {
  Vue.use(item)
})
