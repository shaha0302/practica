<template>
  <div class="card add-card">
    <h2>✨ Создать план</h2>
    <div class="form">
      <div class="input-group">
        <label>Когда?</label>
        <input type="date" v-model="newTask.date" class="custom-input">
      </div>
      
      <div class="input-group">
        <label>Что именно?</label>
        <textarea v-model="newTask.text" placeholder="Напишите детали задачи..." rows="3" class="custom-input"></textarea>
      </div>

      <button @click="submit" class="btn-send">Добавить в календарь</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: {
        date: new Date().toISOString().substr(0, 10),
        text: '',
        done: false
      }
    }
  },
  methods: {
    submit() {
      if (!this.newTask.text.trim()) return;
      this.$emit('add-task', { ...this.newTask, id: Date.now() });
      this.newTask.text = '';
    }
  }
}
</script>

<style scoped>
.add-card { animation: slideUp 0.4s ease; }
.form { display: flex; flex-direction: column; gap: 20px; margin-top: 20px; }
.input-group { display: flex; flex-direction: column; gap: 8px; }
label { font-size: 0.9rem; color: #636e72; font-weight: 600; padding-left: 5px; }
.custom-input {
  border: 2px solid #edf2f7; border-radius: 12px; padding: 12px;
  font-size: 1rem; transition: all 0.3s; outline: none; background: #f8fafc;
}
.custom-input:focus { border-color: #6c5ce7; background: #fff; box-shadow: 0 0 0 4px rgba(108, 92, 231, 0.1); }
.btn-send {
  background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: white;
  border: none; padding: 15px; border-radius: 12px; font-weight: 700;
  cursor: pointer; transition: transform 0.2s;
}
.btn-send:active { transform: scale(0.98); }

@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
