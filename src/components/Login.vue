<template>
  <div class="auth-box">
    <h2>Вход в аккаунт</h2>
    <div class="form">
      <div class="input-group">
        <label>Логин</label>
        <input v-model="username" type="text" placeholder="Введите логин" class="auth-input">
      </div>
      <div class="input-group">
        <label>Пароль</label>
        <input v-model="password" type="password" placeholder="••••••••" class="auth-input">
      </div>
      <button @click="login" class="btn-submit">Войти</button>
      <p class="auth-footer">
        Нет аккаунта? <router-link to="/auth/register">Создать сейчас</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() { return { username: '', password: '' } },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem('app_users') || '[]');
      const user = users.find(u => u.username === this.username && u.password === this.password);
      if (user) {
        this.$emit('user-login', user);
      } else {
        alert('Неверный логин или пароль!');
      }
    }
  }
}
</script>

<style scoped>
.auth-box { max-width: 350px; margin: 50px auto; text-align: center; }
h2 { color: var(--text); margin-bottom: 30px; }
.form { display: flex; flex-direction: column; gap: 20px; }
.input-group { text-align: left; display: flex; flex-direction: column; gap: 8px; }
label { color: var(--text); font-size: 0.85rem; font-weight: 600; opacity: 0.8; }

.auth-input {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 12px;
  color: var(--text);
  outline: none;
  transition: 0.3s;
}

/* Стили для темной темы внутри инпута */
.dark-theme .auth-input {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.auth-input:focus { border-color: var(--p-color); box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2); }

.btn-submit {
  background: var(--p-color);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}
.btn-submit:hover { opacity: 0.9; transform: translateY(-2px); }

.auth-footer { color: var(--text); font-size: 0.9rem; margin-top: 20px; opacity: 0.7; }
.auth-footer a { color: var(--p-color); text-decoration: none; font-weight: bold; }
</style>
