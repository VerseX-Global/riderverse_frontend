<template>
  <div v-if="!showDeliveryDetails">
    <div class="admin_auth">
      <div class="form_area">
        <div class="auth">
          <div class="row justify-center">
            <img style="max-width: 80px" src="/images/logo.png" alt="" />
          </div>
          <form @submit.prevent="confirmDeliveryCode">
            <div class="input_wrap">
              <span class="text-weight-bold">Please enter delivery code</span>
              <div class="input">
                <input
                  required
                  type="text"
                  name="deliveryCode"
                  v-model="deliveryCode"
                  placeholder="123456"
                />
              </div>
              <small v-if="errors.deliveryCode" class="text-weight-bold text-red">
                {{ errors.deliveryCode[0] }}
              </small>
            </div>

            <div class="submit q-pt-lg row justify-center">
              <q-btn
                class="bg-secondary"
                :loading="loading"
                type="submit"
                flat
                no-wrap
                no-caps
              >
                Submit
              </q-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="grid container q-py-xl">
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
            >Confirm Delivery</q-btn
          >
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="vendorsDetailsDialog"
    ><q-card class="modal_card">
      <div class="images row justify-center">
        <img
          style="width: 150px; height: 150px; object-fit: contain"
          :src="vendorsDetails.profile_image"
          :alt="vendorsDetails.fullname"
        />
      </div>
      <div class="text-center q-mt-lg">
        <p class="">Name: {{ vendorsDetails.fullname }}</p>
        <p class="">Email: {{ vendorsDetails.email }}</p>
        <p class="">
          Account Number: {{ vendorsDetails?.bank_details[0].account_number }}
        </p>
        <p class="">
          Account Name: {{ vendorsDetails?.bank_details[0].account_name }}
        </p>
        <p class="">
          Account Bank: {{ vendorsDetails?.bank_details[0].bank_name }}
        </p>
        <p class="">
          Phone number:
          <a :href="`tel:+234${vendorsDetails.phone_number}`">{{
            vendorsDetails.phone_number
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
  <q-dialog v-model="pickedupModal"
    ><q-card class="modal_card">
      <div class="images row justify-center">
        <i style="font-size: 3rem" class="fa-solid text-red fa-cancel"></i>
      </div>
      <div class="text-center q-mt-lg">
        <p class="">Delivery is yet to be picked up</p>
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="acceptModal"
    ><q-card class="modal_card">
      <div class="images row justify-center">
        <i style="font-size: 3rem" class="fa-solid text-red fa-cancel"></i>
      </div>
      <div class="text-center q-mt-lg">
        <p class="">Delivery is yet to be accepted by vendor</p>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Dialog, Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
let data = ref({});
let loading = ref(false);
let errors = ref({});

let ratingData = ref({ star: 0 });
let vendorsDetails = ref({});
let deliveryCode = ref("");
let vendorsDetailsDialog = ref(false);
let showDeliveryDetails = ref(false);
let deliveredModal = ref(false);
let pickedupModal = ref(false);
let acceptModal = ref(false);
const confirmDeliveryCode = () => {
  Loading.show();
  const url = `delivery-detail?delivery_code=${deliveryCode.value}`;
  api
    .get(url)
    .then((response) => {
      console.log(response);
      Loading.hide();
      data.value = response.data.data;
      if (response.data.data.is_accepted) {
        if (response.data.data.is_pickedup) {
          if (response.data.data.is_delivered) {
            deliveredModal.value = true;
          } else {
            showDeliveryDetails.value = true;
          }
        } else {
          pickedupModal.value = true;
        }
      } else {
        acceptModal.value = true;
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
          vendorsDetailsDialog.value = true;
          vendorsDetails.value = response.data.data.vendor;
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
const rateVendor = () => {
  let ratingDataVendor = {
    ...ratingData.value,
    vendor_id: "",
  };
  Loading.show();
  const url = `user/rate`;
  api
    .post(url, ratingDataVendor)
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

<style lang="scss" scoped></style>
