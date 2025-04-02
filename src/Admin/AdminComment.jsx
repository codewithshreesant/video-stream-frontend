import React, { useState } from 'react';
import { useDeleteCommentMutation, useGetAllCommentsQuery, useUpdateCommentMutation } from '../../features/commentApi';
import { FaUserCircle, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa'; 

function AdminComment() {
  const { data, error, isLoading, refetch } = useGetAllCommentsQuery();
  const [deleteCommentApi] = useDeleteCommentMutation();
  const [updateCommentApi] = useUpdateCommentMutation();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditedText(comment.text);
  };

  const handleSave = async (commentId) => {
    try {
      console.log("edited text ", editedText)
      await updateCommentApi({ commentId: commentId, text: editedText }).unwrap();
      setEditingCommentId(null);
      refetch();
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteCommentApi(commentId).unwrap();
        refetch();
      } catch (err) {
        console.error('Error deleting comment:', err);
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading comments.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Comments</h2>
      <div className="space-y-4">
        {data?.map((comment) => (
          <div key={comment._id} className="bg-white rounded-lg shadow-md p-4 flex">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
              {comment.userId?.username ? (
                <FaUserCircle className="text-gray-500 text-2xl" />
              ) : (
                <FaUserCircle className="text-gray-500 text-2xl" />
              )}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">
                  {comment.userId?.username || 'Anonymous User'}
                </h3>
                <div className="text-sm text-gray-500">
                  Created: {new Date(comment.createdAt).toLocaleString()}
                </div>
              </div>
              {editingCommentId === comment._id ? (
                <div className="mb-3">
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                </div>
              ) : (
                <p className="text-gray-800 mb-3">{comment.text}</p>
              )}
              <div className="flex items-center justify-end text-sm text-gray-500">
                <span className="mr-2">Updated: {new Date(comment.updatedAt).toLocaleString()}</span>
                {editingCommentId === comment._id ? (
                  <>
                    <button
                      onClick={() => handleSave(comment._id)}
                      className="text-green-500 hover:text-green-700 focus:outline-none mr-2"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(comment)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none mr-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <FaTrash /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminComment;