import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import AuditLogViewer from '../views/AuditLogViewer.vue'
import NewEntryForm from '../views/NewEntryForm.vue' // ✅ Add this

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardView },
  { path: '/audit-log', component: AuditLogViewer },
  { path: '/new-entry', component: NewEntryForm } // ✅ Add this
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
