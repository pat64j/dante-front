<template>
  <v-app>
    <side-bar-nav v-if="loggedIn"></side-bar-nav>
    <v-main style="background-color: #F6F7FB !important;">
      <app-top-bar v-if="loggedIn"></app-top-bar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import SideBarNav from './components/SideBar';
import AppTopBar from './components/AppTopBar';
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    SideBarNav,
    AppTopBar
  },
  computed: {
    ...mapGetters({loggedIn: 'auth/loggedIn'}),
  },

  data: () => ({
    //
  }),
};
</script>
