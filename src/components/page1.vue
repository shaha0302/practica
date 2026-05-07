<template>
  <div class="add-form">
    <h2>Новое задание</h2>
    <div class="input-group">
      <label>День недели:</label>
      <select v-model="newTask.day">
        <option v-for="day in days" :key="day">{{ day }}</option>
      </select>
      
      <label>Дата:</label>
      <input type="date" v-model="newTask.date">
      
      <label>Что сделать:</label>
      <input v-model="newTask.text" placeholder="Например: Сходить в зал" @keyup.enter="submit">
      
      <button @click="submit" class="btn-primary">Добавить в план</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      newTask: { 
        day: 'Понедельник', 
        text: '', 
        date: new Date().toISOString().substr(0, 10), // Сегодняшняя дата по умолчанию
        done: false 
      }
    }
  },
  methods: {
    submit() {
      if (!this.newTask.text) return;
      this.$emit('add-task', { ...this.newTask });
      this.newTask.text = '';
    }
  }
}
</script>

<style scoped>
.input-group { display: flex; flex-direction: column; gap: 10px; max-width: 300px; }
label { font-weight: bold; margin-top: 5px; }
input, select { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
</style>
