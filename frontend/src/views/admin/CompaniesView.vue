<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import DataTable from "../../components/DataTable.vue";
import { formatDate } from "../../utils/format.js";
import { authHeaders } from "../../utils/authHeader";

const router = useRouter();
const companies = ref([]);
const loading = ref(true);

const columns = [
  { key: "company_name", label: "Názov spoločnosti" },
  { key: "ico", label: "IČO" },
  { key: "address", label: "Adresa" },
  { key: "created", label: "Dátum vytvorenia" },
];

async function fetchCompanies() {
  loading.value = true;
  const { data } = await axios.get("http://localhost:3000/api/companies", {
    headers: authHeaders(),
  });
  companies.value = data.map((c) => ({ ...c, created: formatDate(c.created_at) }));
  loading.value = false;
}

async function handleDelete(id) {
  if (!confirm("Delete this company?")) return;
  await axios.delete(`http://localhost:3000/api/companies/${id}`, {
    headers: authHeaders(),
  });
  await fetchCompanies();
}

onMounted(fetchCompanies);
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Spoločnosti</h1>
      <button @click="router.push('/admin/companies/add')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700">
        + Pridať spoločnosť
      </button>
    </div>
    <DataTable :columns="columns" :rows="companies" :loading="loading" @delete="handleDelete" />
  </div>
</template>
