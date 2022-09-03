import React, { useMemo } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ToDoListScene } from "../scenes/Home/ToDoListScene"
import { useAppDispatch, useAppSelector } from "../helpers/store"
import { toggleModalVisible } from "../slices/app"

const Tab = createMaterialTopTabNavigator()

type data = Array<{
    id: string,
    name: string
    label: string
}>

const data: data = [
    {id: "1", name: "Hitori", label: "一人で"},
    {id: "2", name: "Koibito", label: "恋人と"},
    {id: "3", name: "Tomodati", label: "友達と"},
]

const useCreateTabs = (data: data) => {
    const {toDoItems} = useAppSelector(({toDo: {toDoItems}}) => ({toDoItems}))

    return data.map(({id, name, label}) => {
        const filteredToDoItems = useMemo(() => toDoItems.filter((toDoItem) => toDoItem.listIdList.includes(id)), [toDoItems])
        const Scene = () => <ToDoListScene toDoItems={filteredToDoItems} />
        
        return (
            <Tab.Screen
                name={name}
                key={id}
                options={{
                    tabBarLabel: label,
                    swipeEnabled: false,
                    tabBarScrollEnabled: true,
                }}
                component={Scene}
            />
        )
    })
}

export const HomeScreen = () => {
    const tabs = useCreateTabs(data)
    const dispatch = useAppDispatch()
    const None = () => null

    return (
        <Tab.Navigator
            initialRouteName={data[0].name}
            screenOptions={{
                tabBarIndicator: () => null
                
            }}
        >
            {tabs}
            <Tab.Screen
                name="追加する"
                key="AddList"
                component={None}
                listeners={() => ({
                    tabPress: (e) => {
                        e.preventDefault()
                        dispatch(toggleModalVisible(true))
                    },
                })}
            />
        </Tab.Navigator>
    )
}
