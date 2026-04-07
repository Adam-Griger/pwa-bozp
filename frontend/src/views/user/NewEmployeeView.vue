<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import CredentialsCard from "../../components/CredentialsCard.vue";
import { useAuth } from "../../composables/useAuth";

const { getCompanyId } = useAuth();
const router = useRouter();

const form = ref({ fullname: "", email: "" });
const errors = ref({});
const error = ref("");
const loading = ref(false);
const result = ref(null);

function validate() {
  errors.value = {};
  if (!form.value.fullname.trim()) errors.value.fullname = "Required";
  if (!form.value.email.trim()) errors.value.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) errors.value.email = "Invalid email";
  return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
  error.value = "";
  if (!validate()) return;

  loading.value = true;
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/users",
      { fullname: form.value.fullname, email: form.value.email, role: "employee", companyId: getCompanyId() },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    result.value = data;
  } catch (e) {
    error.value = e.response?.data?.error || "Something went wrong.";
  } finally {
    loading.value = false;
  }
}

function reset() {
  form.value = { fullname: "", email: "" };
  result.value = null;
  error.value = "";
  errors.value = {};
}
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-xl font-semibold text-gray-800 mb-6">Add Employee</h1>

    <!-- Success -->
    <div v-if="result" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="font-semibold text-gray-900">Employee added successfully</p>
          <p class="text-sm text-gray-500">{{ result.user.full_name }}</p>
        </div>
      </div>

      <CredentialsCard title="Employee credentials — save these now" :pid="result.user.pid" :plain-password="result.plainPassword" class="mb-6" />

      <div class="flex gap-3">
        <button @click="reset" class="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">Add Another</button>
        <button @click="router.push('/user/employees')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700">
          View Employees
        </button>
      </div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name <span class="text-red-500">*</span></label>
        <input
          v-model="form.fullname"
          type="text"
          placeholder="Jan Novák"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
        />
        <p v-if="errors.fullname" class="text-xs text-red-500 mt-1">{{ errors.fullname }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
        <input
          v-model="form.email"
          type="email"
          placeholder="jan.novak@company.cz"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
        />
        <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
      </div>

      <p class="text-xs text-gray-400 flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Employee will be added to your company. Password and PID auto-generated.
      </p>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50"
      >
        {{ loading ? "Adding..." : "Add Employee" }}
      </button>
    </form>
  </div>
</template>
