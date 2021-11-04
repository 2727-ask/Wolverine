import firebase from "firebase";
import "firebase/auth";
import router from "../../../router";


export default {
    async login(context, payload) {
        console.log(context, payload);
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(payload.payload.email, payload.payload.password)
                .then(() => {
                    alert("Successfully logged in");
                    const auth = firebase.auth();
                    context.state.isAuthenticated = true;
                    context.state.userName = auth.currentUser.email;
                    router.push('/')
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            console.error(error)
        }
    },
    async logout(context) {
        await firebase
            .auth()
            .signOut()
            .then(() => {
                alert('Successfully logged out');
                context.state.isAuthenticated = false;
                context.state.userName = null;
                router.push('/login');
            })
            .catch(error => {
                alert(error.message);
                router.push('/login');
            });
    },

}