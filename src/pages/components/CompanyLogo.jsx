import React, { memo } from 'react';

const CompanyLogo = memo(({ company }) => (
  <img
    loading="lazy"
    src={company.logo}
    alt={company.name}
    className="h-8 lg:h-10 w-auto grayscale hover:grayscale-0 transition-all"
    width="120"
    height="40"
  />
));

export default CompanyLogo;
