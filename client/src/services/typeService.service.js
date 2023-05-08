import API from './api.service'

class TypeServiceService {
    async get(){
        return (await API.get(`/type-service`));
    }
    async getById(id){
        return (await API.get(`/type-service/${id}`));
    }
    async create(data){
        return (await API.post(`type-service`, data));
    }
    async update(id, data){
        return (await API.put(`type-service/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`type-service/${id}`));
    }
}

let typeServiceService = new TypeServiceService();
export default typeServiceService;