import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoryCreateType, CategoryResponseType } from "./Types";


export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,
    }),
    tagTypes:["Category"],
    endpoints:(build)=>({
        
    addCategory:build.mutation<CategoryResponseType,CategoryCreateType>({
            query:(data)=>({
                url:"/category/add",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Category"]
        }),
    getAllCategory:build.query<any,void>({
            query:()=>({
                url:"/category/getAll",
                method:"GET",
                
            }),
            providesTags:["Category"]
        }),
    deleteCategory:build.mutation<any,string>({
            query:(id)=>({
                url:`/category/delete/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Category"]
        })

    })

})

export const {useAddCategoryMutation , useGetAllCategoryQuery, useDeleteCategoryMutation} = categoryApi