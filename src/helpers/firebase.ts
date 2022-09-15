import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup } from "firebase/auth"
// import Config from "react-native-config"
import { GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    // apiKey: Config.API_KEY,
    // authDomain: Config.AUTH_DOMAIN,
    // projectId: Config.PROJECT_ID,
    // storageBucket: Config.STORAGE_BUCKET,
    // messagingSenderId: Config.MESSAGING_SENDER_ID,
    // appId: Config.APP_ID,
    // measurementId: Config.MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const authProvider = {
    google: new GoogleAuthProvider()
}

export const googleSignin = async () => {
    return signInWithPopup(auth, authProvider.google)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential?.accessToken
            console.log({user: result.user, token})
            return {user: result.user, token}
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.customData.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
        })
}
