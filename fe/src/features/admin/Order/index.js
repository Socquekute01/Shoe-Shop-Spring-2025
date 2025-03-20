import React, { useState } from 'react';
import { Search, MoreHorizontal, Filter, Edit, Eye, Plus } from 'lucide-react';

const OrderPage = () => {
  // Sample data based on the image
  const [orders, setOrders] = useState([
    { id: '#1002', date: '11 Feb, 2024', customer: 'Wade Warren', payment: 'Pending', total: '$20.00', delivery: 'N/A', items: '2 items', fulfillment: 'Unfulfilled' },
    { id: '#1004', date: '13 Feb, 2024', customer: 'Esther Howard', payment: 'Success', total: '$22.00', delivery: 'N/A', items: '3 items', fulfillment: 'Fulfilled' },
    { id: '#1007', date: '15 Feb, 2024', customer: 'Jenny Wilson', payment: 'Pending', total: '$25.00', delivery: 'N/A', items: '1 items', fulfillment: 'Unfulfilled' },
    { id: '#1009', date: '17 Feb, 2024', customer: 'Guy Hawkins', payment: 'Success', total: '$27.00', delivery: 'N/A', items: '5 items', fulfillment: 'Fulfilled' },
    { id: '#1011', date: '19 Feb, 2024', customer: 'Jacob Jones', payment: 'Pending', total: '$32.00', delivery: 'N/A', items: '4 items', fulfillment: 'Unfulfilled' },
    { id: '#1013', date: '21 Feb, 2024', customer: 'Kristin Watson', payment: 'Success', total: '$25.00', delivery: 'N/A', items: '3 items', fulfillment: 'Fulfilled' },
    { id: '#1015', date: '23 Feb, 2024', customer: 'Albert Flores', payment: 'Pending', total: '$28.00', delivery: 'N/A', items: '2 items', fulfillment: 'Unfulfilled' },
    { id: '#1018', date: '25 Feb, 2024', customer: 'Eleanor Pena', payment: 'Success', total: '$35.00', delivery: 'N/A', items: '1 items', fulfillment: 'Fulfilled' },
    { id: '#1019', date: '27 Feb, 2024', customer: 'Theresa Webb', payment: 'Pending', total: '$20.00', delivery: 'N/A', items: '2 items', fulfillment: 'Unfulfilled' },
  ]);

  // Current active tab
  const [activeTab, setActiveTab] = useState('All');

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unfulfilled') return order.fulfillment === 'Unfulfilled';
    if (activeTab === 'Unpaid') return order.payment === 'Pending';
    if (activeTab === 'Open') return true; // Assuming all orders are open
    if (activeTab === 'Closed') return false; // Assuming no orders are closed
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Navigation Tabs */}
      <div className="flex items-center border-b pb-4">
        <div className="flex space-x-6">
          {['All', 'Unfulfilled', 'Unpaid', 'Open', 'Closed'].map((tab) => (
            <button
              key={tab}
              className={`px-1 py-2 text-sm font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <button className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md">
            <Plus size={16} />
            <span>Add</span>
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search size={16} className="absolute left-2.5 top-2 text-gray-400" />
          </div>
          <button className="p-1.5 border rounded-md">
            <Filter size={16} className="text-gray-500" />
          </button>
          <button className="p-1.5 border rounded-md">
            <MoreHorizontal size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="p-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="p-3">Order</th>
              <th className="p-3">Date <span className="text-gray-400">↓</span></th>
              <th className="p-3">Customer</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Total</th>
              <th className="p-3">Delivery</th>
              <th className="p-3">Items</th>
              <th className="p-3">Fulfillment</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="p-3 font-medium text-gray-900">{order.id}</td>
                <td className="p-3 text-sm text-gray-500">{order.date}</td>
                <td className="p-3 text-sm text-gray-500">{order.customer}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${order.payment === 'Success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.payment}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-500">{order.total}</td>
                <td className="p-3 text-sm text-gray-500">{order.delivery}</td>
                <td className="p-3 text-sm text-gray-500">{order.items}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${order.fulfillment === 'Fulfilled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {order.fulfillment}
                  </span>
                </td>
                <td className="p-3 flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;