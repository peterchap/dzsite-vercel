import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export function Container({ children, className = "", as: Tag = "div" }: Props) {
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-6 ${className}`}>
      {children}
    </Tag>
  );
}

