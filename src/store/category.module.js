import CategoryService from "../services/category.service"


export const category = {
    namespaced: true,
    state: {category: {}, categories:[]},
    actions: {
        create({commit}, category) {
            return CategoryService.create(category).then(
                res => {
                    commit('addCategoryToList', res.data)
                    return Promise.resolve(res.data)
                },
                err => { return Promise.reject(err)}
            );
        },
        get({commit}, page){
            return CategoryService.get(page).then(
                res => {
                    commit('setCategories', res.data)
                    return Promise.resolve({"data":res.data, "links": res.pagination});
                },
                err => {return Promise.reject(err)}
            )
        },
        edit({commit},payload){
            return CategoryService.put(payload[0], payload[1]).then(
                res => {
                    commit('updateCategory', [res.data.id, res.data]);
                    return Promise.resolve(res.data);
                },
                err => {return Promise.reject(err)}
            )
        }
    },
    mutations: {
        addCategoryToList(state, category){
            state.categories.unshift(category)
        },
        setCategories(state, categories){
            state.categories = categories
        },
        updateCategory(state, payload){
            const index = state.categories.findIndex(el => el.id === payload[0]);
            state.categories.splice(index,1,payload[1]);
        }
    },
    getters: {
        getCategories: (state)=>{
            return state.categories;
        }
    },
}