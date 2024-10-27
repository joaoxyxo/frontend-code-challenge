import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
    orders: [],
    ordersLoading: false,
    selectedOrder: null,
    error: null,
};

const getters = {
    orders: (state) => state.orders,
    ordersLoading: (state) => state.ordersLoading,
    selectedOrder: (state) => state.selectedOrder,
    error: (state) => state.error,
};

const mutations = {
    setOrders: (state, payload) => { state.orders = payload },
    setOrdersLoading: (state, payload) => { state.ordersLoading = payload },
    setSelectedOrder: (state, payload) => { state.selectedOrder = payload },
    setError: (state, payload) => { state.error = payload },
    addOrder: (state, payload) => {
        if (!state.orders || !state.orders.length)
            state.orders = [];

        state.orders.unshift(payload);
    },
    updateOrder: (state, payload) => {
        const index = state.orders.findIndex(d => d.id == payload.id);

        const updatedItems = [
            ...state.orders.slice(0, index),
            payload,
            ...state.orders.slice(index + 1)
        ];

        state.orders = updatedItems;
    },
};

const actions = {
    // Fetch the list of orders
    async fetchOrders({ commit }, payload) {
        commit('setOrdersLoading', true);
        commit('setOrders', []);
        commit('setError', null);

        let request_url = "http://localhost:3333" + '/orders';


        let output = false;

        return axios.get(request_url)
        .then(function (response) {
            output = response.status == 200;
            if (output) {
                commit('setOrders', response.data);
            } else {
                commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
            }
        })
        .catch(function (error) {
            commit('setOrders', []);
            commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
            output = false;
        })
        .then(function () {
            commit('setOrdersLoading', false);
            return output;
        });
    },

    // Create a new order
    async create({ commit, dispatch }, payload) {
        // Clear state
        dispatch('clearErrors');

        // Handle payload data
        let data = payload;

        // Configure request
        const request_url = "http://localhost:3333" + '/orders';

        let config = {
            method: 'POST',
            url: request_url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        // Execute request & return
        let output = false;

        return axios(config)
        .then(function (response) {
            if (response.status === 200) {
                commit('addOrder', response.data);
                output = true;
            } else {
                commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
            }
        })
        .catch(function (error) {
            commit('setError', error.response ? error.response.data.message : error);
            output = false;
        })
        .then(function () {
            return output;
        });
    },

    async update({ commit, dispatch }, payload) {
        dispatch('clearErrors');

        // Handle payload data
        let data = payload
        delete data.password

        // Configure request
        const request_url = "http://localhost:3333" + '/order/' + payload.userId + '/edit'
        let config = {
            method: 'PUT',
            url: request_url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        // Execute request & return
        let output = false;

        return axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    output = true
                    commit('setSelectedOrder', response.data);
                    commit('updateOrder', response.data);
                } else {
                    commit('setError','Algo correu mal. Por favor confirma que colocaste todos os campos corretamente.');
                }
            })
            .catch(function (error) {
                commit('setError', 'Algo correu mal. Por favor confirma que colocaste todos os campos corretamente.');
                output = false;
            })
            .then(function () {
                return output;
            });
    },

    async getOrder({ commit }, payload) {
        commit('setError', null);

        let request_url = "http://localhost:3333" + '/order/' + payload.id;

        let output = false;

        return axios.get(request_url)
        .then(function (response) {
            output = response.status == 200;
            if (output) {
                commit('setSelectedOrder', response.data);
            } else {
                commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
            }
        })
        .catch(function (error) {
            commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
            output = false;
        })
        .then(function () {
            return output;
        });
    },

    clearErrors({ commit }) {
        commit('setError', null);
    },

    resetStore({ commit }) {
        commit('setOrders', []);
        commit('setOrdersLoading', false);
        commit('setError', null);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
