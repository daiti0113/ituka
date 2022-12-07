import { useNavigation } from "@react-navigation/native"
import React, { useMemo, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { Select } from "../../components/Select"
import { getKey } from "../../helpers/getKey"
import { useAddTask, useLists } from "../../helpers/request"
import { LoggedInScreenNavigationProp } from "../../screens/LoggedInScreen"
import { isToDoItem, toDoItem } from "../../slices/toDo"
import { palette } from "../../styles/colorPalette"

const createSelectItems = (lists: Array<{name: string, id: string}>) => {
    return lists.map(({name, id}) => <Select.Item key={id} value={id}>{name}</Select.Item>)
}

export const InputToDoScene = () => {
    const addTask = useAddTask()
    const lists = useLists()
    const selectItems = useMemo(() => createSelectItems(lists), [lists])
    const navigation = useNavigation<LoggedInScreenNavigationProp>()
    const id = getKey()
    const [toDo, setToDo] = useState<Partial<toDoItem>>({id, isDone: false})

    const onSubmit = () => {
        if (isToDoItem(toDo)) {
            addTask(toDo)
        }
        navigation.navigate("Home")
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label} variant="titleSmall">リストを選ぶ</Text>
                <Select onChange={(listIdList) => setToDo({...toDo, listIdList})}>{selectItems}</Select>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label} variant="titleSmall">なにする？</Text>
                <TextInput
                    style={styles.textInput}
                    underlineColor={palette.neutral[300]}
                    placeholder="夜パフェを食べに行く"
                    onChangeText={(title) => setToDo({...toDo, title})}
                    error={toDo.title === ""}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label} variant="titleSmall">もうちょっと詳しく</Text>
                <TextInput
                    style={styles.textInput}
                    underlineColor={palette.neutral[300]}
                    placeholder="〇〇ってとこが美味しいらしい"
                    onChangeText={(description) => setToDo({...toDo, description})}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label} variant="titleSmall">参考になるリンク（instagramやGoogleマップなど）</Text>
                <TextInput
                    style={styles.textInput}
                    underlineColor={palette.neutral[300]}
                    placeholder="https://icocca.info"
                    onChangeText={(url) => setToDo({...toDo, url})}
                />
            </View>
            <Button
                mode="contained"
                style={styles.submit}
                disabled={!isToDoItem(toDo)}
                onPress={onSubmit}
            >追加する</Button>
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
    textInput: {
        backgroundColor: "transparent",
    },
    submit: {
        borderRadius: 50,
        marginTop: 40,
    }
})
