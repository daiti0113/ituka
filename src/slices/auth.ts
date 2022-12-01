import { createSlice } from "@reduxjs/toolkit"

export type authState = {
    loggedIn: boolean,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedIn: false,
    } as authState,
    reducers: {
        login: (state) => {
            state.loggedIn = true
        },
        logout: (state) => {
            state.loggedIn = false
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
