import MessageService from "../services/message.service"

export const message = {
    namespaced: true,
    state: {types:[], categories:[], messages:[]},
    actions: {
        fetchTypes({commit}){
            return MessageService.getMessageTypes().then(
                (res)=>{
                    commit('setTypes',res.data);
                    return Promise.resolve(res.data);
                },
                (err) => {return Promise.reject(err);}
            );
        },
        fetchCategories({commit}){
            return MessageService.getMessageCategories().then(
                (res) => {
                    commit('setMessageCategpries', res.data);
                    return Promise.resolve(res.data);
                },
                (err) => { return Promise.reject(err);}
            )
        },
        post({commit}, payload){
            return MessageService.postMessage(payload).then(
                (res) => {
                    commit('addMessage', res.data)
                    return Promise.resolve(res.data);
                },
                (err) => {return Promise.reject(err);}
            );
        },
        update({commit}, payload){
            return MessageService.updateMessage(payload).then(
                (res) => {
                    commit('updateMessage', [res.data.id, res.data]);
                    return Promise.resolve(res.data);
                },
                (err) => {return Promise.reject(err);}
            );
        },
        fetchMessages({commit}, payload){
            return MessageService.getMessages(payload).then(
                (res) => {
                    commit('setMessages', res.data);
                    return Promise.resolve(res.data);
                },
                (err)=> {return Promise.reject(err);}
            )
        }
    },
    mutations:{
        addMessage(state, message){
            state.messages.unshift(message);
        },
        setTypes(state, types){
            state.types = types;
        },
        setMessageCategpries(state, categories){
            state.categories = categories;
        },
        setMessages(state, payload){
            state.messages = payload;
        },
        updateMessage(state, payload){
            const index = state.messages.findIndex(el => el.id === payload[0]);
            state.messages.splice(index,1,payload[1])
        },
    },
    getters:{
        getTypes(state){
            return state.types;
        },
        getMessageCategories(state){
            return state.categories;
        },
        getMessages(state){
            return state.messages;
        }
    }
}