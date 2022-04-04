<template>
  <div class="shopcart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar.vue'

export default{
  name: 'ShopCart',
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    },
  computed: {
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList',
    })
  }
}
</script>

<style scoped>
  .shopcart {
    height: 100vh;
  }
  .cart-nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
</style>