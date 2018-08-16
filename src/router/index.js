import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/main';

const main = () =>
  import ('@component/Main')
const Header = () =>
  import ('@component/Header')
const Body = () =>
  import ('@component/Body')
const Footer = () =>
  import ('@component/Footer')
const Landing = () =>
  import ('@component/Landing/Landing')
const Store = () =>
  import ('@component/Store/Store')
const Service = () =>
  import ('@component/Service/Service')
const Product = () =>
  import ('@component/Product/Product')
const FloatBar = () =>
  import ('@component/FloatBar/FloatBar')
const Basket = () =>
  import ('@component/Basket/Basket')

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    components: {
      header: Header,
      body: Body,
      footer: Footer,
      floatbar: FloatBar
    },
    children: [{
        path: 'landing',
        alias: '/',
        component: Landing,
        name: 'Landing'
      },
      {
        path: 'store/:type',
        component: Store,
        name: 'Store-Filter'
      },
      {
        path: 'store',
        component: Store,
        name: 'Store'
      },
      {
        path: 'product/:id',
        component: Product,
        name: 'Product'
      },
      {
        path: 'service',
        component: Service,
        name: 'Service'
      },
      {
        path: 'basket',
        component: Basket,
        name: 'Basket'
      }
    ]
  }],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          x: 0,
          y: 0
        })
      }, 0)
    })
  },
})

router.beforeEach((to, from, next) => {
  if (from.name == 'Store-Filter') store.commit('storeUpdate', null);
  next();
})

export default router
