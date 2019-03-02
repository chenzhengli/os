import Vue from "vue";
import Vuex from "vuex";
import ShopCar from '@/storemodules/shopcar';
Vue.use(Vuex);


export default new Vuex.Store({
  modules:{
    ShopCar
  }
});
