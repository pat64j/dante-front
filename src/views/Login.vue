<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <v-col class="d-none d-md-block" md="5">
        <div class="bg-img-wrapper fill-height">
          <v-row no-gutters>
            <v-col col="12">
              <div class="top-logo-display">
                <img
                  style="margin: 0 !important"
                  :src="require('../assets/svg/church-logo.svg')"
                  class="my-3"
                  contain
                  height="150"
                  width="150"
                />
                <p class="login-logo">Praise</p>
                <v-divider dark></v-divider>
                <div class="lower-side">
                  <p class="first-lower">Alfi</p>
                  <p data-testid="second-lower" class="second-lower">
                    Lorem app
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col xs="12" md="7">
        <div class="fill-height d-flex align-center">
          <v-row no-gutters style="max-width: 700px; margin: 0 auto">
            <v-col col="12">
              <div class="login-form-wraper">
                <v-form
                  ref="login_form"
                  :lazy-validation="true"
                  @submit.prevent="handleLogin"
                >
                  <p class="text-center" style="font-size: 12px; color: red">
                    {{ message }}
                  </p>
                  <v-text-field
                    rounded
                    outlined
                    dense
                    v-model="user.email"
                    :rules="rules.email"
                    :append-icon="'mdi-email'"
                    label="Email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules.password"
                    :type="password_show ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 4 characters"
                    rounded
                    outlined
                    dense
                    @click:append="password_show = !password_show"
                  ></v-text-field>

                  <v-checkbox
                    dense
                    style="margin-top: 0"
                    v-model="remember_me"
                    label="Remember me"
                  ></v-checkbox>
                  <v-row>
                    <v-col col="5">
                      <v-btn
                        data-testid="login-button"
                        :disabled="loading"
                        @click="handleLogin"
                        rounded
                        color="primary"
                        class="mr-4 pr-10 pl-10"
                      >
                        Login
                        <v-icon right dark small>mdi-arrow-right</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col col="7" v-if="loading">
                      <v-progress-circular
                        :value="100"
                        :width="3"
                        color="blue-grey"
                        indeterminate
                      ></v-progress-circular>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", "", "", ""),
      loading: false,
      password_show: false,
      remember_me: false,
      message: "",
      rules: {
        email: [
          (v) => !!v || "Email is required",
          (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "E-mail must be valid",
        ],
        password: [(v) => (v && v.length >= 4) || "Min 4 characters"],
      },
    };
  },
  methods: {
    ...mapActions({ login: "auth/login" }),

    handleLogin() {
      this.loading = true;
      if (!this.$refs.login_form.validate()) {
        this.loading = false;
        return;
      }
      if (this.user.email && this.user.password) {
        let formData = new FormData();
        let rawData = JSON.stringify(this.user);
        formData.append("data", rawData);
        this.login(formData).then(
          () => {
            this.$router.push({ name: "settings_profile" });
          },
          () => {
            this.loading = false;
            this.message = "Account not found";
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-img-wrapper {
  background-image: url("~@/assets/images/tom-barrett.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;

  .top-logo-display {
    text-align: right;
    max-width: 400px;
    margin: 0 auto;
    .login-logo {
      line-height: 1;
      font-size: 40px;
      font-weight: 500;
      color: white;
      padding-right: 21px;
    }

    .lower-side {
      .first-lower {
        margin-top: 20px;
        margin-bottom: 0;
        line-height: 1;
        color: white;
        font-size: 20px;
        font-style: italic;
        font-weight: 100;
      }
      .second-lower {
        margin-bottom: 0;
        line-height: 1;
        color: white;
        font-size: 30px;
        font-weight: 500;
      }
    }
  }
}

.login-form-wraper {
  max-width: 350px;
}
</style>