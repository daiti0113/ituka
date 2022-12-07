import React from "react"
import { ScrollView, View } from "react-native"
import { Task } from "../../components/Task"
import { useAppDispatch } from "../../helpers/store"
import { deleteTask, list, taskItem, taskState, toggleTask } from "../../slices/task"

type TasksSceneProps = {
    listId: list["id"]
    taskItems: taskState["taskItems"]
}

export const TasksScene: React.FC<TasksSceneProps> = ({listId, taskItems}) => {
    const dispatch = useAppDispatch()
    const onDelete = (taskId: taskItem["id"]) => () => {
        dispatch(deleteTask({listId, taskId}))
    }
    const onPress = (taskId: taskItem["id"]) => () => {
        dispatch(toggleTask({taskId}))
    }

    return (
        <ScrollView style={{ padding: 10 }}>
            <View>
                {taskItems.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            checked={task.isDone}
                            // onDelete={onDelete(task.id)}
                            // onPress={onPress(task.id)}
                            {...task}
                        />
                    )
                })}
            </View>
        </ScrollView>
    )
}
