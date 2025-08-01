import React from 'react';
import { CreditCard } from 'lucide-react';

const transactions = [
  { id: '#1234', customer: 'John Doe', amount: '$45.99', status: 'Completed', time: '2 min ago' },
  { id: '#1235', customer: 'Jane Smith', amount: '$32.50', status: 'Pending', time: '5 min ago' },
  { id: '#1236', customer: 'Bob Johnson', amount: '$78.25', status: 'Completed', time: '8 min ago' },
  { id: '#1237', customer: 'Alice Brown', amount: '$22.80', status: 'Failed', time: '12 min ago' },
  { id: '#1238', customer: 'Mike Wilson', amount: '$156.40', status: 'Completed', time: '15 min ago' }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-700';
    case 'Pending': return 'bg-yellow-100 text-yellow-700';
    case 'Failed': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const RecentTransactions = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
    </div>
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{transaction.customer}</p>
              <p className="text-xs text-gray-500">{transaction.id} • {transaction.time}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{transaction.amount}</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
              {transaction.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default RecentTransactions;
