import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Chip, IconButton, Text } from "react-native-paper"
import { useDispatch } from "react-redux"
import { useLists, useTask } from "../../helpers/request"
import { HomeStackParamList } from "../../screens/HomeScreen"
import { setModalContent, toggleModalVisible } from "../../slices/app"
import { palette } from "../../styles/colorPalette"
import { Thumbnail } from "../atoms/Thumbnail"
import { IconLabel } from "../molecules/IconLabel"
import { LinkPreview } from "../organisms/LinkPreview"
import { TaskMenu } from "./TaskMenu"

export const TaskDetail = () => {
    const {params: {taskId}} = useRoute<RouteProp<HomeStackParamList, "TaskDetail">>()
    const task = useTask(taskId)
    const lists = useLists()
    const dispatch = useDispatch()
    const filteredLists = lists.filter(({id}) => task?.listIdList.includes(id))
    const navigation = useNavigation()

    const openMenu = () => {
        dispatch(setModalContent({type: "menu", content: () => <TaskMenu navigation={navigation} taskId={taskId} />}))
        dispatch(toggleModalVisible({type: "menu", visible: true}))
    }

    if (!task) return null

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* <Thumbnail src={task.thumbnail} size={60} borderRadius={50} /> */}
                    <View style={{flex: 1}}>
                        <Text variant="titleLarge" style={styles.title}>{task.title}</Text>
                        <Text variant="bodyMedium" style={{ color: palette.neutral[600]}}>{task.subTitle}</Text>
                    </View>
                    <IconButton icon="dots-horizontal" iconColor={palette.neutral[900]} onPress={openMenu} />
                </View>
                <View style={styles.iconHolder}>
                    <IconLabel icon="heart" label="20" />
                    <IconLabel icon="bookmark" label="20" />
                    <IconLabel icon="comment" label="20" />
                    <View style={styles.iconHolderLeft}>
                        <IconLabel icon="eye" label="20" />
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.row}>
                        <Text variant="titleMedium" style={styles.rowTitle}>やることリスト</Text>
                        <View style={styles.listNames}>
                            {filteredLists.map(({name, id}) => <Chip key={id} textStyle={styles.chipText} style={styles.chip} compact>{name}</Chip>)}
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text variant="titleMedium" style={styles.rowTitle}>もうちょっと詳しく</Text>
                        <Text variant="bodyMedium" style={{ color: palette.neutral[800]}}>{task?.description}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text variant="titleMedium" style={styles.rowTitle}>参考リンク</Text>
                        <Text variant="titleSmall">{task?.url}</Text>
                    </View>
                    {task.url && <LinkPreview url={task.url} />}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: palette.neutral[50],
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    header: {
        flexDirection: "row",
    },
    title: {
        letterSpacing: 0.15,
        fontWeight: "500",
    },
    listNames: {
        flexDirection: "row",
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
    },
    iconHolder: {
        marginTop: 12,
        flexDirection: "row",
    },
    iconHolderLeft: {
        marginLeft: "auto",
        marginRight: 20,
    },
    body: {
        marginTop: 26,
    },
    row: {
        marginBottom: 30,
    },
    rowTitle: {
        marginBottom: 6,
    },
})
