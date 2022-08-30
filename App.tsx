import React from "react"
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { Provider as PaperProvider, TextInput } from "react-native-paper"


const App = () => {
    const isDarkMode = useColorScheme() === "dark"

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
            >
                <PaperProvider>
                    <TextInput label="テスト" />
                </PaperProvider>
            </ScrollView>
        </SafeAreaView>
    )
}

export default App
