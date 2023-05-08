import API from './api.service'

class ServiceService {
    async get(){
        return (await API.get(`/service`));
    }
    async getById(id){
        return (await API.get(`/service/${id}`));
    }
    async getByType(id){
        return (await API.get(`/service/findByType/${id}`));
    }
    async create(data){
        return (await API.post(`service`, data));
    }
    async update(id, data){
        return (await API.put(`service/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`service/${id}`));
    }
}

let serviceService = new ServiceService();
export default serviceService;