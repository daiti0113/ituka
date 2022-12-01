import { createSlice } from "@reduxjs/toolkit"

export type authState = {
    isLoggedIn: boolean,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    } as authState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
