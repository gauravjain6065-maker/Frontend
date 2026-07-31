import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Menu,
  Bell,
  User,
  KeyRound,
  LogOut,
  Target,
  Users,
  Building2,
  CheckSquare,
  X,
  ChevronDown,
} from 'lucide-react';

export function Topbar({ activePage, setActivePage, setIsMobileOpen }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Search catalog across module pages and mock items
  const searchableItems = [
    { type: 'Page', title: 'Manager Dashboard', pageId: 'Dashboard', category: 'Pages' },
    { type: 'Page', title: 'Employee Directory', pageId: 'EmployeeList', category: 'Pages' },
    { type: 'Page', title: 'Create Employee Form', pageId: 'CreateEmployee', category: 'Pages' },
    { type: 'Page', title: 'Lead Directory', pageId: 'LeadList', category: 'Pages' },
    { type: 'Page', title: 'Assign Lead Tool', pageId: 'AssignLead', category: 'Pages' },
    { type: 'Page', title: 'Organization Directory', pageId: 'OrganizationList', category: 'Pages' },
    { type: 'Page', title: 'Contact Directory', pageId: 'ContactList', category: 'Pages' },
    { type: 'Page', title: 'Task Directory', pageId: 'TaskList', category: 'Pages' },
    { type: 'Page', title: 'Follow-ups List', pageId: 'FollowUpList', category: 'Pages' },
    { type: 'Page', title: 'Team Performance Report', pageId: 'TeamPerformanceReport', category: 'Pages' },
    { type: 'Page', title: 'Lead Analytics Report', pageId: 'LeadReport', category: 'Pages' },
    { type: 'Page', title: 'Notifications Feed', pageId: 'Notifications', category: 'Pages' },
    { type: 'Page', title: 'My Manager Profile', pageId: 'MyProfile', category: 'Pages' },
    { type: 'Page', title: 'Change Password Security', pageId: 'ChangePassword', category: 'Pages' },
    
    // Sample Entities for search demonstration
    { type: 'Employee', title: 'Sarah Jenkins (Senior Exec)', pageId: 'EmployeeDetails', category: 'People' },
    { type: 'Employee', title: 'Alex Rivera (Account Exec)', pageId: 'EmployeeList', category: 'People' },
    { type: 'Lead', title: 'Acme Corporation ($45,000)', pageId: 'LeadDetails', category: 'Leads' },
    { type: 'Lead', title: 'Global Logistics Corp ($85,000)', pageId: 'LeadList', category: 'Leads' },
    { type: 'Organization', title: 'Acme Corporation (Enterprise)', pageId: 'OrganizationDetails', category: 'Organizations' },
    { type: 'Task', title: 'Review Q3 Team Targets', pageId: 'TaskDetails', category: 'Tasks' },
  ];

  const searchResults = searchQuery.trim()
    ? searchableItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectSearchResult = (pageId) => {
    setActivePage(pageId);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Mobile Menu Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg lg:hidden cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold text-gray-800">Manager Module</span>
          <span>/</span>
          <span className="text-blue-600 font-medium">{activePage}</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div ref={searchRef} className="relative w-full max-w-md mx-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            placeholder="Search leads, employees, tasks, or pages..."
            className="h-9 w-full pl-9 pr-8 rounded-lg border border-gray-200 bg-gray-50 text-xs text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Global Search Results Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-11 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg py-2 max-h-80 overflow-y-auto z-50">
            {searchQuery.trim() ? (
              searchResults.length > 0 ? (
                <div>
                  <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Search Results ({searchResults.length})
                  </p>
                  {searchResults.map((res, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSearchResult(res.pageId)}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-blue-50 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {res.type === 'Page' && <Search className="w-3.5 h-3.5 text-gray-400" />}
                        {res.type === 'Employee' && <Users className="w-3.5 h-3.5 text-blue-500" />}
                        {res.type === 'Lead' && <Target className="w-3.5 h-3.5 text-amber-500" />}
                        {res.type === 'Organization' && <Building2 className="w-3.5 h-3.5 text-purple-500" />}
                        {res.type === 'Task' && <CheckSquare className="w-3.5 h-3.5 text-green-500" />}
                        <span className="font-semibold text-gray-800">{res.title}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{res.type}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-4 text-center text-xs text-gray-500">
                  No matching records or pages found for "<span className="font-medium">{searchQuery}</span>"
                </div>
              )
            ) : (
              <div className="px-4 py-2 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Quick Jump</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <button
                    onClick={() => handleSelectSearchResult('Dashboard')}
                    className="p-2 text-left rounded-lg hover:bg-gray-100 font-medium text-gray-700 cursor-pointer"
                  >
                    📊 Dashboard
                  </button>
                  <button
                    onClick={() => handleSelectSearchResult('LeadList')}
                    className="p-2 text-left rounded-lg hover:bg-gray-100 font-medium text-gray-700 cursor-pointer"
                  >
                    🎯 Lead Directory
                  </button>
                  <button
                    onClick={() => handleSelectSearchResult('EmployeeList')}
                    className="p-2 text-left rounded-lg hover:bg-gray-100 font-medium text-gray-700 cursor-pointer"
                  >
                    👥 Employees
                  </button>
                  <button
                    onClick={() => handleSelectSearchResult('TeamPerformanceReport')}
                    className="p-2 text-left rounded-lg hover:bg-gray-100 font-medium text-gray-700 cursor-pointer"
                  >
                    📈 Reports
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Notifications & Manager Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Notifications Button */}
        <button
          onClick={() => setActivePage('Notifications')}
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center border border-blue-200">
              MB
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-gray-900 leading-tight">Michael Brown</p>
              <p className="text-[10px] text-gray-500">Sales Manager</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-11 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 text-xs">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-bold text-gray-900">Michael Brown</p>
                <p className="text-gray-500 text-[11px]">michael.b@crmsaas.com</p>
              </div>
              <button
                onClick={() => {
                  setActivePage('MyProfile');
                  setIsProfileOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-gray-400" />
                My Profile
              </button>
              <button
                onClick={() => {
                  setActivePage('ChangePassword');
                  setIsProfileOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-gray-400" />
                Change Password
              </button>
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => setIsProfileOpen(false)}
                className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
