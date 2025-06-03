<template>
  <div class="admin_auth">
    <div class="form_area">
      <div style="padding-top: 0" class="auth">
        <div class="row justify-center">
          <img style="max-width: 100px" src="/images/rider.png" alt="" />
        </div>
        <p class="">Create your account</p>
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="form_area">
            <div class="auth">
              <div
                class="column profile_image_upload q-my-md justify-center items-center"
              >
                <div
                  v-if="!logoUrlValue"
                  :class="editState ? 'styleEditStateImage' : ''"
                >
                  <img
                    style="width: 80px; height: 80px; object-fit: cover"
                    src="/images/image.png"
                    alt=""
                  />
                </div>
                <div v-else :class="editState ? 'styleEditStateImage' : ''">
                  <img
                    style="
                      width: 80px;
                      height: 80px;
                      border-radius: 50%;
                      object-fit: cover;
                    "
                    :src="logoUrlValue"
                  />
                </div>
                <i
                  v-if="editState"
                  class="fa-solid q-ml-sm fa-pen-to-square"
                ></i>

                <q-file
                  @update:model-value="setFile"
                  accept=".jpg,.png,.svg,.jpeg"
                  class="authUpload text-center"
                  label="Click to upload image"
                  v-model="profile_image"
                />
              </div>

              <form id="addAssetForm" @submit.prevent="submit">
                <div class="">
                  <div class="grid">
                    <div class="input_wrap">
                      <div class="input row item-center no-wrap">
                        <input
                          v-model="data.fullname"
                          type="text"
                          required
                          placeholder="Vendor name"
                        />
                      </div>
                    </div>
                    <div class="input_wrap">
                      <div class="input row item-center no-wrap">
                        <input
                          v-model="data.email"
                          type="email"
                          required
                          placeholder="Vendor email"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="grid">
                    <div class="input_wrap">
                      <div class="input row item-center no-wrap">
                        <input
                          v-model="data.phone_number"
                          type="text"
                          required
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                    <div class="input_wrap">
                      <div class="input row item-center no-wrap">
                        <input
                          v-model="data.username"
                          type="text"
                          required
                          placeholder="Username"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="input_wrap">
                    <div class="row justify-between">
                      <label for=""> Password</label>
                    </div>

                    <div class="input row items-center justify-between no-wrap">
                      <input
                        v-model="data.password"
                        placeholder="Enter password"
                        :type="!togglePass ? 'password' : 'text'"
                      />
                      <q-btn
                        @click="togglePass = !togglePass"
                        flat
                        :icon="
                          togglePass
                            ? 'fa-solid fa-eye'
                            : 'fa-solid fa-eye-slash'
                        "
                      />
                    </div>
                  </div>
                  <div
                    style="gap: 0.5rem"
                    class="row justify-end no-wrap q-mt-md"
                  >
                    <q-btn
                      v-if="data.operating_area.length > 0"
                      color="green-7"
                      no-caps
                      no-wrap
                      @click="addOperatingArea"
                      >Add area</q-btn
                    >
                    <q-btn
                      v-if="data.operating_area.length > 0"
                      color="red"
                      no-caps
                      no-wrap
                      type="button"
                      @click="removeOperatingArea(index)"
                      >Remove area</q-btn
                    >
                  </div>
                  <div
                    v-for="(plan, index) in data.operating_area"
                    :key="index"
                  >
                    <h3 class="text-h5">Area {{ index + 1 }}</h3>

                    <div class="grid">
                      <div class="input_wrap">
                        <label for="area">Area name:</label>
                        <div class="input">
                          <select v-model="plan.area">
                            <option
                              v-for="(area, index) in areasArr"
                              :key="index"
                              :value="area.name"
                            >
                              {{ area.name }}
                            </option>
                          </select>
                          <!-- <input type="text" v-model="plan.area" required /> -->
                        </div>
                      </div>
                      <div class="input_wrap">
                        <label for="price">Price:</label>
                        <div class="input">
                          <input type="text" v-model="plan.price" required />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style="position: sticky; bottom: 0%"
                  class="q-py-md q-px-sm bg-white"
                >
                  <div
                    style="gap: 1rem"
                    class="q-mt-sm q-mx-md row text-center no-wrap justify-center"
                  >
                    <q-btn
                      class="q-mt-sm full-width"
                      color="primary"
                      no-wrap
                      @click="registerUser"
                      type="submit"
                      :loading="loading"
                      no-caps
                    >
                      Create
                    </q-btn>
                  </div>
                </div>
              </form>
              <p>
                Already have an account?
                <router-link
                  style="text-decoration: underline"
                  class="text-black"
                  :to="{ name: 'login' }"
                >
                  Login
                </router-link>
              </p>
            </div>
          </div>
        </q-card-section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { Notify } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
let store = useMyAuthStore();
let router = useRouter();
let data = ref({ operating_area: [{ price: "", area: "" }] });
let loading = ref(false);
let modelV = ref(null);
let errors = ref({});
let progress = ref("signUp");
let togglePass = ref(false);
let toggleConfirmPass = ref(false);
let editState = ref(false);
let password_confirmation = ref("");
let logoUrlValue = ref("");
let logo_image = ref(null);
let areasArr = ref([]);
let profile_image = ref(null);

function formatPhoneNumber(phoneNumber) {
  // Check if the phone number starts with a zero
  if (phoneNumber.startsWith("0")) {
    // Remove the leading zero and add the country code
    return "+234" + phoneNumber.slice(1);
  }

  // If the phone number doesn't start with a zero, return it as is
  return phoneNumber;
}

const addOperatingArea = () => {
  data.value.operating_area.push({
    price: "",
    area: "",
  });
};
const removeOperatingArea = (index) => {
  if (data.value.operating_area.length < 2) {
    Notify.create({
      message: "You must add at least one area",
      color: "red-7",
      position: "top",
    });
  } else {
    data.value.operating_area.splice(index, 1);
  }
};

const setFile = (props) => {
  logo_image.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    logoUrlValue.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const registerUser = () => {
  if (data.value.operating_area.length < 1) {
    Notify.create({
      message: "You need to create at least one operating area",
      position: "top",
      color: "red",
    });
  } else if (profile_image.value === null) {
    Notify.create({
      message: "You need to upload a Logo file",
      position: "top",
      color: "red",
    });
  } else {
    loading.value = true;
    api
      .post(
        "auth/vendor-register",
        {
          ...data.value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        loading.value = false;
        data.value = { operating_area: [{ price: "", area: "" }] };
        store.typeOfPersonnel === "vendor";
        profile_image.value = null;
        store.setUserDetails(response.data);
        router.replace({ name: "dashboard" });
        Notify.create({
          message: "Vendor successfully created",
          color: "green",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      })
      .catch(({ response }) => {
        // console.log(response);
        loading.value = false;

        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  }
};

let getOperatingAreas = () => {
  const url = `operating_areas`;
  api
    .get(url)
    .then(({ data }) => {
      console.log(data);
      areasArr.value = data.data;
    })
    .catch(({ response }) => {});
};
// const setFile = (props) => {
//   data.value.profile_image = props;
//   var reader = new FileReader();
//   reader.onload = (e) => {
//     modelV.value = e.target.result;
//   };
//   reader.readAsDataURL(props);
// };

onMounted(() => {
  getOperatingAreas();
});
</script>

<style lang="scss" scoped></style>
