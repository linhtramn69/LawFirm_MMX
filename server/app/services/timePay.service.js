const { ObjectId } = require("mongodb");

class TimePay {
    constructor(client){
        this.TimePay = client.db().collection("timePay");
    }

    // define csdl
    extractConactData(payload){
        const timePay = {
            ten: payload.ten
        }
        // remove undefined fields
        Object.keys(timePay).forEach(
            (key) => timePay[key] === undefined && delete timePay[key]
        );
        return timePay;
    }

    async findAll(){
        const result = await this.TimePay.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TimePay.findOne(id);
        return result;
    }

    async create(payload){
        const timePay = this.extractConactData(payload);
        const result = await this.TimePay.insertOne(timePay);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const timePay = this.extractConactData(payload);
        const result = await this.TimePay.findOneAndUpdate(
            id,
            { $set: timePay },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TimePay.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = TimePay;