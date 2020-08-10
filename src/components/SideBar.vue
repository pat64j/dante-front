<template>
  <v-navigation-drawer class="app-side-nav" app permanent dark width="220" :color="'primary'" :right="right" :expand-on-hover="false">
    <!-- -->

    <div class="d-block blue-grey darken-4" style="height:60px">
        <v-list-item two-line :class="miniVariant && 'px-0'" style="min-height:60px">
          <div class="d-flex">
            <v-list-item-avatar class="ma-0">
              <img src="@/assets/svg/church-logo.svg" />
            </v-list-item-avatar>

            <v-list-item-content class="pa-0">
              <h1 style="font-size: 50px;font-weight: 400; line-height: 1;">Praise</h1>
            </v-list-item-content>
          </div>
        </v-list-item>
    </div>

    <v-list class="inner-side-nav-list">
      <div v-for="(menu, i) in menuItems" :key="i">
        <v-list-item
          v-if="!menu.children"
          :to="menu.path"
          :active-class="color"
          tile
        >
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title v-text="menu.title" />
        </v-list-item>

        <v-list-group
          class="inner-group-list"
          :active-class="'white--text'"
          v-else
          :key="menu.title"
          no-action
          :value="expand_locations">
          <template v-slot:activator>
            <v-list-item-icon style="margin-right:10px !important;">
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </template>

          <v-list-item
            style="padding-left:50px"
            :active-class="'white--text'"
            v-for="sublink in menu.children"
            :to="menu.path + '/' + sublink.path"
            :key="sublink.meta.display_name">
            <v-list-item-icon style="margin-right:10px !important;">
              <v-icon>{{ sublink.meta.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ sublink.meta.display_name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBarNav",
  data() {
    return {
      color: "primary",
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      menuItems: [],
      expand_locations: true
    };
  },
  created() {
    this.$router.options.routes.forEach((route) => {
      if (route.meta.show_on_sidebar) {
        this.menuItems.push({
          title: route.meta.display_name,
          path: route.path,
          icon: route.meta.icon,
          active: route.meta.active ?? false,
          has_children: route.children ? true : false,
          children: route.children,
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.app-side-nav{
  .v-list-item .v-list-item__icon {
      margin-right: 10px !important;
  }

}
</style>