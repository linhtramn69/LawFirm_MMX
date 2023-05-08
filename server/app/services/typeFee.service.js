const { ObjectId } = require("mongodb");

class TypeFee {
    constructor(client){
        this.TypeFee = client.db().collection("typeFee");
    }

    // define csdl
    extractConactData(payload){
        const typeFee = {
            loai_chi_phi: payload.loai_chi_phi,
        };

        Object.keys(typeFee).forEach(
            (key) => typeFee[key] === undefined && delete typeFee[key]
        );
        return typeFee;
    }

    async findAll(){
        const result = await this.TypeFee.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TypeFee.findOne(id);
        return result;
    }

    async create(payload){
        const typeFee = this.extractConactData(payload);
        const result = await this.TypeFee.insertOne(typeFee);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const typeFee = this.extractConactData(payload);
        const result = await this.TypeFee.findOneAndUpdate(
            id,
            { $set: typeFee },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TypeFee.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = TypeFee;