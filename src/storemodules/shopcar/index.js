//购物车模块
export default {
    namespaced: true,  //多出的一行
    state: {
        shopOrders:[],
      },
    getters:{
        //获取购物车的订单数量和列表
        getCount(state){
            let count=0;
            let obj={
            };
            state.shopOrders.map((item)=>{
                //选出item.num数量大于0的并且对其相加算出点餐的份数
                if(item.num>0){
                    count+=item.num
                }
            })
            obj.count=count;
            obj.shopOrders=state.shopOrders;
            return obj
        },
        // //获取num>0的，也就是点餐的数量
        // getShopOrders(state){
        //    let selectedArr= state.shopOrders.filter((item)=>{
        //         //选出item.num数量大于0的并且对其相加算出点餐的份数
        //        return item.num>0
        //     })
        //     return selectedArr
        // }
    },
    mutations: {
        //当点餐的分数增加或者减少的时候
        addOrDeleteOrder(state,shopOrders){
            state.shopOrders=shopOrders
        }
    },
    actions: {

    }
};       