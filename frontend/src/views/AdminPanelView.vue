<script setup>
import { useRouter } from "vue-router";
import SidebarItem from "../components/SidebarItem.vue";
import { useAuth } from "../composables/useAuth.js";

const router = useRouter();
const { logout: authLogout } = useAuth();

function logout() {
  authLogout(router);
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
      <!-- Logo -->
      <div class="px-6 py-5 border-b border-gray-700">
        <span class="text-lg font-bold tracking-wide">PWA Bozp</span>
        <span class="block text-xs text-gray-400 mt-0.5">Admin Panel</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <router-link
          to="/admin"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          exact-active-class="bg-gray-700 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 5v6h4v-6m-4 0H9m4 0h2" />
          </svg>
          Admin Dashboard
        </router-link>
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Companies</p>
          <SidebarItem to="/admin/companies" icon="≡" label="View All Companies" />
          <SidebarItem to="/admin/companies/add" icon="+" label="Add Company" />
        </div>

        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Accounts</p>
          <SidebarItem to="/admin/accounts" icon="≡" label="View All Users" />
          <SidebarItem to="/admin/accounts/add" icon="+" label="Add User" />
        </div>

        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">System</p>
          <SidebarItem to="/admin/settings" icon="⚙" label="Settings" />
        </div>
      </nav>

      <!-- Logout at bottom -->
      <div class="px-4 py-4 border-t border-gray-700">
        <button @click="logout" class="w-full text-left text-sm text-gray-400 hover:text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="ml-64 flex-1 p-8">
      <router-view />
    </div>
  </div>
</template>
