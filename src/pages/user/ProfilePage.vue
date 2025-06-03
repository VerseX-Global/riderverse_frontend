<template>
  <div class="profile_page">
    <div class="container">
      <div class="top_">
        <div style="gap: 2rem" class="row items-center no-wrap">
          <q-btn
            :class="
              viewMode === 'personal'
                ? 'active review_small bold'
                : 'review_small bold'
            "
            @click="setViewMode('personal')"
            flat
            no-caps
            no-wrap
            >Personal Profile</q-btn
          >
          <q-btn
            class="review_small bold"
            :class="viewMode === 'security' ? 'active' : ''"
            @click="setViewMode('security')"
            flat
            no-wrap
            no-caps
            >Security</q-btn
          >
          <q-btn
            class="review_small bold"
            :class="viewMode === 'help' ? 'active' : ''"
            @click="setViewMode('help')"
            flat
            no-wrap
            no-caps
            >Help & Support</q-btn
          >
          <!-- <q-btn
            class="review_small bold"
            :class="viewMode === 'reviews' ? 'active' : ''"
            @click="setViewMode('reviews')"
            flat
            no-wrap
            no-caps
            >My reviews</q-btn
          > -->
        </div>
        <q-separator />
      </div>

      <div v-if="viewMode === 'personal'">
        <div style="gap: 1rem" class="row q-py-lg items-center no-wrap">
          <div class="img_profile">
            <img
              style="width: 70px; height: 70px; border-radius: 48px"
              :src="
                store.userdetails.profile_image
                  ? store.userdetails.profile_image
                  : '/images/avatar.png'
              "
              alt=""
            />
            <q-btn flat no-caps no-wrap>
              <i class="fa-solid fa-camera"></i>
            </q-btn>
          </div>

          <div>
            <h4 class="review_big">
              {{ store.userdetails.first_name }}
              {{ store.userdetails.last_name }}
            </h4>
            <p class="transactsmall color">{{ store.userdetails.email }}</p>
          </div>
        </div>

        <q-separator />

        <div class="details">
          <div class="grid">
            <div class="left">
              <div>
                <p class="transactsmall color2">First Name</p>
                <h4 class="review_big">John</h4>
              </div>
              <div>
                <p class="transactsmall color2">Phone Number</p>
                <h4 class="review_big">07066647635</h4>
              </div>
            </div>

            <div class="right">
              <div>
                <p class="transactsmall color2">Last Name</p>
                <h4 class="review_big">Chimaobi</h4>
              </div>
              <div>
                <p class="transactsmall color2">Location</p>
                <h4 class="review_big">Lagos, Nigeria</h4>
              </div>
            </div>
          </div>
        </div>

        <q-separator />

        <div class="logout q-pt-lg">
          <q-btn no-wrap no-caps class="review_big" flat>
            <i class="fa-solid q-mr-sm fa-right-from-bracket"></i> Logout
          </q-btn>
        </div>
      </div>

      <div v-if="viewMode === 'security'" class="security_tab">
        <div style="gap: 1rem" class="row items-center no-wrap">
          <div class="icon"><img src="/images/keyp.svg" alt="" /></div>

          <div>
            <h4 class="review_big">Transaction Pin</h4>
            <p class="transactsmall color2">Change your transaction pin</p>
          </div>
        </div>

        <q-separator />
        <div style="gap: 1rem" class="row items-center no-wrap">
          <div class="icon"><img src="/images/passw.svg" alt="" /></div>

          <div>
            <h4 class="review_big">Login Password</h4>
            <p class="transactsmall color2">Change your login password</p>
          </div>
        </div>
      </div>
      <div v-if="viewMode === 'help'" class="health_tab">
        <p class="review_small bold">Tell us how we can help</p>
        <div class="grid_">
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon"><i class="fa-solid fa-comment-dots"></i></div>

            <div>
              <h4 class="review_big">Chat with us</h4>
              <p class="transactsmall color2">Start a converstation now!</p>
            </div>
          </div>

          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon"><i class="fa-brands fa-facebook"></i></div>

            <div>
              <h4 class="review_big">Facebook</h4>
              <p class="transactsmall color2">Contact us on Facebook</p>
            </div>
          </div>
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon"><i class="fa-solid fa-circle-info"></i></div>

            <div>
              <h4 class="review_big">FAQs</h4>
              <p class="transactsmall color2">
                Find intelligent answers instantly
              </p>
            </div>
          </div>
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon"><i class="fa-brands fa-x-twitter"></i></div>

            <div>
              <h4 class="review_big">Twitter</h4>
              <p class="transactsmall color2">Follow us on Twitter</p>
            </div>
          </div>
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon"><i class="fa-solid fa-envelope"></i></div>

            <div>
              <h4 class="review_big">Email us</h4>
              <p class="transactsmall color2">
                Get solutions beamed to your inbox
              </p>
            </div>
          </div>
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon">
              <i class="fa-brands fa-square-instagram"></i>
            </div>

            <div>
              <h4 class="review_big">Instagram</h4>
              <p class="transactsmall color2">Follow us on Instagram</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="viewMode === 'reviews'" class="reviews_tab">
        <div
          v-for="n in 5"
          :key="n"
          style="gap: 1rem"
          class="row items-center justify-between no-wrap"
        >
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="icon">
              <img src="/images/reviews.svg" alt="" />
              <img src="/images/tick.svg" class="tick" alt="" />
            </div>

            <div>
              <h4 class="review_big">
                Francesca20 <span class="text-h6 text-weight-bold">.</span> Buy
                Data - MTN Online
              </h4>
              <p class="transactsmall color2">
                Aut sunt tempore eligendi. Eum corrupti voluptatem et qui
                excepturi officia. Debitis quae voluptates dolorum tempora
                laborum blanditiis ut fugiat. Consectetur perferendis sed et
                molestiae consequuntur culpa.
              </p>
            </div>
          </div>
          <p style="gap: 1rem" class="row hour_ago_span items-center no-wrap">
            <span class="review_small bold color"
              ><q-rating
                v-model="model"
                max="1"
                size="1.5em"
                color="orange"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
                no-dimming
              />
              4.6</span
            >
            <span>1 hour ago</span>
          </p>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMyAuthStore } from "src/stores/auth";
let store = useMyAuthStore();
let viewMode = ref("personal");
let model = ref(1);
const setViewMode = (view) => {
  viewMode.value = view;
};
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
