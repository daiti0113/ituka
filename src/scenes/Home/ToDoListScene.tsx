import React from "react"
import { ScrollView, View } from "react-native"
import { ToDoListItem } from "../../components/ToDoListItem"
import { useAppDispatch } from "../../helpers/store"
import { deleteToDo, list, toDoItem, toDoState } from "../../slices/toDo"

type ToDoListSceneProps = {
    listId: list["id"]
    toDoItems: toDoState["toDoItems"]
}

export const ToDoListScene: React.FC<ToDoListSceneProps> = ({listId, toDoItems}) => {
    const dispatch = useAppDispatch()
    const onDelete = (toDoId: toDoItem["id"]) => () => {
        dispatch(deleteToDo({listId, toDoId}))
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
