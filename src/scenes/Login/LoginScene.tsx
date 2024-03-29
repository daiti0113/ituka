import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { useOnAppleButtonPress, useOnGoogleButtonPress, useOnTwitterButtonPress } from "../../helpers/auth"
import { palette } from "../../styles/colorPalette"

export const Login = () => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
                <Text>いつか行きたいとこ、したいことリスト</Text>
            </View>
            <Buttons />
        </View>
    )
}

const Buttons = () => {
    const onTwitterButtonPress = useOnTwitterButtonPress()
    const onGoogleButtonPress = useOnGoogleButtonPress()
    const onAppleButtonPress = useOnAppleButtonPress()

    return(
        <View style={styles.buttonsContainer}>
            <Button
                mode="contained"
                buttonColor="#019EF7"
                icon={TwitterIcon}
                style={styles.button}
                labelStyle={styles.socialLabel}
                onPress={async () => await onTwitterButtonPress()}
            >
                Twitterでログインする
            </Button>
            {/* <Button
                mode="contained"
                buttonColor="#1877F2"
                icon={FacebookIcon}
                style={styles.button}
                labelStyle={styles.socialLabel}
                onPress={() => undefined}
            >
                Facebookでログインする
            </Button> */}
            <Button
                mode="contained"
                buttonColor="#FFFFFF"
                icon={GoogleIcon}
                textColor="#3C3C3C"
                style={styles.button}
                labelStyle={styles.socialLabel}
                onPress={async () => await onGoogleButtonPress()}
            >
                Googleでログインする
            </Button>
            <Button
                mode="contained"
                buttonColor="#000000"
                icon={AppleIcon}
                textColor="#FFFFFF"
                style={styles.button}
                labelStyle={styles.socialLabel}
                onPress={async () => await onAppleButtonPress()}
            >
                Appleでログインする
            </Button>
        </View>
    )
}

const TwitterIcon = () => {
    return (
        <Image style={styles.socialIcon} source={require("../../assets/logo-twitter.png")} />
    )
}

const FacebookIcon = () => {
    return (
        <Image style={styles.socialIcon} source={require("../../assets/logo-facebook.png")} />
    )
}

const GoogleIcon = () => {
    return (
        <Image style={styles.socialIcon} source={require("../../assets/logo-google.png")} />
    )
}

const AppleIcon = () => {
    return (
        <Image style={[styles.socialIcon, {flex: 1}]} source={require("../../assets/logo-apple.png")} />
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        height: "100%",
    },
    title: {
        alignItems: "center",
    },
    logo: {
        alignSelf: "center",
        width: 250,
        height: 82,
    },
    buttonsContainer: {
        marginTop: 40,
    },
    button: {
        borderRadius: 50,
        marginTop: 30,
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
    socialIcon: {
        width: 18,
        height: 18,
        marginRight: 42,
    },
    socialLabel: {
        marginLeft: 0,
    },
    link: {
        textDecorationLine: "underline",
        color: palette.neutral[600],
        alignSelf: "center",
        marginTop: 60,
    },
})
