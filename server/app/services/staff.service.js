const { ObjectId } = require("mongodb");

class Staff {
    constructor(client){
        this.Staff = client.db().collection("staff");
    }

    extractConactData(payload){
        const staff = {
            _id: payload.account.sdt,
            ho_ten: payload.ho_ten,
            email: payload.email,
            ngay_sinh: payload.ngay_sinh,
            dia_chi: payload.dia_chi,
            avatar: payload.avatar,
            account: {
                mat_khau: payload.account.mat_khau,
                sdt: payload.account.sdt,
                quyen: payload.account.quyen
            },
            bo_phan: payload.bo_phan,
            chuc_vu: payload.chuc_vu,
            linh_vuc: payload.linh_vuc,
            bang_cap: payload.bang_cap
        };

        Object.keys(staff).forEach(
            (key) => staff[key] === undefined && delete staff[key]
        );
        return staff;
    }

    async findAll(){
        const result = await this.Staff.find();
        return result.toArray();
    }

    async findById(id){
        const result = await this.Staff.findOne({ _id: id });
        return result;
    }

    async create(payload){
        const staff = this.extractConactData(payload);
        const result = await this.Staff.insertOne(staff);
        return result;
    }

    async update(id, payload){
        const staff = this.extractConactData(payload);
        const result = await this.Staff.findOneAndUpdate(
            { _id: id },
            { $set: staff },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        const result = await this.Staff.findOneAndDelete({ _id: id });
        return result;
    }

    async login(payload){
        const result = await this.User.findOne({
            "account.sdt": payload.sdt,
            "account.mat_khau": payload.mat_khau
        })
        return result;
    }

}

module.exports = User;