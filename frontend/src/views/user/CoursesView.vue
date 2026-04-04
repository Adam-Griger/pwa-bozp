<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../../composables/useAuth.js";

const { getRole } = useAuth();
const isManager = getRole() === "manager";
const courses = ref([]);
const loading = ref(true);

// TODO: fetch from /api/courses
onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Courses</h1>
    </div>

    <div v-if="loading" class="text-gray-400 text-sm">Loading...</div>

    <div v-else-if="courses.length === 0" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-400 text-sm">
      No courses available yet.
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="course in courses"
        :key="course.id"
        class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between"
      >
        <div>
          <p class="font-medium text-gray-900">{{ course.title }}</p>
          <p class="text-sm text-gray-500 mt-0.5">{{ course.description }}</p>
        </div>
        <button v-if="isManager" class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Assign</button>
      </div>
    </div>
  </div>
</template>
