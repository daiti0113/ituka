/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"

export type toDoItem = {
    id: string
    listIdList: Array<string>
    title: string
    isDone: boolean
    description?: string
    url?: string
}
export type list = {
    name: string,
    order: number,
    id: string
}
export type toDoState = {
    lists: Array<list>
    toDoItems: Array<toDoItem>
}

export const isToDoItem = (value: any): value is toDoItem => {
    return value !== undefined && value?.listIdList?.length > 0 && value?.title?.length > 0
}

const deleteToDoLogic = (
    toDoItems: toDoState["toDoItems"],
    listId: list["id"],
    toDoId: toDoItem["id"]
) => {
    // listIdListから削除
    const temp = toDoItems.map((toDo) => {
        if (toDo.id === toDoId) {
            return {...toDo, listIdList: toDo.listIdList.filter((id) => id !== listId)}
        }
        return toDo
    })
    // listIdListが空のものを削除
    return temp.filter((toDo) => toDo.listIdList.length !== 0)
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
        deleteToDo: (state, {payload: {listId, toDoId}}) => {
            const updated = deleteToDoLogic(state.toDoItems, listId, toDoId)
            state.toDoItems = updated
        },
        // TODO: パフォーマンスが悪いのでAPIになったらすぐに修正すること
        toggleToDo: (state, {payload: {toDoId}}) => {
            const index = state.toDoItems.findIndex((toDo) => toDo.id === toDoId)
            const target = state.toDoItems[index]
            state.toDoItems[index] = {...target, isDone: !target.isDone}
        },
        addList: (state, {payload}: {payload: list}) => {
            state.lists = [...state.lists, payload]
        },
        deleteList: (state, {payload: {listId}}) => {
            state.lists = state.lists.filter((list) => list.id !== listId)
            let temp = state.toDoItems
            // 削除対象リストに入っていたやりたいことのID一覧
            const deleteTargetToDoList = temp
                .map((toDo) => toDo.listIdList.includes(listId) && toDo.id)
                .filter((id): id is toDoItem["id"] => typeof id == "string")
            // やりたいことが属しているリスト一覧から削除対象リストを削除
            deleteTargetToDoList.forEach((id) => {
                temp = deleteToDoLogic(temp, listId, id)
            })
            state.toDoItems = temp
        },
        updateList: (state, {payload: {listId, name, order}}) => {
            state.lists = state.lists.map((list) => list.id === listId ? {id: listId, name, order} : list)
        }
    },
})

export const {
    addToDo,
    deleteToDo,
    toggleToDo,
    addList,
    deleteList,
    updateList,
} = toDoSlice.actions

export default toDoSlice.reducer
