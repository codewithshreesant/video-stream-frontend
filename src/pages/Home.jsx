// import React, { useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { useUploadVideoMutation } from '../../features/videoApi';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Home() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [thumbnailFile, setThumbnailFile] = useState(null);
//   const [privacy, setPrivacy] = useState('public');
//   const [uploadVideo, { isLoading, isSuccess, isError, error }] = useUploadVideoMutation();

//   const handleVideoChange = (e) => {
//     setVideoFile(e.target.files[0]);
//   };

//   const handleThumbnailChange = (e) => {
//     setThumbnailFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !videoFile || !thumbnailFile) {
//       toast.error('Please fill in all required fields.', { position: 'top-right' });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('privacy', privacy);
//     formData.append('video', videoFile);
//     formData.append('thumbnail', thumbnailFile);

//     try {
//       await uploadVideo(formData).unwrap();
//       toast.success('Video uploaded successfully!', { position: 'top-right' });
//       setTitle('');
//       setDescription('');
//       setVideoFile(null);
//       setThumbnailFile(null);
//       setPrivacy('public');
//     } catch (err) {
//       console.error('Upload failed:', err);
//       toast.error(`Video upload failed: ${err?.data?.message || 'Something went wrong.'}`, {
//         position: 'top-right',
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">Upload New Video</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
//                 Title:
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Enter video title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
//                 Description:
//               </label>
//               <textarea
//                 id="description"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Enter video description (optional)"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="video" className="block text-gray-700 text-sm font-bold mb-2">
//                 Video File:
//               </label>
//               <input
//                 type="file"
//                 id="video"
//                 accept="video/*"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 onChange={handleVideoChange}
//               />
//               {videoFile && <p className="text-gray-600 text-xs mt-1">Selected file: {videoFile.name}</p>}
//             </div>
//             <div>
//               <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">
//                 Thumbnail File:
//               </label>
//               <input
//                 type="file"
//                 id="thumbnail"
//                 accept="image/*"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 onChange={handleThumbnailChange}
//               />
//               {thumbnailFile && <p className="text-gray-600 text-xs mt-1">Selected file: {thumbnailFile.name}</p>}
//             </div>
//             <div>
//               <label htmlFor="privacy" className="block text-gray-700 text-sm font-bold mb-2">
//                 Privacy:
//               </label>
//               <select
//                 id="privacy"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 value={privacy}
//                 onChange={(e) => setPrivacy(e.target.value)}
//               >
//                 <option value="public">Public</option>
//                 <option value="private">Private</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//                 isLoading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Uploading...' : 'Upload Video'}
//             </button>
//             {isError && error?.data?.message && (
//               <p className="text-red-500 text-xs italic mt-2">{error?.data?.message}</p>
//             )}
//             {isSuccess && <p className="text-green-500 text-xs italic mt-2">Video uploaded successfully!</p>}
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Home;


import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUploadVideoMutation } from '../../features/videoApi';

function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [privacy, setPrivacy] = useState('public');
  const [uploadVideo, { isLoading }] = useUploadVideoMutation();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
    }
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
      const errorMessage = err?.data?.message || 'Something went wrong. Please try again.';
      toast.error(`Video upload failed: ${errorMessage}`, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.55 4.55a.5.5 0 01.14.35v2.8a.5.5 0 01-.14.35L15 22l-1.5-1.5-2 2-1.5-1.5-2 2-1.5-1.5-2 2-1.5-1.5V6a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2zM15 10v4"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Upload Your Video</h2>
          <p className="mt-2 text-sm text-gray-400">Share your story with the world.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="video" className="block text-sm font-medium text-gray-300">
                Video File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.26-3.26a.5.5 0 00-.7.05L21 28m2-2l8.28-8.28a.5.5 0 00-.7-.7L12 36.32V40h28v-4a.5.5 0 00-.05-.7z"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="video"
                      className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 focus-within:ring-offset-gray-800"
                    >
                      <span>Upload a file</span>
                      <input id="video" name="video" type="file" className="sr-only" accept="video/*" onChange={handleVideoChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">MP4, MOV, AVI up to 1GB</p>
                  {videoFile && <p className="text-sm text-gray-300 mt-2">Selected: {videoFile.name}</p>}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-300">
                Thumbnail
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.26-3.26a.5.5 0 00-.7.05L21 28m2-2l8.28-8.28a.5.5 0 00-.7-.7L12 36.32V40h28v-4a.5.5 0 00-.05-.7z"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="thumbnail"
                      className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 focus-within:ring-offset-gray-800"
                    >
                      <span>Upload a thumbnail</span>
                      <input id="thumbnail" name="thumbnail" type="file" className="sr-only" accept="image/*" onChange={handleThumbnailChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {thumbnailFile && <p className="text-sm text-gray-300 mt-2">Selected: {thumbnailFile.name}</p>}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="privacy" className="block text-sm font-medium text-gray-300">
                Privacy
              </label>
              <select
                id="privacy"
                name="privacy"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-700 text-white"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLoading && (
                  <svg className="animate-spin h-5 w-5 text-blue-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </span>
              {isLoading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;