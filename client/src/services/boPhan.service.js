import API from './api.service'

class BoPhanService {
    async get(){
        return (await API.get(`/bo-phan`));
    }
    async getById(id){
        return (await API.get(`/bo-phan/${id}`));
    }
    async create(data){
        return (await API.post(`bo-phan`, data));
    }
    async update(id, data){
        return (await API.put(`bo-phan/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`bo-phan/${id}`));
    }
}

let boPhanService = new BoPhanService();
export default boPhanService;