import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function ManagerLayout({ children, activePage = 'Dashboard', setActivePage }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={collapsed}
        toggleCollapse={() => setCollapsed(!collapsed)}
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area offset by Sidebar width on desktop */}
      <div className={`transition-all duration-200 flex flex-col min-h-screen ${collapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'}`}>
        {/* Top Navbar */}
        <Topbar
          activePage={activePage}
          setActivePage={setActivePage}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default ManagerLayout;
