import Vue from 'vue';
import Vuex from 'vuex';
import usersModule from './users';
import ordersModule from './orders';



Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users: usersModule,
        orders: ordersModule,
    },
});
