import Vue from 'vue';
import App from './App.vue';
import store from './store';
import {router} from './router';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone'
import VueVideoPlayer from "vue-video-player"


import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(VueMoment, {moment});
Vue.use(VueVideoPlayer,{})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
