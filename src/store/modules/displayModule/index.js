import mutations from "./mutations.js"
export default{
    namespaced: true,
    state(){
        return{
            displayColor: 'white',
            displayModeName: 'Light',
        }
    },
    mutations
}