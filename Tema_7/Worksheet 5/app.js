import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { STORAGE_KEY, formatRelative, uid } from './utils.js';

createApp({
  data() {
    const fromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return {
      newTask: '',
      filterText: '',
      tasks: Array.isArray(fromStorage) ? fromStorage : [],
    };
  },
  computed: {
    totalCount() { return this.tasks.length; },
    pendingCount() { return this.tasks.filter(t => !t.completed).length; },
    sortedAndFiltered() {
      const order = { high: 0, normal: 1, low: 2 };
      const f = this.filterText.trim().toLowerCase();
      return [...this.tasks]
        .filter(t => !f || t.text.toLowerCase().startsWith(f))
        .sort((a, b) => {
          const pa = order[a.priority] ?? 1;
          const pb = order[b.priority] ?? 1;
          if (pa !== pb) return pa - pb;
          return b.createdAt - a.createdAt;
        });
    },
  },
  watch: {
    tasks: {
      deep: true,
      handler(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    }
  },
  methods: {
    addTask() {
      const text = this.newTask.trim();
      if (!text) return;
      this.tasks.unshift({
        id: uid(),
        text,
        completed: false,
        priority: 'normal',
        createdAt: Date.now(),
      });
      this.newTask = '';
    },
    toggle(t) {
      t.completed = !t.completed;
    },
    remove(t) {
      this.tasks = this.tasks.filter(x => x.id !== t.id);
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(t => !t.completed);
    },
    setPriority(t, level) {
      t.priority = level;
    },
    relativeTime(when) {
      return formatRelative(when);
    }
  },
}).mount('#app');
