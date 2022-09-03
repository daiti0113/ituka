import React, { useState } from "react"
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import { Checkbox, Text } from "react-native-paper"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { palette } from "../styles/colorPalette"

type ToDoListItemProps = {
    title: string
    description?: string
    thumbnail?: string
    onDelete?: () => void
}

const sampleImage = "https://scontent-itm1-1.cdninstagram.com/v/t51.2885-15/299783757_2092631190927482_571943387086778334_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&_nc_ht=scontent-itm1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=rgRftQ3u4RwAX8QLFMy&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkwNjA5MjAyNjk3MTA1MzA2Mg%3D%3D.2-ccb7-5&oh=00_AT_M4VoEIzRw7iL4adymQYewfZqDiKLOCXL6GObp4SFvXA&oe=63183464&_nc_sid=30a2ef"

const renderRightActions = (onDelete: ToDoListItemProps["onDelete"]) => {
    return (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text>削除</Text>
        </TouchableOpacity>
    )
}

export const ToDoListItem: React.FC<ToDoListItemProps> = ({title, description, thumbnail=sampleImage, onDelete}) => {
    const [checked, setChecked] = useState(false)

    return (
        <Swipeable
            renderRightActions={() => renderRightActions(onDelete)}
        >
            <Pressable style={styles.container} onPress={() => setChecked(!checked)}>
                <Thumbnail src={thumbnail} />
                <View>
                    <Text variant="bodyLarge">{title}</Text>
                    <Text variant="bodyMedium" style={{ color: palette.neutral[600]}}>{description}</Text>
                </View>
                <View style={styles.checkbox}>
                    <Checkbox status={checked ? "checked" : "unchecked"} />
                </View>
            </Pressable>
        </Swipeable>
    )
}

type ThumbnailProps = {
    src?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({src}) => {
    return (
        <Image source={{uri: src}} style={styles.thumbnail} />
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 16,
        backgroundColor: palette.neutral[50],
    },
    thumbnail: {
        width: 56,
        height: 56,
        borderRadius: 14,
        marginRight: 10,
    },
    checkbox: {
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: 10,
    },
    deleteButton: {
        marginBottom: 16,
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        backgroundColor: "#FF8A81"
    }
})
