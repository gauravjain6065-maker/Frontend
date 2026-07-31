import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts
import CrmLayout from './components/layout/CrmLayout';
import { ManagerLayout } from './components/layout/ManagerLayout';
import { CompanyAdminLayout } from './components/layout/CompanyAdminLayout';

// SaaS Auth Pages
import {
  LandingPage,
  PricingPage,
  SignupPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  EmailVerificationPage,
  SubscriptionSuccessPage,
  SubscriptionFailedPage,
  NotFoundPage
} from './pages/auth';

// Employee CRM Pages
import {
  EmployeeDashboard,
  MyLeadsPage,
  LeadDetailsPage,
  OrganizationsPage,
  OrganizationDetailsPage,
  ContactsPage,
  ContactDetailsPage,
  MyTasksPage,
  TaskDetailsPage,
  MyFollowupsPage,
  ActivityTimelinePage,
  ProfileNotificationsPage
} from './pages/crm';

// Manager Pages
import {
  Dashboard as ManagerDashboard,
  EmployeeList as ManagerEmployeeList,
  CreateEmployee as ManagerCreateEmployee,
  EmployeeDetails as ManagerEmployeeDetails,
  EditEmployee as ManagerEditEmployee,
  LeadList as ManagerLeadList,
  LeadDetails as ManagerLeadDetails,
  EditLead as ManagerEditLead,
  AssignLead as ManagerAssignLead,
  OrganizationList as ManagerOrgList,
  OrganizationDetails as ManagerOrgDetails,
  ContactList as ManagerContactList,
  ContactDetails as ManagerContactDetails,
  TaskList as ManagerTaskList,
  CreateTask as ManagerCreateTask,
  TaskDetails as ManagerTaskDetails,
  FollowUpList as ManagerFollowUpList,
  CreateFollowUp as ManagerCreateFollowUp,
  TeamPerformanceReport,
  LeadReport as ManagerLeadReport,
  Notifications as ManagerNotifications,
  MyProfile as ManagerProfile,
  ChangePassword as ManagerChangePassword
} from './pages/manager';

// Company Admin Pages
import AdminDashboard from './pages/company-admin/dashboard/Dashboard';
import AdminManagerList from './pages/company-admin/managers/ManagerList';
import AdminCreateManager from './pages/company-admin/managers/CreateManager';
import AdminEditManager from './pages/company-admin/managers/EditManager';
import AdminManagerDetails from './pages/company-admin/managers/ManagerDetails';

import AdminEmployeeList from './pages/company-admin/employees/EmployeeList';
import AdminEmployeeDetails from './pages/company-admin/employees/EmployeeDetails';

import AdminOrgList from './pages/company-admin/organizations/OrganizationList';
import AdminCreateOrg from './pages/company-admin/organizations/CreateOrganization';
import AdminEditOrg from './pages/company-admin/organizations/EditOrganization';
import AdminOrgDetails from './pages/company-admin/organizations/OrganizationDetails';

import AdminContactList from './pages/company-admin/contacts/ContactList';
import AdminCreateContact from './pages/company-admin/contacts/CreateContact';
import AdminEditContact from './pages/company-admin/contacts/EditContact';
import AdminContactDetails from './pages/company-admin/contacts/ContactDetails';

import AdminLeadList from './pages/company-admin/leads/LeadList';
import AdminCreateLead from './pages/company-admin/leads/CreateLead';
import AdminEditLead from './pages/company-admin/leads/EditLead';
import AdminLeadDetails from './pages/company-admin/leads/LeadDetails';
import AdminAssignLead from './pages/company-admin/leads/AssignLead';

import AdminTaskList from './pages/company-admin/tasks/TaskList';
import AdminCreateTask from './pages/company-admin/tasks/CreateTask';
import AdminTaskDetails from './pages/company-admin/tasks/TaskDetails';

import AdminFollowUpList from './pages/company-admin/followups/FollowUpList';
import AdminCreateFollowUp from './pages/company-admin/followups/CreateFollowUp';

import DashboardReports from './pages/company-admin/reports/DashboardReports';
import LeadReports from './pages/company-admin/reports/LeadReports';
import EmployeeReports from './pages/company-admin/reports/EmployeeReports';
import ManagerReports from './pages/company-admin/reports/ManagerReports';

import CurrentPlan from './pages/company-admin/subscription/CurrentPlan';
import BillingHistory from './pages/company-admin/subscription/BillingHistory';
import AdminNotifications from './pages/company-admin/notifications/Notifications';
import CompanyProfile from './pages/company-admin/settings/CompanyProfile';
import CompanySettings from './pages/company-admin/settings/CompanySettings';
import AdminProfile from './pages/company-admin/profile/MyProfile';
import AdminChangePassword from './pages/company-admin/profile/ChangePassword';

// UI Playground
import UIPlayground from './pages/playground/UIPlayground';

// Manager Portal Shell Component for Interactive Page State Fallback
function ManagerPortalShell() {
  const [activePage, setActivePage] = useState('Dashboard');

  const pageComponents = {
    Dashboard: ManagerDashboard,
    EmployeeList: ManagerEmployeeList,
    CreateEmployee: ManagerCreateEmployee,
    EmployeeDetails: ManagerEmployeeDetails,
    EditEmployee: ManagerEditEmployee,
    LeadList: ManagerLeadList,
    LeadDetails: ManagerLeadDetails,
    EditLead: ManagerEditLead,
    AssignLead: ManagerAssignLead,
    OrganizationList: ManagerOrgList,
    OrganizationDetails: ManagerOrgDetails,
    ContactList: ManagerContactList,
    ContactDetails: ManagerContactDetails,
    TaskList: ManagerTaskList,
    CreateTask: ManagerCreateTask,
    TaskDetails: ManagerTaskDetails,
    FollowUpList: ManagerFollowUpList,
    CreateFollowUp: ManagerCreateFollowUp,
    TeamPerformanceReport: TeamPerformanceReport,
    LeadReport: ManagerLeadReport,
    Notifications: ManagerNotifications,
    MyProfile: ManagerProfile,
    ChangePassword: ManagerChangePassword,
  };

  const CurrentPageComponent = pageComponents[activePage] || ManagerDashboard;

  return (
    <ManagerLayout activePage={activePage} setActivePage={setActivePage}>
      <CurrentPageComponent />
    </ManagerLayout>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        {/* SaaS Auth Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/subscription/success" element={<SubscriptionSuccessPage />} />
        <Route path="/subscription/failed" element={<SubscriptionFailedPage />} />

        {/* Convenient Direct Shortcuts / Aliases */}
        <Route path="/dashboard" element={<Navigate to="/crm/dashboard" replace />} />
        <Route path="/employees" element={<Navigate to="/company-admin/employees" replace />} />
        <Route path="/managers" element={<Navigate to="/company-admin/managers" replace />} />
        <Route path="/leads" element={<Navigate to="/crm/leads" replace />} />
        <Route path="/tasks" element={<Navigate to="/crm/tasks" replace />} />
        <Route path="/organizations" element={<Navigate to="/crm/organizations" replace />} />
        <Route path="/contacts" element={<Navigate to="/crm/contacts" replace />} />

        {/* Employee CRM Routes */}
        <Route path="/crm" element={<CrmLayout />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="employees" element={<EmployeeDashboard />} />
          <Route path="employees/create" element={<EmployeeDashboard />} />
          <Route path="leads" element={<MyLeadsPage />} />
          <Route path="leads/details" element={<LeadDetailsPage />} />
          <Route path="organizations" element={<OrganizationsPage />} />
          <Route path="organizations/details" element={<OrganizationDetailsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="contacts/details" element={<ContactDetailsPage />} />
          <Route path="tasks" element={<MyTasksPage />} />
          <Route path="tasks/details" element={<TaskDetailsPage />} />
          <Route path="followups" element={<MyFollowupsPage />} />
          <Route path="timeline" element={<ActivityTimelinePage />} />
          <Route path="profile" element={<ProfileNotificationsPage />} />
        </Route>

        {/* Manager Module Nested Routes & State Fallback */}
        <Route path="/manager" element={<ManagerPortalShell />} />
        <Route path="/manager/*" element={
          <ManagerLayout>
            <Routes>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<ManagerDashboard />} />
              <Route path="employees" element={<ManagerEmployeeList />} />
              <Route path="employees/create" element={<ManagerCreateEmployee />} />
              <Route path="employees/:id" element={<ManagerEmployeeDetails />} />
              <Route path="employees/:id/edit" element={<ManagerEditEmployee />} />
              <Route path="leads" element={<ManagerLeadList />} />
              <Route path="leads/:id" element={<ManagerLeadDetails />} />
              <Route path="leads/:id/edit" element={<ManagerEditLead />} />
              <Route path="leads/:id/assign" element={<ManagerAssignLead />} />
              <Route path="organizations" element={<ManagerOrgList />} />
              <Route path="organizations/:id" element={<ManagerOrgDetails />} />
              <Route path="contacts" element={<ManagerContactList />} />
              <Route path="contacts/:id" element={<ManagerContactDetails />} />
              <Route path="tasks" element={<ManagerTaskList />} />
              <Route path="tasks/create" element={<ManagerCreateTask />} />
              <Route path="tasks/:id" element={<ManagerTaskDetails />} />
              <Route path="followups" element={<ManagerFollowUpList />} />
              <Route path="followups/create" element={<ManagerCreateFollowUp />} />
              <Route path="reports/team" element={<TeamPerformanceReport />} />
              <Route path="reports/lead" element={<ManagerLeadReport />} />
              <Route path="notifications" element={<ManagerNotifications />} />
              <Route path="profile" element={<ManagerProfile />} />
              <Route path="change-password" element={<ManagerChangePassword />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ManagerLayout>
        } />

        {/* Company Admin Module Routes */}
        <Route path="/company-admin" element={<CompanyAdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Managers */}
          <Route path="managers" element={<AdminManagerList />} />
          <Route path="managers/create" element={<AdminCreateManager />} />
          <Route path="managers/:id" element={<AdminManagerDetails />} />
          <Route path="managers/:id/edit" element={<AdminEditManager />} />

          {/* Employees */}
          <Route path="employees" element={<AdminEmployeeList />} />
          <Route path="employees/:id" element={<AdminEmployeeDetails />} />

          {/* Organizations */}
          <Route path="organizations" element={<AdminOrgList />} />
          <Route path="organizations/create" element={<AdminCreateOrg />} />
          <Route path="organizations/:id" element={<AdminOrgDetails />} />
          <Route path="organizations/:id/edit" element={<AdminEditOrg />} />

          {/* Contacts */}
          <Route path="contacts" element={<AdminContactList />} />
          <Route path="contacts/create" element={<AdminCreateContact />} />
          <Route path="contacts/:id" element={<AdminContactDetails />} />
          <Route path="contacts/:id/edit" element={<AdminEditContact />} />

          {/* Leads */}
          <Route path="leads" element={<AdminLeadList />} />
          <Route path="leads/create" element={<AdminCreateLead />} />
          <Route path="leads/:id" element={<AdminLeadDetails />} />
          <Route path="leads/:id/edit" element={<AdminEditLead />} />
          <Route path="leads/:id/assign" element={<AdminAssignLead />} />

          {/* Tasks */}
          <Route path="tasks" element={<AdminTaskList />} />
          <Route path="tasks/create" element={<AdminCreateTask />} />
          <Route path="tasks/:id" element={<AdminTaskDetails />} />

          {/* Follow-ups */}
          <Route path="followups" element={<AdminFollowUpList />} />
          <Route path="followups/create" element={<AdminCreateFollowUp />} />

          {/* Reports */}
          <Route path="reports" element={<DashboardReports />} />
          <Route path="reports/dashboard" element={<DashboardReports />} />
          <Route path="reports/leads" element={<LeadReports />} />
          <Route path="reports/employees" element={<EmployeeReports />} />
          <Route path="reports/managers" element={<ManagerReports />} />

          {/* Subscription */}
          <Route path="subscription" element={<CurrentPlan />} />
          <Route path="subscription/billing-history" element={<BillingHistory />} />

          {/* Notifications & Settings */}
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="settings/company-profile" element={<CompanyProfile />} />
          <Route path="settings/company-settings" element={<CompanySettings />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="profile/change-password" element={<AdminChangePassword />} />
        </Route>

        {/* UI Playground */}
        <Route path="/ui-playground" element={<UIPlayground />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
