<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import SidebarItem from "../components/SidebarItem.vue";
import { useAuth } from "../composables/useAuth.js";

const router = useRouter();
const { getRole, logout: authLogout } = useAuth();

const role = computed(() => getRole());
const isManager = computed(() => role.value === "manažér");
const isStudent = computed(() => role.value === "študent");

const roleLabel = computed(() => {
  if (isManager.value) return "Manažér";
  if (isStudent.value) return "Študent";
  return "Zamestnanec";
});

function logout() {
  authLogout(router);
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
      <div class="px-6 py-5 border-b border-gray-700">
        <span class="text-lg font-bold tracking-wide">BOZP</span>
        <span class="block text-xs text-gray-400 mt-0.5">{{ roleLabel }}</span>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <!-- Company — hidden for students -->
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Spoločnosť</p>
          <SidebarItem to="/user/company" icon="≡" label="Moja spoločnosť" />
        </div>

        <!-- Accounts — managers only -->
        <div v-if="isManager">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Účty</p>
          <SidebarItem to="/user/employees" icon="≡" label="Všetci zamestnanci" />
          <SidebarItem to="/user/employees/new" icon="+" label="Pridať zamestnanca" />
        </div>

        <!-- Reports -->
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Incidenty</p>
          <SidebarItem v-if="isManager" to="/user/reports" icon="≡" label="Všetky incidenty" />
          <SidebarItem to="/user/reports/new" icon="+" label="Nahlásiť incident" />
          <SidebarItem v-if="!isManager && !isStudent" to="/user/reports/my" icon="✓" label="Moje incidenty" />
        </div>

        <!-- eLearning -->
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">e-Learning</p>
          <SidebarItem v-if="isManager" to="/user/elearning" icon="≡" label="Všetky testy" />
          <SidebarItem v-if="isManager" to="/user/elearning/assign" icon="+" label="Priradiť test" />
          <SidebarItem v-if="!isManager" to="/user/elearning/my" icon="✓" label="Moje testy" />
          <SidebarItem to="/user/elearning/resources" icon="≡" label="Učebné materiály" />
        </div>

        <!-- Settings -->
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nastavenia</p>
          <SidebarItem to="/user/profile" icon="⚙" label="Môj profil" />
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
          Odhlásiť sa
        </button>
      </div>
    </aside>

    <div class="ml-64 flex-1 p-8">
      <router-view />
    </div>
  </div>
</template>
