import { CURRENT_PLAN, BILLING_HISTORY } from '../mock/subscription/mockSubscription';

export const subscriptionService = {
  getPlanDetails: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(CURRENT_PLAN);
      }, 100);
    });
  },

  getBillingHistory: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(BILLING_HISTORY);
      }, 150);
    });
  }
};
