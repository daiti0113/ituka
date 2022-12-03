import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { createSlice } from "@reduxjs/toolkit"

export type authState = {
    isLoggedIn: boolean,
    user: FirebaseAuthTypes.UserCredential["user"],
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    } as authState,
    reducers: {
        login: (state, {payload: {user}}: {payload: {user: FirebaseAuthTypes.UserCredential["user"]}}) => {
            state.isLoggedIn = true
            state.user = user
        },
        logout: (state) => {
            state.isLoggedIn = false
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
