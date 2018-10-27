import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/main';
import _ from 'lodash';


const main = () =>
  import('@component/Main');
const Notfound = () =>
  import('@component/Notfound');
const Header = () =>
  import('@component/Header');
const Body = () =>
  import('@component/Body');
const Footer = () =>
  import('@component/Footer');
const Landing = () =>
  import('@component/Landing/Landing')
const Store = () =>
  import('@component/Store/Store');
const Service = () =>
  import('@component/Service/Service');
const Product = () =>
  import('@component/Product/Product');
const FloatBar = () =>
  import('@component/FloatBar/FloatBar');
const Basket = () =>
  import('@component/Basket/Basket');
const Login = () =>
  import('@component/Auth/Login');
const Register = () =>
  import('@component/Auth/Register');

// Payment
const Payment = () =>
  import('@component/Payment/Payment');
const Payment_Address = () =>
  import('@component/Payment/Address');
const Payment_Credit = () =>
  import('@component/Payment/Credit');
const Payment_Atm = () =>
  import('@component/Payment/Atm');

// Profile
const Profile = () =>
  import('@component/Auth/Profile/Profile');
const ProfileMe = () =>
  import('@component/Auth/Profile/Me');
const ProfileHistory = () =>
  import('@component/Auth/Profile/History');

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
          login: 2,
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
        path: 'store/:category',
        component: Store,
        name: 'Store-Filter',
        meta: {
          title: 'หน้าร้าน',
          login: 2,
        }
      },
      {
        path: 'store',
        component: Store,
        name: 'Store',
        meta: {
          title: 'หน้าร้าน',
          login: 2,
        }
      },
      {
        path: 'product/:id',
        component: Product,
        name: 'Product',
        meta: {
          title: 'สินค้า',
          login: 2,
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
          title: 'ตะกร้า',
          login: 1,
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
      {
        path: 'payment',
        component: Payment,
        meta: {
          title: 'ชำระเงิน',
          login: 1,
          payment: 1
        },
        children: [{
            path: 'address',
            alias: '/',
            component: Payment_Address,
            name: 'Payment',
            meta: {
              title: 'ข้อมูลที่อยู่',
              login: 1,
            }
          },
          {
            path: 'credit',
            component: Payment_Credit,
            name: 'Payment_Credit',
            meta: {
              title: 'ชำระผ่านบัตร',
              login: 1,
              payment: 2
            }
          },
          {
            path: 'atm',
            component: Payment_Atm,
            name: 'Payment_Atm',
            meta: {
              title: 'ชำระผ่านการโอน',
              login: 1
            }
          }
        ]
      },
      {
        path: '/profile',
        component: Profile,
        children: [{
            path: '',
            component: ProfileMe,
            name: 'Profile',
            meta: {
              title: 'ข้อมูลส่วนตัว',
              login: 1,
            },
          },
          {
            path: 'history',
            component: ProfileHistory,
            name: 'ProfileHistory',
            meta: {
              title: 'ประวัติการสั่งซื้อ',
              login: 1,
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

  // init smooth scroll
  smoothScroll(to);

  // update redirect after login path every time
  Vue.cookie.set("redirect", to.path);




  /// --
  // Metadata Middleware
  /// --


  if (to.matched.some(record => record.meta.login == 0 || record.meta.login == 1 || record.meta.login == 2)) {
    checkAuth().then(() => {
      var user = store.getters.userData;
      if (to.meta.login == 2) return;
      if (to.meta.login) {
        if (_.isEmpty(user)) {
          return next({
            name: 'Login'
          });
        }
      } else if (!to.meta.login) {
        if (!_.isEmpty(user)) {
          return next({
            name: 'Profile'
          });
        }
      }
    });
  }

  // payment stage1 check basket is exist
  if (to.matched.some(record => record.meta.payment == 1)) {

    // navigation to basket if basket is empty
    if (_.isEmpty(JSON.parse(localStorage.basket || 'null') || null)) return next({
      name: 'Basket'
    });
  }

  // payment stage2 check address is exist
  if (to.matched.some(record => record.meta.payment == 2)) {

    // disable payment options in payment address page
    store.commit('popupPaymentOptionsUpdate', false);

    // check user have paymentAddress in cookie
    if (_.isEmpty(JSON.parse(Vue.cookie.get('paymentAddress')))) return next({
      name: 'Payment'
    });
  }


  async function checkAuth() {
    return new Promise((resolve, reject) => {
      store.dispatch('profile').then(() => {
        return resolve()
      }, () => {
        return resolve()
      })
    })
  }


  // check path exist
  to.matched.length ? next() : next({
    name: 'Notfound'
  });

  // next
  next();
});

function smoothScroll(to) {
  var $window = $("html"); //Window object
  var scrollTime = 0.8; //Scroll time
  var scrollDistance = 270; //Distance. Use smaller value for shorter scroll and greater value for longer scroll

  // check if path area ['address'] or ['credit']
  if (to.path.split("/").indexOf('address') == -1 && to.path.split("/").indexOf('credit') == -1) {
    // bind html scroll
    $window.bind("mousewheel DOMMouseScroll scroll", function (event) {
      event.preventDefault();

      var delta =
        event.originalEvent.wheelDelta / 120 ||
        -event.originalEvent.detail / 3;
      var scrollTop = $window.scrollTop();
      var finalScroll = scrollTop - parseInt(delta * scrollDistance);

      TweenMax.to($window, scrollTime, {
        scrollTo: {
          y: finalScroll,
          autoKill: true
        },
        ease: Power1.easeOut, //For more easing functions see https://api.greensock.com/js/com/greensock/easing/package-detail.html
        overwrite: 5
      });
    });
  } else {
    // unbind html scroll
    $window.unbind("mousewheel DOMMouseScroll scroll");
  }

}



export default router
