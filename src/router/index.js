import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Version from '../components/Version'
import Route from "../components/Route";
import Star from "../components/Star";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/version',
      name: 'Version',
      component: Version
    },
    {
      path: '/route',
      name: 'Route',
      component: Route
    },
    {
      path: '/star',
      name: 'Star',
      component: Star
    }
  ]
})
