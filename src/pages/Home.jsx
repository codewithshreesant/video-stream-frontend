import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useUploadVideoMutation } from '../../features/videoApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [privacy, setPrivacy] = useState('public');
  const [uploadVideo, { isLoading, isSuccess, isError, error }] = useUploadVideoMutation();

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoFile || !thumbnailFile) {
      toast.error('Please fill in all required fields.', { position: 'top-right' });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('privacy', privacy);
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);

    try {
      await uploadVideo(formData).unwrap();
      toast.success('Video uploaded successfully!', { position: 'top-right' });
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
      setPrivacy('public');
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error(`Video upload failed: ${err?.data?.message || 'Something went wrong.'}`, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">Upload New Video</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Title:
              </label>
              <input
                type="text"
                id="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                id="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter video description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="video" className="block text-gray-700 text-sm font-bold mb-2">
                Video File:
              </label>
              <input
                type="file"
                id="video"
                accept="video/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleVideoChange}
              />
              {videoFile && <p className="text-gray-600 text-xs mt-1">Selected file: {videoFile.name}</p>}
            </div>
            <div>
              <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">
                Thumbnail File:
              </label>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleThumbnailChange}
              />
              {thumbnailFile && <p className="text-gray-600 text-xs mt-1">Selected file: {thumbnailFile.name}</p>}
            </div>
            <div>
              <label htmlFor="privacy" className="block text-gray-700 text-sm font-bold mb-2">
                Privacy:
              </label>
              <select
                id="privacy"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload Video'}
            </button>
            {isError && error?.data?.message && (
              <p className="text-red-500 text-xs italic mt-2">{error?.data?.message}</p>
            )}
            {isSuccess && <p className="text-green-500 text-xs italic mt-2">Video uploaded successfully!</p>}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;