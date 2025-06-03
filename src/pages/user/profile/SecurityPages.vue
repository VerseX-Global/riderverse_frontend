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
      <h5 class="text-h4 text-black text-center text-weight-bold">Security</h5>
    </div>
    <div
      style="border: none; margin-top: 0; padding-top: 1rem"
      class="profile_page"
    >
      <div class="">
        <div class="health_tab">
          <div class="grid_">
            <!-- <div>
              <router-link
                :to="{ name: 'set.pin' }"
                style="gap: 1rem"
                class="row items-center no-wrap"
              >
                <div>
                  <h4 class="review_big">Set PIN</h4>
                </div>
              </router-link>
            </div> -->
            <!-- <div>
              <router-link
                :to="{ name: 'forgot.pin' }"
                style="gap: 1rem"
                class="row items-center no-wrap"
              >
                <div>
                  <h4 class="review_big">Forgot PIN</h4>
                </div>
              </router-link>
            </div> -->
            <div>
              <router-link
                :to="{ name: 'forgot.password' }"
                style="gap: 1rem"
                class="row items-center no-wrap"
              >
                <div>
                  <h4 class="review_big">Change Password</h4>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="q-mt-xl down_btn row justify-center">
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
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
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
