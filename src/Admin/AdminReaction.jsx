import React from 'react';
import { useGetAllReactionsQuery, useRemoveReactionMutation } from '../../features/reactionApi';
import { FaHeart, FaThumbsUp, FaLaugh, FaSadTear, FaAngry, FaTrash } from 'react-icons/fa';

const reactionIcons = {
  like: FaThumbsUp,
  heart: FaHeart,
  laugh: FaLaugh,
  sad: FaSadTear,
  angry: FaAngry,
};

function AdminReaction() {
  const { data, error, isLoading, refetch } = useGetAllReactionsQuery();
  console.log("reaction data ", data);
  const [removeReaction] = useRemoveReactionMutation();

  const handleDelete = async (reactionId) => {
    if (window.confirm('Are you sure you want to delete this reaction?')) {
      try {
        await removeReaction(reactionId).unwrap();
        refetch();
      } catch (err) {
        console.error('Error deleting reaction:', err);
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading reactions...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading reactions.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Reactions</h2>
      <div className="space-y-4">
        {data?.map((reaction) => (
          <div key={reaction._id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4">
                {reactionIcons[reaction.reactionType] ? (
                  React.createElement(reactionIcons[reaction.reactionType], { className: 'text-xl text-gray-700' })
                ) : (
                  <span className="text-xl text-gray-700">{reaction.reactionType}</span>
                )}
              </div>
              <div>
                <p className="text-gray-700 font-semibold">{reaction?.user?.username || 'Unknown User'}</p>
                <p className="text-gray-500 text-sm">
                  Created: {new Date(reaction.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Updated: {new Date(reaction.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleDelete(reaction._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReaction;