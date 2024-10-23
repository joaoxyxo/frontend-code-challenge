/* eslint-disable no-console */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Users from '@/views/Users/Users.vue';
import Home from '@/views/Home/Home.vue';
import Orders from '@/views/Orders/Orders.vue';


Vue.use(VueRouter);


const routes = [
    { name: 'Home', path: '/', component: Home },
    { name: 'Jogadores', path: '/users', component: Users },
    { name: 'Encomendas', path: '/orders', component: Orders },
];

const router = new VueRouter({
    routes,
    mode: 'history',
    base: '/',
});


router.beforeEach((to, from, next) => {
    next();
});


export default router;
