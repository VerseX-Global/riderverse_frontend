<template>
  <q-layout class="greyBack authLayout" view="lHh lpR fFf">
    <q-header
      v-if="routeData.name === 'dashboard'"
      style="width: auto"
      class="header bg-white"
    >
      <div class="row container justify-between no-wrap">
        <div style="gap: 3rem" class="left row no-wrap items-center">
          <div
            v-if="!$q.screen.lt.sm"
            style="gap: 1rem"
            class="row q-ml-md right_ items-center no-wrap"
          >
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          </div>

          <div>
            <p class="p_sub_text q-mb-none color">Welcome,</p>
            <h6 class="dashtext">{{ store.userdetails.fullname }}</h6>
          </div>
        </div>

        <div style="gap: 1rem" class="row btns right_btns items-center">
          <router-link
              class="text-black inline row items-center no-wrap"
              :to="{ name: 'home' }"
            >
          <q-btn outline no-wrap no-caps @click="goHome">
            Go Home
          </q-btn>
        </router-link>
        </div>
      </div>
    </q-header>

    <q-drawer
      :width="240"
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
    >
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <div class="logo row justify-center">
          <h1 class="text-h4 text-weight-bold">
            <router-link
              class="text-black inline row items-center no-wrap"
              :to="{ name: 'home' }"
            >
            <img style="max-width: 80px" src="/images/logo.png" alt="" />
            Ridersverse
            </router-link>
          </h1>
        </div>

        <q-list padding class="menu-list">
          <q-item :to="{ name: 'dashboard' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-home-4-line"></i>
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <!-- <q-item :to="{ name: 'buy.policies' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-alarm-warning-line"></i>
            </q-item-section>

            <q-item-section> Deliveries </q-item-section>
          </q-item> -->

          <q-item
            v-if="
              store.typeOfPersonnel === 'user' ||
              store.userdetails.role === 'User'
            "
            :to="{ name: 'create.delivery' }"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <i class="ri-add-large-line"></i>
            </q-item-section>

            <q-item-section> Create Delivery </q-item-section>
          </q-item>
          <q-item
            v-if="
              store.typeOfPersonnel === 'vendor' ||
              store.userdetails.role === 'Vendor'
            "
            :to="{ name: 'manage.areas' }"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <i class="ri-add-large-line"></i>
            </q-item-section>

            <q-item-section> Manage Areas </q-item-section>
          </q-item>

          <q-item :to="{ name: 'order.history' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-history-line"></i>
            </q-item-section>

            <q-item-section> History </q-item-section>
          </q-item>
          <q-item
            :to="{
              name: 'profile',
            }"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <i class="ri-user-line"></i>
            </q-item-section>

            <q-item-section> Profile </q-item-section>
          </q-item>
          <q-item :to="{ name: 'logout' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="fa-solid fa-right-from-bracket"></i>
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- <q-footer>
      <div class="row justify-center">
        <p class="rights text-center">
          © Ridersverse {{ new Date().getFullYear() }}. All Rights Reserved.
        </p>
      </div>
    </q-footer> -->
    <q-footer
      v-if="
        ($q.screen.lt.sm && routeData.name === 'dashboard') ||
        routeData.name === 'profile'
      "
      class="layout_footer text-white"
    >
      <div class="footer_holder">
        <q-item :to="{ name: 'dashboard' }" flat>
          <div class="column justify-center items-center">
            <i class="ri-home-4-line"></i>
            <div class="footer_tag">Home</div>
          </div>
        </q-item>
        <q-item clickable :to="{ name: 'buy.policies' }" flat>
          <div class="column text-center justify-center items-center">
            <i class="ri-alarm-warning-line"></i>
            <div class="footer_tag">Deliveries</div>
          </div>
        </q-item>
        <q-item
          v-if="
            store.typeOfPersonnel === 'user' ||
            store.userdetails.role === 'User'
          "
          clickable
          :to="{ name: 'create.delivery' }"
          class="create"
        >
          <div
            class="column create_div text-center justify-center items-center"
          >
            <i class="ri-add-large-line"></i>
          </div>
          <div class="footer_tag">Create Delivery</div>
        </q-item>
        <q-item
          v-if="
            store.typeOfPersonnel === 'vendor' ||
            store.userdetails.role === 'Vendor'
          "
          clickable
          :to="{ name: 'manage.areas' }"
          class="create"
        >
          <div
            class="column create_div text-center justify-center items-center"
          >
            <i class="ri-add-large-line"></i>
          </div>
          <div class="footer_tag">Manage Areas</div>
        </q-item>
        <q-item clickable :to="{ name: 'order.history' }" flat>
          <div class="column text-center justify-center items-center">
            <i class="ri-history-line"></i>
            <div class="footer_tag">History</div>
          </div>
        </q-item>
        <q-item
          clickable
          :to="{
            name: 'profile',
          }"
          flat
        >
          <div class="column text-center justify-center items-center">
            <i class="ri-user-line"></i>
            <div class="footer_tag">Profile</div>
          </div>
        </q-item>
      </div>
    </q-footer>
    <!-- <q-footer
      v-if="$q.screen.lt.sm && routeData.name === 'profile'"
      class="layout_footer text-white"
    >
      <div class="footer_holder">
        <q-item :to="{ name: 'dashboard' }" flat>
          <div class="column justify-center items-center">
            <i class="ri-home-4-line"></i>
            <div class="footer_tag">Home</div>
          </div>
        </q-item>
        <q-item clickable :to="{ name: 'buy.policies' }" flat>
          <div class="column text-center justify-center items-center">
            <i class="ri-file-text-line"></i>
            <div class="footer_tag">My Policies</div>
          </div>
        </q-item>
        <q-item clickable :to="{ name: 'claims' }" class="create">
          <div
            class="column create_div text-center justify-center items-center"
          >
            <i class="ri-flag-line"></i>
          </div>
          <div class="footer_tag">Claim</div>
        </q-item>
        <q-item clickable :to="{ name: 'groups' }" flat>
          <div class="column text-center justify-center items-center">
            <i class="ri-group-3-line"></i>
            <div class="footer_tag">My Groups</div>
          </div>
        </q-item>
        <q-item
          clickable
          :to="{
            name: 'profile',
          }"
          flat
        >
          <div class="column text-center justify-center items-center">
            <i class="ri-user-line"></i>
            <div class="footer_tag">Profile</div>
          </div>
        </q-item>
      </div>
    </q-footer> -->

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <!-- <transition :name="transitionName" mode="out-in">
        <div v-if="routeIsReady">
          <router-view />
        </div>
      </transition> -->
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

let routeData = useRoute();
let router = useRouter();
const leftDrawerOpen = ref(false);
let store = useMyAuthStore();
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const goHome = () => {
  this.$router.push('/');
};
const routeIsReady = computed(() => {
  return router.currentRoute.value !== null;
});
const transitionName = computed(() => {
  if (routeData.name === "dashboard") {
    return "slide-left";
  } else if (routeData.name === "buy.policies") {
    return "slide-left";
  } else {
    return "slide-right";
  }
});
</script>

<style lang="scss" scoped>
.q-header {
  color: #646464;
  padding-block: 8px;
  h6 {
    color: #000;
  }
}

.logo {
  padding: 1.8rem 2rem;
}

.review_small.text {
  font-weight: 700;
}

@media (min-width: 1000px) {
  .search_inp {
    width: 100%;
    min-width: 508px;
  }
}
</style>
