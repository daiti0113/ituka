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
    return (
        <View>
            <Text variant="headlineMedium">MyPage</Text>
        </View>
    )
}
