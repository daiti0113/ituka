import { createSlice } from "@reduxjs/toolkit"

export type appState = {
    modalVisible: boolean,
    modalContent: () => JSX.Element | null,
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        modalVisible: false,
        modalContent: () => null,
    } as appState,
    reducers: {
        toggleModalVisible: (state, {payload}) => {
            state.modalVisible = payload
        },
        setModalContent: (state, {payload}) => {
            state.modalContent = payload
        }
    },
})

export const { toggleModalVisible, setModalContent } = appSlice.actions

export default appSlice.reducer
