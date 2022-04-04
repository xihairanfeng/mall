<template>
  <div class="cart-list">
    <scroll class="content"  :probeType="2"  :pullUpLoad="true"> 
      <div>
        <cart-goods-list-item v-for="(item, index) in cartList" :key="index" :product="item"/>
      </div>
      
      
    </scroll>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import CartGoodsListItem from './CartGoodsListItem.vue'

export default{
  components: { 
    Scroll,
    CartGoodsListItem,
  },
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>