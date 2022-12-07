/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"

export type taskItem = {
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
export type taskState = {
    lists: Array<list>
    taskItems: Array<taskItem>
}

export const isTaskItem = (value: any): value is taskItem => {
    return value !== undefined && value?.listIdList?.length > 0 && value?.title?.length > 0
}

const deleteTaskLogic = (
    taskItems: taskState["taskItems"],
    listId: list["id"],
    taskId: taskItem["id"]
) => {
    // listIdListから削除
    const temp = taskItems.map((task) => {
        if (task.id === taskId) {
            return {...task, listIdList: task.listIdList.filter((id) => id !== listId)}
        }
        return task
    })
    // listIdListが空のものを削除
    return temp.filter((task) => task.listIdList.length !== 0)
}

export const taskSlice = createSlice({
    name: "task",
    initialState: {
        lists: [{id: "1", name: "一人で"}, {id: "2", name: "恋人と"}, {id: "3", name: "友達と"}],
        taskItems: [
            {id: "1", listIdList: ["1", "2"], title: "和菓子屋さん行く", description: "羊羊 YOYO AN FACTORY"},
            {id: "2", listIdList: ["1", "3"], title: "浴衣着て夏祭り", description: "浦添てだこ祭り"},
            {id: "3", listIdList: ["1", "3"], title: "花畑見に行く", description: "ひまわり畑"},
            {id: "4", listIdList: ["1", "2", "3"], title: "桜坂劇場", description: "ぜんぶ、ボクのせいが観たい"},
            {id: "5", listIdList: ["1", "2", "3"], title: "夜パフェ食べに行く", description: "夜風にアイス"},
        ]
    } as taskState,
    reducers: {
        addTask: (state, {payload}) => {
            state.taskItems = [...state.taskItems, payload]
        },
        deleteTask: (state, {payload: {listId, taskId}}) => {
            const updated = deleteTaskLogic(state.taskItems, listId, taskId)
            state.taskItems = updated
        },
        // TODO: パフォーマンスが悪いのでAPIになったらすぐに修正すること
        toggleTask: (state, {payload: {taskId}}) => {
            const index = state.taskItems.findIndex((task) => task.id === taskId)
            const target = state.taskItems[index]
            state.taskItems[index] = {...target, isDone: !target.isDone}
        },
        addList: (state, {payload}: {payload: list}) => {
            state.lists = [...state.lists, payload]
        },
        deleteList: (state, {payload: {listId}}) => {
            state.lists = state.lists.filter((list) => list.id !== listId)
            let temp = state.taskItems
            // 削除対象リストに入っていたやりたいことのID一覧
            const deleteTargetTasks = temp
                .map((task) => task.listIdList.includes(listId) && task.id)
                .filter((id): id is taskItem["id"] => typeof id == "string")
            // やりたいことが属しているリスト一覧から削除対象リストを削除
            deleteTargetTasks.forEach((id) => {
                temp = deleteTaskLogic(temp, listId, id)
            })
            state.taskItems = temp
        },
        updateList: (state, {payload: {listId, name, order}}) => {
            state.lists = state.lists.map((list) => list.id === listId ? {id: listId, name, order} : list)
        }
    },
})

export const {
    addTask,
    deleteTask,
    toggleTask,
    addList,
    deleteList,
    updateList,
} = taskSlice.actions

export default taskSlice.reducer
