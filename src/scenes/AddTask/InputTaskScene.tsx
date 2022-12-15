import { useNavigation } from "@react-navigation/native"
import React, { useMemo, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { Select } from "../../components/Select"
import { useAddTask, useLists } from "../../helpers/request"
import { LoggedInScreenNavigationProp } from "../../screens/LoggedInScreen"
import { isTaskItem, task } from "../../slices/task"
import { palette } from "../../styles/colorPalette"

const createSelectItems = (lists: Array<{name: string, id: string}>) => {
    return lists.map(({name, id}) => <Select.Item key={id} value={id}>{name}</Select.Item>)
}

export const InputTaskScene = () => {
    const addTask = useAddTask()
    const lists = useLists()
    const selectItems = useMemo(() => createSelectItems(lists), [lists])
    const navigation = useNavigation<LoggedInScreenNavigationProp>()
    const [task, setTask] = useState<Partial<task>>({isDone: false})

    const onSubmit = () => {
        if (isTaskItem(task)) {
            addTask(task)
        }
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
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label} variant="titleSmall">参考になるリンク（instagramやGoogleマップなど）</Text>
                    <TextInput
                        style={styles.textInput}
                        underlineColor={palette.neutral[300]}
                        placeholder="https://icocca.info"
                        onChangeText={(url) => setTask({...task, url})}
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
