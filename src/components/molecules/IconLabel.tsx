import React from "react"
import { StyleSheet, View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { IconSource } from "react-native-paper/lib/typescript/components/Icon"
import { palette } from "../../styles/colorPalette"

type IconLabelProps = {
    icon: IconSource
    label?: string
}

export const IconLabel: React.FC<IconLabelProps> = ({icon, label}) => {
    return (
        <View style={styles.container}>
            <IconButton icon={icon} iconColor={palette.neutral[600]} style={styles.icon} />
            <Text variant="bodyMedium" style={{color: palette.neutral[900]}}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        margin: 0,
    }
})