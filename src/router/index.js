import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../components/LoginComponent.vue')
    },
    {
        path: '/orgs',
        name: 'orgs',
        component: () => import(/* webpackChunkName: "orgs" */ '../components/OrgsListComponent.vue')
    },
    {
        path: '/orgs/:id',
        name: 'OrgDetails',
        component: () => import(/* webpackChunkName: "orgs" */ '../components/OrgsDetailsComponents/OrgsDetailComponent.vue')
    },
    {
        path: '/teams',
        name: 'teams',
        component: () => import(/* webpackChunkName: "teams" */ '../components/TeamListComponent.vue')
    },
    {
        path: '/teams/:id',
        name: 'TeamDetails',
        component: () => import(/* webpackChunkName: "teams" */ '../components/TeamDetailsComponent.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
