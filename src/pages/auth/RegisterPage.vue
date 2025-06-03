<template>
  <div class="admin_auth">
    <div class="form_area">
      <div style="padding-top: 0" class="auth">
        <div class="row justify-center">
          <img style="max-width: 100px" src="/images/rider.png" alt="" />
        </div>
        <p class="">Create an account</p>
        <q-card-section style="max-height: 50vh" class="scroll">
          <form v-if="progress === 'signUp'" @submit.prevent="registerUser">
            <div class="input_wrap">
              <label for=""> Full name</label>
              <div class="input">
                <input
                  required
                  v-model="data.fullname"
                  type="text"
                  name="fullname"
                  placeholder="Enter name"
                />
              </div>
              <small v-if="errors.fullname" class="text-weight-bold text-red">
                {{ errors.fullname[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for=""> Username</label>
              <div class="input">
                <input
                  required
                  v-model="data.username"
                  type="text"
                  name="fullname"
                  placeholder="Enter name"
                />
              </div>
              <small v-if="errors.username" class="text-weight-bold text-red">
                {{ errors.username[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for=""> Email</label>
              <div class="input">
                <input
                  required
                  v-model="data.email"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
              </div>
              <small v-if="errors.email" class="text-weight-bold text-red">
                {{ errors.email[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for=""> Phone number</label>
              <div class="input">
                <input
                  required
                  v-model="data.phone_number"
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                />
              </div>
              <small
                v-if="errors.phone_number"
                class="text-weight-bold text-red"
              >
                {{ errors.phone_number[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <div class="row justify-between">
                <label for=""> Password</label>
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
                  :icon="
                    togglePass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                  "
                />
              </div>
              <small v-if="errors.password" class="text-weight-bold text-red">
                {{ errors.password[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <div class="row justify-between">
                <label for=""> Confirm Password</label>
              </div>

              <div class="input row items-center justify-between no-wrap">
                <input
                  required
                  v-model="password_confirmation"
                  placeholder="Enter your password"
                  :type="!toggleConfirmPass ? 'password' : 'text'"
                />
                <q-btn
                  size="10px"
                  @click="toggleConfirmPass = !toggleConfirmPass"
                  flat
                  :icon="
                    toggleConfirmPass
                      ? 'fa-solid fa-eye'
                      : 'fa-solid fa-eye-slash'
                  "
                />
              </div>
              <small
                v-if="errors.password_confirmation"
                class="text-weight-bold text-red"
              >
                {{ errors.password_confirmation[0] }}
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
                Sign up
              </q-btn>
            </div>
            <p>
              Already have an account?
              <router-link
                style="text-decoration: underline"
                class="text-black"
                :to="{ name: 'login' }"
              >
                Login
              </router-link>
            </p>
          </form>
        </q-card-section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { Notify } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { ref } from "vue";
let store = useMyAuthStore();
let router = useRouter();
let data = ref({});
let loading = ref(false);
let modelV = ref(null);
let errors = ref({});
let progress = ref("signUp");
let togglePass = ref(false);
let toggleConfirmPass = ref(false);
let password_confirmation = ref("");

function formatPhoneNumber(phoneNumber) {
  // Check if the phone number starts with a zero
  if (phoneNumber.startsWith("0")) {
    // Remove the leading zero and add the country code
    return "+234" + phoneNumber.slice(1);
  }

  // If the phone number doesn't start with a zero, return it as is
  return phoneNumber;
}

const registerUser = () => {
  if (password_confirmation.value !== data.value.password) {
    Notify.create({
      message: "Passwords does not match",
      color: "red",
      position: "top",
    });
  } else {
    data.value.phone_number = formatPhoneNumber(data.value.phone_number);
    // console.log(data.value);
    const formData = new FormData();
    for (var key in data.value) {
      formData.append(key, data.value[key]);
    }
    loading.value = true;
    api
      .post("auth/user-register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        Notify.create({
          message: response.data.message
            ? response.data.message
            : "Your registration was successful",
          color: "green",
          position: "top",
        });
        loading.value = false;
        data.value = {};
        modelV.value = null;
        store.setUserDetails(response.data);
        router.replace({ name: "dashboard" });
      })
      .catch(({ response }) => {
        console.log(response);
        loading.value = false;
        // errors.value = response.data.errors
        Notify.create({
          message: response.data.errors
            ? response.data.errors.map((error) => error.msg).toString()
            : response.data.message
            ? response.data.message
            : "Recheck your credentials",
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  }
};
const setFile = (props) => {
  data.value.profile_image = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    modelV.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
</script>

<style lang="scss" scoped></style>
