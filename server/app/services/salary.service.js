const { ObjectId } = require("mongodb");

class Salary {
    constructor(client){
        this.Salary = client.db().collection("salary");
    }

    // define csdl
    extractConactData(payload){
        const salary = {
            tien_luong: payload.tien_luong,
            chuc_vu: payload.chuc_vu
        };

        // remove undefined fields
        Object.keys(salary).forEach(
            (key) => salary[key] === undefined && delete salary[key]
        );
        return salary;
    }

    async findAll(){
        const result = await this.Salary.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Salary.findOne(id);
        return result;
    }

    async create(payload){
        const salary = this.extractConactData(payload);
        const result = await this.Salary.insertOne(salary);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const salary = this.extractConactData(payload);
        const result = await this.Salary.findOneAndUpdate(
            id,
            { $set: salary },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Salary.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = Salary;