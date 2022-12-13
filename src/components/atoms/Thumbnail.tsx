import React from "react"
import { Image } from "react-native"
import { createUseStyles } from "../../helpers/style"

type ThumbnailProps = {
    src?: string
    size?: number
    borderRadius?: number
}

export const Thumbnail: React.FC<ThumbnailProps> = ({src, size=56, borderRadius=14}) => {
    const styles = useStyles(size, borderRadius)

    return (
        <Image source={{uri: src}} style={styles.thumbnail} />
    )
}

// TODO: Emotionに切り替える
const useStyles = createUseStyles((size: number, borderRadius: number) => ({
    thumbnail: {
        width: size,
        height: size,
        borderRadius,
        marginRight: 10,
    },
}))
