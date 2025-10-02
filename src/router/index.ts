import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory('/glyco-renal-monitor/'),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/dashboard',
      name: 'DashboardAlias',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/audit-log',
      name: 'AuditLog',
      component: () => import('../views/AuditLogViewer.vue')
    },
    {
      path: '/new-entry',
      name: 'NewEntry',
      component: () => import('../views/NewEntryForm.vue')
    },
    {
      path: '/lifestyle',
      name: 'Lifestyle',
      component: () => import('../views/Lifestyle.vue')
    }
  ]
})

export default router
