import React from "react"
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "./HomeScreen"
import { BottomTabBar } from "../components/BottomTabBar"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { LoginScreenNavigationProp } from "./AppScreen"
import { useAppDispatch } from "../helpers/store"
import { logout } from "../slices/auth"

export type BottomTabParamList = {
    Home: undefined
    MyPage: undefined
}
export type LoggedInScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList>

const Tab = createBottomTabNavigator<BottomTabParamList>()

export const LoggedInScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>()
    const onPress = () => {
        navigation.navigate("AddToDoScreen")
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
    const dispatch = useAppDispatch()

    return (
        <View>
            <Text variant="headlineMedium">MyPage</Text>
            <Button onPress={() => dispatch(logout())}>ログアウト</Button>
        </View>
    )
}
