<template>
  <div id="detail">
    <datail-nav-bar ref="detailNav" class="detail-nav" @titleClick="titleClick"/>
    <scroll ref="scroll" class="detail-content" :probeType="3"  :pullUpLoad="true" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="goodsInfo"/>
      <detail-comment-info ref="comments" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goodslist="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DatailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {itemListenerMixin, backTopMixin} from"../../common/mixin"
import { debounce } from '../../common/utils'

import { mapActions } from 'vuex'



export default{
  name: 'Detail',
  components: {
    DatailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs:[],
      getThemeTopY: null, 
      currentIndex: 0,
      isShow: false,
      message: '',
    }
  },
  created() {
    // 1.保存传入的iid
    this.id = this.$route.params.id
    
    // 2.使用iid请求数据
    getDetail(this.id).then(res => {
      // console.log(res)
      const data = res.result

      // 2.获取顶部的图片数据
      this.topImages = data.itemInfo.topImages
      // console.log(this.topImages)
      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log('-----------', this.goods)

      // 4.获取店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo

      // 6.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // console.log(this.goodsInfo)

      // 7.取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM是已经被渲染出来的
      //   // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
      //   // offset值不对的时候,都是因为图片的问题
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopYs)
      // })

    }) 

    
    // 3..获取推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })

    // 对赋值的函数进行防抖操作
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs)
    }, 100)

  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();

      this.getThemeTopY()
     
    },
    titleClick(currentIndex) {
      // console.log(currentIndex);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[currentIndex], 200)
    },
    contentScroll(position) {
      // console.log(position)
      // 1.获取Y值
      const positionY = -position.y;
      this.listenShowBackTop(position);
      // 2.positionY值与this.themeTopYs里面的值进行对比
     
      // positoinY在0和7938之间, index = 0
      // positoinY在=7938和9120之间,index = 1
      // positoinY在9120和9452之间,index = 2
      // positoinY在9120和非常大的值之间, index = 3
      let detailThemeLength = this.themeTopYs.length
      for(let i = 0; i < detailThemeLength - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
        // console.log(i);
        // if(this.currentIndex !== i && ((i < detailThemeLength - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) 
        // || (i === detailThemeLength - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i
        //   // console.log(this.currentIndex)
        //   this.$refs.detailNav.currentIndex = this.currentIndex
        // }
      }
    },
    addToCart() {
      // console.log('加入购物车')
      // 1.获取购物车需要展示的信息
      const product = {}
      product.img = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price =  this.goods.realPrice
      product.id = this.id

      // console.log(this.goods)


      this.addCart(product).then(res => {
        // console.log(res)
        // this.isShow = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.isShow = false;
        //   this.message = ''
        // }, 1500)
        this.$toast.show(res, 2000)
        console.log(this.$toast)

      })
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
    }
  },
  mounted() {
    
  },
  updated() {
   
  },
  destroyed() {
    this.$bus.$off('imgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
 #detail {
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }
 .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
 }
 .detail-content {
   height: calc(100% - 44px - 49px);
 } 

</style>