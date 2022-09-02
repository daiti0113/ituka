import React from "react"
import { ScrollView, View } from "react-native"
import { ToDoListItem } from "../components/ToDoListItem"
import { useAppSelector } from "../helpers/store"

export const ToDoListScene = () => {
    const {toDoList} = useAppSelector(({toDo: {toDoList}}) => ({toDoList}))
    return (
        <ScrollView style={{ padding: 10 }}>
            <View>
                {toDoList.map((toDo) => {
                    return (
                        <ToDoListItem key={toDo.title} {...toDo} />
                    )
                })}
            </View>
        </ScrollView>
    )
}
