import { twMerge } from "tailwind-merge"

export function PulsatingImage({ className, imageClass, ...props }: { src?: string, alt: string, className?: string, imageClass?: string }) {
  const commonClasses = twMerge("w-full rounded-xl h-full w-full", imageClass)
  return (
    <div className={twMerge("relative", className)}>
      <div className={twMerge("-z-[1] absolute bg-gray-500 animate-pulse", commonClasses)}></div>
      <img {...props} className={twMerge("object-cover", commonClasses)} />
    </div>
  )
}