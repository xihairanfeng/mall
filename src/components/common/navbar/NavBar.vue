<template>
  <div class="narbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  components: {
  }
}
</script>

<style>
 .narbar {
   display: flex;
   line-height: 44px;
   height: 44px;
   text-align: center;
   box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
 }

 .left {
   width: 60px;
 } 
 
 .right {
   width: 60px;
   /* background-color: red; */
 }

 .center {
   flex: 1;
   /* background-color: blue; */
 }

</style>
