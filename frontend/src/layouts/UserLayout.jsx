import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import { getCurrentUserProfile } from "../services/userServices";

const NOTIFICATION_COUNT = 2;

const UserLayout = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({ name: "Memuat...", role: "" });

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const profile = await getCurrentUserProfile();
        if (profile) {
          setUser({ name: profile.name, role: profile.role });
        } else {
          handleLogout();
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        handleLogout();
      }
    };
    fetchUser();
  }, [navigate, handleLogout]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      
      <header className="fixed top-0 w-full z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto w-full px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="font-semibold text-lg text-gray-800">MedisLink</span>
          </div>

          <div className="flex items-center gap-5">
            
            <button className="relative">
              <Bell className="w-6 h-6" />
              {NOTIFICATION_COUNT > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {NOTIFICATION_COUNT}
                </span>
              )}
            </button>

            <div className="text-right hidden sm:block">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role || "User"}</p>
            </div>

            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-20 pb-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;