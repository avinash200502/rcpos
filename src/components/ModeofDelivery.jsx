import React from 'react';

const ModeOfDelivery = () => {
  const deliveryModes = [
    { mode: 'Dine In', count: 45, color: 'bg-blue-500' },
    { mode: 'Takeaway', count: 28, color: 'bg-green-500' },
    { mode: 'Delivery', count: 35, color: 'bg-purple-500' },
    { mode: 'Online', count: 22, color: 'bg-orange-500' }
  ];
  const total = deliveryModes.reduce((sum, item) => sum + item.count, 0);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mode of Delivery</h3>
      <div className="space-y-4">
        {deliveryModes.map((item, index) => {
          const percentage = ((item.count / total) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm font-medium text-gray-700">{item.mode}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{item.count}</span>
                <span className="text-xs text-gray-500">({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ModeOfDelivery;
