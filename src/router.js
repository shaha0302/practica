import { createRouter, createWebHistory } from 'vue-router'
// Указываем правильный путь к папке components
import Home from './components/Home.vue'
import Page1 from './components/page1.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add',
    component: Page1
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
