import { db } from '../../../firebaseConfig';
import router from '../../../router';

export default {
  async getDoctors(context) {
    const doctors = []
    var profiles = db.collection("Profiles")
      await profiles.get().then((data) => {
        data.forEach((fetchedData) => {
          doctors.push(fetchedData.data())
        })
        context.commit('getDoctors', doctors)
      }).catch((error)=>{
        console.log("Error is -->",error)
      })
  },

  async addDoctor(context, payload) {
    context.state.isLoading = true
    db.collection('Profiles').doc(payload.payload.name).set({
      id:payload.payload.id,
      name: payload.payload.name,
      address: payload.payload.address,
      phone: payload.payload.phone,
      date: payload.payload.date
    }).then(() => {
      context.dispatch('getDoctors')
      context.state.isLoading = false
    })
  },

  async updateDoctor(context, payload){
    context.state.isUpdating = true
    console.log(payload.payload.target)
    await db.collection('Profiles').doc(payload.payload.target).update({
      name: payload.payload.update.name,
      address: payload.payload.update.address,
      phone: payload.payload.update.phone,
    }).then(() => {
      context.dispatch('getDoctors')
      context.state.isUpdating = false
    })

  },

  async deleteDoctor(context,payload){
    console.log("Delete Doctor Function Triggered");
    console.log(context,payload);
    const deleteDoc = db.collection("Profiles").where('id','==',payload.payload);
    await deleteDoc.get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        doc.ref.delete();
      })
      context.dispatch('getDoctors')
      router.push({ path: '/newdoctor' })
    })
  }



}