import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/views/Login'
import Register from '@/components/views/Register'
import AdminPage from '@/components/views/AdminPage'
import AboutUS from '@/components/views/AboutUS'
import Adminform from '@/components/components/AdminPage/Adminform'
import AccountMessage from '@/components/components/AdminPage/Adminform components/AccountMessage'
import RequestList from '@/components/components/AdminPage/Adminform components/RequestList'
import normalform from '@/components/components/normalworking/normalform'
import Marking from '@/components/components/normalworking/normalform components/Marking'
import normalmanagement from '@/components/components/normalworking/normalform components/normalmanagement'
import leaderform from '@/components/components/leaderworking/leaderform'
import Markingmanagement from '@/components/components/leaderworking/leaderform components/Markingmanagement'
import Uploading from '@/components/components/leaderworking/leaderform components/Uploading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/AdminPage',
      name: 'AdminPage',
      component: AdminPage,
      children: [
        {
          path: '/AdminPage/Adminform',
          name: 'Adminform',
          component: Adminform,
          children: [{
            path: '/AdminPage/Adminform components/AccountMessage',
            name: 'AccountMessage',
            component: AccountMessage
          },
          {
            path: '/AdminPage/Adminform components/RequestList',
            name: 'RequestList',
            component: RequestList
          }
          ]
        }
      ]
    },
    {
      path: '/AboutUs',
      name: 'AboutUs',
      component: AboutUS
    },
    {
      path: '/normalworking/normalform',
      name: 'normalform',
      component: normalform,
      children: [{
        path: '/normalworking/normalform components/Marking',
        name: 'Marking',
        component: Marking
      },
      {
        path: '/normalworking/normalform components/normalmanagement',
        name: 'normalmanagement',
        component: normalmanagement
      }]
    },
    {
      path: '/leaderworking/leaderform',
      name: 'leaderform',
      component: leaderform,
      children: [{
        path: '/leaderworking/leaderform components/Markingmangement',
        name: 'Markingmanagement',
        component: Markingmanagement
      },
      {
        path: '/leaderworking/leaderform components/Uploading',
        name: 'Uploading',
        component: Uploading
      }
      ]
    }
  ]
})
