<script setup>
import { ref, onMounted } from "vue";

const courses = ref([]);
const employees = ref([]);
const selectedCourse = ref("");
const selectedEmployee = ref("");
const loading = ref(true);

// TODO: fetch courses and employees
onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-xl font-semibold text-gray-800 mb-6">Assign Course</h1>

    <form class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Course <span class="text-red-500">*</span></label>
        <select
          v-model="selectedCourse"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none bg-white"
        >
          <option value="" disabled>Select a course</option>
          <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.title }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Employee <span class="text-red-500">*</span></label>
        <select
          v-model="selectedEmployee"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none bg-white"
        >
          <option value="" disabled>Select an employee</option>
          <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.full_name }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
        <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none" />
      </div>

      <button type="submit" class="w-full py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700">Assign Course</button>
    </form>
  </div>
</template>
