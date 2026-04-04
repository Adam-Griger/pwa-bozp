<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const pid = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function handleSubmit() {
  error.value = "";
  if (!pid.value || !password.value) {
    error.value = "Please enter your ID and password.";
    return;
  }
  loading.value = true;

  try {
    const response = await axios.post("http://localhost:3000/api/auth/login", { pid: pid.value, password: password.value });

    const { token, role } = response.data;

    localStorage.setItem("token", token);

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/user");
    }

    loading.value = false;
  } catch (e) {
    error.value = "Invalid ID or password. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Log in</h1>
    <p class="text-gray-600 text-sm mb-6">Don't have an account? Contact support to create one.</p>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="pid" class="block text-sm font-medium text-gray-700 mb-1">PID</label>
        <input
          id="pid"
          v-model="pid"
          type="text"
          autocomplete="username"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your ID"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
        />
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? "Signing in..." : "Log in" }}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-gray-500">
      Need an account?
      <a href="mailto:support@example.com" class="text-blue-600 hover:underline"> Contact support </a>
      to create one.
    </p>
  </div>
</template>
