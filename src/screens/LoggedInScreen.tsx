import React, { useState } from "react"
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "./HomeScreen"
import { BottomTabBar } from "../components/BottomTabBar"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { Select } from "../components/Select"
import { useNavigation } from "@react-navigation/native"
import { LoginScreenNavigationProp } from "../../App"

export type BottomTabParamList = {
    Home: undefined
    MyPage: undefined
}
export type LoggedInScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList>

const Tab = createBottomTabNavigator<BottomTabParamList>()

export const LoggedInScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>()
    const onPress = () => {
        navigation.navigate("AddToDo")
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
