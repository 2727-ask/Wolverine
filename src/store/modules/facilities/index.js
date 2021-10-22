import mutations from "./mutations";
import actions from "./actions";
export default{
    namespaced:true,
    state(){
        return{
            facilities:[],
            addingFacility:false
        }
    },
    mutations,
    actions
}