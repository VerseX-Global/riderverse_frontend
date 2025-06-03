<template>
  <div class="q-ma-lg">
    <q-table
      title="All Users"
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
        <q-btn
          color="primary"
          label="Create"
          no-caps
          no-wrap
          class="export q-mx-sm"
          padding="xs"
          @click="createUserModal = !createUserModal"
        />
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
            <!-- <q-btn
              dense
              class="q-mr-sm"
              color="yellow-10"
              size="md"
              no-caps
              no-wrap
              :loading="loaders.save[props]"
              @click="viewDataFcn(props.row)"
              >View
            </q-btn> -->
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
      title: "All Users",
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
      createUserModal: false,
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
    onRequest(props) {
      this.loading = true;
      const url = `admin/all-users`;
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
    setFile(props) {
      this.logo_image = props;
      var reader = new FileReader();
      reader.onload = (e) => {
        this.logoUrlValue = e.target.result;
      };
      reader.readAsDataURL(props);
    },
    deleteBtn(data) {
      Dialog.create({
        title: "Prompt",
        message: `Are you sure you want to delete this user?...`,
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
            .delete(`admin/delete-use?user_id=${data.id}`)
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
