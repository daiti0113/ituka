import React, { useState } from "react"
import { ScrollView, View } from "react-native"
import { ToDoListItem } from "../../components/ToDoListItem"
import { useAppDispatch } from "../../helpers/store"
import { deleteToDo, list, toDoItem, toDoState, toggleToDo } from "../../slices/toDo"
import firestore from "@react-native-firebase/firestore"
import { Button } from "react-native-paper"

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

    const [users, setUsers] = useState<any>()
    const getUsers = async () => {
        console.log("START")
        const res = await firestore().collection("users").get()
        res.forEach((documentSnapshot) => {
            setUsers(documentSnapshot.data())
        })
    }

    console.log(users)

    return (
        <ScrollView style={{ padding: 10 }}>
            
            <Button onPress={() => getUsers()}>取得</Button>
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
