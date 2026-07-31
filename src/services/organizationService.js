import { getOrganizations, saveOrganizations } from '../mock/organizations/mockOrganizations';

export const organizationService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getOrganizations());
      }, 150);
    });
  },

  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getOrganizations();
        const item = list.find(o => o.id === id) || null;
        resolve(item);
      }, 100);
    });
  },

  create: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getOrganizations();
        const newItem = {
          id: `org-${Date.now()}`,
          ...data,
          leadsCount: 0,
          contactsCount: 0,
          dateCreated: new Date().toISOString().split('T')[0]
        };
        saveOrganizations([...list, newItem]);
        resolve(newItem);
      }, 200);
    });
  },

  update: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getOrganizations();
        const updated = list.map(o => o.id === id ? { ...o, ...data } : o);
        saveOrganizations(updated);
        resolve(updated);
      }, 200);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getOrganizations();
        const filtered = list.filter(o => o.id !== id);
        saveOrganizations(filtered);
        resolve(filtered);
      }, 200);
    });
  }
};
