import React from "react"
import { ScrollView, View } from "react-native"
import { ToDoListItem } from "../../components/ToDoListItem"
import { useAppSelector } from "../../helpers/store"

export const ToDoListScene = () => {
    const {toDoItems} = useAppSelector(({toDo: {toDoItems}}) => ({toDoItems}))
    return (
        <ScrollView style={{ padding: 10 }}>
            <View>
                {toDoItems.map((item) => {
                    return (
                        <ToDoListItem key={item.title} {...item} />
                    )
                })}
            </View>
        </ScrollView>
    )
}
