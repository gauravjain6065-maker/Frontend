import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  Target, 
  UserCheck, 
  Building2, 
  Contact, 
  ClipboardList, 
  PlusSquare, 
  Calendar, 
  Activity, 
  Search, 
  Bell, 
  ChevronDown,
  Menu,
  X,
  LogOut
} from 'lucide-react';

const CrmLayout = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    {
      group: 'CORE DASHBOARD',
      items: [
        { name: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      group: 'TEAM & HR',
      items: [
        { name: 'Employee List', path: '/employee/employees', icon: Users }
      ]
    },
    {
      group: 'SALES & PIPELINE',
      items: [
        { name: 'Lead Directory', path: '/employee/leads', icon: Target },
        { name: 'Lead Details', path: '/employee/leads/details', icon: UserCheck },
        { name: 'Organizations', path: '/employee/organizations', icon: Building2 },
        { name: 'Contacts', path: '/employee/contacts', icon: Contact }
      ]
    },
    {
      group: 'ACTIVITIES & TASKS',
      items: [
        { name: 'Task List', path: '/employee/tasks', icon: ClipboardList },
        { name: 'Task Details', path: '/employee/tasks/details', icon: PlusSquare },
        { name: 'Follow-ups', path: '/employee/followups', icon: Calendar }
      ]
    },
    {
      group: 'ANALYTICS & REPORTS',
      items: [
        { name: 'Activity Timeline', path: '/employee/timeline', icon: Activity }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B132B] text-slate-300 flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Branding Section */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <Shield className="w-5 h-5 fill-current text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white tracking-wider text-base">ENTERPRISE</span>
                  <span className="bg-blue-600/30 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-500/30">CRM</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Employee Portal</p>
              </div>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)] scrollbar-thin scrollbar-thumb-slate-800">
            {navigation.map((group, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {group.group}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item, itemIdx) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={itemIdx}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150
                          ${isActive 
                            ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30' 
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile Footer Card */}
        <div className="p-4 border-t border-slate-800/60 bg-[#080E21]">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-inner">
                JD
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">John Doe</p>
                <p className="text-[10px] text-slate-400 truncate">Senior Representative</p>
              </div>
            </div>
            <Link to="/login" className="text-slate-400 hover:text-red-400 p-1.5 transition" title="Log out">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Navbar Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs text-gray-500 font-medium hidden sm:block">
              Employee Portal / <span className="text-blue-600 font-semibold capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input 
                type="text" 
                placeholder="Search leads, employees, tasks, or pages..." 
                className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50/50 pl-9 pr-3 text-xs text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Actions & Profile Dropdown */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
            </button>

            <div className="h-6 w-[1px] bg-gray-200 mx-1" />

            <Link to="/employee/profile" className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                JD
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-gray-900 leading-tight">John Doe</p>
                <p className="text-[10px] text-gray-500">Senior Representative</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block" />
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default CrmLayout;
