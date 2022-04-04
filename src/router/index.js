import VueRouter from "vue-router";
import Vue from "vue";

const Home = () => import('@/views/home/Home.vue')
const Category = () => import('@/views/categories/Category.vue')
const Cart = () => import('@/views/shopcart/Cart.vue')
const Profile = () => import('@/views/profile/Profile.vue')
const Detail = () => import('@/views/detail/Detail.vue')

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    // redirect重定向
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    },
  },
  {
    path: '/shopcart',
    component: Cart,
    meta: {
      title: '购物车'
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    },
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router