<template>
  <div>
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
      <h5 class="text-h4 text-black text-center text-weight-bold">Account</h5>
    </div>
    <div
      style="border: none; margin-top: 0; padding-top: 1rem"
      class="profile_page"
    >
      <div style="gap: 1rem" class="column q-pb-lg items-center no-wrap">
        <div class="img_profile">
          <img
            style="
              width: 120px;
              height: 120px;
              border-radius: 50%;
              object-fit: contain;
            "
            :src="
              store.userdetails.profile_image
                ? store.userdetails.profile_image
                : '/images/avatar.png'
            "
            alt=""
          />
        </div>
      </div>

      <div class="">
        <div class="health_tab">
          <div class="grid_">
            <div>
              <router-link
                :to="{ name: 'my.account' }"
                style="gap: 1rem"
                class="row items-center no-wrap"
              >
                <div>
                  <h4 class="review_big">My Account</h4>
                </div>
              </router-link>
            </div>
            <!-- <div>
              <router-link
                :to="{ name: 'my.profile' }"
                style="gap: 1rem"
                class="row items-center no-wrap"
              >
                <div>
                  <h4 class="review_big">My Profile</h4>
                </div>
              </router-link>
            </div> -->
            <!-- <div>
              <router-link
                :to="{ name: 'my.kin' }"
                style="gap: 1rem"
                class="row items-center no-wrap"
              >
                <div>
                  <h4 class="review_big">Next of Kin</h4>
                </div>
              </router-link>
            </div>
            <div>
              <router-link
                :to="{ name: 'professional.info' }"
                style="gap: 1rem"
                class="row items-center no-wrap"
              >
                <div>
                  <h4 class="review_big">Professional Information</h4>
                </div>
              </router-link>
            </div> -->
          </div>
        </div>
      </div>

      <div class="q-mt-xl down_btn row justify-center">
        <q-btn
          style="
            border-bottom: 1px solid red;
            min-height: auto;
            padding-bottom: 0;
          "
          flat
          outline
          no-caps
          no-wrap
          text-color="red"
        >
          Delete Account
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMyAuthStore } from "src/stores/auth";
let store = useMyAuthStore();
let routeData = useRoute();
let router = useRouter();
</script>

<style lang="scss" scoped>
.q-btn.active {
  color: #1c1c1e;
  border-bottom: 3px solid #1c1c1e;
}
.q-btn {
  padding-bottom: 1rem;
  color: #9a9fa5;
}
</style>
