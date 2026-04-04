<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "../../components/DataTable.vue";

const router = useRouter();
const reports = ref([]);
const loading = ref(true);

const columns = [
  { key: "title", label: "Title" },
  { key: "location", label: "Location" },
  { key: "severity", label: "Severity" },
  { key: "status", label: "Status" },
  { key: "occurred_at", label: "Date" },
];

// TODO: fetch from /api/reports
onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Accident Reports</h1>
      <button @click="router.push('/user/reports/new')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700">
        + Submit Report
      </button>
    </div>
    <DataTable :columns="columns" :rows="reports" :loading="loading" @delete="() => {}" />
  </div>
</template>
