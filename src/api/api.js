const baseUrl="https://www.easy-mock.com/mock/5c680a9b1b1cdb683581355e/os";
const API={
    getCataLog:baseUrl+'/getCataLog',//获取商品分类数据
    getCataLogDetail:baseUrl+'/getCataLogDetail',//根据商品分类id获取具体食品的list
    placeOrder:baseUrl+'/placeOrder',//提交订单
    getOrderDetail:baseUrl+'/getOrderDetail',//获取订单详情的页面

}
export default API