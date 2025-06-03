<template>
  <div class="container q-py-xl">
    <div class="top div">
      <div v-if="!showDeliveryDetails">
        <form @submit.prevent="confirmDeliveryCode">
          <div class="q-mt-md">
            <p class="normalText thin text-black">
              <span class="text-weight-bold">Please enter delivery code</span>
              <input type="text" v-model="deliveryCode" />
            </p>
          </div>
          <div class="row justify-center q-mt-lg">
            <q-btn
              class="bg-secondary q-px-lg"
              text-color="white"
              flat
              type="submit"
              no-caps
              :loading="loading"
              no-wrap
              >Submit</q-btn
            >
          </div>
        </form>
      </div>
      <div v-else class="grid">
        <div class="left">
          <img :src="data.package_image" alt="" />
        </div>

        <div class="right text-black">
          <h5 class="paragraph text-center text-black">
            {{ data.package_name }}
          </h5>

          <div class="q-mt-md">
            <p class="normalText thin text-black">
              <span class="text-weight-bold">Phone Number:</span>
              <span>{{ data.phone_number }}</span>
            </p>
            <p class="normalText thin text-black">
              <span class="text-weight-bold">Pick-Up Location:</span>
              <span>{{ data.pickup_location }}</span>
            </p>
            <p class="normalText thin text-black">
              <span class="text-weight-bold">Delivery Location:</span>
              <span>{{ data.delivery_location }}</span>
            </p>
            <p class="normalText thin text-black">
              <span class="text-weight-bold">Landmark:</span>
              <span>{{ data.landmark }}</span>
            </p>
            <p class="normalText thin text-black">
              <span class="text-weight-bold">Estimated Price:</span>
              <span>NGN{{ data.estimated_delivery_price }}</span>
            </p>

            <div class="row justify-center q-mt-lg">
              <q-btn
                class="bg-green q-px-lg q-py-sm"
                text-color="white"
                flat
                @click="confirmDelivery"
                no-caps
                no-wrap
                >Confirm/Accept Delivery</q-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="ridersDetailsDialog"
    ><q-card class="modal_card">
      <div class="images row justify-center">
        <img
          style="width: 150px; height: 150px; object-fit: contain"
          :src="ridersDetails.profile_image"
          :alt="ridersDetails.fullname"
        />
      </div>
      <div class="text-center q-mt-lg">
        <p class="">Name: {{ ridersDetails.fullname }}</p>
        <p class="">Email: {{ ridersDetails.email }}</p>
        <p class="">
          Account Number: {{ ridersDetails?.bank_details[0].account_number }}
        </p>
        <p class="">
          Account Name: {{ ridersDetails?.bank_details[0].account_name }}
        </p>
        <p class="">
          Account Bank: {{ ridersDetails?.bank_details[0].bank_name }}
        </p>
        <p class="">
          Phone number:
          <a :href="`tel:+234${ridersDetails.phone_number}`">{{
            ridersDetails.phone_number
          }}</a>
        </p>
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="deliveredModal"
    ><q-card class="modal_card">
      <div class="images row justify-center">
        <i style="font-size: 3rem" class="fa-solid text-green fa-check"></i>
      </div>
      <div class="text-center q-mt-lg">
        <p class="">Delivery has been completed</p>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Dialog, Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
let deliveryCode = ref("");
let ridersDetailsDialog = ref(false);
let showDeliveryDetails = ref(false);
let deliveredModal = ref(false);
let loading = ref(false);
let ridersDetails = ref({});
let data = ref({});
let ratingData = ref({ star: 0 });
const confirmDeliveryCode = () => {
  Loading.show();
  const url = `delivery-detail?delivery_code=${deliveryCode.value}`;
  api
    .get(url)
    .then((response) => {
      console.log(response);
      Loading.hide();
      data.value = response.data.data;
      if (response.data.data.is_delivered) {
        deliveredModal.value = true;
      } else {
        showDeliveryDetails.value = true;
      }
    })
    .catch(({ response }) => {
      Loading.hide();
    });
};
const confirmDelivery = () => {
  Loading.show();
  const url = `confirm-delivery?delivery_code=${data.value.delivery_code}`;
  api
    .get(url)
    .then((response) => {
      console.log(response);
      Loading.hide();
      Dialog.create({
        title: "Delivery",
        message: `You have successfully confirmed your delivery.`,
        persistent: true,
      })
        .onOk(() => {
          ridersDetailsDialog.value = true;
          ridersDetails.value = response.data.data.rider;
        })
        .onCancel(() => {
          // console.log('I am triggered on both OK and Cancel')
          // signupData.value = {};
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    })
    .catch(({ response }) => {
      Loading.hide();
    });
};
const rateRider = () => {
  let ratingDataRider = {
    ...ratingData.value,
    rider_id: "",
  };
  Loading.show();
  const url = `user/rate`;
  api
    .post(url, ratingDataRider)
    .then((response) => {
      console.log(response);
      Loading.hide();
      Notify.create({
        message: response.data.message || "Rating successful",
        position: "top",
        color: "green-4",
      });
    })
    .catch(({ response }) => {
      Loading.hide();
    });
};

onMounted(async () => {
  try {
    // onRequest();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
}
.normalText {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  span {
    flex: 1;
  }
  input {
    flex: 1;
  }
}

input {
  width: 100%;
}
.normalText input {
  background: none;
}
</style>
