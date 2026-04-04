<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import DataTable from "../../components/DataTable.vue";

const router = useRouter();
const companies = ref([]);
const loading = ref(true);

const columns = [
  { key: "company_name", label: "Company Name" },
  { key: "ico", label: "ICO" },
  { key: "address", label: "Address" },
  { key: "created_at", label: "Created" },
];

async function fetchCompanies() {
  loading.value = true;
  const token = localStorage.getItem("token");
  const { data } = await axios.get("http://localhost:3000/api/companies", {
    headers: { Authorization: `Bearer ${token}` },
  });
  companies.value = data;
  loading.value = false;
}

async function handleDelete(id) {
  if (!confirm("Delete this company?")) return;
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:3000/api/companies/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  await fetchCompanies();
}

onMounted(fetchCompanies);
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Companies</h1>
      <button @click="router.push('/admin/companies/add')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700">
        + Add Company
      </button>
    </div>
    <DataTable :columns="columns" :rows="companies" :loading="loading" @delete="handleDelete" />
  </div>
</template>
