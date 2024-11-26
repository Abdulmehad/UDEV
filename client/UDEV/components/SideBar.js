import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 text-white w-64 h-screen">
      <nav>
        <ul className="p-4">
          <li className="mb-4"><Link to="/">Home</Link></li>
          <li className="mb-4"><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/services">Our Services</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;