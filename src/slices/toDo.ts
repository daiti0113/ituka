/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"

export type toDoItem = {
    id: string
    listIdList: Array<string>
    title: string
    description?: string
    url?: string
}
export type toDoState = {
    lists: Array<{name: string, id: string}>
    toDoItems: Array<toDoItem>
}

export const isToDoItem = (value: any): value is toDoItem => {
    return value !== undefined && value?.listIdList?.length > 0 && value?.title?.length > 0
}

export const toDoSlice = createSlice({
    name: "toDo",
    initialState: {
        lists: [{id: "1", name: "一人で"}, {id: "2", name: "恋人と"}, {id: "3", name: "友達と"}],
        toDoItems: [
            {id: "1", listIdList: ["1", "2"], title: "和菓子屋さん行く", description: "羊羊 YOYO AN FACTORY"},
            {id: "2", listIdList: ["1", "3"], title: "浴衣着て夏祭り", description: "浦添てだこ祭り"},
            {id: "3", listIdList: ["1", "3"], title: "花畑見に行く", description: "ひまわり畑"},
            {id: "4", listIdList: ["1", "2", "3"], title: "桜坂劇場", description: "ぜんぶ、ボクのせいが観たい"},
            {id: "5", listIdList: ["1", "2", "3"], title: "夜パフェ食べに行く", description: "夜風にアイス"},
        ]
    } as toDoState,
    reducers: {
        addToDo: (state, {payload}) => {
            state.toDoItems = [...state.toDoItems, payload]
        },
        deleteToDo: (state, {payload: {id}}) => {
            state.toDoItems = state.toDoItems.filter((toDo) => toDo.id !== id)
        }
    },
})

export const { addToDo, deleteToDo } = toDoSlice.actions

export default toDoSlice.reducer
