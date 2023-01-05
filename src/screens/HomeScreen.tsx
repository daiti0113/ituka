import React from "react"
import { ListsScreen } from "./ListsScreen"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { TaskDetail } from "../components/pages/TaskDetail"
import { task } from "../slices/task"

export type HomeStackParamList = {
    ListsScreen: undefined
    TaskDetail: {
        taskId: task["id"]
    }

}

const Stack = createStackNavigator<HomeStackParamList>()

export type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList>

export const HomeScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="ListsScreen"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="ListsScreen" component={ListsScreen} />
            <Stack.Screen name="TaskDetail" component={TaskDetail} />
        </Stack.Navigator>
    )
}
