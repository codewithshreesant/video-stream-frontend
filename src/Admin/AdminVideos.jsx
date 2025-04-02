import React, { useState } from 'react';
import { useDeleteVideoMutation, useGetAllVideosQuery, useUpdateVideoMutation } from '../../features/videoApi';

function AdminVideos() {
  const { data, error, isLoading, refetch } = useGetAllVideosQuery();
  const [updateVideoApi] = useUpdateVideoMutation();
  const [deleteVideoApi] = useDeleteVideoMutation();
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrivacy, setEditedPrivacy] = useState('');

  const handleEdit = (video) => {
    setEditingVideoId(video._id);
    setEditedTitle(video.title);
    setEditedDescription(video.description);
    setEditedPrivacy(video.privacy);
  };

  const handleSave = async (videoId) => {
    try {
      await updateVideoApi({
        id: videoId,
        video: { title: editedTitle, description: editedDescription, privacy: editedPrivacy },
      }).unwrap();
      setEditingVideoId(null);
      refetch(); 
    } catch (err) {
      console.error('Error updating video:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingVideoId(null);
  };

  const handleDelete = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideoApi(videoId).unwrap();
        refetch();
      } catch (err) {
        console.error('Error deleting video:', err);
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading videos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading videos.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((video) => (
          <div key={video._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              {editingVideoId === video._id ? (
                <div>
                  <div className="mb-2">
                    <label htmlFor={`title-${video._id}`} className="block text-gray-700 text-sm font-bold mb-1">Title:</label>
                    <input
                      type="text"
                      id={`title-${video._id}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`description-${video._id}`} className="block text-gray-700 text-sm font-bold mb-1">Description:</label>
                    <textarea
                      id={`description-${video._id}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`privacy-${video._id}`} className="block text-gray-700 text-sm font-bold mb-1">Privacy:</label>
                    <select
                      id={`privacy-${video._id}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={editedPrivacy}
                      onChange={(e) => setEditedPrivacy(e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="unlisted">Unlisted</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                  <div className="mb-2">
                    <span className="text-gray-700 font-semibold">Privacy:</span>{' '}
                    <span className="text-gray-600">{video.privacy}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-gray-700 font-semibold">Uploaded By:</span>{' '}
                    <span className="text-gray-600">{video.uploader?.username || 'N/A'}</span>
                  </div>
                  <div className="flex space-x-2 text-sm text-gray-500">
                    <span>Created: {new Date(video.createdAt).toLocaleDateString()}</span>
                    <span>Updated: {new Date(video.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-2">
              {editingVideoId === video._id ? (
                <>
                  <button
                    onClick={() => handleSave(video._id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(video)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminVideos;