import React from 'react';
import { cn } from "../../lib/utils";

const LoadingSpinner = ({ className }) => {
  return (
    <div className={cn("animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500", className)}></div>
  );
};

export default LoadingSpinner;
