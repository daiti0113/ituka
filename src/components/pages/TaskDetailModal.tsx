import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Chip, Text } from "react-native-paper"
import { useLists, useTask } from "../../helpers/request"
import { task } from "../../slices/task"
import { palette } from "../../styles/colorPalette"
import { Thumbnail } from "../atoms/Thumbnail"

type TaskDetailModalProps = {
    taskId: task["id"]
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({taskId}) => {
    const task = useTask(taskId)
    const lists = useLists()
    const filteredLists = lists.filter(({id}) => task?.listIdList.includes(id))

    if (!task) return null

    return (
        <ScrollView>
            <View style={styles.header}>
                <Thumbnail src={task.thumbnail} size={60} borderRadius={50} />
                <View>
                    <Text variant="titleLarge" style={styles.title}>{task?.title}</Text>
                    <View style={styles.listNames}>
                        {filteredLists.map(({name, id}) => <Chip key={id} textStyle={styles.chipText} style={styles.chip} compact>{name}</Chip>)}
                    </View>
                </View>
            </View>
            <Text variant="titleSmall">{task?.description}</Text>
            <Text variant="titleSmall">{task?.url}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row"
    },
    title: {
        letterSpacing: 0.15,
        fontWeight: "500",
    },
    listNames: {
        flexDirection: "row",
        marginTop: 8,
    },
    chipText: {
        minHeight: 22,
        lineHeight: 22,
        marginVertical: 0,
        marginHorizontal: 0,
        marginLeft: 10,
        marginRight: 10,
        fontWeight: "normal"
    },
    chip: {
        marginRight: 10,
        backgroundColor: palette.neutral[200]
    }
})
