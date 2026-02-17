import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BNEdit from '../views/BN.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/bn',
        name: 'BN',
        component: BNEdit
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router