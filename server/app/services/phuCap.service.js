const { ObjectId } = require("mongodb");

class PhuCap {
    constructor(client){
        this.PhuCap = client.db().collection("phuCap");
    }

    // define csdl
    extractConactData(payload){
        const phuCap = {
            ten_phu_cap: payload.ten_phu_cap,
            tien_phu_cap: payload.tien_phu_cap,
            chuc_vu: payload.chuc_vu
        };

        // remove undefined fields
        Object.keys(phuCap).forEach(
            (key) => phuCap[key] === undefined && delete phuCap[key]
        );
        return phuCap;
    }

    async findAll(){
        const result = await this.PhuCap.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.PhuCap.findOne(id);
        return result;
    }

    async create(payload){
        const phuCap = this.extractConactData(payload);
        const result = await this.PhuCap.insertOne(phuCap);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const phuCap = this.extractConactData(payload);
        const result = await this.PhuCap.findOneAndUpdate(
            id,
            { $set: phuCap },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.PhuCap.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = PhuCap;