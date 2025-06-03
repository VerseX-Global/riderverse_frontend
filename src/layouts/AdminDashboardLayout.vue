<template>
  <q-layout view="hHh lpR fFf" class="dashboard_layout q-pa-md">
    <q-header class="header q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn :to="{ name: 'home' }" flat no-caps no-wrap class="q-ml-xs logo">
          <img
            class="q-mt-md"
            style="width: 70px"
            src="/images/rider.png"
            alt=""
          />
        </q-btn>

        <!-- <q-space /> -->

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn class="bg-green-7" icon="person" round flat>
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column text-center items-center">
                  <q-avatar size="52px">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                    />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ user.fullname }}
                  </div>

                  <q-btn
                    color="primary"
                    label="Logout"
                    :to="{ name: 'logout' }"
                    push
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="text-black"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white"
      :width="240"
      :breakpoint="800"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            class="links"
            v-ripple
            clickable
            exact
            :to="{
              name: 'admin.dashboard',
            }"
          >
            <q-item-section class="avater_side" avatar>
              <i class="ri-dashboard-line"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
          <q-item
            class="links"
            v-ripple
            clickable
            exact
            :to="{
              name: 'admin.operating.areas',
            }"
          >
            <q-item-section class="avater_side" avatar>
              <i class="ri-map-pin-line"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Operating areas</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-my-md" />
          <q-item
            class="links"
            v-ripple
            clickable
            exact
            :to="{
              name: 'admin.vendors',
            }"
          >
            <q-item-section class="avater_side" avatar>
              <i class="ri-user-2-line"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>All vendors</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-my-md" />
          <q-item
            class="links"
            v-ripple
            clickable
            exact
            :to="{
              name: 'admin.users',
            }"
          >
            <q-item-section class="avater_side" avatar>
              <i class="ri-user-line"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>All users</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-my-md" />
          <q-item
            class="links"
            v-ripple
            clickable
            exact
            :to="{
              name: 'admin.deliveries',
            }"
          >
            <q-item-section class="avater_side" avatar>
              <i class="ri-car-line"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>All deliveries</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useMyAuthStore } from "src/stores/auth";
import { api } from "src/boot/axios";
let store = useMyAuthStore();

const leftDrawerOpen = ref(false);
const lgaArray = ref([]);
const search = ref("");

let user = store.userdetails;
let role = store.userdetails.role;

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {});
</script>

<style scoped lang="scss">
.header {
  background: #ffffff;
  border-bottom: 1px solid #dddddd;
  height: 70px;
  display: flex;
}

.links {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  margin: 0.5rem 0;
  // color: #000000;
}

.links.sub {
  font-size: 11px;
  text-align: center;
  text-transform: uppercase;
}

.q-list {
  padding: 2rem 1rem;
}

.avater_side {
  min-width: 0;
  i {
    font-size: 1.5rem;
    color: #009934;
  }
}

.q-item.q-router-link--active,
.q-item--active {
  background: #e9e9e9;
  border-radius: 5px;
}
@media (max-width: 900px) {
  .mybtn {
    font-size: 12px;
    width: 150px;
  }

  .bar .input_wrap {
    width: 70%;
    margin-left: 0;
  }
  .menu {
    display: block;
  }
}
@media (max-width: 500px) {
  .bar .input_wrap {
    display: none;
  }
  .mybtn {
    width: 160px;
  }
  .logo img {
    width: 70px;
    height: 50px;
    object-fit: contain;
  }
  .btn {
    width: 106px;
    height: 36px;
    font-size: 11px;
  }

  .q-btn.logo {
    padding: unset;
  }
}
</style>
