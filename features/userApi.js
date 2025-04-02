
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/users',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url:'/register',
                method:'POST',
                body:user 
        })
        }),
        loginUser: builder.mutation({
            query:(user)=>({
                url:'/login',
                method:'POST',
                body:user 
            })
        }),
        logoutUser: builder.mutation({
            query:()=>({
                url:'/logout',
                method:'POST'
            })
        }),
        getUserProfile: builder.query({
            query:()=>({
                url:'/profile',
                method:'GET'
            })
        })
    })
})


export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation ,useGetUserProfileQuery } = userApi;

export default userApi;