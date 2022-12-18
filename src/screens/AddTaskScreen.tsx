import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { TaskForm } from "../components/pages/TaskForm"


export type AddTaskStackParamList = {
    InputTask: undefined
}

const Stack = createNativeStackNavigator<AddTaskStackParamList>()


const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={navigation.goBack} style={styles.headerLeft}>
                <IconButton icon="chevron-left" style={styles.backIcon} />
                <Text>戻る</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
                <Text variant="titleMedium">やりたいことを追加する</Text>
            </View>
            <View style={styles.headerRight} />
        </View>
    )
}

export const AddTaskScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="InputTask"
            screenOptions={{
                header: () => <Header />
            }}
        >
            <Stack.Screen name="InputTask" component={TaskForm} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    backIcon: {
        margin: 0,
    },
    headerCenter: {
        flex: 2,
        alignItems: "center",
    },
    headerRight: {
        flex: 1,
    }
})
