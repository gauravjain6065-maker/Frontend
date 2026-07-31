/**
 * Frappe API Integration Layer for crm_saas Backend
 */

let csrfToken = null;

// Helper to retrieve cached CSRF token or read from window/cookies
export function getCsrfToken() {
  if (csrfToken) return csrfToken;
  if (typeof window !== 'undefined' && window.frappe && window.frappe.csrf_token) {
    return window.frappe.csrf_token;
  }
  return null;
}

export function setCsrfToken(token) {
  csrfToken = token;
  if (typeof window !== 'undefined') {
    if (!window.frappe) window.frappe = {};
    window.frappe.csrf_token = token;
  }
}

/**
 * Core Fetch Wrapper with Automatic Cookie Handling and CSRF Header
 */
export async function frappeFetch(url, options = {}) {
  const headers = {
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getCsrfToken();
  if (token && options.method && options.method.toUpperCase() !== 'GET') {
    headers['X-Frappe-CSRF-Token'] = token;
  }

  const fetchOptions = {
    ...options,
    headers,
    credentials: 'include'
  };

  try {
    const response = await fetch(url, fetchOptions);
    
    // Extract CSRF token header if present
    const responseCsrf = response.headers.get('X-Frappe-CSRF-Token') || response.headers.get('frappe-csrf-token');
    if (responseCsrf) {
      setCsrfToken(responseCsrf);
    }

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data.exception || data.message || (data._server_messages ? JSON.parse(data._server_messages)[0] : 'API Request Failed');
      throw new Error(typeof errMsg === 'string' ? errMsg : 'Server Error');
    }

    return data.message !== undefined ? data.message : data.data !== undefined ? data.data : data;
  } catch (error) {
    console.warn(`[Frappe API Warning] ${url}:`, error.message);
    throw error;
  }
}

/**
 * 1. Authentication (Login)
 */
export async function login(email, password) {
  return await frappeFetch('/api/method/crm_saas.api.auth.login', {
    method: 'POST',
    body: JSON.stringify({
      usr: email,
      pwd: password,
      remember_me: true
    })
  });
}

/**
 * 2. Signup (Create Company Account)
 */
export async function createAccount(formData) {
  return await frappeFetch('/api/method/crm_saas.api.signup.create_company_account', {
    method: 'POST',
    body: JSON.stringify({
      company_name: formData.companyName || formData.company_name,
      industry: formData.industry,
      company_size: formData.companySize || formData.company_size,
      full_name: formData.fullName || formData.full_name,
      work_email: formData.workEmail || formData.work_email,
      phone_number: formData.phoneNumber || formData.phone_number,
      password: formData.password,
      confirm_password: formData.confirmPassword || formData.confirm_password
    })
  });
}

/**
 * 3. Session Check & Hydration
 */
export async function checkSession() {
  try {
    return await frappeFetch('/api/method/crm_saas.api.auth.get_current_session', {
      method: 'GET'
    });
  } catch (err) {
    return { loggedIn: false, user: null, role: null };
  }
}

/**
 * Logout
 */
export async function logout() {
  try {
    await frappeFetch('/api/method/logout', { method: 'POST' });
  } catch (e) {
    // Ignore logout network errors
  }
  setCsrfToken(null);
}

/**
 * Resource API Helpers for CRM Doctypes
 */
export const crmApi = {
  // Leads
  getLeads: async (limit = 100) => {
    return await frappeFetch(`/api/resource/CRM Lead?limit_page_length=${limit}`, { method: 'GET' });
  },
  createLead: async (leadData) => {
    return await frappeFetch('/api/resource/CRM Lead', {
      method: 'POST',
      body: JSON.stringify(leadData)
    });
  },
  updateLead: async (name, leadData) => {
    return await frappeFetch(`/api/resource/CRM Lead/${name}`, {
      method: 'PUT',
      body: JSON.stringify(leadData)
    });
  },
  deleteLead: async (name) => {
    return await frappeFetch(`/api/resource/CRM Lead/${name}`, { method: 'DELETE' });
  },

  // Organizations
  getOrganizations: async (limit = 100) => {
    return await frappeFetch(`/api/resource/CRM Organization?limit_page_length=${limit}`, { method: 'GET' });
  },

  // Contacts
  getContacts: async (limit = 100) => {
    return await frappeFetch(`/api/resource/CRM Contact?limit_page_length=${limit}`, { method: 'GET' });
  },

  // Tasks
  getTasks: async (limit = 100) => {
    return await frappeFetch(`/api/resource/CRM Task?limit_page_length=${limit}`, { method: 'GET' });
  },

  // Employees & Managers
  getEmployees: async () => {
    return await frappeFetch('/api/resource/Employee?limit_page_length=100', { method: 'GET' });
  }
};

export default {
  login,
  createAccount,
  checkSession,
  logout,
  frappeFetch,
  crmApi
};
