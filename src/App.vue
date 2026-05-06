<template>
  <div class="container">
    <header class="menu">
      <button @click="clearAll" class="btn-danger">Очистить всё</button>
      
      <router-link to="/">
        <button class="btn-nav">Расписание</button>
      </router-link>
      
      <router-link to="/add">
        <button class="btn-nav">Добавить задание</button>
      </router-link>
    </header>

    <hr>

    <!-- Передаем данные внутрь страниц через пропсы -->
    <router-view 
      :tasks="tasks" 
      @add-task="addTask" 
      @save="saveData"
    ></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Загружаем данные из памяти браузера
      tasks: JSON.parse(localStorage.getItem('tasks_data') || '[]')
    }
  },
  methods: {
    addTask(newTask) {
      this.tasks.push(newTask);
      this.saveData();
      this.$router.push('/'); // Возвращаем пользователя на главную
    },
    saveData() {
      localStorage.setItem('tasks_data', JSON.stringify(this.tasks));
    },
    clearAll() {
      if (confirm('Вы уверены, что хотите удалить всё расписание?')) {
        this.tasks = [];
        this.saveData();
      }
    }
  }
}
</script>

<style>
.container { max-width: 600px; margin: 0 auto; font-family: sans-serif; padding: 20px; }
.menu { display: flex; gap: 15px; margin-bottom: 20px; align-items: center; }
.btn-nav { padding: 10px 15px; cursor: pointer; background: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; }
.btn-danger { padding: 10px 15px; cursor: pointer; background: #ff4d4d; color: white; border: none; border-radius: 5px; }
/* Стиль для активной ссылки роутера */
.router-link-active button { background: #42b983; color: white; border-color: #42b983; }
</style>
