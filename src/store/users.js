import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { update } from 'lodash';

Vue.use(Vuex);

const state = {
    users: [],
    usersLoading: false,
    selectedUser: null,
    error: null,
};

const getters = {
    users: (state) => state.users,
    usersLoading: (state) => state.usersLoading,
    selectedUser: (state) => state.selectedUser,
    error: (state) => state.error,
};

const mutations = {
    setUsers: (state, payload) => { state.users = payload },
    setUsersLoading: (state, payload) => { state.usersLoading = payload },
    setSelectedUser: (state, payload) => { state.selectedUser = payload },
    setError: (state, payload) => { state.error = payload },
    addUser: (state, payload) => {
        if (!state.users || !state.users.length)
            state.users = [];

        state.users.unshift(payload);
    },
    updateUser: (state, payload) => {
        const index = state.users.findIndex(d => d.id == payload.id);

        const updatedItems = [
            ...state.users.slice(0, index),
            payload,
            ...state.users.slice(index + 1)
        ];

        state.users = updatedItems;
    },
};

const actions = {
    // Fetch the list of users
    async fetchUsers({ commit }, payload) {
        commit('setUsersLoading', true);
        commit('setUsers', []);
        commit('setError', null);

        let request_url = "http://localhost:3333" + '/users';


        let output = false;

        return axios.get(request_url)
            .then(function (response) {
                output = response.status == 200;
                if (output) {
                    commit('setUsers', response.data);
                } else {
                    commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
                }
            })
            .catch(function (error) {
                commit('setUsers', []);
                commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
                output = false;
            })
            .then(function () {
                commit('setUsersLoading', false);
                return output;
            });
    },

    // Create a new user
    async create({ commit, dispatch }, payload) {
        // Clear state
        dispatch('clearErrors');

        // Handle payload data
        let data = payload;

        // Configure request
        const request_url = "http://localhost:3333" + '/users';

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
                    commit('addUser', response.data);
                    output = true;
                } else {
                    commit('setError', 'Algo correu mal. Por favor confirma que colocaste todos os campos corretamente.');
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

    async update({ commit, dispatch }, payload) {
        dispatch('clearErrors');

        // Handle payload data
        let data = payload
        delete data.password

        // Configure request
        const request_url = "http://localhost:3333" + '/user/' + payload.id + '/edit'
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
                    commit('setSelectedUser', response.data);
                    commit('updateUser', response.data);
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

    async getUser({ commit }, payload) {
        commit('setError', null);
        commit('setSelectedUser', null);

        let request_url = "http://localhost:3333" + '/user/' + payload.id;

        let output = false;

        return axios.get(request_url)
            .then(function (response) {
                output = response.status == 200;
                if (output) {
                    commit('setSelectedUser', response.data);
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
        commit('setUsers', []);
        commit('setUsersLoading', false);
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
