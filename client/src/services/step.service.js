import API from './api.service'

class StepService {
    async get(){
        return (await API.get(`/step`));
    }
    async getById(id){
        return (await API.get(`/step/${id}`));
    }
    async getByIdService(id){
        return (await API.get(`/step/findByIdService/${id}`));
    }
    async getByIdChiPhiCoDinh(data){
        return (await API.post(`step/findByChiPhiCoDinh`, data));
    }
    async create(data){
        return (await API.post(`step`, data));
    }
    async update(id, data){
        return (await API.put(`step/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`step/${id}`));
    }
}

let stepService = new StepService();
export default stepService;