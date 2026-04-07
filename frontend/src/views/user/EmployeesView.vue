<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import DataTable from "../../components/DataTable.vue";
import { formatDate } from "../../utils/format.js";

const router = useRouter();
const employees = ref([]);
const loading = ref(true);
const error = ref("");

const columns = [
  { key: "pid", label: "PID" },
  { key: "full_name", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "joined", label: "Joined" },
];

onMounted(async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/users/company", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    employees.value = data.map((e) => ({ ...e, joined: formatDate(e.created_at) }));
  } catch (err) {
    error.value = "Failed to load employees.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Employees</h1>
      <button @click="router.push('/user/employees/new')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700">
        + Add Employee
      </button>
    </div>
    <p v-if="error" class="text-sm text-red-600 mb-4">{{ error }}</p>
    <DataTable :columns="columns" :rows="employees" :loading="loading" @delete="() => {}" />
  </div>
</template>
