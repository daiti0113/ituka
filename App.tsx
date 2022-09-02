import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Provider as PaperProvider, Text, TextInput, MD3LightTheme as PaperDefaultTheme } from "react-native-paper"
import { NavigationContainer, useNavigation, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./src/store"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { palette } from "./src/styles/colorPalette"
import { LoggedInScreen } from "./src/screens/LoggedInScreen"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-community/async-storage"

const theme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: palette.primary[500],
        background: palette.neutral[50],
        surfaceVariant: palette.primary[500],
    },
}

export const storage = new Storage({
    storageBackend: AsyncStorage
})

export type RootStackParamList = {
    LoggedIn: undefined
    Login: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>()
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
            <Text>Login Screen</Text>
            <TextInput label="Login" />
            <Button onPress={() => navigation.navigate("LoggedIn")}>Go to Home</Button>
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
                                initialRouteName="LoggedIn"
                                screenOptions={{header: () => (
                                    <View style={{padding: 10}}>
                                        <Text variant="headlineLarge">icocca</Text>
                                        <Text style={styles.subTitle}>いつか行きたいとこリスト</Text>
                                    </View>
                                )}}
                            >
                                <Stack.Screen name="LoggedIn" component={LoggedInScreen} />
                                <Stack.Screen name="Login" component={LoginScreen} />
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
