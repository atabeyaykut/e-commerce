import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        
        {breadcrumbs && (
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((item, index) => (
                <li key={item.link} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2 text-gray-400">/</span>
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-600">{item.label}</span>
                  ) : (
                    <Link
                      to={item.link}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
