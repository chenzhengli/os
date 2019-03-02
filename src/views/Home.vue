<template>
  <div class="home">
    <!-- <van-row class="home-back">
      
    </van-row> -->
    <van-row class="home-ad">
      <!-- <van-col span="3" class="home-ad-introduce">
        <img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=502b96a0eef81a4c323fe49bb6430b3c/b3b7d0a20cf431ad97f767ed4e36acaf2edd9838.jpg" alt="">
      </van-col> -->
      <div class="home-ad-introduce">
        <div class="name">星巴克专星送</div>
        <div class="rate">评价4.8&nbsp;&nbsp;蜂鸟专送约30分钟</div>
        <div class="coupon">
          <span class="tag">满减</span>
          <span calss="tag-notice">满50减6,满80减10,满50减6,满80减10满50减6,满80减10</span>
        </div>
        <div class="notify">
          <van-notice-bar
            text="公告：新年好！你是最美的,谢谢你们的光顾才让我们变得更加的好，你们是最牛皮的！"
            left-icon="volume-o"
          />
        </div>
      </div>
    </van-row>
    <van-row class="home-link-nav">
      <van-col span="8" :class="active==1?'custom-col-active custom-col':'custom-col' " ><router-link to="/menu" exact class="link-to"><span @click="handChange(1)">商品</span></router-link></van-col>
      <van-col span="8" :class="active==2?'custom-col-active custom-col':'custom-col' " ><router-link to="/businesses" exact class="link-to"><span @click="handChange(2)">评价</span></router-link></van-col>
      <van-col span="8" :class="active==3?'custom-col-active custom-col':'custom-col' " ><router-link to="/businesses" exact class="link-to"><span @click="handChange(3)">商家</span></router-link></van-col>
    </van-row>
    <div class="home-goods-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Catalog from "@/components/Catalog.vue";

export default {

  name: "home", 
  data() {
    return {
      active: 1
    };
  },   
  components: {
    // HelloWorld
    // Catalog
  },
  methods:{
    handChange(id){
      this.active=id;
    },
  },
};
</script>
