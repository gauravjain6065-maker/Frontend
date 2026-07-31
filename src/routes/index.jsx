import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Playground & Layout Shell
import UIPlayground from '../pages/playground/UIPlayground';
import { CompanyAdminLayout } from '../components/layout';

// Page Views
import Dashboard from '../pages/company-admin/dashboard/Dashboard';

// Managers Module
import ManagerList from '../pages/company-admin/managers/ManagerList';
import CreateManager from '../pages/company-admin/managers/CreateManager';
import EditManager from '../pages/company-admin/managers/EditManager';
import ManagerDetails from '../pages/company-admin/managers/ManagerDetails';

// Employees Module
import EmployeeList from '../pages/company-admin/employees/EmployeeList';
import EmployeeDetails from '../pages/company-admin/employees/EmployeeDetails';

// Organizations Module
import OrganizationList from '../pages/company-admin/organizations/OrganizationList';
import CreateOrganization from '../pages/company-admin/organizations/CreateOrganization';
import EditOrganization from '../pages/company-admin/organizations/EditOrganization';
import OrganizationDetails from '../pages/company-admin/organizations/OrganizationDetails';

// Contacts Module
import ContactList from '../pages/company-admin/contacts/ContactList';
import CreateContact from '../pages/company-admin/contacts/CreateContact';
import EditContact from '../pages/company-admin/contacts/EditContact';
import ContactDetails from '../pages/company-admin/contacts/ContactDetails';

// Leads Module
import LeadList from '../pages/company-admin/leads/LeadList';
import CreateLead from '../pages/company-admin/leads/CreateLead';
import EditLead from '../pages/company-admin/leads/EditLead';
import LeadDetails from '../pages/company-admin/leads/LeadDetails';
import AssignLead from '../pages/company-admin/leads/AssignLead';

// Tasks Module
import TaskList from '../pages/company-admin/tasks/TaskList';
import CreateTask from '../pages/company-admin/tasks/CreateTask';
import TaskDetails from '../pages/company-admin/tasks/TaskDetails';

// Follow-ups Module
import FollowUpList from '../pages/company-admin/followups/FollowUpList';
import CreateFollowUp from '../pages/company-admin/followups/CreateFollowUp';

// Reports Module
import DashboardReports from '../pages/company-admin/reports/DashboardReports';
import LeadReports from '../pages/company-admin/reports/LeadReports';
import EmployeeReports from '../pages/company-admin/reports/EmployeeReports';
import ManagerReports from '../pages/company-admin/reports/ManagerReports';

// Subscription Module
import CurrentPlan from '../pages/company-admin/subscription/CurrentPlan';
import BillingHistory from '../pages/company-admin/subscription/BillingHistory';

// Notifications Module
import Notifications from '../pages/company-admin/notifications/Notifications';

// Settings Module
import CompanyProfile from '../pages/company-admin/settings/CompanyProfile';
import CompanySettings from '../pages/company-admin/settings/CompanySettings';

// Profile Module
import MyProfile from '../pages/company-admin/profile/MyProfile';
import ChangePassword from '../pages/company-admin/profile/ChangePassword';

export const router = createBrowserRouter([
  // Primary Redirects
  {
    path: '/',
    element: <Navigate to="/company-admin/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: <Navigate to="/company-admin/dashboard" replace />,
  },

  // Company Admin Nested Routes Layout
  {
    path: '/company-admin',
    element: <CompanyAdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      // Managers Module
      {
        path: 'managers',
        element: <ManagerList />,
      },
      {
        path: 'managers/create',
        element: <CreateManager />,
      },
      {
        path: 'managers/:id',
        element: <ManagerDetails />,
      },
      {
        path: 'managers/:id/edit',
        element: <EditManager />,
      },

      // Employees Module
      {
        path: 'employees',
        element: <EmployeeList />,
      },
      {
        path: 'employees/:id',
        element: <EmployeeDetails />,
      },

      // Organizations Module
      {
        path: 'organizations',
        element: <OrganizationList />,
      },
      {
        path: 'organizations/create',
        element: <CreateOrganization />,
      },
      {
        path: 'organizations/:id',
        element: <OrganizationDetails />,
      },
      {
        path: 'organizations/:id/edit',
        element: <EditOrganization />,
      },

      // Contacts Module
      {
        path: 'contacts',
        element: <ContactList />,
      },
      {
        path: 'contacts/create',
        element: <CreateContact />,
      },
      {
        path: 'contacts/:id',
        element: <ContactDetails />,
      },
      {
        path: 'contacts/:id/edit',
        element: <EditContact />,
      },

      // Leads Module
      {
        path: 'leads',
        element: <LeadList />,
      },
      {
        path: 'leads/create',
        element: <CreateLead />,
      },
      {
        path: 'leads/:id',
        element: <LeadDetails />,
      },
      {
        path: 'leads/:id/edit',
        element: <EditLead />,
      },
      {
        path: 'leads/:id/assign',
        element: <AssignLead />,
      },

      // Tasks Module
      {
        path: 'tasks',
        element: <TaskList />,
      },
      {
        path: 'tasks/create',
        element: <CreateTask />,
      },
      {
        path: 'tasks/:id',
        element: <TaskDetails />,
      },

      // Follow-ups Module
      {
        path: 'followups',
        element: <FollowUpList />,
      },
      {
        path: 'followups/create',
        element: <CreateFollowUp />,
      },

      // Reports Module
      {
        path: 'reports',
        element: <DashboardReports />,
      },
      {
        path: 'reports/dashboard',
        element: <DashboardReports />,
      },
      {
        path: 'reports/leads',
        element: <LeadReports />,
      },
      {
        path: 'reports/employees',
        element: <EmployeeReports />,
      },
      {
        path: 'reports/managers',
        element: <ManagerReports />,
      },

      // Subscription Module
      {
        path: 'subscription',
        element: <CurrentPlan />,
      },
      {
        path: 'subscription/billing-history',
        element: <BillingHistory />,
      },

      // Notifications Module
      {
        path: 'notifications',
        element: <Notifications />,
      },

      // Settings Module
      {
        path: 'settings/company-profile',
        element: <CompanyProfile />,
      },
      {
        path: 'settings/company-settings',
        element: <CompanySettings />,
      },

      // Profile Module
      {
        path: 'profile',
        element: <MyProfile />,
      },
      {
        path: 'profile/change-password',
        element: <ChangePassword />,
      }
    ]
  },

  // Playground Doc Index
  {
    path: '/ui-playground',
    element: <UIPlayground />,
  },
  
  // Wildcard Fallback redirect to dashboard
  {
    path: '*',
    element: <Navigate to="/company-admin/dashboard" replace />,
  }
]);
