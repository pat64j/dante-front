<template>
  <v-app-bar
    :hide-on-scroll="false"
    app
    class="app-top-bar"
    color="white"
    dense
    light
    clipped-right
    height="60"
    :elevation="'8'"
  >
    <v-toolbar-title>Page title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu offset-y transition="slide-x-transition" content-class="my-account-menu">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar style="margin-right:10px;" size="30" color="red" v-bind="attrs" v-on="on">
          <img v-if="currAccount.avatar != 'default_avatar.jpg'" :src="backendUrl+currAccount.avatar" alt="user avatar" />
          <span v-else class="white--text headline">
            <small>{{currAccount.first_name.charAt(0).toUpperCase()}}{{currAccount.last_name.charAt(0).toUpperCase()}}</small>
          </span>
        </v-avatar>
      </template>
      <ul class="user-menu-item-list">
        <li>
          <a href="#" @click.prevent="goToProfile">
            <v-icon left>mdi-account-circle-outline</v-icon>Profile
          </a>
        </li>
        <li>
          <a href="#">
            <v-icon left>mdi-account-circle-outline</v-icon>Two
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="handleLogout">
            <v-icon left>mdi-power-standby</v-icon>Logout
          </a>
        </li>
      </ul>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppTopBar",
  data: () => ({}),
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout").then(
        () => this.$router.push("/"),
        () => this.$router.push("/")
      );
    },
    goToProfile(){
      this.$router.push("/settings/profile")
    }
  },
  computed: {
    ...mapGetters({
      currAccount: "auth/currAccount",
      backendUrl: "auth/backendUrl",
    }),
  },
};
</script>

<style lang="scss" scoped>
.v-menu__content,
.app-top-bar {
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04) !important;
}
.my-account-menu {
  margin-top: 25px;
  contain: initial;
  overflow: visible;
  border-radius: 10px;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 20px;
    transform: translateY(-100%);
    width: 10px;
    height: 13px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
}
.user-menu-item-list {
  list-style: none;
  padding: 0;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
  li {
    padding: 0;
    border-radius: 10px;
    a {
      display: block;
      border-radius: 5px;
      text-decoration: none;
      padding: 4px 15px;
      color: #212121;
      font-size: 12px;
      &:hover {
        background-color: #dee2e6 !important;
        color: #212121;
      }
    }
  }
}
</style>