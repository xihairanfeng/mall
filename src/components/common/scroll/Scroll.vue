<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    }
  },
  methods: {
    scrollTo(x, y, time=300) {
      //  &&从左边开始执行，逻辑与，如果左边都没有，则不会继续执行后面的东西
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      // console.log('-----------')
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    },
  },
  mounted() {
    // probe侦测
    //0,1都是不侦测实时的位置
    //2:在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
    //3:只要是滚动，都侦测.
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      movable: true,
      zoom: true,
      click: true
    })

    // console.log(this.scroll)
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll', position)
      })
    }
    

    // 监听滚动到底部
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      })
    }

    this.scroll.on('pullingUp', () => { 
      console.log('上拉加载更多');
      this.$emit('pullingUp')

      setTimeout(() => {
        this.scroll.finishPullUp()
      }, 2000)

    })
  }
}
</script>

<style scoped>

</style>