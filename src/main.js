import Vue from 'vue';
import App from './App.vue';
import store from './store';
import {router} from './router';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone'


import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(VueMoment, {moment});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
