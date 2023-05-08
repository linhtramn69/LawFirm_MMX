const { ObjectId } = require("mongodb");

class TypeAppointment {
    constructor(client){
        this.TypeAppointment = client.db().collection("typeAppointment");
    }

    // define csdl
    extractConactData(payload){
        const typeAppointment = {
            ten: payload.ten
        };

        // remove undefined fields
        Object.keys(typeAppointment).forEach(
            (key) => typeAppointment[key] === undefined && delete typeAppointment[key]
        );
        return typeAppointment;
    }

    async findAll(){
        const result = await this.TypeAppointment.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TypeAppointment.findOne(id);
        return result;
    }

    async create(payload){
        const typeAppointment = this.extractConactData(payload);
        const result = await this.TypeAppointment.insertOne(typeAppointment);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const typeAppointment = this.extractConactData(payload);
        const result = await this.TypeAppointment.findOneAndUpdate(
            id,
            { $set: typeAppointment },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TypeAppointment.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = TypeAppointment;