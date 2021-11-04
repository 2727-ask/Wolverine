import actions from "./actions.js";
export default{
    namespaced:true,
    state(){
        return{
            savingRecord:false,
            recordsArray:[],
            totalCut:0
        }
    },
    actions   
}