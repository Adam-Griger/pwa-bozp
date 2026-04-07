<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import CredentialsCard from "../../components/CredentialsCard.vue";

const router = useRouter();

const company = ref({ name: "", ico: "", address: "" });
const manager = ref({ fullname: "", email: "" });
const withManager = ref(false);
const loading = ref(false);
const error = ref("");
const result = ref(null); // holds created company + credentials after success
const errors = ref({});

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
}

function validate() {
  errors.value = {};
  if (!company.value.name.trim()) errors.value.name = "Required";
  if (!company.value.ico.trim()) errors.value.ico = "Required";
  if (withManager.value) {
    if (!manager.value.fullname.trim()) errors.value.fullname = "Required";
    if (!manager.value.email.trim()) errors.value.email = "Required";
  }
  return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
  error.value = "";
  if (!validate()) return;

  loading.value = true;
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/companies",
      { company: company.value, manager: withManager.value ? manager.value : null },
      { headers: authHeaders() },
    );
    result.value = data;
  } catch (e) {
    error.value = e.response?.data?.error || "Something went wrong.";
  } finally {
    loading.value = false;
  }
}

function reset() {
  company.value = { name: "", ico: "", address: "" };
  manager.value = { fullname: "", email: "" };
  withManager.value = false;
  result.value = null;
  error.value = "";
}
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-xl font-semibold text-gray-800 mb-6">Add Company</h1>

    <!-- Success result -->
    <div v-if="result" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="font-semibold text-gray-900">Company created successfully</p>
          <p class="text-sm text-gray-500">{{ result.company_name }}</p>
        </div>
      </div>

      <!-- Manager credentials if created -->
      <CredentialsCard
        v-if="result.manager"
        title="Manager credentials — save these now"
        :pid="result.manager.pid"
        :plain-password="result.plainPassword"
        class="mb-6"
      />

      <div class="flex gap-3">
        <button @click="reset" class="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">Add Another</button>
        <button @click="router.push('/admin/companies')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700">
          View Companies
        </button>
      </div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
      <!-- Company fields -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Company Name <span class="text-red-500">*</span></label>
          <input
            v-model="company.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="ACME s.r.o."
          />
          <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">ICO <span class="text-red-500">*</span></label>
          <input
            v-model="company.ico"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="12345678"
          />
          <p v-if="errors.ico" class="text-xs text-red-500 mt-1">{{ errors.ico }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            v-model="company.address"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Náměstí Svobody 12, Brno"
          />
          <p v-if="errors.address" class="text-xs text-red-500 mt-1">{{ errors.address }}</p>
        </div>
      </div>

      <!-- Toggle -->
      <div class="flex items-center justify-between py-4 border-t border-gray-100">
        <div>
          <p class="text-sm font-medium text-gray-700">Also create manager account</p>
          <p class="text-xs text-gray-400 mt-0.5">Auto-generates PID and password</p>
        </div>
        <button
          type="button"
          @click="withManager = !withManager"
          :class="withManager ? 'bg-gray-800' : 'bg-gray-200'"
          class="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 flex items-center"
        >
          <span :class="withManager ? 'ml-6' : 'ml-1'" class="w-4 h-4 bg-white rounded-full shadow transition-all duration-200" />
        </button>
      </div>

      <!-- Manager fields (animated open/close) -->
      <div v-if="withManager" class="space-y-4 pt-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Manager Full Name <span class="text-red-500">*</span></label>
          <input
            v-model="manager.fullname"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Jan Novák"
          />
          <p v-if="errors.fullname" class="text-xs text-red-500 mt-1">{{ errors.fullname }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Manager Email <span class="text-red-500">*</span></label>
          <input
            v-model="manager.email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="jan.novak@acme.cz"
          />
          <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
        </div>
        <p class="text-xs text-gray-400 flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Password and PID will be auto-generated and shown after creation.
        </p>
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50"
      >
        {{ loading ? "Creating..." : "Create Company" }}
      </button>
    </form>
  </div>
</template>
