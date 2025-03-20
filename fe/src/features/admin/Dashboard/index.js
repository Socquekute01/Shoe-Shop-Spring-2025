import React from 'react';
import { ShoppingBag, User, ShoppingCart, Mail, TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ icon, title, value, trend, color }) => {
  const bgColor = `bg-${color}-50`;
  const textColor = `text-${color}-600`;
  const trendIcon = trend > 0 ? <TrendingUp size={14} className="text-green-600" /> : <TrendingDown size={14} className="text-red-600" />;
  
  return (
    <div className={`p-6 rounded-lg ${bgColor}`}>
      <div className="flex justify-between items-center mb-2">
        <div className={`${textColor}`}>{icon}</div>
        <div className="flex items-center gap-1">
          {trendIcon}
          <span className={trend > 0 ? "text-green-600" : "text-red-600"}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        </div>
      </div>
      <div className="text-gray-600">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

const DashboardPage = () => {
  const stats = [
    { icon: <ShoppingBag size={24} />, title: 'Weekly sales', value: '714k', trend: 2.6, color: 'blue' },
    { icon: <User size={24} />, title: 'New users', value: '1.35m', trend: -0.1, color: 'purple' },
    { icon: <ShoppingCart size={24} />, title: 'Purchase orders', value: '1.72m', trend: 2.8, color: 'yellow' },
    { icon: <Mail size={24} />, title: 'Messages', value: '234', trend: 3.6, color: 'red' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Hi, Welcome back 👋</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Current visits</h2>
          <div className="aspect-square max-h-64 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-w-xs">
                {/* Pie chart placeholder */}
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-white relative">
                    <div className="absolute inset-0 border-t-8 border-l-8 border-blue-500 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                    <div className="absolute inset-0 border-t-8 border-l-8 border-r-8 border-yellow-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                    <div className="absolute inset-0 border-b-8 border-l-8 border-purple-500 rounded-full" style={{ clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)' }}></div>
                    <div className="absolute inset-0 border-r-8 border-red-500 rounded-full" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>America</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Asia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Europe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Africa</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Website visits</h2>
            <span className="text-green-600">(+43%) than last year</span>
          </div>
          <div className="h-64">
            {/* Bar chart placeholder */}
            <div className="h-full flex items-end gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex justify-center gap-1">
                    <div className="w-3/12 bg-blue-600" style={{ height: `${Math.random() * 60 + 20}px` }}></div>
                    <div className="w-3/12 bg-blue-200" style={{ height: `${Math.random() * 60 + 20}px` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span>Team A</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-200"></div>
              <span>Team B</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;