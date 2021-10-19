// import {db} from '../../../firebaseConfig.js'
export default{
    getDoctors(state,payload){
        state.doctors = payload
        state.dlength = payload.length
    },
}