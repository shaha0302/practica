<template>
  <div class="add-form">
    <h2>Новое задание</h2>
    <select v-model="newTask.day">
      <option v-for="day in days" :key="day">{{ day }}</option>
    </select>
    <input v-model="newTask.text" placeholder="Что сделать?" @keyup.enter="submit">
    <button @click="submit" class="btn-primary">Добавить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      newTask: { day: 'Понедельник', text: '', done: false }
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
