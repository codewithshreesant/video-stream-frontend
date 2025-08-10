
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const videoApi = createApi({
//     reducerPath: 'videoApi',
//     baseQuery: fetchBaseQuery({
//         // baseUrl: 'https://video-stream-backend-9byt.onrender.com/api/videos',
//         baseUrl: 'http://localhost:3000/api/videos',
//         prepareHeaders: (headers, { endpoint }) => {
//             // Get the token from local storage
//             let token = localStorage.getItem('token');
//             // Apply the token header only for the 'uploadVideo' mutation (example)

//             headers.set('Authorization', `Bearer ${token}`);


//             // You can add similar conditions for other specific endpoints
//             // if (endpoint === 'someOtherProtectedQuery' && token) {
//             //     headers.set('Authorization', `Bearer ${token}`);
//             // }

//             return headers;
//         },
//         credentials: 'include'
//     }),
//     endpoints: (builder) => ({
//         uploadVideo: builder.mutation({
//             query: (video) => ({
//                 url: '',
//                 method: 'POST',
//                 body: video
//             })
//         }),
//         getAllVideos: builder.query({
//             query: () => ({
//                 url: '',
//                 method: 'GET'
//             })
//         }),
//         getVideoById: builder.query({
//             query: (id) => ({
//                 url: `/${id}`,
//                 method: 'GET'
//             })
//         }),
//         updateVideo: builder.mutation({
//             query: ({ id, video }) => ({
//                 url: `/${id}`,
//                 method: 'PUT',
//                 body: video
//             })
//         }),
//         deleteVideo: builder.mutation({
//             query: (id) => ({
//                 url: `/${id}`,
//                 method: 'DELETE'
//             })
//         }),
//         incrementVideoViews: builder.mutation({
//             query: (id) => ({
//                 url: `/${id}/views`,
//                 method: 'PUT'
//             })
//         }),
//         getSingleVideo: builder.query({
//             query: (id) => ({
//                 url: `/${id}`,
//                 method: 'GET'
//             })
//         })
//     })
// })

// export const { useUploadVideoMutation, useGetAllVideosQuery, useUpdateVideoMutation, useDeleteVideoMutation, useIncrementVideoViewsMutation, useGetSingleVideoQuery } = videoApi;

// export default videoApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://video-stream-backend-9byt.onrender.com/api/videos',
    // baseUrl: 'http://localhost:3000/api/videos',
        prepareHeaders: (headers) => {
            let token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        credentials: 'include'
    }),
    tagTypes: ['Video'], // Define a tag type for videos
    endpoints: (builder) => ({
        uploadVideo: builder.mutation({
            query: (video) => ({
                url: '',
                method: 'POST',
                body: video
            }),
            // Invalidate the 'Video' tag to re-fetch the video list after a new upload
            invalidatesTags: ['Video'],
        }),
        getAllVideos: builder.query({
            query: () => ({
                url: '',
                method: 'GET'
            }),
            // Provide the 'Video' tag for this query so it can be invalidated
            providesTags: ['Video'],
        }),
        getVideoById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, id) => [{ type: 'Video', id }],
        }),
        updateVideo: builder.mutation({
            query: ({ id, video }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: video
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Video', id }],
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Video'],
        }),
        incrementVideoViews: builder.mutation({
            query: (id) => ({
                url: `/${id}/views`,
                method: 'PUT'
            }),
            // We can choose not to invalidate here to avoid a full re-fetch on every view,
            // or we could use `onQueryStarted` to optimistically update the cache.
            // For simplicity, we'll leave it without invalidation.
        }),
        getSingleVideo: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, id) => [{ type: 'Video', id }],
        })
    })
})

export const {
    useUploadVideoMutation,
    useGetAllVideosQuery,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
    useIncrementVideoViewsMutation,
    useGetSingleVideoQuery,
} = videoApi;

export default videoApi;
