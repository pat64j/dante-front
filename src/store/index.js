import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { category } from './category.module'
import { message } from './message.module'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        category,
        message
    }
});