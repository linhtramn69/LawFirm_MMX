const { ObjectId } = require("mongodb");

class Contact {
    constructor(client){
        this.Contact = client.db().collection("contact");
    }

    // define csdl
    extractConactData(payload){
        const contact = {
            ho_ten: payload.ho_ten,
            nam_sinh: payload.nam_sinh,
            gioi_tinh: payload.gioi_tinh,
            sdt: payload.sdt,
            dia_chi: payload.dia_chi,
            quan_he: payload.quan_he,
            vu_viec: payload.vu_viec
        };

        // remove undefined fields
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async findAll(){
        const result = await this.Contact.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Contact.findOne(id);
        return result;
    }

    // tim lien he theo vu viec
    async findByMatter(payload) {
        const result = await this.Contact.find({
            vu_viec: { $eq: payload.vu_viec }
        });
        return result.toArray();
    }

    async create(payload){
        const contact = this.extractConactData(payload);
        const result = await this.Contact.insertOne(contact);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const contact = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            id,
            { $set: contact },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Contact.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = Contact;