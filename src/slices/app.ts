import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
    name: "app",
    initialState: {
        modalVisible: false,
    },
    reducers: {
        toggleModalVisible: (state, {payload}) => {
            state.modalVisible = payload
        },
    },
})

export const { toggleModalVisible } = appSlice.actions

export default appSlice.reducer
