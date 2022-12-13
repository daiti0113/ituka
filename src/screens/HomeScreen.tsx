import React from "react"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ListsScreen } from "./ListsScreen"
import { task } from "../slices/task"

export type HomeStackParamList = {
    ListsScreen: undefined
    TaskDetailScene: {
        taskId: task["id"]
    }
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList>

export const HomeScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="ListsScreen"
        >
            <Stack.Screen name="ListsScreen" component={ListsScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}
