<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import SidebarItem from "../components/SidebarItem.vue";
import { useAuth } from "../composables/useAuth.js";

const router = useRouter();
const { getRole, logout: authLogout } = useAuth();

const role = computed(() => getRole());
const isManager = computed(() => role.value === "manager");

function logout() {
  authLogout(router);
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
      <div class="px-6 py-5 border-b border-gray-700">
        <span class="text-lg font-bold tracking-wide">PWA Bozp</span>
        <span class="block text-xs text-gray-400 mt-0.5">{{ isManager ? "Manager Panel" : "Employee Panel" }}</span>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <!-- Dashboard -->
        <router-link
          to="/user"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          exact-active-class="bg-gray-700 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 5v6h4v-6m-4 0H9m4 0h2" />
          </svg>
          Dashboard
        </router-link>

        <!-- Company -->
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Company</p>
          <SidebarItem to="/user/company" icon="≡" label="My Company" />
        </div>

        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Accounts</p>
          <SidebarItem v-if="isManager" to="/user/employees" icon="≡" label="Employees" />
          <SidebarItem v-if="isManager" to="/user/employees/new" icon="+" label="New Employee" />
        </div>

        <!-- Reports -->
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Reports</p>
          <SidebarItem to="/user/reports" icon="≡" label="Accident Reports" />
          <SidebarItem to="/user/reports/new" icon="+" label="Submit Report" />
        </div>

        <!-- eLearning -->
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">eLearning</p>
          <SidebarItem to="/user/elearning" icon="≡" label="Courses" />
          <SidebarItem v-if="isManager" to="/user/elearning/assign" icon="+" label="Assign Course" />
          <SidebarItem v-if="!isManager" to="/user/elearning/my" icon="✓" label="My Courses" />
        </div>

        <!-- Account -->
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account</p>
          <SidebarItem to="/user/profile" icon="⚙" label="My Profile" />
        </div>
      </nav>

      <div class="px-4 py-4 border-t border-gray-700">
        <button @click="logout" class="w-full text-left text-sm text-gray-400 hover:text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <div class="ml-64 flex-1 p-8">
      <router-view />
    </div>
  </div>
</template>
