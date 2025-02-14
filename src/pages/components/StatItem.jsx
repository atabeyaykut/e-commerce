import React, { memo } from 'react';

const StatItem = memo(({ value, label }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-[#252B42] mb-2">{value}</div>
    <div className="text-sm lg:text-base text-gray-600">{label}</div>
  </div>
));

export default StatItem;
