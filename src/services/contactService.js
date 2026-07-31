import { getContacts, saveContacts } from '../mock/contacts/mockContacts';

export const contactService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getContacts());
      }, 150);
    });
  },

  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getContacts();
        const item = list.find(c => c.id === id) || null;
        resolve(item);
      }, 100);
    });
  },

  create: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getContacts();
        const newItem = {
          id: `c-${Date.now()}`,
          ...data,
          owner: 'Raj Sonar',
          dateCreated: new Date().toISOString().split('T')[0]
        };
        saveContacts([...list, newItem]);
        resolve(newItem);
      }, 200);
    });
  },

  update: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getContacts();
        const updated = list.map(c => c.id === id ? { ...c, ...data } : c);
        saveContacts(updated);
        resolve(updated);
      }, 200);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getContacts();
        const filtered = list.filter(c => c.id !== id);
        saveContacts(filtered);
        resolve(filtered);
      }, 200);
    });
  }
};
