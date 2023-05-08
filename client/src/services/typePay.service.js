import API from './api.service'

class TypePayService {
    async get(){
        return (await API.get(`/type-pay`));
    }
    async getById(id){
        return (await API.get(`/type-pay/${id}`));
    }
    async create(data){
        return (await API.post(`type-pay`, data));
    }
    async update(id, data){
        return (await API.put(`type-pay/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`type-pay/${id}`));
    }
}

let typePayService = new TypePayService();
export default typePayService;