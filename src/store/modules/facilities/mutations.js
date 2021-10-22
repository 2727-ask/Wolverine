export default{
    fetchFacilities(state,payload){
        state.facilities = payload
        console.log(state.facilities)
    }
}