import React from "react"
import { ListsScreen } from "./ListsScreen"
import { task } from "../slices/task"
import { CardStyleInterpolators, createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { TaskDetailModal } from "../components/pages/TaskDetailModal"

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
            <Stack.Group screenOptions={{
                gestureDirection: "vertical",
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                cardStyle: {backgroundColor: "transparent"}
            }}>
                <Stack.Screen name="TaskDetail" component={TaskDetailModal} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
