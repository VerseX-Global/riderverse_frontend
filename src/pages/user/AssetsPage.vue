<template>
  <div>
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
      <h5 class="text-h4 text-black text-center text-weight-bold">My Assets</h5>
    </div>

    <div
      v-if="loading"
      style="height: 50vh"
      class="column justify-center items-center"
    >
      <q-spinner-tail size="6rem" color="blue-grey" />
    </div>
    <div v-if="!loading">
      <q-banner
        style="border-radius: 10px"
        class="q-mx-md q-mt-lg q-py-lg"
        :class="$q.dark.isActive ? 'bg-green-2' : 'bg-green-1'"
      >
        <template v-slot:avatar>
          <q-btn
            size="7px"
            style="width: 30px; height: 30px"
            round
            color="primary"
          >
            <i style="font-size: 1.5rem" class="fa-solid fa-info"></i>
          </q-btn>
        </template>
        <div>
          <h5 class="text-h5 text-weight-bold">Select an asset</h5>
          <p style="line-height: 1.3" class="text-h6 text-weight-thin q-mt-sm">
            Select an asset to purchase on or create a new asset
          </p>
        </div>
      </q-banner>

      <div v-if="!assetsArr.length" class="convertPage limit">
        <div class="convertCard">
          <div class="q-mt-xl q-mx-md column text-center justify-center">
            <h4 class="text-h4">You have no assets</h4>
          </div>
        </div>
      </div>

      <div v-if="assetsArr.length" class="convertPage limit q-pt-lg">
        <div
          v-for="(assets, index) in assetsArr"
          :key="index"
          class="q-mt-sm shadow-1 q-pa-md"
        >
          <router-link
            :to="{
              name: 'pay',
              query: {
                company_id: routeData.query.company_id,
                plan: routeData.query.plan,
                asset: assets.id,
              },
            }"
          >
            <h5 class="text-h5 text-weight-bold">
              Plate Number:
              <small>{{ JSON.parse(assets.asset)?.plate_number }}</small>
            </h5>
            <h5 class="text-h5 text-weight-bold">
              Chassis Number:
              <small>{{ JSON.parse(assets.asset)?.chassis_number }}</small>
            </h5>
            <h5 class="text-h5 text-weight-bold">
              Manufacturer:
              <small>{{ JSON.parse(assets.asset)?.manufacturer }}</small>
            </h5>
            <h5 class="text-h5 text-weight-bold">
              Model:
              <small>{{ JSON.parse(assets.asset)?.model }}</small>
            </h5>
            <h5 class="text-h5 text-weight-bold">
              Type of Use:
              <small>{{ JSON.parse(assets.asset)?.type_of_use }}</small>
            </h5>
            <h5 class="text-h5 text-weight-bold">
              Value of Use:
              <small
                >NGN
                {{
                  JSON.parse(assets.asset)?.value_of_asset?.toLocaleString()
                }}</small
              >
            </h5>
          </router-link>
          <!-- <p
            style="line-height: 1.3"
            class="text-h6 text-weight-thin q-mt-sm"
          ></p> -->
        </div>
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          :to="{
            name: 'add.assets',
            query: {
              company_id: routeData.query.company_id,
              plan: routeData.query.plan,
            },
          }"
          fab
          icon="add"
          color="primary"
        />
      </q-page-sticky>
    </div>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

let routeData = useRoute();
let router = useRouter();
let buyplanModal = ref(false);
let loading = ref(true);
let data = ref({});
let assetsArr = ref([]);
let assets = ref({});

const getAssets = () => {
  api
    .get(`user/assets/all-asset?insurance_id=${routeData.query.company_id}`)
    .then((response) => {
      console.log(response);
      console.log(JSON.parse(response.data.data[0].asset));
      assetsArr.value = response.data.data;

      // assetsArr.value = JSON.parse(response.data.data);
      // data.value = planData;
      loading.value = false;
    })
    .catch(({ response }) => {
      console.log(response);
      assetsArr.value = [];
      loading.value = false;
      // loading.value = false;
    });
};

onMounted(() => {
  getAssets();
});
</script>

<style lang="scss" scoped></style>
