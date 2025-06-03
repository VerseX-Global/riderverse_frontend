<template>
  <div class="convertPage">
    <div class="row items-center justify-start">
      <q-btn
        size="20px"
        @click="router.go(-1)"
        flat
        style="min-height: auto"
        class="listheader"
        no-caps
        no-wrap
      >
        <i class="fa-solid q-mr-sm fa-arrow-left"></i>
      </q-btn>
    </div>
    <div
      style="box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px"
      class="q-pb-md"
    >
      <h5 class="text-h4 text-black text-center text-weight-bold">
        Change Password
      </h5>
    </div>

    <div class="convertCard">
      <div class="div">
        <div class="bill">
          <div class="form_area">
            <div class="auth">
              <form id="addAssetForm" @submit.prevent="submit">
                <div class="limit">
                  <div class="input_wrap">
                    <div class="">
                      <label for=""> Change Password</label>
                    </div>

                    <div class="input row items-center justify-between no-wrap">
                      <input
                        required
                        v-model="data.old_password"
                        placeholder="Enter your password"
                        :type="!togglePass ? 'password' : 'text'"
                      />
                      <q-btn
                        @click="togglePass = !togglePass"
                        flat
                        size="10px"
                        :icon="
                          togglePass
                            ? 'fa-solid fa-eye'
                            : 'fa-solid fa-eye-slash'
                        "
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <div class="">
                      <label for=""> New Password</label>
                    </div>

                    <div class="input row items-center justify-between no-wrap">
                      <input
                        v-model="data.password"
                        required
                        placeholder="New Password"
                        :type="!togglePass ? 'password' : 'text'"
                      />
                      <q-btn
                        @click="togglePass = !togglePass"
                        flat
                        size="10px"
                        :icon="
                          togglePass
                            ? 'fa-solid fa-eye'
                            : 'fa-solid fa-eye-slash'
                        "
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <div class="">
                      <label for="">Confirm New Password</label>
                    </div>

                    <div class="input row items-center justify-between no-wrap">
                      <input
                        required
                        v-model="data.password_confirmation"
                        placeholder="Confirm New password"
                        :type="!togglePass ? 'password' : 'text'"
                      />
                      <q-btn
                        @click="togglePass = !togglePass"
                        flat
                        size="10px"
                        :icon="
                          togglePass
                            ? 'fa-solid fa-eye'
                            : 'fa-solid fa-eye-slash'
                        "
                      />
                    </div>
                  </div>
                </div>
                <div
                  style="position: sticky; bottom: 0%"
                  class="q-py-md q-px-sm bg-white"
                >
                  <div
                    style="gap: 1rem"
                    class="q-mt-sm q-mx-md row text-center no-wrap justify-center"
                  >
                    <q-btn
                      class="q-mt-sm full-width"
                      color="primary"
                      no-wrap
                      type="submit"
                      :loading="loading"
                      no-caps
                    >
                      Update
                    </q-btn>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="successModal">
      <q-card style="width: 350px" class="modal_card">
        <div class="column items-center jusitify-center">
          <img style="width: 100px" src="/images/success.svg" alt="" />
          <p class="text-center q-mt-md">
            You have successfully created an asset proceed to pay premium
          </p>

          <div class="q-mt-md">
            <q-btn @click="proceed" color="primary" no-caps no-wrap>
              Proceed
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let store = useMyAuthStore();
let routeData = useRoute();
let router = useRouter();
let successModal = ref(false);
let loading = ref(false);
let editState = ref(false);
let profile_imageValue = ref("");
let profile_image = ref(null);
let nextView = ref("next");
let vehicleLicensePreview = ref("");
let togglePass = ref(false);
let data = ref({});

let model = ref(null);

const submit = () => {
  if (data.value.password !== data.value.password_confirmation) {
    Notify.create({
      message: "Password does not match",
      color: "red",
      position: "top",
      actions: [{ icon: "close", color: "white" }],
    });
    return;
  }
  loading.value = true;
  api
    .put(
      store.typeOfPersonnel === "user"
        ? "user/change-password"
        : "vendor/change-password",
      {
        old_password: data.value,
        password: data.value,
        // password_confirmation: confirmPin.value,
      }
    )
    .then((response) => {
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
      console.log(response);
      loading.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;

      let errorMessage = Object.values(response.data.errors).flat().join(" ");
      Notify.create({
        message: errorMessage ? errorMessage : "Recheck your credentials",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
        timeout: 8000,
      });
    });
};
</script>

<style lang="scss" scoped></style>
