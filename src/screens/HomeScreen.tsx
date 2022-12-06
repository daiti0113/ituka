import React, { useEffect, useState } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ToDoListScene } from "../scenes/Home/ToDoListScene"
import { useAppDispatch, useAppSelector } from "../helpers/store"
import { setModalContent, toggleModalVisible } from "../slices/app"
import { Button, Text, TextInput } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { palette } from "../styles/colorPalette"
import { addList, deleteList, list, updateList } from "../slices/toDo"
import { getKey } from "../helpers/getKey"
import firestore from "@react-native-firebase/firestore"

const Tab = createMaterialTopTabNavigator()

const EditListModalInner: React.FC<list> = ({id: listId, name}) => {
    const [newName, setNewName] = useState<string | null>(null)
    const dispatch = useAppDispatch()

    const onSubmit = () => {
        if (newName) {
            dispatch(updateList({name: newName, listId}))
            dispatch(toggleModalVisible(false))
        }
    }

    const onDelete = () => {
        dispatch(deleteList({listId}))
        dispatch(toggleModalVisible(false))
    }

    return (
        <View>
            <Text variant="titleMedium">名前の変更</Text>
            <TextInput
                style={styles.textInput}
                underlineColor={palette.neutral[300]}
                defaultValue={name}
                placeholder="雨の日にやりたいこと"
                onChangeText={setNewName}
            />
            <Button
                mode="contained"
                style={styles.submit}
                disabled={!name}
                onPress={onSubmit}
            >
                変更する
            </Button>
            <Text style={styles.label}>もしくは</Text>
            <Button
                mode="contained"
                style={styles.delete}
                disabled={!name}
                onPress={onDelete}
            >
                削除する
            </Button>
        </View>
    )
}

const AddListModal = () => {
    const [name, setName] = useState<string | null>(null)
    const dispatch = useAppDispatch()

    const onSubmit = () => {
        if (name) {
            const id = getKey()
            dispatch(addList({name, id, order: 0}))
            dispatch(toggleModalVisible(false))
            // TODO: リスト作成後にその画面に遷移したかったが、この時点ではルートが生成されていないためnavigateできなかった
        }
    }

    return (
        <View>
            <Text variant="titleMedium">新しいリストの名前</Text>
            <TextInput
                style={styles.textInput}
                underlineColor={palette.neutral[300]}
                placeholder="雨の日にやりたいこと"
                onChangeText={setName}
            />
            <Button
                mode="contained"
                style={styles.submit}
                disabled={!name}
                onPress={onSubmit}
            >追加する</Button>
        </View>
    )
}

export const HomeScreen = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))
    const [lists, setLists] = useState<any>([])
    const [tasks, setTasks] = useState<any>([])
    const getLists = async () => {
        console.log("START GET LISTS")
        console.log(uid.toString())
        const res = await firestore().collection("users").doc(uid).collection("lists").get()
        console.log(res.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        setLists(res.docs.map((doc) => ({id: doc.id, ...doc.data()})))
    }
    const getTasks = async () => {
        console.log("START")
        console.log(uid.toString())
        const res = await firestore().collection("users").doc(uid).collection("tasks").get()
        console.log(res.docs)
        setTasks(res.docs.map((doc) => doc.data()))
    }

    useEffect(() => {
        getLists()
        getTasks()
    }, [])

    // const {lists} = useAppSelector(({toDo: {lists}}) => ({lists}))
    const dispatch = useAppDispatch()
    const None = () => null

    if (lists.length === 0) return null

    return (
        <Tab.Navigator
            initialRouteName={lists[0].id}
            screenOptions={{
                tabBarIndicator: () => null
                
            }}
        >
            {lists.map((list) => {
            // const filteredToDoItems = tasks.filter((task) => task.listIdList.includes(list.id))
                const Scene = () => <ToDoListScene listId={list.id} toDoItems={tasks} />
                const EditListModal = () => <EditListModalInner {...list} />
            
                return (
                    <Tab.Screen
                        name={list.id}
                        key={list.id}
                        options={{
                            tabBarLabel: list.name,
                            swipeEnabled: false,
                            tabBarScrollEnabled: true,
                            tabBarLabelStyle: {textTransform: "none"}
                        }}
                        listeners={() => ({
                            tabLongPress: () => {
                                dispatch(setModalContent(EditListModal))
                                dispatch(toggleModalVisible(true))
                            },
                        })}
                        component={Scene}
                    />
                )
            })}
            <Tab.Screen
                name="＋リストを追加"
                key="AddList"
                component={None}
                listeners={() => ({
                    tabPress: (e) => {
                        e.preventDefault()
                        dispatch(setModalContent(AddListModal))
                        dispatch(toggleModalVisible(true))
                    },
                })}
                options={{
                    tabBarLabelStyle: {
                        fontSize: 14,
                        color: palette.primary[600],
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "transparent",
    },
    submit: {
        borderRadius: 50,
        marginTop: 20,
    },
    label: {
        marginTop: 20,
    },
    delete: {
        borderRadius: 50,
        marginTop: 20,
        backgroundColor: "#FF8A81"
    }
})
