import Vue from 'vue';
import Router from 'vue-router';

const main = () =>
  import ('@component/Main')
const Header = () =>
  import ('@component/Header')
const Body = () =>
  import ('@component/Body')
const Landing = () =>
  import ('@component/Landing/Landing')
const Footer = () =>
  import ('@component/Footer')

Vue.use(Router)

export default new Router({
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
      component: Landing
    }]
  }]
})
