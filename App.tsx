import React from "react"
import { View } from "react-native"
import { Button, Provider as PaperProvider, Text, TextInput } from "react-native-paper"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"


type RootStackParamList = {
    Home: undefined
    Details: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>()

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>()
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
            <Text>Home Screen</Text>
            <TextInput label="Home" />
            <Button onPress={() => navigation.navigate("Details")}>Go to Detail</Button>
        </View>
    )
}

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
        <NavigationContainer>
            <PaperProvider>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </Stack.Navigator>
            </PaperProvider>
        </NavigationContainer>
    )
}

export default App
