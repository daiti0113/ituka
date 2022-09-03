import React from "react"
import { ScrollView, View } from "react-native"
import { ToDoListItem } from "../../components/ToDoListItem"
import { useAppDispatch, useAppSelector } from "../../helpers/store"
import { deleteToDo, toDoItem } from "../../slices/toDo"

export const ToDoListScene = () => {
    const {toDoItems} = useAppSelector(({toDo: {toDoItems}}) => ({toDoItems}))
    const dispatch = useAppDispatch()
    const onDelete = (id: toDoItem["id"]) => () => {
        dispatch(deleteToDo({id}))
    }

    return (
        <ScrollView style={{ padding: 10 }}>
            <View>
                {toDoItems.map((item) => {
                    return (
                        <ToDoListItem key={item.id} onDelete={onDelete(item.id)} {...item} />
                    )
                })}
            </View>
        </ScrollView>
    )
}
