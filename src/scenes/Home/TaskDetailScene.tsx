import { RouteProp, useRoute } from "@react-navigation/native"
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { useTask } from "../../helpers/request"
import { HomeStackParamList } from "../../screens/HomeScreen"

export const TaskDetailScene = () => {
    const {params: {taskId}} = useRoute<RouteProp<HomeStackParamList, "TaskDetailScene">>()
    const task = useTask(taskId)

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label} variant="titleSmall">{task?.title}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label} variant="titleSmall">{task?.description}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label} variant="titleSmall">{task?.url}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 18,
    },
    inputContainer: {
        marginBottom: 34,
    },
    label: {
        marginBottom: 12,
    },
})
