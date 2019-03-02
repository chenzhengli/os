<template>
    <div class="catalog-wrapper">
        <div class="catalog-list">
            <ul class="catalog-list-nav">
                <li v-for="item in catalogList" :key="item.id" @click="handChangeCatalog(item.id)" :class="catalogActive==item.id?'catalog-active':''">
                    {{item.name}}
                </li>
            </ul>
                <ul class="catalog-list-detail">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="小主~没有更多了哦"
                        @load="onLoad"
                    >
                        <li v-for="item in catalogDetailList" :key="item.id">
                            <van-card
                                :price="item.sellPrice"
                                desc="红豆,枸杞,养身,开心豆,枸杞,养身,开心"  
                                title="红豆奶茶"
                                :thumb="item.productPictureUrl"
                                >
                                    
                                    <div slot="title" class="card-title">
                                        <span>{{item.name}}</span>
                                    </div>
                                    <div slot="desc" class="card-desc">
                                        <h3>红豆,枸杞,养身,开心豆,枸杞,养身,开心</h3>
                                        <h3>月销100份,赞</h3>
                                    </div>
                                    <div slot="num" class="card-num">
                                        <span class="num num-delete" v-if="item.num" @click="addOrDelete('delete',item.id)">-</span>
                                        <span v-if="item.num" class="muns">{{item.num}}</span>
                                        <span class="num num-plus" @click="addOrDelete('add',item.id)">+</span>
                                    </div>
                                    <!-- <div slot="price" class="card-price">
                                        <span :style="{fontSize:'16px'}">￥20</span>
                                        
                                    </div> -->
                                    <!-- <div slot="footer">
                                        <van-button size="mini">按钮</van-button>
                                        <van-button size="mini">按钮</van-button>
                                    </div> -->
                                </van-card>
                        </li>
                    </van-list>
                </ul>
        </div>
    </div>
</template>
<script>
import API from'@/api/api.js';
import {mapState, mapMutations,mapGetters } from "vuex";
export default {
    data(){
        return{
            catalogActive:1,
            catalogList:[],//商品分类
            catalogDetailList:[],//每个商品类别下面对应的具体食品列表
            loading: false,
            finished: false
        }
    },
    mounted(){
       this.getCataLog();
    },
    computed:{
        ...mapGetters('ShopCar',
        ['getCount'],//这个是store中getters的方法名会根据依赖进行响应式
        )
    },
    methods:{
        //切换商品分类
        handChangeCatalog(id){
            this.catalogActive=id;
            this.getCataLogDetail(id)
        },
        //获取商品分类
        getCataLog(){
             this.$axios.get(API.getCataLog)
                .then((res)=>{
                    let result=res.data.data;
                    if(result.success&&result.rows){
                        this.catalogList=result.rows;
                    }
                }).then(()=>{
                    this.loading=true;
                     this.finished=false;
                    this.getCataLogDetail(this.catalogList[0].id)
                })
        },
        //每个商品类别下面对应的具体食品列表
        getCataLogDetail(id){
            this.$axios.get(`${API.getCataLogDetail}?id=${id}`)
            .then((res)=>{
                let result=res.data.data;
                if(result.success&&result.rows){
                    this.catalogDetailList=result.rows.map((item)=>{
                        //在获取到食品列表之后则应该和store里面的已点的进行比较如果此商品已被点过则已被点过的份数为主
                       if(this.getCount.shopOrders.length>0){
                            this.getCount.shopOrders.map((storeItem)=>{
                                //通过id比较
                                if(item.id===storeItem.id){
                                    item.num=storeItem.num;
                                }
                            })
                       }else{
                            item.num=0;
                       }
                        return item
                    });
                    //每次重新发起请求的时候就把数据放到store,但是放到store的时候要注意数据是否重复，先去重
                    let arr=[];
                    if(this.getCount.shopOrders.length>0){
                             result.rows.map((item)=>{
                                let flag=true;
                                this.getCount.shopOrders.map((storeItem)=>{
                                    if(storeItem.id==item.id){
                                        flag=false;
                                        // item.num=storeItem.num
                                    }
                                })
                                //当为true的时候说明接口请求来的数据和store里面的都不同则把它添加到store
                                if(flag){
                                    arr.push(item);
                                }
                            })
                       }else{
                           arr=result.rows.map((item)=>{
                               item.num=0
                               return item
                           });
                       }
                       //最后把数据添加到store中
                     this.addOrDeleteOrder([...this.getCount.shopOrders,...arr]);
                }
            })
        },
        onLoad(){
            this.loading=false;
            this.finished=true;
        },
        //增加或减少一份食品
        addOrDelete(type,id){
            if(type==="add"){
                this.catalogDetailList=this.catalogDetailList.map((item)=>{
                    if(item.id==id){
                        item.num=item.num+1;
                         //同时store里面的数据也要改变
                        this.changeStoreNum(id,item.num)
                    }
                    return item
                })
               
            }else{
                this.catalogDetailList=this.catalogDetailList.map((item)=>{
                    if(item.id==id){
                        item.num=item.num-1;
                        //同时store里面的数据也要改变
                        this.changeStoreNum(id,item.num)
                    }
                    return item
                })
            }
        },
       
        //改变store里面的点餐份数
        changeStoreNum(id,num){
            let arr=this.getCount.shopOrders.map((item)=>{
                if(item.id==id){
                    item.num=num
                }
                return item
            })
             this.addOrDeleteOrder(arr);
        },
        
        ...mapMutations('ShopCar', ['addOrDeleteOrder']),
    }
}
</script>
