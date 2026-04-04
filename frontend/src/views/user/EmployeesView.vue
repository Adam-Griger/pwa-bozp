<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "../../components/DataTable.vue";

const router = useRouter();
const employees = ref([]);
const loading = ref(true);

const columns = [
  { key: "pid", label: "PID" },
  { key: "full_name", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "created_at", label: "Joined" },
];

// TODO: fetch from /api/company/employees
onMounted(() => {
  loading.value = false;
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
    <DataTable :columns="columns" :rows="employees" :loading="loading" @delete="() => {}" />
  </div>
</template>
