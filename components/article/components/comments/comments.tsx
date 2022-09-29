import { Avatar, Divider, Group, Skeleton, Stack } from "@mantine/core";
import { Fragment, useState } from "react";
import { AfridiDevAuthor } from "../../../author/widgets/square-horizontal-author";
import BaseComment, { AfridiDevComment } from "../../../comments/base-comment";
import RepliedComment from "../../../comments/replied-comment";
import EmptyPlaceholder from "../../../global/placeholders/empty";
import CommentsSkeleton from "../../../global/skeletons/comments";

interface ArticleCommentsProps {
  comments: Array<AfridiDevComment>;
  openCommentEditor: Function;
  setCommentId: Function;
  author_id: string;
  coAuthors: Array<AfridiDevAuthor>;
  getComments: Function;
}

const ArticleComments = ({
  comments,
  author_id,
  coAuthors,
  openCommentEditor,
  setCommentId,
  getComments,
}: ArticleCommentsProps) => {
  return (
    <Stack spacing={0} className="w-full">
      {comments ? (
        comments.length > 0 ? (
          comments.map((mapped: AfridiDevComment) => (
            <BaseComment
              getComments={getComments}
              article_author_id={author_id}
              articleCoAuthors={coAuthors}
              setCommentId={setCommentId}
              openCommentEditor={openCommentEditor}
              key={mapped.id}
              comment={mapped}
            />
          ))
        ) : (
          <EmptyPlaceholder
            title="Hmmmmm.... Empty 🤔"
            description="Post a comment, maybe? 👀"
            height={200}
            // image={}
          />
        )
      ) : (
        <Fragment>
          <CommentsSkeleton />
          <CommentsSkeleton />
          <CommentsSkeleton />
        </Fragment>
      )}
    </Stack>
  );
};

export default ArticleComments;
