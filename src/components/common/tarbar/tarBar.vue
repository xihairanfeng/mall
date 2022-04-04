<template>
  <div id="tab-bar">
     <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  components: {
  }
}
</script>

<style>
  @import "assets/css/base.css";
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.1);
    /* box-shadow: x轴 y轴 模糊程度 颜色 */
  }
</style>
