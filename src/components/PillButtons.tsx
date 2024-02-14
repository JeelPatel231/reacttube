import { ButtonHTMLAttributes, Component, DetailedHTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type PillButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function PillButton(
  { children, className, ...props } : PillButtonProps
) {
  return (
    <button 
      className={twMerge("h-10 py-2 flex items-center gap-2 px-4 rounded-full border-none font-bold text-sm cursor-pointer hover:bg-gray-300", className)} 
      {...props} >

      {children}

    </button>
  )
}