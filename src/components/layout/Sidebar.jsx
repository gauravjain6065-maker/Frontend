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
  ChevronRight
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
        />
      )}

      {/* Sidebar Container */}
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
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold flex-shrink-0">
                P
              </div>
              {!collapsed && (
                <span className="font-black text-sm tracking-wider text-white truncate">
                  ENTERPRISE CRM
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
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
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
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              JD
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">John Doe</p>
                <p className="text-[10px] text-neutral-500 truncate">john.doe@enterprise.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func,
  mobileOpen: PropTypes.bool,
  closeMobile: PropTypes.func
};
