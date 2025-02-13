import React from 'react';
import Breadcrumbs from './Breadcrumbs';

const PageHeader = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-gray-50 py-6 ">
      <div className="max-w-7xl mx-auto flex justify-space-between align-center items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <Breadcrumbs items={breadcrumbs} />
      </div>
    </div>
  );
};

export default PageHeader;
