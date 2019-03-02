<template>
  <div id="app">
    <router-view />
    <div id="" class="nav">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home"><router-link exact to="/menu">点餐</router-link></van-tabbar-item>
        <van-tabbar-item icon="cart-circle-o" :info="getCount.count>0?getCount.count:''"><router-link exact to="/shopcar">购物车</router-link></van-tabbar-item>
        <van-tabbar-item icon="user-o" ><router-link exact to="/myinfo">我的</router-link></van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations,mapGetters } from "vuex";
export default {
  data() {
    return {
      active: 0,
    };
  },
  computed:{
    // ...mapState('ShopCar',{//这个ShopCar是注册资在tore的名字，切记切记，并不是你模块的路径
    //     count:state=>state.count,
    // }),
    ...mapGetters('ShopCar',
      ['getCount'],//这个是store中getters的方法名会根据依赖进行响应式
    )
  }   
}
</script>
