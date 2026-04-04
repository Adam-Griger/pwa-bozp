<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import DataTable from "../../components/DataTable.vue";

const router = useRouter();
const accounts = ref([]);
const loading = ref(true);

const columns = [
  { key: "pid", label: "PID" },
  { key: "full_name", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "created_at", label: "Created" },
  { key: "company_name", label: "Company Name" },
];

async function fetchAccounts() {
  loading.value = true;
  const token = localStorage.getItem("token");
  const { data } = await axios.get("http://localhost:3000/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  accounts.value = data;
  loading.value = false;
}

async function handleDelete(id) {
  if (!confirm("Delete this user?")) return;
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:3000/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  await fetchAccounts();
}

onMounted(fetchAccounts);
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Accounts</h1>
      <button @click="router.push('/admin/accounts/add')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700">
        + Add User
      </button>
    </div>

    <DataTable :columns="columns" :rows="accounts" :loading="loading" @delete="handleDelete" />
  </div>
</template>
