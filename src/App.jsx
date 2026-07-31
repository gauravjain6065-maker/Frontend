import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import CrmLayout from './components/layout/CrmLayout';

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

function App() {
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

        {/* Employee CRM Routes with Layout */}
        <Route path="/crm" element={<CrmLayout />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="employees" element={<ProfileNotificationsPage />} />
          <Route path="employees/create" element={<ProfileNotificationsPage />} />
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

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
