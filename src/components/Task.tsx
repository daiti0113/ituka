import React from "react"
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { palette } from "../styles/colorPalette"
import { Thumbnail } from "./atoms/Thumbnail"
import { createUseStyles } from "../helpers/style"

export type TaskProps = {
    title: string
    checked: boolean,
    id: string,
    subTitle?: string
    thumbnail?: string
    onDelete?: () => void
    onPress?: () => void
}

const sampleImage = "https://scontent-itm1-1.cdninstagram.com/v/t51.2885-15/299783757_2092631190927482_571943387086778334_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&_nc_ht=scontent-itm1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=rgRftQ3u4RwAX8QLFMy&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkwNjA5MjAyNjk3MTA1MzA2Mg%3D%3D.2-ccb7-5&oh=00_AT_M4VoEIzRw7iL4adymQYewfZqDiKLOCXL6GObp4SFvXA&oe=63183464&_nc_sid=30a2ef"

const renderRightActions = (onDelete: TaskProps["onDelete"]) => {
    return (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text>削除</Text>
        </TouchableOpacity>
    )
}

export const Task: React.FC<TaskProps> = ({
    title, subTitle, thumbnail=sampleImage, onDelete, onPress, checked
}) => {
    const buttonStyles = useButtonStyles({isDone: checked})
    return (
        <Swipeable
            renderRightActions={() => renderRightActions(onDelete)}
        >
            <Pressable style={styles.container} onPress={onPress}>
                <View style={buttonStyles.checkboxContainer}>
                    <IconButton
                        icon="check"
                        mode="outlined"
                        size={16}
                        iconColor={checked ? palette.primary[500] : palette.neutral[300]}
                        style={buttonStyles.checkbox}
                    />
                </View>
                {/* TODO: サムネイルを設定できるようにする */}
                {/* <Thumbnail src={thumbnail} /> */}
                <View style={styles.titleContainer}>
                    <Text variant="bodyLarge">{title}</Text>
                    {subTitle && <Text variant="bodyMedium" style={{ color: palette.neutral[600]}}>{subTitle}</Text>}
                </View>
                {/* <View style={buttonStyles.menuContainer}>
                    <IconButton
                        icon="dots-vertical"
                        size={20}
                        iconColor={palette.neutral[700]}
                        style={buttonStyles.menu}
                    />
                </View> */}
            </Pressable>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: palette.neutral[50],
        minHeight: 60,
    },
    titleContainer: {
        justifyContent: "center",
    },
    deleteButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        backgroundColor: "#FF8A81"
    }
})

const useButtonStyles = createUseStyles(({isDone}) => ({
    checkboxContainer: {
        alignSelf: "center",
        marginLeft: 16,
        marginRight: 12,
    },
    checkbox: {
        borderRadius: 10,
        borderColor: isDone ? palette.primary[500] : palette.neutral[300]
    },
    menuContainer: {
        flexDirection: "row",
        
        alignItems: "center",
        marginLeft: "auto",
        marginRight: 4,
    },
    menu: {
        borderRadius: 10,
    }
}))
