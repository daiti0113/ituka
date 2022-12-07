import React from "react"
import { ScrollView, View } from "react-native"
import { Task } from "../../components/Task"
import { useDeleteTask } from "../../helpers/request"
import { taskState } from "../../slices/task"

type TasksSceneProps = {
    taskItems: taskState["taskItems"]
}

export const TasksScene: React.FC<TasksSceneProps> = ({taskItems}) => {
    const deleteTask = useDeleteTask()
    // const onPress = (taskId: taskItem["id"]) => () => {
    //     dispatch(toggleTask({taskId}))
    // }

    return (
        <ScrollView style={{ padding: 10 }}>
            <View>
                {taskItems.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            checked={task.isDone}
                            onDelete={() => deleteTask(task.id)}
                            // onPress={onPress(task.id)}
                            {...task}
                        />
                    )
                })}
            </View>
        </ScrollView>
    )
}
