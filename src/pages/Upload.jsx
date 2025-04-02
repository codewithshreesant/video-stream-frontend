import React, { useState, useEffect } from 'react';
import {
  useGetAllVideosQuery,
  useIncrementVideoViewsMutation,
} from '../../features/videoApi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDistanceToNowStrict } from 'date-fns';
import {
  useAddReactionMutation,
  useRemoveReactionMutation,
  useGetUserReactionForVideoQuery,
  useGetReactionsForVideoQuery,
} from '../../features/reactionApi';
import { FaThumbsUp, FaThumbsDown, FaHeart, FaLaughBeam, FaSadTear, FaAngry } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CommentSection from '../components/CommentSection';

function Upload() {
  const { data: videos, isLoading: isVideosLoading, isError: isVideosError, error: videosError } = useGetAllVideosQuery();
  const [incrementVideoViews] = useIncrementVideoViewsMutation();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.[0]?._id;
  const [addReaction] = useAddReactionMutation();
  const [removeReaction] = useRemoveReactionMutation();
  const userReactions = {};
  const videoReactionsCount = {}; 


  const handleView = async (videoId) => {
    try {
      await incrementVideoViews(videoId);

    } catch (err) {
      console.error("Failed to increment views:", err);
    }
  };

  const handleAddReaction = async (videoId, reactionType) => {
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

  const handleRemoveReaction = async (videoId) => {
    if (!userId || !userReactions[videoId]?.data) {
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

  const isUserReacted = (videoId, type) => userReactions[videoId]?.data?.reactionType === type;

  if (isVideosLoading) {
    return <div className="text-center py-8 text-gray-300 dark:bg-gray-900">Loading videos...</div>;
  }

  if (isVideosError) {
    return <div className="text-red-500 text-center py-8 dark:bg-gray-900">Error loading videos: {videosError?.message || 'Something went wrong.'}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-6 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="
  text-4xl
  font-extrabold
  text-indigo-400 // Adjusted for dark theme
  mb-8
  text-center
  tracking-tight
  leading-tight
  sm:text-5xl
  md:text-6xl
">
          Public Videos
        </h1>
        {videos && videos?.data.length > 0 ? (
          <div className="grid gap-6 justify-center">
            {videos?.data.map((video) => (
              <div key={video._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden w-full max-w-md"> {/* Set max-w-md */}
            
                <div className="px-4 py-3 border-b border-gray-700 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                      {video.uploader?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-300">
                      <Link to={`/users/${video.uploader?._id}`} className="hover:underline text-indigo-400">
                        {video.uploader?.username || 'Unknown User'}
                      </Link>
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNowStrict(new Date(video.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                <Link to={`/videos/${video._id}`} onClick={() => handleView(video._id)}>
                  <div className="relative aspect-w-16 aspect-h-9">
                  
                    <video controls className="h-[500px] w-[400px] bg-black" autoplay preload="auto">
                      <source src={video?.filePath} type="video/mp4" />
                    </video>
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-300 mb-2 truncate">{video.title}</h2>
                    <p className="text-gray-500 text-sm mb-2 truncate">{video.description}</p>
                  </div>
                </Link>

                <div className="px-4 py-2 border-t border-gray-700 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <button
                      onClick={() => handleAddReaction(video._id, 'like')}
                      className={`flex items-center space-x-1 ${isUserReacted(video._id, 'like') ? 'text-blue-400' : 'hover:text-blue-400'} focus:outline-none`}
                    >
                      <FaThumbsUp className="h-5 w-5" />
                      <span className="text-sm">{video.reactions?.like || 0}</span>
                    </button>
                    <button
                      onClick={() => handleAddReaction(video._id, 'dislike')}
                      className={`flex items-center space-x-1 ${isUserReacted(video._id, 'dislike') ? 'text-red-400' : 'hover:text-red-400'} focus:outline-none`}
                    >
                      <FaThumbsDown className="h-5 w-5" />
                      <span className="text-sm">{video.reactions?.dislike || 0}</span>
                    </button>
                    <button
                      onClick={() => handleAddReaction(video._id, 'heart')}
                      className={`flex items-center space-x-1 ${isUserReacted(video._id, 'heart') ? 'text-red-500' : 'hover:text-red-500'} focus:outline-none`}
                    >
                      <FaHeart className="h-5 w-5" />
                      <span className="text-sm">{video.reactions?.heart || 0}</span>
                    </button>
                    <button
                      onClick={() => handleAddReaction(video._id, 'laugh')}
                      className={`flex items-center space-x-1 ${isUserReacted(video._id, 'laugh') ? 'text-yellow-400' : 'hover:text-yellow-400'} focus:outline-none`}
                    >
                      <FaLaughBeam className="h-5 w-5" />
                      <span className="text-sm">{video.reactions?.laugh || 0}</span>
                    </button>
                    <button
                      onClick={() => handleAddReaction(video._id, 'sad')}
                      className={`flex items-center space-x-1 ${isUserReacted(video._id, 'sad') ? 'text-blue-200' : 'hover:text-blue-200'} focus:outline-none`}
                    >
                      <FaSadTear className="h-5 w-5" />
                      <span className="text-sm">{video.reactions?.sad || 0}</span>
                    </button>
                    <button
                      onClick={() => handleAddReaction(video._id, 'angry')}
                      className={`flex items-center space-x-1 ${isUserReacted(video._id, 'angry') ? 'text-orange-400' : 'hover:text-orange-400'} focus:outline-none`}
                    >
                      <FaAngry className="h-5 w-5" />
                      <span className="text-sm">{video.reactions?.angry || 0}</span>
                    </button>
                    {userReactions[video._id]?.data && (
                      <button onClick={() => handleRemoveReaction(video._id)} className="text-gray-500 hover:text-gray-400 text-sm focus:outline-none">
                        Remove Reaction
                      </button>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {video.views} Views
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-800">
                  <h3 className="text-md font-semibold text-gray-300 mb-2">Comments</h3>
                  <CommentSection videoId={video._id} userId={userId} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8 dark:bg-gray-900">No videos have been uploaded yet.</div>
        )}
      </div>
    </div>
  );
}

export default Upload;