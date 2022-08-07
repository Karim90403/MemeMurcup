import { createRouter, createWebHistory } from 'vue-router'

import addTag from '../components/addTag.vue'
import mainWrapper from '../components/mainWrapper.vue'
import Registration from '../components/Registration.vue'

const routes = [
    {
        path: '/',
        component: mainWrapper
    },
    {
        path: '/addtag',
        component: addTag
    },
    {
        path: '/register',
        component: Registration
    }

]

export default createRouter({
    history: createWebHistory(),
    routes
})


