import React from "react"
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Button, Provider as PaperProvider, Text, TextInput, MD3LightTheme as PaperDefaultTheme, Portal, Modal as PaperModal } from "react-native-paper"
import { NavigationContainer, useNavigation, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Provider as ReduxProvider } from "react-redux"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { palette } from "./src/styles/colorPalette"
import { LoggedInScreen } from "./src/screens/LoggedInScreen"
import { AddToDoScreen } from "./src/screens/AddToDoScreen"
import { persistor, store } from "./src/store"
import { PersistGate } from "redux-persist/integration/react"
import { useAppDispatch, useAppSelector } from "./src/helpers/store"
import { toggleModalVisible } from "./src/slices/app"

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

export type RootStackParamList = {
    LoggedIn: undefined
    Login: undefined
    AddToDo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

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

const AppHeader = () => {
    return (
        <View style={{padding: 10}}>
            <Text variant="headlineLarge">icocca</Text>
            <Text style={styles.subTitle}>いつか行きたいとこリスト</Text>
        </View>
    )
}

const App = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => Keyboard.dismiss()}
            >
                {/* TODO: Dark ModeのThemeを要したら、SafeAreaProviderのstyleは削除すること */}
                <SafeAreaProvider style={{backgroundColor: palette.neutral[50]}}>
                    <ReduxProvider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <PaperProvider theme={theme}>
                                <NavigationContainer theme={theme}>
                                    <SafeAreaView style={{ flex: 1 }}>
                                        <Modal />
                                        <Stack.Navigator
                                            initialRouteName="LoggedIn"
                                            screenOptions={{
                                                header: ({route}) => route.name !== "AddToDo" ? <AppHeader /> : null
                                            }}
                                        >
                                            <Stack.Screen name="LoggedIn" component={LoggedInScreen} />
                                            <Stack.Screen name="Login" component={LoginScreen} />
                                            <Stack.Screen name="AddToDo" component={AddToDoScreen} />
                                        </Stack.Navigator>
                                    </SafeAreaView>
                                </NavigationContainer>
                            </PaperProvider>
                        </PersistGate>
                    </ReduxProvider>
                </SafeAreaProvider>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const Modal = () => {
    const {modalVisible} = useAppSelector(({app: {modalVisible}}) => ({modalVisible}))
    const dispatch = useAppDispatch()

    return (
        <Portal>
            <PaperModal
                visible={modalVisible}
                onDismiss={() => dispatch(toggleModalVisible(false))} contentContainerStyle={styles.modal}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </PaperModal>
        </Portal>

    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subTitle: {
        color: "#3C3C3C",
    },
    modal: {
        backgroundColor: palette.neutral[50],
        padding: 20,
    }
})
