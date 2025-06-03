<template>
  <div class="admin_auth">
    <div class="form_area">
      <div class="auth">
        <div class="row justify-center">
          <img style="max-width: 80px" src="/images/logo.png" alt="" />
        </div>
        <h4 class="text-h3 text-center">Sign in</h4>

        <form @submit.prevent="login">
          <div class="input_wrap">
            <label for=""> Email address</label>
            <div class="input">
              <input
                required
                type="email"
                name="email"
                v-model="data.email"
                placeholder="email@gmail.com"
              />
            </div>
            <small v-if="errors.email" class="text-weight-bold text-red">
              {{ errors.email[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for=""> User type</label>
            <div class="input">
              <select v-model="user">
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
          </div>
          <div class="input_wrap">
            <div class="row justify-between">
              <label for=""> Password</label>
              <router-link to="">Forgot Password?</router-link>
            </div>

            <div class="input row items-center justify-between no-wrap">
              <input
                required
                v-model="data.password"
                placeholder="Enter your password"
                :type="!togglePass ? 'password' : 'text'"
              />
              <q-btn
                size="10px"
                @click="togglePass = !togglePass"
                flat
                :icon="togglePass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
              />
            </div>
            <small v-if="errors.password" class="text-weight-bold text-red">
              {{ errors.password[0] }}
            </small>
          </div>

          <div class="submit q-pt-lg row justify-center">
            <q-btn
              class="bg-secondary"
              :loading="loading"
              type="submit"
              flat
              no-wrap
              no-caps
            >
              Sign In
            </q-btn>
          </div>
          <p>
            Don’t have an account?
            <router-link
              style="text-decoration: underline"
              class="text-black"
              :to="{ name: 'register' }"
            >
              Create Account
            </router-link>
            <router-link
              style="text-decoration: underline"
              class="text-black"
              :to="{ name: 'vendor.register' }"
            >
              Create Vendor Account
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
let store = useMyAuthStore();
import { Notify } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { ref } from "vue";
let router = useRouter();
let data = ref({});
let loading = ref(false);
let togglePass = ref(false);

let errors = ref({});
let user = ref("");

const login = () => {
  if (user.value === "") {
    Notify.create({
      message: `Please select a valid user type`,
      color: "red",
      position: "top",
    });
  } else {
    if (user.value === "user") {
      loading.value = true;
      api
        .post("auth/user-login", data.value)
        .then((response) => {
          loading.value = false;
          store.setUserDetails(response.data);
          store.typeOfPersonnel = user.value;
          Notify.create({
            message: `Welcome back`,
            color: "green",
            position: "top",
          });
          router.replace({
            name: "dashboard",
          });
        })
        .catch(({ response }) => {
          loading.value = false;

          if (response.data.errors) {
            errors.value = response.data.errors;
          }
          Notify.create({
            message: response.data.message,
            color: "red",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    } else {
      loading.value = true;
      api
        .post("auth/vendor-login", data.value)
        .then((response) => {
          loading.value = false;
          console.log(response);
          store.setUserDetails(response.data);
          store.typeOfPersonnel = user.value;
          Notify.create({
            message: `Welcome back`,
            color: "green",
            position: "top",
          });
          router.replace({
            name: "dashboard",
          });
        })
        .catch(({ response }) => {
          loading.value = false;

          if (response.data.errors) {
            errors.value = response.data.errors;
          }
          Notify.create({
            message: response.data.message,
            color: "red",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
