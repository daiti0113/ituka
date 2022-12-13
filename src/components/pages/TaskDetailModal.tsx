import React from "react"
import { ScrollView } from "react-native"
import { Text } from "react-native-paper"
import { useTask } from "../../helpers/request"
import { task } from "../../slices/task"

type TaskDetailModalProps = {
    taskId: task["id"]
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({taskId}) => {
    const task = useTask(taskId)

    return (
        <ScrollView>
            <Text variant="titleSmall">{task?.title}</Text>
            <Text variant="titleSmall">{task?.description}</Text>
            <Text variant="titleSmall">{task?.url}</Text>
        </ScrollView>
    )
}
