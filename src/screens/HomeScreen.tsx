import React, { useState } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ToDoListScene } from "../scenes/Home/ToDoListScene"
import { useAppDispatch, useAppSelector } from "../helpers/store"
import { setModalContent, toggleModalVisible } from "../slices/app"
import { Button, Text, TextInput } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { palette } from "../styles/colorPalette"
import { addList, deleteList, list, updateList } from "../slices/toDo"
import { getKey } from "../helpers/getKey"

const Tab = createMaterialTopTabNavigator()

const useCreateTabs = (data: Array<list>) => {
    const {toDoItems} = useAppSelector(({toDo: {toDoItems}}) => ({toDoItems}))
    const dispatch = useAppDispatch()

    return data.map(({id, name}) => {
        const filteredToDoItems = toDoItems.filter((toDoItem) => toDoItem.listIdList.includes(id))
        const Scene = () => <ToDoListScene listId={id} toDoItems={filteredToDoItems} />
        const EditListModal = () => <EditListModalInner id={id} name={name} />
        
        return (
            <Tab.Screen
                name={id}
                key={id}
                options={{
                    tabBarLabel: name,
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
    })
}

const EditListModalInner: React.FC<list> = ({id, name}) => {
    const [newName, setNewName] = useState<string | null>(null)
    const dispatch = useAppDispatch()

    const onSubmit = () => {
        if (newName) {
            dispatch(updateList({name: newName, id}))
            dispatch(toggleModalVisible(false))
        }
    }

    const onDelete = () => {
        dispatch(deleteList(id))
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
            dispatch(addList({name, id}))
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
    const {lists} = useAppSelector(({toDo: {lists}}) => ({lists}))
    const tabs = useCreateTabs(lists)
    const dispatch = useAppDispatch()
    const None = () => null

    return (
        <Tab.Navigator
            initialRouteName={lists[0].id}
            screenOptions={{
                tabBarIndicator: () => null
                
            }}
        >
            {tabs}
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
