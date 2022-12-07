import React from "react"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { LoginScreen } from "./LoginScreen"
import { LoggedInScreen } from "./LoggedInScreen"
import { AddTaskScreen } from "./AddTaskScreen"
import { useAppSelector } from "../helpers/store"

export type RootStackParamList = {
    LoggedInScreen: undefined
    LoginScreen: undefined
    AddTaskScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const AppHeader = () => {
    return (
        <View style={{padding: 10}}>
            <Text variant="headlineLarge">icocca</Text>
            <Text style={styles.subTitle}>いつか行きたいとこリスト</Text>
        </View>
    )
}

export const AppScreen = () => {
    const { isLoggedIn } = useAppSelector(({ auth: { isLoggedIn } }) => ({ isLoggedIn }))
    return (
        <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
                header: ({route}) => route.name === "Home" ? <AppHeader /> : null
            }}
        >
            {isLoggedIn ? (
                <>
                    <Stack.Screen name="LoggedInScreen" component={LoggedInScreen} />
                    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        color: "#3C3C3C",
    },
})
