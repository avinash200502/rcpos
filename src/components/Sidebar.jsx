import React, { useState } from 'react';
import {
  BarChart3,
  ShoppingCart,
  Package,
  CreditCard,
  Settings,
  FileText,
  Receipt,
  ChevronDown,
  ChevronRight,
  Building2,
  DollarSign,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    { icon: Package, label: 'Inventory', hasSubmenu: true, submenu: ['Products', 'Categories', 'Stock'] },
    { icon: BarChart3, label: 'Sales', hasSubmenu: true, submenu: ['Orders', 'Customers', 'Reports'] },
    { icon: ShoppingCart, label: 'Purchases', hasSubmenu: true, submenu: ['Purchase Orders', 'Vendors', 'Invoices'] },
    { icon: CreditCard, label: 'Table Management', hasSubmenu: false },
    { icon: Receipt, label: 'Offers', hasSubmenu: false },
    { icon: Settings, label: 'Management', hasSubmenu: true, submenu: ['Designation', 'Department', 'Employee'] },
    { icon: Settings, label: 'Settings', hasSubmenu: false },
    { icon: FileText, label: 'Reports', hasSubmenu: true, submenu: ['Sales Report', 'Inventory Report', 'Financial Report'] },
    { icon: DollarSign, label: 'Expenses', hasSubmenu: false },
  ];

  const toggleSubmenu = (label) => setExpandedMenus(prev => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 min-h-screen ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header with toggle button */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && <span className="font-bold text-xl text-gray-800">DashBoard</span>}
        </div>
        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="text-gray-800 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isExpanded = expandedMenus[item.label];

          return (
            <div key={index}>
              <div
                className={`flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors ${
                  item.hasSubmenu ? '' : 'select-none'
                }`}
                onClick={() => item.hasSubmenu && toggleSubmenu(item.label)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="ml-3 flex-1">{item.label}</span>
                    {item.hasSubmenu &&
                      (isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </>
                )}
              </div>
              {!isCollapsed && item.hasSubmenu && isExpanded && (
                <div className="bg-gray-50">
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="pl-12 py-2 text-sm text-gray-900 hover:text-blue-600 cursor-pointer transition-colors 
background-color:blue"
                    >
                      {item.label === 'Management' && subItem === 'Designation' ? (
                        <Link to="/management/Designation">{subItem}</Link>
                      ) : item.label === 'Management' && subItem === 'Department' ? (
                        <Link to="/management/department">{subItem}</Link>
                      ) : item.label === 'Management' && subItem === 'Employee' ? (
                        <Link to="/management/Employee">{subItem}</Link>
                      ) : (
                        subItem
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
