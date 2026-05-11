<template>
  <div class="home-container">
    <!-- Шапка календаря с кнопками переключения -->
    <div class="calendar-nav">
      <button @click="changeMonth(-1)" class="btn-arrow">❮</button>
      <h2 class="month-title">{{ currentMonthName }}</h2>
      <button @click="changeMonth(1)" class="btn-arrow">❯</button>
    </div>
    
    <div class="calendar-grid">
      <div v-for="date in calendarDays" :key="date" 
           class="date-card" :class="{ 'is-today': isToday(date) }">
        <div class="date-header">
          <span class="day-badge">{{ getDayName(date) }}</span>
          <span class="full-date">{{ getDayNumber(date) }}</span>
        </div>

        <div class="tasks-wrapper">
          <template v-if="getTasksByDate(date).length > 0">
            <div v-for="task in getTasksByDate(date)" :key="task.id" 
                 class="task-mini-item" :class="{ 'is-done': task.done }">
              <input type="checkbox" v-model="task.done" @change="$emit('save')">
              <span class="task-text">{{ task.text }}</span>
              <button @click="$emit('delete-task', task.id)" class="btn-mini-del">✕</button>
            </div>
          </template>
          
          <div v-else class="no-plans">Пока никаких планов</div>
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
      // Храним дату, которая определяет, какой месяц сейчас отображать
      viewDate: new Date(),
      todayStr: new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    currentMonthName() {
      return this.viewDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
    },
    calendarDays() {
      const year = this.viewDate.getFullYear();
      const month = this.viewDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      const days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        // Создаем дату для каждого дня месяца корректно
        const d = new Date(year, month, i);
        // Форматируем в YYYY-MM-DD
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        days.push(`${y}-${m}-${day}`);
      }
      return days;
    }
  },
  methods: {
    changeMonth(step) {
      // Создаем новую дату на основе текущей и меняем месяц
      const newDate = new Date(this.viewDate);
      newDate.setMonth(newDate.getMonth() + step);
      this.viewDate = newDate;
    },
    getTasksByDate(date) { 
      return this.tasks.filter(t => t.date === date); 
    },
    getDayName(dateStr) { 
      return new Date(dateStr).toLocaleDateString('ru-RU', { weekday: 'short' }); 
    },
    getDayNumber(dateStr) { 
      return new Date(dateStr).getDate(); 
    },
    isToday(dateStr) {
      return dateStr === this.todayStr;
    }
  }
}
</script>

<style scoped>
.calendar-nav { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  gap: 30px; 
  margin-bottom: 25px; 
}

.nav-months h2 {
  /* Используем переменную из App.vue. Если она не найдена, будет черный цвет */
  color: var(--text, #2d3436); 
  text-transform: capitalize;
  margin: 0;
  transition: color 0.3s ease; /* Плавная смена цвета */
}

/* Кнопки стрелочек тоже должны менять цвет */
.nav-months button {
  background: none;
  border: 1px solid var(--text);
  color: var(--text);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-months button:hover {
  background: var(--p-color);
  color: white;
  border-color: var(--p-color);
}

.btn-arrow {
  background: white; border: none; width: 40px; height: 40px;
  border-radius: 50%; cursor: pointer; font-size: 1.2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: 0.2s;
  color: #6c5ce7;
}

.btn-arrow:hover { background: #6c5ce7; color: white; }

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
}

.date-card {
  background: white; border-radius: 16px; padding: 15px;
  display: flex; flex-direction: column; min-height: 140px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  border: 1px solid #f0f0f0; transition: 0.3s;
}

.is-today { border: 2px solid #6c5ce7; background: #f9f8ff; box-shadow: 0 0 15px rgba(108, 92, 231, 0.2); }

.date-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
.day-badge { font-weight: 800; font-size: 0.7rem; color: #a29bfe; text-transform: uppercase; }
.full-date { font-weight: 800; font-size: 1.2rem; color: #2d3436; }

.tasks-wrapper { flex-grow: 1; display: flex; flex-direction: column; gap: 6px; }
.no-plans { font-size: 0.75rem; color: #ddd; font-style: italic; margin-top: auto; }

.task-mini-item {
  display: flex; align-items: flex-start; gap: 6px; font-size: 0.8rem;
  padding: 6px; border-radius: 8px; background: #f8fafc; border: 1px solid #edf2f7;
}

.is-done { opacity: 0.4; filter: grayscale(1); }
.task-text { flex-grow: 1; word-break: break-word; line-height: 1.2; }
.btn-mini-del { background: none; border: none; color: #ff7675; cursor: pointer; font-size: 14px; opacity: 0.6; }
.btn-mini-del:hover { opacity: 1; }
</style>
