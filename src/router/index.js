import Vue from 'vue';
import Router from 'vue-router';

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

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    components: {
      header: Header,
      body: Body,
      footer: Footer,
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
        path: 'service',
        component: Service,
        name: 'Service'
      },
      {
        path: 'product',
        component: Product,
        name: 'Product'
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
      }, 400)
    })
  },
})

export default router
