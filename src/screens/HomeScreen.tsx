import React from "react"
import { login } from "../../src/slices/auth"
import { useAppDispatch, useAppSelector } from "../../src/helpers/store"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { RootStackParamList } from "../../App"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const Tab = createMaterialTopTabNavigator()

const data = [
    {name: "Hitori", label: "一人で"},
    {name: "Koibito", label: "恋人と"},
    {name: "Tomodati", label: "友達と"},
]

const createTabs = (data) => data.map(({name, label}) => <Tab.Screen name={name} key={name} options={{tabBarLabel: label}} component={ToDoListScene} />)

export const HomeScreen = () => {
    const tabs = createTabs(data)
    return (
        <Tab.Navigator
            initialRouteName="ToDo"
            screenOptions={{tabBarIndicator: () => null}}
        >
            {tabs}
        </Tab.Navigator>
    )
}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>
export const ToDoListScene = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const {loggedIn} = useAppSelector(({auth: {loggedIn}}) => ({loggedIn}))
    const dispatch = useAppDispatch()
    return (
        <View style={{ padding: 10 }}>
            <TextInput label="Home" />
            {loggedIn ? <Text>ログインしました</Text> : <Button onPress={() => dispatch(login())}>Login</Button>}
            <Button onPress={() => navigation.navigate("Details")}>Go to Detail</Button>
        </View>
    )
}
