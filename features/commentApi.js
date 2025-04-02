import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://video-stream-backend-9byt.onrender.com/api/comments',
    prepareHeaders: (headers, { endpoint }) => {
      // Get the token from local storage
      let token = localStorage.getItem('token');

      // Apply the token header only for the 'uploadVideo' mutation (example)

      headers.set('Authorization', `Bearer ${token}`);


      // You can add similar conditions for other specific endpoints
      // if (endpoint === 'someOtherProtectedQuery' && token) {
      //     headers.set('Authorization', `Bearer ${token}`);
      // }

      return headers;
  },
    credentials: 'include', 
  }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getCommentsByVideoId: builder.query({
      query: (videoId) => `/videos/${videoId}/comments`,
      providesTags: (result, error, videoId) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Comment', id: _id })),
              { type: 'Comment', id: 'LIST' },
              { type: 'Comment', id: `VIDEO_${videoId}` },
            ]
          : [{ type: 'Comment', id: 'LIST' }, { type: 'Comment', id: `VIDEO_${videoId}` }],
    }),

    getCommentById: builder.query({
      query: (commentId) => `/comments/${commentId}`,
      providesTags: (result, error, commentId) =>
        result ? [{ type: 'Comment', id: commentId }] : [],
    }),

    getAllComments: builder.query({
      query: () => `/comments`,
    }),

    createComment: builder.mutation({
      query: ({ videoId, ...body }) => ({
        url: `/videos/${videoId}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: 'LIST' },
        { type: 'Comment', id: `VIDEO_${arg.videoId}` },
      ],
    }),

    updateComment: builder.mutation({
      query: ({ commentId, text }) => {
        console.log("comment ", text);
        return {
          url: `/comments/${commentId}`,
          method: 'PUT',
          body: { text },
        };
      },
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, commentId) => [
        { type: 'Comment', id: commentId },
        { type: 'Comment', id: 'LIST' },
        (result && result.videoId) ? { type: 'Comment', id: `VIDEO_${result.videoId}` } : null, // Invalidate video comments if videoId is returned
      ].filter(Boolean),
    }),
  }),
});

export const {
  useGetCommentsByVideoIdQuery,
  useGetCommentByIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
} = commentApi;

export default commentApi;