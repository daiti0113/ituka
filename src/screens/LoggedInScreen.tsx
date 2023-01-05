import React from "react"
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomTabBar } from "../components/BottomTabBar"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { AppScreenNavigationProp } from "./AppScreen"
import { useAppDispatch } from "../helpers/store"
import { logout } from "../slices/auth"
import { HomeScreen } from "./HomeScreen"

export type BottomTabParamList = {
    Home: undefined
    MyPage: undefined
}
export type LoggedInScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList>

const Tab = createBottomTabNavigator<BottomTabParamList>()

export const LoggedInScreen = () => {
    const navigation = useNavigation<AppScreenNavigationProp>()
    const onPress = () => {
        navigation.navigate("FormScreen")
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
