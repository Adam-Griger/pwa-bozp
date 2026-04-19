<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../api/index.js";
import DataTable from "../../components/DataTable.vue";
import { formatDate } from "../../utils/format.js";

const router = useRouter();
const courses = ref([]);
const loading = ref(true);

const columns = [
  { key: "name", label: "Názov testu" },
  { key: "description", label: "Popis" },
  { key: "created", label: "Dátum vytvorenia" },
];

async function fetchCourses() {
  loading.value = true;
  const { data } = await api.get("/api/tests");
  courses.value = data.map((c) => ({ ...c, created: formatDate(c.created_at) }));
  loading.value = false;
}

function handleEdit(id) {
  router.push(`/admin/elearning/edit/${id}`);
}

async function handleDelete(id) {
  if (!confirm("Delete this course?")) return;
  await api.delete(`/api/tests/${id}`);
  await fetchCourses();
}

onMounted(fetchCourses);
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Testy</h1>
      <button @click="router.push('/admin/courses/add')" class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700">
        + Pridať test
      </button>
    </div>
    <DataTable :columns="columns" :rows="courses" :loading="loading" @delete="handleDelete" @edit="handleEdit" />
  </div>
</template>
