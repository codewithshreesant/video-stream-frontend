// features/reactionApi.js (or wherever you keep your API slices)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reactionApi = createApi({
  reducerPath: 'reactionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://video-stream-backend-9byt.onrender.com/reactions',
    prepareHeaders: (headers, { endpoint }) => {
      // Get the token from local storage
      let gettoken = localStorage.getItem('token');
      const token = JSON.parse(gettoken)
      // Apply the token header only for the 'uploadVideo' mutation (example)

      headers.set('Authorization', `Bearer ${token}`);


      // You can add similar conditions for other specific endpoints
      // if (endpoint === 'someOtherProtectedQuery' && token) {
      //     headers.set('Authorization', `Bearer ${token}`);
      // }

      return headers;
  }, // Adjust if your base URL is different
    credentials: 'include', // To send the token cookie
  }),
  tagTypes: ['Reaction'],
  endpoints: (builder) => ({
    // Add a reaction to a video
    addReaction: builder.mutation({
      query: ({ videoId, reactionType }) => ({
        url: `/videos/${videoId}`,
        method: 'POST',
        body: { reactionType },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Reaction', id: `VIDEO_${arg.videoId}` },
      ],
    }),

    // Remove a reaction from a video
    removeReaction: builder.mutation({
      query: (videoId) => ({
        url: `/videos/${videoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, videoId) => [
        { type: 'Reaction', id: `VIDEO_${videoId}` },
      ],
    }),

    // Get all reactions for a specific video
    getReactionsForVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      providesTags: (result, error, videoId) => [
        { type: 'Reaction', id: `VIDEO_${videoId}` },
      ],
    }),

    getAllReactions : builder.query({
      query: () => `/reactions`
    }),

    // Get the current user's reaction on a specific video
    getUserReactionForVideo: builder.query({
      query: (videoId) => `/videos/${videoId}/user`,
      providesTags: (result, error, videoId) =>
        result ? [{ type: 'Reaction', id: `USER_VIDEO_${videoId}` }] : [],
    }),
  }),
});

export const {
  useAddReactionMutation,
  useRemoveReactionMutation,
  useGetReactionsForVideoQuery,
  useGetUserReactionForVideoQuery,
  useGetAllReactionsQuery,
} = reactionApi;

export default reactionApi;