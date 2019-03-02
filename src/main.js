import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { 
  Button,
  Popup,Rate,
  TabbarItem,
  Tabbar,
  Icon,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Row, 
  Col,
  Tab, 
  Tabs,
  Card,
  List,
  NoticeBar,
  SubmitBar,
  Tag,
} from 'vant';
  
import './css/reset.css';
import 'vant/lib/index.css';
import './App.scss';
import '@/css/home.scss';
import '@/css/menu.scss';
import '@/css/shopcar.scss';
import '@/css/myinfo.scss';
import '@/css/orderdetail.scss';
//使用rem布局
import 'amfe-flexible';

axios.defaults.headers.token='12345862863283672'
axios.interceptors.request.use((config)=>{
  // console.log(5555,config);
  return config
},(err)=>{
  return Promise.reject(err)
})
Vue.prototype.$axios=axios;
Vue.use(Button)
.use(Rate)
.use(Tabbar)
.use(TabbarItem)
.use(Icon)
.use(GoodsAction)
.use(GoodsActionBigBtn)
.use(GoodsActionMiniBtn)
.use(Row)
.use(Col)
.use(Tab)
.use(Card)
.use(List)
.use(Tag)
.use(NoticeBar)
.use(SubmitBar)
.use(Tabs);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
