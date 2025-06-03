<template>
  <div>
    <div>
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
        <h5 class="text-h4 text-black text-center text-weight-bold">Set PIN</h5>
      </div>
      <div class="q-mx-md q-mt-lg">
        <div class="input_wrap">
          <label for=""> New PIN</label>
          <div
            class="justify-between otp_wrap"
            style="display: flex; flex-direction: row; gap: 0.5rem"
          >
            <v-otp-input
              ref="otpInput"
              v-model:value="bindModal"
              input-classes="otp-input"
              separator=" "
              :num-inputs="4"
              :should-auto-focus="true"
              input-type="number"
              :conditionalClass="['one', 'two', 'three', 'four']"
              :placeholder="['-', '-', '-', '-']"
              @on-change="handleOnChangePin"
              @on-complete="handleOnCompletePin"
            />
          </div>
        </div>
        <div class="input_wrap q-mt-lg">
          <label for=""> Confirm PIN</label>
          <div
            class="justify-start otp_wrap"
            style="display: flex; flex-direction: row; gap: 0.5rem"
          >
            <v-otp-input
              ref="otpInput"
              v-model:value="bindModalConfirm"
              input-classes="otp-input"
              separator=""
              :num-inputs="4"
              :should-auto-focus="true"
              input-type="number"
              :conditionalClass="['one', 'two', 'three', 'four']"
              :placeholder="['-', '-', '-', '-']"
              @on-change="handleOnChangConfirmpin"
              @on-complete="handleOnCompletePinConfirm"
            />
          </div>
        </div>
        <div class="q-mx-lg">
          <div class="q-mt-xl down_btn full-width row justify-center">
            <q-btn
              style="padding-bottom: 0; width: 90%"
              color="primary"
              no-caps
              @click="createPin"
              no-wrap
              text-color="white"
            >
              Update
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Loading, Notify, QSpinnerOval } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let routeData = useRoute();
let router = useRouter();
const bindModal = ref("");
const bindModalConfirm = ref("");
let buyplanModal = ref(false);
let loading = ref(false);
let code = ref("");
let pin = ref("");
let confirmPin = ref("");

const handleOnCompletePin = (value) => {
  console.log("OTP completed: ", value);
  pin.value = value;
};
const handleOnCompletePinConfirm = (value) => {
  console.log("OTP completed: ", value);
  confirmPin.value = value;
};

const handleOnChangePin = (value) => {
  console.log("OTP changed: ", value);
};
const handleOnChangConfirmpin = (value) => {
  console.log("OTP changed: ", value);
};

const createPin = () => {
  loading.value = true;
  Loading.show({
    spinner: QSpinnerOval,
    message: "Processing...",
  });
  api
    .post("auth/set-pin", {
      pin: pin.value,
      pin_confirmation: confirmPin.value,
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
      Loading.hide();
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      Loading.hide();
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
