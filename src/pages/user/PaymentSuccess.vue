<template>
  <q-page class="q-pb-xl">
    <div class="row items-center justify-start">
      <q-btn
        size="20px"
        @click="router.go(-1)"
        flat
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
        Order Successful
      </h5>
    </div>
    <div
      v-if="loadingPage"
      style="height: 50vh"
      class="column justify-center items-center"
    >
      <q-spinner-tail size="6rem" color="blue-grey" />
    </div>
    <div v-else class="column items-center jusitify-center">
      <img
        style="width: 100px"
        class="q-mt-xl"
        src="/images/success.svg"
        alt=""
      />
      <p class="text-center q-mt-md">Your payment was successfully.</p>
      <!-- {{ orderData }} -->

      <h4 class="text-weight-bold q-my-lg text-center">Order Details</h4>
      <div class="row items-center q-pb-md justify-center">
        <img
          style="max-width: 250px"
          :src="orderData.package_image ? orderData.package_image : ''"
          alt=""
        />
      </div>
      <p>
        Package name:
        <span style="display: inline" class="text-weight-bold">
          {{ orderData.package_name }}
        </span>
      </p>
      <p>
        Recipients phone number:
        <span style="display: inline" class="text-weight-bold">{{
          orderData.phone_number
        }}</span>
      </p>
      <p>
        Pickup location:
        <span style="display: inline" class="text-weight-bold">{{
          orderData.pickup_location
        }}</span>
      </p>
      <p>
        Landmark:
        <span style="display: inline" class="text-weight-bold">{{
          orderData.landmark
        }}</span>
      </p>
      <p>
        Delivery location:
        <span style="display: inline" class="text-weight-bold">{{
          orderData.delivery_location
        }}</span>
      </p>
      <p>
        Delivery code:
        <span style="display: inline" class="text-weight-bold">{{
          orderData.delivery_code
        }}</span>
      </p>
      <div class="q-mt-md">
        <q-btn
          :to="{
            name: 'order-detail',
            query: {
              id: orderData.id ? orderData.id : 1,
            },
          }"
          color="green-7"
          no-caps
          no-wrap
        >
          Track order
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let router = useRouter();
let route = useRoute();
let loading = ref(false);
let loadingPage = ref(true);
let orderData = ref({});
const verifyPayment = () => {
  loading.value = true;
  api
    .get(
      `user/verify-delivery-payment?trxref=${route.query.trxref}&reference=${route.query.reference}`
    )
    .then((response) => {
      console.log(response);
      orderData.value = response.data.data;
      loadingPage.value = false;
    })
    .catch(({ response }) => {
      console.log(response);
      loading.value = false;
    });
};

onMounted(() => {
  verifyPayment();
});
</script>

<style lang="scss" scoped></style>
