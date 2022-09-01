import React from "react"
import { login } from "../../src/slices/auth"
import { useAppDispatch, useAppSelector } from "../../src/helpers/store"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { RootStackParamList } from "../../App"

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const {loggedIn} = useAppSelector(({auth: {loggedIn}}) => ({loggedIn}))
    const dispatch = useAppDispatch()
    return (
        <View style={{ padding: 10 }}>
            <Text variant="headlineLarge">icocca</Text>
            <TextInput label="Home" />
            {loggedIn ? <Text>ログインしました</Text> : <Button onPress={() => dispatch(login())}>Login</Button>}
            <Button onPress={() => navigation.navigate("Details")}>Go to Detail</Button>
        </View>
    )
}
