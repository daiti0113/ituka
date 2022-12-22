import React from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { LoginScreen } from "./LoginScreen"
import { LoggedInScreen } from "./LoggedInScreen"
import { FormScreen } from "./FormScreen"
import { useAppSelector } from "../helpers/store"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"

export type RootStackParamList = {
    LoggedInScreen: undefined
    LoginScreen: undefined
    FormScreen: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>

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
                    <Stack.Screen name="FormScreen" component={FormScreen} />
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
