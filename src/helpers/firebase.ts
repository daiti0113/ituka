import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import { appleAuth } from "@invertase/react-native-apple-authentication"
import RNTwitterSignIn from "@react-native-twitter-signin/twitter-signin"
import Config from "react-native-config"
import auth from "@react-native-firebase/auth"
import { useAppDispatch } from "./store"
import { login } from "../slices/auth"

GoogleSignin.configure({
    webClientId: "20446199492-5ml20n4qkpo21s4sso6b5bqdudfb2deg.apps.googleusercontent.com",
})

export const useOnGoogleButtonPress = () => {
    const dispatch = useAppDispatch()

    return async() => {
        try {
            await GoogleSignin.hasPlayServices()
            const {idToken} = await GoogleSignin.signIn()
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken)
            // Sign-in the user with the credential
            auth().signInWithCredential(googleCredential)
            dispatch(login())
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }
}

export const useOnAppleButtonPress = () => {
    const dispatch = useAppDispatch()

    return async() => {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            // Note: it appears putting FULL_NAME first is important, see issue #293
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        })
        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

        // Sign the user in with the credential
        auth().signInWithCredential(appleCredential)
        dispatch(login())
    }
}

// NOTE: たぶんログイン済み確認のときに使える
// // get current authentication state for user
// // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
// const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

// // use credentialState response to ensure the user is authenticated
// if (credentialState === appleAuth.State.AUTHORIZED) {
//     // user is authenticated


/*
TODO: Appleのログアウト実装
There is an operation appleAuth.Operation.LOGOUT, however it does not work as expected and is not even being used by Apple in their example code. See this issue for more information
So it is recommended when logging out to just clear all data you have from a user, collected during appleAuth.Operation.LOGIN.
*/


export const useOnTwitterButtonPress = () => {
    const dispatch = useAppDispatch()

    return async () => {
        RNTwitterSignIn.init(
            Config.TWITTER_COMSUMER_KEY || "",
            Config.TWITTER_CONSUMER_SECRET || "",
        )

        try {
            // Perform the login request
            const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn()
            if (!authToken) throw new Error("authToken is undefined")
            // Create a Twitter credential with the tokens
            const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret)
            // Sign-in the user with the credential
            auth().signInWithCredential(twitterCredential)
            dispatch(login())
        } catch (error) {
            console.log(error)
        }
    }
}