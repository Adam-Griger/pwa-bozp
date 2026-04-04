<template>
  <div>
    <!-- Page heading -->
    <div class="text-center mb-12">
      <span
        class="inline-block bg-blue-100 text-blue-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
      >
        Contact
      </span>
      <h1 class="text-4xl font-extrabold text-gray-900 mb-3">Get in Touch</h1>
      <p class="text-gray-500 max-w-lg mx-auto">
        Have a question or want to register your company? We're here to help.
        Fill in the form below or reach us directly.
      </p>
    </div>

    <div class="grid lg:grid-cols-3 gap-10">
      <!-- Contact info sidebar -->
      <aside class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-semibold text-gray-900 mb-5">Contact Information</h2>
          <ul class="space-y-5">
            <li class="flex items-start gap-3">
              <div class="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Address</p>
                <p class="text-sm text-gray-800">Náměstí Svobody 12<br />602 00 Brno, Czech Republic</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Email</p>
                <a href="mailto:info@pwabozp.cz" class="text-sm text-gray-800 hover:text-blue-600 transition-colors">info@pwabozp.cz</a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Phone</p>
                <a href="tel:+420511222333" class="text-sm text-gray-800 hover:text-blue-600 transition-colors">+420 511 222 333</a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Business Hours</p>
                <p class="text-sm text-gray-800">Mon – Fri: 8:00 – 17:00<br />Sat – Sun: Closed</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="bg-gray-900 rounded-2xl p-6 text-white">
          <p class="font-semibold mb-2">Need urgent help?</p>
          <p class="text-sm text-gray-400 mb-4">
            Our support team is available during business hours and typically responds within one business day.
          </p>
          <a
            href="mailto:support@pwabozp.cz"
            class="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            support@pwabozp.cz
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </aside>

      <!-- Form card -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

        <!-- Mode toggle -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <p class="font-semibold text-gray-900">
              {{ isCompanyMode ? "Register Company Account" : "General Inquiry" }}
            </p>
            <p class="text-xs text-gray-400 mt-0.5">
              {{ isCompanyMode
                ? "Fill in your company details and we'll get back to you."
                : "Ask us anything — we'll reply within one business day."
              }}
            </p>
          </div>

          <!-- Pill toggle -->
          <button
            type="button"
            @click="isCompanyMode = !isCompanyMode"
            :aria-pressed="isCompanyMode"
            class="relative flex items-center gap-2 rounded-full border px-1 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            :class="isCompanyMode
              ? 'bg-blue-600 border-blue-600'
              : 'bg-gray-100 border-gray-200'"
          >
            <!-- Labels inside the toggle -->
            <span
              class="text-xs font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
              :class="!isCompanyMode ? 'bg-white text-gray-800 shadow-sm' : 'text-blue-200'"
            >
              Inquiry
            </span>
            <span
              class="text-xs font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
              :class="isCompanyMode ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400'"
            >
              New Company
            </span>
          </button>
        </div>

        <!-- Shared: email -->
        <div class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Your Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                class="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                {{ isCompanyMode ? "Contact Person" : "Your Name" }}
                <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                :placeholder="isCompanyMode ? 'Full name of contact' : 'Your name'"
                class="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          <!-- Company-only fields -->
          <transition name="slide-fade">
            <div v-if="isCompanyMode" class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">
                    Company Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.companyName"
                    type="text"
                    placeholder="Acme s.r.o."
                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">IČO / Company ID</label>
                  <input
                    v-model="form.companyId"
                    type="text"
                    placeholder="12345678"
                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="+420 600 000 000"
                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Industry / Sector</label>
                  <input
                    v-model="form.industry"
                    type="text"
                    placeholder="e.g. Construction, Healthcare…"
                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>
            </div>
          </transition>

          <!-- Inquiry-only: subject -->
          <transition name="slide-fade">
            <div v-if="!isCompanyMode">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Subject <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.subject"
                type="text"
                placeholder="What's your question about?"
                class="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </transition>

          <!-- Message (both modes) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              {{ isCompanyMode ? "Additional Notes" : "Message" }}
              <span v-if="!isCompanyMode" class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.message"
              rows="5"
              :placeholder="isCompanyMode
                ? 'Any extra information about your company or requirements…'
                : 'Describe your question or issue in detail…'"
              class="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>

          <!-- Privacy agreement -->
          <label class="flex items-start gap-3 cursor-pointer group">
            <div class="relative shrink-0 mt-0.5">
              <input
                v-model="form.agreed"
                type="checkbox"
                class="sr-only peer"
              />
              <div
                class="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center"
              >
                <svg
                  v-if="form.agreed"
                  class="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span class="text-sm text-gray-500 leading-relaxed">
              I agree to the
              <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
              and consent to the processing of my personal data in connection with this request.
            </span>
          </label>

          <!-- Submit -->
          <button
            type="button"
            :disabled="!canSubmit"
            @click="handleSubmit"
            class="w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :class="canSubmit
              ? 'bg-gray-900 text-white hover:bg-gray-700 cursor-pointer'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
          >
            {{ isCompanyMode ? "Submit Company Registration" : "Send Message" }}
          </button>

          <!-- Success banner -->
          <transition name="fade">
            <div
              v-if="submitted"
              class="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {{
                  isCompanyMode
                    ? "Your registration request has been submitted. We'll be in touch shortly!"
                    : "Your message has been sent. We'll reply within one business day."
                }}
              </span>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isCompanyMode = ref(false);
const submitted = ref(false);

const form = ref({
  email: "",
  name: "",
  subject: "",
  message: "",
  companyName: "",
  companyId: "",
  phone: "",
  industry: "",
  agreed: false,
});

const canSubmit = computed(() => {
  if (!form.value.email || !form.value.name || !form.value.agreed) return false;
  if (isCompanyMode.value) return !!form.value.companyName;
  return !!form.value.subject && !!form.value.message;
});

function handleSubmit() {
  if (!canSubmit.value) return;
  // TODO: wire up to API
  submitted.value = true;
  setTimeout(() => (submitted.value = false), 6000);
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
