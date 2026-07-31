<<<<<<< HEAD
import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Target,
  UserCheck,
  Building2,
  Contact,
  CheckSquare,
  PlusSquare,
  CalendarCheck,
  BarChart3,
  PieChart,
  Bell,
  User,
  KeyRound,
  ChevronDown,
  ChevronRight,
  Shield,
  Briefcase,
  Sparkles,
  Search,
} from 'lucide-react';

export function Sidebar({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) {
  // Collapsible section state
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (title) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const menuGroups = [
    {
      title: 'CORE DASHBOARD',
      items: [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'TEAM & HR',
      items: [
        { id: 'EmployeeList', label: 'Employee List', icon: Users },
        { id: 'CreateEmployee', label: 'Create Employee', icon: UserPlus },
      ],
    },
    {
      title: 'SALES & PIPELINE',
      items: [
        { id: 'LeadList', label: 'Lead Directory', icon: Target },
        { id: 'AssignLead', label: 'Assign Lead', icon: UserCheck },
        { id: 'OrganizationList', label: 'Organizations', icon: Building2 },
        { id: 'ContactList', label: 'Contacts', icon: Contact },
      ],
    },
    {
      title: 'ACTIVITIES & TASKS',
      items: [
        { id: 'TaskList', label: 'Task List', icon: CheckSquare },
        { id: 'CreateTask', label: 'Create Task', icon: PlusSquare },
        { id: 'FollowUpList', label: 'Follow-ups', icon: CalendarCheck },
      ],
    },
    {
      title: 'ANALYTICS & REPORTS',
      items: [
        { id: 'TeamPerformanceReport', label: 'Team Performance', icon: BarChart3 },
        { id: 'LeadReport', label: 'Lead Report', icon: PieChart },
      ],
    },
    {
      title: 'ACCOUNT & SECURITY',
      items: [
        { id: 'Notifications', label: 'Notifications', icon: Bell, badge: '3' },
        { id: 'MyProfile', label: 'My Profile', icon: User },
        { id: 'ChangePassword', label: 'Change Password', icon: KeyRound },
      ],
    },
  ];

  const handleSelect = (id) => {
    setActivePage(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden"
=======
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  LayoutDashboard, 
  Users, 
  User, 
  Building2, 
  Contact, 
  TrendingUp, 
  CheckSquare, 
  PhoneCall, 
  BarChart3, 
  CreditCard, 
  Bell, 
  Settings, 
  UserCheck, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const MENU_GROUPS = [
  {
    title: 'Core',
    items: [
      { path: '/company-admin/dashboard', name: 'Dashboard', icon: LayoutDashboard }
    ]
  },
  {
    title: 'Management',
    items: [
      { path: '/company-admin/managers', name: 'Managers', icon: Users },
      { path: '/company-admin/employees', name: 'Employees', icon: User },
      { path: '/company-admin/organizations', name: 'Organizations', icon: Building2 },
      { path: '/company-admin/contacts', name: 'Contacts', icon: Contact }
    ]
  },
  {
    title: 'Sales',
    items: [
      { path: '/company-admin/leads', name: 'Leads', icon: TrendingUp },
      { path: '/company-admin/tasks', name: 'Tasks', icon: CheckSquare },
      { path: '/company-admin/followups', name: 'Follow-ups', icon: PhoneCall }
    ]
  },
  {
    title: 'Analytics',
    items: [
      { path: '/company-admin/reports', name: 'Reports', icon: BarChart3 }
    ]
  },
  {
    title: 'System',
    items: [
      { path: '/company-admin/subscription', name: 'Subscription', icon: CreditCard },
      { path: '/company-admin/notifications', name: 'Notifications', icon: Bell },
      { path: '/company-admin/settings/company-profile', name: 'Settings', icon: Settings },
      { path: '/company-admin/profile', name: 'Profile', icon: UserCheck }
    ]
  }
];

export default function Sidebar({ collapsed, toggleCollapse, mobileOpen, closeMobile }) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-neutral-900/40 lg:hidden transition-opacity backdrop-blur-xs"
>>>>>>> 413f5c6692d57379365d4f133b1a4dff48d2f4a5
        />
      )}

      {/* Sidebar Container */}
<<<<<<< HEAD
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 z-50 flex flex-col transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-wide">ENTERPRISE</span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-400 border border-blue-500/30">
                  CRM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Manager Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation Items Container */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
          {menuGroups.map((group) => {
            const isCollapsed = collapsedSections[group.title];
            return (
              <div key={group.title} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(group.title)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold text-slate-400 tracking-wider uppercase hover:text-slate-200 cursor-pointer transition-colors"
                >
                  <span>{group.title}</span>
                  {isCollapsed ? (
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  )}
                </button>

                {/* Section Links */}
                {!isCollapsed && (
                  <div className="space-y-0.5 mt-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activePage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                            isActive
                              ? 'bg-blue-600 text-white font-semibold shadow-sm'
                              : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon
                              className={`w-4 h-4 shrink-0 ${
                                isActive ? 'text-white' : 'text-slate-400'
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge ? (
                            <span
                              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                isActive
                                  ? 'bg-white text-blue-600'
                                  : 'bg-blue-600 text-white'
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Executive Profile Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center border border-blue-400">
                  MB
                </div>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -bottom-0.5 -right-0.5 ring-2 ring-slate-900" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">Michael Brown</p>
                <p className="text-[10px] text-slate-400 truncate">Sales Manager</p>
              </div>
            </div>
=======
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between bg-neutral-900 text-neutral-300 border-r border-neutral-800 transition-all duration-200 ease-in-out
          ${collapsed ? 'w-[72px]' : 'w-[260px]'} 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:static lg:h-screen`}
      >
        {/* Top Brand Logo Section */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-800 select-none">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-extrabold flex-shrink-0">
                P
              </div>
              {!collapsed && (
                <span className="font-black text-sm tracking-wider text-white truncate">
                  PANORAMA CRM
                </span>
              )}
            </div>
            
            {/* Collapse Arrow Toggle Button */}
            <button 
              onClick={toggleCollapse}
              className="hidden lg:flex w-6 h-6 rounded-md hover:bg-neutral-800 border border-neutral-800 items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Navigation Items Scroll Container */}
          <nav className="p-3 space-y-4 overflow-y-auto crm-scrollbar max-h-[calc(100vh-140px)] select-none">
            {MENU_GROUPS.map((group, idx) => (
              <div key={idx} className="space-y-1">
                {/* Group Title Section */}
                {!collapsed && (
                  <span className="px-3 text-[10px] font-black uppercase text-neutral-500 tracking-widest block py-1.5">
                    {group.title}
                  </span>
                )}
                
                {/* Menu items in group */}
                <div className="space-y-0.5">
                  {group.items.map((item, itemIdx) => {
                    const MenuIcon = item.icon;
                    return (
                      <NavLink
                        key={itemIdx}
                        to={item.path}
                        onClick={closeMobile}
                        className={({ isActive }) => `
                          flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all group relative
                          ${isActive 
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30' 
                            : 'hover:bg-neutral-800/60 hover:text-white text-neutral-400'}
                        `}
                      >
                        <MenuIcon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && <span className="truncate">{item.name}</span>}
                        
                        {/* Hover Tooltip (Shown only when sidebar is collapsed) */}
                        {collapsed && (
                          <div className="absolute left-[78px] top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-[10px] font-bold text-white shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all">
                            {item.name}
                          </div>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer User Avatar Card Section */}
        <div className="p-4 border-t border-neutral-800 select-none bg-neutral-950/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-primary-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              RS
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">Raj Sonar</p>
                <p className="text-[10px] text-neutral-500 truncate">raj.sonar@panorama.io</p>
              </div>
            )}
>>>>>>> 413f5c6692d57379365d4f133b1a4dff48d2f4a5
          </div>
        </div>
      </aside>
    </>
  );
}
<<<<<<< HEAD
=======

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  closeMobile: PropTypes.func.isRequired
};
>>>>>>> 413f5c6692d57379365d4f133b1a4dff48d2f4a5
