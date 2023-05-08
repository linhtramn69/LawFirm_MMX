import API from './api.service'

class TypeAppointment {
    async get(){
        return (await API.get(`/type-appointment`));
    }
    async getById(id){
        return (await API.get(`/type-appointment/${id}`));
    }
    async create(data){
        return (await API.post(`type-appointment`, data));
    }
    async update(id, data){
        return (await API.put(`type-appointment/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`type-appointment/${id}`));
    }
}

let typeAppointment = new TypeAppointment();
export default typeAppointment;