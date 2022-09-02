/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, Dispatch, MiddlewareAPI } from "redux"
import { storage } from "../../App"

export const syncStorage = <S>(store: MiddlewareAPI<Dispatch, S>) => {
    return (next: Dispatch<AnyAction>) => {
        return (action: any) => {
            next(action)
            storage.save({key: "app", data: store.getState()})
        }
    }
}
