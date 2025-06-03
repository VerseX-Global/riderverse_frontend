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
          Manage operating areas
        </h5>
      </div>

      <div class="container q-pt-lg">
        <div class="q-mb-lg">
          <q-btn
            v-if="
              store.userdetails.role === 'User' ||
              store.typeOfPersonnel === 'user'
            "
            no-caps
            no-wrap
            :to="{ name: 'create.delivery' }"
            color="primary"
            text-color="white"
          >
            Create new operating area
          </q-btn>
        </div>
        <q-table
          :rows="rows"
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="id"
          :grid="mode == 'grid'"
          title="Operating areas"
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
                  @click="showAddDialog = !showAddDialog"
                  no-caps
                  class="bg-blue text-white"
                  dense
                  flat
                  size="md"
                >
                  Create
                </q-btn>
                <q-btn
                  @click="toggleEdit(props.row)"
                  no-caps
                  class="bg-green text-white"
                  dense
                  flat
                  size="md"
                >
                  Edit
                </q-btn>
                <q-btn
                  @click="deleteRequest(props.row)"
                  no-caps
                  class="bg-red text-white"
                  dense
                  flat
                  size="md"
                >
                  Delete
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

    <q-dialog v-model="showAddDialog">
      <q-card class="q-pa-lg">
        <h3 class="text-h4 q-mb-lg text-weight-bold">
          {{ editState ? "Edit Area" : "Create Area" }}
        </h3>
        <form id="addAssetForm" @submit.prevent="submit">
          <div class="form_area">
            <div class="auth">
              <div class="grid">
                <div class="input_wrap">
                  <label for="area">Area name:</label>
                  <div class="input">
                    <select v-model="data.area">
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
                <div v-if="editState" class="input_wrap">
                  <label for="area">New Area name:</label>
                  <div class="input">
                    <select v-model="data.newArea">
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
                <div v-if="editState" class="input_wrap">
                  <label for="price">Price:</label>
                  <div class="input">
                    <input type="text" v-model="data.newPrice" required />
                  </div>
                </div>
                <div v-if="!editState" class="input_wrap">
                  <label for="price">Price:</label>
                  <div class="input">
                    <input type="text" v-model="data.price" required />
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
                    type="submit"
                    :loading="loading"
                    no-caps
                  >
                    {{ editState ? "Edit Area" : "Create Area" }}
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </form>
      </q-card>
    </q-dialog>
  </q-pull-to-refresh>
</template>

<script setup>
import { Dialog, Notify } from "quasar";
import { api } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
let store = useMyAuthStore();
let rows = ref([]);
let filter = ref("");
let mode = ref("");
let loading = ref(false);
let editState = ref(false);
let showAddDialog = ref(false);
let data = ref({});
let curl = ref("");
let areasArr = ref([]);
let pagination = ref({
  sortBy: "id",
  descending: false,
  page: 1,
});
const columns = [
  {
    name: "area",
    required: true,
    label: "Area",
    align: "left",
    field: "area",
    sortable: true,
  },
  {
    name: "price",
    required: true,
    label: "Price",
    align: "left",
    field: (row) => `NGN ${row.price}`,
    sortable: true,
  },

  {
    name: "actions",
    required: true,
    label: "",
    align: "left",
    field: (row) => row.id,
    sortable: false,
  },
];

const toggleEdit = (row) => {
  console.log(row);
  editState.value = true;
  data.value = {
    area: row.area,
    newPrice: row.price,
  };
  showAddDialog.value = true;
};
const onRequest = () => {
  loading.value = true;
  const url = `vendor/operating-area`;
  curl.value = url;
  api
    .get(url)
    .then((response) => {
      console.log(response);
      rows.value = response.data.operatingAreas;
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};
const deleteRequest = (row) => {
  console.log(row);
  Dialog.create({
    title: "Delete",
    message: `Are you sure you want to delete this operating area? this action is irreversible...`,
  })
    .onOk(() => {
      loading.value = true;
      api
        .delete(`vendor/delete-operating-area?area=${row.area}`)
        .then((response) => {
          loading.value = false;
          Notify.create({
            message: "Area deleted successfully",
            color: "green",
            position: "top",
          });
          onRequest();
        })
        .catch(({ response }) => {
          loading.value = false;
        });
    })
    .onCancel(() => {
      // console.log('I am triggered on both OK and Cancel')
      // signupData.value = {};
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

let submit = () => {
  if (editState.value) {
    loading.value = true;
    api
      .put("vendor/update-operating-area", data.value)
      .then(({ data }) => {
        console.log(data);
        Notify.create({
          message: "Area added successfully",
          color: "green",
          position: "top",
        });
        loading.value = false;
        editState.value = false;
        onRequest();
        showAddDialog.value = false;
      })
      .catch(({ response }) => {
        Notify.create({
          message: response.data.message
            ? response.data.message
            : response.data.error
            ? response.data.error
            : "Could not perform this action now, system busy",
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
        loading.value = false;
      });
  } else {
    loading.value = true;
    api
      .post("vendor/add-operating-area", data.value)
      .then(({ data }) => {
        console.log(data);
        Notify.create({
          message: "Area added successfully",
          color: "green",
          position: "top",
        });
        loading.value = false;
        editState.value = false;
        onRequest();
        showAddDialog.value = false;
      })
      .catch(({ response }) => {
        Notify.create({
          message: response.data.message
            ? response.data.message
            : response.data.error
            ? response.data.error
            : "Could not perform this action now, system busy",
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
        loading.value = false;
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
const refresh = (done) => {
  onRequest();
  done();
};
onMounted(async () => {
  try {
    onRequest();
    getOperatingAreas();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
