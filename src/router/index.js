import { createRouter, createWebHistory } from 'vue-router'

//Firebase dependencies
import { currentUser } from '../services/firebaseApp'

//404
import PathNotFound from '../components/PathNotFound.vue'

//Main Pages
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Countries from '../views/Countries.vue'
import News from '../views/News.vue'

import SignInLinkConfirmation from '../components/SignInLinkConfirmation.vue'
import Login from '../views/Login.vue'

//Profile specific pages
import MyPasses from '../views/MyPasses.vue'
import UserPassDetailed from '../views/UserPassDetailed.vue'
import Account from '../views/Account.vue'

//Settings pages
import Personal from '../views/Account-Routes/Personal.vue'
import Payments from '../views/Account-Routes/Payments.vue'

//Admin page
import Admin from '../views/Admin.vue'
import AdminOverview from '../views/Admin-Views/AdminOverview.vue'
import Scan from '../views/Admin-Views/Scan.vue'
import AdminCountries from '../views/Admin-Views/AdminCountries.vue'
import AdminUsers from '../views/Admin-Views/AdminUsers.vue'

const routes = [
    //Redirect path for unknown pages
    { path: '/:pathMatch(.*)*', name: '404', component: PathNotFound },

    //Main paths
    { path: '/', name: '', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/countries', name: 'Countries', component: Countries },
    { path: '/news', name: 'News', component: News },

    //Profile paths
    {
        path: '/me/passes', name: 'My Passes', component: MyPasses, meta: { requiresAuth: true }
    },
    {
        path: '/me/passes/:passId', name: 'Pass', component: UserPassDetailed, meta: { requiresAuth: true }
    },
    {
        path: '/account', name: 'Account', component: Account, meta: { requiresAuth: true }
    },


    //Settings paths
    {
        path: '/account/personal-info', name: 'Personal Info', component: Personal, meta: { requiresAuth: true }
    },
    {
        path: '/account/payments', name: 'Payments', component: Payments, meta: { requiresAuth: true }
    },

    //Login paths
    { path: '/login', name: 'Login', component: Login },
    { path: '/signInConfirmation', name: 'Confirmation', component: SignInLinkConfirmation },

    //Admin
    {
        path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true }, redirect: '/admin/overview', children: [
            { path: '/admin/overview', name: 'AdminOverview', component: AdminOverview, meta: { requiresAuth: true } },
            { path: '/admin/scan', name: 'Scan', component: Scan, meta: { requiresAuth: true } },
            { path: '/admin/users', name: 'AdminUsers', component: AdminUsers, meta: { requiresAuth: true } },
            { path: '/admin/countries', name: 'AdminCountries', component: AdminCountries, meta: { requiresAuth: true } },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        else
            return {
                top: 0
            }
    }
})

//Router guard
//If a route requires authentication, it must be checked and redirected to login
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (!await currentUser() && requiresAuth) {
        next('Login')
    }
    else {
        if (to.name != '')
            document.title = to.name + ' - Mercury Pass'
        else
            document.title = 'Mercury Pass'
        next()
    }
});

export default router