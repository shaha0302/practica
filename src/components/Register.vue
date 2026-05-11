<template>
  <div class="auth-box">
    <h2>Регистрация</h2>
    <div class="form">
      <div class="input-group">
        <label>Логин</label>
        <input v-model="username" type="text" placeholder="Придумайте имя" class="auth-input">
      </div>
      <div class="input-group">
        <label>Пароль</label>
        <input v-model="password" type="password" placeholder="Придумайте пароль" class="auth-input">
      </div>
      <button @click="register" class="btn-submit register">Зарегистрироваться</button>
      <p class="auth-footer">
        Уже есть аккаунт? <router-link to="/auth/login">Войти</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() { return { username: '', password: '' } },
  methods: {
    register() {
      if (!this.username || !this.password) return alert('Заполните поля!');
      let users = JSON.parse(localStorage.getItem('app_users') || '[]');
      if (users.some(u => u.username === this.username)) return alert('Логин занят!');
      users.push({ username: this.username, password: this.password });
      localStorage.setItem('app_users', JSON.stringify(users));
      alert('Аккаунт создан!');
      this.$router.push('/auth/login');
    }
  }
}
</script>

<style scoped>
/* Стили такие же как в Login.vue, но с отличием для кнопки */
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

.dark-theme .auth-input {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.auth-input:focus { border-color: var(--p-color); }

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
.btn-submit.register { background: #00b894; }

.auth-footer { color: var(--text); font-size: 0.9rem; margin-top: 20px; opacity: 0.7; }
.auth-footer a { color: var(--p-color); text-decoration: none; font-weight: bold; }
</style>
