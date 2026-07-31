import React, { useState } from 'react';
import { ManagerLayout } from './components/layout/ManagerLayout';
import {
  Dashboard,
  EmployeeList,
  CreateEmployee,
  EmployeeDetails,
  EditEmployee,
  LeadList,
  LeadDetails,
  EditLead,
  AssignLead,
  OrganizationList,
  OrganizationDetails,
  ContactList,
  ContactDetails,
  TaskList,
  CreateTask,
  TaskDetails,
  FollowUpList,
  CreateFollowUp,
  TeamPerformanceReport,
  LeadReport,
  Notifications,
  MyProfile,
  ChangePassword,
} from './pages/manager';

const pageComponents = {
  Dashboard,
  EmployeeList,
  CreateEmployee,
  EmployeeDetails,
  EditEmployee,
  LeadList,
  LeadDetails,
  EditLead,
  AssignLead,
  OrganizationList,
  OrganizationDetails,
  ContactList,
  ContactDetails,
  TaskList,
  CreateTask,
  TaskDetails,
  FollowUpList,
  CreateFollowUp,
  TeamPerformanceReport,
  LeadReport,
  Notifications,
  MyProfile,
  ChangePassword,
};

export function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const CurrentPageComponent = pageComponents[activePage] || Dashboard;

  return (
    <ManagerLayout activePage={activePage} setActivePage={setActivePage}>
      <CurrentPageComponent />
    </ManagerLayout>
  );
}

export default App;
