const { ObjectId } = require("mongodb");

class ChucVu {
    constructor(client){
        this.ChucVu = client.db().collection("chucVu");
    }

    extractConactData(payload){
        const chucVu = {
            _id: payload._id,
            ten_chuc_vu: payload.ten_chuc_vu,
            bo_phan: payload.bo_phan,
            luong: payload.luong,
            phu_cap: payload.phu_cap
        };

        Object.keys(chucVu).forEach(
            (key) => chucVu[key] === undefined && delete chucVu[key]
        );
        return chucVu;
    }

    async findAll(){
        const result = await this.ChucVu.find();
        return result.toArray();
    }

    async findById(id){
        const result = await this.ChucVu.findOne({ _id: id });
        return result;
    }

    // lay chuc vu theo bo phan
    async findByBoPhan(payload){
        const result = await this.ChucVu.find({ 'bo_phan.id': payload.bo_phan });
        return result.toArray();
    }

    async create(payload){
        const chucVu = this.extractConactData(payload);
        const result = await this.ChucVu.insertOne(chucVu);
        return result;
    }

    async update(id, payload){
        const chucVu = this.extractConactData(payload);
        const result = await this.ChucVu.findOneAndUpdate(
            { _id: id},
            { $set: chucVu },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        const result = await this.ChucVu.findOneAndDelete({ _id: id });
        return result;
    }

}

module.exports = ChucVu;