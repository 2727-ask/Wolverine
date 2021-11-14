import actions from "./actions.js";
import mutations from "./mutations.js";
export default{
    namespaced:true,
    state(){
        return{
            savingRecord:false,
            recordsArray:[],
            totalCut:0
        }
    },
    mutations,
    actions   
}