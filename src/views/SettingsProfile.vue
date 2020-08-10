<template>
  <v-row no-gutters>
    <v-col cols="4">
      <v-card class="pt-30 user-profile-card shallow-shadow" style="margin-left:20px;">
        <v-row no-gutters>
          <v-avatar class="mx-auto mt-6" size="200">
            <img
              height="100%"
              width="100%"
              :src="currAccount.avatar == 'default_avatar.jpg' ? require('../assets/images/default-avatar.png') : backendUrl+currAccount.avatar"
              alt="avatar"
            />
          </v-avatar>
        </v-row>
        <v-row no-gutters>
          <v-card-title class="mx-auto pb-0">{{currAccount.first_name}} {{currAccount.last_name}}</v-card-title>
        </v-row>
        <v-row no-gutters justify="center">
          <div
            class="subtitle-1 text-center text--disabled font-weight-thin"
          >{{currAccount.role.name.toUpperCase()}}</div>
        </v-row>

        <v-divider class="mx-4"></v-divider>

        <v-card-text>
          <small class="text-muted d-block">Email address</small>
          <p>{{currAccount.email}}m</p>
          <small class="text-muted d-block">Phone</small>
          <p>{{currAccount.email}}</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="8">
      <v-card :loading="loading" class="user-profile-form-card shallow-shadow" style="padding:0 20px; margin:0 20px;">
        <div class="login-form-wraper">
          <v-form style="padding:20px;" ref="login_form" :lazy-validation="true" @submit.prevent="requestAccountUpdate">
            <p class="text-center" style="font-size:12px; color:red;">{{message}}</p>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  rounded
                  outlined
                  dense
                  v-model="currAccount.first_name"
                  :rules="rules.first_name"
                  :append-icon="'mdi-account-box'"
                  label="First name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  rounded
                  outlined
                  dense
                  v-model="currAccount.last_name"
                  :rules="rules.last_name"
                  :append-icon="'mdi-account-box'"
                  label="First name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  rounded
                  outlined
                  dense
                  v-model="currAccount.email"
                  :rules="rules.email"
                  :append-icon="'mdi-email'"
                  label="Email"
                  readonly
                  disabled
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="currAccount.bday"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="currAccount.bday"
                      label="Date of birth"
                      append-icon="mdi-calendar"
                      readonly
                      rounded
                      dense
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="currAccount.bday" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(currAccount.bday)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="currAccount.password"
                  :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.password"
                  :type="password_show ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 4 characters"
                  rounded
                  readonly
                  disabled
                  outlined
                  dense
                  @click:append="password_show = !password_show"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="avatar"
                  color="primary"
                  counter
                  label="Upload avatar"
                  rounded
                  dense
                  accept="image/png, image/jpeg, image/bmp"
                  :rules="rules.avatar"
                  placeholder="Click to upload avatar"
                  prepend-icon
                  append-icon="mdi-camera"
                  outlined
                  :show-size="1000"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="deep-purple accent-4"
                      dark
                      label
                      small
                    >{{ text }}</v-chip>
                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >+{{ files.length - 2 }} File(s)</span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
            <v-row no-gutters justify="end">
              <v-btn
                  :disabled="loading"
                  @click="requestAccountUpdate"
                  rounded
                  right
                  color="primary"
                  class="mt-4 pr-10 pl-10"
                >
                  Save
                  <v-icon right dark small>mdi-arrow-right</v-icon>
                </v-btn>
            </v-row>
          </v-form>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      avatar: [],
      message: "",
      modal: false,
      password_show: false,
      loading: false,
      rules: {
        first_name: [(v) => !!v || "First name is required"],
        last_name: [(v) => !!v || "Last name is required"],
        email: [
          (v) => !!v || "Email is required",
          (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "E-mail must be valid",
        ],
        password: [(v) => (v && v.length >= 4) || "Min 4 characters"],
        avatar: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            "Avatar size should be less than 2 MB!",
        ],
      },
    };
  },
  created() {
    // console.log(process.env.VUE_APP_BACKEND_URL);
  },
  computed: {
    ...mapGetters({
      currAccount: "auth/currAccount",
      backendUrl: "auth/backendUrl",
    }),
  },
  methods: {
    ...mapActions({ updateAccount: "auth/updateAccount" }),
    requestAccountUpdate() {
      this.loading = true;
      let formData = new FormData();
      let rawData = JSON.stringify(this.currAccount);
      formData.append("file", this.avatar);
      formData.append("data", rawData);
      this.updateAccount(formData).then(
        () => {
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          console.log(err);
        }
      );
    },
  },
};
</script>

<style>
</style>