import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router);


export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                breadcrumbs: [
                    {
                        name: 'Dashboard',
                        link: 'dashboard'
                    }
                ]
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/']
    const loginRecquired = !publicPages.includes(to.path)
    const logedIn = localStorage.getItem('user')

    // trying to access a restricted page + not logged in
    // redirect to login page
    if(loginRecquired && !logedIn){
        next('/');
    } else if(to.path == '/' && logedIn) {
        next('/dashboard');
    } else {
        next();
    }

});