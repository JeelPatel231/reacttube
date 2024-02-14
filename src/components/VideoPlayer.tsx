'use client'

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge"

type VideoPlayerProps = {
  sources: string[],
  className?: string,
  time?: number,
}


export function VideoPlayer({
  sources,
  className,
  time
}: VideoPlayerProps) {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const sourcesElement = sources.map(src => (
    <source key={src} src={src}></source>
  ))

  useEffect(() => {
    if (time && videoPlayerRef.current) videoPlayerRef.current.currentTime = time
  }, [time])

  return (
    <video ref={videoPlayerRef} controls className={twMerge("w-full rounded-2xl aspect-video", className)}>
      {sourcesElement}
    </video>
  )
}