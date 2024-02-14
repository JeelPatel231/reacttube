"use client"

import { InvidiousAPI } from "../lib/Invidious"
import { CommentResponse } from "../lib/types/CommentResponse"
import { useEffect, useState } from "react"
import PillButton from "./PillButtons"
import SingleComment from "./SingleComment"

export type CommentsRendererProps = {
  videoId: string,
  initialContinuation?: string
}

export default function CommentsRenderer({
  videoId, initialContinuation
}: CommentsRendererProps) {
  const [pages, setPages] = useState<CommentResponse[]>([])
  let continuation = pages[pages.length-1]?.continuation
  if(pages.length == 0) {
    continuation = initialContinuation
  }

  const comments = pages.flatMap(page => page.comments).map(comment => <SingleComment {...comment} videoId={videoId} />)

  async function loadMoreComments() {
    // if pages are filled and continuation is null, i.e we reached the end 
    if (pages.length != 0 && continuation == null) return;

    const data = await InvidiousAPI.getVideoComments(videoId, continuation)
    setPages([...pages, data])
  }

  useEffect(() => {
    loadMoreComments()
  }, [])


  return (
    <>
      {comments}
      {continuation &&
        <PillButton className="w-fit" onClick={loadMoreComments}>Show More</PillButton>
      }
    </>
  )
}