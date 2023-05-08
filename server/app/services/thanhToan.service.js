const { ObjectId } = require("mongodb");

class ThanhToan {
    constructor(client){
        this.ThanhToan = client.db().collection("thanhToan");
    }

    // define csdl
    extractConactData(payload){
        const thanhToan = {
            ten_hinh_thuc_thanh_toan: payload.ten_hinh_thuc_thanh_toan
        };

        // remove undefined fields
        Object.keys(thanhToan).forEach(
            (key) => thanhToan[key] === undefined && delete thanhToan[key]
        );
        return thanhToan;
    }

    async findAll(){
        const result = await this.ThanhToan.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.ThanhToan.findOne(id);
        return result;
    }

    async create(payload){
        const thanhToan = this.extractConactData(payload);
        const result = await this.ThanhToan.insertOne(thanhToan);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const thanhToan = this.extractConactData(payload);
        const result = await this.ThanhToan.findOneAndUpdate(
            id,
            { $set: thanhToan },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.ThanhToan.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = ThanhToan;