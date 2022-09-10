import React from "react"
import { Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Provider as PaperProvider, Text, MD3LightTheme as PaperDefaultTheme, Portal, Modal as PaperModal } from "react-native-paper"
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native"
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
import { LoginScreen } from "./src/screens/LoginScreen"

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
    LoggedInScreen: undefined
    LoginScreen: undefined
    AddToDoScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

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
            <StatusBar backgroundColor={palette.neutral[50]} barStyle="dark-content" />
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
                                            initialRouteName="LoginScreen"
                                            screenOptions={{
                                                header: ({route}) => route.name === "Home" ? <AppHeader /> : null
                                            }}
                                        >
                                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                                            <Stack.Screen name="LoggedInScreen" component={LoggedInScreen} />
                                            <Stack.Screen name="AddToDoScreen" component={AddToDoScreen} />
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
    const {modalVisible, modalContent: ModalContent} = useAppSelector(({app: {modalVisible, modalContent}}) => ({modalVisible, modalContent}))
    const dispatch = useAppDispatch()

    return (
        <Portal>
            <PaperModal
                visible={modalVisible}
                onDismiss={() => dispatch(toggleModalVisible(false))}
                contentContainerStyle={styles.modal}
            >
                {ModalContent ? <ModalContent /> : <Text>エラー... ごめんなさい...</Text>}
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
        margin: 20,
        justifyContent: "flex-start",
        borderRadius: 14,
    }
})
