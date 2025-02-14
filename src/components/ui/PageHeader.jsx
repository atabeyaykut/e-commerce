import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title }) => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400 mx-2">›</span>
              </li>
              <li>
                <span className="text-gray-900">{title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default memo(PageHeader);
