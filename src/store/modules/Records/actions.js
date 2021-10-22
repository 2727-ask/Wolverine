import { db } from "../../../firebaseConfig"
export default {
    async newPayment(context, payload) {
        console.log(context)
        console.log(payload)
        await db
            .collection("Payments")
            .doc(this.docName)
            .collection(year)
            .doc(month)
            .collection("data");

    }
}