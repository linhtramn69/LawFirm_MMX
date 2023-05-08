const { ObjectId } = require("mongodb");

class AccountingEntry {
    constructor(client){
        this.AccountingEntry = client.db().collection("accountingEntry");
    }

    // define csdl
    extractConactData(payload){
        const accountingEntry = {
            vu_viec: payload.vu_viec,
            tong_tien: payload.tong_tien,
            so_tien_no: payload.so_tien_no,
            dieu_khoan_thanh_toan: payload.dieu_khoan_thanh_toan,
            ngay_lap: payload.ngay_lap,
            status: payload.status,
        };

        // remove undefined fields
        Object.keys(accountingEntry).forEach(
            (key) => accountingEntry[key] === undefined && delete accountingEntry[key]
        );
        return accountingEntry;
    }

    async findAll(){
        const result = await this.AccountingEntry.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.AccountingEntry.findOne(id);
        return result;
    }

    async create(payload){
        const accountingEntry = this.extractConactData(payload);
        const result = await this.AccountingEntry.insertOne(accountingEntry);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const accountingEntry = this.extractConactData(payload);
        const result = await this.AccountingEntry.findOneAndUpdate(
            id,
            { $set: accountingEntry },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.AccountingEntry.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = AccountingEntry;