import React from 'react';
import { cn } from '../../lib/utils';

export const Image = React.forwardRef(({ 
  src, 
  alt, 
  fallbackSrc, 
  className, 
  containerClassName,
  ...props 
}, ref) => {
  const [error, setError] = React.useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
    }
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <img
        ref={ref}
        src={error ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        className={cn("object-cover", className)}
        {...props}
      />
    </div>
  );
});

Image.displayName = 'Image';
