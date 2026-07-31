import { getEmployees, saveEmployees } from '../mock/employees/mockEmployees';

export const employeeService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getEmployees());
      }, 150);
    });
  },

  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getEmployees();
        const item = list.find(e => e.id === id) || null;
        resolve(item);
      }, 100);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getEmployees();
        const filtered = list.filter(e => e.id !== id);
        saveEmployees(filtered);
        resolve(filtered);
      }, 200);
    });
  }
};
