import { getLeads, saveLeads } from '../mock/leads/mockLeads';

export const leadService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getLeads());
      }, 150);
    });
  },

  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getLeads();
        const item = list.find(l => l.id === id || String(l.id) === id) || null;
        resolve(item);
      }, 100);
    });
  },

  create: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getLeads();
        const newItem = {
          id: `l-${Date.now()}`,
          ...data,
          owner: 'Raj Sonar',
          dateCreated: new Date().toISOString().split('T')[0]
        };
        saveLeads([...list, newItem]);
        resolve(newItem);
      }, 200);
    });
  },

  update: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getLeads();
        const updated = list.map(l => (l.id === id || String(l.id) === id) ? { ...l, ...data } : l);
        saveLeads(updated);
        resolve(updated);
      }, 200);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getLeads();
        const filtered = list.filter(l => l.id !== id && String(l.id) !== id);
        saveLeads(filtered);
        resolve(filtered);
      }, 200);
    });
  }
};
