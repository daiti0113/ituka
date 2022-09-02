import React, { useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "./HomeScreen"
import { BottomTabBar } from "../components/BottomTabBar"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { useAppDispatch } from "../helpers/store"
import { addToDo } from "../slices/toDo"
import { Select } from "../components/Select"

const Tab = createBottomTabNavigator()

export const LoggedInScreen = () => {
    const dispatch = useAppDispatch()
    const onPress = () => {
        dispatch(addToDo())
    }

    return (
        <Tab.Navigator
            tabBar={(props) => <BottomTabBar {...props} centerButtonProps={{icon: "plus", onPress: onPress}} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="MyPage" component={MyPageScreen} />
        </Tab.Navigator>
    )
}

const MyPageScreen = () => {
    const [values, setValues] = useState<Array<string>>([])

    return (
        <View>
            <Text>MyPage</Text>
            <Select onChange={setValues}>
                <Select.Item value="1">test1</Select.Item>
                <Select.Item value="2">test2</Select.Item>
                <Select.Item value="3">test3</Select.Item>
                <Select.Item value="4">test4</Select.Item>
                <Select.Item value="5">test5</Select.Item>
            </Select>
            <Text>{values.join(", ")}</Text>
        </View>
    )
}
