import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function CompanyAdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-neutral-50 font-sans antialiased text-neutral-800">
      
      {/* Sidebar - Collapsible left drawer */}
      <Sidebar
        collapsed={collapsed}
        toggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area: Sticky Topbar + Scrollable Page Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Sticky top navigation bar */}
        <TopNavbar 
          onMenuClick={() => setMobileOpen(true)} 
        />
        
        {/* Scrollable Center/Right Page Outlet */}
        <main className="flex-1 overflow-y-auto w-full bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
