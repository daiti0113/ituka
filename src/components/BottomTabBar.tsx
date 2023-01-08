import React from "react"
import { View, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native"
import { palette } from "../styles/colorPalette"
import { BottomTabBarProps as NavigationBottomTabBarProps } from "@react-navigation/bottom-tabs"
import { IconButton, IconButtonProps, Text, useTheme } from "react-native-paper"
import LinearGradient from "react-native-linear-gradient"
import Svg, { Path } from "react-native-svg"

type BottomTabBarProps = NavigationBottomTabBarProps & {
    centerButtonProps?: Omit<IconButtonProps, "theme">
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ centerButtonProps, ...props }) => {
    return (
        <View style={styles.container}>
            {centerButtonProps && <CenterButton {...centerButtonProps} />}
            <LinearGradient
                colors={["#FFFFFF00", palette.neutral[300]]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.gradient}
            >
                <View>
                    <Tabs {...props} />
                </View>
            </LinearGradient>
        </View>
    )
}

const CenterButton: React.FC<BottomTabBarProps["centerButtonProps"]> = (props) => {
    const theme = useTheme()

    if (!props) return null

    return (
        <View style={styles.centerButtonContainer}>
            <View style={styles.centerButton}>
                <IconButton
                    {...props}
                    iconColor={palette.neutral[600]}
                    mode="contained"
                    theme={theme}
                    size={34}
                />
            </View>
        </View>
    )
}

const Tabs: React.FC<NavigationBottomTabBarProps> = ({state, descriptors, navigation}) => {
    return (
        <View style={styles.tabs}>
            <TabsBackground />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label = options.tabBarLabel ? options.tabBarLabel : options.title ? options.title : route.name
                const isFocused = state.index === index
                const Icon = options.tabBarIcon ? options.tabBarIcon : () => null

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    })
                }

                return (
                    <TouchableOpacity
                        key={`bottom-tab-bar-${route.name}`}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tab}
                    >
                        {/* FIXME: 型エラーが起きてるので後で直す */}
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <Icon color={isFocused ? palette.primary[500] : palette.neutral[500]} focused={isFocused} size={28} />
                        {options.tabBarShowLabel && (typeof label === "string"
                            ? (
                                <Text variant="labelSmall" style={{color: isFocused ? palette.primary[500] : palette.neutral[500], margin: 0}}>
                                    {label}
                                </Text>
                            )
                            : label({focused: isFocused, color: palette.primary[500], position: "below-icon"})
                        )}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const TabsBackground = () => {
    const width = useWindowDimensions().width
    const bgStyles = createBackgroundStyles(width)

    // 中央にSVGを利用するため、左、中央、右に分けている
    return (
        <View style={bgStyles.bg}>
            <View style={bgStyles.bgLeft} />
            <View style={bgStyles.bgCenter}>
                <Svg
                    width={76}
                    height={34}
                    viewBox="0 0 76 34"
                >
                    <Path
                        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                        fill={palette.neutral[50]}
                    />
                </Svg>
            </View>
            <View style={bgStyles.bgRight} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
    },
    gradient: {
        height: 68,
        justifyContent: "flex-end",
    },
    tabs: {
        flexDirection: "row",
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
    centerButtonContainer: {
        position: "absolute",
        zIndex: 100,
        alignSelf: "center",
        borderRadius: 50,
        padding: 4,
    },
    centerButton: {
        /* shadow */
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
})

const createBackgroundStyles = (width: number) => StyleSheet.create({
    bg: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    bgCenter: {
        alignItems: "center",
    },
    bgLeft: {
        position: "absolute",
        backgroundColor: palette.neutral[50],
        bottom: 0,
        height: 34,
        width: width / 2 - 36,
    },
    bgRight: {
        position: "absolute",
        backgroundColor: palette.neutral[50],
        right: 0,
        bottom: 0,
        height: 34,
        width: width / 2 - 34,
    }
})