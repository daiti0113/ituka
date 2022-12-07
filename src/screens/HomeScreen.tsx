import React, { useState } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { TasksScene } from "../scenes/Home/TasksScene"
import { useAppDispatch } from "../helpers/store"
import { setModalContent, toggleModalVisible } from "../slices/app"
import { Button, Text, TextInput } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { palette } from "../styles/colorPalette"
import { addList, deleteList, list, updateList } from "../slices/task"
import { useLists, useTasks } from "../helpers/request"

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
            // dispatch(addList({name, order: 0}))
            // dispatch(toggleModalVisible(false))
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
    const lists = useLists()
    const tasks = useTasks()

    // TODO: useModalを作る
    const dispatch = useAppDispatch()
    const None = () => null

    if (lists.length === 0) return null

    console.log({lists})

    return (
        <Tab.Navigator
            initialRouteName={lists[0].id}
            screenOptions={{
                tabBarIndicator: () => null
                
            }}
        >
            {lists.map((list) => {
            // const filteredTaskItems = tasks.filter((task) => task.listIdList.includes(list.id))
                const Scene = () => <TasksScene tasks={tasks} />
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
