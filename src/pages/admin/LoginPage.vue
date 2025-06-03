<template>
  <div class="admin_auth">
    <div class="form_area">
      <div class="auth">
        <div class="row justify-center">
          <img style="max-width: 150px" src="/images/rider.png" alt="" />
        </div>
        <p class="main_tex">Sign in to continue your journey</p>

        <form @submit.prevent="login">
          <div class="input_wrap">
            <label for=""> Email address</label>
            <div class="input">
              <input
                v-model="data.email"
                type="email"
                placeholder="marvellousdick@gmail.com"
              />
            </div>
          </div>
          <div class="input_wrap">
            <div class="row justify-between">
              <label for=""> Password</label>
            </div>

            <div class="input row items-center justify-between no-wrap">
              <input
                v-model="data.password"
                placeholder="Enter your password"
                :type="!togglePass ? 'password' : 'text'"
              />
              <q-btn
                @click="togglePass = !togglePass"
                flat
                :icon="togglePass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
              />
            </div>
            <!-- <div class="q-mt-sm">
              <q-checkbox v-model="data.remember" label="Remember Password" />
            </div> -->
          </div>

          <div class="submit row justify-center">
            <q-btn :loading="loading" type="submit" flat no-wrap no-caps>
              Sign In
            </q-btn>
          </div>
          <!-- <p>
            Don’t have an account?
            <router-link :to="{ name: 'register' }">
              Create Account
            </router-link>
          </p> -->
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

const login = () => {
  loading.value = true;
  api
    .post("auth/admin-login", data.value)
    .then((response) => {
      console.log(response);
      loading.value = false;
      store.setAdminDetails(response.data);

      Notify.create({
        message: `Welcome back`,
        color: "green",
        position: "top",
      });
      // store.typeOfPersonnel = "admin";
      router.replace({
        name: "admin.dashboard",
      });
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;

      if (response.data.errors) {
        errors.value = response.data.errors;
      }
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
</script>

<style lang="scss" scoped></style>
