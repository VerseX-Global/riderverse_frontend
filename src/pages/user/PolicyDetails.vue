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
        Policy Details
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
                @click="buyplanModal = !buyplanModal"
                class="bene_list row items-center justify-between"
              >
                <div
                  style="gap: 2rem"
                  class="row full-width q-py-sm items-center no-wrap"
                >
                  <img
                    :src="
                      companyName.logo ? companyName.logo : '/images/wella.jpeg'
                    "
                    alt=""
                  />
                  <div>
                    <h6
                      class="bene_name text-h5 text-grey-7 text-weight-bold q-mb-xs"
                    >
                      {{ companyName.company_name }}
                    </h6>

                    <p class="text-grey-7 text-subtitle1">Product</p>
                    <h6 class="text-h6 text-weight-bold">
                      {{ data.plan_name }}
                    </h6>

                    <div class="q-mt-xs">
                      <p class="text-grey-7 text-subtitle1">
                        {{ companyName.type }}
                      </p>
                      <h6 class="text-h6 text-weight-bold">
                        NGN{{ data.amount }}
                      </h6>
                    </div>
                  </div>
                </div>

                <div class="q-mt-sm">
                  <p class="text-grey-7 text-subtitle1">Duration</p>
                  <h6 class="text-h6 text-weight-bold">{{ data.duration }}</h6>
                </div>
              </q-item>
            </div>

            <div class="text-black">
              <q-item
                clickable
                class="bene_list row items-center justify-between"
              >
                <div style="gap: 2rem" class="full-width q-py-sm i">
                  <p class="text-h6">What's covered?</p>
                  <p class="text-h6">
                    {{ data.covers }}
                  </p>
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
          <h6 class="text-h5 text-weight-bold">Who is this insurance for?</h6>
        </div>

        <div
          style="grid-template-columns: 1fr"
          class="grid justify-center items-center q-px-xl"
        >
          <router-link
            :to="{
              name: 'assets',
              query: {
                company_id: routeData.query.company_id,
                plan: routeData.query.plan_id,
              },
            }"
          >
            <div class="card_div">
              <i class="ri-user-line"></i>
              <p>Me</p>
            </div>
          </router-link>
          <!-- <router-link to="">
            <div class="card_div">
              <i class="ri-group-line"></i>
              <p>Someone Else</p>
            </div>
          </router-link> -->
        </div>

        <div class="line"></div>
      </q-card>
    </q-dialog>
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
let companyName = ref({});

const getInsuranceCompany = () => {
  api
    .get(`user/insurance/single-insurance?id=${routeData.query.company_id}`)
    .then((response) => {
      console.log(response);
      companyName.value = response.data.data;
      let planData = JSON.parse(response.data.data.plans).find(
        (plan) => plan.plan_name === routeData.query.plan_id
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

onMounted(() => {
  getInsuranceCompany();
});
</script>

<style lang="scss" scoped></style>
