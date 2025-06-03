<template>
  <div class="q-ma-lg">
    <q-table
      title="Operating areas"
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
          @click="createOperatingAreaModal = !createOperatingAreaModal"
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
            <q-btn
              dense
              class="q-mr-sm"
              color="green-10"
              size="md"
              no-caps
              no-wrap
              @click="editDataFcn(props.row)"
              >Edit
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
      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <span> {{ message }} </span>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="createOperatingAreaModal">
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
              {{ !editState ? "Create" : "Edit" }} operating area
            </div>
            <div class="div">
              <div class="bill">
                <div class="form_area">
                  <div class="auth">
                    <form id="addAssetForm" @submit.prevent="submit">
                      <div class="">
                        <div class="">
                          <div class="input_wrap">
                            <div class="input row item-center no-wrap">
                              <input
                                v-model="data.operating_area"
                                type="text"
                                required
                                placeholder="Name"
                              />
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
                            {{ !editState ? "Create" : "Edit" }}
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
    name: "name",
    required: true,
    label: "Area name",
    align: "left",
    field: "name",
    sortable: true,
  },

  {
    name: "created_at",
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
      title: "Operating area",
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
      createOperatingAreaModal: false,
      editState: false,
      togglePass: false,
      data: {},

      image: null,
      viewDialog: false,
      create_memberDialog: false,

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
    editDataFcn(data) {
      this.editState = true;
      this.createOperatingAreaModal = true;
      this.editId = data.id;
    },

    onRequest(props) {
      this.loading = true;
      const url = `operating_areas`;
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
        message: `Are you sure you want to delete this area?...`,
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
            .delete(`admin/delete-operating-area?operating_area_id=${data.id}`)
            .then((response) => {
              console.log(response);
              this.refreshPage();
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
    submit() {
      this.loading = true;
      if (this.editState) {
        api
          .put(`admin/update-operating-area?operating_area_id=${this.editId}`, {
            ...this.data,
          })
          .then((response) => {
            Notify.create({
              message: response.data.message,
              color: "green",
              position: "top",
              actions: [{ icon: "close", color: "white" }],
            });
            console.log(response);
            this.loading = false;
            this.data = {};
            this.createOperatingAreaModal = false;
            this.editId = "";
            this.editState = false;
            this.refreshPage();
          })
          .catch(({ response }) => {
            // console.log(response);
            this.loading = false;

            Notify.create({
              message: response.data.message,
              color: "red",
              position: "top",
              actions: [{ icon: "close", color: "white" }],
            });
          });
      } else {
        api
          .post("admin/create-operating-area", {
            ...this.data,
          })
          .then((response) => {
            Notify.create({
              message: response.data.message,
              color: "green",
              position: "top",
              actions: [{ icon: "close", color: "white" }],
            });
            console.log(response);
            this.loading = false;
            this.data = {};
            this.createOperatingAreaModal = false;
            this.refreshPage();
          })
          .catch(({ response }) => {
            // console.log(response);
            this.loading = false;

            Notify.create({
              message: response.data.message,
              color: "red",
              position: "top",
              actions: [{ icon: "close", color: "white" }],
            });
          });
      }
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
