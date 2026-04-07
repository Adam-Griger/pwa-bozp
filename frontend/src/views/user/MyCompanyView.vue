<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "../../composables/useAuth.js";
import { formatDate } from "../../utils/format.js";

const { getUserId } = useAuth();

const company = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/api/companies/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    company.value = res.data;
  } catch (err) {
    error.value = "Failed to load company information.";
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div class="max-w-2xl space-y-6">
    <h1 class="text-xl font-semibold text-gray-800">My Company</h1>

    <div v-if="loading" class="text-sm text-gray-400">Loading...</div>

    <div v-if="error" class="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
      {{ error }}
    </div>

    <template v-if="company">
      <!-- Company Information -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Company Information</h2>
        <div class="space-y-4">
          <div class="flex justify-between py-3 border-b border-gray-100">
            <span class="text-sm text-gray-500">Company Name</span>
            <span class="text-sm font-medium text-gray-900">{{ company.company_name || "-" }}</span>
          </div>
          <div class="flex justify-between py-3 border-b border-gray-100">
            <span class="text-sm text-gray-500">ICO</span>
            <span class="text-sm font-medium text-gray-900">{{ company.ico || "-" }}</span>
          </div>
          <div class="flex justify-between py-3 border-b border-gray-100">
            <span class="text-sm text-gray-500">Address</span>
            <span class="text-sm font-medium text-gray-900">{{ company.address || "-" }}</span>
          </div>
          <div class="flex justify-between py-3 border-b border-gray-100">
            <span class="text-sm text-gray-500">Manager</span>
            <span class="text-sm font-medium text-gray-900">{{ company.manager_name || "-" }}</span>
          </div>
          <div class="flex justify-between py-3 border-b border-gray-100">
            <span class="text-sm text-gray-500">Total Employees</span>
            <span class="text-sm font-medium text-gray-900">{{ company.employee_count ?? "-" }}</span>
          </div>
          <div class="flex justify-between py-3">
            <span class="text-sm text-gray-500">Registered on</span>
            <span class="text-sm text-gray-900">{{ formatDate(company.created_at) }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
