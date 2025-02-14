import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const BreadcrumbItem = memo(({ item, isLast }) => (
  isLast ? (
    <span className="text-gray-900">{item.label}</span>
  ) : (
    <Link to={item.path} className="text-blue-600 hover:text-blue-800">
      {item.label}
    </Link>
  )
));

const PageHeader = memo(({ title, description, breadcrumbs = [] }) => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center">
          {breadcrumbs.length > 0 && (
            <nav className="flex justify-center space-x-2 mb-4">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.path}>
                  {index > 0 && <span className="text-gray-400">/</span>}
                  <BreadcrumbItem 
                    item={item} 
                    isLast={index === breadcrumbs.length - 1} 
                  />
                </React.Fragment>
              ))}
            </nav>
          )}
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

PageHeader.displayName = 'PageHeader';

export default PageHeader;
