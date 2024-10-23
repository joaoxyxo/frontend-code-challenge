import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
    events: [],
    eventsLoading: false,
    selectedEvent: null,
    error: null,
};

const getters = {
    events: (state) => state.events,
    eventsLoading: (state) => state.eventsLoading,
    selectedEvent: (state) => state.selectedEvent,
    error: (state) => state.error,
};

const mutations = {
    setEvents: (state, payload) => { state.events = payload },
    setEventsLoading: (state, payload) => { state.eventsLoading = payload },
    setSelectedEvent: (state, payload) => { state.selectedEvent = payload },
    setError: (state, payload) => { state.error = payload },
    addEvent: (state, payload) => {
        if (!state.events || !state.events.length)
            state.events = [];

        state.events.unshift(payload);
    },
};

const actions = {
    // Fetch the list of events
    async fetchEvents({ commit }, payload) {
        commit('setEventsLoading', true);
        commit('setEvents', []);
        commit('setError', null);

        let request_url = Vue.prototype.$url_api_live + 'events';

        request_url = StoreMixin.methods.generateQueryParamsUrl(request_url, payload);

        let output = false;

        return axios.get(request_url)
        .then(function (response) {
            output = response.status == 200;
            if (output) {
                commit('setEvents', response.data);
            } else {
                commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
                commit('setErrorStatus', response.status);
            }
        })
        .catch(function (error) {
            commit('setEvents', []);
            commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
            output = false;
        })
        .then(function () {
            commit('setEventsLoading', false);
            return output;
        });
    },

    // Create a new event
    async createEvent({ commit, dispatch }, payload) {
        // Clear state
        dispatch('clearErrors');

        // Handle payload data
        let data = payload;

        // Configure request
        const request_url = Vue.prototype.$url_api_live + 'events';

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
            output = response.data.success;
            if (response.status === 201) {
                commit('addEvent', data);
                output = true;
            } else {
                commit('setError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
                commit('setHumanError', 'Algo correu mal. Tente mais tarde ou contacte o suporte.');
                commit('setErrorStatus', response.status);
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

    async updateEvent({ commit, dispatch }, payload) {
        const eventId = payload.id;
        delete payload.id;

        // Handle payload data
        let data = JSON.stringify(payload);

        // Configure request_url
        const request_url = Vue.prototype.$url_api_live + 'events/' + eventId;

        // Configure request
        let config = {
            method: 'PUT',
            url: request_url,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };

        // Execute request & return
        let output = false;

        return axios(config)
        .then(function (response) {
            output = response.data.success;

            if (output) {
                commit('setSelectedEvent', response.data.data);
            } else {
                commit('setError', response.data.message);
                commit('setHumanError', response.data.human_message);
            }
        })
        .catch(function (error) {
            commit('setError', error.response ? error.response.data.message : error);
            commit('setHumanError', error.response ? error.response.data.human_message : error);
            output = false;
        })
        .then(function () {
            return output;
        });
    },

    // Delete an event
    async deleteEvent({ commit, dispatch }, eventId) {
        commit('setError', null);

        try {
            const response = await axios.delete(Vue.prototype.$url_api_live + `events/${eventId}`);
            if (response.status === 204) {
                // Timeout is here like an HAMMER to fix it. In order to keep it smooth when C,U,D and update Table info visually.
                setTimeout(() => {
                    // refresh
                    dispatch('fetchEvents');
                }, 1500);
            } else {
                commit('setError', response.data.message);
                commit('setErrorStatus', response.status);
            }
        } catch (error) {
            commit('setError', error.response ? error.response.data.message : error.message);
            commit('setErrorStatus', error.response ? error.response.status : null);
        }
    },

    clearErrors({ commit }) {
        commit('setError', null);
    },

    resetStore({ commit }) {
        commit('setEvents', []);
        commit('setEventsLoading', false);
        commit('setSelectedEvent', null);
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
