<template>
  <q-page class="q-pb-xl">
    <div class="container q-pt-md">
      <div class="q-mb-lg">
        <q-btn
          no-caps
          no-wrap
          rounded
          :to="{ name: 'usercreate.order' }"
          color="primary"
          text-color="white"
        >
          Create new delivery request
        </q-btn>
      </div>
      <q-table
        :rows="rows"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="id"
        :grid="mode == 'grid'"
        title="Delivery History"
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
        <template v-slot:body-cell-package_image="props">
          <q-td :props="props">
            <div>
              <q-avatar size="52px">
                <img
                  style="object-fit: cover"
                  :src="
                    props.row.package_image
                      ? props.row.package_image
                      : '/images/user.svg'
                  "
                />
              </q-avatar>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div style="gap: 1rem" class="row no-wrap items-center">
              <q-btn
                :to="{
                  name: 'order-detail',
                  params: {
                    id: props.row.id,
                  },
                }"
                no-caps
                class="bg-primary text-white"
                dense
                flat
                size="md"
              >
                View
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
  </q-page>
</template>

<script setup>
import { Dialog } from "quasar";
import { api } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
let store = useMyAuthStore();
let rows = ref([]);
let filter = ref("");
let mode = ref("");
let loading = ref(false);
let curl = ref("");
let pagination = ref({
  sortBy: "id",
  descending: false,
  page: 1,
});
const columns = [
  {
    name: "package_name",
    required: true,
    label: "Package Name",
    align: "left",
    field: "package_name",
    sortable: true,
  },
  {
    name: "package_image",
    required: true,
    label: "Package Image",
    align: "left",
    field: "package_image",
    sortable: true,
  },

  {
    name: "pickup_location",
    required: true,
    label: "Pickup Location",
    align: "left",
    field: "pickup_location",
    sortable: true,
  },
  {
    name: "delivery_location",
    required: true,
    label: "Delivery Location",
    align: "left",
    field: "delivery_location",
    sortable: true,
  },
  {
    name: "estimated_delivery_price",
    required: true,
    label: "Estimated Price NGN",
    align: "left",
    field: "estimated_delivery_price",
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

const onRequest = () => {
  loading.value = true;
  const url = `user/view-all-delivery`;
  curl.value = url;
  api
    .get(url)
    .then((response) => {
      rows.value = response.data.data;
      console.log(response);
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};
const deleteRequest = (row) => {
  Dialog.create({
    title: "Delete",
    message: `Are you sure you want to delete this delivery request? this action is irreversible...`,
    persistent: true,
  })
    .onOk(() => {
      loading.value = true;
      api
        .delete(`user/delete-delivery/${row.id}`)
        .then((response) => {
          loading.value = false;
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

onMounted(async () => {
  try {
    onRequest();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
