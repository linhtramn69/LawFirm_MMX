import API from './api.service'

class ChucVuService {
    async get(){
        return (await API.get(`/chuc-vu`));
    }
    async getById(id){
        return (await API.get(`/chuc-vu/${id}`));
    }
    async getByBoPhan(data){
        return (await API.post(`/chuc-vu/findByBoPhan`, data));
    }
    async create(data){
        return (await API.post(`chuc-vu`, data));
    }
    async update(id, data){
        return (await API.put(`chuc-vu/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`chuc-vu/${id}`));
    }
}

let chucVuService = new ChucVuService();
export default chucVuService;