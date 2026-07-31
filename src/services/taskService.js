import { getTasks, saveTasks } from '../mock/tasks/mockTasks';

export const taskService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getTasks());
      }, 150);
    });
  },

  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getTasks();
        const item = list.find(t => t.id === id || String(t.id) === id) || null;
        resolve(item);
      }, 100);
    });
  },

  create: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getTasks();
        const newItem = {
          id: `t-${Date.now()}`,
          ...data,
          status: 'Pending',
          dateCreated: new Date().toISOString().split('T')[0]
        };
        saveTasks([...list, newItem]);
        resolve(newItem);
      }, 200);
    });
  },

  update: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getTasks();
        const updated = list.map(t => (t.id === id || String(t.id) === id) ? { ...t, ...data } : t);
        saveTasks(updated);
        resolve(updated);
      }, 200);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getTasks();
        const filtered = list.filter(t => t.id !== id && String(t.id) !== id);
        saveTasks(filtered);
        resolve(filtered);
      }, 200);
    });
  }
};
