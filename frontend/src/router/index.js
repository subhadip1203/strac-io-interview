import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/Home/DashboardView.vue'
import GoogleDriveFolderView from '@/views/GoogleDrive/GoogleDriveFolderView.vue'


import AuthHome from '@/views/AuthView/AuthHome.vue'
import AuthCallBack from '@/views/AuthView/AuthCallBack.vue'


// import pinia store
import { useAuthStore } from '@/stores/auth_store.js'

// routes that doesnot require authentication
const noAuthRoutes = ['AuthHome', 'AuthCallBack']

// if user authenticated , the Home page will load
// else , Login page will load
// so only these two routes (Home and login) are imported
// other routes are imported dynamically lazy loading

// 8299

// create router for the application
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth',
            name: 'AuthHome',
            component: AuthHome,
            meta: {
                layout: 'auth-template'
            }
        },
        {
            path: '/auth/callback',
            name: 'AuthCallBack',
            component: AuthCallBack,
            meta: {
                layout: 'auth-template'
            }
        },

        {
            path: '/',
            name: 'Dashboard',
            component: DashboardView
        },
        {
            path: '/google-drive-folder-view/:id',
            name: 'GoogleDriveFolderView',
            component: GoogleDriveFolderView
        },

    ]
})

router.beforeEach((to, from, next) => {

    // auth pinia store
    const authStore = useAuthStore()

    // check if the user is logged in and the route requires authentication
    // if true , `next` will call Login route
    // else , `next` is called for current route

    if (!noAuthRoutes.includes(to.name) && authStore.isAuthenticated == false) {
        next({ name: 'AuthHome' })
    } else {
        next()
    }
})

export default router
