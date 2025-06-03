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
        My Profile
      </h5>
    </div>

    <div class="row justify-end">
      <q-btn
        @click="editState = !editState"
        flat
        style="border-bottom: 1px solid black"
        no-wrap
        no-caps
      >
        {{ editState ? "Cancel" : "Edit" }}
        <i v-if="!editState" class="fa-solid q-ml-sm fa-pen-to-square"></i>
      </q-btn>
    </div>
    <div class="convertCard">
      <div class="div">
        <div class="bill">
          <div class="form_area">
            <div class="auth">
              <form @submit.prevent="submit" id="addAssetForm">
                <div class="limit">
                  <div class="input_wrap">
                    <label for=""> Address</label>
                    <div class="input row item-center no-wrap">
                      <i
                        style="font-size: 2rem"
                        class="ri-pin-distance-line q-mr-sm"
                      ></i>
                      <input
                        v-model="data.address"
                        type="text"
                        :disabled="!editState"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <label for=""> Nearest Landmark</label>
                    <div class="input row item-center no-wrap">
                      <i
                        style="font-size: 2rem"
                        class="ri-government-line q-mr-sm"
                      ></i>
                      <input
                        v-model="data.nearest_landmark"
                        type="text"
                        :disabled="!editState"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <label for=""> City</label>
                    <div class="input row item-center no-wrap">
                      <i
                        style="font-size: 2rem"
                        class="ri-hotel-line q-mr-sm"
                      ></i>
                      <input
                        :disabled="!editState"
                        v-model="data.city"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <label for=""> State</label>
                    <div class="input field">
                      <q-select
                        v-model="data.state"
                        use-input
                        :disable="!editState"
                        input-debounce="0"
                        label="Select"
                        :options="stateArr"
                        @filter="filterFnState"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="input_wrap">
                    <label for=""> LGA</label>
                    <div class="input field">
                      <q-select
                        v-model="data.lga"
                        use-input
                        :disable="!editState"
                        input-debounce="0"
                        label="Select"
                        :options="stateArr"
                        @filter="filterFnState"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>

                  <div class="input_wrap">
                    <label for=""> Gender</label>
                    <div class="input field">
                      <q-select
                        v-model="data.gender"
                        use-input
                        :disable="!editState"
                        input-debounce="0"
                        label="Select"
                        :options="genderArr"
                        @filter="filterFnGender"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="input_wrap">
                    <label for=""> Marital Status</label>
                    <div class="input field">
                      <q-select
                        v-model="data.martial_status"
                        use-input
                        :disable="!editState"
                        input-debounce="0"
                        label="Select"
                        :options="maritalStatusArr"
                        @filter="filterFnMaritalStatus"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                </div>

                <div
                  style="position: sticky; bottom: 0%"
                  class="q-py-md q-px-sm bg-white"
                >
                  <div
                    style="gap: 1rem"
                    class="q-mt-sm q-mx-md row text-center no-wrap justify-between"
                  >
                    <q-btn
                      class="q-mt-sm full-width"
                      color="primary"
                      no-wrap
                      type="submit"
                      v-if="editState"
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
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let store = useMyAuthStore();
let routeData = useRoute();
let router = useRouter();
let successModal = ref(false);
let loading = ref(false);
let editState = ref(false);
let nextView = ref("next");
let vehicleLicensePreview = ref("");

let data = ref({});

let model = ref(null);

const stateOptions = ["Anambra", "FCT", "Enugu", "Delta", "Kogi"];
const genderArr = ref([]);
const genderOptions = ["Male", "Female"];
const maritalStatusArr = ref([]);
const maritalStatusOptions = ["Single", "Married"];
const stateArr = ref([]);

const filterFnState = (val, update, abort) => {
  if (val === "") {
    update(() => {
      stateArr.value = stateOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    stateArr.value = stateOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
const filterFnGender = (val, update, abort) => {
  if (val === "") {
    update(() => {
      genderArr.value = genderOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    genderArr.value = genderOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
const filterFnMaritalStatus = (val, update, abort) => {
  if (val === "") {
    update(() => {
      maritalStatusArr.value = maritalStatusOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    maritalStatusArr.value = maritalStatusOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const submit = () => {
  loading.value = true;
  api
    .post("auth/update-profile-info", {
      ...data.value,
      marital_status: data.value.martial_status,
    })
    .then((response) => {
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });

      console.log(response);
      loading.value = false;
      getProfile();
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
const getProfile = () => {
  loading.value = true;
  api
    .get(`user/profile`)
    .then((response) => {
      console.log(response);
      store.userdetails = response.data.data;
      loading.value = false;
    })
    .catch(({ response }) => {
      console.log(response);
      assetsArr.value = [];
      loading.value = false;
    });
};
onMounted(() => {
  data.value = {
    address: store.userdetails.address ? store.userdetails.address : "",
    nearest_landmark: store.userdetails.nearest_landmark
      ? store.userdetails.nearest_landmark
      : "",
    city: store.userdetails.city ? store.userdetails.city : "",
    state: store.userdetails.state ? store.userdetails.state : "",
    lga: store.userdetails.lga ? store.userdetails.lga : "",
    gender: store.userdetails.gender ? store.userdetails.gender : "",
    martial_status: store.userdetails.marital_status
      ? store.userdetails.marital_status
      : "",
  };
});
</script>

<style lang="scss" scoped></style>
