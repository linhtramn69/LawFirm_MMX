import API from './api.service'

class PeriodService {
    async get(){
        return (await API.get(`/period`));
    }
    async getById(id){
        return (await API.get(`/period/${id}`));
    }
    async findByMatter(id) {
        return (await API.get(`/period/findByMatter/${id}`));
    }
    async create(data){
        return (await API.post(`period`, data));
    }
    async update(id, data){
        return (await API.patch(`period/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`period/${id}`));
    }
}

let periodService = new PeriodService();
export default periodService;