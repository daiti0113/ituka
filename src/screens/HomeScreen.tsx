import React, { useState } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ToDoListScene } from "../scenes/Home/ToDoListScene"
import { useAppDispatch, useAppSelector } from "../helpers/store"
import { setModalContent, toggleModalVisible } from "../slices/app"
import { Button, Text, TextInput } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { palette } from "../styles/colorPalette"
import { addList, list } from "../slices/toDo"
import { getKey } from "../helpers/getKey"

const Tab = createMaterialTopTabNavigator()

const useCreateTabs = (data: Array<list>) => {
    const {toDoItems} = useAppSelector(({toDo: {toDoItems}}) => ({toDoItems}))

    return data.map(({id, name}) => {
        const filteredToDoItems = toDoItems.filter((toDoItem) => toDoItem.listIdList.includes(id))
        const Scene = () => <ToDoListScene toDoItems={filteredToDoItems} />
        
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
                component={Scene}
            />
        )
    })
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
                name="追加する"
                key="AddList"
                component={None}
                listeners={({navigation}) => ({
                    tabPress: (e) => {
                        e.preventDefault()
                        console.log(navigation.navigate)
                        dispatch(setModalContent(AddListModal))
                        dispatch(toggleModalVisible(true))
                    },
                })}
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
        marginTop: 40,
    }
})
