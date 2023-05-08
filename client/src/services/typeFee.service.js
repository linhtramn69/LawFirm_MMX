import API from './api.service'

class TypeFeeService {
    async get(){
        return (await API.get(`/type-fee`));
    }
    async getById(id){
        return (await API.get(`/type-fee/${id}`));
    }
    async create(data){
        return (await API.post(`type-fee`, data));
    }
    async update(id, data){
        return (await API.put(`type-fee/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`type-fee/${id}`));
    }
}

let typeFeeService = new TypeFeeService();
export default typeFeeService;