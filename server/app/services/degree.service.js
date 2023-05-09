const { ObjectId } = require("mongodb");

class Degree {
    constructor(client){
        this.Degree = client.db().collection("degree");
    }

    // define csdl
    extractConactData(payload){
        const degree = {
            _id: payload._id,
            loai: payload.loai,
            ngay_cap: payload.ngay_cap,
            thoi_han: payload.thoi_han,
            hinh_anh: payload.hinh_anh,
            nhan_vien: payload.nhan_vien
        };

        // remove undefined fields
        Object.keys(degree).forEach(
            (key) => degree[key] === undefined && delete degree[key]
        );
        return degree;
    }

    async findAll(){
        const result = await this.Degree.find();
        return result.toArray();
    }

    async findById(id){
        const result = await this.Degree.findOne({ _id: id });
        return result;
    }

    async findByStaff(payload){
        const result = await this.Degree.find({
            nhan_vien : {$eq : payload}
        });
        return result.toArray();
    }

    async create(payload){
        const degree = this.extractConactData(payload);
        const result = await this.Degree.insertOne(degree);
        return result;
    }

    async update(id, payload){
        const degree = this.extractConactData(payload);
        const result = await this.Degree.findOneAndUpdate(
            { _id: id },
            { $set: degree },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        const result = await this.Degree.findOneAndDelete({ _id: id});
        return result.value;
    }

}

module.exports = Degree;