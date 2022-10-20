import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import { appleAuth } from "@invertase/react-native-apple-authentication"

GoogleSignin.configure({
    webClientId: "20446199492-5ml20n4qkpo21s4sso6b5bqdudfb2deg.apps.googleusercontent.com",
})

export const onGoogleButtonPress = async() => {
    try {
        console.log({GoogleSignin})
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        console.log({userInfo})
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
    }}


export const onAppleButtonPress = async() => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })
    
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
    
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
    }
}


/*
TODO: Appleのログアウト実装
There is an operation appleAuth.Operation.LOGOUT, however it does not work as expected and is not even being used by Apple in their example code. See this issue for more information
So it is recommended when logging out to just clear all data you have from a user, collected during appleAuth.Operation.LOGIN.
*/
