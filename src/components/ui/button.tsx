"use client";

import { cn } from "@/libs/utils";
import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("mt-5 rounded-lg bg-secondary p-3", className)}
      {...props}
    >
      {children}
    </button>
  );
}
