const { ObjectId } = require("mongodb");

class TypePay {
    constructor(client){
        this.TypePay = client.db().collection("typePay");
    }

    // define csdl
    extractConactData(payload){
        const typePay = {
            ten: payload.ten
        }
        // remove undefined fields
        Object.keys(typePay).forEach(
            (key) => typePay[key] === undefined && delete typePay[key]
        );
        return typePay;
    }

    async findAll(){
        const result = await this.TypePay.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TypePay.findOne(id);
        return result;
    }

    async create(payload){
        const typePay = this.extractConactData(payload);
        const result = await this.TypePay.insertOne(typePay);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const typePay = this.extractConactData(payload);
        const result = await this.TypePay.findOneAndUpdate(
            id,
            { $set: typePay },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TypePay.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = TypePay;