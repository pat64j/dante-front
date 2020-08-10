<template>
  <v-app>
    <app-top-bar v-if="loggedIn"></app-top-bar>
    <side-bar-nav v-if="loggedIn"></side-bar-nav>
    <v-main class="fill-height" style="background-color: #F6F7FB !important;">
      <app-view-description></app-view-description>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import SideBarNav from './components/SideBar';
import AppTopBar from './components/AppTopBar';
import AppViewDescription from './components/ViewDescription'
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    SideBarNav,
    AppTopBar,
    AppViewDescription
  },
  computed: {
    ...mapGetters({loggedIn: 'auth/loggedIn'}),
  },

  data: () => ({
    //
  }),
};
</script>
