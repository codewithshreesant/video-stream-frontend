
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserVideo() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.[0]?._id;
  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUserVideos = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/uservideo/${userId}/videos`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch user videos');
          }
          const data = await response.json();
          console.log("data ", data)
          setUserVideos(data.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchUserVideos();
    }
  }, [userId]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading your videos...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error loading your videos: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Uploaded Videos</h2>
      {userVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userVideos.map((video) => (
            <Link to={`/videos/${video._id}`}>
              <div key={video._id} className="bg-white shadow-md rounded-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                  {video.filePath ? (
                    <video controls className="h-[500px] w-[400px]" preload="auto">
                      <source src={video?.filePath} type="video/mp4" />
                    </video>
                  ) : (
                    <span>No Thumbnail</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-600">Uploaded by: {video.uploader?.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>You haven't uploaded any videos yet.</p>
      )}
    </div>
  );
}



export default UserVideo;