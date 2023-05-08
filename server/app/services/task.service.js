const { ObjectId } = require("mongodb");

class Task {
    constructor(client) {
        this.Task = client.db().collection("task");
        this.User = client.db().collection("user");
    }

    // define csdl
    extractConactData(payload) {
        const task = {
            ten_cong_viec: payload.ten_cong_viec,
            nguoi_phu_trach: payload.nguoi_phu_trach,
            nguoi_phan_cong: payload.nguoi_phan_cong,
            vu_viec: payload.vu_viec,
            han_chot_cong_viec: payload.han_chot_cong_viec,
            ngay_giao: payload.ngay_giao,
            status: payload.status,
            tai_lieu: payload.tai_lieu,
        };

        Object.keys(task).forEach(
            (key) => task[key] === undefined && delete task[key]
        );
        return task;
    }

    async findAll() {
        const result = await this.Task.find();
        return result.toArray();
    }

    async findById(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Task.findOne(id);
        return result;
    }

    // lay cong viec theo vu viec
    async findByMatter(payload) {
        const result = await this.Task.find({
            vu_viec: payload.id
        });
        return result.toArray();
    }

    // update trang thai tam ngung theo vu viec
    async setStatusPause(payload) {
        const rs = await this.Task.updateMany(
            {status: 0, vu_viec: payload.matter},
            {$set: {status: 2}}
        )
        return rs;
    }

    async findByDate() {
        const date = new Date('2023-04-17T14:52:23.800Z')
        const result = await this.Task.find({
            han_chot_cong_viec: '2023-04-17T14:52:23.800Z'
        });
        return result.toArray();
    }
    
    // lay cong viec theo nvien phu trach
    async findByStaff(payload) {
        const result = await this.Task.find({
            "nguoi_phu_trach._id": new ObjectId(payload.id)
        });
        return result.toArray();
    }

    // lay cong viec theo nvien phan cong
    async findByStaffPhanCong(payload) {
        const result = await this.Task.find({
            nguoi_phan_cong: payload.id
        });
        return result.toArray();
    }

    // lay cong viec theo trang thai
    async findByStatus(statusP) {
        const result = await this.Task.find({ status: Number(statusP) });
        return result.toArray();
    }

    async create(payload) {
        const task = this.extractConactData(payload);
        const newVal = {
            ...task,
            nguoi_phu_trach: await this.User.findOne({ _id: new ObjectId(payload.nguoi_phu_trach) })
        }
        const result = await this.Task.insertOne(newVal);
        return result;
    }

    async update(id, payload) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const task = this.extractConactData(payload);
        const newVal = {
            ...task,
            nguoi_phu_trach: await this.User.findOne({ _id: new ObjectId(payload.nguoi_phu_trach) })
        }
        const result = await this.Task.findOneAndUpdate(
            id,
            { $set: newVal },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Task.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = Task;