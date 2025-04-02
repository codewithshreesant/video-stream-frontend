
import React, { useState } from 'react';
import {
  useGetCommentsByVideoIdQuery,
  useCreateCommentMutation,
} from '../../features/commentApi';

function CommentSection({ videoId, userId }) {
  const { data: comments, isLoading: isCommentsLoading, isError: isCommentsError, error: commentsError } = useGetCommentsByVideoIdQuery(videoId);
  const [newCommentText, setNewCommentText] = useState('');
  const [createComment, { isLoading: isCreatingComment }] = useCreateCommentMutation();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newCommentText.trim() && userId) {
      try {
        await createComment({ videoId, text: newCommentText }).unwrap();
        setNewCommentText(''); 
      } catch (err) {
        console.error("Failed to create comment:", err);
      }
    } else if (!userId) {
      alert('Please log in to leave a comment.');
    } else {
      alert('Please enter a comment.');
    }
  };

  if (isCommentsLoading) {
    return <p className="text-gray-500 text-sm">Loading comments...</p>;
  }

  if (isCommentsError) {
    return <p className="text-red-500 text-sm">Error loading comments: {commentsError?.message || 'Something went wrong.'}</p>;
  }

  return (
    <div className="mt-4">
      <h4 className="text-md font-semibold text-gray-700 mb-2">Comments</h4>
      {comments && comments.length > 0 ? (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li key={comment._id} className="flex items-start text-sm text-gray-700 rounded-md bg-gray-50 p-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                {comment.userId?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="ml-2">
                <div className="font-semibold">{comment.userId?.username || 'Unknown'}</div>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
      )}

      {userId && (
        <div className="mt-4 bg-white p-3 rounded-md shadow-sm">
          <form onSubmit={handleCommentSubmit} className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-white font-semibold">
              {userId?.substring(0, 2).toUpperCase()} 
            </div>
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-grow ml-3 p-2 border rounded-full text-sm text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm disabled:opacity-50 focus:outline-none focus:ring"
              disabled={isCreatingComment || !newCommentText.trim()}
            >
              {isCreatingComment ? 'Post...' : 'Post'}
            </button>
          </form>
        </div>
      )}
      {!userId && (
        <p className="text-gray-500 text-sm mt-2">Log in to leave a comment.</p>
      )}
    </div>
  );
}

export default CommentSection;