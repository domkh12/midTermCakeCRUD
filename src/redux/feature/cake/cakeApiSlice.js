import {apiSlice} from "../../app/api/apiSlice";
import {createEntityAdapter} from "@reduxjs/toolkit";

const cakeAdapter = createEntityAdapter({});

const initialState = cakeAdapter.getInitialState();

export const cakeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCake: builder.query({
            query: () => ({
                url: `/cake`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedCake = responseData.map((cake) => {
                    cake.id = cake.id;
                    return cake;
                });
                return {
                    ...cakeAdapter.setAll(initialState, loadedCake),
                };
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "CAKE", id: "LIST"}, ...result.ids.map((id) => ({type: "CAKE", id})),];
                } else return [{type: "CAKE", id: "LIST"}];
            },
        }),

        addNewCake: builder.mutation({
            query: (initialState) => ({
                url: "/cake",
                method: "POST",
                body: {
                    ...initialState
                }
            }),
            invalidatesTags: [{type: "CAKE", id: "LIST"}]
        }),

        deleteCake: builder.mutation({
            query: ({id}) => ({
                url: `/cake/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, arg) => [{type: "CAKE", id: arg.id}],
        }),

        editCake: builder.mutation({
            query: ({id, ...initialState}) => ({
                url: `/cake/${id}`,
                method: "PUT",
                body: {
                    ...initialState
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: "CAKE", id: arg.id}],
        })
    }),
});

export const {useGetCakeQuery, useAddNewCakeMutation, useDeleteCakeMutation, useEditCakeMutation} = cakeApiSlice;
