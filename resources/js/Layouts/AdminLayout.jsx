import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  LayoutDashboard, 
  Bike, 
  Boxes, 
  Bell, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function AdminLayout({ children, activeTab = 'overview', onSelectTab, testRides = [], products = [] }) {
  const { auth } = usePage().props;

  // Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Theme Management (Dark / Light mode for Admin)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('adminTheme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('adminTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Notification & Profile Dropdowns
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Unread Pending Count
  const pendingRides = testRides.filter(r => r.status === 'pending' || r.status === 'Pending');
  const totalNotificationsCount = pendingRides.length;

  const navMenuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'rides', label: 'Product & Ride Bookings', icon: Bike, badge: pendingRides.length > 0 ? pendingRides.length : null },
    { id: 'products', label: 'Products & Specifications', icon: Boxes, badge: products.length > 0 ? products.length : null },
  ];

  return (
    <div className={`h-screen w-screen flex flex-col font-sans overflow-hidden transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-white'
    }`}>
      
      {/* Top Navigation Bar */}
      <header className={`h-16 shrink-0 sticky top-0 z-40 border-b transition-colors duration-300 ${
        theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0B132B] border-slate-800'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Left Section: Brand & Sidebar Toggle */}
          <div className="flex items-center gap-4">
            
            {/* Desktop Sidebar Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`hidden md:flex p-2 rounded-xl border transition-all ${
                theme === 'light' 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className={`md:hidden p-2 rounded-xl border transition-all ${
                theme === 'light' 
                  ? 'bg-slate-100 border-slate-300 text-slate-700' 
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <img src="/peugeot-lion.svg" alt="Peugeot Admin Logo" className="w-7 h-8 object-contain" />
              <div className="flex items-center gap-2">
                <span className={`font-heading font-extrabold text-lg sm:text-xl tracking-wider uppercase ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  PEUGEOT <span className="text-cyan-400">ADMIN</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 bg-[#00205B] text-cyan-300 border border-cyan-500/30 rounded uppercase hidden sm:inline-block">
                  NP Portal
                </span>
              </div>
            </div>

          </div>

          {/* Right Section: Theme Toggle, Notifications, Profile Dropdown */}
          <div className="flex items-center gap-3">
            
            {/* 1. Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-amber-600 hover:bg-slate-200'
                  : 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
              }`}
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-cyan-600" />}
            </button>

            {/* 2. Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsProfileOpen(false);
                }}
                className={`relative p-2.5 rounded-xl border transition-all ${
                  theme === 'light'
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                }`}
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {totalNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                    {totalNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotificationOpen && (
                <div className={`absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl p-4 border shadow-2xl z-50 animate-fadeIn ${
                  theme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0B132B] border-slate-700 text-white'
                }`}>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-3">
                    <span className="font-heading font-bold text-sm uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <Bell className="w-4 h-4" /> Notifications
                    </span>
                    <span className="text-xs text-slate-400">
                      {totalNotificationsCount} Pending Action{totalNotificationsCount === 1 ? '' : 's'}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {pendingRides.length > 0 ? pendingRides.slice(0, 4).map((ride) => (
                      <div
                        key={`ride-${ride.id}`}
                        onClick={() => {
                          if (onSelectTab) onSelectTab('rides');
                          setIsNotificationOpen(false);
                        }}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          theme === 'light' ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex justify-between font-semibold text-cyan-400 mb-0.5">
                          <span>Product Booking</span>
                          <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 rounded uppercase">Pending</span>
                        </div>
                        <div className="font-bold">{ride.full_name} ({ride.phone})</div>
                        <div className="text-[11px] text-slate-400">Model: {ride.model_id} • Date: {ride.ride_date}</div>
                      </div>
                    )) : (
                      <div className="text-center py-6 text-slate-400 text-xs">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-60" />
                        No pending notifications. All caught up!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Profile & Signout Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationOpen(false);
                }}
                className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border transition-all ${
                  theme === 'light' 
                    ? 'bg-slate-100 border-slate-300 hover:bg-slate-200' 
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00205B] to-[#00A3FF] flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className={`text-xs font-bold leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {auth?.user?.name || 'Admin User'}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight">
                    {auth?.user?.email || 'admin@peugeot.com'}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown Panel */}
              {isProfileOpen && (
                <div className={`absolute right-0 mt-3 w-64 rounded-2xl p-4 border shadow-2xl z-50 animate-fadeIn ${
                  theme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0B132B] border-slate-700 text-white'
                }`}>
                  <div className="pb-3 border-b border-slate-800/60 mb-3">
                    <div className="font-bold text-sm">{auth?.user?.name || 'Administrator'}</div>
                    <div className="text-xs text-cyan-400">{auth?.user?.email || 'admin@peugeot.com'}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-950/60 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/30">
                      Super Admin Role
                    </span>
                  </div>

                  <div className="space-y-1">
                    <Link
                      href="/admin/logout"
                      method="post"
                      as="button"
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/30 transition-all text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Body Area with Fixed Collapsible Sidebar & Scrollable Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Collapsible Sidebar (Fixed height) */}
        <aside className={`hidden md:flex flex-col border-r h-full overflow-y-auto shrink-0 transition-all duration-300 z-30 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${
          theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#090B10] border-slate-800'
        }`}>
          
          {/* Sidebar Menu Items */}
          <div className="p-3 space-y-1 flex-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab && onSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00205B] to-[#0055A5] text-white shadow-lg border border-cyan-400/40'
                      : theme === 'light'
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-cyan-300' : ''}`} />
                  
                  {!isSidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}

                  {item.badge && !isSidebarCollapsed && (
                    <span className="ml-auto px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800/60 text-[11px] text-slate-500 text-center shrink-0">
            {!isSidebarCollapsed && (
              <span>Peugeot Motocycles NP v2.0</span>
            )}
          </div>
        </aside>

        {/* Mobile Drawer Sidebar */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex">
            <div className={`w-64 p-4 border-r flex flex-col justify-between h-full ${
              theme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0B132B] border-slate-800 text-white'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
                  <span className="font-heading font-bold text-sm uppercase text-cyan-400">Navigation Menu</span>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (onSelectTab) onSelectTab(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#00205B] to-[#0055A5] text-white shadow-lg'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport (Scrollable container) */}
        <main className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto pb-12">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
