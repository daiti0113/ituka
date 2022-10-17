import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"

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

// export const googleSignin = async () => {
//     return signInWithPopup(auth, authProvider.google)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result)
//             const token = credential?.accessToken
//             console.log({result, token})
//             // return {user: result.user, token}
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code
//             const errorMessage = error.message
//             // The email of the user's account used.
//             const email = error.customData.email
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error)
//         })
// }
