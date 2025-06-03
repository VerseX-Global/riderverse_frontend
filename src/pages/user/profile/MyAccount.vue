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
        My Account
      </h5>
    </div>

    <div class="convertCard">
      <div class="div">
        <div class="bill">
          <div class="form_area">
            <div class="auth">
              <div
                class="column profile_image_upload q-my-md justify-center items-center"
              >
                <div
                  v-if="!profile_imageValue"
                  :class="editState ? 'styleEditStateImage' : ''"
                >
                  <img
                    style="
                      width: 120px;
                      height: 120px;
                      object-fit: cover;
                      border-radius: 50%;
                    "
                    :src="
                      store.userdetails.profile_image
                        ? store.userdetails.profile_image
                        : '/images/image.png'
                    "
                    alt=""
                  />
                </div>
                <div v-else :class="editState ? 'styleEditStateImage' : ''">
                  <img
                    style="
                      width: 120px;
                      height: 120px;
                      border-radius: 50%;
                      object-fit: cover;
                    "
                    :src="profile_imageValue"
                  />
                </div>
                <i
                  v-if="editState"
                  class="fa-solid q-ml-sm fa-pen-to-square"
                ></i>
                <q-file
                  v-if="editState"
                  @update:model-value="setFile"
                  accept=".jpg,.png,.svg,.jpeg"
                  class="authUpload q-mt-sm"
                  v-model="profile_image"
                />
              </div>

              <div class="row justify-center">
                <q-btn
                  @click="editState = !editState"
                  flat
                  style="border-bottom: 1px solid black"
                  no-wrap
                  no-caps
                >
                  {{ editState ? "Cancel" : "Edit" }}
                  <i
                    v-if="!editState"
                    class="fa-solid q-ml-sm fa-pen-to-square"
                  ></i>
                </q-btn>
              </div>
              <form id="addAssetForm" @submit.prevent="submit">
                <div class="limit">
                  <div class="input_wrap">
                    <div class="input row item-center no-wrap">
                      <i
                        style="font-size: 2rem"
                        class="ri-user-line q-mr-sm"
                      ></i>
                      <input
                        v-model="data.fullname"
                        type="text"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  <div class="input_wrap">
                    <div class="input row item-center no-wrap">
                      <i
                        style="font-size: 2rem"
                        class="ri-mail-line q-mr-sm"
                      ></i>
                      <input
                        v-model="data.email"
                        type="email"
                        disabled
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <div class="input row item-center no-wrap">
                      <i
                        style="font-size: 2rem"
                        class="ri-smartphone-line q-mr-sm"
                      ></i>
                      <input
                        v-model="data.phone_number"
                        type="tel"
                        placeholder="Phone number"
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
                      v-if="editState"
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
import { Loading, Notify, QSpinnerOval } from "quasar";
import { api } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
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

let data = ref({});

let model = ref(null);
const setFile = (props) => {
  profile_image.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    profile_imageValue.value = e.target.result;
  };
  reader.readAsDataURL(props);
  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading profile image...",
  });
  api
    .put(
      store.typeOfPersonnel === "user"
        ? `user/change-profile-image`
        : `vendor/change-profile-image`,
      {
        profile_image: profile_image.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log(response);
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      editState.value = false;
      getProfile();

      Loading.hide();
    })
    .catch(({ response }) => {
      // console.log(response);
      Loading.hide();
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const getProfile = () => {
  loading.value = true;
  api
    .get(store.typeOfPersonnel === "user" ? `user/profile` : `vendor/profile`)
    .then((response) => {
      console.log(response);
      store.userdetails = response.data.data;
      loading.value = false;
    })
    .catch(({ response }) => {
      console.log(response);
      loading.value = false;
    });
};

const submit = () => {
  loading.value = true;
  api
    .put(
      store.typeOfPersonnel === "user"
        ? "user/update-profile"
        : "vendor/update-profile",
      data.value
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
      successModal.value = true;
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

onMounted(() => {
  data.value = {
    fullname: store.userdetails.fullname,
    email: store.userdetails.email,
    phone_number: store.userdetails.phone_number,
  };
});
</script>

<style lang="scss" scoped></style>
