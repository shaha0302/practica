<template>
  <div class="schedule">
    <div v-for="day in days" :key="day" class="day-card">
      <h3>{{ day }}</h3>
      <div v-if="getTasksByDay(day).length === 0" class="empty">Нет дел на этот день</div>
      
      <div v-for="(task, index) in getTasksByDay(day)" :key="index" class="task-item">
        <input type="checkbox" v-model="task.done" @change="$emit('save')">
        <div class="task-info">
          <span :class="{ completed: task.done }">{{ task.text }}</span>
          <small class="task-date">{{ formatDate(task.date) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tasks'],
  data() {
    return {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
    }
  },
  methods: {
    getTasksByDay(day) {
      // Сортируем задачи по дате, чтобы ближайшие были сверху
      return this.tasks
        .filter(t => t.day === day)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  }
}
</script>

<style scoped>
.task-info { display: flex; flex-direction: column; }
.task-date { color: #888; font-size: 0.8em; }
.empty { color: #ccc; font-style: italic; font-size: 0.9em; }
.day-card { background: #fff; border: 1px solid #eee; margin-bottom: 15px; padding: 15px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.completed { text-decoration: line-through; color: #bbb; }
.task-item { display: flex; align-items: flex-start; gap: 12px; padding: 8px 0; border-bottom: 1px solid #f9f9f9; }
</style>
