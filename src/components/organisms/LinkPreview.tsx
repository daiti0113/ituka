import React from "react"
import { useEffect, useState } from "react"
import { getLinkPreview } from "link-preview-js"
import { Image, StyleSheet } from "react-native"
import { palette } from "../../styles/colorPalette"

type previewInfo = {
    url: string;
    title?: string;
    siteName?: string | undefined;
    description?: string | undefined;
    mediaType: string;
    contentType: string | undefined;
    images?: string[];
    favicons: string[];
}

type LinkPreviewProps = {
    url: string
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({url}) => {
    const [previewInfo, setPreviewInfo] = useState<previewInfo>()

    useEffect(() => {
        getLinkPreview(url).then((data) => {
            setPreviewInfo(data)
        })
    }, [])

    console.log({previewInfo})

    return (
        <Image source={{uri: previewInfo?.images?.[0]}} style={styles.thumbnail} />
    )
}

const styles = StyleSheet.create({
    thumbnail: {
        height: 50,
        width: 50,
        backgroundColor: palette.neutral[500]
    }
})
