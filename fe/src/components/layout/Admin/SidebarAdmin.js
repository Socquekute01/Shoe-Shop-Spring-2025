import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  User, 
  ShoppingCart, 
  FileText, 
  LogIn, 
  AlertCircle 
} from 'lucide-react';

const SidebarAdmin = ({ selectedTeam }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Order", icon: <FileText size={20} />, path: "/order" },
    { name: "Blog", icon: <FileText size={20} />, path: "/blog" },
    {
      name: "Product",
      icon: <ShoppingCart size={20} />,
      path: "/admin/product-management",
      badge: "+3",
    },
    { name: "User", icon: <User size={20} />, path: "/admin/user-management" },
    { name: "Sign in", icon: <LogIn size={20} />, path: "/signin" },
  ];

  return (
    <div className="w-60 bg-white shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="font-medium">{selectedTeam}</span>
        </div>
      </div>
      <div className="py-4">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors ${
              currentPath === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`${currentPath === item.path ? 'text-blue-600' : 'text-gray-400'}`}>
                {item.icon}
              </div>
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span className="bg-orange-100 text-orange-600 px-1 rounded text-xs">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarAdmin;