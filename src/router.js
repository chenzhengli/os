import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Menu from "./components/Menu.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children:[
        {
          path: "/menu",
          name: "menu",
          component:Menu,
        },
        {
          path: "/businesses",
          name: "businesses",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./components/Businesses.vue")
        },
        
      ]
    },
    {
      path: "/shopcar",
      name: "shopcar",
      component: () =>
        import("./components/ShopCar.vue")
    },
    {
      path: "/myinfo",
      name: "myinfo",
      component: () =>
        import("./components/MyInfo.vue")
    },
    {
      path: "/orderdetail",
      name: "orderdetail",
      component: () =>
        import("./components/OrderDetail.vue")
    },
    
  ]
});
