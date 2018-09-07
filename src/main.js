// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import VueResource from 'vue-resource';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App';
import router from './router';
import store from './store/main';
import VueLazyLoad from 'vue-lazyload';

// import Assets
import '@scss/app.scss';
import 'bootstrap/dist/css/bootstrap.css'
import dictionary from './dictionary.js';
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faTime,
  faSearch,
  faClone,
  faShoppingBag,
  faTimes,
  faUserCircle,
  faLock,
  faListAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookSquare,
  faGooglePlusSquare
} from '@fortawesome/free-brands-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'


Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(VueSweetalert2);
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: '../static/images/lazy/lazyload.svg',
  attempt: 1
});

library.add(
  faSearch,
  faClone,
  faShoppingBag,
  faTimes,
  faUserCircle,
  faLock,
  faFacebookSquare,
  faGooglePlusSquare,
  faListAlt
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

//add credentials in request
Vue.http.options.credentials = true;

// Sentry.io Setting
if (process.env.NODE_ENV === 'staging') {
  Raven
    .config('https://a9d132b4af984b62ab3c70112969d1c1@sentry.io/1224054')
    .addPlugin(RavenVue, Vue)
    .install();
} else if (process.env.NODE_ENV === 'production') {
  Raven
    .config('https://31257534693c431ea24312c99dac7961@sentry.io/1224062')
    .addPlugin(RavenVue, Vue)
    .install();
}

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
