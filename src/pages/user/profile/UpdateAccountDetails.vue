<template>
  <div class="convertPage">
    <!-- Back Button -->
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

    <!-- Header -->
    <div style="box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px" class="q-pb-md">
      <h5 class="text-h4 text-black text-center text-weight-bold">
        Update Account Details
      </h5>
    </div>

    <!-- Form Card -->
    <div class="convertCard">
      <div class="div">
        <div class="bill">
          <div class="form_area">
            <div class="auth">
              <form id="addAssetForm" @submit.prevent="submit">
                <div class="limit">

                  <!-- Bank Select -->
                  <div class="input_wrap">
                    <label for="">Bank Name</label>
                      <q-select class="input row items-center justify-between no-wrap"
                        v-model="data.bank_code"
                        :options="banks"
                        option-value="code"
                        option-label="name"
                        emit-value
                        map-options
                        dense
                        outlined
                        required
                        label="Select Bank"
                      />
                  </div>

                  <!-- Account Number -->
                  <div class="input_wrap">
                    <label for="">Account Number</label>
                    <div class="input row items-center justify-between no-wrap">
                      <input
                        required
                        v-model="data.account_number"
                        placeholder="Enter account number"
                        type="text"
                      />
                    </div>
                  </div>

                  <!-- Account Name -->
                  <!-- Account Name Field -->
                  <div class="input_wrap">
                    <label>Account Name</label>
                    <div class="input row items-center justify-between no-wrap">
                      <input
                        v-model="data.account_name"
                        required
                        placeholder="Account name will appear here"
                        type="text"
                        readonly
                      />
                      <q-spinner
                        v-if="accountNameLoading"
                        class="q-ml-sm"
                        size="20px"
                        color="primary"
                      />
                      <i 
                        v-else-if="data.account_name"
                        class="fa-solid fa-check text-green q-ml-sm"
                      ></i>
                    </div>
                  </div>

                </div>

                <!-- Submit Button -->
                <div style="position: sticky; bottom: 0%" class="q-py-md q-px-sm bg-white">
                  <div
                    style="gap: 1rem"
                    class="q-mt-sm q-mx-md row text-center no-wrap justify-center"
                  >
                  <q-btn
                    class="q-mt-sm full-width"
                    color="primary"
                    no-wrap
                    type="submit"
                    :loading="loading"
                    no-caps
                    :disable="!isValid"
                  >
                    Update
                  </q-btn>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <q-dialog v-model="successModal">
      <q-card style="width: 350px" class="modal_card">
        <div class="column items-center justify-center">
          <img style="width: 100px" src="/images/success.svg" alt="" />
          <p class="text-center q-mt-md">
            You have successfully submitted your bank details
          </p>
          <div class="q-mt-md">
            <q-btn @click="proceed" color="primary" no-caps no-wrap>
              Continue
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

let router = useRouter();
let successModal = ref(false);
let loading = ref(false);
let accountNameLoading = ref(false); // New loading state for account name resolution
let banks = ref([]);
let debounceTimer = null;

let data = ref({
  bank_name: "",
  bank_code: "",
  account_name: "",
  account_number: "",
});

let isValid = ref(false);

onMounted(() => {
  fetchBanks();
});

const fetchBanks = async () => {
  try {
    const res = await api.get("/get-banks");
    banks.value = res.data.data;
  } catch (error) {
    Notify.create({
      message: "Failed to load banks",
      color: "red",
      position: "top",
    });
  }
};

// Watch for changes and debounce account name fetch
watch(
  () => [data.value.bank_code, data.value.account_number],
  ([bankCode, acctNum], [oldBankCode, oldAcctNum]) => {
    // Clear previous values if bank or account number changes
    if (bankCode !== oldBankCode || acctNum !== oldAcctNum) {
      data.value.account_name = "";
    }

    // Only make API call if we have all required data
    if (bankCode && acctNum && acctNum.length === 10) {
      // Clear any pending timeout
      clearTimeout(debounceTimer);
      
      // Set new timeout
      debounceTimer = setTimeout(() => {
        resolveAccountName(bankCode, acctNum);
      }, 800); // 0.8 second debounce
    }
  }
);

const resolveAccountName = async (bankCode, acctNum) => {
  accountNameLoading.value = true;
  try {
    const res = await api.post("/get-account-name", {
      bank_code: bankCode,
      account_number: acctNum,
    });

    // Ensure the response has the expected structure
    if (res.data && res.data.data) {
      data.value.account_name = res.data.data;
      isValid.value = true;
      
      Notify.create({
        message: "Account name verified successfully",
        color: "green",
        position: "top",
      });
    } else {
      throw new Error("Invalid account name response");
    }
  } catch (err) {
    data.value.account_name = "";
    isValid.value = false;
    
    Notify.create({
      message: err.response?.data?.message || "Could not verify account name",
      color: "red",
      position: "top",
    });
  } finally {
    accountNameLoading.value = false;
  }
};


const submit = async () => {
  // Validate that bank_name is not empty
  if (!data.value.bank_code) {
    Notify.create({
      message: "Please select a bank",
      color: "red",
      position: "top",
    });
    return;
  }

  loading.value = true;
  
  try {
    // Find the selected bank to get its name
    const selectedBank = banks.value.find(bank => bank.code === data.value.bank_code);
    
    // Update the bank_name in the data object
    if (selectedBank) {
      data.value.bank_name = selectedBank.name;
    }
    
    const response = await api.put("vendor/update-account-details", data.value);
    Notify.create({
      message: response.data.message,
      color: "green",
      position: "top",
    });
    successModal.value = true;
  } catch ({ response }) {
    const errorMessage = response?.data?.message
      ? Object.values(response.data.message).flat()
      : "Recheck your credentials";

    Notify.create({
      message: errorMessage,
      color: "red",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};

const proceed = () => {
  successModal.value = false; // Close modal first
  setTimeout(() => {
    router.push('/dashboard'); // Then navigate after a brief delay
  }, 300);
};



</script>

<style lang="scss" scoped>
/* Your styles here */
</style>
