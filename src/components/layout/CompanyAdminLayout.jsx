import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Topbar } from './Topbar';

export function CompanyAdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar
        collapsed={collapsed}
        toggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          activePage={activePage}
          setActivePage={setActivePage}
          setIsMobileOpen={setMobileOpen}
        />

        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default CompanyAdminLayout;
