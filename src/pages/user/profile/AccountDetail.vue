<template>
    <q-pull-to-refresh @refresh="refresh">
      <div>
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
            Bank Deatils
          </h5>
        </div>
  
        <div class="container q-pt-lg">
        
            <q-table
                :rows="rows"
                :hide-header="mode === 'grid'"
                :columns="columns"
                row-key="id"
                :grid="mode == 'grid'"
                title="Bank Details"
                :filter="filter"
                class="sort_tables"
                :loading="loading"
                v-model:pagination="pagination"
                @request="onRequest"
            >
            <template v-slot:top-right="props">
              <q-input
                outlined
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
  
              <q-btn
                flat
                round
                dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                v-if="mode === 'list'"
              >
                <q-tooltip :disable="$q.platform.is.mobile">
                  {{
                    props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
                  }}
                </q-tooltip>
              </q-btn>
  
              <q-btn
                flat
                round
                dense
                :icon="mode === 'grid' ? 'list' : 'grid_on'"
                @click="
                  mode = mode === 'grid' ? 'list' : 'grid';
                  separator = mode === 'grid' ? 'none' : 'horizontal';
                "
                v-if="!props.inFullscreen"
              >
                <q-tooltip :disable="$q.platform.is.mobile">{{
                  mode === "grid" ? "List" : "Grid"
                }}</q-tooltip>
              </q-btn>
  
              <!-- <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            padding="xs"
            v-if="rows.length"
            @click="exportTable"
          /> -->
            </template>
  
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <div style="gap: 1rem" class="row no-wrap items-center">
                  <q-btn
                    :to="{ name: 'update.account.details' }"
                    no-caps
                    class="bg-green text-white"
                    dense
                    flat
                    size="md"
                  >
                    Edit
                  </q-btn>
                </div>
              </q-td>
            </template>
            <template v-slot:no-data="{ message }">
              <div class="full-width row flex-center text-negative q-gutter-sm">
                <span> {{ message }} </span>
              </div>
            </template>
          </q-table>
        </div>
      </div>
  
      
    </q-pull-to-refresh>
  </template>
  
  <script setup>
    import { Notify } from "quasar";
    import { api } from "src/boot/axios";
    import { useRouter } from "vue-router";
    import { ref, onMounted } from "vue";

    const router = useRouter();
    const rows = ref([]);
    const filter = ref("");
    const mode = ref("list");
    const loading = ref(false);
    const pagination = ref({
    sortBy: "id",
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 1 // Since we're getting a single record
    });

    const columns = [
    {
        name: "account_name",
        label: "Account Name",
        align: "left",
        field: row => row.account_name,
        sortable: true,
    },
    {
        name: "account_number",
        label: "Account Number",
        align: "left",
        field: row => row.account_number,
        sortable: true,
    },
    {
        name: "bank_name",
        label: "Bank Name",
        align: "left",
        field: row => row.bank_name,
        sortable: true,
    },
    {
        name: "actions",
        label: "Actions",
        align: "right",
        field: "actions",
        sortable: false,
    },
    ];

    const fetchBankDetails = async () => {
    try {
        loading.value = true;
        const response = await api.get("vendor/account-detail");
        
        if (response.data && response.data.data) {
        // Transform the single object into an array of one item
        rows.value = [{
            id: response.data.data.id,
            account_name: response.data.data.account_name,
            account_number: response.data.data.account_number,
            bank_name: response.data.data.bank_name,
            // Include any other fields you want to display
        }];
        } else {
        Notify.create({
            message: "No bank account details found",
            color: "info",
            position: "top"
        });
        rows.value = [];
        }
    } catch (error) {
        console.error("Error fetching bank details:", error);
        Notify.create({
        message: error.response?.data?.message || "Failed to load bank details",
        color: "red",
        position: "top"
        });
        rows.value = [];
    } finally {
        loading.value = false;
    }
    };

    const onRequest = async (props) => {
    pagination.value = props.pagination;
    await fetchBankDetails();
    };

    const refresh = (done) => {
    fetchBankDetails().finally(done);
    };

    onMounted(() => {
    fetchBankDetails();
    });
    </script>
    
    <style lang="scss" scoped>
    /* Your styles */
    </style>