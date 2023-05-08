const { ObjectId } = require("mongodb");

class TypeService {
    constructor(client){
        this.TypeService = client.db().collection("typeService");
    }

    // define csdl
    extractConactData(payload){
        const typeService = {
            _id: payload._id,
            ten_linh_vuc: payload.ten_linh_vuc,
            mo_ta_linh_vuc: payload.mo_ta_linh_vuc,
            hinh_anh_linh_vuc: payload.hinh_anh_linh_vuc,
            status: payload.status
        };

        // remove undefined fields
        Object.keys(typeService).forEach(
            (key) => typeService[key] === undefined && delete typeService[key]
        );
        return field;
    }

    async findAll(){
        const result = await this.TypeService.find();
        return result.toArray();
    }

    async findById(id){
        const result = await this.TypeService.findOne({ _id: id });
        return result;
    }

    async findByName(name){
        const result = await this.TypeService.findOne({ ten_loai_dv: name});
        return result;
    }

    async create(payload){
        const typeService = this.extractConactData(payload);
        const result = await this.TypeService.insertOne(typeService);
        return result;
    }

    async update(id, payload){
        const typeService = this.extractConactData(payload);
        const result = await this.TypeService.findOneAndUpdate(
            { _id: id },
            { $set: typeService },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        const result = await this.TypeService.findOneAndDelete({ _id: id});
        return result.value;
    }

}

module.exports = TypeService;