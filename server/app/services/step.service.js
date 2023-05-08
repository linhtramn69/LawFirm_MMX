const { ObjectId } = require("mongodb");

class Step {
    constructor(client){
        this.Step = client.db().collection("step");
    }

    // define csdl
    extractConactData(payload){
        const step = {
            ten_qt: payload.ten_qt,
            mo_ta_qt: payload.mo_ta_qt,
            don_gia_qt: payload.don_gia_qt,
            don_vi_tinh: payload.don_vi_tinh,
            dich_vu: payload.dich_vu
        };

        Object.keys(step).forEach(
            (key) => step[key] === undefined && delete step[key]
        );
        return step;
    }

    async findAll(){
        const result = await this.Step.find();
        return result.toArray();
    }
    async findByIdService(id) {
        const result = await this.Step.find({ dich_vu: id });
        return result.toArray();
    }

    // lay ra theo chi phi co dinh 
    async findByChiPhiCoDinh(array) {
        const arrNew = [];
        if(array.length > 0)
            array.forEach(function (item) {
                arrNew.push(new ObjectId(item))
            })
        const result = await this.Step.find({ _id: { $in: arrNew } })
        return result.toArray();
    }
    
    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Step.findOne(id);
        return result;
    }

    async create(payload){
        const step = this.extractConactData(payload);
        const result = await this.Step.insertOne(step);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const step = this.extractConactData(payload);
        const result = await this.Step.findOneAndUpdate(
            id,
            { $set: step },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Step.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = Step;