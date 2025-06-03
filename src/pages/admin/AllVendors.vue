<template>
  <div class="q-ma-lg">
    <q-table
      title="Vendor companies"
      :rows="rows"
      :hide-header="mode === 'grid'"
      :columns="columns"
      class="sort_tables"
      row-key="id"
      :grid="mode == 'grid'"
      :filter="filter"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
    >
      <template v-slot:top-right="props">
        <!-- <q-btn
          color="primary"
          label="Create"
          no-caps
          no-wrap
          class="export q-mx-sm"
          padding="xs"
          @click="createVendorModal = !createVendorModal"
        /> -->
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
            {{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
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

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          class="export"
          padding="xs"
          v-if="rows.length"
          @click="exportTable"
        />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn
              dense
              class="q-mr-sm"
              color="yellow-10"
              size="md"
              no-caps
              no-wrap
              :loading="loaders.save[props]"
              @click="viewDataFcn(props.row)"
              >View
            </q-btn>
            <q-btn
              dense
              class="q-mr-sm"
              color="red-10"
              size="md"
              no-caps
              no-wrap
              :loading="loaders.save[props]"
              @click="deleteBtn(props.row)"
              >Delete
            </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-profile_image="props">
        <q-td :props="props">
          <q-avatar>
            <img
              style=""
              :src="
                props.row.profile_image
                  ? props.row.profile_image
                  : '/images/users.svg'
              "
              alt=""
            />
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <span> {{ message }} </span>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="createVendorModal">
      <q-scroll-area style="height: 90vh; width: 100%">
        <q-card class="edit_card">
          <q-card-section>
            <div class="text-h6">
              <q-btn
                round
                flat
                style="position: relative; z-index: 4"
                dense
                icon="close"
                class="float-right"
                color="grey-8"
                v-close-popup
              ></q-btn>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-h4 q-mb-md text-weight-bold">
              Create vendor company
            </div>
            <div class="div">
              <div class="bill">
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
                          style="width: 120px; height: 120px; object-fit: cover"
                          src="/images/image.png"
                          alt=""
                        />
                      </div>
                      <div
                        v-else
                        :class="editState ? 'styleEditStateImage' : ''"
                      >
                        <img
                          style="
                            width: 120px;
                            height: 120px;
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
                        class="authUpload q-mt-sm"
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
                                type="text"
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

                          <div
                            class="input row items-center justify-between no-wrap"
                          >
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
                                <input
                                  type="text"
                                  v-model="plan.area"
                                  required
                                />
                              </div>
                            </div>
                            <div class="input_wrap">
                              <label for="price">Price:</label>
                              <div class="input">
                                <input
                                  type="text"
                                  v-model="plan.price"
                                  required
                                />
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
                            type="submit"
                            :loading="loading"
                            no-caps
                          >
                            Create
                          </q-btn>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-scroll-area>
    </q-dialog>

    <q-dialog v-model="viewDialog">
      <q-card style="width: 80%" class="q-pa-lg">
        <h4 class="text-h3">Info</h4>

        <div class="q-mt-md">
          <p class="text-h5">Full Name: {{ viewDataObj.fullname }}</p>
          <p class="text-h5 q-mt-sm">Email: {{ viewDataObj.email }}</p>
        </div>

        <h6 class="text-h5 q-mt-lg">Areas</h6>
        <q-list separator bordered class="">
          <q-item
            v-for="(areas, index) in JSON.parse(viewDataObj.operating_areas)"
            :key="index"
            clickable
          >
            <q-item-section>
              <q-item-label>{{ areas.area }}</q-item-label>
              <q-item-label caption lines="2" style="font-size: 1rem"
                >NGN {{ areas.price }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  Dialog,
  exportFile,
  Loading,
  Notify,
  QSpinnerOval,
  useMeta,
} from "quasar";
import { api } from "src/boot/axios";
const columns = [
  {
    name: "profile_image",
    required: true,
    label: "Profile Image",
    align: "left",
    field: "profile_image",
    sortable: true,
  },
  {
    name: "fullname",
    required: true,
    label: "Full name",
    align: "left",
    field: "fullname",
    sortable: true,
  },
  {
    name: "phone_number",
    required: true,
    label: "Phone number",
    align: "left",
    field: "phone_number",
    sortable: true,
  },

  {
    name: "createdAt",
    required: true,
    label: "Created At",
    align: "left",
    field: (row) =>
      new Date(row.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    sortable: true,
  },
  {
    name: "actions",
    required: true,
    label: "Actions",
    align: "left",
    field: (row) => row.id,
    sortable: true,
  },
];
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}
export default {
  setup() {
    useMeta({
      title: "Vendor Companies",
    });
  },
  data() {
    return {
      columns,
      title: "",
      selected: [],
      rows: [],
      errors: {},
      viewDataObj: {},
      logoUrlValue: "",
      logo_image: null,
      profile_image: null,
      logoUrl: "",
      createVendorModal: false,
      editState: false,
      togglePass: false,
      data: {
        operating_area: [{ price: "", area: "" }],
      },
      image: null,
      viewDialog: false,
      create_memberDialog: false,
      editstate: false,
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 50,
      },
      filter: "",
      curl: "",
      separator: "",
      mode: "list",
      role: "personels",
      editId: "",
      loading: false,
      loaders: {
        delete: false,
        category: false,
        deleteBtn: [],
        save: [],
      },
    };
  },
  computed: {},
  mounted() {
    this.onRequest({});
  },
  methods: {
    viewDataFcn(data) {
      this.viewDataObj = data;
      this.viewDialog = true;
    },
    onRequest(props) {
      this.loading = true;
      const url = `admin/all-vendors`;
      this.curl = url;
      api
        .get(url)
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.rows = data.data;
        })
        .catch(({ response }) => {
          this.loading = false;
          this.rows = [];
        });
    },

    deleteBtn(data) {
      Dialog.create({
        title: "Prompt",
        message: `Are you sure you want to delete this vendor?...`,
        cancel: true,
        ok: {
          push: true,
          label: "Okay",
          color: "green",
        },

        persistent: true,
      })
        .onOk(() => {
          api
            .delete(`admin/delete-vendor?vendor_id=${data.id}`)
            .then((response) => {
              console.log(response);

              Notify.create({
                message: response.data.message,
                color: "green",
                position: "top",
              });

              Loading.hide();
            })
            .catch(({ response }) => {
              console.log(response);
              Notify.create({
                message: response.data.message,
                color: "red",
                position: "top",
                actions: [{ icon: "close", color: "white" }],
              });
            });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    refreshPage() {
      if (this.curl !== "") {
        this.loading = true;
        this.$api
          .get(this.curl)
          .then(({ data }) => {
            this.loading = false;
            this.rows = data.data;
            // console.log(data);
          })
          .catch(({ response }) => {
            // console.log(response);
            this.loading = false;
            this.rows = [];
          });
      }
    },

    exportTable() {
      // naive encoding to csv format
      // const fieldsToInclude = ["fullname", "specialization", "practice_id"];
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.rows.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");
      const status = exportFile(`Personnel`, content, "text/csv");
      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}

p {
  margin-bottom: 0;
}
</style>
