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
        <h5 class="text-h4 text-black text-center text-weight-bold">
          Forgot PIN
        </h5>
      </div>
      <div class="q-mx-md q-mt-lg">
        <div class="input_wrap">
          <label for=""> Old Pin</label>
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
              @on-change="handleOnChangeOldPin"
              @on-complete="handleOnCompleteOldPin"
            />
          </div>
        </div>
        <div class="input_wrap">
          <label for=""> OTP</label>
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
        <!-- <div class="input_wrap">
          <label for=""> OTP</label>
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
        </div> -->
        <div class="input_wrap q-mt-lg">
          <label for=""> New PIN</label>
          <div
            class="justify-start otp_wrap"
            style="display: flex; flex-direction: row; gap: 0.5rem"
          >
            <v-otp-input
              ref="otpInput"
              v-model:value="bindModal"
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
              no-wrap
              @click="submit"
              text-color="white"
            >
              Update
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog">
      <q-card style="border-radius: 10px" class="q-pa-lg">
        <p class="text-black">
          Note that this option should be used if you have forgotten your
          password or wish to reset it. If you proceed, an OtP will be sent to
          <span style="display: inline" class="text-blue text-weight-bold">
            08103020404
          </span>
        </p>

        <div
          style="gap: 2rem"
          class="q-mt-xl flex no-wrap justify-around items-center"
        >
          <q-btn
            style="border-radius: 10px"
            color="red-6"
            class="full-width"
            no-caps
            no-wrap
          >
            Cancel
          </q-btn>
          <q-btn
            style="border-radius: 10px"
            class="full-width"
            color="blue-7"
            no-wrap
            no-caps
            >Send OTP</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let routeData = useRoute();
let router = useRouter();
const bindModal = ref("");
let buyplanModal = ref(false);
let dialog = ref(false);
let loading = ref(false);
let code = ref("");
let pin = ref("");
let oldPin = ref("");
let confirmPin = ref("");

const handleOnCompletePin = (value) => {
  console.log("OTP completed: ", value);
  pin.value = value;
};
const handleOnCompleteOldPin = (value) => {
  console.log("OTP completed: ", value);
  oldPin.value = value;
};
const handleOnCompletePinConfirm = (value) => {
  console.log("OTP completed: ", value);
  confirmPin.value = value;
};

const handleOnChangePin = (value) => {
  console.log("OTP changed: ", value);
};
const handleOnChangeOldPin = (value) => {
  console.log("OTP changed: ", value);
};
const handleOnChangConfirmpin = (value) => {
  console.log("OTP changed: ", value);
};

const submit = () => {
  loading.value = true;
  api
    .post("auth/change-pin", {
      old_pin: oldPin.value,
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
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;

      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
</script>

<style lang="scss" scoped></style>
