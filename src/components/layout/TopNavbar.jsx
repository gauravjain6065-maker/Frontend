import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  Menu, 
  Search, 
  Bell, 
  MessageSquare, 
  Sun, 
  Moon, 
  User, 
  Key, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function TopNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    alert(`Mock Theme Toggled: Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} Mode.`);
  };

  const handleDropdownItem = (path) => {
    setProfileDropdownOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-white border-b border-neutral-200 shadow-sm flex items-center justify-between px-4 md:px-6 select-none">
      
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 focus:outline-none cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="hidden sm:block text-sm font-extrabold text-neutral-800 tracking-wider">
          Panorama Solutions Inc
        </span>
      </div>

      {/* Center: Global Search Bar Mockup */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search CRM databases (Ctrl + K)..." 
            className="w-full h-9 pl-9 pr-4 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all placeholder-neutral-400"
          />
        </div>
      </div>

      {/* Right: Notifications, Messages, Theme, User Avatar */}
      <div className="flex items-center gap-1.5 md:gap-3.5">
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors focus:outline-none cursor-pointer"
        >
          {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Message Actions */}
        <button 
          onClick={() => alert('Opening internal representative messages drawer...')}
          className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors relative focus:outline-none cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-white" />
        </button>

        {/* System Notifications Alerts */}
        <button 
          onClick={() => navigate('/company-admin/notifications')}
          className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors relative focus:outline-none cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger-500 text-[8px] font-black text-white rounded-full flex items-center justify-center ring-2 ring-white select-none">
            3
          </span>
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-neutral-200 mx-1 hidden sm:block" />

        {/* User Profile dropdown */}
        <div className="relative">
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-neutral-100 focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xs">
              RS
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:block" />
          </button>

          {profileDropdownOpen && (
            <>
              {/* Back Drop Close */}
              <div 
                onClick={() => setProfileDropdownOpen(false)}
                className="fixed inset-0 z-40 bg-transparent"
              />
              {/* Dropdown Card */}
              <div className="absolute right-0 mt-2.5 w-48 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 py-1.5 text-xs text-neutral-700 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3.5 py-2 border-b border-neutral-100">
                  <p className="font-bold text-neutral-800">Raj Sonar</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">raj.sonar@panorama.io</p>
                </div>
                <button 
                  onClick={() => handleDropdownItem('/company-admin/profile')}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-50 flex items-center gap-2 text-neutral-600 hover:text-neutral-800 border-0 bg-transparent cursor-pointer font-medium"
                >
                  <User className="w-3.5 h-3.5" />
                  My Profile
                </button>
                <button 
                  onClick={() => handleDropdownItem('/company-admin/profile/change-password')}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-50 flex items-center gap-2 text-neutral-600 hover:text-neutral-800 border-0 bg-transparent cursor-pointer font-medium"
                >
                  <Key className="w-3.5 h-3.5" />
                  Change Password
                </button>
                <DividerMock />
                <button 
                  onClick={() => alert('Signing out of Panorama CRM...')}
                  className="w-full text-left px-3.5 py-2 hover:bg-red-50 hover:text-danger-600 flex items-center gap-2 text-neutral-600 border-0 bg-transparent cursor-pointer font-medium"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

TopNavbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired
};

const DividerMock = () => <div className="h-px bg-neutral-100 my-1" />;
