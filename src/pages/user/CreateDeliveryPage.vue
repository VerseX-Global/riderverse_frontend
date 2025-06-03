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
      <h5 class="text-h4 text-black text-center text-weight-bold">
        Create Delivery
      </h5>
    </div>

    <div>
      <q-img src="/images/banner3.png"> </q-img>
    </div>
    <div
      v-if="loadingPage"
      style="height: 50vh"
      class="column justify-center items-center"
    >
      <q-spinner-tail size="6rem" color="blue-grey" />
    </div>
    <div v-else class="convertPage limit">
      <div class="convertCard">
        <div class="form_area">
          <div class="auth">
            <form @submit.prevent="submit" id="addAssetForm">
              <div class="">
                <div class="input_wrap">
                  <label for=""> Location</label>
                  <div class="input field">
                    <select
                      @change="getAmount"
                      required
                      v-model="selectedLocation"
                    >
                      <option
                        :value="location.name"
                        v-for="(location, index) in locationArr"
                        :key="index"
                      >
                        {{ location.name }}
                      </option>
                    </select>
                    <!-- <q-select
                      v-model="data.location"
                      use-input
                      input-debounce="0"
                      label="Select"
                      :options="locationArr"
                      @filter="filterFnlocation"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select> -->
                  </div>
                </div>
                <div class="input_wrap">
                  <label for=""> Delivery company</label>
                  <div class="input field">
                    <!-- <select
                      :disabled="!selectedLocation"
                      required
                      @change="setLogisticCompanyPrice"
                      v-model="selectedLogisticCompany"
                    >
                      <option
                        :value="company.business_name"
                        v-for="(company, index) in logisticsCompaniesArr"
                        :key="index"
                      >
                        {{ company.business_name }}
                      </option>
                    </select> -->
                    <q-select
                      v-model="selectedLogisticCompany"
                      use-input
                      @update:model-value="setLogisticCompanyPrice"
                      input-debounce="0"
                      label="Select"
                      :options="logisticsCompaniesArr"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No available delivery partner(s) at the selected location
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                </div>
                <!-- <div>
                  <label for=""> Select a logistics company</label>
                  <q-option-group
                    v-model="data.delivery_company"
                    type="radio"
                    :options="deliveryCompanyOptions"
                  >
                    <template v-slot:label="opt">
                      <div class="row items-center">
                        <span class="text-black text-h6">{{ opt.label }}</span>
                        <q-icon
                          :name="opt.icon"
                          color="black"
                          size="1em"
                          class="q-ml-sm"
                        />
                      </div>
                    </template>

                    <template v-slot:label-0="opt">
                      <p class="text-weight-bold text-h6 row items-center">
                        <span> {{ opt.label }}</span>
                        <q-badge class="text-white-7 q-ml-sm">
                          Recommended
                        </q-badge>
                      </p>
                    </template>
                  </q-option-group>
                </div> -->

                <div class="input_wrap">
                  <label for=""> Package Name</label>
                  <div class="input row item-center no-wrap">
                    <i
                      style="font-size: 2rem"
                      class="ri-box-1-line q-mr-sm"
                    ></i>

                    <input
                      v-model="data.package_name"
                      type="text"
                      required
                      placeholder="Box of Cake"
                    />
                  </div>
                </div>
                <div v-if="selectedLogisticCompany" class="input_wrap">
                  <label for=""> Delivery Cost(Autofilled)</label>
                  <div class="input row item-center no-wrap">
                    <i
                      style="font-size: 2rem"
                      class="ri-box-1-line q-mr-sm"
                    ></i>
                    <input
                      v-model="data.price"
                      type="text"
                      disabled
                      required
                      placeholder="NGN 3000"
                    />
                  </div>
                  <p class="text-weight-bold text-green">
                    Your delivery will cost {{ data.price }}
                  </p>
                </div>
                <div class="input_wrap">
                  <label for=""> Recipients Phone Number</label>
                  <div class="input row item-center no-wrap">
                    <i
                      style="font-size: 2rem"
                      class="ri-smartphone-line q-mr-sm"
                    ></i>

                    <input
                      v-model="data.phone_number"
                      type="text"
                      required
                      placeholder="08192999392"
                    />
                  </div>
                </div>

                <!-- <div class="input_wrap">
                  <label for=""> Package Type</label>
                  <div class="input field">
                    <q-select
                      v-model="data.package_type"
                      use-input
                      input-debounce="0"
                      label="Select"
                      :options="packageTypeArr"
                      @filter="filterFnPackageType"
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
                </div> -->
                <div class="input_wrap">
                  <label for=""> Package Pickup Location</label>
                  <div class="input row item-center no-wrap">
                    <i
                      style="font-size: 2rem"
                      class="ri-box-1-line q-mr-sm"
                    ></i>

                    <input
                      v-model="data.pickup_location"
                      type="text"
                      required
                      placeholder="56 Diamond City Estate, New Market."
                    />
                  </div>
                </div>
                <div class="input_wrap">
                  <label for=""> Package Delivery Location</label>
                  <div class="input row item-center no-wrap">
                    <i
                      style="font-size: 2rem"
                      class="ri-map-pin-line q-mr-sm"
                    ></i>

                    <input
                      v-model="data.delivery_location"
                      type="text"
                      required
                      placeholder="56 Coal City Garden Estate, Okpara Avenue."
                    />
                  </div>
                </div>
                <div class="input_wrap">
                  <label for=""> Landmark</label>
                  <div class="input row item-center no-wrap">
                    <i
                      style="font-size: 2rem"
                      class="ri-map-pin-line q-mr-sm"
                    ></i>

                    <input
                      v-model="data.landmark"
                      type="text"
                      required
                      placeholder="Miners Court."
                    />
                  </div>
                </div>

                <div class="upload_input_wrap">
                  <div class="upload_input">
                    <q-file
                      @update:model-value="setUploadPackageImage"
                      v-model="data.package_image"
                      label="Upload Package Image"
                    >
                      <template v-slot:before>
                        <q-avatar size="60px">
                          <img
                            :src="
                              packageImagePreview
                                ? packageImagePreview
                                : '/images/image.png'
                            "
                          />
                        </q-avatar>
                      </template>

                      <template v-slot:append>
                        <q-btn
                          @click.stop.prevent="data.package_image = null"
                          round
                          size="10px"
                          color="red-8 "
                        >
                          <q-icon name="fa-solid fa-trash" />
                        </q-btn>
                      </template>
                    </q-file>
                  </div>
                  <p class="text-grey-7 text-body1 q-mt-xs">
                    3mb maximum file size
                  </p>
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
                    color="secondary"
                    no-wrap
                    type="submit"
                    :loading="loading"
                    no-caps
                  >
                    Create
                  </q-btn>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <q-dialog class="dialog" v-model="orderSuccessModal" persistent>
      <div class="auth">
        <q-card class="billing q-pa-lg">
          <div class="text-center q-mb-lg">
            <div class="text-h4 text-weight-bold">Success!</div>
            <div class="smallText q-mt-md text-center">
              You have succesfully placed an order...
            </div>
          </div>

          <div class="total no-wrap row justify-center q-mt-sm items-center">
            <q-btn
              class="apply bg-primary q-px-xl q-mt-md"
              no-caps
              flat
              @click="initPayment"
              rounded
              text-color="white"
            >
              Continue to pay
            </q-btn>
          </div>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { Loading, Notify, Platform, QSpinnerOval } from "quasar";
import { api } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let store = useMyAuthStore();
let routeData = useRoute();
let router = useRouter();
let successModal = ref(false);
let selectedLocation = ref("");
let loading = ref(false);
let orderSuccessModal = ref(false);
let loadingPage = ref(true);
let packageImagePreview = ref("");
let orderPaymentDetails = ref({});
let orderPaymentLink = ref("");
let selectedLogisticCompany = ref("");
let vehicleLicensePreview = ref("");
console.log(Platform);
let data = ref({ package_image: null });
// let data = ref({ package_image: null, deliveryCompany: "op1" });

let model = ref(null);

const locationOptions = [
  // "New Havel",
  // "Independence Layout",
  // "Uwani",
  // "New Artisan",
  // "Abakpa",
  // "Nike",
  // "New Market",
  // "Obeagu",
  // "Okpara Avenue",
];
const locationArr = ref([]);
const logisticsCompaniesArr = ref([]);
const packageTypeArr = ref([]);
const packageTypeOptionsBase = ["Parcel", "Food", "Document", "Other"];

let deliveryCompanyOptions = ref([
  {
    value: "op1",
    label: "Ogwugwo Delivery",
    icon: "fa-solid fa-truck",
  },
  {
    value: "op2",
    label: "BNL Logistics",
    icon: "fa-solid fa-truck",
    color: "teal",
  },
  {
    value: "op3",
    label: "Verse X",
    icon: "fa-solid fa-truck",
    color: "teal",
  },
]);

const setUploadPackageImage = (props) => {
  data.value.package_image = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    packageImagePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const filterFnlocation = (val, update, abort) => {
  if (val === "") {
    update(() => {
      locationArr.value = locationOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    locationArr.value = locationOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
const filterFnPackageType = (val, update, abort) => {
  if (val === "") {
    update(() => {
      packageTypeArr.value = packageTypeOptionsBase;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    packageTypeArr.value = packageTypeOptionsBase.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const setLogisticCompanyPrice = (props) => {
  console.log(props);

  data.value.price = props.operating_areas[0].price;
  data.value.vendor_id = props.value;
};
const getAmount = () => {
  console.log(selectedLocation.value);
  Loading.show({
    spinner: QSpinnerOval,
    message: "Fetching...",
  });
  api
    .get(`vendor-price?landmark=${selectedLocation.value}`)
    .then((response) => {
      console.log(response);
      logisticsCompaniesArr.value = response.data.data.map((company) => ({
        ...company,
        label: company.business_name,
        value: company.id,
        // value: company.operating_areas.find(
        //   (company) => company.area === selectedLocation.value
        // ).price,
      }));

      console.log(logisticsCompaniesArr.value);

      // console.log(data.value);
      Loading.hide();
    })
    .catch(({ response }) => {
      console.log(response);
      loading.value = false;
      Loading.hide();
    });
};
function formatPhoneNumber(phoneNumber) {
  // Check if the phone number starts with a zero
  if (phoneNumber.startsWith("0")) {
    // Remove the leading zero and add the country code
    return "+234" + phoneNumber.slice(1);
  }

  // If the phone number doesn't start with a zero, return it as is
  return phoneNumber;
}
const submit = () => {
  let postData = {
    ...data.value,
    phone_number: formatPhoneNumber(data.value.phone_number),
    // landmark: data.value.landmark.name,
  };

  loading.value = true;
  api
    .post("user/create-delivery", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      Notify.create({
        message: "Delivery created",
        color: "green",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });

      console.log(response);
      loading.value = false;

      orderSuccessModal.value = true;
      orderPaymentLink.value = response.data.data.authorization_url;
      orderPaymentDetails.value = response.data.data;
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
const verifyPayment = (ref, trx) => {
  console.log(ref);
  console.log(trx);

  router.replace({
    name: "pay.success",
    query: {
      reference: ref,
      trxref: trx,
    },
  });
};
const initPayment = () => {
  window.location.href = orderPaymentLink.value;
  // if (Platform.is.mobile) {
  //   const handler = PaystackPop.setup({
  //     key: "pk_test_5da0786680babd72dc4a01fda46a14be6d7b4f8d", // Replace with your Paystack public key
  //     email: store.userdetails.email,
  //     ref: orderPaymentDetails.value.reference,
  //     amount: data.value.price * 100, // Paystack amount is in kobo
  //     currency: "NGN",
  //     callback: function (response) {
  //       console.log(response);
  //       verifyPayment(response.reference, response.trxref);
  //     },
  //     onClose: function () {
  //       Loading.hide();
  //       Notify.create({
  //         type: "negative",
  //         position: "top",
  //         message: "Transaction was not completed.",
  //       });
  //     },
  //   });
  //   handler.openIframe();
  // } else {
  //   window.location.href = orderPaymentLink.value;
  // }
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
const getLandmarks = () => {
  api
    .get(`operating_areas`)
    .then((response) => {
      console.log(response);
      // locationOptions.map((location) => ({
      //   ...location,
      //   value: location.name,
      //   label: location.name,
      // }));
      locationArr.value = response.data.data;
      loadingPage.value = false;
    })
    .catch(({ response }) => {
      console.log(response);
    });
};
onMounted(() => {
  getLandmarks();
});
</script>

<style lang="scss" scoped></style>
