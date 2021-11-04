import actions from "./actions";
export default{
    namespaced:true,
    state(){
        return{
            isAuthenticated:false,
            userName:null
        }
    },
    actions
}