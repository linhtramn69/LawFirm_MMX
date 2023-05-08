const { ObjectId } = require("mongodb");

class Service {
    constructor(client){
        this.Service = client.db().collection("service");
    }

    // define csdl
    extractConactData(payload){
        const service = {
            ten_dv: payload.ten_dv,
            mo_ta_dv: payload.ten_dv,
            hinh_anh_dv: payload.hinh_anh_dv,
            don_gia_dv: payload.don_gia_dv,
            status: payload.status,
            linh_vuc: payload.linh_vuc,
        };

        Object.keys(service).forEach(
            (key) => service[key] === undefined && delete service[key]
        );
        return service;
    }

    async findAll(){
        const result = await this.Service.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Service.findOne(id);
        return result;
    }

    // tìm tất cả Service theo id loại Service
    async findAllByTypeService(id_loai_dv){
        const result = await this.Service.find({ "linh_vuc._id": id_loai_dv });
        return result.toArray();
    }

    async create(payload){
        const service = this.extractConactData(payload);
        const result = await this.Service.insertOne(service);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const service = this.extractConactData(payload);
        const result = await this.Service.findOneAndUpdate(
            id,
            { $set: service },
            { returnDocument: "after" }
        );
        console.log(payload);
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Service.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = Service;