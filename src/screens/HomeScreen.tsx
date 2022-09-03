import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ToDoListScene } from "../scenes/Home/ToDoListScene"

const Tab = createMaterialTopTabNavigator()

type data = Array<{
    name: string
    label: string
}>

const data: data = [
    {name: "Hitori", label: "一人で"},
    {name: "Koibito", label: "恋人と"},
    {name: "Tomodati", label: "友達と"},
]

const createTabs = (data: data) => {
    return data.map(({name, label}) => {
        return (
            <Tab.Screen
                name={name}
                key={name}
                options={{
                    tabBarLabel: label,
                    swipeEnabled: false,
                }}
                component={ToDoListScene}
            />
        )
    })
}

export const HomeScreen = () => {
    const tabs = createTabs(data)

    return (
        <Tab.Navigator
            initialRouteName={data[0].name}
            screenOptions={{tabBarIndicator: () => null}}
        >
            {tabs}
        </Tab.Navigator>
    )
}
