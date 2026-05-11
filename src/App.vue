<template>
  <div class="app-background" :class="{ 'dark-theme': isDark }">
    <div class="glass-card">
      <header v-if="currentUser" class="main-header">
        <div class="logo-area">
          <h1>Planit</h1>
          <button @click="toggleTheme" class="btn-theme">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
        <nav class="nav-menu">
          <div class="links">
            <router-link to="/" class="nav-item">Календарь</router-link>
            <router-link to="/add" class="nav-item">Создать</router-link>
          </div>
          <div class="user-info">
            <span class="username">{{ currentUser.username }}</span>
            <button @click="logout" class="btn-logout">Выйти</button>
          </div>
        </nav>
      </header>

      <main class="page-body">
        <router-view 
          :tasks="userTasks" 
          @user-login="handleLogin" 
          @add-task="handleAddTask"
          @delete-task="handleDeleteTask"
          @save="saveData"
        />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('my_session') || 'null'),
      allTasks: JSON.parse(localStorage.getItem('my_database') || '[]'),
      isDark: localStorage.getItem('theme') === 'dark'
    };
  },
  computed: {
    userTasks() {
      if (!this.currentUser) return [];
      return this.allTasks.filter(item => item.owner === this.currentUser.username);
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    },
    handleLogin(user) {
      this.currentUser = user;
      localStorage.setItem('my_session', JSON.stringify(user));
      this.$router.push('/');
    },
    logout() {
      this.currentUser = null;
      localStorage.removeItem('my_session');
      this.$router.push('/auth/login');
    },
    handleAddTask(newTask) {
      newTask.owner = this.currentUser.username;
      this.allTasks.push(newTask);
      this.saveData();
      this.$router.push('/');
    },
    handleDeleteTask(id) {
      this.allTasks = this.allTasks.filter(item => item.id !== id);
      this.saveData();
    },
    saveData() {
      localStorage.setItem('my_database', JSON.stringify(this.allTasks));
    }
  },
  mounted() {
    if (!this.currentUser && !this.$route.path.startsWith('/auth')) {
      this.$router.push('/auth/login');
    }
  }
};
</script>

<style>
:root { --p-color: #6c5ce7; --bg-glass: rgba(255, 255, 255, 0.9); --text: #2d3436; }
.dark-theme { --bg-glass: rgba(30, 30, 50, 0.95); --text: #ffffff; }

* { box-sizing: border-box; transition: background 0.3s, color 0.3s; }
body { margin: 0; font-family: 'Inter', sans-serif; }

.app-background {
  min-height: 100vh; padding: 40px 20px;
  background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
  display: flex; justify-content: center;
}
.dark-theme.app-background { background: #1a1a2e; }

.glass-card {
  background: var(--bg-glass); width: 100%; max-width: 1000px;
  border-radius: 30px; padding: 30px; color: var(--text);
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}

.main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
.logo-area { display: flex; align-items: center; gap: 15px; }
.btn-theme { background: none; border: 1px solid #ddd; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem; }

.nav-menu { display: flex; align-items: center; gap: 20px; }
.links { background: rgba(0,0,0,0.05); padding: 5px; border-radius: 12px; display: flex; gap: 5px; }
.nav-item { text-decoration: none; padding: 8px 16px; border-radius: 10px; color: var(--text); font-weight: 600; }
.router-link-active { background: white; color: var(--p-color); }

.user-info { display: flex; align-items: center; gap: 10px; }
.btn-logout { background: #ff7675; color: white; border: none; padding: 8px 15px; border-radius: 10px; cursor: pointer; }
</style>
