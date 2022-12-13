import React from "react"
import { Image } from "react-native"
import { createUseStyles } from "../../helpers/style"

type ThumbnailProps = {
    src?: string
    size?: number
}

export const Thumbnail: React.FC<ThumbnailProps> = ({src, size=56}) => {
    const styles = useStyles(size)

    return (
        <Image source={{uri: src}} style={styles.thumbnail} />
    )
}

// TODO: Emotionに切り替える
const useStyles = createUseStyles((size: number) => ({
    thumbnail: {
        width: size,
        height: size,
        borderRadius: 14,
        marginRight: 10,
    },
}))
