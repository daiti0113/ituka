import React, { useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { Checkbox, List as PaperList } from "react-native-paper"

type ToDoListItemProps = React.ComponentProps<typeof PaperList.Item> & {
    thumbnail?: string
}

const sampleImage = "https://scontent-itm1-1.cdninstagram.com/v/t51.2885-15/299783757_2092631190927482_571943387086778334_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&_nc_ht=scontent-itm1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=rgRftQ3u4RwAX8QLFMy&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkwNjA5MjAyNjk3MTA1MzA2Mg%3D%3D.2-ccb7-5&oh=00_AT_M4VoEIzRw7iL4adymQYewfZqDiKLOCXL6GObp4SFvXA&oe=63183464&_nc_sid=30a2ef"

export const ToDoListItem: React.FC<ToDoListItemProps> = ({thumbnail=sampleImage, ...props}) => {
    const [checked, setChecked] = useState(false)

    return (
        <PaperList.Item
            {...props}
            left={() => <Thumbnail src={thumbnail} />}
            right={() => (
                <View style={styles.checkbox}>
                    <Checkbox status={checked ? "checked" : "unchecked"} />
                </View>
            )}
            onPress={() => setChecked(!checked)}
        />
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
    thumbnail: {
        width: 56,
        height: 56,
        borderRadius: 14,
    },
    checkbox: {
        alignSelf: "center"
    }
})
