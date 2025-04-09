import {createSlice} from "@reduxjs/toolkit";

const cakeSlice = createSlice({
    name: "cake",
    initialState: {
        isOpenAddNew: false,
        isOpenEditCake: false,
        isOpenDeleteCake: false,
        idCakeToDelete: "",
        idCakeToEdit: ""
    },
    reducers: {
        setIdCakeToDelete: (state, action) => {
            state.idCakeToDelete = action.payload;
        },
        setIsOpenDeleteCake: (state, action) => {
            state.isOpenDeleteCake = action.payload;
        },
        setIdCakeToEdit: (state, action) => {
            state.idCakeToEdit = action.payload;
        },
        setIsOpenEditCake: (state, action) => {
            state.isOpenEditCake = action.payload;
        },
        setIsOpenAddNew: (state, action) => {
            state.isOpenAddNew = action.payload;
        }
    },
});

export const {
    setIsOpenAddNew,
    setIsOpenEditCake,
    setIdCakeToEdit,
    setIdCakeToDelete,
    setIsOpenDeleteCake
} = cakeSlice.actions;

export default cakeSlice.reducer;
