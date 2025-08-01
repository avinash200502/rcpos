import React, { useState } from 'react';
import { Package, Building2, ChevronDown, Bell, Filter, Calendar, Settings } from 'lucide-react';

const TopBar = ({ onSidebarToggle }) => {
  const [selectedProject, setSelectedProject] = useState('Restaurant POS');
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const projects = ['Restaurant POS', 'E-commerce Store', 'Inventory System', 'CRM Platform'];
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onSidebarToggle} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Package className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative">
            <button onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium">{selectedProject}</span>
              <ChevronDown className="w-4 h-4 text-blue-600" />
            </button>
            {isProjectDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {projects.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => { setSelectedProject(project); setIsProjectDropdownOpen(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {project}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
            <Bell className="w-5 h-5 text-blue-600" />
          </button>
          <button className="p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
            <Filter className="w-5 h-5 text-green-600" />
          </button>
          <button className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
            <Calendar className="w-5 h-5 text-purple-600" />
          </button>
          <button className="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
            <Settings className="w-5 h-5 text-orange-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
