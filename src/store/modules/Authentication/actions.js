import { dialog } from "@electron/remote";
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
                    dialog.showMessageBoxSync({title:'Logged In',message:'Successfully Logged In',type:'info'});
                    const auth = firebase.auth();
                    context.state.isAuthenticated = true;
                    context.state.userName = auth.currentUser.email;
                    router.push('/')
                })
                .catch((error) => {
                    dialog.showMessageBoxSync({title:'Error',message:`${error}`,type:'error'});
                });
        } catch (error) {
            dialog.showMessageBoxSync({title:'Error',message:`${error}`,type:'error'});
        }
    },
    async logout(context) {
        await firebase
            .auth()
            .signOut()
            .then(() => {
                dialog.showMessageBoxSync({title:'Logged In',message:'Successfully Logged Out',type:'info'});
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