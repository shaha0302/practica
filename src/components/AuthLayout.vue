<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <nav class="auth-nav">
        <router-link to="/auth/login">Вход</router-link>
        <router-link to="/auth/register">Регистрация</router-link>
      </nav>
      <!-- Сюда вставляются Login.vue или Register.vue -->
      <router-view @user-login="$emit('user-login', $event)"></router-view>
    </div>
  </div>
</template>

<style scoped>
.auth-wrapper { display: flex; justify-content: center; padding-top: 40px; }
.auth-card { background: white; padding: 30px; border-radius: 24px; width: 100%; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.auth-nav { display: flex; gap: 20px; margin-bottom: 25px; justify-content: center; }
.auth-nav a { text-decoration: none; color: #b2bec3; font-weight: 700; padding-bottom: 5px; }
.auth-nav .router-link-active { color: #6c5ce7; border-bottom: 2px solid #6c5ce7; }
</style>
