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
      <h5 class="text-h4 text-black text-center text-weight-bold">Add Asset</h5>
    </div>
    <div
      v-if="loadingPage"
      style="height: 50vh"
      class="column justify-center items-center"
    >
      <q-spinner-tail size="6rem" color="blue-grey" />
    </div>
    <div v-if="!loadingPage" class="convertCard">
      <div class="div">
        <div class="bill">
          <div class="q-mt-md">
            <div class="text-black limit">
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
                      {{ detailsToUse.plan_name }}
                    </h6>

                    <div class="q-mt-xs">
                      <p class="text-grey-7 text-subtitle1">
                        {{ companyData.type }}
                      </p>
                      <h6 class="text-h6 text-weight-bold">
                        NGN{{ detailsToUse.amount.toLocaleString() }}
                      </h6>
                    </div>
                  </div>
                </div>

                <div class="q-mt-sm">
                  <p class="text-grey-7 text-subtitle1">Duration</p>
                  <h6 class="text-h6 text-weight-bold">
                    {{ detailsToUse.duration }}
                  </h6>
                </div>
              </q-item>
            </div>
          </div>
          <!-- <div class="text-black limit">
              <q-item
                clickable
                class="bene_list row items-center justify-between"
              >
                <div
                  style="gap: 2rem"
                  class="row full-width q-py-sm items-center no-wrap"
                >
                  <img src="/images/wella.jpeg" alt="" />
                  <div>
                    <h6
                      class="bene_name text-h5 text-grey-7 text-weight-bold q-mb-xs"
                    >
                      MIB Wella Health Insurance
                    </h6>

                    <p class="text-grey-7 text-subtitle1">Product</p>
                    <h6 class="text-h6 text-weight-bold">STI Vehicle Policy</h6>

                    <div class="q-mt-xs">
                      <p class="text-grey-7 text-subtitle1">Premium</p>
                      <h6 class="text-h6 text-weight-bold">NGN15,000.00</h6>
                    </div>
                  </div>
                </div>

                <div class="q-mt-sm">
                  <p class="text-grey-7 text-subtitle1">Duration</p>
                  <h6 class="text-h6 text-weight-bold">1</h6>
                </div>
              </q-item>
            </div>
          </div> -->
          <div class="form_area">
            <div class="auth">
              <form @submit.prevent="createAsset" id="addAssetForm">
                <div v-if="nextView !== 'next'" class="limit">
                  <div class="input_wrap">
                    <label for=""> Plate Number</label>
                    <div class="input">
                      <input
                        v-model="data.assets.plate_number"
                        name="platenumber"
                        type="text"
                        required
                        placeholder="Add Plate Number"
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <label for=""> Chassis Number</label>
                    <div class="input">
                      <input
                        v-model="data.assets.chassis_number"
                        type="text"
                        required
                        placeholder="Add Chassis Number"
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <label for=""> Manufacurer</label>
                    <div class="input field">
                      <q-select
                        v-model="data.assets.manufacturer"
                        use-input
                        input-debounce="0"
                        label="Select items"
                        :options="manufacturersArr"
                        @filter="filterFnManufacturer"
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
                  </div>
                  <div class="input_wrap">
                    <label for=""> Model</label>
                    <div class="input">
                      <input
                        v-model="data.assets.model"
                        type="text"
                        required
                        placeholder="Add Model"
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <label for=""> Year</label>
                    <div class="input">
                      <input
                        v-model="data.assets.year"
                        type="text"
                        required
                        placeholder="Add Year"
                      />
                    </div>
                  </div>

                  <div class="input_wrap">
                    <label for=""> Color</label>
                    <div class="input field">
                      <q-select
                        v-model="data.assets.color"
                        use-input
                        input-debounce="0"
                        label="Select items"
                        :options="colorArr"
                        @filter="filterFnColors"
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
                  </div>
                  <div class="input_wrap">
                    <label for=""> Type of Use</label>
                    <div class="input field">
                      <q-select
                        v-model="data.assets.type_of_use"
                        use-input
                        input-debounce="0"
                        label="Select items"
                        :options="typeOfUseArr"
                        @filter="filterFnTypeOfUse"
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
                  </div>

                  <div class="input_wrap">
                    <label for=""> Engine Number</label>
                    <div class="input">
                      <input
                        v-model="data.assets.engine_number"
                        type="text"
                        placeholder="Add Year"
                      />
                    </div>
                  </div>
                  <div class="input_wrap">
                    <label for=""> Vehicle Type</label>
                    <div class="input field">
                      <q-select
                        v-model="data.assets.vehicle_type"
                        use-input
                        input-debounce="0"
                        label="Select items"
                        :options="vehicleTypeArr"
                        @filter="filterFnVehicle_type"
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
                  </div>
                  <div class="input_wrap">
                    <label for=""> Value of Asset</label>
                    <div class="input">
                      <input
                        v-model="data.assets.value_of_asset"
                        type="text"
                        placeholder="NGN 0.00"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="nextView === 'next'" class="limit">
                  <div class="div q-mt-lg q-mb-md">
                    <h6 class="text-h4 text-center">Upload Images</h6>
                  </div>
                  <div class="upload_input_wrap">
                    <div class="upload_input">
                      <q-file
                        @update:model-value="setUploadVehicleFrontviewFile"
                        v-model="data.assets.vehicle_front_view"
                        label="Upload Vehicle Front View"
                      >
                        <template v-slot:before>
                          <q-avatar size="60px">
                            <img
                              :src="
                                vehicleFrontviewPreview
                                  ? vehicleFrontviewPreview
                                  : '/images/image.png'
                              "
                            />
                          </q-avatar>
                        </template>

                        <template v-slot:append>
                          <q-btn
                            @click.stop.prevent="
                              data.assets.vehicle_front_view = null
                            "
                            round
                            size="10px"
                            color="red-8 "
                          >
                            <q-icon name="fa-solid fa-trash" />
                          </q-btn>
                        </template>
                      </q-file>
                    </div>
                    <p class="text-grey-7 q-mt-xs">3mb maximum file size</p>
                  </div>
                  <div class="upload_input_wrap">
                    <div class="upload_input">
                      <q-file
                        @update:model-value="setUploadVehicleRearviewFile"
                        v-model="data.assets.vehicle_rear_view"
                        label="Upload Vehicle Rear View"
                      >
                        <template v-slot:before>
                          <q-avatar size="60px">
                            <img
                              :src="
                                vehicleRearviewPreview
                                  ? vehicleRearviewPreview
                                  : '/images/image.png'
                              "
                            />
                          </q-avatar>
                        </template>

                        <template v-slot:append>
                          <q-btn
                            @click.stop.prevent="
                              data.assets.vehicle_rear_view = null
                            "
                            round
                            size="10px"
                            color="red-8 "
                          >
                            <q-icon name="fa-solid fa-trash" />
                          </q-btn>
                        </template>
                      </q-file>
                    </div>
                    <p class="text-grey-7 q-mt-xs">3mb maximum file size</p>
                  </div>
                  <div class="upload_input_wrap">
                    <div class="upload_input">
                      <q-file
                        @update:model-value="setUploadVehicleLeftviewFile"
                        v-model="data.assets.vehicle_left_view"
                        label="Upload Vehicle Left View"
                      >
                        <template v-slot:before>
                          <q-avatar size="60px">
                            <img
                              :src="
                                vehicleLeftviewPreview
                                  ? vehicleLeftviewPreview
                                  : '/images/image.png'
                              "
                            />
                          </q-avatar>
                        </template>

                        <template v-slot:append>
                          <q-btn
                            @click.stop.prevent="
                              data.assets.vehicle_left_view = null
                            "
                            round
                            size="10px"
                            color="red-8 "
                          >
                            <q-icon name="fa-solid fa-trash" />
                          </q-btn>
                        </template>
                      </q-file>
                    </div>
                    <p class="text-grey-7 q-mt-xs">3mb maximum file size</p>
                  </div>
                  <div class="upload_input_wrap">
                    <div class="upload_input">
                      <q-file
                        @update:model-value="setUploadVehicleRightviewFile"
                        v-model="data.assets.vehicle_right_view"
                        label="Upload Vehicle Right View"
                      >
                        <template v-slot:before>
                          <q-avatar size="60px">
                            <img
                              :src="
                                vehicleRightviewPreview
                                  ? vehicleRightviewPreview
                                  : '/images/image.png'
                              "
                            />
                          </q-avatar>
                        </template>

                        <template v-slot:append>
                          <q-btn
                            @click.stop.prevent="
                              data.assets.vehicle_right_view = null
                            "
                            round
                            size="10px"
                            color="red-8 "
                          >
                            <q-icon name="fa-solid fa-trash" />
                          </q-btn>
                        </template>
                      </q-file>
                    </div>
                    <p class="text-grey-7 q-mt-xs">3mb maximum file size</p>
                  </div>
                  <div class="upload_input_wrap">
                    <div class="upload_input">
                      <q-file
                        @update:model-value="setUploadVehicleDriversFile"
                        v-model="data.assets.drivers_license"
                        label="Upload Drivers License"
                      >
                        <template v-slot:before>
                          <q-avatar size="60px">
                            <img
                              :src="
                                vehicleDriversLicensePreview
                                  ? vehicleDriversLicensePreview
                                  : '/images/image.png'
                              "
                            />
                          </q-avatar>
                        </template>

                        <template v-slot:append>
                          <q-btn
                            @click.stop.prevent="
                              data.assets.drivers_license = null
                            "
                            round
                            size="10px"
                            color="red-8 "
                          >
                            <q-icon name="fa-solid fa-trash" />
                          </q-btn>
                        </template>
                      </q-file>
                    </div>
                    <p class="text-grey-7 q-mt-xs">3mb maximum file size</p>
                  </div>
                  <div class="upload_input_wrap">
                    <div class="upload_input">
                      <q-file
                        @update:model-value="setUploadVehicleLicenseFile"
                        v-model="data.vehicleLicence"
                        label="Upload Vehicle License"
                      >
                        <template v-slot:before>
                          <q-avatar size="60px">
                            <img
                              :src="
                                vehicleLicensePreview
                                  ? vehicleLicensePreview
                                  : '/images/image.png'
                              "
                            />
                          </q-avatar>
                        </template>

                        <template v-slot:append>
                          <q-btn
                            @click.stop.prevent="data.vehicleLicence = null"
                            round
                            size="10px"
                            color="red-8 "
                          >
                            <q-icon name="fa-solid fa-trash" />
                          </q-btn>
                        </template>
                      </q-file>
                    </div>
                    <p class="text-grey-7 q-mt-xs">3mb maximum file size</p>
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
                      @click="setView"
                      class="q-mt-sm"
                      color="red-8"
                      no-wrap
                      v-if="nextView === 'next'"
                      no-caps
                    >
                      Previous
                    </q-btn>
                    <q-btn
                      class="q-mt-sm full-width"
                      color="primary"
                      v-if="nextView !== 'next'"
                      @click="setView"
                      no-wrap
                      no-caps
                    >
                      Next
                    </q-btn>
                    <!-- @click="CreateAsset" -->
                    <q-btn
                      class="q-mt-sm full-width"
                      color="primary"
                      v-if="nextView === 'next'"
                      type="submit"
                      no-wrap
                      :loading="loading"
                      no-caps
                    >
                      Create Asset
                    </q-btn>
                  </div>
                </div>
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
import { Loading, Notify, QSpinnerOval } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMyAuthStore } from "src/stores/auth";
let store = useMyAuthStore();
let routeData = useRoute();
let router = useRouter();
let successModal = ref(false);
let loading = ref(false);
let loadingPage = ref(true);
let nextView = ref("previousView");
let vehicleLicensePreview = ref("");
let vehicleFrontviewPreview = ref("");
let vehicleRearviewPreview = ref("");
let vehicleLeftviewPreview = ref("");
let vehicleRightviewPreview = ref("");
let vehicleDriversLicensePreview = ref("");

let data = ref({
  assets: {
    vehicle_front_view: null,
    vehicle_rear_view: null,
    vehicle_left_view: null,
    vehicle_right_view: null,
    drivers_license: null,
    vehicle_license: null,
    model: "",
    color: "",
    type_of_use: "",
    vehicle_type: "",
  },
});

let model = ref(null);

const manufacturerOptions = ["Toyota", "BMW", "Lexus", "Mercedes", "Honda"];
const colorArr = ref([]);
const colorsOptions = ["White", "Red", "Pink", "Blue", "Green"];
const typeOfUseArr = ref([]);
const typeOfUseOptions = ["Private Motor", "Commercial Motor"];
const vehicleTypeArr = ref([]);
const vehicleTypeOptions = ["Saloon", "SUV", "Light Truck", "Heavy Duty Truck"];
const manufacturersArr = ref([]);
const companyData = ref({});
const detailsToUse = ref({});
const errors = ref({});

const setView = () => {
  document
    .getElementById("addAssetForm")
    .scrollIntoView({ behavior: "smooth" });
  if (nextView.value === "previousView") {
    nextView.value = "next";
  } else {
    nextView.value = "previousView";
  }
};

const CreateAsset = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    successModal.value = true;
  }, 1000);
};
const proceed = () => {
  router.replace({
    name: "pay",
    query: {
      company_id: routeData.query.company_id,
      plan: routeData.query.plan,
    },
  });
};

const setUploadVehicleLicenseFile = (props) => {
  data.value.assets.vehicle_license = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    vehicleLicensePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const setUploadVehicleFrontviewFile = (props) => {
  data.value.assets.vehicle_front_view = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    vehicleFrontviewPreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const setUploadVehicleRearviewFile = (props) => {
  data.value.assets.vehicle_rear_view = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    vehicleRearviewPreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const setUploadVehicleLeftviewFile = (props) => {
  data.value.assets.vehicle_left_view = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    vehicleLeftviewPreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const setUploadVehicleRightviewFile = (props) => {
  data.value.assets.vehicle_right_view = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    vehicleRightviewPreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const setUploadVehicleDriversFile = (props) => {
  data.value.assets.drivers_license = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    vehicleDriversLicensePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};

const filterFnManufacturer = (val, update, abort) => {
  if (val === "") {
    update(() => {
      manufacturersArr.value = manufacturerOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    manufacturersArr.value = manufacturerOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
const filterFnColors = (val, update, abort) => {
  if (val === "") {
    update(() => {
      colorArr.value = colorsOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    colorArr.value = colorsOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
const filterFnTypeOfUse = (val, update, abort) => {
  if (val === "") {
    update(() => {
      typeOfUseArr.value = typeOfUseOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    typeOfUseArr.value = typeOfUseOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
const filterFnVehicle_type = (val, update, abort) => {
  if (val === "") {
    update(() => {
      vehicleTypeArr.value = vehicleTypeOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    vehicleTypeArr.value = vehicleTypeOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
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
      detailsToUse.value = planData;
      loadingPage.value = false;
    })
    .catch(({ response }) => {
      console.log(response);
      // loading.value = false;
    });
};
const createAsset = () => {
  Loading.show({
    spinner: QSpinnerOval,
    message: "Creating asset...",
  });
  api
    .post("user/assets/create-asset", {
      insurance_id: routeData.query.company_id,
      user_id: store.userdetails.id,
      assets: data.value.assets,
    })
    .then((response) => {
      console.log(response);
      Loading.hide();
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
        timeout: 8489392,
      });
      successModal.value = true;
    })
    .catch(({ response }) => {
      // console.log(response);
      Loading.hide();
      loading.value = false;

      if (response.data.errors) {
        errors.value = response.data.errors;
      }
      let errorMessage = response?.data?.errors
        .map((error) => error.msg)
        .join(", ");
      Notify.create({
        message: errorMessage ? errorMessage : "Recheck your credentials",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
        timeout: 8489392,
      });
    });
};

onMounted(() => {
  getInsuranceCompany();
});
</script>

<style lang="scss" scoped></style>
