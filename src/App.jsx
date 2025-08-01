import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard.jsx';
import Users from './pages/Management/Users.jsx';
import Designation from './pages/Management/Designation.jsx';
import Department from './pages/Management/Department.jsx';
import EmployeeManagement from './pages/Management/EmployeeManagement.jsx';


const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50 w-475">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <TopBar onSidebarToggle={toggleSidebar} />
          <Routes>
            <Route path="/" element={<Dashboard sidebarCollapsed={sidebarCollapsed} />} />
            <Route path="/management/users" element={<Users />} />
            <Route path="/management/Designation" element={<Designation />} />
            <Route path="/management/Department" element={<Department />} />
            <Route path="/management/Employee" element={<EmployeeManagement />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
