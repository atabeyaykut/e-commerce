import React from "react";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    
    const variants = {
      default: "bg-gray-900 text-white hover:bg-gray-800",
      outline: "border border-gray-200 bg-white hover:bg-gray-100 text-gray-900",
      ghost: "hover:bg-gray-100 text-gray-900",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    };

    return (
      <Comp
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
          ${variants[variant]}
          ${sizes[size]}
          ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
