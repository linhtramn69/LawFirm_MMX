const { ObjectId } = require("mongodb");

class BoPhan {
    constructor(client){
        this.BoPhan = client.db().collection("boPhan");
    }

    extractConactData(payload){
        const boPhan = {
            _id: payload._id,
            ten_bo_phan: payload.ten_bo_phan,
        };

        Object.keys(boPhan).forEach(
            (key) => boPhan[key] === undefined && delete boPhan[key]
        );
        return boPhan;
    }

    async findAll(){
        const result = await this.BoPhan.find();
        return result.toArray();
    }
    async findById(id){
        const result = await this.BoPhan.find({ _id: id });
        return result.toArray();
    }
    // async findById(id){
    //     const result = await this.BoPhan.findOne({ _id: id });
    //     return result;
    // }

    async create(payload){
        const boPhan = this.extractConactData(payload);
        const result = await this.BoPhan.insertOne(boPhan);
        return result;
    }

    async update(id, payload){
        const boPhan = this.extractConactData(payload);
        const result = await this.BoPhan.findOneAndUpdate(
            { _id: id},
            { $set: boPhan },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        const result = await this.BoPhan.findOneAndDelete({ _id: id });
        return result;
    }

}

module.exports = BoPhan;