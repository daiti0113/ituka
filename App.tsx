import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Provider as PaperProvider, Text, TextInput, MD3LightTheme as PaperDefaultTheme } from "react-native-paper"
import { NavigationContainer, useNavigation, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./src/store"
import { HomeScreen } from "./src/screens/HomeScreen"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const theme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: "#74D4E1",
        secondary: "#f1c40f",
        tertiary: "#a1b2c3",
        background: "#FFFFFF",
    },
}

export type RootStackParamList = {
    Home: undefined
    Details: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const DetailsScreen = () => {
    const navigation = useNavigation<DetailsScreenNavigationProp>()
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
            <Text>Details Screen</Text>
            <TextInput label="Detail" />
            <Button onPress={() => navigation.navigate("Home")}>Go to Home</Button>
        </View>
    )
}

const App = () => {
    return (
        <SafeAreaProvider>
            <ReduxProvider store={store}>
                <PaperProvider theme={theme}>
                    <NavigationContainer theme={theme}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <Stack.Navigator
                                initialRouteName="Home"
                                screenOptions={{header: () => (
                                    <View style={{padding: 10}}>
                                        <Text variant="headlineLarge">icocca</Text>
                                        <Text style={styles.subTitle}>いつか行きたいとこリスト</Text>
                                    </View>
                                )}}
                            >
                                <Stack.Screen name="Home" component={HomeScreen} />
                                <Stack.Screen name="Details" component={DetailsScreen} />
                            </Stack.Navigator>
                        </SafeAreaView>
                    </NavigationContainer>
                </PaperProvider>
            </ReduxProvider>
        </SafeAreaProvider>
    )
}

export default App

const styles = StyleSheet.create({
    subTitle: {
        color: "#3C3C3C"
    }
})
