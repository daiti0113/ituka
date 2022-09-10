import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../scenes/Login/LoginScene"


export type LoginStackParamList = {
    Login: undefined
}

const Stack = createNativeStackNavigator<LoginStackParamList>()

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
