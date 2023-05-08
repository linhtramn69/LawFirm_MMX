import API from './api.service'

class MatterService {
    async get(){
        return (await API.get('/matter'));
    }
    async getById(id){
        return (await API.get(`/matter/${id}`));
    }
    async getByStatus(status){
        return (await API.get(`matter/findByStatus/${status}`))
    }
    async findByIdAccess(data){
        return (await API.post(`matter/findByIdAccess`, data))
    }
    async create(data){
        return (await API.post('matter', data));
    }
    async update(id, data){
        return (await API.put(`matter/${id}`, data));
    }
    async setStatus(id, data){
        return (await API.patch(`matter/setStatus/${id}`, data));
    }
    async setStatus_TT(id, data){
        return (await API.patch(`matter/setStatus-tt/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`matter/${id}`));
    }
    async findFinishedMatterByYear(data){
        return (await API.post(`matter/findFinishedMatterByYear`, data))
    }
}

let matterService = new MatterService();
export default matterService;