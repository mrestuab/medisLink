import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { getCurrentUserProfile, getMyNotifications, markNotificationAsRead } from '../services/userServices';

const UserLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Loading...", role: "" });
  
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getCurrentUserProfile();
        setUser(profile);
      } catch (error) {
        console.error("Gagal ambil profil user:", error);
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  const fetchNotifs = async () => {
    const data = await getMyNotifications();
    if (data) {
      setNotifications(data);
      const unread = data.filter(n => !n.is_read).length;
      setUnreadCount(unread);
    }
  };

  useEffect(() => {
    fetchNotifs(); 
    
    const interval = setInterval(fetchNotifs, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleReadNotif = async (id, isRead) => {
    if (!isRead) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      await markNotificationAsRead(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getNotifIcon = (type) => {
    switch(type) {
        case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
        default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold shadow-teal-100 shadow-lg group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-800">MedisLink</span>
          </Link>

          <div className="flex items-center gap-4">
            
            <div className="relative" ref={notifRef}>
                <button 
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-teal-600"
                >
                    <Bell className="w-6 h-6" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {isNotifOpen && (
                    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-sm text-gray-800">Notifikasi</h3>
                            <button onClick={() => setIsNotifOpen(false)}><X className="w-4 h-4 text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        
                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-6 text-center text-gray-400 text-sm">
                                    Belum ada notifikasi.
                                </div>
                            ) : (
                                <ul>
                                    {notifications.map((notif) => (
                                        <li 
                                            key={notif.id} 
                                            onClick={() => handleReadNotif(notif.id, notif.is_read)}
                                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors flex gap-3 ${!notif.is_read ? 'bg-teal-50/30' : ''}`}
                                        >
                                            <div className="mt-0.5 flex-shrink-0">
                                                {getNotifIcon(notif.type)}
                                            </div>
                                            <div>
                                                <h4 className={`text-sm ${!notif.is_read ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                                                    {notif.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                    {notif.message}
                                                </p>
                                                <p className="text-[10px] text-gray-400 mt-2">
                                                    {new Date(notif.created_at).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            {!notif.is_read && (
                                                <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"></div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role || 'User'}</p>
            </div>

            <button 
                onClick={handleLogout} 
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-10">
        <Outlet />
      </main>

    </div>
  );
};

export default UserLayout;