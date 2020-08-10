<template>
  <div style="margin:20px" v-if="loggedIn">
    <v-row>
      <v-col cols="6">
        <div>
          <v-card :elevation="5" height="40" width="40" class="primary d-inline-block">
            <v-row class="fill-height" align="center" justify="center">
              <v-icon large color="white">mdi-arrow-up-bold-box-outline</v-icon>
            </v-row>
          </v-card>
          <div class="ml-4 view-detail d-inline-block">
            <h5>{{$route.meta.display_name}}</h5>
            <p class="ma-0">{{$route.meta.display_description}}</p>
          </div>
        </div>
      </v-col>
      <v-col cols="6">
        <v-breadcrumbs style="width:fit-content; float:right;" :items="currentBreadcrumb">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="'/'+item.href" :disabled="item.disabled">
              {{item.text}}
            </v-breadcrumbs-item>

          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppViewDescription",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ loggedIn: "auth/loggedIn" }),
    currentBreadcrumb() {
      let bcs = [];
      if (this.loggedIn && this.$route.meta.breadcrumbs) {
        this.$route.meta.breadcrumbs.forEach((breadcrumb, index, arr) => {
          if (index === arr.length - 1) {
            bcs.push({
              text: breadcrumb.name,
              disabled: true,
              href: "",
            });
          } else {
            bcs.push({
              text: breadcrumb.name,
              disabled: false,
              href: breadcrumb.link,
            });
          }
        });
      }
      return bcs;
    },
  },
  created() {
    // console.log(this.currentBreadcrumb);
  },
};
</script>

<style>
</style>