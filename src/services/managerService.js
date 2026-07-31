import { getManagers, saveManagers } from '../mock/managers/mockManagers';

export const managerService = {
  getAll: async () => {
    // Simulate database lookup network latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getManagers());
      }, 150);
    });
  },

  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getManagers();
        const item = list.find(m => m.id === id) || null;
        resolve(item);
      }, 100);
    });
  },

  create: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getManagers();
        const newItem = {
          id: `m-${Date.now()}`,
          ...data,
          leadsCount: 0,
          employeesCount: 0,
          dateJoined: new Date().toISOString().split('T')[0]
        };
        saveManagers([...list, newItem]);
        resolve(newItem);
      }, 200);
    });
  },

  update: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getManagers();
        const updated = list.map(m => m.id === id ? { ...m, ...data } : m);
        saveManagers(updated);
        resolve(updated);
      }, 200);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getManagers();
        const filtered = list.filter(m => m.id !== id);
        saveManagers(filtered);
        resolve(filtered);
      }, 200);
    });
  }
};
