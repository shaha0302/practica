// 1. Импортируем функции ТОЛЬКО один раз
import { createRouter, createWebHistory } from 'vue-router'

// 2. Импортируем твои компоненты
import Home from './components/Home.vue'
import Page1 from './components/page1.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

// 3. Создаем массив маршрутов
const routes = [
  { path: '/', component: Home },
  { path: '/add', component: Page1 },
  { path: '/auth/login', component: Login },
  { path: '/auth/register', component: Register }
]

// 4. Создаем сам роутер (проверь, чтобы это имя не повторялось выше)
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 5. Экспортируем его один раз
export default router
