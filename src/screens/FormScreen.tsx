import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { TaskForm } from "../components/pages/TaskForm"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { task } from "../slices/task"


export type AddTaskStackParamList = {
    TaskForm: {
        taskId?: task["id"]
    }
}

export type FormScreenNavigationProp = StackNavigationProp<AddTaskStackParamList>

const Stack = createStackNavigator<AddTaskStackParamList>()


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
            initialRouteName="TaskForm"
            screenOptions={{
                header: () => <Header />
            }}
        >
            <Stack.Screen name="TaskForm" component={TaskForm} initialParams={{ taskId: "" }} />
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
