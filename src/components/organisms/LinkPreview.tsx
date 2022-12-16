import React from "react"
import { useEffect, useState } from "react"
import { getLinkPreview } from "link-preview-js"
import { Image, StyleSheet, View } from "react-native"
import { palette } from "../../styles/colorPalette"
import { ActivityIndicator, Text } from "react-native-paper"

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
    const [isLoading, setIsLoading] = useState(false)
    const [previewInfo, setPreviewInfo] = useState<previewInfo>()

    useEffect(() => {
        setIsLoading(true)
        getLinkPreview(url)
            .then((data) => setPreviewInfo(data))
            .finally(() => setIsLoading(false))
    }, [])

    return isLoading ? <Loading /> : <Loaded previewInfo={previewInfo} />
}

type LoadedProps = {
    previewInfo?: previewInfo
}

const Loaded: React.FC<LoadedProps> = ({previewInfo}) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: previewInfo?.images?.[0]}} style={styles.thumbnail} />
            <View style={styles.textContainer}>
                <Text variant="labelLarge" numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{previewInfo?.title}</Text>
                <Text variant="bodySmall" numberOfLines={2} ellipsizeMode="tail">{previewInfo?.description}</Text>
            </View>
        </View>
    )
}

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={true}
                color={palette.primary[500]}
                style={styles.spinner}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: palette.neutral[50],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    thumbnail: {
        height: 80,
        width: 80,
        resizeMode: "contain",
        backgroundColor: palette.neutral[500],
    },
    textContainer: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 6,
    },
    title: {
        marginBottom: 4,
    },
    spinner: {
        height: 80,
        width: 80,
    },
})
