import Vue from 'vue';
import Router from 'vue-router';

const main = () =>
  import ('@component/Main')
const landing = () =>
  import ('@component/Landing')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: main,
    children: [{
      path: 'landing',
      alias: '/',
      component: landing
    }]
  }]
})
