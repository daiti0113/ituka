import { configureStore } from "@reduxjs/toolkit"
import { syncStorage } from "./middleware/syncStorage"
import authReducer from "./slices/auth"
import toDoReducer from "./slices/toDo"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        toDo: toDoReducer,
    },
    middleware: [
        syncStorage,
    ]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
