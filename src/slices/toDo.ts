import { createSlice } from "@reduxjs/toolkit"

type toDoState = {
    toDoList: Array<{title: string, description?: string}>
}

export const toDoSlice = createSlice({
    name: "toDo",
    initialState: {
        toDoList: []
    } as toDoState,
    reducers: {
        addToDo: (state) => {
            state.toDoList = [
                {title: "和菓子屋さん行く", description: "羊羊 YOYO AN FACTORY"},
                {title: "浴衣着て夏祭り", description: "浦添てだこ祭り"},
                {title: "花畑見に行く", description: "ひまわり畑"},
                {title: "桜坂劇場", description: "ぜんぶ、ボクのせいが観たい"},
                {title: "夜パフェ食べに行く", description: "夜風にアイス"},
            ]
        },
    },
})

export const { addToDo } = toDoSlice.actions

export default toDoSlice.reducer
