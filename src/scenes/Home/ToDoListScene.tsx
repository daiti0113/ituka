import React from "react"
import { ScrollView, View } from "react-native"
import { ToDoListItem } from "../../components/ToDoListItem"
import { useAppDispatch } from "../../helpers/store"
import { deleteToDo, list, toDoItem, toDoState, toggleToDo } from "../../slices/toDo"

type ToDoListSceneProps = {
    listId: list["id"]
    toDoItems: toDoState["toDoItems"]
}

export const ToDoListScene: React.FC<ToDoListSceneProps> = ({listId, toDoItems}) => {
    const dispatch = useAppDispatch()
    const onDelete = (toDoId: toDoItem["id"]) => () => {
        dispatch(deleteToDo({listId, toDoId}))
    }
    const onPress = (toDoId: toDoItem["id"]) => () => {
        dispatch(toggleToDo({toDoId}))
    }

    return (
        <ScrollView style={{ padding: 10 }}>
            <View>
                {toDoItems.map((toDo) => {
                    return (
                        <ToDoListItem
                            key={toDo.id}
                            checked={toDo.isDone}
                            onDelete={onDelete(toDo.id)}
                            onPress={onPress(toDo.id)}
                            {...toDo}
                        />
                    )
                })}
            </View>
        </ScrollView>
    )
}
