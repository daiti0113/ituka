import React from "react"
import { Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Provider as PaperProvider, Text, MD3LightTheme as PaperDefaultTheme, Portal, Modal as PaperModal } from "react-native-paper"
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native"
import { Provider as ReduxProvider } from "react-redux"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { palette } from "./src/styles/colorPalette"
import { persistor, store } from "./src/store"
import { PersistGate } from "redux-persist/integration/react"
import { useAppDispatch, useAppSelector } from "./src/helpers/store"
import { toggleModalVisible } from "./src/slices/app"
import { AppScreen } from "./src/screens/AppScreen"

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
                                        <PopUpModal />
                                        <AppScreen />
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

// TODO: 別ファイルに切り出す
const PopUpModal = () => {
    const {popUpModalVisible, popUpModalContent: ModalContent} = useAppSelector(({app: {popUpModalVisible, popUpModalContent}}) => ({popUpModalVisible, popUpModalContent}))
    const dispatch = useAppDispatch()

    return (
        <Portal>
            <PaperModal
                visible={popUpModalVisible}
                onDismiss={() => dispatch(toggleModalVisible({visible: false}))}
                contentContainerStyle={styles.modal}
            >
                {ModalContent ? <ModalContent /> : <Text>エラー... ごめんなさい...</Text>}
            </PaperModal>
        </Portal>
    )
}

// TODO: ModalをNavigationに移動する。ルートの一つして開くようにする。
const MenuModal = () => {
    const {menuModalVisible, menuModalContent: ModalContent} = useAppSelector(({app: {menuModalVisible, menuModalContent}}) => ({menuModalVisible, menuModalContent}))
    const dispatch = useAppDispatch()
    const closeModal = () => dispatch(toggleModalVisible({type: "menu", visible: false}))

    if (!menuModalVisible) return null

    return (
        <>
            <TouchableOpacity style={styles.menuModalBackground} onPress={closeModal} />
            <View style={styles.menuModal}>
                {ModalContent ? <ModalContent /> : <Text>エラー... ごめんなさい...</Text>}
            </View>
        </>
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
    },
    slideInModalBackground: {
        height: "100%",
        backgroundColor: "#000",
        opacity: 0.7,
    },
    slideInModal: {
        backgroundColor: palette.neutral[50],
        top: "10%",
        padding: 20,
        height: "100%",
        opacity: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    menuModalBackground: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#000",
        opacity: 0.6,
    },
    menuModal: {
        position: "absolute",
        height: 400,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: palette.neutral[50] + "FF",
    }
})
