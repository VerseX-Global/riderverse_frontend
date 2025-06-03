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
        Verification
      </h5>
    </div>

    <div class="convertCard">
      <div class="div">
        <div class="bill">
          <div class="form_area">
            <div class="auth">
              <form id="addAssetForm">
                <div class="limit">
                  <div class="input_wrap">
                    <div class="input row item-center no-wrap">
                      <i
                        style="font-size: 2rem"
                        class="ri-mail-line q-mr-sm"
                      ></i>
                      <input
                        disabled
                        v-model="store.userdetails.email"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
                <!-- <div
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
                      :loading="loading"
                      no-caps
                    >
                      Update
                    </q-btn>
                  </div>
                </div> -->
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

let data = ref({
  model: "",
  color: "",
  type_of_use: "",
  vehicle_type: "",
  vehicleLicence: null,
});

let model = ref(null);
const setFile = (props) => {
  profile_image.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    profile_imageValue.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const updateAccount = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    successModal.value = true;
  }, 1000);
};
const proceed = () => {
  setTimeout(() => {
    router.replace({ name: "pay" });
  }, 1000);
};
</script>

<style lang="scss" scoped></style>
