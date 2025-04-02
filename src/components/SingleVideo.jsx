import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'react-toastify';
import {
  useGetSingleVideoQuery,
} from '../../features/videoApi';
import CommentSection from './CommentSection';
import {
  useAddReactionMutation,
  useRemoveReactionMutation,
  useGetUserReactionForVideoQuery,
  useGetReactionsForVideoQuery,
} from '../../features/reactionApi';
import { FaThumbsUp, FaThumbsDown, FaHeart, FaLaughBeam, FaSadTear, FaAngry } from 'react-icons/fa';

function SingleVideo() {
  const { videoId } = useParams();
  const { data: video, isLoading, isError, error } = useGetSingleVideoQuery(videoId);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.[0]?._id;
  const [addReaction] = useAddReactionMutation();
  const [removeReaction] = useRemoveReactionMutation();
  const { data: userReaction } = useGetUserReactionForVideoQuery(videoId);
  const { data: reactionsData } = useGetReactionsForVideoQuery(videoId);

  const reactionsCount = reactionsData?.message.reduce((acc, reaction) => {
    acc[reaction.reactionType] = (acc[reaction.reactionType] || 0) + 1;
    return acc;
  }, {});

  const handleAddReaction = async (reactionType) => {
    if (!userId) {
      toast.error('Please log in to react to the video.');
      return;
    }
    try {
      await addReaction({ videoId, reactionType }).unwrap();
    } catch (err) {
      toast.error('Could not add reaction.');
      console.error('Add reaction error:', err);
    }
  };

  const handleRemoveReaction = async () => {
    if (!userId || !userReaction?.data) {
      toast.warn('No reaction to remove.');
      return;
    }
    try {
      await removeReaction(videoId).unwrap();
    } catch (err) {
      toast.error('Could not remove reaction.');
      console.error('Remove reaction error:', err);
    }
  };

  const isUserReacted = (type) => userReaction?.data?.reactionType === type;

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 py-8 flex justify-center items-center text-white">Loading video...</div>;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 flex justify-center items-center text-red-400">
        Error loading video: {error?.message || 'Something went wrong.'}
      </div>
    );
  }

  if (!video) {
    return <div className="min-h-screen bg-gray-900 py-8 flex justify-center items-center text-gray-300">Video not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-6 text-white">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-700 flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
              {video?.data.uploader?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-300">
              {video?.data.uploader ? (
                <Link to={`/users/${video?.data.uploader._id}`} className="hover:underline text-indigo-400">
                  {video?.data.uploader.username}
                </Link>
              ) : (
                'Unknown User'
              )}
            </p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNowStrict(new Date(video?.data.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="relative aspect-w-16 aspect-h-9 bg-black">
          <video controls className="w-full h-full object-cover">
            <source src={video?.data.filePath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>


        <div className="px-4 py-2 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-500">
            <button
              onClick={() => handleAddReaction('like')}
              className={`flex items-center space-x-1 ${isUserReacted('like') ? 'text-blue-400' : 'hover:text-blue-400'} focus:outline-none`}
            >
              <FaThumbsUp className="h-5 w-5" />
              <span className="text-sm">{reactionsCount?.like || 0}</span>
            </button>
            <button
              onClick={() => handleAddReaction('dislike')}
              className={`flex items-center space-x-1 ${isUserReacted('dislike') ? 'text-red-400' : 'hover:text-red-400'} focus:outline-none`}
            >
              <FaThumbsDown className="h-5 w-5" />
              <span className="text-sm">{reactionsCount?.dislike || 0}</span>
            </button>
            <button
              onClick={() => handleAddReaction('heart')}
              className={`flex items-center space-x-1 ${isUserReacted('heart') ? 'text-red-500' : 'hover:text-red-500'} focus:outline-none`}
            >
              <FaHeart className="h-5 w-5" />
              <span className="text-sm">{reactionsCount?.heart || 0}</span>
            </button>
            <button
              onClick={() => handleAddReaction('laugh')}
              className={`flex items-center space-x-1 ${isUserReacted('laugh') ? 'text-yellow-400' : 'hover:text-yellow-400'} focus:outline-none`}
            >
              <FaLaughBeam className="h-5 w-5" />
              <span className="text-sm">{reactionsCount?.laugh || 0}</span>
            </button>
            <button
              onClick={() => handleAddReaction('sad')}
              className={`flex items-center space-x-1 ${isUserReacted('sad') ? 'text-blue-200' : 'hover:text-blue-200'} focus:outline-none`}
            >
              <FaSadTear className="h-5 w-5" />
              <span className="text-sm">{reactionsCount?.sad || 0}</span>
            </button>
            <button
              onClick={() => handleAddReaction('angry')}
              className={`flex items-center space-x-1 ${isUserReacted('angry') ? 'text-orange-400' : 'hover:text-orange-400'} focus:outline-none`}
            >
              <FaAngry className="h-5 w-5" />
              <span className="text-sm">{reactionsCount?.angry || 0}</span>
            </button>
            {userReaction?.data && (
              <button onClick={handleRemoveReaction} className="text-gray-500 hover:text-gray-400 text-sm focus:outline-none">
                Remove Reaction
              </button>
            )}
          </div>
          <div className="text-gray-500 text-sm">
            {video?.data.views} Views
          </div>
        </div>

        {/* Post Description */}
        {video?.data.description && (
          <div className="px-4 py-3 text-gray-400 text-sm">
            {video.data.description}
          </div>
        )}

        <div className="px-4 py-3 bg-gray-800">
          <CommentSection videoId={videoId} userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default SingleVideo;