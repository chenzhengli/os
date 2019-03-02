<template>
  <div class="shopcar-wrapper">
      <div class="operate-wrapper">
          <div class="back"><router-link to="/menu"><van-icon name="arrow-left" size='14px'/></router-link></div>
          <div class="selected">已选商品</div>
          <div class="clear" @click="clearAll"><van-icon name="delete" />清空</div>
      </div>
      <ul class="order-list">
          <li v-for="item in getCount.shopOrders" :key="item.id" v-if="item.num>0">
              <div class="card-name">{{item.name}}</div>
              <div class="card-price">{{'￥'+(item.sellPrice*item.num).toFixed(2)}}</div>
              <div class="card-num">
                <span class="num num-delete"  @click="addOrDelete('delete',item.id)">-</span>
                <span class="muns">{{item.num}}</span>
                <span class="num num-plus" @click="addOrDelete('add',item.id)">+</span>
              </div>
          </li>
      </ul>
      <div class="submit">
          <van-submit-bar
            :loading="loading"
            :price="totalMoney"
            :disabled="disabled"
            button-text="提交订单"
            @submit="onSubmit"
            />
      </div>
      
  </div>
</template>
<script>
import API from'@/api/api.js';
import {mapGetters,mapMutations } from "vuex";
export default {
    data() {
    return {
        totalMoney:0,
        loading:false,
        disabled:false,
    };
  },
  computed:{
      ...mapGetters('ShopCar',[
          'getCount'
      ])
  },
  mounted(){
    //计算总价格
    this.getTotalMoney();
  },
   methods: {
    onSubmit(){
        if(this.getCount.shopOrders.length>0){
            let orderArr=[];
            this.getCount.shopOrders.map((item)=>{
                //找到点过的食品
                if(item.num>0){
                orderArr.push({"productId":item.id,"productNum":item.num}) 
                }
            })
            this.loading=true;
            this.$axios.post(API.placeOrder,{productIdList:orderArr})
            .then((res)=>{
                let result=res.data.data;
                if(result.success&&result.data.orderId){
                    this.loading=false;
                    //清除购物车内容
                    this.clearAll();
                    //然后在跳转到订单页面
                    this.$router.push({path:'/orderdetail',query:{orderId:result.data.orderId}})
                }
            })
        }else{

        }
        
    },
     //增加或减少一份食品
    addOrDelete(type,id){
        if(type==="add"){
            this.getCount.shopOrders=this.getCount.shopOrders.map((item)=>{
                if(item.id==id){
                    item.num=item.num+1;
                    //同时store里面的数据也要改变
                    this.changeStoreNum(id,item.num)
                }
                return item
            })
            
        }else{
             this.getCount.shopOrders= this.getCount.shopOrders.map((item)=>{
                if(item.id==id){
                    item.num=item.num-1;
                    //同时store里面的数据也要改变
                    this.changeStoreNum(id,item.num)
                }
                return item
            })
        }
        //计算总价格
        this.getTotalMoney();
    },
    //改变store里面的点餐份数
    changeStoreNum(id,num){
        let arr=this.getCount.shopOrders.map((item)=>{
            if(item.id==id){
                item.num=num
            }
            return item
        })
        //改变store
        this.addOrDeleteOrder(arr);
    },
    //计算总价
    getTotalMoney(){
        let totalMoney=0;
        this.getCount.shopOrders.map((item)=>{
            totalMoney+=item.num*item.sellPrice
        })
        this.totalMoney=totalMoney.toFixed(2)*100;
    },
    //清空所有的订单信息
    clearAll(){
         //改变store,传一个空数组即可
        this.addOrDeleteOrder([]);
        this.getTotalMoney();
        this.disabled=true;
    },
    ...mapMutations('ShopCar', ['addOrDeleteOrder']),
  }
}
</script>
