import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import taskReducer from "./slices/task"
import appReducer from "./slices/app"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import AsyncStorage from "@react-native-community/async-storage"

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    app: appReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, "app/setModalContent", "auth/login"],
                ignoredPaths: ["app.modalContent", "auth.user"]
            },
        }),
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {store, persistor}
