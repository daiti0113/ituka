import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "./HomeScreen"
import { BottomTabBar } from "../components/BottomTabBar"
import { View } from "react-native"
import { Text } from "react-native-paper"

const Tab = createBottomTabNavigator()

export const LoggedInScreen = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <BottomTabBar {...props} />}
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
    return (
        <View>
            <Text>MyPage</Text>
        </View>
    )
}