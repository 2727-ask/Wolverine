import {db} from '../../../firebaseConfig';
export default{

    async fetchFacilities(context){
        const facilities = []
        await db.collection('Facilities').get().then((data)=>{
            data.forEach((facility)=>{
                facilities.push(facility.data())
            })
        })
        context.commit('fetchFacilities',facilities)
    },

    addFacility(context,payload){

        context.state.addingFacility = true;
        db.collection('Facilities').doc(payload.payload.name).set({
            name:payload.payload.name,
            totalPrice:payload.payload.totalPrice,
            cutPrice:payload.payload.cutPrice
        }).then(()=>{
            console.log("Data Saved");
            context.dispatch('fetchFacilities')
            context.state.addingFacility = false;
        })
    }

}