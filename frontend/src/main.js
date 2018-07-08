// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import BootstrapVue from 'bootstrap-vue';
import VeeValidae from 'vee-validate';
import App from './App'
import router from './router'
import store from './store/main'

// import Assets
import '@scss/app.scss';


// Sentry.io Setting
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
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
