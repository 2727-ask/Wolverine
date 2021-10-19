import mutations from "../addDoctor/mutations";
import actions from "../addDoctor/actions";

export default{
    namespaced: true,
    state(){
        return{
            doctors:[],
            dlength:0,
            isLoading:false,
            isUpdating:false
        }
    },
    mutations,
    actions
}