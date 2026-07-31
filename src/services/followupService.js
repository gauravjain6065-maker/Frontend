import { getFollowups, saveFollowups } from '../mock/followups/mockFollowups';

export const followupService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getFollowups());
      }, 150);
    });
  },

  create: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getFollowups();
        const newItem = {
          id: `f-${Date.now()}`,
          ...data,
          owner: 'Raj Sonar'
        };
        saveFollowups([...list, newItem]);
        resolve(newItem);
      }, 200);
    });
  },

  update: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getFollowups();
        const updated = list.map(f => f.id === id ? { ...f, ...data } : f);
        saveFollowups(updated);
        resolve(updated);
      }, 200);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getFollowups();
        const filtered = list.filter(f => f.id !== id);
        saveFollowups(filtered);
        resolve(filtered);
      }, 200);
    });
  }
};
