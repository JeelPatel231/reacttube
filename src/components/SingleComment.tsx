"use client"

import { useState } from "react"
import type { Comment } from "../lib/types/CommentResponse"
import PillButton from "./PillButtons"
import CommentsRenderer from "./CommentsRenderer"

export default function SingleComment(x: Comment & { videoId: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div key={x.commentId} className="flex flex-row gap-4">
      <img src={x.authorThumbnails?.[0].url} className="h-10 rounded-full" />
      <div className="break-all">
        <div className="font-bold text-sm h-5">
          <span> {x.author} </span>
          <span className="muted text-xs"> {x.publishedText} </span>
        </div>
        <div className="anchors" dangerouslySetInnerHTML={{ __html: x.contentHtml }}>
        </div>
        <div className="flex items-center gap-2 text-xs mt-2">
          <span className="material-symbols-outlined">thumb_up</span>{x.likeCount}
        </div>
          {x.replies &&
            <PillButton className="mt-3" onClick={() => setExpanded(!expanded)}>
              {x.replies.replyCount} Replies
            </PillButton>
          }
          {x.replies && expanded &&
            <div className="flex flex-col gap-4 py-4">
              <CommentsRenderer videoId={x.videoId} initialContinuation={x.replies.continuation} />
            </div>
          }
      </div>
    </div>
  )
}