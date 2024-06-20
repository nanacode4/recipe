// src/components/CommentsList.tsx
import React, { useEffect, useState } from "react";
import commentService, { Comment } from "../../services/commentService";

interface CommentsListProps {
  recipeId: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await commentService.getRecipeComments(recipeId);
        setComments(fetchedComments);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch comments");
        setLoading(false);
      }
    };

    fetchComments();
  }, [recipeId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = Number(localStorage.getItem("userId")); // Assume user ID is stored in local storage
      const comment = {
        recipeId,
        userId,
        content: newComment,
      };
      const submittedComment = await commentService.commentOnRecipe(comment);
      setComments([...comments, submittedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Failed to submit comment");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <small>
                Posted by User {comment.userId} on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleCommentSubmit}>
        <div className="mb-3">
          <label htmlFor="newComment" className="form-label">Add a Comment</label>
          <textarea
            id="newComment"
            className="form-control"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentsList;
