<script setup>
import { ref } from 'vue'

// Создаем переменные
const text = ref('')      // Для текста в поле ввода
const tasks = ref([])     // Массив со списком всех дел

// Функция добавления
function addTask() {
  if (text.value != '') {   // Если поле не пустое
    tasks.value.push(text.value) // Добавляем текст в массив
    text.value = ''         // Очищаем поле
  }
}

// Функция удаления
function deleteTask(index) {
  tasks.value.splice(index, 1) // Удаляем 1 элемент по его номеру
}
</script>

<template>
  <div style="text-align: center; margin-top: 40px;">
    <h1>Мои дела</h1>

    <!-- Поле ввода и кнопка -->
    <input v-model="text" placeholder="Напиши что-нибудь..." />
    <button @click="addTask">Добавить</button>

    <!-- Список дел -->
    <ul style="list-style: none;">
      <li v-for="(item, index) in tasks">
        {{ item }} 
        <button @click="deleteTask(index)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 400px;
  margin: 50px auto;
  font-family: sans-serif;
  text-align: center;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.done span {
  text-decoration: line-through;
  color: gray;
}

button {
  cursor: pointer;
}
</style>