import { db } from '../../../firebaseConfig';
import deleteFile from '../../../functions/deleteFile';
import router from '../../../router';
export default {

    async fetchFacilities(context) {
        const facilities = []
        await db.collection('Facilities').get().then((data) => {
            data.forEach((facility) => {
                facilities.push(facility.data())
            })
        })
        context.commit('fetchFacilities', facilities)
    },

    async addFacility(context, payload) {
        context.state.addingFacility = true;
        await db.collection('Facilities').doc(payload.payload.name).set({
            id: payload.payload.id,
            name: payload.payload.name,
            totalPrice: payload.payload.totalPrice,
            cutPrice: payload.payload.cutPrice
        }).then(() => {
            console.log("Data Saved");
            context.dispatch('fetchFacilities')
            context.state.addingFacility = false;
        })
    },

    async updateFacility(context, payload) {
        context.state.addingFacility = true;
        try {
            await db.collection('Facilities').doc(payload.payload.name).update({
                totalPrice: payload.payload.totalPrice,
                cutPrice: payload.payload.cutPrice
            }).then(() => {
                console.log("Data Saved");
                context.dispatch('fetchFacilities')
                context.state.addingFacility = false;
            })
        } catch (error) {
            console.log(error);
            context.state.addingFacility = false;
        }

    },

    async deleteFacility(context, payload) {
        try {
            console.log("Delete Facility Function Triggered");
            console.log(context, payload);
            const deleteDoc = db.collection("Facilities").where('id', '==', payload.payload.id);
            await deleteDoc.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                })
                deleteFile(payload.payload.name)


            }).finally(() => {
                context.dispatch('fetchFacilities')
                router.push({ path: '/facilities' })
            })
        } catch (error) {
            console.error(error)
        }

    }

}