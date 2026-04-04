<template>
  <div>
    <!-- Hero -->
    <section class="text-center mb-12">
      <span class="inline-block bg-blue-100 text-blue-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
        About Us
      </span>
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        Lorem ipsum dolor sit amet,<br class="hidden md:block" />
        consectetur adipiscing elit
      </h1>
      <p class="max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo
        inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
    </section>

    <!-- Mission & Vision -->
    <section class="grid md:grid-cols-2 gap-8 mb-16">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
          <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-3">Our Mission</h2>
        <p class="text-gray-500 leading-relaxed">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
        </p>
      </div>
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-5">
          <svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-3">Our Vision</h2>
        <p class="text-gray-500 leading-relaxed">
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.
        </p>
      </div>
    </section>

    <!-- What we do — feature cards -->
    <section class="mb-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">What We Do</h2>
        <p class="text-gray-500 max-w-xl mx-auto">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div class="w-9 h-9 rounded-lg flex items-center justify-center mb-4" :class="feature.iconBg">
            <component :is="feature.icon" class="w-5 h-5" :class="feature.iconColor" />
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Stats banner -->
    <section class="bg-gray-900 rounded-3xl px-8 py-12 mb-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-4xl font-extrabold text-white mb-1">{{ stat.value }}</p>
          <p class="text-sm text-gray-400 uppercase tracking-wide">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Team section -->
    <section class="mb-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">Meet the Team</h2>
        <p class="text-gray-500 max-w-xl mx-auto">
          Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint molestiae non
          recusandae.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="member in team" :key="member.name" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
          <div class="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0" :class="member.avatarBg">
            {{ member.initials }}
          </div>
          <div>
            <p class="font-semibold text-gray-900">{{ member.name }}</p>
            <p class="text-sm text-gray-500">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing CTA -->
    <section class="text-center py-12 bg-blue-50 rounded-3xl">
      <h2 class="text-2xl font-bold text-gray-900 mb-3">Itaque earum rerum hic tenetur</h2>
      <p class="text-gray-500 max-w-lg mx-auto mb-6">
        Nam libero tempore cum soluta nobis eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
      </p>
      <router-link to="/contact" class="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors">
        Get in Touch
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { h } from "vue";

const BoltIcon = (_, { attrs }) =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, ...attrs }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M13 10V3L4 14h7v7l9-11h-7z" }),
  ]);

const ShieldIcon = (_, { attrs }) =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, ...attrs }, [
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    }),
  ]);

const ChartIcon = (_, { attrs }) =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, ...attrs }, [
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    }),
  ]);

const UsersIcon = (_, { attrs }) =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, ...attrs }, [
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    }),
  ]);

const CogIcon = (_, { attrs }) =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, ...attrs }, [
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    }),
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
  ]);

const GlobeIcon = (_, { attrs }) =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, ...attrs }, [
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    }),
  ]);

const features = [
  {
    title: "Lorem Ipsum Feature",
    description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
    icon: BoltIcon,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Dolor Sit Amet",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    icon: ShieldIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Adipiscing Analytics",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    icon: ChartIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Tempor Incididunt",
    description: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim est.",
    icon: UsersIcon,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Labore et Dolore",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    icon: CogIcon,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    title: "Magna Aliqua",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur.",
    icon: GlobeIcon,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
];

const stats = [
  { value: "2 000+", label: "Active Users" },
  { value: "150+", label: "Companies" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

const team = [
  { name: "Jan Novák", role: "Chief Executive Officer", initials: "JN", avatarBg: "bg-blue-100 text-blue-700" },
  { name: "Petra Dvořák", role: "Head of Product", initials: "PD", avatarBg: "bg-emerald-100 text-emerald-700" },
  { name: "Tomáš Kratochvíl", role: "Lead Engineer", initials: "TK", avatarBg: "bg-purple-100 text-purple-700" },
  { name: "Lucie Marková", role: "UX Designer", initials: "LM", avatarBg: "bg-rose-100 text-rose-700" },
  { name: "Martin Šimánek", role: "Safety Consultant", initials: "MŠ", avatarBg: "bg-yellow-100 text-yellow-700" },
  { name: "Eva Blažková", role: "Customer Success", initials: "EB", avatarBg: "bg-sky-100 text-sky-700" },
];
</script>
