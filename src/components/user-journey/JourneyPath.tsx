
import React from "react";

interface JourneyPathProps {
  children: React.ReactNode;
}

export function JourneyPath({ children }: JourneyPathProps) {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className="space-y-6">
      {childrenArray.map((child, index) => (
        <div key={index} className="relative">
          {index < childrenArray.length - 1 && (
            <div className="absolute left-5 top-[4.5rem] bottom-[-1.5rem] w-0.5 bg-border"></div>
          )}
          {child}
        </div>
      ))}
    </div>
  );
}
