import { createSlice } from "@reduxjs/toolkit"

export type appState = {
    popUpModalVisible: boolean,
    popUpModalContent: () => JSX.Element | null,
    slideInModalVisible: boolean,
    slideInModalContent: () => JSX.Element | null,
    menuModalVisible: boolean,
    menuModalContent: () => JSX.Element | null,
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
            } else if (type === "slideIn") {
                state.slideInModalVisible = visible
            } else {
                state.menuModalVisible = visible
            }
        },
        setModalContent: (state, {payload: {type="popUp", content}}) => {
            if (type === "popUp") {
                state.popUpModalContent = content
            } else if (type === "slideIn") {
                state.slideInModalContent = content
            } else {
                state.menuModalContent = content
            }
        }
    },
})

export const { toggleModalVisible, setModalContent } = appSlice.actions

export default appSlice.reducer
