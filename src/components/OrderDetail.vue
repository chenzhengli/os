<template>
    <div class="order-detail-wrapper">
        <div class="order-back">
            <div class="back">
                <router-link to="/shopcar">
                    <van-icon name="arrow-left" />
                </router-link>
            </div>
            <div class="title">订单详情</div>
        </div>
        <div class="order-id">
            <div class="id">订单编号：{{orderDetail.orderId}}</div>
            <div class="status"><van-tag plain type="primary">{{orderDetail.statusDesc}}</van-tag></div>
        </div>
        <div class="order-address">
            <div class="address-icon"><van-icon name="location" /></div>
            <div class="address-phone">
                <p class="address">南京市徐庄软件园附近</p>
                <p class="phone">陈政利 15357815796</p>
            </div>
        </div>
        <div class="order-list">
            <div class="store-info">
                <h1 class="store-name"><van-icon name="shop" />陈阿利超市徐庄软件园点</h1>
                <p class="store-phone">联系我们<van-icon name="phone" /></p>
            </div>
            <div class="arrive-time">
                <p class="time">预计时间</p>
                <p class="time-detail">2019-02-26 16:37:56</p>
            </div>
            <ul class="list-wrapper">
                <li class="list" v-for=" item in orderDetail.productInfoList" :key="item.productId">
                    <div class="list-img"><img :src="item.pictureUrl" alt=""></div>
                    <div class="list-desc">
                        <div class="product-name" v-text="item.productName"></div>
                        <div class="product-desc">约500g/份</div>
                        <div class="product-num-price">
                            <p class="product-num" v-text="'x '+item.productNum"></p>
                            <p class="product-price" v-text="'￥ '+item.unitPrice"></p>
                        </div>
                    </div>

                </li>
            </ul>
        </div>
        <div class="order-place">
            <div class="place-order-time">
                <p class="place-time">下单时间</p>
                <p class="detail-time" v-text="orderDetail.addTime"></p>
            </div>
            <div class="product-sum">
                <p class="sum">商品金额</p>
                <p class="detail-money" v-text="'￥ '+orderDetail.payPrice"></p>
            </div>
        </div>
        <div class="apply">
            <div class="remain-time">
                <span>剩余支付时间：</span>
                <span>{{time}}</span>
            </div>
            <div class="pay-cancel">
                <van-button plain type="info" size="small" round >取消订单</van-button>
                <van-button plain type="primary" size="small" round :disabled="maxTime==0?true:false">立即支付</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import API from'@/api/api.js';
export default {
    data(){
        return{
            orderDetail:{
                "orderId": "",
                "payPrice": "",
                "statusCode": "",//1.待付款，2已付款 3退款中 4已退款
                "statusDesc": "",
                "addTime": "",
                "productInfoList":[]
            },
            maxTime:1*60,//倒计的时间
            time:'',
        }
    },
    mounted(){
        let orderId=this.$route.query.orderId;
        //获取订单详情数据
        this.getOrderDetail(orderId)

        
    },
    methods:{
        //获取订单详情数据
        getOrderDetail(orderId){
            this.$axios.get(`${API.getOrderDetail}?orderId=${orderId}`)
            .then((res)=>{
                let result=res.data.data;
                if(result.success){
                    this.orderDetail=result.data;//订单详情的数据
                    //倒计时开始
                    this.countDown();
                }
            })
        },
        countDown(){
            //倒计时
            let minutes,seconds;
            const timer=setInterval(()=>{
                if (this.maxTime >=0) {
                    minutes= Math.floor(this.maxTime / 60);
                    seconds = Math.floor(this.maxTime % 60);
                    //当秒为0的时候则设置为59,分应该-1；
                    if(seconds==0&&minutes>0){
                        seconds=59;
                        minutes=minutes-1;
                    }
                    //当分秒小于10的时候加上0
                    if(minutes<10){
                        minutes='0'+minutes;
                    }
                    if(seconds<10){
                        seconds='0'+seconds
                    }
                    this.time=minutes+'分'+seconds+'秒';
                    if( this.maxTime>0){
                        this.maxTime=this.maxTime-1;
                    }
                    
                } else{
                    clearInterval(timer);
                }
            }, 1000);  
        }
    }
}
</script>
