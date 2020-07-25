<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :color="'primary'"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :permanent="permanent"
        floating
        clipped
        app
        dark>
          <div class="d-block blue-grey darken-4" style="height:60px">
            <v-list-item two-line :class="miniVariant && 'px-0'" style="min-height:60px">
              <div class="d-flex" style="margin:0 auto">
                <v-list-item-avatar class="ma-0">
                  <img src="@/assets/svg/church-logo.svg">
                </v-list-item-avatar>

                <v-list-item-content class="pa-0">
                  <h1 style="font-size: 50px;font-weight: 400; line-height: 1;">Praise</h1>
                </v-list-item-content>
              </div>
            </v-list-item>
          </div>
          <v-list dense nav class="py-0" >
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
  </div>
</template>

<script>
export default {
    name: 'SideBarNav',
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        permanent: true,
        miniVariant: false,
        expandOnHover: false,
        background: false,
      }
    }

}
</script>

<style lang="scss">


</style>