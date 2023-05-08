const { ObjectId } = require("mongodb");

class Contract {
    constructor(client){
        this.Contract = client.db().collection("contract");
    }

    // define csdl
    extractConactData(payload){
        const contract = {
            thoi_gian_bd: payload.thoi_gian_bd,
            thoi_gian_kt: payload.thoi_gian_kt,
            phieu_bao_gia: payload.phieu_bao_gia,
            vu_viec: payload.vu_viec,
            khach_hang: payload.khach_hang,
            luat_su: payload.luat_su,
        };

        Object.keys(contract).forEach(
            (key) => contract[key] === undefined && delete contract[key]
        );
        return contract;
    }

    async findAll(){
        const result = await this.Contract.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Contract.findOne(id);
        return result;
    }

    async create(payload){
        const contract = this.extractConactData(payload);
        const result = await this.Contract.insertOne(contract);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const contract = this.extractConactData(payload);
        const result = await this.Contract.findOneAndUpdate(
            id,
            { $set: contract },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Contract.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = Contract;