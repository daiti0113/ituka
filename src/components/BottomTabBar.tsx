import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { palette } from "../styles/colorPalette"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Text } from "react-native-paper"

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
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
        flexDirection: "row",
    },
    tab: {
        flex: 1,
        alignItems: "center",
    },
})
