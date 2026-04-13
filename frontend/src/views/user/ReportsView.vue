<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import DataTable from "../../components/DataTable.vue";
import { formatDate } from "../../utils/format.js";
import { authHeaders } from "../../utils/authHeader";

const router = useRouter();
const reports = ref([]);
const loading = ref(true);
const error = ref("");

const columns = [
  { key: "title", label: "Názov" },
  { key: "location", label: "Poloha" },
  { key: "severity", label: "Závažnosť" },
  { key: "status", label: "Stav" },
  { key: "assigned_to_name", label: "Zodpovedný zamestnanec" },
  { key: "occurred", label: "Dátum" },
];

onMounted(async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/reports", {
      headers: authHeaders(),
    });
    reports.value = data.map((r) => ({ ...r, occurred: formatDate(r.occurred_at) }));
  } catch {
    error.value = "Nepodarilo sa načítať záznamy.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Záznamy o incidentoch</h1>
      <button @click="router.push('/user/reports/new')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700">
        + Pridať incident
      </button>
    </div>
    <p v-if="error" class="text-sm text-red-600 mb-4">{{ error }}</p>
    <DataTable
      :columns="columns"
      :rows="reports"
      :loading="loading"
      @edit="(id) => router.push(`/user/reports/${id}`)"
      @delete="() => {}"
      :edit-label="'Detail'"
      :show-delete="false"
    />
  </div>
</template>
