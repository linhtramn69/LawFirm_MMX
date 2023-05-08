const { ObjectId } = require("mongodb");

class TypeDegree {
    constructor(client){
        this.TypeDegree = client.db().collection("typeDegree");
    }

    // define csdl
    extractConactData(payload){
        const typeDegree = {
            ten_loai_bang_cap: payload.ten_loai_bang_cap
        };

        // remove undefined fields
        Object.keys(typeDegree).forEach(
            (key) => typeDegree[key] === undefined && delete typeDegree[key]
        );
        return typeDegree;
    }

    async findAll(){
        const result = await this.TypeDegree.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TypeDegree.findOne(id);
        return result;
    }

    async create(payload){
        const typeDegree = this.extractConactData(payload);
        const result = await this.TypeDegree.insertOne(typeDegree);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const typeDegree = this.extractConactData(payload);
        const result = await this.TypeDegree.findOneAndUpdate(
            id,
            { $set: typeDegree },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TypeDegree.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = TypeDegree;