import Vue from 'vue';
import {login, logout} from '@/services/auth.service';

export const state = {
    token: localStorage.getItem('token') || '',
    status: '',
};

export const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
};

export const mutations = {
    auth_request(state) {
        state.status = 'loading';
    },
    auth_success(state, token) {
        state.status = 'success';
        state.token = token;
    },
    auth_error(state) {
        state.status = 'error';
    },
    logout(state) {
        state.status = '';
        state.token = '';
    },
};

export const actions = {
    login({commit}, {email, password}) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            login(email, password)
                .then(response => {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
                    commit('auth_success', token);
                    resolve(response);
                })
                .catch(error => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    reject(error);
                });
        });
    },
    logout({commit}) {
        return new Promise((resolve, reject) => {
            logout()
                .then(() => {
                    commit('logout');
                    localStorage.removeItem('token');
                    delete Vue.prototype.$http.defaults.headers.common['Authorization'];
                    resolve();
                })
                .catch(error => {
                    commit('setError', error.response.data.error, {root: true});
                    reject(error);
                });
        });
    },
};
