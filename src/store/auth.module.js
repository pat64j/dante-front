import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? {status: {loggedIn: true}}
    : {status: {loggedIn: false}}

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
        }
    },
    mutations: {
        setLoginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
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
        }
    },
    getters:{
        loggedIn: (state)=>{
            return state.status.loggedIn;
        }
    }
}