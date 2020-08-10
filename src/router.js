import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import Members from './views/Members.vue';
import Messages from './views/Messages.vue';
import MessagesCategory from './views/MessagesCategory.vue'
import MessagesVideo from './views/MessagesVideo.vue';
import MessagesAudio from './views/MessagesAudio.vue';
import Settings from './views/Settings.vue';
import SettingsProfile from './views/SettingsProfile.vue'

Vue.use(Router);


export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Login,
            meta: {
                show_on_sidebar: false,
                display_name: 'Home',
                display_description: ''
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                show_on_sidebar: true,
                display_name: 'Dashboard',
                icon: 'mdi-chart-bar-stacked',
                display_description:'lorem ipsum dolor sit amet, consectetur adipisicing elit',
                breadcrumbs: [
                    {
                        name: 'Dashboard',
                        link: 'dashboard'
                    }
                ]
            }
        },
        {
            path: '/members',
            name: 'members',
            component: Members,
            meta: {
                show_on_sidebar: true,
                display_name: 'Members',
                icon: 'mdi-account-group',
                display_description:'lorem ipsum dolor sit amet, consectetur adipisicing elit',
                breadcrumbs: [
                    {
                        name: 'Dashboard',
                        link: 'dashboard'
                    },
                    {
                        name: 'Members',
                        link: ''
                    }
                ]
            }
        },
        {
            path: '/messages',
            name: 'messages',
            component: Messages,
            meta: {
                show_on_sidebar: true,
                display_name: 'Messages',
                icon: 'mdi-bullhorn',
                display_description:'lorem ipsum dolor sit amet, consectetur adipisicing elit',
                breadcrumbs: [
                    {
                        name: 'Dashboard',
                        link: 'dashboard'
                    },
                    {
                        name: 'Videos',
                        link: ''
                    }
                ]
            },
            children:[
                {
                    path: 'categories',
                    name: "messages_categories",
                    component: MessagesCategory,
                    meta: {
                        show_on_sidebar: true,
                        icon: 'mdi-file-tree',
                        display_name: 'Category',
                        display_description:'lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        breadcrumbs: [
                            {
                                name: 'Dashboard',
                                link: 'dashboard'
                            },
                            {
                                name: 'Message Category',
                                link: ''
                            }
                        ]
                    }
                },
                {
                    path: 'videos',
                    name: "messages_video",
                    component: MessagesVideo,
                    meta: {
                        show_on_sidebar: true,
                        icon: 'mdi-message-video',
                        display_name: 'Videos',
                        display_description:'lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        breadcrumbs: [
                            {
                                name: 'Dashboard',
                                link: 'dashboard'
                            },
                            {
                                name: 'Videos',
                                link: ''
                            }
                        ]
                    }
                },
                {
                    path: 'audio-messages',
                    name: "messages_video",
                    component: MessagesAudio,
                    meta: {
                        show_on_sidebar: true,
                        icon: 'mdi-volume-high',
                        display_name: 'Audio',
                        display_description:'lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        breadcrumbs: [
                            {
                                name: 'Dashboard',
                                link: 'dashboard'
                            },
                            {
                                name: 'Audio',
                                link: ''
                            }
                        ]
                    }
                },
            ]
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            meta: {
                show_on_sidebar: true,
                display_name: 'Settings',
                display_description:'lorem ipsum dolor sit amet, consectetur adipisicing elit',
                icon: 'mdi-cog',
                breadcrumbs: [
                    {
                        name: 'Dashboard',
                        link: 'dashboard'
                    },
                    {
                        name: 'Settings',
                        link: ''
                    }
                ],
            },
            children:[
                {
                    path:'profile',
                    name: 'settings_profile',
                    component: SettingsProfile,
                    meta: {
                        show_on_sidebar: true,
                        display_name: 'Profile',
                        display_description:'lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        icon: 'mdi-account-search',
                        breadcrumbs: [
                            {
                                name: 'Dashboard',
                                link: 'dashboard'
                            },
                            {
                                name: 'Settings',
                                link: ''
                            }
                        ],
                    }
                }
            ]
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