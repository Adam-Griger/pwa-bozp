import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../composables/useAuth.js";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import LoginView from "../views/LoginView.vue";

import AdminPanelView from "../views/AdminPanelView.vue";
import CompaniesView from "../views/admin/CompaniesView.vue";
import AddCompanyView from "../views/admin/AddCompanyView.vue";
import AccountsView from "../views/admin/AccountsView.vue";
import AddAccountView from "../views/admin/AddAccountView.vue";
import AdminHomeView from "../views/admin/AdminHomeView.vue";
import AdminCoursesView from "../views/admin/CoursesView.vue";
import AddCourseView from "../views/admin/AddCourseView.vue";
import EditCourseView from "../views/admin/EditCourseView.vue";

import UserPanelView from "../views/UserPanelView.vue";
import UserHomeView from "../views/user/UserHomeView.vue";
import MyCompanyView from "../views/user/MyCompanyView.vue";
import EmployeesView from "../views/user/EmployeesView.vue";
import ReportsView from "../views/user/ReportsView.vue";
import ProfileView from "../views/user/ProfileView.vue";
import NewReportView from "../views/user/NewReportView.vue";
import NewEmployeeView from "../views/user/NewEmployeeView.vue";
import ReportView from "../views/user/ReportView.vue";
import CoursesView from "../views/user/CoursesView.vue";
import AssignCourseView from "../views/user/AssignCourseView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/contact", name: "contact", component: ContactView },
    { path: "/login", name: "login", component: LoginView },
    {
      path: "/admin",
      name: "admin",
      component: AdminPanelView,
      meta: { requiresAuth: true, role: "admin" },
      children: [
        { path: "", name: "admin-home", component: AdminHomeView },
        { path: "companies", name: "companies", component: CompaniesView },
        { path: "companies/add", component: AddCompanyView },
        { path: "accounts", component: AccountsView },
        { path: "accounts/add", component: AddAccountView },
        { path: "settings", component: SettingsView },
        { path: "elearning", component: AdminCoursesView },
        { path: "elearning/add", component: AddCourseView },
        { path: "elearning/edit/:id", component: EditCourseView },
      ],
    },
    {
      path: "/user",
      name: "user",
      component: UserPanelView,
      meta: { requiresAuth: true },
      children: [
        { path: "", component: UserHomeView },
        { path: "company", component: MyCompanyView },
        { path: "employees", component: EmployeesView },
        { path: "employees/new", component: NewEmployeeView },
        { path: "reports", component: ReportsView },
        { path: "reports/new", component: NewReportView },
        { path: "reports/:id", component: ReportView },
        { path: "elearning", component: CoursesView },
        { path: "elearning/assign", component: AssignCourseView },
        { path: "profile", component: ProfileView },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  if (to.meta.role) {
    const { getRole } = useAuth();
    if (getRole() !== to.meta.role) {
      return next("/user");
    }
  }

  next();
});

export default router;
