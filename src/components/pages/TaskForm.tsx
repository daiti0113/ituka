import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect, useMemo, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { Select } from "../Select"
import { useAddTask, useLists, useTask, useUpdateTask } from "../../helpers/request"
import { LoggedInScreenNavigationProp } from "../../screens/LoggedInScreen"
import { isTaskItem, task } from "../../slices/task"
import { palette } from "../../styles/colorPalette"
import { AddTaskStackParamList } from "../../screens/FormScreen"

const createSelectItems = (lists: Array<{name: string, id: string}>, initialValues: task | undefined) => {
    return lists.map(({name, id}) => <Select.Item key={id} value={id} selected={initialValues?.listIdList.includes(id)}>{name}</Select.Item>)
}

export const TaskForm = () => {
    const {params: {taskId}} = useRoute<RouteProp<AddTaskStackParamList>>()
    const initialValues = useTask(taskId)
    const addTask = useAddTask()
    const updateTask = useUpdateTask()
    const lists = useLists()
    const selectItems = useMemo(() => createSelectItems(lists, initialValues), [lists])
    const navigation = useNavigation<LoggedInScreenNavigationProp>()
    const [task, setTask] = useState<Partial<task>>(initialValues ? initialValues : {isDone: false})

    useEffect(() => {
        if (initialValues) {
            setTask(initialValues)
        }
    }, [initialValues])

    const onSubmit = () => {
        if (!isTaskItem(task)) return null
        taskId ? updateTask(taskId, task) : addTask(task)
        navigation.navigate("Home")
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label} variant="titleSmall">リストを選ぶ</Text>
                    <Select onChange={(listIdList) => setTask({...task, listIdList})}>{selectItems}</Select>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label} variant="titleSmall">なにする？</Text>
                    <TextInput
                        style={styles.textInput}
                        underlineColor={palette.neutral[300]}
                        placeholder="夜パフェを食べに行く"
                        onChangeText={(title) => setTask({...task, title})}
                        defaultValue={task.title}
                        error={task.title === ""}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label} variant="titleSmall">もうちょっと詳しく</Text>
                    <TextInput
                        style={styles.textInput}
                        underlineColor={palette.neutral[300]}
                        placeholder="〇〇ってとこが美味しいらしい"
                        onChangeText={(subTitle) => setTask({...task, subTitle})}
                        defaultValue={task.subTitle}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label} variant="titleSmall">メモ</Text>
                    <TextInput
                        mode="outlined"
                        style={styles.textArea}
                        theme={{ roundness: 8 }}
                        outlineColor={palette.neutral[300]}
                        multiline
                        placeholder={"友達におすすめしてもらったメニュー\n・ちんすこう\n・美らパフェ"}
                        onChangeText={(description) => setTask({...task, description})}
                        defaultValue={task.description}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label} variant="titleSmall">参考になるリンク（instagramやGoogleマップなど）</Text>
                    <TextInput
                        style={styles.textInput}
                        underlineColor={palette.neutral[300]}
                        placeholder="https://icocca.info"
                        onChangeText={(url) => setTask({...task, url})}
                        defaultValue={task.url}
                    />
                </View>
                <Button
                    mode="contained"
                    style={styles.submit}
                    disabled={!isTaskItem(task)}
                    onPress={onSubmit}
                >追加する</Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 18,
        paddingBottom: 60,
    },
    inputContainer: {
        marginBottom: 34,
    },
    label: {
        marginBottom: 12,
    },
    textInput: {
        backgroundColor: "transparent",
    },
    textArea: {
        maxHeight: 200
    },
    submit: {
        borderRadius: 50,
        marginTop: 40,
    }
})
