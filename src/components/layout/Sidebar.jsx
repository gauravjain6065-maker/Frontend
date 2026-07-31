import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  Shield
} from 'lucide-react';

const MENU_GROUPS = [
  {
    title: 'Core',
    items: [
      { key: 'dashboard', name: 'Dashboard', icon: LayoutDashboard }
    ]
  },
  {
    title: 'Management',
    items: [
      { key: 'managers', name: 'Managers', icon: Users },
      { key: 'employees', name: 'Employees', icon: User },
      { key: 'organizations', name: 'Organizations', icon: Building2 },
      { key: 'contacts', name: 'Contacts', icon: Contact }
    ]
  },
  {
    title: 'Sales',
    items: [
      { key: 'leads', name: 'Leads', icon: TrendingUp },
      { key: 'tasks', name: 'Tasks', icon: CheckSquare },
      { key: 'followups', name: 'Follow-ups', icon: PhoneCall }
    ]
  },
  {
    title: 'Analytics',
    items: [
      { key: 'reports', name: 'Reports', icon: BarChart3 }
    ]
  },
  {
    title: 'System',
    items: [
      { key: 'subscription', name: 'Subscription', icon: CreditCard },
      { key: 'notifications', name: 'Notifications', icon: Bell },
      { key: 'settings/company-profile', name: 'Settings', icon: Settings },
      { key: 'profile', name: 'Profile', icon: UserCheck }
    ]
  }
];

export function Sidebar({ collapsed, toggleCollapse, mobileOpen, closeMobile }) {
  const location = useLocation();

  // Determine current active module route prefix
  let prefix = '/admin';
  if (location.pathname.startsWith('/manager')) {
    prefix = '/manager';
  } else if (location.pathname.startsWith('/employee') || location.pathname.startsWith('/crm')) {
    prefix = '/employee';
  }

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-gray-900/60 lg:hidden transition-opacity backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container - Fixed left with Employee Deep Navy Palette (#0B132B) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between bg-[#0B132B] text-slate-300 border-r border-slate-800/60 transition-all duration-200 ease-in-out
          ${collapsed ? 'w-[72px]' : 'w-[260px]'} 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Brand Logo Section */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/60 select-none bg-[#080E21]/40">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold flex-shrink-0 shadow-lg shadow-blue-600/30">
                <Shield className="w-4 h-4 fill-current text-white" />
              </div>
              {!collapsed && (
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-bold text-white tracking-wider text-sm truncate">ENTERPRISE</span>
                  <span className="bg-blue-600/30 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-500/30 shrink-0">CRM</span>
                </div>
              )}
            </div>
            
            {/* Collapse Arrow Toggle Button */}
            <button 
              onClick={toggleCollapse}
              className="hidden lg:flex w-6 h-6 rounded-md hover:bg-slate-800 border border-slate-800 items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                  <span className="px-3 text-[10px] font-bold uppercase text-slate-400 tracking-widest block py-1.5">
                    {group.title}
                  </span>
                )}
                
                {/* Menu items in group */}
                <div className="space-y-0.5">
                  {group.items.map((item, itemIdx) => {
                    const MenuIcon = item.icon;
                    const fullPath = `${prefix}/${item.key}`;
                    return (
                      <NavLink
                        key={itemIdx}
                        to={fullPath}
                        onClick={closeMobile}
                        className={({ isActive }) => `
                          flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all group relative
                          ${isActive 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold' 
                            : 'hover:bg-slate-800/60 hover:text-white text-slate-300'}
                        `}
                      >
                        <MenuIcon className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-white" />
                        {!collapsed && <span className="truncate">{item.name}</span>}
                        
                        {/* Hover Tooltip (Shown only when sidebar is collapsed) */}
                        {collapsed && (
                          <div className="absolute left-[78px] top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-[#0B132B] border border-slate-800 rounded-md text-[10px] font-bold text-white shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all">
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
        <div className="p-4 border-t border-slate-800/60 select-none bg-[#080E21]">
          <div className="flex items-center gap-3 overflow-hidden p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-inner">
              JD
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">John Doe</p>
                <p className="text-[10px] text-slate-400 truncate">john.doe@enterprise.com</p>
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

export default Sidebar;
