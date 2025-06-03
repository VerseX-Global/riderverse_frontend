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
        Pay Premium
      </h5>
    </div>

    <div
      v-if="loading"
      style="height: 50vh"
      class="column justify-center items-center"
    >
      <q-spinner-tail size="6rem" color="blue-grey" />
    </div>

    <div v-if="!loading" class="convertCard limit">
      <div class="div">
        <div class="bill">
          <div class="q-mt-md">
            <div class="text-black">
              <q-item
                clickable
                class="bene_list row items-center justify-between"
              >
                <div
                  style="gap: 2rem"
                  class="row full-width q-py-sm items-center no-wrap"
                >
                  <img
                    :src="
                      companyData.logo ? companyData.logo : '/images/wella.jpeg'
                    "
                    alt=""
                  />
                  <div>
                    <h6
                      class="bene_name text-h5 text-grey-7 text-weight-bold q-mb-xs"
                    >
                      {{ companyData.company_name }}
                    </h6>

                    <p class="text-grey-7 text-subtitle1">Product</p>
                    <h6 class="text-h6 text-weight-bold">
                      {{ data.plan_name }}
                    </h6>

                    <div class="q-mt-xs">
                      <p class="text-grey-7 text-subtitle1">
                        {{ companyData.type }}
                      </p>
                      <h6 class="text-h6 text-weight-bold">
                        NGN {{ data.amount.toLocaleString() }}
                      </h6>
                    </div>
                  </div>
                </div>

                <div class="q-mt-sm">
                  <p class="text-grey-7 text-subtitle1">Duration</p>
                  <h6 class="text-h6 text-weight-bold">
                    {{ data.duration }}
                  </h6>
                </div>
              </q-item>
            </div>

            <div class="text-black">
              <q-item
                clickable
                class="bene_list row items-center justify-between"
              >
                <div style="gap: 2rem" class="full-width q-py-sm i">
                  <p class="text-h6">Order Details</p>
                  <div class="row justify-between items-center">
                    <p class="text-h6">Premium Value:</p>
                    <p class="text-h6">
                      NGN {{ data.amount.toLocaleString() }}
                    </p>
                  </div>
                </div>
              </q-item>
            </div>
          </div>

          <div
            style="
              position: absolute;
              bottom: 20%;
              width: 100%;
              left: 50%;
              transform: translateX(-50%);
            "
            class=""
          >
            <div class="q-mt-xl q-mx-md column text-center justify-center">
              <q-btn
                @click="buyplanModal = !buyplanModal"
                class="q-mt-sm"
                color="primary"
                no-wrap
                no-caps
              >
                Proceed to buy
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="buyplanModal" position="bottom">
      <q-card style="width: 350px" class="modal_card">
        <div style="gap: 1rem" class="row items-center justify-center no-wrap">
          <h6 class="text-h5 text-weight-bold">Enter Pin</h6>
        </div>

        <div class="auth q-mt-md">
          <div
            class="justify-center otp_wrap"
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
              :placeholder="['', '', '', '']"
              @on-change="handleOnChange"
              @on-complete="handleOnComplete"
            />
          </div>
        </div>
        <div class="line"></div>
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
const bindModal = ref("");
let buyplanModal = ref(false);
let loading = ref(true);
let code = ref("");
let companyData = ref({});
let errors = ref({});
let data = ref({});

const handleOnComplete = (value) => {
  console.log("OTP completed: ", value);
  code.value = value;
  payPremium(value);
};
const handleOnCompleteEmailCode = (value) => {
  console.log("OTP completed: ", value);
  code.value = value;
};

const handleOnChange = (value) => {
  console.log("OTP changed: ", value);
};
const getInsuranceCompany = () => {
  api
    .get(`user/insurance/single-insurance?id=${routeData.query.company_id}`)
    .then((response) => {
      console.log(response);
      companyData.value = response.data.data;
      let planData = JSON.parse(response.data.data.plans).find(
        (plan) => plan.plan_name === routeData.query.plan
      );
      console.log(planData);
      data.value = planData;
      loading.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      // loading.value = false;
    });
};
const verifyPayment = (ref) => {
  console.log(ref);
  // api
  //   .get(`user/payment/verify-payment`)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch(({ response }) => {
  //     // console.log(response);
  //     // loading.value = false;
  //   });
  router.replace({
    name: "pay.success",
  });
};
const payPremium = (pin) => {
  // Loading.show({
  //   spinner: QSpinnerOval,
  //   message: "Processing...",
  // });
  // console.log(store.userdetails.email);
  // console.log(data.value.amount * 100);
  const handler = PaystackPop.setup({
    key: "pk_test_e31785252477a9abab2ee82142498c614bee3910", // Replace with your Paystack public key
    email: store.userdetails.email,
    amount: data.value.amount * 100, // Paystack amount is in kobo
    currency: "NGN",
    callback: function (response) {
      console.log(response);
      verifyPayment(response.reference);
    },
    onClose: function () {
      Loading.hide();
      Notify.create({
        type: "negative",
        position: "top",
        message: "Transaction was not completed.",
      });
    },
  });
  handler.openIframe();
  // api
  //   .post("user/payment/initalize-payment")
  //   .then((response) => {
  //     console.log(response);
  //     Loading.hide();
  //     Notify.create({
  //       message: response.data.message,
  //       color: "green",
  //       position: "top",
  //       actions: [{ icon: "close", color: "white" }],
  //       timeout: 8489392,
  //     });
  //   })
  //   .catch(({ response }) => {
  //     // console.log(response);
  //     Loading.hide();

  //     if (response.data.errors) {
  //       errors.value = response.data.errors;
  //     }
  //     let errorMessage = response?.data?.errors
  //       .map((error) => error.msg)
  //       .join(", ");
  //     Notify.create({
  //       message: errorMessage ? errorMessage : "Recheck your credentials",
  //       color: "red",
  //       position: "top",
  //       actions: [{ icon: "close", color: "white" }],
  //       timeout: 8489392,
  //     });
  //   });
};

onMounted(() => {
  getInsuranceCompany();
});
</script>

<style lang="scss" scoped></style>
