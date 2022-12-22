import React from "react"
import { Login } from "../scenes/Login/LoginScene"
import { createStackNavigator } from "@react-navigation/stack"


export type LoginStackParamList = {
    Login: undefined
}

const Stack = createStackNavigator<LoginStackParamList>()

export const LoginScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}
