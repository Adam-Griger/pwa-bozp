<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({ title: "", location: "", description: "", severity: "medium", occurred_at: "" });
const errors = ref({});
const loading = ref(false);
const error = ref("");

const severities = ["low", "medium", "high", "critical"];

function validate() {
  errors.value = {};
  if (!form.value.title.trim()) errors.value.title = "Required";
  if (!form.value.occurred_at) errors.value.occurred_at = "Required";
  return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;
  loading.value = true;
  // TODO: POST to /api/reports
  loading.value = false;
  router.push("/user/reports");
}
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-xl font-semibold text-gray-800 mb-6">Submit Accident Report</h1>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Brief description of the incident"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
        />
        <p v-if="errors.title" class="text-xs text-red-500 mt-1">{{ errors.title }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          v-model="form.location"
          type="text"
          placeholder="Where did it happen?"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date & Time <span class="text-red-500">*</span></label>
        <input
          v-model="form.occurred_at"
          type="datetime-local"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
        />
        <p v-if="errors.occurred_at" class="text-xs text-red-500 mt-1">{{ errors.occurred_at }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Severity</label>
        <div class="flex gap-3">
          <label
            v-for="s in severities"
            :key="s"
            :class="{
              'border-red-600 bg-red-600 text-white': form.severity === s && s === 'critical',
              'border-orange-500 bg-orange-500 text-white': form.severity === s && s === 'high',
              'border-yellow-500 bg-yellow-500 text-white': form.severity === s && s === 'medium',
              'border-green-600 bg-green-600 text-white': form.severity === s && s === 'low',
              'border-gray-300 text-gray-600 hover:border-gray-400': form.severity !== s,
            }"
            class="flex-1 flex items-center justify-center px-4 py-2.5 rounded-lg border cursor-pointer text-sm font-medium transition-colors capitalize"
          >
            <input type="radio" v-model="form.severity" :value="s" class="hidden" />
            {{ s }}
          </label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Detailed description of what happened..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none resize-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Photos</label>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400 text-sm">Image upload coming soon</div>
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <div class="flex gap-3">
        <button type="button" @click="router.push('/user/reports')" class="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          {{ loading ? "Submitting..." : "Submit Report" }}
        </button>
      </div>
    </form>
  </div>
</template>
