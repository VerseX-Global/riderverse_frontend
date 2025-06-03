<template>
  <q-pull-to-refresh @refresh="refresh">
    <div class="container q-pb-xl q-pt-ms">
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
          Order Detail
        </h5>
      </div>

      <div class="top div">
        <div class="grid q-mt-lg">
          <div class="left column items-center no-wrap justify-center">
            <img
              style="
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 5px;
              "
              :src="preview ? preview : data.package_image"
              alt=""
            />

            <div class="row justify-center">
              <div class="q-my-lg row justify-center">
                <div class="upload_input">
                  <q-file
                    @update:model-value="setFile"
                    accept=".jpg,.png,.svg,.jpeg"
                    label="Change image"
                    :disable="!edit"
                    v-model="modelV"
                  >
                    <template v-slot:append>
                      <q-avatar>
                        <i
                          v-if="!preview"
                          class="fa-solid text-white fa-user"
                        ></i>
                        <img v-else :src="preview" />
                      </q-avatar>
                    </template>
                  </q-file>
                </div>
              </div>
            </div>
          </div>

          <div class="right text-black">
            <!-- <h5 class="paragraph text-center text-black">
              <span class="text-weight-bold">Package Name:</span>
              {{ data.package_name }}
            </h5> -->
            <form @submit.prevent="updateDelivery">
              <div class="q-mt-md">
                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Package Name:</span>
                  {{ data.package_name }}
                </p>
                <p class="normalText thin text-black">
                  <span class="text-weight-bold"
                    >Recipient's Phone Number:</span
                  >
                  <input
                    :class="edit ? 'edit' : ''"
                    :disabled="!edit"
                    type="text"
                    v-model="data.phone_number"
                  />
                </p>
                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Pick-Up Location:</span>
                  <input
                    :class="edit ? 'edit' : ''"
                    :disabled="!edit"
                    type="text"
                    v-model="data.pickup_location"
                  />
                </p>
                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Delivery Location:</span>
                  <input
                    :class="edit ? 'edit' : ''"
                    :disabled="!edit"
                    type="text"
                    v-model="data.delivery_location"
                  />
                </p>

                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Estimated Price:</span>
                  <input
                    :class="edit ? 'edit' : ''"
                    :disabled="!edit"
                    type="text"
                    v-model="data.estimated_delivery_price"
                  />
                </p>
                <q-btn
                  no-wrap
                  no-caps
                  @click="edit = !edit"
                  flat
                  class="bg-green-2 text-green-10 edit_btn"
                >
                  Edit Order
                  <img
                    class="q-ml-sm"
                    style="width: 15px; height: 15px"
                    src="../../assets/edit.svg"
                    alt=""
                  />
                </q-btn>
                <div class="row justify-center q-mt-lg">
                  <q-btn
                    class="bg-secondary q-px-lg"
                    text-color="white"
                    flat
                    :loading="loadingBtn"
                    type="submit"
                    no-caps
                    no-wrap
                    v-if="edit"
                    >Save</q-btn
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
        <div style="max-width: 500px">
          <h4>Vendor details</h4>

          <p class="normalText thin text-black">
            <span class="text-weight-bold">Delivery Vendor:</span>
            {{ data.vendor.fullname }}
          </p>
          <p class="normalText thin text-black">
            <span class="text-weight-bold">Vendor Phone Number:</span>
            {{ data.vendor.phone_number }}
          </p>
          <p class="normalText thin text-black">
            <span class="text-weight-bold">Vendor Email:</span>
            {{ data.vendor.email }}
          </p>
        </div>
      </div>
      <div v-if="!data.vendor" class="div q-mt-md plain">
        <h5 class="paragraph text-center text-black">
          Your request has been created we are connecting you for pickup
        </h5>
        <div class="row justify-center q-my-md">
          <q-spinner-hourglass size="4rem" color="primary" />
        </div>
      </div>
      <div
        v-else
        class="div column text-center q-mt-md justify-center items-center plain"
      >
        <h5 v-if="!data.is_pickedup" class="paragraph text-black">
          Your rider is ready and is coming your way <br />
          you can call your vendor by tapping the phone number..
        </h5>
        <h5 v-else class="paragraph text-black">
          Your delivery is enroute <br />
          <span v-if="distanceData" class="text-green">
            (your rider is {{ distanceData }} away from delivery...)
          </span>
        </h5>

        <ul
          style="gap: 0.5rem"
          class="q-mt-sm column items-center justify-center"
        >
          <img
            style="width: 100px; height: 100px; border-radius: 10px"
            :src="data.vendor.profile_image"
            alt=""
          />
          <li style="gap: 1rem" class="row items-center no-wrap">
            Name: {{ data.vendor.fullname }}
          </li>
          <li style="gap: 1rem" class="row items-center no-wrap">
            Phone:
            <span
              @click="openPhone(data.vendor.phone_number)"
              style="text-decoration: underline"
              >{{ data.vendor.phone_number }}</span
            >
          </li>
        </ul>

      </div>
      <div class="div plain q-mt-md">
        <h5 class="text-h4 q-mb-sm text-black">Progress Report</h5>
        <p v-if="!data.is_delivered" class="text-yellow-10">
          {{
            data.is_pickedup
              ? "Your package has been picked up and is enroute"
              : "Your package has not been picked up, have you reached out to your rider?"
          }}
        </p>
        <p v-if="data.is_delivered" class="text-green">
          {{
            data.is_pickedup
              ? "Your package has been delivered"
              : "Your package has not been delivered"
          }}
        </p>

        <div
          class="q-gutter-sm q-px-sm row actn_btns items-center justify-between q-mt-md"
        >
          <q-btn
            disable
            no-caps
            no-wrap
            :loading="loadingBtn"
            :color="data.is_pickedup ? 'green' : 'yellow-10'"
          >
            Picked Up
          </q-btn>
          <q-btn
            disable
            no-caps
            no-wrap
            v-if="!data.is_delivered"
            :color="data.is_pickedup ? 'yellow-9' : 'yellow-10'"
          >
            On Route
          </q-btn>
          <q-btn v-if="data.is_delivered" color="green"> On Route </q-btn>
          <q-btn
            no-caps
            no-wrap
            disable
            :loading="isDeliveredBtn"
            @click="deliveredFCN"
            :color="data.is_delivered ? 'green' : 'yellow-10'"
          >
            Delivered
          </q-btn>
        </div>
      </div>

      <q-dialog v-model="viewDialog"
        ><q-card class="modal_card">
          <div class="text-center q-mt-md">
            <p class="text-red-10">Please screenshot this for reference</p>
          </div>
          <div class="images column items-center justify-center">
            <h2
              style="color: black; font-weight: 700"
              class="q-mb-sm text-weight-bold paragraph"
            >
              Riders Info
            </h2>
            <img
              style="width: 70px; height: 70px; object-fit: contain"
              :src="ridersInfo.rider.profile_image"
              :alt="ridersInfo.rider.fullname"
            />
          </div>
          <div class="text-center q-mt-lg">
            <p class="">Name: {{ ridersInfo.rider.fullname }}</p>
            <p class="">Email: {{ ridersInfo.rider.email }}</p>
            <p class="">
              Phone number:
              <span
                @click="openPhone(ridersInfo.rider.phone_number)"
                style="text-decoration: underline"
                >{{ ridersInfo.rider.phone_number }}</span
              >
            </p>
          </div>
          <div class="images column items-center justify-center">
            <h2
              style="color: black; font-weight: 700"
              class="q-mb-sm paragraph"
            >
              Delivery Info
            </h2>
            <img
              style="width: 70px; height: 70px; object-fit: contain"
              :src="ridersInfo.package_image"
              :alt="ridersInfo.package_name"
            />
          </div>
          <div class="text-center q-mt-lg">
            <p class="">Package name: {{ ridersInfo.package_name }}</p>
            <p class="">Pickup location: {{ ridersInfo.pickup_location }}</p>
            <p class="">
              Delivery Location:
              {{ ridersInfo.delivery_location }}
            </p>
            <p class="">Price: NGN {{ ridersInfo.estimated_delivery_price }}</p>
          </div>
        </q-card>
      </q-dialog>
      <q-dialog v-model="ridersDetailsDialog"
        ><q-card class="modal_card">
          <p class="text-green text-center text-weight-bold">
            Delivery completed
          </p>
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
              Account Number:
              {{ ridersDetails?.bank_details[0].account_number }}
            </p>
            <p class="">
              Account Name: {{ ridersDetails?.bank_details[0].account_name }}
            </p>
            <p class="">
              Account Bank: {{ ridersDetails?.bank_details[0].bank_name }}
            </p>
            <!-- :href="`tel:+234${ridersDetails.phone_number}`" -->
            <p class="">
              Phone number:
              <span
                @click="openPhone(ridersDetails.phone_number)"
                style="text-decoration: underline"
                >{{ ridersDetails.phone_number }}</span
              >
            </p>
          </div>
          <div>
            <h2 class="paragraph">Rate rider</h2>
            <form @submit.prevent="raterider">
              <div class="auth">
                <div style="gap: 1rem" class="row items-center no-wrap">
                  Star:
                  <q-rating
                    v-model="ratingData.star"
                    size="1.5em"
                    color="green-5"
                    icon="star_border"
                    icon-selected="star"
                  />
                </div>

                <div style="gap: 1rem" class="row q-mt-sm items-start no-wrap">
                  Review:
                  <textarea
                    style="
                      width: 100%;
                      border: 1px solid #e3e3e3;
                      padding: 0.3rem 0.5rem 0;
                    "
                    v-model="ratingData.review"
                    cols="10"
                    rows="5"
                  ></textarea>
                </div>
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
                  >Submit Rating</q-btn
                >
              </div>
            </form>
          </div>
          <p class="text-center q-mt-sm text-weight-bold text-red">
            This delivery has been completed, if you have paid the rider
            already(before) kindly close this modal by clicking away from your
            screen
          </p>
        </q-card>
      </q-dialog>
    </div>
  </q-pull-to-refresh>
</template>

<script setup>
import { Dialog, Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
let router = useRouter();
const route = useRoute();
const routeParams = ref(route);
import { useMyAuthStore } from "src/stores/auth";
let store = useMyAuthStore();
let rows = ref([]);
let filter = ref("");
let distanceData = ref("");
let ridersInfo = ref({});
let mode = ref("");
let edit = ref(false);
let isDeliveredBtn = ref(false);
let modelV = ref(null);
let viewDialog = ref(false);
let ridersDetailsDialog = ref(false);
let ridersDetails = ref({});
let ratingData = ref({ star: 0 });
let loading = ref(false);
let loadingBtn = ref(false);

let progress = ref({
  where: "pickedUp",
});
let data = ref({ package_image: "/images/banner2.jpeg" });
let preview = ref("");

watch(
  () => route.query.id,
  (newParams, oldParams) => {
    if (newParams !== oldParams && route.name === "order-detail") {
      // console.log(newParams, oldParams);
      // console.log(route.name);
      // console.log("changed");
      onRequest();
    }
  }
);
let pagination = ref({
  sortBy: "id",
  descending: false,
  page: 1,
});
const columns = [
  {
    name: "fullname",
    required: true,
    label: "Rider Name",
    align: "left",
    field: (row) => row.rider.fullname,
    sortable: true,
  },
  {
    name: "rider_image",
    required: true,
    label: "Rider Image",
    align: "left",
    field: "rider_image",
    sortable: true,
  },

  {
    name: "avg_rating",
    required: true,
    label: "Rider Rating",
    align: "left",
    field: "avg_rating",
    sortable: true,
  },
  {
    name: "package_name",
    required: true,
    label: "Order Description",
    align: "left",
    field: (row) => row.deliver.package_name,
    sortable: true,
  },
  {
    name: "actions",
    required: true,
    label: "",
    align: "left",
    field: (row) => row.id,
    sortable: false,
  },
];
const setFile = (props) => {
  modelV.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    preview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const getInfo = (row) => {
  ridersInfo.value = row.user;
  viewDialog.value = true;
};
const deliveredFCN = () => {
  let orderId = router.currentRoute.value.query.id;
  isDeliveredBtn.value = true;
  api
    .get(`vendor/pickup-delivery?delivery_id=${orderId}`)
    .then((response) => {
      // console.log(response);
      data.value = { ...response.data.data };
      isDeliveredBtn.value = false;
      Dialog.create({
        title: "Delivery picked up",
        message: `You have picked up this delivery...`,
        persistent: true,
      })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    })
    .catch(({ response }) => {
      isDeliveredBtn.value = false;
    });
};
const openPhone = (phone) => {
  window.location.href = `tel:${phone}`;
};
const acceptRider = (row) => {
  loading.value = true;

  api
    .put(
      `user/accept-proposal?delivery_id=${row.deliver.id}&rider_id=${row.rider.id}`
    )
    .then((response) => {
      // console.log(response);
      loading.value = false;
      onRequest();
      Dialog.create({
        title: "Request Accepted",
        message: `You have successfully accepted this request...`,
        persistent: true,
      })
        .onOk(() => {
          viewDialog.value = true;
          ridersInfo.value = response.data.data;
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
      loading.value = false;
    });
};
const rateRider = () => {
  let ratingDataRider = {
    ...ratingData.value,
    rider_id: ridersDetails.value.id,
  };
  Loading.show();
  const url = `user/rate`;
  api
    .post(url, ratingDataRider)
    .then((response) => {
      // console.log(response);
      Loading.hide();
      Notify.create({
        message: response.data.message || "Rating successful",
        position: "top",
        color: "green-4",
      });
      ratingData.value = { star: 0 };
      ridersDetailsDialog.value = false;
    })
    .catch(({ response }) => {
      Loading.hide();
      Notify.create({
        message: response.data.message || "Could not rate rider",
        position: "top",
        color: "red",
      });
    });
};
const refresh = (done) => {
  onRequest();
  done();
};
const onRequest = () => {
  let orderId = route.query.id;
  // console.log(orderId);
  // loading.value = true;
  const url = `user/view-all-delivery`;
  // const url = `user/view-single-delivery?id=${orderId}`;
  // Notify.create({ message: orderId });
  Loading.show();
  api
    .get(url)
    .then((response) => {
      // rows.value = response.data.data;

      console.log(response);
      let order = response.data.data.find(
        (delivery) => delivery.id === parseInt(orderId)
      );
      console.log(order);
      data.value = {
        ...order,
        estimated_delivery_price: `₦${order.estimated_delivery_price}`,
      };

      if (response.data.data.is_delivered) {
        ridersDetailsDialog.value = true;
        ridersDetails.value = response.data.data.rider;
      } else {
        ridersDetailsDialog.value = false;
      }
      loading.value = false;
      Loading.hide();
      // calculateDistance();
    })
    .catch(({ response }) => {
      // loading.value = false;
      Loading.hide();
    });
};
const updateDelivery = () => {
  let orderId = router.currentRoute.value.query.id;
  loadingBtn.value = true;
  const url = `user/update-delivery?id=${orderId}`;
  // console.log(data.value);
  api
    .put(
      url,
      {
        package_name: data.value.package_name,
        phone_number: data.value.phone_number,
        pickup_location: data.value.pickup_location,
        delivery_location: data.value.delivery_location,
        price: data.value.estimated_delivery_price,
        package_image: modelV.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      loadingBtn.value = false;
      // console.log(response);
      edit.value = false;
      onRequest();
      Notify.create({
        message: response.data.message,
        color: "green-10",
        position: "top-left",
      });
    })
    .catch(({ response }) => {
      loadingBtn.value = false;
    });
};

onMounted(async () => {
  try {
    onRequest();
  } catch (error) {
    console.error(error);
  }
});

function calculateDistance() {
  var origin = data.value.pickup_location;
  var destination = data.value.delivery_location;
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.

      avoidHighways: false,
      avoidTolls: false,
    },
    callback
  );
}
// get distance results
function callback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    // console.log("first");
  } else {
    var origin = response.originAddresses[0];
    console.log(origin);
    var destination = response.destinationAddresses[0];
    console.log(destination);
    if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
      $("#result").html(
        "Better get on a plane. There are no roads between " +
          origin +
          " and " +
          destination
      );
    } else {
      var duration = response.rows[0].elements[0].duration;

      distanceData.value = duration.text;
    }
  }
}
</script>

<style lang="scss" scoped>
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
