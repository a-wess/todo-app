import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/auth/AuthView.vue'
import TaskView from '../views/tasks/TaskView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: TaskView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    }
  ]
})

export default router
