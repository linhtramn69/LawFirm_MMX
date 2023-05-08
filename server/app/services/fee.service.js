const { ObjectId } = require("mongodb");

class Fee {
    constructor(client){
        this.Fee = client.db().collection("fee");
        this.User = client.db().collection("user");
    }

    // define csdl
    extractConactData(payload){
        const fee = {
            mo_ta: payload.mo_ta,
            vu_viec: payload.vu_viec,
            don_gia: payload.don_gia,
            so_hoa_don: payload.so_hoa_don,
            hinh_anh: payload.hinh_anh,
            ngay_lap: payload.ngay_lap,
            status: payload.status,
            tai_khoan: payload.tai_khoan,
            nhan_vien: payload.nhan_vien
        };

        Object.keys(fee).forEach(
            (key) => fee[key] === undefined && delete fee[key]
        );
        return fee;
    }

    async findAll(){
        const result = await this.Fee.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Fee.findOne(id);
        return result;
    }
    
    async findByMatter(payload){
        const result = await this.Fee.find({
            vu_viec : {$eq : payload.id}
        });
        return result.toArray();
    }

    // lay chi phi phat sinh theo trang thai
    async findByStatus(statusP) {
        const result = await this.Fee.find({ status: Number(statusP) });
        return result.toArray();
    }

    async create(payload){
        const fee = this.extractConactData(payload);
        const newVal = {
            ...fee,
            nhan_vien: await this.User.findOne({ _id: new ObjectId(payload.nhan_vien) })
        }
        const result = await this.Fee.insertOne(newVal);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const fee = this.extractConactData(payload);
        const result = await this.Fee.findOneAndUpdate(
            id,
            { $set: fee },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Fee.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = Fee;