import Vue from 'vue';

export const state = {
    error: null,
};

export const getters = {
    getError: state => state.error,
};

export const mutations = {
    setError(state, error) {
        state.error = error;
    },
    clearError(state) {
        state.error = null;
    },
};

export const actions = {
    setError({commit}, error) {
        commit('setError', error);
        Vue.toasted.error(error.message);
    },
    clearError({commit}) {
        commit('clearError');
    },
};
