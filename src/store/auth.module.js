import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const acc = JSON.parse(localStorage.getItem('acc'));
const initialState = user
    ? {
        status: {loggedIn: true},
        account: acc,
        app_domain: process.env.VUE_APP_URL,
        app_backend: process.env.VUE_APP_BACKEND_URL
    }
    : {
        status: {loggedIn: false},
        account: "",
        app_domain: process.env.VUE_APP_URL,
        app_backend: process.env.VUE_APP_BACKEND_URL
    }

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('setLoginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('setLoginFailure');
                    return Promise.reject(error);
                }
            )
        },
        logout({commit}){
            return AuthService.logout().then(
                success => {
                    commit('setLogout');
                    return success;
                },
                error => {
                    return error;
                }
            )
        },
        register({commit}, user){
            return AuthService.register(user).then(
                response => {
                    commit('setRegisterSuccess');
                    return Promise.resolve(response.data)
                },
                error => {
                    commit('setRegisterFailure');
                    return Promise.reject(error);
                }
            )
        },
        updateAccount({commit}, user){
            return AuthService.updateAccount(user).then(
                response => {
                    commit('setCurrentAccount', response.data);
                    return Promise.resolve(response.data)
                },
                error => {
                    return Promise.reject(error);
                }
            )
        }
    },
    mutations: {
        setLoginSuccess(state, user) {
            state.status.loggedIn = true;
            state.account = user.account;
        },
        setLoginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        setLogout(state) {
            state.status.loggedIn = false;
            state.user = null
        },
        setRegisterSuccess(state) {
            state.status.registerSuccess = false
        },
        setRegisterFailure(state) {
            state.status.loggedIn = false
        },
        setCurrentAccount(state, user) {
            state.account = user;
        },
    },
    getters:{
        loggedIn: (state)=>{
            return state.status.loggedIn;
        },
        currAccount: (state) => {
            return state.account;
        },
        appUrl: (state) => {
            return state.app_domain;
        },
        backendUrl: (state) => {
            return state.app_backend;
        },
    }
}