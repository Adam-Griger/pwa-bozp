<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const tests = ref([]);
const employees = ref([]);
const form = ref({ testId: "", employeeId: "", deadline: "" });
const errors = ref({});
const error = ref("");
const loading = ref(true);
const submitting = ref(false);
const success = ref(false);

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
}

function validate() {
  errors.value = {};
  if (!form.value.testId) errors.value.testId = "Povinný údaj";
  if (!form.value.employeeId) errors.value.employeeId = "Povinný údaj";
  return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;
  submitting.value = true;
  error.value = "";
  try {
    await axios.post(
      "http://localhost:3000/api/tests/assign",
      { testId: form.value.testId, employeeId: form.value.employeeId, deadline: form.value.deadline || null },
      { headers: authHeaders() },
    );
    success.value = true;
  } catch (e) {
    error.value = e.response?.data?.error || "Niečo sa pokazilo.";
  } finally {
    submitting.value = false;
  }
}

function reset() {
  form.value = { testId: "", employeeId: "", deadline: "" };
  success.value = false;
  error.value = "";
}

onMounted(async () => {
  try {
    const [testsRes, empRes] = await Promise.all([
      axios.get("http://localhost:3000/api/tests", { headers: authHeaders() }),
      axios.get("http://localhost:3000/api/users/company", { headers: authHeaders() }),
    ]);
    tests.value = testsRes.data;
    employees.value = empRes.data;
  } catch {
    error.value = "Nepodarilo sa načítať dáta.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-xl font-semibold text-gray-800 mb-6">Priradiť test</h1>

    <div v-if="loading" class="text-sm text-gray-400">Načítavanie...</div>

    <!-- Success -->
    <div v-else-if="success" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="font-semibold text-gray-900">Test bol priradený</p>
          <p class="text-sm text-gray-500">Zamestnanec dostane test v sekcii eLearning.</p>
        </div>
      </div>
      <div class="flex gap-3">
        <button @click="reset" class="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">Priradiť ďalší test</button>
        <button @click="router.push('/user/elearning')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700">
          Zobraziť testy
        </button>
      </div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Test <span class="text-red-500">*</span></label>
        <select
          v-model="form.testId"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none bg-white"
        >
          <option value="" disabled>Vyberte test</option>
          <option v-for="t in tests" :key="t.id" :value="t.id">{{ t.name }}</option>
        </select>
        <p v-if="errors.testId" class="text-xs text-red-500 mt-1">{{ errors.testId }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Zamestnanec <span class="text-red-500">*</span></label>
        <select
          v-model="form.employeeId"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none bg-white"
        >
          <option value="" disabled>Vyberte zamestnanca</option>
          <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.full_name }}</option>
        </select>
        <p v-if="errors.employeeId" class="text-xs text-red-500 mt-1">{{ errors.employeeId }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
        <input
          v-model="form.deadline"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
        />
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <button
        type="submit"
        :disabled="submitting"
        class="w-full py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50"
      >
        {{ submitting ? "Priraďujem..." : "Priradiť test" }}
      </button>
    </form>
  </div>
</template>
