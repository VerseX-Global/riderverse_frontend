<template>
  <div class="q-ma-lg">
    <q-table
      title="All delivery"
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

      <template v-slot:body-cell-package_image="props">
        <q-td :props="props">
          <q-avatar>
            <img
              style=""
              :src="
                props.row.package_image
                  ? props.row.package_image
                  : '/images/users.svg'
              "
              alt=""
            />
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <span
            :class="
              props.row.status === 'Delivered'
                ? 'verified'
                : props.row.status === 'Pending'
                ? 'pending'
                : 'notverified '
            "
          >
            {{ props.row.status }}
          </span>
        </q-td>
      </template>
      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <span> {{ message }} </span>
        </div>
      </template>
    </q-table>

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
    name: "package_image",
    required: true,
    label: "Package Image",
    align: "left",
    field: "package_image",
    sortable: true,
  },
  {
    name: "package_name",
    required: true,
    label: "Name",
    align: "left",
    field: "package_name",
    sortable: true,
  },
  {
    name: "estimated_delivery_price",
    required: true,
    label: "Estimated delivery price",
    align: "left",
    field: (row) => `NGN ${row.estimated_delivery_price}`,
    sortable: true,
  },
  {
    name: "phone_number",
    required: true,
    label: "Phone number(recipient)",
    align: "left",
    field: "phone_number",
    sortable: true,
  },
  {
    name: "pickup_location",
    required: true,
    label: "Pickup location",
    align: "left",
    field: "pickup_location",
    sortable: true,
  },
  {
    name: "delivery_location",
    required: true,
    label: "Delivery location",
    align: "left",
    field: "delivery_location",
    sortable: true,
  },
  {
    name: "vendor",
    required: true,
    label: "Vendor",
    align: "left",
    field: (row) => row.vendor.fullname,
    sortable: true,
  },
  {
    name: "user",
    required: true,
    label: "User",
    align: "left",
    field: (row) => row.user.fullname,
    sortable: true,
  },

  // {
  //   name: "createdAt",
  //   required: true,
  //   label: "Created At",
  //   align: "left",
  //   field: (row) =>
  //     new Date(row.createdAt).toLocaleDateString("en-US", {
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //     }),
  //   sortable: true,
  // },
  {
    name: "status",
    required: true,
    label: "Status",
    align: "left",
    field: "status",
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
      title: "All Delivery",
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
      const url = `admin/all-deliveries`;
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
            .delete(`admin/delete-delivery?delivery_id=${data.id}`)
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
