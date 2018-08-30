import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/main';
import _ from 'lodash';


const main = () =>
  import ('@component/Main');
const Notfound = () =>
  import ('@component/Notfound');
const Header = () =>
  import ('@component/Header');
const Body = () =>
  import ('@component/Body');
const Footer = () =>
  import ('@component/Footer');
const Landing = () =>
  import ('@component/Landing/Landing')
const Store = () =>
  import ('@component/Store/Store');
const Service = () =>
  import ('@component/Service/Service');
const Product = () =>
  import ('@component/Product/Product');
const FloatBar = () =>
  import ('@component/FloatBar/FloatBar');
const Basket = () =>
  import ('@component/Basket/Basket');
const Login = () =>
  import ('@component/Auth/Login');
const Register = () =>
  import ('@component/Auth/Register');
// Profile
const Profile = () =>
  import ('@component/Auth/Profile/Profile');
const ProfileMe = () =>
  import ('@component/Auth/Profile/Me');
const ProfileHistory = () =>
  import ('@component/Auth/Profile/History');

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
          title: 'หน้าหลัก',
        }
      },
      {
        path: '404',
        component: Notfound,
        name: 'Notfound',
        meta: {
          title: '404'
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
          title: 'เข้าสู่ระบบ',
          login: 0
        }
      },
      {
        path: 'register',
        component: Register,
        name: 'Register',
        meta: {
          title: 'สมัครสมาชิก',
          login: 0
        }
      },
      // {
      //   path: '/',
      //   components: {
      //     header: Header,
      //     body: Body,
      //     footer: Footer,
      //     floatbar: FloatBar
      //   },
      //   children: [{
      {
        path: '/profile',
        component: Profile,
        children: [{
            path: '',
            component: ProfileMe,
            name: 'Profile',
            meta: {
              title: 'ข้อมูลส่วนตัว',
              login: 1
            },
          },
          {
            path: 'history',
            component: ProfileHistory,
            name: 'ProfileHistory',
            meta: {
              title: 'ประวัติการสั่งซื้อ',
              login: 1
            },
          }
        ]
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
  document.title = to.meta.title + " - S&N Curtain";

  // check path exist
  to.matched.length ? next() : next({
    name: 'Notfound'
  });

  /// --
  // Metadata Middleware
  /// --

  if (to.matched.some(record => record.meta.login == 0 || record.meta.login == 1)) {
    checkAuth().then(() => {
      var user = store.getters.userData;

      if (to.meta.login) {
        if (_.isEmpty(user)) {
          return next({
            name: 'Login'
          })
        }
      } else if (!to.meta.login) {
        if (!_.isEmpty(user)) {
          return next({
            name: 'Profile'
          })
        }
      }
    })
  }

  // checkAuth().then(() => {

  //   // Auth
  //   if (to.matched.some(record => record.meta.login == 0 || record.meta.login == 1)) {

  //     var user = store.getters.userData;

  //     if (to.meta.login) {
  //       if (_.isEmpty(user)) {
  //         return next({
  //           name: 'Login'
  //         })
  //       }
  //     } else if (!to.meta.login) {
  //       if (!_.isEmpty(user)) {
  //         return next({
  //           name: 'Profile'
  //         })
  //       }
  //     }
  //   }
  // })




  async function checkAuth() {
    return new Promise((resolve, reject) => {
      store.dispatch('profile').then(() => {
        return resolve()
      }, () => {
        return resolve()
      })

    })
  }

  // next
  next();
})

export default router
