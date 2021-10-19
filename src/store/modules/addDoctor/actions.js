import { db } from '../../../firebaseConfig';

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
      name: payload.payload.name,
      address: payload.payload.address,
      phone: payload.payload.phone,
      date: payload.payload.date
    }).then(() => {
      context.dispatch('getDoctors')
      context.state.isLoading = false
    })
  },

  async updateDoctor(){

  }

}