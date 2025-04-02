
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://video-stream-backend-9byt.onrender.com/api/videos',
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
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        uploadVideo: builder.mutation({
            query: (video) => ({
                url: '',
                method: 'POST',
                body: video
            })
        }),
        getAllVideos: builder.query({
            query: () => ({
                url: '',
                method: 'GET'
            })
        }),
        getVideoById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET'
            })
        }),
        updateVideo: builder.mutation({
            query: ({ id, video }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: video
            })
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            })
        }),
        incrementVideoViews: builder.mutation({
            query: (id) => ({
                url: `/${id}/views`,
                method: 'PUT'
            })
        }),
        getSingleVideo: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET'
            })
        })
    })
})

export const { useUploadVideoMutation, useGetAllVideosQuery, useUpdateVideoMutation, useDeleteVideoMutation, useIncrementVideoViewsMutation, useGetSingleVideoQuery } = videoApi;

export default videoApi;

