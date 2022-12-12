import { createSlice } from "@reduxjs/toolkit"

export type appState = {
    popUpModalVisible: boolean,
    popUpModalContent: () => JSX.Element | null,
    slideInModalVisible: boolean,
    slideInModalContent: () => JSX.Element | null,
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        popUpModalVisible: false,
        popUpModalContent: () => null,
    } as appState,
    reducers: {
        toggleModalVisible: (state, {payload: {type="popUp", visible}}) => {
            if (type === "popUp") {
                state.popUpModalVisible = visible
            } else {
                state.slideInModalVisible = visible
            }
        },
        setModalContent: (state, {payload: {type="popUp", content}}) => {
            if (type === "popUp") {
                state.popUpModalContent = content
            } else {
                state.slideInModalContent = content
            }
        }
    },
})

export const { toggleModalVisible, setModalContent } = appSlice.actions

export default appSlice.reducer
