import React from "react"
import { ListsScreen } from "./ListsScreen"
import { task } from "../slices/task"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"

export type HomeStackParamList = {
    ListsScreen: undefined
    TaskDetailScene: {
        taskId: task["id"]
    }
}

const Stack = createStackNavigator<HomeStackParamList>()

export type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList>

export const HomeScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="ListsScreen"
        >
            <Stack.Screen name="ListsScreen" component={ListsScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}
