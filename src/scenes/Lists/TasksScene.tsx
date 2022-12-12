import React from "react"
import { ScrollView, View } from "react-native"
import { Text } from "react-native-paper"
import { useDispatch } from "react-redux"
import { Task } from "../../components/Task"
import { useDeleteTask } from "../../helpers/request"
import { setModalContent, toggleModalVisible } from "../../slices/app"
import { task, taskState } from "../../slices/task"

type TasksSceneProps = {
    tasks: taskState["tasks"]
}

export const TasksScene: React.FC<TasksSceneProps> = ({tasks}) => {
    const deleteTask = useDeleteTask()
    const dispatch = useDispatch()
    const onPress = (taskId: task["id"]) => () => {
        dispatch(setModalContent({type: "slideIn", content: () => <Text>test</Text>}))
        dispatch(toggleModalVisible({type: "slideIn", visible: true}))
    }

    return (
        <ScrollView style={{ padding: 10 }}>
            <View>
                {tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            checked={task.isDone}
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
