import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { palette } from "../styles/colorPalette"
import { BottomTabBarProps as NavigationBottomTabBarProps } from "@react-navigation/bottom-tabs"
import { IconButton, IconButtonProps, Text, useTheme } from "react-native-paper"
import LinearGradient from "react-native-linear-gradient"

type BottomTabBarProps = NavigationBottomTabBarProps & {
    centerButtonProps?: Omit<IconButtonProps, "theme">
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ centerButtonProps, ...props }) => {
    return (
        <View>
            {centerButtonProps && <CenterButton {...centerButtonProps} />}
            <LinearGradient
                colors={[palette.neutral[300], palette.neutral[50]]}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                style={styles.container}
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
        <View style={styles.centerButton}>
            <IconButton
                {...props}
                iconColor={palette.neutral[50]}
                mode="contained"
                theme={theme}
            />
        </View>
    )
}

const Tabs: React.FC<NavigationBottomTabBarProps> = ({state, descriptors, navigation}) => {
    return (
        <View style={styles.tabs}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label = options.tabBarLabel ? options.tabBarLabel : options.title ? options.title : route.name
                const isFocused = state.index === index

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
                        {typeof label === "string"
                            ? (
                                <Text style={{color: isFocused ? palette.primary[500] : palette.neutral[500]}}>
                                    {label}
                                </Text>
                            )
                            : label({focused: isFocused, color: palette.primary[500], position: "below-icon"})
                        }
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 64,
        justifyContent: "flex-end"
    },
    tabs: {
        flexDirection: "row",
        backgroundColor: palette.neutral[50],
        height: 40,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
    centerButton: {
        // position: "absolute",
        // bottom: 0,
        // width: "100%",
        
        alignSelf: "center",
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
