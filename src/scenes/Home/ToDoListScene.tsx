import React from "react"
import { ScrollView, View } from "react-native"
import { ToDoListItem } from "../../components/ToDoListItem"
import { useAppDispatch } from "../../helpers/store"
import { deleteToDo, toDoItem, toDoState } from "../../slices/toDo"

type ToDoListSceneProps = {
    toDoItems: toDoState["toDoItems"]
}

export const ToDoListScene: React.FC<ToDoListSceneProps> = ({toDoItems}) => {
    const dispatch = useAppDispatch()
    const onDelete = (id: toDoItem["id"]) => () => {
        dispatch(deleteToDo(id))
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
