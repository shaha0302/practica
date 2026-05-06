<template>
  <div class="schedule">
    <div v-for="day in days" :key="day" class="day-card">
      <h3>{{ day }}</h3>
      <div v-for="(task, index) in getTasksByDay(day)" :key="index" class="task-item">
        <input type="checkbox" v-model="task.done" @change="$emit('save')">
        <span :class="{ completed: task.done }">{{ task.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tasks'], // Получаем задачи от главного компонента
  data() {
    return {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
    }
  },
  methods: {
    getTasksByDay(day) {
      return this.tasks.filter(t => t.day === day);
    }
  }
}
</script>

<style scoped>
.day-card { background: #f9f9f9; margin: 10px 0; padding: 10px; border-radius: 8px; border-left: 5px solid #42b983; }
.completed { text-decoration: line-through; color: gray; }
.task-item { display: flex; gap: 10px; margin: 5px 0; }
</style>
