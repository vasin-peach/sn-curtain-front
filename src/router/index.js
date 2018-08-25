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
const Login = () =>
  import ('@component/Auth/Login')
const Register = () =>
  import ('@component/Auth/Register')

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
        name: 'Landing',
        meta: {
          title: 'หน้าหลัก'
        }
      },
      {
        path: 'store/:type',
        component: Store,
        name: 'Store-Filter',
        meta: {
          title: 'หน้าร้าน'
        }
      },
      {
        path: 'store',
        component: Store,
        name: 'Store',
        meta: {
          title: 'หน้าร้าน'
        }
      },
      {
        path: 'product/:id',
        component: Product,
        name: 'Product',
        meta: {
          title: 'สินค้า'
        }
      },
      {
        path: 'service',
        component: Service,
        name: 'Service',
        meta: {
          title: 'บริการ'
        }
      },
      {
        path: 'basket',
        component: Basket,
        name: 'Basket',
        meta: {
          title: 'ตะกร้า'
        }
      },
      {
        path: 'login',
        component: Login,
        name: 'Login',
        meta: {
          title: 'เข้าสู่ระบบ'
        }
      },
      {
        path: 'register',
        component: Register,
        name: 'Register',
        meta: {
          title: 'สมัครสมาชิก'
        }
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
  // init storeUpdate
  if (from.name == 'Store-Filter') store.commit('storeUpdate', null);
  // update title
  document.title = to.meta.title + " - S&N Curtain"
  // next
  next();
})

export default router
