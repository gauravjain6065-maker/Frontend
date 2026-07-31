import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Layout
import CrmLayout from './components/CrmLayout';

// Auth Pages
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import SubscriptionSuccessPage from './pages/SubscriptionSuccessPage';
import SubscriptionFailedPage from './pages/SubscriptionFailedPage';
import NotFoundPage from './pages/NotFoundPage';

// CRM Pages
import EmployeeDashboard from './pages/crm/EmployeeDashboard';
import MyLeadsPage from './pages/crm/MyLeadsPage';
import LeadDetailsPage from './pages/crm/LeadDetailsPage';
import OrganizationsPage from './pages/crm/OrganizationsPage';
import OrganizationDetailsPage from './pages/crm/OrganizationDetailsPage';
import ContactsPage from './pages/crm/ContactsPage';
import ContactDetailsPage from './pages/crm/ContactDetailsPage';
import MyTasksPage from './pages/crm/MyTasksPage';
import TaskDetailsPage from './pages/crm/TaskDetailsPage';
import MyFollowupsPage from './pages/crm/MyFollowupsPage';
import ActivityTimelinePage from './pages/crm/ActivityTimelinePage';
import ProfileNotificationsPage from './pages/crm/ProfileNotificationsPage';

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
          <Route path="dashboard" element={<EmployeeDashboard />} />
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
