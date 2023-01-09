import { useNavigation } from "@react-navigation/native"
import React from "react"
import { ScrollView, View } from "react-native"
import { Task } from "../../components/Task"
import { useDeleteTask } from "../../helpers/request"
import { HomeScreenNavigationProp } from "../../screens/HomeScreen"
import { task, taskState } from "../../slices/task"

type TasksSceneProps = {
    tasks: taskState["tasks"]
}

export const TasksScene: React.FC<TasksSceneProps> = ({tasks}) => {
    const deleteTask = useDeleteTask()
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const onPress = (taskId: task["id"]) => () => {
        navigation.navigate("TaskDetail", {taskId})
    }

    return (
        <ScrollView style={{ paddingTop: 20 }}>
            <View>
                {tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            onDelete={() => deleteTask(task.id)}
                            onPress={onPress(task.id)}
                            {...task}
                        />
                    )
                })}
            </View>
        </ScrollView>
    )
}
