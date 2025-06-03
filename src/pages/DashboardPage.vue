<template>
  <q-page style="padding-bottom: 5rem" class="limit">
    <q-carousel
      animated
      v-model="slide"
      navigation
      swipeable
      infinite
      class="top_carousel"
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" img-src="/images/banner1.png" />
      <q-carousel-slide :name="2" img-src="/images/banner2.png" />
      <q-carousel-slide :name="3" img-src="/images/banner3.png" />
    </q-carousel>
    <div
      v-if="
        store.typeOfPersonnel === 'user' || store.userdetails.role === 'User'
      "
    >
      <div class="q-mt-md row justify-between items-center">
        <h5 class="text-h4 text-black text-weight-bold">Our Categories</h5>

        <q-btn
          :to="{ name: 'buy.insurance' }"
          style="min-height:auto"
          flat
          no-caps
          no-wrap
        >
          View All
        </q-btn>
      </div>

      <div class="products_insurance">
        <div>
          <a href="https://qmarthub.com">
            <div><img src="/images/orderfood.png" alt="" /></div>
            <p>Order Food and Groceries</p>
          </a>
        </div>
        <div>
          <router-link
            :to="{
              name: 'create.delivery',
              query: {
                type: 'food',
              },
            }"
          >
            <div><img src="/images/fooddelivery.png" alt="" /></div>
            <p>Food Delivery</p>
          </router-link>
        </div>
        <div>
          <router-link
            :to="{
              name: 'create.delivery',
              query: {
                type: 'parcel',
              },
            }"
          >
            <div><img src="/images/parceldelivery.png" alt="" /></div>
            <p>
              Parcel <br />
              Delivery
            </p>
          </router-link>
        </div>
        <div>
          <router-link
            :to="{
              name: 'create.delivery',
              query: {
                type: 'documents',
              },
            }"
          >
            <div><img src="/images/documentdelivery.png" alt="" /></div>
            <p>
              Document <br />
              Delivery
            </p>
          </router-link>
        </div>
        <div>
          <router-link
            :to="{
              name: 'create.delivery',
              query: {
                type: 'others',
              },
            }"
          >
            <div><img src="/images/otherdelivery.png" alt="" /></div>
            <p>Others</p>
          </router-link>
        </div>
      </div>
    </div>
    <div
      v-if="
        store.typeOfPersonnel === 'user' || store.userdetails.role === 'User'
      "
      style="gap: 1.5rem"
      class="q-mt-md row justify-between items-center"
    >
      <q-btn
        style="flex: 2"
        class="text-h5 text-weight-bold bg-green-2"
        text-color="green-10"
        flat
        v-if="
          store.typeOfPersonnel === 'user' || store.userdetails.role === 'User'
        "
        :to="{ name: 'create.delivery' }"
        no-caps
        no-wrap
      >
        Create Delivery
      </q-btn>

      <q-btn
        style="flex: 1; line-height: 1.3"
        :to="{ name: 'order.history' }"
        class="text-h6 text-weight-bold bg-orange-2"
        text-color="orange-10"
        flat
        no-caps
      >
        View all
      </q-btn>
    </div>
    <div
      v-if="
        store.userdetails.role === 'Vendor' ||
        store.typeOfPersonnel === 'vendor'
      "
    >
      <div class="q-mt-xl row justify-between items-center">
        <h5 class="text-h4 text-black text-weight-bold">Recent Orders</h5>
      </div>
      <div class="q-mt-md" v-if="!recentOrders.length">
        <h5 class="text-black text-weight-bold">No Delivery Orders Found</h5>
        <q-skeleton height="50px" />
      </div>
      <q-list class="q-mt-md" v-else bordered>
        <q-item
          v-for="order in recentOrders"
          :key="order.id"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar text-color="white">
              <img :src="order.package_image" alt="" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ order.package_name }}</q-item-label>
            <q-item-label class="text-h6" lines="1"
              >Recipients number: {{ order.phone_number }}</q-item-label
            >
            <q-item-label class="text-h6" lines="1"
              >Pick up location: {{ order.pickup_location }}</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-btn
              style="min-height: auto"
              class="q-pa-sm"
              color="green-7"
              :to="{
                name:
                  store.userdetails.role === 'User'
                    ? 'order-detail'
                    : 'rider.order-detail',
                query: {
                  id: order.id,
                },
              }"
              ><i class="ri-arrow-right-s-line text-h4"></i
            ></q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div>
      <div class="q-mt-xl row justify-between items-center">
        <h5 class="text-h4 text-black text-weight-bold">Why Ridersverse</h5>

        <!-- <q-btn style="min-height;auto" flat no-caps no-wrap> View All </q-btn> -->
      </div>

      <div class="products_insurance why">
        <div>
          <div><img src="/images/rider1.png" alt="" /></div>
          <p>
            <span style="line-height: 1.2" class="text-h5">
              Revolutionary
            </span>
          </p>
          <p class="q-pt-sm">
            Efficient and reliable delivery service at your fingertips. Find the
            best riders for your deliveries
          </p>
        </div>
        <div>
          <div><img src="/images/rider2.jpeg" alt="" /></div>
          <p>
            <span style="line-height: 1.2" class="text-h5">
              Choose Your Delivery Location
            </span>
          </p>
          <p class="q-pt-sm">
            Select from a wide range of delivery locations and see the available
            riders and logistics companies that serve your area
          </p>
        </div>
        <div>
          <div>
            <img src="/images/rider3.webp" alt="" />
          </div>
          <p>
            <span style="line-height: 1.2" class="text-h5">
              Fast and Secure Deliveries
            </span>
          </p>
          <p class="q-pt-sm">
            Once your delivery is created and payment is made, sit back and
            relax while our riders ensure your package gets to its destination
            safely and on time.
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
let store = useMyAuthStore();
let slide = ref(1);
let autoplay = ref(true);
let curl = ref("");
let loading = ref(false);
let recentOrders = ref([]);

const onRequest = () => {
  loading.value = true;
  const url =
    store.typeOfPersonnel === "user"
      ? `user/view-all-delivery`
      : `vendor/all-delivery`;
  curl.value = url;
  api
    .get(url)
    .then((response) => {
      recentOrders.value = response.data.data;
      console.log(response);
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};

onMounted(() => {
  if (
    store.userdetails.role === "Vendor" ||
    store.typeOfPersonnel === "vendor"
  ) {
    onRequest();
  } else {
    return;
  }
});
</script>

<style lang="scss" scoped>
span {
  display: inline;
}
</style>
