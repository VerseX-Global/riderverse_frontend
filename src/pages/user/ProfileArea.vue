<template>
  <div
    style="border: none; margin-top: 0; padding-top: 1rem"
    class="profile_page"
  >
    <div style="gap: 1rem" class="row q-pb-lg items-center no-wrap">
      <div class="img_profile">
        <img
          style="
            width: 100px;
            height: 100px;
            border-radius: 50^;
            object-fit: contain;
          "
          :src="
            store.userdetails.profile_image
              ? store.userdetails.profile_image
              : '/images/image.png'
          "
          alt=""
        />
      </div>

      <div>
        <h4 class="review_big">
          {{ store.userdetails.fullname }}
        </h4>
        <p class="transactsmall color">{{ store.userdetails.email }}</p>
      </div>
    </div>

    <div class="">
      <div class="health_tab">
        <div class="grid_">
          <div>
            <router-link
              :to="{ name: 'account.pages' }"
              style="gap: 1rem"
              class="row items-center no-wrap"
            >
              <div class="icon"><i class="fa-solid fa-user"></i></div>

              <div>
                <h4 class="review_big">My Account</h4>
              </div>
            </router-link>
          </div>
          <div v-if="store.typeOfPersonnel !== 'user'">
            <router-link
              :to="{ name: 'update.account.details' }"
              style="gap: 1rem"
              class="row items-center no-wrap"
            >
              <div class="icon"><i class="fa-solid fa-certificate"></i></div>

              <div>
                <h4 class="review_big">Set Bank Details</h4>
              </div>
            </router-link>
          </div>
          <div v-if="store.typeOfPersonnel !== 'user'">
            <router-link
              :to="{ name: 'view.account.detail' }"
              style="gap: 1rem"
              class="row items-center no-wrap"
            >
              <div class="icon"><i class="fa-solid fa-list"></i></div>

              <div>
                <h4 class="review_big">Bank Details</h4>
              </div>
            </router-link>
          </div>
          <div>
            <router-link
              :to="{ name: 'security.pages' }"
              style="gap: 1rem"
              class="row items-center no-wrap"
            >
              <div class="icon"><i class="fa-solid fa-shield-halved"></i></div>

              <div>
                <h4 class="review_big">Security</h4>
                <!-- <p class="transactsmall color2">Start a converstation now!</p> -->
              </div>
            </router-link>
          </div>
          <!-- <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon"><i class="fa-solid fa-certificate"></i></div>

            <div>
              <h4 class="review_big">Verification</h4>
            </div>
          </div> -->
          <!-- <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon"><i class="fa-solid fa-users"></i></div>

            <div>
              <h4 class="review_big">Family and Friends</h4>

            </div>
          </div> -->
          <!-- <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon"><i class="fa-solid fa-shield-halved"></i></div>

            <div>
              <h4 class="review_big">Security</h4>
            </div>
          </div> -->
          <!-- <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon"><i class="fa-solid fa-gift"></i></div>

            <div>
              <h4 class="review_big">Refer and Earn</h4>

            </div>
          </div> -->
          <!-- <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon">
              <i class="fa-solid fa-circle-info"></i>
            </div>

            <div>
              <h4 class="review_big">Support</h4>
            </div>
          </div> -->
          <!-- <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon">
              <i class="fa-solid fa-scale-balanced"></i>
            </div>

            <div>
              <h4 class="review_big">Privacy Policy & Terms of Use</h4>
            </div>
          </div> -->
          <div>
            <router-link
              :to="{ name: 'logout' }"
              style="gap: 1rem"
              class="row items-center no-wrap"
            >
              <div class="icon">
                <i class="fa-solid fa-right-to-bracket"></i>
              </div>

              <div>
                <h4 class="review_big">Logout</h4>
                <!-- <p class="transactsmall color2">Start a converstation now!</p> -->
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { ref } from "vue";
let store = useMyAuthStore();
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
