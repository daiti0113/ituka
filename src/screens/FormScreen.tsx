import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { Mode, TaskForm } from "../components/pages/TaskForm"


export type AddTaskStackParamList = {
    CreateTask: {mode: Mode},
    UpdateTask: {mode: Mode},
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

export const FormScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="CreateTask"
            screenOptions={{
                header: () => <Header />
            }}
        >
            <Stack.Screen name="CreateTask" component={TaskForm} initialParams={{ mode: "create" }} />
            <Stack.Screen name="UpdateTask" component={TaskForm} initialParams={{ mode: "update" }} />
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
