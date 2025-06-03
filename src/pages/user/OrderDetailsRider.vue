<template>
  <q-pull-to-refresh @refresh="refresh">
    <div class="q-pb-xl q-pt-ms">
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
      <div class="container q-pb-xl q-pt-sm">
        <div class="top div">
          <div class="grid">
            <div class="left column items-center justify-center">
              <img
                style="
                  width: 100%;
                  height: 200px;
                  object-fit: cover;
                  border-radius: 5px;
                "
                :src="data?.package_image"
                alt=""
              />
            </div>

            <div v-if="data?.user?.fullname" class="right text-black">
              <!-- <h5 class="paragraph text-center text-black">
              <span class="text-weight-bold"> Package name: </span>
              {{ data.package_name }}
              </h5> -->
              <div class="q-mt-md">
                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Package name:</span>
                  <input type="text" disabled v-model="data.package_name" />
                </p>
                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Sender's Name:</span>
                  <input type="text" disabled v-model="data.user.fullname" />
                </p>
                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Sender's Phone Number:</span>
                  <input
                    type="text"
                    disabled
                    v-model="data.user.phone_number"
                  />
                </p>
                <p class="normalText thin text-black">
                  <span class="text-weight-bold"
                    >Recipient's Phone Number:</span
                  >
                  <input type="text" disabled v-model="data.phone_number" />
                </p>
                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Pick-Up Location:</span>
                  <input type="text" disabled v-model="data.pickup_location" />
                </p>
                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Delivery Location:</span>
                  <input
                    type="text"
                    disabled
                    v-model="data.delivery_location"
                  />
                </p>
                <p class="normalText thin text-black">
                  <span class="text-weight-bold">Estimated Price:</span>
                  <input
                    type="text"
                    disabled
                    v-model="data.estimated_delivery_price"
                  />
                </p>
              </div>
            </div>

            <div v-else><q-skeleton height="150px" /></div>
          </div>
        </div>
        <div
          v-if="data.rider_id !== store.userdetails.id"
          style="gap: 1rem; min-height: auto; padding: 1rem"
          class="div plain"
        >
          <div
            style="gap: 1rem; min-height: auto"
            class="row items-center justify-center"
          >
            <q-btn
              v-if="!data.is_accepted"
              :loading="loadAccept"
              @click="acceptDeliveryReq"
              color="green-7"
              no-caps
              class="q-pa-sm"
              no-wrap
            >
              Accept request
            </q-btn>
            <q-btn
              v-else
              color="green-7"
              no-caps
              class="q-pa-sm"
              no-wrap
              disable
            >
              Accepted
            </q-btn>
            <q-btn
              v-if="data.is_accepted && !data.is_pickedup"
              :loading="loadingBtn"
              @click="pickedUpFCN"
              color="blue-7"
              no-caps
              class="q-pa-sm"
              no-wrap
            >
              Pick Up
            </q-btn>
            <q-btn
              v-else-if="data.is_accepted && data.is_pickedup"
              :loading="loadingBtn"
              color="blue-7"
              no-caps
              class="q-pa-sm"
              no-wrap
              disable
            >
              Picked up
            </q-btn>
            <q-btn
              v-if="data.is_accepted"
              :loading="loadReject"
              color="red-7"
              no-wrap
              class="q-pa-sm"
              no-caps
              disable
            >
              Decline request
            </q-btn>
            <q-btn
              v-else
              :loading="loadReject"
              @click="rejectDeliveryReq"
              color="red-7"
              no-wrap
              class="q-pa-sm"
              no-caps
            >
              Decline request
            </q-btn>
          </div>
        </div>
        <div
          style="min-height: auto; padding-top: 0.5rem"
          v-if="data.rider_id === store.userdetails.id"
          class="div plain"
        >
          <h5 class="text-h4 text-black">Progress Report</h5>
          <p v-if="!data.is_delivered" class="text-black-10">
            {{
              data.is_pickedup
                ? "Package has been picked up and is enroute"
                : "Your request for this delivery has been accepted, Click pickup when you have received or picked up the package. NOTE: ONLY CLICK PICKUP WHEN YOU HAVE PICKED UP THIS PACKAGE"
            }}
          </p>
          <p v-if="data.is_delivered" class="text-green">
            {{
              data.is_pickedup
                ? "Package has been delivered"
                : "Package has not been delivered"
            }}
          </p>

          <div
            class="q-gutter-sm q-px-sm actn_btns no-wrap row items-center justify-between q-mt-md"
          >
            <q-btn
              :loading="loadingBtn"
              @click="pickedUpFCN"
              no-caps
              no-wrap
              :color="data.is_pickedup ? 'green' : 'yellow-10'"
            >
              Pick Up
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
            <q-btn
              no-caps
              no-wrap
              disable
              v-if="data.is_delivered"
              color="green"
            >
              On Route
            </q-btn>
            <q-btn
              no-caps
              no-wrap
              disable
              :color="data.is_delivered ? 'green' : 'yellow-10'"
            >
              Delivered
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-pull-to-refresh>
</template>

<script setup>
import { Dialog, Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
let router = useRouter();
const route = useRoute();
const routeParams = ref(route);
let store = useMyAuthStore();
let rows = ref([]);
let filter = ref("");
let ridersInfo = ref({});
let mode = ref("");
let edit = ref(false);
let modelV = ref(null);
let viewDialog = ref(false);
let loading = ref(false);
let loadingBtn = ref(false);
let loadAccept = ref(false);
let loadPick = ref(false);
let loadReject = ref(false);

let progress = ref({
  where: "pickedUp",
});
let data = ref({ package_image: "/images/banner2.jpeg" });
watch(
  () => route.params.id,
  (newParams, oldParams) => {
    if (newParams !== oldParams && route.name === "rider.order") {
      Notify.create({ message: "hello" });
      // console.log(newParams, oldParams);
      // console.log(route.name);
      // console.log("changed");
      onRequest();
    }
  }
);
const pickedUpFCN = () => {
  let orderId = route.query.id;
  loadingBtn.value = true;

  api
    .get(`vendor/pickup-delivery?delivery_id=${orderId}`)
    .then((response) => {
      console.log(response);
      data.value = { ...response.data.data };
      loadingBtn.value = false;
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
      loadingBtn.value = false;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const acceptDeliveryReq = () => {
  let orderId = route.query.id;
  loadAccept.value = true;
  api
    .put(`vendor/accept-delivery?delivery_id=${parseInt(orderId)}`)
    .then((response) => {
      console.log(response);
      data.value = { ...response.data.data };
      loadAccept.value = false;
      Dialog.create({
        title: "Delivery request accepted",
        message: `You have accepted this delivery request and a message would be sent out to the owner...`,
        persistent: false,
      })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    })
    .catch(({ response }) => {
      console.log(response);
      loadAccept.value = false;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const rejectDeliveryReq = () => {
  let orderId = route.query.id;
  loadReject.value = true;
  api
    .put(`vendor/reject-delivery?delivery_id=${orderId}`)
    .then((response) => {
      console.log(response);
      data.value = { ...response.data.data };
      loadReject.value = false;
      Dialog.create({
        title: "Delivery request rejected",
        message: `You have rejected this delivery request...`,
        persistent: true,
      })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    })
    .catch(({ response }) => {
      console.log(response);
      loadReject.value = false;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const refresh = (done) => {
  onRequest();
  done();
};
const onRequest = () => {
  let orderId = route.query.id;
  loading.value = true;
  const url = `vendor/single-delivery?id=${orderId}`;
  Loading.show();
  api
    .get(url)
    .then((response) => {
      console.log(response);
      data.value = {
        ...response.data.data,
        estimated_delivery_price: `₦${response.data.data.estimated_delivery_price}`,
        isAccepted: response.data.data.is_accepted,
        isPickedUp: response.data.data.is_pickedup,
      };

      console.log(response.data.data.is_accepted)

      loading.value = false;
      Loading.hide();
    })
    .catch(({ response }) => {
      console.log(response);
      loading.value = false;
      Loading.hide();
    });
};

onMounted(async () => {
  try {
    onRequest();
  } catch (error) {
    console.error(error);
  }
});
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
