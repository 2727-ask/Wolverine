class Record {
    constructor(id,patientName, age, gender, purpose, refBy, date, cut, total, profit,patientPays) {
        this.id = id,
        this.patientName = patientName,
        this.age = age,
        this.gender = gender,
        this.purpose = purpose,
        this.refBy = refBy,
        this.date = date,
        this.cut = cut,
        this.total = total,
        this.profit = profit,
        this.patientPays = patientPays
    }
}

export default Record;