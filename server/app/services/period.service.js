const { ObjectId } = require("mongodb");

class Period {
    constructor(client){
        this.Period = client.db().collection("period");
    }

    // define csdl
    extractConactData(payload){
        const period = {
            ten_qt: payload.ten_qt,
            vu_viec: payload.vu_viec,
            status: payload.status,
            mo_ta: payload.mo_ta
        };

        // remove undefined fields
        Object.keys(period).forEach(
            (key) => period[key] === undefined && delete period[key]
        );
        return period;
    }

    async findAll(){
        const result = await this.Period.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Period.findOne(id);
        return result;
    }

    async create(payload){
        const period = this.extractConactData(payload);
        const result = await this.Period.insertOne({
            ...period,
            status: 0
        });
        return result
    }
    async findByMatter(payload) {
        const result = await this.Period.find({
            vu_viec: payload
        });
        return result.toArray();
    }
    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Period.findOneAndUpdate(
            id,
            { $set: {status: payload} },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Period.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = Period;