import { db } from "../../../firebaseConfig"
export default {
    async newPayment(context, payload) {
        console.log(context.state);
        context.state.savingRecord = true;
        // const d = new Date()
        const monthsMap = {
            "01": "1",
            "02": "2",
            "03": "3",
            "04": "4",
            "05": "5",
            "06": "6",
            "07": "7",
            "08": "8",
            "09": "9",
            "10": "10",
            "11": "11",
            "12": "12",
        };
        const timeStamp = payload.payload.date;
        let year = timeStamp.slice(0, 4);
        let month = monthsMap[timeStamp.slice(5, 7)];
        console.log(year, month)
        console.log(context)
        console.log(payload)
        console.log(payload.payload.refBy)





        await db.collection("Payments")
            .doc(payload.payload.refBy)
            .collection(year)
            .doc(month.toString())
            .collection("data").add({
                id: payload.payload.id,
                patientName: payload.payload.patientName,
                age: payload.payload.age,
                gender: payload.payload.gender,
                purpose: payload.payload.purpose,
                refBy: payload.payload.refBy,
                date: payload.payload.date,
                cut: payload.payload.cut,
                total: payload.payload.total,
                profit: payload.payload.profit,
                patientPays: payload.payload.patientPays
            }).then(() => {
                console.log("Data Saved")
                context.state.savingRecord = false;
            });

    },
    async fetchPayments(context,payload) {
        context.state.recordsArray = []
        var totalCut = 0

        console.log("fetchPayments Triggered")
        console.log(payload.payload);
        await db
            .collection("Payments")
            .doc(payload.payload.docName)
            .collection(payload.payload.year)
            .doc(payload.payload.month).collection('data').get().then((payments)=>{
                payments.forEach((doc)=>{
                    context.state.recordsArray.push(doc.data())
                    if(doc.data().cut){
                        totalCut = totalCut + doc.data().cut
                    }
                    
                })
            })
            context.state.totalCut = totalCut
            console.log("Total Cut",context.state.totalCut)
    },

    async deleteRecord(context, payload) {
        console.log('delete Record Triggered')
        console.log(context)
        const proxydata = payload.payload;
        const payment = JSON.parse(
            JSON.stringify(proxydata)
        );
        console.log('Payment Details', payment)

        const paymentToBeDeleted = db
            .collection("Payments")
            .doc(payment.docName)
            .collection(payment.year)
            .doc(payment.month).collection('data').where('id', '==', payment.id)
        await paymentToBeDeleted.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            })
        })

    }

}